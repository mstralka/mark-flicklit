import {PrismaClient} from '../src/backend/generated/client'
import {createWriteStream} from 'fs'
import {config} from 'dotenv'
import {spawn} from 'child_process'
import path from 'path'

// Load environment variables
config()

const prisma = new PrismaClient()

interface ExportOptions {
    outputPath?: string
    limit?: number
    language?: string
    includeWorkId?: boolean
    format?: 'csv' | 'json' | 'postgres'
}

// Helper function to escape CSV fields
function escapeCsvField(value: any): string {
    if (value === null || value === undefined) {
        return ''
    }
    
    let stringValue = String(value)
    
    // Handle arrays - convert to JSON string
    if (Array.isArray(value)) {
        stringValue = JSON.stringify(value)
    }
    
    // Handle objects - convert to JSON string
    if (typeof value === 'object' && value !== null) {
        stringValue = JSON.stringify(value)
    }
    
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
        stringValue = `"${stringValue.replace(/"/g, '""')}"`
    }
    
    return stringValue
}

// Helper function to detect if running in Docker and get appropriate output path
function getOutputPath(format: string, baseName?: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const extension = format === 'postgres' ? 'sql' : format
    const fileName = baseName || `google-books-export-${timestamp}.${extension}`
    
    // Check if running in Docker container
    const isDocker = process.env.DOCKER_CONTAINER === 'true' || 
                    process.env.NODE_ENV === 'docker' ||
                    require('fs').existsSync('/.dockerenv')
    
    if (isDocker && format === 'postgres') {
        // Use mounted data directory for PostgreSQL dumps in Docker
        return path.resolve('/app/data', fileName)
    } else if (isDocker) {
        // Use data directory for other formats in Docker
        return path.resolve('/app/data', fileName)
    } else {
        // Local development - use exports directory
        return path.resolve(process.cwd(), 'exports', fileName)
    }
}

// Export to CSV
async function exportToCsv(options: ExportOptions): Promise<void> {
    const outputPath = options.outputPath || getOutputPath('csv')
    
    console.log('📊 Starting Google Books CSV export...')
    console.log(`   Output: ${outputPath}`)
    
    // Build query conditions
    const where: any = {}
    if (options.language) {
        where.language = options.language
        console.log(`   Language filter: ${options.language}`)
    }
    
    // Get total count
    const totalCount = await prisma.googleBook.count({where})
    const exportLimit = options.limit || totalCount
    
    console.log(`   Total records: ${totalCount.toLocaleString()}`)
    console.log(`   Export limit: ${exportLimit.toLocaleString()}`)
    
    // Create exports directory if it doesn't exist
    const fs = await import('fs')
    const exportsDir = path.dirname(outputPath)
    if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, {recursive: true})
    }
    
    // Create write stream
    const writeStream = createWriteStream(outputPath, {encoding: 'utf8'})
    
    try {
        // Define columns (excluding some internal fields)
        const columns = [
            'id',
            'createdAt',
            'updatedAt', 
            'googleBooksId',
            'selfLink',
            'title',
            'subtitle',
            'authors',
            'publisher',
            'publishedDate',
            'pageCount',
            'printType',
            'description',
            'language',
            'categories',
            'maturityRating',
            'isbn10',
            'isbn13',
            'industryIdentifiers',
            'smallThumbnail',
            'thumbnail',
            'small',
            'medium',
            'large',
            'extraLarge',
            'viewability',
            'embeddable',
            'publicDomain',
            'textToSpeechPermission',
            'saleability',
            'listPrice',
            'averageRating',
            'ratingsCount',
            'previewLink',
            'infoLink',
            'canonicalVolumeLink'
        ]
        
        // Add workId if requested
        if (options.includeWorkId) {
            columns.push('workId')
        }
        
        // Write header
        writeStream.write(columns.join(',') + '\n')
        
        // Export in batches to handle large datasets
        const batchSize = 1000
        let exported = 0
        let skip = 0
        
        while (exported < exportLimit) {
            const batch = await prisma.googleBook.findMany({
                where,
                skip,
                take: Math.min(batchSize, exportLimit - exported),
                orderBy: {id: 'asc'}
            })
            
            if (batch.length === 0) break
            
            // Write batch to CSV
            for (const book of batch) {
                const row = columns.map(col => {
                    const value = (book as any)[col]
                    return escapeCsvField(value)
                })
                writeStream.write(row.join(',') + '\n')
                exported++
            }
            
            skip += batch.length
            
            // Progress update
            if (exported % (batchSize * 10) === 0 || exported === exportLimit) {
                console.log(`   📝 Exported ${exported.toLocaleString()} / ${exportLimit.toLocaleString()} records`)
            }
        }
        
        console.log(`✅ CSV export completed: ${outputPath}`)
        console.log(`   Records exported: ${exported.toLocaleString()}`)
        
        // Get file size
        const stats = await fs.promises.stat(outputPath)
        const fileSizeMB = (stats.size / 1024 / 1024).toFixed(1)
        console.log(`   File size: ${fileSizeMB} MB`)
        
    } finally {
        writeStream.end()
    }
}

// Export to JSON
async function exportToJson(options: ExportOptions): Promise<void> {
    const outputPath = options.outputPath || getOutputPath('json')
    
    console.log('📊 Starting Google Books JSON export...')
    console.log(`   Output: ${outputPath}`)
    
    // Build query conditions
    const where: any = {}
    if (options.language) {
        where.language = options.language
        console.log(`   Language filter: ${options.language}`)
    }
    
    // Get total count
    const totalCount = await prisma.googleBook.count({where})
    const exportLimit = options.limit || totalCount
    
    console.log(`   Total records: ${totalCount.toLocaleString()}`)
    console.log(`   Export limit: ${exportLimit.toLocaleString()}`)
    
    // Create exports directory if it doesn't exist
    const fs = await import('fs')
    const exportsDir = path.dirname(outputPath)
    if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, {recursive: true})
    }
    
    // Create write stream
    const writeStream = createWriteStream(outputPath, {encoding: 'utf8'})
    
    try {
        writeStream.write('[\n')
        
        // Export in batches
        const batchSize = 1000
        let exported = 0
        let skip = 0
        let isFirst = true
        
        while (exported < exportLimit) {
            const batch = await prisma.googleBook.findMany({
                where,
                skip,
                take: Math.min(batchSize, exportLimit - exported),
                orderBy: {id: 'asc'},
                select: {
                    // Exclude rawResponse for smaller file size
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    googleBooksId: true,
                    selfLink: true,
                    title: true,
                    subtitle: true,
                    authors: true,
                    publisher: true,
                    publishedDate: true,
                    pageCount: true,
                    printType: true,
                    description: true,
                    language: true,
                    categories: true,
                    maturityRating: true,
                    isbn10: true,
                    isbn13: true,
                    industryIdentifiers: true,
                    smallThumbnail: true,
                    thumbnail: true,
                    small: true,
                    medium: true,
                    large: true,
                    extraLarge: true,
                    viewability: true,
                    embeddable: true,
                    publicDomain: true,
                    textToSpeechPermission: true,
                    saleability: true,
                    listPrice: true,
                    averageRating: true,
                    ratingsCount: true,
                    previewLink: true,
                    infoLink: true,
                    canonicalVolumeLink: true,
                    workId: options.includeWorkId || false
                }
            })
            
            if (batch.length === 0) break
            
            // Write batch to JSON
            for (const book of batch) {
                if (!isFirst) {
                    writeStream.write(',\n')
                }
                writeStream.write(JSON.stringify(book, null, 2))
                isFirst = false
                exported++
            }
            
            skip += batch.length
            
            // Progress update
            if (exported % (batchSize * 10) === 0 || exported === exportLimit) {
                console.log(`   📝 Exported ${exported.toLocaleString()} / ${exportLimit.toLocaleString()} records`)
            }
        }
        
        writeStream.write('\n]')
        
        console.log(`✅ JSON export completed: ${outputPath}`)
        console.log(`   Records exported: ${exported.toLocaleString()}`)
        
        // Get file size
        const fs = await import('fs')
        const stats = await fs.promises.stat(outputPath)
        const fileSizeMB = (stats.size / 1024 / 1024).toFixed(1)
        console.log(`   File size: ${fileSizeMB} MB`)
        
    } finally {
        writeStream.end()
    }
}

// Export to PostgreSQL dump
async function exportToPostgres(options: ExportOptions): Promise<void> {
    const outputPath = options.outputPath || getOutputPath('postgres')
    
    console.log('📊 Starting Google Books PostgreSQL dump export...')
    console.log(`   Output: ${outputPath}`)
    
    // Check if running in Docker
    const isDocker = process.env.DOCKER_CONTAINER === 'true' || 
                    process.env.NODE_ENV === 'docker' ||
                    require('fs').existsSync('/.dockerenv')
    
    if (isDocker) {
        console.log('   🐳 Running in Docker container - using containerized pg_dump')
    }
    
    // Parse DATABASE_URL to get connection details
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is required for PostgreSQL export')
    }
    
    // Parse connection URL
    const urlMatch = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+?)(?:\?|$)/)
    if (!urlMatch) {
        throw new Error('Invalid DATABASE_URL format. Expected: postgresql://user:pass@host:port/db')
    }
    
    const [, username, password, host, port, database] = urlMatch
    
    // Create exports directory if it doesn't exist
    const fs = await import('fs')
    const exportsDir = path.dirname(outputPath)
    if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, {recursive: true})
    }
    
    // Build pg_dump command
    const pgDumpArgs: string[] = []
    
    // Connection parameters
    pgDumpArgs.push('--host', host)
    pgDumpArgs.push('--port', port)
    pgDumpArgs.push('--username', username)
    pgDumpArgs.push('--dbname', database)
    
    // Export options
    pgDumpArgs.push('--table', 'google_books')
    pgDumpArgs.push('--data-only')  // Data only, not schema
    pgDumpArgs.push('--inserts')    // Use INSERT statements instead of COPY
    pgDumpArgs.push('--no-owner')   // Don't set ownership
    pgDumpArgs.push('--no-privileges') // Don't dump privileges
    pgDumpArgs.push('--verbose')
    
    // Add WHERE clause if language filter is specified
    if (options.language) {
        pgDumpArgs.push('--where', `language = '${options.language}'`)
        console.log(`   Language filter: ${options.language}`)
    }
    
    // Output file
    pgDumpArgs.push('--file', outputPath)
    
    console.log('   Running pg_dump...')
    console.log(`   Command: pg_dump ${pgDumpArgs.join(' ')}`)
    
    return new Promise((resolve, reject) => {
        const pgDump = spawn('pg_dump', pgDumpArgs, {
            env: {
                ...process.env,
                PGPASSWORD: password
            },
            stdio: ['pipe', 'pipe', 'pipe']
        })
        
        let stdout = ''
        let stderr = ''
        
        pgDump.stdout.on('data', (data) => {
            stdout += data.toString()
        })
        
        pgDump.stderr.on('data', (data) => {
            stderr += data.toString()
            // pg_dump outputs progress to stderr, so show it
            if (data.toString().includes('processing') || data.toString().includes('dumping')) {
                process.stdout.write(`   ${data.toString().trim()}\n`)
            }
        })
        
        pgDump.on('close', async (code) => {
            if (code === 0) {
                console.log(`✅ PostgreSQL dump completed: ${outputPath}`)
                
                // Get file size
                try {
                    const stats = await fs.promises.stat(outputPath)
                    const fileSizeMB = (stats.size / 1024 / 1024).toFixed(1)
                    console.log(`   File size: ${fileSizeMB} MB`)
                    
                    // Count records in dump (rough estimate)
                    const content = await fs.promises.readFile(outputPath, 'utf8')
                    const insertCount = (content.match(/INSERT INTO/g) || []).length
                    console.log(`   Records exported: ~${insertCount.toLocaleString()}`)
                } catch (error) {
                    console.warn('   Could not read file stats:', error)
                }
                
                resolve()
            } else {
                console.error('❌ pg_dump failed with code:', code)
                if (stderr) {
                    console.error('Error output:', stderr)
                }
                reject(new Error(`pg_dump failed with exit code ${code}`))
            }
        })
        
        pgDump.on('error', (error) => {
            if (error.message.includes('ENOENT')) {
                if (isDocker) {
                    reject(new Error('pg_dump command not found in container. Please ensure PostgreSQL client is installed in the Docker image.'))
                } else {
                    reject(new Error('pg_dump command not found. Please install PostgreSQL client tools.'))
                }
            } else {
                reject(error)
            }
        })
    })
}

// Show export statistics
async function showExportStats(): Promise<void> {
    console.log('📊 Google Books Export Statistics:\n')
    
    // Total count
    const total = await prisma.googleBook.count()
    console.log(`   Total records: ${total.toLocaleString()}`)
    
    // Language breakdown
    const languages = await prisma.googleBook.groupBy({
        by: ['language'],
        _count: {language: true},
        orderBy: {_count: {language: 'desc'}},
        take: 10
    })
    
    console.log('\n   Top languages:')
    languages.forEach(lang => {
        const percentage = ((lang._count.language / total) * 100).toFixed(1)
        console.log(`     ${lang.language || 'Unknown'}: ${lang._count.language.toLocaleString()} (${percentage}%)`)
    })
    
    // Publication year breakdown (recent years)
    const yearStats = await prisma.$queryRaw`
        SELECT SUBSTRING("publishedDate", 1, 4) as year,
               COUNT(*) as count
        FROM google_books
        WHERE "publishedDate" IS NOT NULL
          AND "publishedDate" ~ '^[0-9]{4}'
          AND SUBSTRING("publishedDate", 1, 4)::int >= 2010
        GROUP BY SUBSTRING("publishedDate", 1, 4)
        ORDER BY year DESC
        LIMIT 10
    ` as Array<{ year: string; count: bigint }>
    
    console.log('\n   Recent publication years:')
    yearStats.forEach(stat => {
        console.log(`     ${stat.year}: ${Number(stat.count).toLocaleString()}`)
    })
    
    // Top categories
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
    
    console.log('\n   Top categories:')
    categoryStats.forEach(stat => {
        const cleanCategory = stat.category.replace(/^"|"$/g, '') // Remove JSON quotes
        console.log(`     ${cleanCategory}: ${Number(stat.count).toLocaleString()}`)
    })
}

// Parse command line arguments
function parseArgs(): ExportOptions & { mode: string } {
    const args = process.argv.slice(2)
    const options: ExportOptions & { mode: string } = {
        mode: 'csv',
        format: 'csv'
    }
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        
        switch (arg) {
            case '--json':
                options.mode = 'json'
                options.format = 'json'
                break
            case '--csv':
                options.mode = 'csv'
                options.format = 'csv'
                break
            case '--postgres':
                options.mode = 'postgres'
                options.format = 'postgres'
                break
            case '--output':
            case '-o':
                options.outputPath = args[i + 1]
                i++
                break
            case '--limit':
            case '-l':
                options.limit = parseInt(args[i + 1])
                i++
                break
            case '--language':
                options.language = args[i + 1]
                i++
                break
            case '--include-work-id':
                options.includeWorkId = true
                break
            case '--stats':
                options.mode = 'stats'
                break
        }
    }
    
    return options
}

// Main export function
async function exportGoogleBooks() {
    const options = parseArgs()
    
    try {
        switch (options.mode) {
            case 'stats':
                await showExportStats()
                break
            case 'json':
                await exportToJson(options)
                break
            case 'postgres':
                await exportToPostgres(options)
                break
            case 'csv':
            default:
                await exportToCsv(options)
                break
        }
    } catch (error) {
        console.error('❌ Export failed:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Command line help
const HELP_TEXT = `
Google Books Export Script

Usage:
  yarn export:google-books                    # Export all books to CSV
  yarn export:google-books --json             # Export to JSON format
  yarn export:google-books --postgres         # Export to PostgreSQL dump
  yarn export:google-books --stats            # Show export statistics
  yarn export:google-books --language en      # Export only English books

Options:
  --csv                              # Export to CSV format (default)
  --json                             # Export to JSON format  
  --postgres                         # Export to PostgreSQL dump (requires pg_dump)
  --output PATH, -o PATH             # Custom output file path
  --limit N, -l N                    # Limit number of records to export
  --language LANG                    # Filter by language (ISO 639-1 code)
  --include-work-id                  # Include workId column in export
  --stats                            # Show database statistics only
  --help, -h                         # Show this help

Examples:
  yarn export:google-books --limit 10000                    # Export first 10K books
  yarn export:google-books --language fr --json             # Export French books as JSON
  yarn export:google-books --postgres --language en         # PostgreSQL dump of English books
  yarn export:google-books --output /tmp/books.csv          # Custom output path
  yarn export:google-books --language en --include-work-id  # Include work relationships

Output:
  Local: ./exports/google-books-export-TIMESTAMP.csv
  Docker: ./data/google-books-export-TIMESTAMP.csv (mounted volume)
  File includes all book metadata except rawResponse field
  
Docker Usage:
  Run inside backend container: docker exec -it flicklit-backend yarn export:google-books --postgres
  Files will be saved to the mounted ./data directory on the host machine
`

const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
    console.log(HELP_TEXT)
    process.exit(0)
}

// Run the export
if (require.main === module) {
    exportGoogleBooks()
        .then(() => {
            console.log('🎉 Google Books export completed successfully!')
            process.exit(0)
        })
        .catch((error) => {
            console.error('💥 Google Books export failed:', error)
            process.exit(1)
        })
}