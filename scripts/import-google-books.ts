import {PrismaClient} from '../src/backend/generated/client'
import GoogleBooksAPI from '../src/backend/services/GoogleBooksAPI'
import {config} from 'dotenv'

// Load environment variables
config()

const prisma = new PrismaClient()
const googleBooksAPI = new GoogleBooksAPI()

interface ImportStats {
    processed: number
    imported: number
    updated: number
    errors: number
    skipped: number
}

interface SearchStrategy {
    name: string
    query: string
    maxResults: number
    description: string
}

interface ComprehensiveStrategy {
    phase: string
    queries: string[]
    priority: number // 1=high, 5=low
    maxResultsPerQuery: number
    estimatedBooks: number
    description: string
}

interface ImportSession {
    sessionId: string
    mode: string
    startTime: Date
}

// Helper function to create or resume import session
async function createOrResumeSession(mode: string): Promise<ImportSession> {
    // Check for existing incomplete sessions
    const existingSessions = await prisma.googleBookImportProgress.findMany({
        where: {
            importMode: mode,
            completed: false
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 1
    })

    if (existingSessions.length > 0) {
        const existingSessionId = existingSessions[0].sessionId
        console.log(`🔄 Found incomplete ${mode} session: ${existingSessionId}`)
        console.log('   Resuming from where we left off...')
        
        return {
            sessionId: existingSessionId,
            mode,
            startTime: existingSessions[0].createdAt
        }
    }

    // Create new session
    const newSession = {
        sessionId: `${mode}-${Date.now()}`,
        mode,
        startTime: new Date()
    }
    
    console.log(`🆕 Creating new ${mode} session: ${newSession.sessionId}`)
    return newSession
}

// Helper function to save progress
async function saveProgress(session: ImportSession, strategyName: string, data: {
    currentQuery?: string
    currentIndex: number
    totalItems: number
    completed: boolean
    imported: number
    skipped: number
    errors: number
}) {
    try {
        await prisma.googleBookImportProgress.upsert({
            where: {
                sessionId_strategyName: {
                    sessionId: session.sessionId,
                    strategyName
                }
            },
            update: {
                currentQuery: data.currentQuery,
                currentIndex: data.currentIndex,
                completed: data.completed,
                imported: data.imported,
                skipped: data.skipped,
                errors: data.errors
            },
            create: {
                sessionId: session.sessionId,
                importMode: session.mode,
                strategyName,
                currentQuery: data.currentQuery,
                currentIndex: data.currentIndex,
                totalItems: data.totalItems,
                completed: data.completed,
                imported: data.imported,
                skipped: data.skipped,
                errors: data.errors
            }
        })
    } catch (error) {
        console.warn('Failed to save progress:', error)
    }
}

// Helper function to generate year-based queries
function generateYearQueries(startYear: number, endYear: number): string[] {
    const queries: string[] = []
    for (let year = startYear; year <= endYear; year++) {
        queries.push(`publishedDate:${year}`)
    }
    return queries
}

// Helper function to generate alphabet-based queries
function generateAlphabetQueries(): string[] {
    const queries: string[] = []

    // Single characters
    for (let i = 97; i <= 122; i++) { // a-z
        queries.push(String.fromCharCode(i))
    }
    for (let i = 48; i <= 57; i++) { // 0-9
        queries.push(String.fromCharCode(i))
    }

    // Two-character combinations (high-frequency only)
    const commonPairs = ['th', 'he', 'in', 'er', 'an', 're', 'ed', 'nd', 'on', 'en', 'at', 'ou', 'it', 'is', 'or', 'ti', 'hi', 'as', 'to']
    queries.push(...commonPairs)

    return queries
}

// Helper function to generate common word queries
function generateCommonWordQueries(): string[] {
    return [
        'the', 'and', 'love', 'life', 'world', 'time', 'man', 'woman', 'book', 'story',
        'history', 'war', 'peace', 'king', 'queen', 'city', 'house', 'home', 'family',
        'children', 'death', 'god', 'water', 'fire', 'earth', 'sun', 'moon', 'star',
        'day', 'night', 'year', 'new', 'old', 'great', 'good', 'bad', 'big', 'small',
        'first', 'last', 'long', 'short', 'white', 'black', 'red', 'blue', 'green'
    ]
}

// Helper function to generate subject queries
function generateSubjectQueries(): string[] {
    const subjects = [
        'fiction', 'nonfiction', 'science', 'history', 'biography', 'mystery', 'romance',
        'fantasy', 'thriller', 'poetry', 'drama', 'philosophy', 'religion', 'politics',
        'economics', 'psychology', 'sociology', 'art', 'music', 'literature', 'education',
        'medicine', 'law', 'business', 'technology', 'mathematics', 'physics', 'chemistry',
        'biology', 'geology', 'astronomy', 'geography', 'anthropology', 'archaeology',
        'cooking', 'travel', 'sports', 'health', 'fitness', 'self-help', 'humor'
    ]
    return subjects.map(subject => `subject:${subject}`)
}

// Helper function to generate language queries
function generateLanguageQueries(): string[] {
    const languages = [
        'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi',
        'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk',
        'sl', 'et', 'lv', 'lt', 'mt', 'el', 'tr', 'he', 'fa', 'ur', 'bn', 'ta',
        'te', 'mr', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ne', 'si', 'my', 'km',
        'lo', 'ka', 'am', 'ti', 'om', 'so', 'sw', 'zu', 'xh', 'af', 'st', 'tn',
        'ss', 've', 'ts', 'nr', 'ng'
    ]
    return languages.map(lang => `lang:${lang}`)
}

// Helper function to create comprehensive search strategies
function createComprehensiveStrategies(): ComprehensiveStrategy[] {
    const currentYear = new Date().getFullYear()

    return [
        {
            phase: 'recent-years',
            queries: generateYearQueries(2020, currentYear),
            priority: 1,
            maxResultsPerQuery: 40,
            estimatedBooks: 200000,
            description: 'Recent publications (2020-present)'
        },
        {
            phase: 'common-terms',
            queries: generateCommonWordQueries(),
            priority: 2,
            maxResultsPerQuery: 40,
            estimatedBooks: 500000,
            description: 'Books with common words in titles'
        },
        {
            phase: '2010s-decade',
            queries: generateYearQueries(2010, 2019),
            priority: 2,
            maxResultsPerQuery: 35,
            estimatedBooks: 300000,
            description: '2010s publications'
        },
        {
            phase: 'subjects-popular',
            queries: generateSubjectQueries(),
            priority: 3,
            maxResultsPerQuery: 40,
            estimatedBooks: 800000,
            description: 'Books by subject categories'
        },
        {
            phase: 'alphabet-sweep',
            queries: generateAlphabetQueries(),
            priority: 3,
            maxResultsPerQuery: 40,
            estimatedBooks: 1000000,
            description: 'Alphabetical title coverage'
        },
        {
            phase: '2000s-decade',
            queries: generateYearQueries(2000, 2009),
            priority: 4,
            maxResultsPerQuery: 30,
            estimatedBooks: 250000,
            description: '2000s publications'
        },
        {
            phase: 'languages',
            queries: generateLanguageQueries(),
            priority: 4,
            maxResultsPerQuery: 30,
            estimatedBooks: 600000,
            description: 'Multi-language coverage'
        },
        {
            phase: '1990s-decade',
            queries: generateYearQueries(1990, 1999),
            priority: 5,
            maxResultsPerQuery: 25,
            estimatedBooks: 200000,
            description: '1990s publications'
        },
        {
            phase: '1980s-decade',
            queries: generateYearQueries(1980, 1989),
            priority: 5,
            maxResultsPerQuery: 20,
            estimatedBooks: 150000,
            description: '1980s publications'
        },
        {
            phase: 'historical-pre1980',
            queries: generateYearQueries(1500, 1979),
            priority: 6,
            maxResultsPerQuery: 15,
            estimatedBooks: 500000,
            description: 'Historical publications (1500-1979)'
        }
    ]
}

// Helper function to create curated search strategies
function createSearchStrategies(): SearchStrategy[] {
    const currentYear = new Date().getFullYear()
    const strategies: SearchStrategy[] = []

    // 1. Popular/trending books by general categories
    const popularQueries = [
        {query: 'bestseller fiction', description: 'Bestselling fiction books'},
        {query: 'bestseller nonfiction', description: 'Bestselling non-fiction books'},
        {query: 'popular mystery thriller', description: 'Popular mystery and thriller books'},
        {query: 'popular romance', description: 'Popular romance novels'},
        {query: 'popular science fiction', description: 'Popular sci-fi books'},
        {query: 'popular fantasy', description: 'Popular fantasy books'},
        {query: 'popular biography', description: 'Popular biographies'},
        {query: 'popular history', description: 'Popular history books'},
        {query: 'popular business', description: 'Popular business books'},
        {query: 'popular self help', description: 'Popular self-help books'},
        {query: 'award winning fiction', description: 'Award-winning fiction'},
        {query: 'classic literature', description: 'Classic literature'},
        {query: 'contemporary fiction', description: 'Contemporary fiction'},
        {query: 'young adult fiction', description: 'Young adult books'},
        {query: 'children books', description: 'Children\'s books'}
    ]

    // Add popular category searches
    popularQueries.forEach(({query, description}) => {
        strategies.push({
            name: `popular-${query.replace(/\\s+/g, '-')}`,
            query: query,
            maxResults: 40,
            description
        })
    })

    // 2. Books by publication year (recent years get more coverage)
    const yearStrategies = [
        {years: [currentYear, currentYear - 1], maxResults: 40}, // Recent books
        {years: [currentYear - 2, currentYear - 3], maxResults: 40},
        {years: [currentYear - 4, currentYear - 5], maxResults: 30},
        {years: [2015, 2016, 2017, 2018, 2019], maxResults: 25}, // 2010s
        {years: [2010, 2011, 2012, 2013, 2014], maxResults: 25},
        {years: [2005, 2006, 2007, 2008, 2009], maxResults: 20}, // 2000s
        {years: [2000, 2001, 2002, 2003, 2004], maxResults: 20},
        {years: [1995, 1996, 1997, 1998, 1999], maxResults: 15}, // 1990s
        {years: [1990, 1991, 1992, 1993, 1994], maxResults: 15}
    ]

    yearStrategies.forEach(({years, maxResults}) => {
        years.forEach(year => {
            strategies.push({
                name: `year-${year}`,
                query: `publishedDate:${year}`,
                maxResults,
                description: `Books published in ${year}`
            })
        })
    })

    // 3. Subject-based searches for diversity
    const subjectQueries = [
        'subject:fiction', 'subject:science', 'subject:technology', 'subject:philosophy',
        'subject:psychology', 'subject:sociology', 'subject:economics', 'subject:politics',
        'subject:art', 'subject:music', 'subject:poetry', 'subject:drama',
        'subject:cooking', 'subject:travel', 'subject:sports', 'subject:health'
    ]

    subjectQueries.forEach(query => {
        strategies.push({
            name: `subject-${query.split(':')[1]}`,
            query: query,
            maxResults: 30,
            description: `Books in ${query.split(':')[1]} category`
        })
    })

    // 4. Language diversity (English focus but some international)
    const languageQueries = [
        {query: 'lang:en popular', maxResults: 40, desc: 'Popular English books'},
        {query: 'lang:en fiction', maxResults: 35, desc: 'English fiction'},
        {query: 'lang:es popular', maxResults: 15, desc: 'Popular Spanish books'},
        {query: 'lang:fr popular', maxResults: 15, desc: 'Popular French books'},
        {query: 'lang:de popular', maxResults: 10, desc: 'Popular German books'}
    ]

    languageQueries.forEach(({query, maxResults, desc}) => {
        strategies.push({
            name: `lang-${query.split(':')[1].split(' ')[0]}`,
            query: query,
            maxResults,
            description: desc
        })
    })

    return strategies
}

async function comprehensiveImport() {
    console.log('🌐 Starting COMPREHENSIVE Google Books import...')
    console.log('⚠️  WARNING: This will attempt to download millions of books!')
    console.log('   Estimated time with free API: 30-100+ days')
    console.log('   Estimated storage needed: 10-50+ GB')

    // Create or resume session for progress tracking
    const session = await createOrResumeSession('comprehensive')
    console.log(`🎯 Session ID: ${session.sessionId}`)
    
    // Get language restriction
    const langRestrict = getLanguageRestriction()

    const stats: ImportStats = {
        processed: 0,
        imported: 0,
        updated: 0,
        errors: 0,
        skipped: 0
    }

    try {
        const strategies = createComprehensiveStrategies()
        const totalEstimatedBooks = strategies.reduce((sum, s) => sum + s.estimatedBooks, 0)

        console.log('\\n🎯 Comprehensive Strategy Overview:')
        console.log(`   Total phases: ${strategies.length}`)
        console.log(`   Estimated books: ${totalEstimatedBooks.toLocaleString()}`)
        console.log(`   Estimated API calls: ${strategies.reduce((sum, s) => sum + s.queries.length, 0).toLocaleString()}`)

        // Get existing progress for this session
        const existingProgress = await prisma.googleBookImportProgress.findMany({
            where: {
                sessionId: session.sessionId
            }
        })

        // Process each strategy phase
        for (const strategy of strategies) {
            // Check if this strategy is already completed
            const strategyProgress = existingProgress.find(p => p.strategyName === strategy.phase)
            
            if (strategyProgress?.completed) {
                console.log(`\\n✅ Phase "${strategy.phase}" already completed, skipping...`)
                stats.imported += strategyProgress.imported
                stats.skipped += strategyProgress.skipped
                stats.errors += strategyProgress.errors
                continue
            }

            console.log(`\\n🚀 ${strategyProgress ? 'Resuming' : 'Starting'} Phase: ${strategy.phase}`)
            console.log(`   Description: ${strategy.description}`)
            console.log(`   Queries: ${strategy.queries.length.toLocaleString()}`)
            console.log(`   Estimated books: ${strategy.estimatedBooks.toLocaleString()}`)
            console.log(`   Priority: ${strategy.priority}/6`)

            // Initialize phase stats from existing progress if resuming
            let phaseImported = strategyProgress?.imported || 0
            let phaseSkipped = strategyProgress?.skipped || 0
            let phaseErrors = strategyProgress?.errors || 0
            let startIndex = strategyProgress?.currentIndex || 0

            if (strategyProgress) {
                console.log(`   📍 Resuming from query ${startIndex + 1}/${strategy.queries.length}`)
            }

            for (let i = startIndex; i < strategy.queries.length; i++) {
                const query = strategy.queries[i]

                try {
                    console.log(`\\n   🔍 [${i + 1}/${strategy.queries.length}] Query: "${query}"...`)
                    
                    let queryImported = 0
                    let querySkipped = 0
                    let startIndex = 0
                    let totalResultsForQuery = 0
                    const maxResultsPerPage = 40 // Google Books API maximum
                    const maxPagesToFetch = 25 // Limit to prevent infinite loops (1000 results max per query)

                    // Paginate through all results for this query
                    for (let page = 0; page < maxPagesToFetch; page++) {
                        const searchResults = await googleBooksAPI.searchBooks({
                            q: query,
                            maxResults: maxResultsPerPage,
                            startIndex: startIndex,
                            langRestrict: langRestrict,
                            printType: 'books',
                            projection: 'full',
                            orderBy: 'relevance',
                        })

                        // First page: check if there are any results at all
                        if (page === 0) {
                            if (!searchResults.items || searchResults.items.length === 0) {
                                console.log('     ❌ No results')
                                stats.skipped++
                                break
                            }
                            totalResultsForQuery = searchResults.totalItems
                            console.log(`     📊 Found ${totalResultsForQuery.toLocaleString()} total results, paginating...`)
                        }

                        // No more results on this page
                        if (!searchResults.items || searchResults.items.length === 0) {
                            console.log(`     ⏭️  No more results at page ${page + 1}`)
                            break
                        }

                        console.log(`     📄 Page ${page + 1}: Processing ${searchResults.items.length} books (${startIndex + 1}-${startIndex + searchResults.items.length})`)

                        // Process all books on this page
                        for (const volume of searchResults.items) {
                            try {
                                const existingBook = await prisma.googleBook.findUnique({
                                    where: {googleBooksId: volume.id}
                                })

                                if (existingBook) {
                                    querySkipped++
                                    continue
                                }

                                const saveResult = await googleBooksAPI.saveVolume(volume)
                                if (saveResult !== null) {
                                    stats.imported++
                                    queryImported++
                                    phaseImported++
                                } else {
                                    stats.skipped++
                                    querySkipped++
                                    phaseSkipped++
                                }
                                stats.processed++

                            } catch (error) {
                                stats.errors++
                                phaseErrors++
                                console.error(`     ❌ Error saving ${volume.id}:`, error)
                            }
                        }

                        // Move to next page
                        startIndex += searchResults.items.length

                        // Check if we've reached the end of results
                        if (startIndex >= totalResultsForQuery || searchResults.items.length < maxResultsPerPage) {
                            console.log(`     ✅ Completed all ${Math.ceil(startIndex / maxResultsPerPage)} pages for this query`)
                            break
                        }

                        // Rate limiting between pages (shorter delay)
                        await new Promise(resolve => setTimeout(resolve, 500))
                    }

                    stats.skipped += querySkipped
                    phaseSkipped += querySkipped

                    console.log(`     💾 Query totals: ${queryImported} new, ${querySkipped} existing from ${totalResultsForQuery.toLocaleString()} total results`)

                    // Save progress after each query
                    await saveProgress(session, strategy.phase, {
                        currentQuery: query,
                        currentIndex: i,
                        totalItems: strategy.queries.length,
                        completed: false,
                        imported: phaseImported,
                        skipped: phaseSkipped,
                        errors: phaseErrors
                    })

                    // Rate limiting - slower for comprehensive mode
                    await new Promise(resolve => setTimeout(resolve, 2000))

                } catch (error) {
                    console.error(`   ❌ Query "${query}" failed:`, error)
                    phaseErrors++
                    stats.errors++

                    if (error instanceof Error && error.message.includes('403')) {
                        console.log('   ⏳ Rate limit hit, waiting 120 seconds...')
                        await new Promise(resolve => setTimeout(resolve, 120000))
                    }
                }

                // Progress update every 50 queries
                if ((i + 1) % 50 === 0) {
                    console.log(`\\n   📊 Phase Progress: ${i + 1}/${strategy.queries.length} queries, ${phaseImported} imported, ${phaseSkipped} skipped`)
                }
            }

            // Mark phase as completed
            await saveProgress(session, strategy.phase, {
                currentIndex: strategy.queries.length,
                totalItems: strategy.queries.length,
                completed: true,
                imported: phaseImported,
                skipped: phaseSkipped,
                errors: phaseErrors
            })

            console.log(`\\n✅ Phase "${strategy.phase}" completed!`)
            console.log(`   Imported: ${phaseImported.toLocaleString()}`)
            console.log(`   Skipped: ${phaseSkipped.toLocaleString()}`)
            console.log(`   Errors: ${phaseErrors.toLocaleString()}`)

            // Longer break between phases
            if (strategies.indexOf(strategy) < strategies.length - 1) {
                console.log('   ⏳ 30 second break before next phase...')
                await new Promise(resolve => setTimeout(resolve, 30000))
            }
        }

        // Final comprehensive statistics
        await displayComprehensiveStats(stats)

    } catch (error) {
        console.error('❌ Comprehensive import failed:', error)
        throw error
    } finally {
        await googleBooksAPI.disconnect()
        await prisma.$disconnect()
    }
}

async function standardImport() {
    console.log('📚 Starting curated Google Books import...')
    
    // Get language restriction
    const langRestrict = getLanguageRestriction()

    const stats: ImportStats = {
        processed: 0,
        imported: 0,
        updated: 0,
        errors: 0,
        skipped: 0
    }

    try {
        // Create diverse search strategies
        const searchStrategies = createSearchStrategies()

        console.log(`🎯 Processing ${searchStrategies.length} search strategies...`)
        console.log('   Strategies include: popularity, publication years, subjects, and languages')

        // Process each search strategy
        for (const {name, query, maxResults, description} of searchStrategies) {
            try {
                console.log(`\\n🔍 ${description}...`)
                console.log(`   Query: "${query}" (max: ${maxResults})`)

                // Search using this strategy
                const searchResults = await googleBooksAPI.searchBooks({
                    langRestrict: langRestrict,
                    maxResults: maxResults,
                    orderBy: 'relevance',
                    printType: 'books',
                    projection: 'full',
                    q: query,
                })

                if (!searchResults.items || searchResults.items.length === 0) {
                    console.log(`   ❌ No results found for "${query}"`)
                    stats.skipped++
                    continue
                }

                console.log(`   ✅ Found ${searchResults.items.length} books`)

                // Save all books from this search
                let strategyImported = 0
                let strategySkipped = 0

                for (const volume of searchResults.items) {
                    try {
                        // Check if we already have this book
                        const existingBook = await prisma.googleBook.findUnique({
                            where: {googleBooksId: volume.id}
                        })

                        if (existingBook) {
                            strategySkipped++
                            continue
                        }

                        const saveResult = await googleBooksAPI.saveVolume(volume) // No workId needed
                        if (saveResult !== null) {
                            stats.imported++
                            strategyImported++
                        } else {
                            stats.skipped++
                            strategySkipped++
                        }
                        stats.processed++

                    } catch (error) {
                        stats.errors++
                        console.error(`   ❌ Error saving "${volume.volumeInfo.title}" (${volume.id}):`, error)
                    }
                }

                stats.skipped += strategySkipped
                console.log(`   💾 Strategy results: ${strategyImported} new, ${strategySkipped} existing`)

                // Rate limiting between searches
                await new Promise(resolve => setTimeout(resolve, 1500))

            } catch (error) {
                console.error(`❌ Error processing strategy "${name}":`, error)
                stats.errors++

                // If we hit rate limits, wait longer
                if (error instanceof Error && error.message.includes('403')) {
                    console.log('⏳ Rate limit hit, waiting 60 seconds...')
                    await new Promise(resolve => setTimeout(resolve, 60000))
                }
            }

            // Progress update every 10 strategies
            const strategiesCompleted = searchStrategies.indexOf(searchStrategies.find(s => s.name === name)!) + 1
            if (strategiesCompleted % 10 === 0) {
                console.log(`\\n📊 Progress: ${strategiesCompleted}/${searchStrategies.length} strategies, ${stats.imported} imported, ${stats.skipped} skipped`)
            }
        }

        // Final statistics
        await displayStandardStats(stats)

    } catch (error) {
        console.error('❌ Standard import failed:', error)
        throw error
    } finally {
        await googleBooksAPI.disconnect()
        await prisma.$disconnect()
    }
}

async function displayStandardStats(stats: ImportStats) {
    console.log('\\n📊 Import completed!')
    console.log(`   Total processed: ${stats.processed}`)
    console.log(`   Successfully imported: ${stats.imported}`)
    console.log(`   Updated existing: ${stats.updated}`)
    console.log(`   Skipped (existing/no results): ${stats.skipped}`)
    console.log(`   Errors: ${stats.errors}`)

    await displayDatabaseStats()
}

async function displayComprehensiveStats(stats: ImportStats) {
    console.log('\\n🌐 COMPREHENSIVE IMPORT COMPLETED!')
    console.log('\\n📊 Final Statistics:')
    console.log(`   📥 Total processed: ${stats.processed.toLocaleString()}`)
    console.log(`   ✅ Successfully imported: ${stats.imported.toLocaleString()}`)
    console.log(`   🔄 Updated existing: ${stats.updated.toLocaleString()}`)
    console.log(`   ⏭️  Skipped (existing/no results): ${stats.skipped.toLocaleString()}`)
    console.log(`   ❌ Errors: ${stats.errors.toLocaleString()}`)

    await displayDatabaseStats()

    // Additional comprehensive stats
    console.log('\\n🎯 Coverage Analysis:')
    const totalBooksInDB = await prisma.googleBook.count()
    console.log(`   📚 Total books in database: ${totalBooksInDB.toLocaleString()}`)

    // Estimate coverage percentage (very rough)
    const estimatedGoogleBooksTotal = 40000000 // Google's estimated catalog size
    const coveragePercentage = (totalBooksInDB / estimatedGoogleBooksTotal * 100).toFixed(3)
    console.log(`   📈 Estimated Google Books coverage: ${coveragePercentage}%`)

    console.log('\\n💾 Storage Impact:')
    const avgBytesPerBook = 3000 // Rough estimate
    const estimatedStorage = (totalBooksInDB * avgBytesPerBook / 1024 / 1024).toFixed(1)
    console.log(`   💿 Estimated database size: ${estimatedStorage} MB`)
}

async function displayDatabaseStats() {
    // Database statistics
    const totalGoogleBooks = await prisma.googleBook.count()

    console.log('\\n📈 Database statistics:')
    console.log(`   Total Google Books in database: ${totalGoogleBooks.toLocaleString()}`)

    // Language statistics
    const languageStats = await prisma.googleBook.groupBy({
        by: ['language'],
        _count: {language: true},
        orderBy: {_count: {language: 'desc'}},
        take: 15
    })

    console.log('\\n🌍 Language distribution:')
    languageStats.forEach(stat => {
        console.log(`   ${stat.language || 'Unknown'}: ${stat._count.language.toLocaleString()}`)
    })

    // Publication year statistics
    const yearStats = await prisma.$queryRaw`
        SELECT SUBSTRING("publishedDate", 1, 4) as year,
      COUNT(*) as count
        FROM google_books
        WHERE "publishedDate" IS NOT NULL
          AND "publishedDate" ~ '^[0-9]{4}'
        GROUP BY SUBSTRING ("publishedDate", 1, 4)
        ORDER BY year DESC
            LIMIT 10
    ` as Array<{ year: string; count: bigint }>

    console.log('\\n📅 Recent publication years:')
    yearStats.forEach(stat => {
        console.log(`   ${stat.year}: ${Number(stat.count).toLocaleString()}`)
    })

    // Category statistics
    const categoryStats = await prisma.$queryRaw`
        SELECT category,
               COUNT(*) as count
        FROM (
            SELECT categories->0 as category
            FROM google_books
            WHERE JSON_ARRAY_LENGTH(categories) > 0
            ) as cat_data
        WHERE category IS NOT NULL
        GROUP BY category
        ORDER BY count DESC
            LIMIT 10
    ` as Array<{ category: string; count: bigint }>

    console.log('\\n📚 Top categories:')
    categoryStats.forEach(stat => {
        const cleanCategory = stat.category.replace(/^"|"$/g, '') // Remove JSON quotes
        console.log(`   ${cleanCategory}: ${Number(stat.count).toLocaleString()}`)
    })
}

// Helper function to show import status
async function showImportStatus() {
    console.log('📊 Import Session Status:')

    const sessions = await prisma.googleBookImportProgress.groupBy({
        by: ['sessionId', 'importMode'],
        _count: {strategyName: true},
        _sum: {imported: true, skipped: true, errors: true},
        orderBy: {sessionId: 'desc'},
        take: 10
    })

    if (sessions.length === 0) {
        console.log('   No import sessions found.')
        return
    }

    for (const session of sessions) {
        const completedStrategies = await prisma.googleBookImportProgress.count({
            where: {sessionId: session.sessionId, completed: true}
        })

        const isComplete = completedStrategies === session._count.strategyName
        const status = isComplete ? '✅ Complete' : '🔄 In Progress'

        console.log(`\\n   ${status} ${session.importMode.toUpperCase()} - ${session.sessionId}`)
        console.log(`     Strategies: ${completedStrategies}/${session._count.strategyName} completed`)
        console.log(`     Books: ${session._sum.imported || 0} imported, ${session._sum.skipped || 0} skipped, ${session._sum.errors || 0} errors`)
    }
}

// Helper function to clean up completed sessions
async function cleanupCompletedSessions() {
    const completedSessions = await prisma.googleBookImportProgress.groupBy({
        by: ['sessionId'],
        _count: {strategyName: true},
        having: {
            sessionId: {
                _count: {
                    gt: 0
                }
            }
        }
    })

    for (const sessionGroup of completedSessions) {
        const completedCount = await prisma.googleBookImportProgress.count({
            where: {
                sessionId: sessionGroup.sessionId,
                completed: true
            }
        })

        if (completedCount === sessionGroup._count.strategyName) {
            console.log(`🧹 Session ${sessionGroup.sessionId} is fully completed`)
        }
    }
}

// Helper function to reset a session (for debugging)
async function resetSession(sessionId: string) {
    console.log(`🔄 Resetting session: ${sessionId}`)
    
    await prisma.googleBookImportProgress.deleteMany({
        where: {sessionId}
    })
    
    console.log('   Session reset complete')
}

// Get language restriction from command line args
function getLanguageRestriction(): string {
    const args = process.argv.slice(2)
    const langIndex = args.indexOf('--language')
    
    if (langIndex !== -1 && langIndex + 1 < args.length) {
        const language = args[langIndex + 1]
        console.log(`🌍 Language restriction: ${language}`)
        return language
    }
    
    // Default to English
    console.log('🌍 Language restriction: en (default)')
    return 'en'
}

// Main import function that handles both modes
async function importGoogleBooks() {
    const args = process.argv.slice(2)

    if (args.includes('--status')) {
        await showImportStatus()
    } else if (args.includes('--cleanup')) {
        await cleanupCompletedSessions()
    } else if (args.includes('--reset')) {
        const sessionId = args[args.indexOf('--reset') + 1]
        if (sessionId) {
            await resetSession(sessionId)
        } else {
            console.log('❌ Please provide a session ID: --reset SESSION_ID')
        }
    } else if (args.includes('--comprehensive')) {
        await comprehensiveImport()
    } else {
        await standardImport()
    }
}

// Command line options
const args = process.argv.slice(2)
const HELP_TEXT = `
Google Books Import Script

Usage:
  yarn import:google-books              # Standard curated import (~5K-15K books)
  yarn import:google-books --comprehensive # Comprehensive import (millions of books)
  yarn import:google-books --status    # Show import session status
  yarn import:google-books --help      # Show this help

Options:
  --comprehensive                  # Enable comprehensive mode (WARNING: Long-running!)
  --language LANG                 # Language restriction (ISO 639-1 code, default: en)
  --status                        # Show status of all import sessions
  --cleanup                       # Clean up completed sessions
  --reset SESSION_ID              # Reset/delete a specific session
  --help, -h                     # Show help message

📚 STANDARD MODE (Default):
Uses curated search strategies for high-quality dataset:
- Bestsellers and popular categories
- Recent publications (2020-present) 
- Classic and award-winning books
- Subject diversity (science, arts, etc.)
- Multi-language coverage

Estimated: 5,000-15,000 books, ~2-4 hours runtime

🌐 COMPREHENSIVE MODE (--comprehensive):
⚠️  WARNING: This attempts to download millions of books!

**RESUMABLE:** If interrupted, restart with same command to resume where you left off.

Phased approach with FULL PAGINATION:
1. Recent years (2020-${new Date().getFullYear()}): ~500K books (all results)
2. Common terms: ~2M books (up to 1000 per term)  
3. 2010s decade: ~1M books (all results per year)
4. Subject categories: ~3M books (up to 1000 per subject)
5. Alphabetical sweep: ~5M books (up to 1000 per letter/combo)
6. Historical years: ~2M books (all results per year)
7. Multi-language: ~1M books (up to 1000 per language)

NEW: Full pagination means up to 1000 results per query (vs 40 before)
Estimated: 5-15 million books, 100-300+ days runtime (free API)
Storage needed: 50-500+ GB

**Session Management:**
- Use --status to check progress of current/past imports
- Use --reset SESSION_ID to restart a specific session from scratch

API Requirements:
- Free tier: 1,000 requests/day (very slow for comprehensive)
- Paid tier: 100,000 requests/day (recommended for comprehensive)

Environment variables:
  GOOGLE_BOOKS_API_KEY             # Required for comprehensive mode

Examples:
  yarn import:google-books --language fr     # Import French books only
  yarn import:google-books --language es     # Import Spanish books only
  yarn import:google-books --comprehensive --language de  # Comprehensive German import
`

if (args.includes('--help') || args.includes('-h')) {
    console.log(HELP_TEXT)
    process.exit(0)
}

// Run the import
if (require.main === module) {
    importGoogleBooks()
        .then(() => {
            const mode = args.includes('--comprehensive') ? 'comprehensive' : 'standard'
            console.log(`🎉 Google Books ${mode} import completed successfully!`)
            process.exit(0)
        })
        .catch((error) => {
            console.error('💥 Google Books import failed:', error)
            process.exit(1)
        })
}