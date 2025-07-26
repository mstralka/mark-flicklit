import { PrismaClient } from '../src/backend/generated/client'
import WorldCatAPI from '../src/backend/services/WorldCatAPI'
import { config } from 'dotenv'

// Load environment variables
config()

const prisma = new PrismaClient()
const worldcatAPI = new WorldCatAPI()

interface ImportStats {
  processed: number
  imported: number
  updated: number
  errors: number
  skipped: number
}

async function importWorldCatBooks() {
  console.log('📚 Starting WorldCat books import...')
  
  const stats: ImportStats = {
    processed: 0,
    imported: 0,
    updated: 0,
    errors: 0,
    skipped: 0
  }

  try {
    // Get sample of works to enhance with WorldCat data
    const BATCH_SIZE = 100
    const TOTAL_LIMIT = 1000 // Start with 1000 works for testing
    
    console.log(`📖 Fetching works to enhance (limit: ${TOTAL_LIMIT})...`)
    
    const works = await prisma.work.findMany({
      take: TOTAL_LIMIT,
      include: {
        authors: {
          include: { author: true }
        },
        worldcatBooks: true // Check if already has WorldCat data
      },
      where: {
        worldcatBooks: {
          none: {} // Only works without WorldCat data
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log(`📖 Found ${works.length} works to process`)

    // Process works in batches
    for (let i = 0; i < works.length; i += BATCH_SIZE) {
      const batch = works.slice(i, i + BATCH_SIZE)
      console.log(`\\n🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(works.length / BATCH_SIZE)}...`)

      for (const work of batch) {
        try {
          stats.processed++
          
          // Get primary author name
          const primaryAuthor = work.authors[0]?.author?.name
          
          console.log(`🔍 Searching WorldCat for: "${work.title}" by ${primaryAuthor || 'Unknown'}`)
          
          // Search WorldCat
          const searchResults = await worldcatAPI.searchByTitleAuthor(work.title, primaryAuthor)
          
          if (searchResults.records.length === 0) {
            console.log(`   ❌ No WorldCat results found`)
            stats.skipped++
            continue
          }

          // Take the best match (first result)
          const bestMatch = searchResults.records[0]
          console.log(`   ✅ Found match: OCLC ${bestMatch.oclcNumber}`)

          // Save to database
          const recordId = await worldcatAPI.saveRecord(bestMatch, work.id)
          stats.imported++

          console.log(`   💾 Saved WorldCat record ${recordId}`)

          // Rate limiting - be respectful to WorldCat
          await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay

        } catch (error) {
          stats.errors++
          console.error(`   ❌ Error processing work ${work.id}:`, error)
          
          // Continue with next work
          continue
        }

        // Progress update
        if (stats.processed % 10 === 0) {
          console.log(`\\n📊 Progress: ${stats.processed}/${works.length} processed, ${stats.imported} imported, ${stats.errors} errors`)
        }
      }

      // Longer delay between batches
      console.log('⏳ Waiting 5 seconds between batches...')
      await new Promise(resolve => setTimeout(resolve, 5000))
    }

    // Final statistics
    console.log('\\n📊 Import completed!')
    console.log(`   Total processed: ${stats.processed}`)
    console.log(`   Successfully imported: ${stats.imported}`)
    console.log(`   Updated existing: ${stats.updated}`)
    console.log(`   Skipped (no results): ${stats.skipped}`)
    console.log(`   Errors: ${stats.errors}`)

    // Database statistics
    const totalWorldCatBooks = await prisma.worldCatBook.count()
    const worksWithWorldCat = await prisma.work.count({
      where: {
        worldcatBooks: {
          some: {}
        }
      }
    })

    console.log(`\\n📈 Database statistics:`)
    console.log(`   Total WorldCat books: ${totalWorldCatBooks}`)
    console.log(`   Works with WorldCat data: ${worksWithWorldCat}`)

  } catch (error) {
    console.error('❌ Import failed:', error)
    throw error
  } finally {
    await worldcatAPI.disconnect()
    await prisma.$disconnect()
  }
}

// Command line options
const args = process.argv.slice(2)
const HELP_TEXT = `
WorldCat Books Import Script

Usage:
  yarn import:worldcat              # Import WorldCat data for works
  yarn import:worldcat --help       # Show this help

Options:
  --help, -h                       # Show help message

The script will:
1. Find works without existing WorldCat data
2. Search WorldCat for each work by title and author  
3. Save the best match to the worldcat_books table
4. Link the WorldCat record to the original work

Rate limiting: 1 second between requests, 5 seconds between batches
`

if (args.includes('--help') || args.includes('-h')) {
  console.log(HELP_TEXT)
  process.exit(0)
}

// Run the import
if (require.main === module) {
  importWorldCatBooks()
    .then(() => {
      console.log('🎉 WorldCat import completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 WorldCat import failed:', error)
      process.exit(1)
    })
}