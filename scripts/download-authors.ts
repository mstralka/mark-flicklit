import { createWriteStream, existsSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import { createGunzip } from 'zlib'
import { createReadStream } from 'fs'
import * as readline from 'readline'
import { PrismaClient } from '../src/backend/generated/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const DUMP_URL = 'https://openlibrary.org/data/ol_dump_authors_latest.txt.gz'
const DUMP_FILE = './data/ol_dump_authors_latest.txt.gz'
const BATCH_SIZE = 5000

// Parse command line arguments
const args = process.argv.slice(2)
const SKIP_DOWNLOAD = args.includes('--skip-download') || args.includes('--process-only')
const FORCE_DOWNLOAD = args.includes('--force-download')

interface OpenLibraryAuthor {
  type: { key: string }
  key: string
  name?: string
  personal_name?: string
  birth_date?: string
  death_date?: string
  bio?: string | { type: string; value: string }
  alternate_names?: string[]
  location?: string
  eastern_order?: boolean
  wikipedia?: string
  links?: Array<{ title?: string; url: string; type?: { key: string } }>
  remote_ids?: {
    wikidata?: string
    viaf?: string
    [key: string]: string | undefined
  }
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

function processBio(bio: string | { type: string; value: string } | undefined): string | undefined {
  if (!bio) return undefined
  if (typeof bio === 'string') return bio
  if (typeof bio === 'object' && bio.value) return bio.value
  return undefined
}

function processLinks(links: Array<{ title?: string; url: string; type?: { key: string } }> | undefined): string[] {
  if (!links || !Array.isArray(links)) return []
  return links.map(link => link.url).filter(Boolean)
}

async function countAuthorsInFile(filePath: string): Promise<number> {
  console.log('Counting authors in file...')
  let count = 0
  
  const fileStream = createReadStream(filePath)
  const gunzip = createGunzip()
  const rl = readline.createInterface({
    input: fileStream.pipe(gunzip),
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    const columns = line.split('\t')
    if (columns.length >= 5 && columns[0] === '/type/author') {
      count++
      
      if (count % 50000 === 0) {
        process.stdout.write(`\rCounting: ${count.toLocaleString()} authors found...`)
      }
    }
  }
  
  process.stdout.write(`\rTotal authors found: ${count.toLocaleString()}\n`)
  return count
}

async function processAuthorsFile(filePath: string, totalCount: number): Promise<void> {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=60&connect_timeout=30'
      }
    }
  })
  let processedCount = 0
  let batch: any[] = []

  try {
    console.log('Processing authors file...')
    
    // Drop indexes for faster bulk inserts
    console.log('Dropping indexes for faster import...')
    try {
      await prisma.$executeRaw`DROP INDEX idx_authors_name ON authors`
      console.log('Dropped idx_authors_name')
    } catch (error) {
      console.log('Index idx_authors_name not found, continuing...')
    }
    
    try {
      await prisma.$executeRaw`DROP INDEX idx_authors_birth_date ON authors`
      console.log('Dropped idx_authors_birth_date')
    } catch (error) {
      console.log('Index idx_authors_birth_date not found, continuing...')
    }
    
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
        
        // Only process author records
        if (type !== '/type/author') continue

        // Parse JSON data
        const authorData: OpenLibraryAuthor = JSON.parse(jsonData)
        
        // Skip if no name
        if (!authorData.name) continue

        // Prepare data for database
        const dbAuthor = {
          openLibraryId: authorData.key,
          name: authorData.name,
          personalName: authorData.personal_name || null,
          birthDate: authorData.birth_date || null,
          deathDate: authorData.death_date || null,
          bio: processBio(authorData.bio) || null,
          alternateNames: authorData.alternate_names ? JSON.stringify(authorData.alternate_names) : null,
          location: authorData.location || null,
          easternOrder: authorData.eastern_order || false,
          wikipedia: authorData.wikipedia || null,
          links: JSON.stringify(processLinks(authorData.links)),
        }

        batch.push(dbAuthor)

        // Process batch when it reaches BATCH_SIZE
        if (batch.length >= BATCH_SIZE) {
          await processBatch(prisma, batch)
          processedCount += batch.length
          batch = []
          
          if (processedCount % 25000 === 0) {
            const progress = totalCount > 0 ? ((processedCount / totalCount) * 100).toFixed(1) : '0.0'
            console.log(`Processed ${processedCount.toLocaleString()} / ${totalCount.toLocaleString()} authors (${progress}%)...`)
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

    const finalProgress = totalCount > 0 ? ((processedCount / totalCount) * 100).toFixed(1) : '100.0'
    console.log(`Successfully processed ${processedCount.toLocaleString()} / ${totalCount.toLocaleString()} authors (${finalProgress}%)`)
    
    // Recreate indexes after import
    console.log('Recreating indexes...')
    try {
      await prisma.$executeRaw`CREATE INDEX idx_authors_name ON authors (name(768))`
      console.log('Recreated idx_authors_name')
    } catch (error) {
      console.warn('Error recreating idx_authors_name:', error)
    }
    
    try {
      await prisma.$executeRaw`CREATE INDEX idx_authors_birth_date ON authors (birthDate)`
      console.log('Recreated idx_authors_birth_date')
    } catch (error) {
      console.warn('Error recreating idx_authors_birth_date:', error)
    }
    
    console.log('Index recreation completed')

  } catch (error) {
    console.error('Error processing file:', error)
    
    // Try to recreate indexes even if import failed
    console.log('Attempting to recreate indexes after error...')
    try {
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_authors_name ON authors (name(768))`
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_authors_birth_date ON authors (birthDate)`
      console.log('Indexes recreated after error')
    } catch (indexError) {
      console.warn('Could not recreate indexes after error:', indexError)
    }
    
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function processBatch(prisma: PrismaClient, batch: any[]): Promise<void> {
  try {
    // Use createMany for bulk insert with skipDuplicates for better performance
    await prisma.author.createMany({
      data: batch,
      skipDuplicates: true,
    })
  } catch (error) {
    console.warn(`Error with bulk insert: ${error}`)
    // Fallback to individual upserts if bulk insert fails
    await prisma.$transaction(async (tx: any) => {
      for (const author of batch) {
        try {
          await tx.author.upsert({
            where: { openLibraryId: author.openLibraryId },
            update: author,
            create: author,
          })
        } catch (individualError) {
          console.warn(`Error inserting author ${author.openLibraryId}: ${individualError}`)
        }
      }
    })
  }
}

function printUsage() {
  console.log('OpenLibrary Authors Import Script')
  console.log('')
  console.log('Usage:')
  console.log('  yarn import:authors                    # Download and process authors')
  console.log('  yarn import:authors --skip-download    # Process existing file only')
  console.log('  yarn import:authors --process-only     # Same as --skip-download')
  console.log('  yarn import:authors --force-download   # Re-download even if file exists')
  console.log('')
}

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage()
    return
  }

  try {
    console.log('Starting OpenLibrary authors import...')
    
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
    
    // Count authors in file first
    const totalAuthors = await countAuthorsInFile(DUMP_FILE)
    
    // Process the file
    await processAuthorsFile(DUMP_FILE, totalAuthors)
    
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