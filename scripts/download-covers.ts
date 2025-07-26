import { createWriteStream, existsSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import { createGunzip } from 'zlib'
import { createReadStream } from 'fs'
import * as readline from 'readline'
import { PrismaClient } from '../src/backend/generated/client'
import { config } from 'dotenv'

// Load environment variables
config()

const DUMP_URL = 'https://openlibrary.org/data/ol_dump_covers_metadata_latest.txt.gz'
const DUMP_FILE = './data/ol_dump_covers_metadata_latest.txt.gz'
const BATCH_SIZE = 5000

// Parse command line arguments
const args = process.argv.slice(2)
const SKIP_DOWNLOAD = args.includes('--skip-download') || args.includes('--process-only')
const FORCE_DOWNLOAD = args.includes('--force-download')

interface OpenLibraryCover {
  type: { key: string }
  key: string
  isbn_10?: string[]
  isbn_13?: string[]
  works?: Array<{ key: string }>
  source_url?: string
  width?: number
  height?: number
  content_type?: string
  file_size?: number
  last_modified?: string
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

async function countCoversInFile(filePath: string): Promise<number> {
  console.log('Counting covers in file...')
  let count = 0
  
  const fileStream = createReadStream(filePath)
  const gunzip = createGunzip()
  const rl = readline.createInterface({
    input: fileStream.pipe(gunzip),
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    const columns = line.split('\t')
    if (columns.length >= 5 && columns[0] === '/type/cover') {
      count++
      
      if (count % 50000 === 0) {
        process.stdout.write(`\rCounting: ${count.toLocaleString()} covers found...`)
      }
    }
  }
  
  process.stdout.write(`\rTotal covers found: ${count.toLocaleString()}\n`)
  return count
}

async function processCoversFile(filePath: string, _totalCount: number): Promise<void> {
  const prisma = new PrismaClient()
  let processedCount = 0
  let skippedCount = 0
  let batch: any[] = []

  try {
    console.log('Processing covers file...')
    
    // Drop indexes for faster bulk inserts
    console.log('Dropping indexes for faster import...')
    try {
      await prisma.$executeRaw`DROP INDEX idx_covers_work_id ON covers`
      console.log('Dropped idx_covers_work_id')
    } catch {
      console.log('Index idx_covers_work_id not found, continuing...')
    }
    
    try {
      await prisma.$executeRaw`DROP INDEX idx_covers_ol_id ON covers`
      console.log('Dropped idx_covers_ol_id')
    } catch {
      console.log('Index idx_covers_ol_id not found, continuing...')
    }
    
    try {
      await prisma.$executeRaw`DROP INDEX idx_covers_isbn10 ON covers`
      console.log('Dropped idx_covers_isbn10')
    } catch {
      console.log('Index idx_covers_isbn10 not found, continuing...')
    }
    
    try {
      await prisma.$executeRaw`DROP INDEX idx_covers_isbn13 ON covers`
      console.log('Dropped idx_covers_isbn13')
    } catch {
      console.log('Index idx_covers_isbn13 not found, continuing...')
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
        
        // Only process cover records
        if (type !== '/type/cover') continue

        // Parse JSON data
        const coverData: OpenLibraryCover = JSON.parse(jsonData)
        
        // Skip if no works associated
        if (!coverData.works || !Array.isArray(coverData.works) || coverData.works.length === 0) {
          skippedCount++
          continue
        }

        // Create cover records for each associated work
        for (const workRef of coverData.works) {
          if (!workRef.key) continue
          
          // Find the work by openLibraryId
          const work = await prisma.work.findUnique({
            where: { openLibraryId: workRef.key }
          })
          
          if (!work) {
            skippedCount++
            continue
          }

          // Prepare cover data for database
          const dbCover = {
            workId: work.id,
            openLibraryCoverId: coverData.key,
            isbn10: coverData.isbn_10 && coverData.isbn_10.length > 0 ? coverData.isbn_10[0] : null,
            isbn13: coverData.isbn_13 && coverData.isbn_13.length > 0 ? coverData.isbn_13[0] : null,
            size: 'L', // Default to large, can be determined from dimensions
            width: coverData.width || null,
            height: coverData.height || null,
            url: coverData.key ? `https://covers.openlibrary.org/b/id/${coverData.key.split('/').pop()}-L.jpg` : null,
            sourceUrl: coverData.source_url || null,
            contentType: coverData.content_type || 'image/jpeg',
            fileSize: coverData.file_size || null,
            lastModified: coverData.last_modified ? new Date(coverData.last_modified) : null,
          }

          batch.push(dbCover)
        }

        // Process batch when it reaches BATCH_SIZE
        if (batch.length >= BATCH_SIZE) {
          await processBatch(prisma, batch)
          processedCount += batch.length
          batch = []
          
          if (processedCount % 25000 === 0) {
            console.log(`Processed ${processedCount.toLocaleString()} covers, skipped ${skippedCount.toLocaleString()}...`)
          }
        }

      } catch (error) {
        console.warn(`Error processing line: ${error}`)
        skippedCount++
      }
    }

    // Process remaining batch
    if (batch.length > 0) {
      await processBatch(prisma, batch)
      processedCount += batch.length
    }

    console.log(`Successfully processed ${processedCount.toLocaleString()} covers`)
    console.log(`Skipped ${skippedCount.toLocaleString()} covers (no associated works found)`)
    
    // Recreate indexes after import
    console.log('Recreating indexes...')
    try {
      await prisma.$executeRaw`CREATE INDEX idx_covers_work_id ON covers (workId)`
      console.log('Recreated idx_covers_work_id')
    } catch (error) {
      console.warn('Error recreating idx_covers_work_id:', error)
    }
    
    try {
      await prisma.$executeRaw`CREATE INDEX idx_covers_ol_id ON covers (openLibraryCoverId)`
      console.log('Recreated idx_covers_ol_id')
    } catch (error) {
      console.warn('Error recreating idx_covers_ol_id:', error)
    }
    
    try {
      await prisma.$executeRaw`CREATE INDEX idx_covers_isbn10 ON covers (isbn10)`
      console.log('Recreated idx_covers_isbn10')
    } catch (error) {
      console.warn('Error recreating idx_covers_isbn10:', error)
    }
    
    try {
      await prisma.$executeRaw`CREATE INDEX idx_covers_isbn13 ON covers (isbn13)`
      console.log('Recreated idx_covers_isbn13')
    } catch (error) {
      console.warn('Error recreating idx_covers_isbn13:', error)
    }
    
    console.log('Index recreation completed')

  } catch (error) {
    console.error('Error processing file:', error)
    
    // Try to recreate indexes even if import failed
    console.log('Attempting to recreate indexes after error...')
    try {
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_covers_work_id ON covers (workId)`
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_covers_ol_id ON covers (openLibraryCoverId)`
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_covers_isbn10 ON covers (isbn10)`
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_covers_isbn13 ON covers (isbn13)`
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
    await prisma.cover.createMany({
      data: batch,
      skipDuplicates: true,
    })
  } catch (error) {
    console.warn(`Error with bulk insert: ${error}`)
    // Fallback to individual upserts if bulk insert fails
    await prisma.$transaction(async (tx: any) => {
      for (const cover of batch) {
        try {
          await tx.cover.upsert({
            where: { 
              openLibraryCoverId: cover.openLibraryCoverId
            },
            update: cover,
            create: cover,
          })
        } catch (individualError) {
          console.warn(`Error inserting cover ${cover.openLibraryCoverId}: ${individualError}`)
        }
      }
    })
  }
}

function printUsage() {
  console.log('OpenLibrary Covers Import Script')
  console.log('')
  console.log('Usage:')
  console.log('  yarn import:covers                    # Download and process covers')
  console.log('  yarn import:covers --skip-download    # Process existing file only')
  console.log('  yarn import:covers --process-only     # Same as --skip-download')
  console.log('  yarn import:covers --force-download   # Re-download even if file exists')
  console.log('')
  console.log('Note: Works should be imported first for proper cover-work relationships')
}

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage()
    return
  }

  try {
    console.log('Starting OpenLibrary covers import...')
    
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
    
    // Count covers in file first
    const totalCovers = await countCoversInFile(DUMP_FILE)
    
    // Process the file
    await processCoversFile(DUMP_FILE, totalCovers)
    
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