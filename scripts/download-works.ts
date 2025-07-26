import { createWriteStream, existsSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import { createGunzip } from 'zlib'
import { createReadStream } from 'fs'
import * as readline from 'readline'
import { PrismaClient } from '../src/backend/generated/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const DUMP_URL = 'https://openlibrary.org/data/ol_dump_works_latest.txt.gz'
const DUMP_FILE = './data/ol_dump_works_latest.txt.gz'
const BATCH_SIZE = 1000

// Parse command line arguments
const args = process.argv.slice(2)
const SKIP_DOWNLOAD = args.includes('--skip-download') || args.includes('--process-only')
const FORCE_DOWNLOAD = args.includes('--force-download')

interface OpenLibraryAuthorRole {
  author: { key: string }
  role?: string
  as?: string
}

interface OpenLibraryWork {
  type: { key: string }
  key: string
  title?: string
  subtitle?: string
  description?: string | { type: string; value: string }
  first_publish_date?: string
  first_sentence?: string | { type: string; value: string }
  subjects?: string[]
  subject_places?: string[]
  subject_times?: string[]
  subject_people?: string[]
  original_languages?: string[]
  other_titles?: string[]
  authors?: OpenLibraryAuthorRole[]
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function formatProgress(downloaded: number, total: number): string {
  const percent = total > 0 ? ((downloaded / total) * 100).toFixed(1) : '0.0'
  return `${formatBytes(downloaded)} / ${formatBytes(total)} (${percent}%)`
}

async function downloadFile(url: string, filePath: string): Promise<void> {
  if (existsSync(filePath) && !FORCE_DOWNLOAD) {
    const stats = statSync(filePath)
    console.log(`File ${filePath} already exists (${formatBytes(stats.size)}), skipping download`)
    console.log('Use --force-download to re-download')
    return
  }

  console.log(`Downloading ${url}...`)
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }

  const contentLength = response.headers.get('content-length')
  const totalSize = contentLength ? parseInt(contentLength, 10) : 0
  
  console.log(`File size: ${totalSize > 0 ? formatBytes(totalSize) : 'Unknown'}`)

  const fileStream = createWriteStream(filePath)
  
  if (!response.body) {
    throw new Error('No response body')
  }

  let downloaded = 0
  let lastProgressTime = Date.now()
  
  // Create a transform stream to track progress
  const { Transform } = require('stream')
  const progressStream = new Transform({
    transform(chunk: Buffer, _encoding: string, callback: (error?: Error | null, data?: Buffer) => void) {
      downloaded += chunk.length
      
      // Update progress every 500ms to avoid too much output
      const now = Date.now()
      if (now - lastProgressTime > 500) {
        process.stdout.write(`\rProgress: ${formatProgress(downloaded, totalSize)}`)
        lastProgressTime = now
      }
      
      callback(null, chunk)
    }
  })

  await pipeline(response.body as any, progressStream, fileStream)
  
  // Final progress update
  process.stdout.write(`\rProgress: ${formatProgress(downloaded, totalSize)} - Complete!\n`)
  console.log(`Downloaded to ${filePath}`)
}

function processDescription(description: string | { type: string; value: string } | undefined): string | undefined {
  if (!description) return undefined
  if (typeof description === 'string') return description
  if (typeof description === 'object' && description.value) return description.value
  return undefined
}

function processFirstSentence(firstSentence: string | { type: string; value: string } | undefined): string | undefined {
  if (!firstSentence) return undefined
  if (typeof firstSentence === 'string') return firstSentence
  if (typeof firstSentence === 'object' && firstSentence.value) return firstSentence.value
  return undefined
}

interface WorkAuthorRelation {
  workId: string
  authorKey: string
  role?: string
}

async function processWorksFile(filePath: string): Promise<void> {
  const prisma = new PrismaClient()
  let processedCount = 0
  let skippedCount = 0
  let authorRelationsCount = 0
  let batch: any[] = []
  let authorRelations: WorkAuthorRelation[] = []

  try {
    console.log('Processing works file...')
    
    // Create read stream with gunzip
    const fileStream = createReadStream(filePath)
    const gunzip = createGunzip()
    const rl = readline.createInterface({
      input: fileStream.pipe(gunzip),
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      try {
        // Parse tab-separated values
        const columns = line.split('\t')
        if (columns.length < 5) continue

        const [type, , , , jsonData] = columns
        
        // Only process work records
        if (type !== '/type/work') continue

        // Parse JSON data
        const workData: OpenLibraryWork = JSON.parse(jsonData)
        
        // Skip if no title
        if (!workData.title) {
          skippedCount++
          continue
        }

        // Prepare data for database
        const dbWork = {
          openLibraryId: workData.key,
          title: workData.title,
          subtitle: workData.subtitle || null,
          description: processDescription(workData.description) || null,
          firstPublishDate: workData.first_publish_date || null,
          firstSentence: processFirstSentence(workData.first_sentence) || null,
          subjects: workData.subjects ? JSON.stringify(workData.subjects) : null,
          subjectPlaces: workData.subject_places ? JSON.stringify(workData.subject_places) : null,
          subjectTimes: workData.subject_times ? JSON.stringify(workData.subject_times) : null,
          subjectPeople: workData.subject_people ? JSON.stringify(workData.subject_people) : null,
          originalLanguages: workData.original_languages ? JSON.stringify(workData.original_languages) : null,
          otherTitles: workData.other_titles ? JSON.stringify(workData.other_titles) : null,
        }

        batch.push(dbWork)

        // Store author relations for later processing
        if (workData.authors && Array.isArray(workData.authors)) {
          for (const authorRole of workData.authors) {
            if (authorRole.author && authorRole.author.key) {
              authorRelations.push({
                workId: workData.key,
                authorKey: authorRole.author.key,
                role: authorRole.role || 'author'
              })
              authorRelationsCount++
            }
          }
        }

        // Process batch when it reaches BATCH_SIZE
        if (batch.length >= BATCH_SIZE) {
          await processBatch(prisma, batch)
          processedCount += batch.length
          batch = []
          
          if (processedCount % 10000 === 0) {
            console.log(`Processed ${processedCount} works, ${authorRelationsCount} author relations, skipped ${skippedCount}...`)
          }
        }

      } catch (error) {
        console.warn(`Error processing line: ${error}`)
      }
    }

    // Process remaining batch
    if (batch.length > 0) {
      await processBatch(prisma, batch)
      processedCount += batch.length
    }

    console.log(`Successfully processed ${processedCount} works`)
    console.log(`Found ${authorRelationsCount} author relations`)
    console.log(`Skipped ${skippedCount} works without titles`)

    // Now process author relations
    if (authorRelations.length > 0) {
      console.log('Processing author-work relationships...')
      await processAuthorRelations(prisma, authorRelations)
    }

  } catch (error) {
    console.error('Error processing file:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function processBatch(prisma: PrismaClient, batch: any[]): Promise<void> {
  // Wrap batch in transaction for better performance
  try {
    await prisma.$transaction(async (tx: any) => {
      for (const work of batch) {
        await tx.work.upsert({
          where: { openLibraryId: work.openLibraryId },
          update: work,
          create: work,
        })
      }
    })
  } catch (error) {
    console.warn(`Error processing batch: ${error}`)
    // Fallback to individual upserts if batch fails
    for (const work of batch) {
      try {
        await prisma.work.upsert({
          where: { openLibraryId: work.openLibraryId },
          update: work,
          create: work,
        })
      } catch (individualError) {
        console.warn(`Error inserting work ${work.openLibraryId}: ${individualError}`)
      }
    }
  }
}

async function processAuthorRelations(prisma: PrismaClient, relations: WorkAuthorRelation[]): Promise<void> {
  let processedRelations = 0
  let skippedRelations = 0
  const RELATION_BATCH_SIZE = 500

  // Process relations in batches for better performance
  for (let i = 0; i < relations.length; i += RELATION_BATCH_SIZE) {
    const batch = relations.slice(i, i + RELATION_BATCH_SIZE)
    
    try {
      await prisma.$transaction(async (tx: any) => {
        for (const relation of batch) {
          // Find the author by openLibraryId
          const author = await tx.author.findUnique({
            where: { openLibraryId: relation.authorKey }
          })

          if (!author) {
            skippedRelations++
            continue
          }

          // Find the work by openLibraryId
          const work = await tx.work.findUnique({
            where: { openLibraryId: relation.workId }
          })

          if (!work) {
            skippedRelations++
            continue
          }

          // Create the author-work relationship
          await tx.authorWork.upsert({
            where: {
              authorId_workId: {
                authorId: author.id,
                workId: work.id
              }
            },
            update: {
              role: relation.role
            },
            create: {
              authorId: author.id,
              workId: work.id,
              role: relation.role
            }
          })

          processedRelations++
        }
      })

      if (processedRelations % 5000 === 0) {
        console.log(`Processed ${processedRelations} author relations, skipped ${skippedRelations}...`)
      }

    } catch (error) {
      console.warn(`Error processing relation batch: ${error}`)
      // Fallback to individual processing for this batch
      for (const relation of batch) {
        try {
          const author = await prisma.author.findUnique({
            where: { openLibraryId: relation.authorKey }
          })

          if (!author) {
            skippedRelations++
            continue
          }

          const work = await prisma.work.findUnique({
            where: { openLibraryId: relation.workId }
          })

          if (!work) {
            skippedRelations++
            continue
          }

          await prisma.authorWork.upsert({
            where: {
              authorId_workId: {
                authorId: author.id,
                workId: work.id
              }
            },
            update: {
              role: relation.role
            },
            create: {
              authorId: author.id,
              workId: work.id,
              role: relation.role
            }
          })

          processedRelations++

        } catch (individualError) {
          console.warn(`Error processing relation ${relation.authorKey} -> ${relation.workId}: ${individualError}`)
          skippedRelations++
        }
      }
    }
  }

  console.log(`Successfully created ${processedRelations} author-work relationships`)
  console.log(`Skipped ${skippedRelations} relationships (missing authors or works)`)
}

function printUsage() {
  console.log('OpenLibrary Works Import Script')
  console.log('')
  console.log('Usage:')
  console.log('  yarn import:works                    # Download and process works')
  console.log('  yarn import:works --skip-download    # Process existing file only')
  console.log('  yarn import:works --process-only     # Same as --skip-download')
  console.log('  yarn import:works --force-download   # Re-download even if file exists')
  console.log('')
  console.log('Note: Authors should be imported first for proper author-work relationships')
}

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage()
    return
  }

  try {
    console.log('Starting OpenLibrary works import...')
    
    if (SKIP_DOWNLOAD) {
      console.log('Skipping download, processing existing file...')
      if (!existsSync(DUMP_FILE)) {
        console.error(`Error: File ${DUMP_FILE} does not exist.`)
        console.error('Run without --skip-download to download the file first.')
        process.exit(1)
      }
    } else {
      // Download the file
      await downloadFile(DUMP_URL, DUMP_FILE)
    }
    
    // Verify file exists before processing
    if (!existsSync(DUMP_FILE)) {
      console.error(`Error: File ${DUMP_FILE} does not exist after download.`)
      process.exit(1)
    }
    
    // Process the file
    await processWorksFile(DUMP_FILE)
    
    console.log('Import completed successfully!')
    
  } catch (error) {
    console.error('Import failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}