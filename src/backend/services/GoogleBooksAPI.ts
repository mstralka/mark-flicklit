import {PrismaClient} from '../generated/client'

/**
 * Google Books API Client
 *
 * Google Books API provides free access to book metadata
 * API Key recommended for higher rate limits
 * Documentation: https://developers.google.com/books/docs/v1/using
 */

// Google Books API Response Types
export interface GoogleBooksSearchResult {
    kind: string
    totalItems: number
    items?: GoogleBooksVolume[]
}

export interface GoogleBooksVolume {
    kind: string
    id: string
    etag: string
    selfLink: string
    volumeInfo: GoogleBooksVolumeInfo
    saleInfo?: GoogleBooksSaleInfo
    accessInfo?: GoogleBooksAccessInfo
    searchInfo?: {
        textSnippet?: string
    }
}

export interface GoogleBooksVolumeInfo {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: Array<{
        type: string // 'ISBN_10' | 'ISBN_13' | 'ISSN' | etc.
        identifier: string
    }>
    readingModes?: {
        text: boolean
        image: boolean
    }
    pageCount?: number
    printType?: string // 'BOOK' | 'MAGAZINE'
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    maturityRating?: string // 'NOT_MATURE' | 'MATURE'
    allowAnonLogging?: boolean
    contentVersion?: string
    panelizationSummary?: {
        containsEpubBubbles: boolean
        containsImageBubbles: boolean
    }
    imageLinks?: {
        smallThumbnail?: string
        thumbnail?: string
        small?: string
        medium?: string
        large?: string
        extraLarge?: string
    }
    language?: string
    previewLink?: string
    infoLink?: string
    canonicalVolumeLink?: string
}

export interface GoogleBooksSaleInfo {
    country: string
    saleability: string // 'FOR_SALE' | 'NOT_FOR_SALE' | 'FREE'
    isEbook: boolean
    listPrice?: {
        amount: number
        currencyCode: string
    }
    salePrice?: {
        amount: number
        currencyCode: string
    }
    buyLink?: string
    offers?: Array<{
        finskyOfferType: number
        listPrice: {
            amountInMicros: number
            currencyCode: string
        }
        salePrice: {
            amountInMicros: number
            currencyCode: string
        }
    }>
}

export interface GoogleBooksAccessInfo {
    country: string
    viewability: string // 'PARTIAL' | 'ALL_PAGES' | 'NO_PAGES'
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string // 'ALLOWED' | 'ALLOWED_FOR_ACCESSIBILITY'
    epub: {
        isAvailable: boolean
        acsTokenLink?: string
    }
    pdf: {
        isAvailable: boolean
        acsTokenLink?: string
    }
    webReaderLink?: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
}

export interface GoogleBooksSearchParams {
    q: string // Search query
    download?: 'epub' // Only return results with download links
    filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks' // Filter results
    langRestrict?: string // ISO 639-1 language code
    libraryRestrict?: 'my-library' | 'no-restrict'
    maxResults?: number // 1-40, default 10
    orderBy?: 'newest' | 'relevance' // Default is relevance
    partner?: string
    printType?: 'all' | 'books' | 'magazines'
    projection?: 'full' | 'lite' // Default is lite
    showPreorders?: boolean
    source?: 'public' | 'personal'
    startIndex?: number // 0-based index
}

export class GoogleBooksAPI {
    private baseUrl = 'https://www.googleapis.com/books/v1'
    private apiKey?: string
    private prisma: PrismaClient
    private lastRequestTime: number = 0
    private requestCount: number = 0
    private dailyRequestLimit: number = 1000 // Default for free tier

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.GOOGLE_BOOKS_API_KEY
        this.prisma = new PrismaClient()

        // Set higher limit if API key is provided (assuming paid tier)
        if (this.apiKey) {
            this.dailyRequestLimit = 100000
        }
    }

    /**
     * Search Google Books
     */
    async searchBooks(params: GoogleBooksSearchParams): Promise<GoogleBooksSearchResult> {
        const searchParams = new URLSearchParams({
            q: params.q,
            maxResults: (params.maxResults || 10).toString(),
            startIndex: (params.startIndex || 0).toString(),
            projection: params.projection || 'full',
            printType: params.printType || 'books'
        })

        if (params.langRestrict) searchParams.set('langRestrict', params.langRestrict)
        if (params.orderBy) searchParams.set('orderBy', params.orderBy)
        if (params.filter) searchParams.set('filter', params.filter)
        if (this.apiKey) searchParams.set('key', this.apiKey)

        const url = `${this.baseUrl}/volumes?${searchParams.toString()}`

        try {
            console.log(`🔍 Searching Google Books: ${params.q}`)

            const response = await this.makeApiRequest(url)
            const data = await response.json() as GoogleBooksSearchResult
            return data

        } catch (error) {
            console.error('Google Books search error:', error)
            throw error
        }
    }

    /**
     * Search by title and author
     */
    async searchByTitleAuthor(title: string, author?: string): Promise<GoogleBooksSearchResult> {
        let query = `intitle:"${title}"`
        if (author) {
            query += ` inauthor:"${author}"`
        }

        return this.searchBooks({
            q: query,
            maxResults: 40,
            projection: 'full'
        })
    }

    /**
     * Search by ISBN
     */
    async searchByISBN(isbn: string): Promise<GoogleBooksSearchResult> {
        return this.searchBooks({
            q: `isbn:${isbn}`,
            maxResults: 10,
            projection: 'full'
        })
    }

    /**
     * Get volume by Google Books ID
     */
    async getVolumeById(volumeId: string): Promise<GoogleBooksVolume | null> {
        const searchParams = new URLSearchParams()
        if (this.apiKey) searchParams.set('key', this.apiKey)

        const url = `${this.baseUrl}/volumes/${volumeId}?${searchParams.toString()}`

        try {
            const response = await this.makeApiRequest(url)

            if (response.status === 404) return null

            return await response.json() as GoogleBooksVolume

        } catch (error) {
            console.error(`Error getting Google Books volume ${volumeId}:`, error)
            throw error
        }
    }

    /**
     * Save Google Books volume to database
     */
    async saveVolume(volume: GoogleBooksVolume, workId?: number): Promise<number | null> {
        try {
            // Skip volumes without titles
            if (!volume.volumeInfo.title) {
                console.log(`📚 Skipping Google Books record ${volume.id}: No title provided`)
                return null
            }

            const existingRecord = await this.prisma.googleBook.findUnique({
                where: {googleBooksId: volume.id}
            })

            if (existingRecord) {
                console.log(`📚 Updating existing Google Books record: ${volume.id}`)
                const updated = await this.prisma.googleBook.update({
                    where: {googleBooksId: volume.id},
                    data: this.mapVolumeToDb(volume, workId)
                })
                return updated.id
            } else {
                console.log(`📚 Creating new Google Books record: ${volume.id}: ${volume.volumeInfo.title} by ${volume.volumeInfo.authors?.join(', ') || 'Unknown Author'}`)
                const created = await this.prisma.googleBook.create({
                    data: this.mapVolumeToDb(volume, workId)
                })
                return created.id
            }

        } catch (error) {
            console.error(`Error saving Google Books volume ${volume.id}:`, error)
            throw error
        }
    }

    /**
     * Bulk save multiple volumes
     */
    async saveVolumes(volumes: GoogleBooksVolume[]): Promise<number[]> {
        const ids: number[] = []

        for (const volume of volumes) {
            try {
                const id = await this.saveVolume(volume)
                if (id !== null) {
                    ids.push(id)
                }
            } catch (error) {
                console.warn(`Failed to save volume ${volume.id}:`, error)
            }
        }

        return ids
    }

    /**
     * Find potential matches for existing Work records
     */
    async findMatchesForWork(workId: number): Promise<GoogleBooksVolume[]> {
        const work = await this.prisma.work.findUnique({
            where: {id: workId},
            include: {
                authors: {
                    include: {author: true}
                }
            }
        })

        if (!work) {
            throw new Error(`Work ${workId} not found`)
        }

        const primaryAuthor = work.authors[0]?.author?.name
        const results = await this.searchByTitleAuthor(work.title, primaryAuthor)

        return results.items?.slice(0, 5) || [] // Return top 5 matches
    }

    /**
     * Map Google Books volume to database format
     */
    private mapVolumeToDb(volume: GoogleBooksVolume, workId?: number) {
        const info = volume.volumeInfo
        const access = volume.accessInfo
        const sale = volume.saleInfo

        const baseData = {
            googleBooksId: volume.id,
            selfLink: volume.selfLink,
            title: info.title,
            subtitle: info.subtitle || null,
            authors: info.authors || [],
            publisher: info.publisher || null,
            publishedDate: info.publishedDate || null,
            pageCount: info.pageCount || null,
            printType: info.printType || null,
            description: info.description || null,
            language: info.language || null,
            categories: info.categories || [],
            maturityRating: info.maturityRating || null,
            isbn10: this.extractISBN10(info.industryIdentifiers),
            isbn13: this.extractISBN13(info.industryIdentifiers),
            industryIdentifiers: info.industryIdentifiers || undefined,
            smallThumbnail: info.imageLinks?.smallThumbnail || null,
            thumbnail: info.imageLinks?.thumbnail || null,
            small: info.imageLinks?.small || null,
            medium: info.imageLinks?.medium || null,
            large: info.imageLinks?.large || null,
            extraLarge: info.imageLinks?.extraLarge || null,
            viewability: access?.viewability || null,
            embeddable: access?.embeddable || null,
            publicDomain: access?.publicDomain || null,
            textToSpeechPermission: access?.textToSpeechPermission || null,
            saleability: sale?.saleability || null,
            listPrice: sale?.listPrice || undefined,
            averageRating: info.averageRating || null,
            ratingsCount: info.ratingsCount || null,
            previewLink: info.previewLink || null,
            infoLink: info.infoLink || null,
            canonicalVolumeLink: info.canonicalVolumeLink || null,
            rawResponse: volume as any // Store full response for debugging
        }

        // Add work relation if workId is provided
        if (workId) {
            return {
                ...baseData,
                work: {connect: {id: workId}}
            }
        }

        return baseData
    }

    /**
     * Extract ISBN-10 from industry identifiers
     */
    private extractISBN10(identifiers?: Array<{ type: string, identifier: string }>): string[] {
        if (!identifiers) return []
        return identifiers
            .filter(id => id.type === 'ISBN_10')
            .map(id => id.identifier)
    }

    /**
     * Extract ISBN-13 from industry identifiers
     */
    private extractISBN13(identifiers?: Array<{ type: string, identifier: string }>): string[] {
        if (!identifiers) return []
        return identifiers
            .filter(id => id.type === 'ISBN_13')
            .map(id => id.identifier)
    }

    /**
     * Exponential backoff with jitter for rate limiting
     */
    private async exponentialBackoff(attempt: number, baseDelayMs: number = 1000): Promise<void> {
        // Calculate exponential backoff: baseDelay * (2^attempt) with jitter
        const exponentialDelay = baseDelayMs * Math.pow(2, attempt)
        const jitter = Math.random() * 0.1 * exponentialDelay // Add up to 10% jitter
        const totalDelay = Math.min(exponentialDelay + jitter, 300000) // Cap at 5 minutes

        console.log(`   ⏳ Rate limit hit, backing off ${(totalDelay / 1000).toFixed(1)}s (attempt ${attempt + 1})`)
        return new Promise(resolve => setTimeout(resolve, totalDelay))
    }

    /**
     * Rate limiting helper with request counting
     */
    private async rateLimitDelay(delayMs: number = 100): Promise<void> {
        const now = Date.now()
        const timeSinceLastRequest = now - this.lastRequestTime

        // Enforce minimum delay between requests
        if (timeSinceLastRequest < delayMs) {
            await new Promise(resolve => setTimeout(resolve, delayMs - timeSinceLastRequest))
        }

        this.lastRequestTime = Date.now()
        this.requestCount++

        // Warn when approaching daily limits
        if (this.requestCount > this.dailyRequestLimit * 0.9) {
            console.log(`   ⚠️  Approaching daily request limit: ${this.requestCount}/${this.dailyRequestLimit}`)
        }
    }

    /**
     * Make API request with retry logic for rate limiting
     */
    private async makeApiRequest(url: string, maxRetries: number = 5): Promise<Response> {
        let lastError: Error = new Error('Unknown error')

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                // Apply rate limiting delay before each request
                await this.rateLimitDelay(this.apiKey ? 50 : 100) // Shorter delay with API key

                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'FlickLit/1.0 gzip (https://flicklit.com)',
                        'Accept': 'application/json',
                        'Accept-Encoding': 'gzip'
                    }
                })

                // Log local quota tracking (Google doesn't provide headers)
                this.logRateLimitInfo()

                // Handle rate limiting
                if (response.status === 429) {
                    if (attempt === maxRetries) {
                        throw new Error(`Google Books API rate limit exceeded after ${maxRetries + 1} attempts`)
                    }

                    // Check if we have retry-after header
                    const retryAfter = response.headers.get('retry-after')
                    if (retryAfter) {
                        const retryDelayMs = parseInt(retryAfter) * 1000
                        console.log(`   ⏳ Rate limit with Retry-After: ${retryAfter}s`)
                        await new Promise(resolve => setTimeout(resolve, retryDelayMs))
                    } else {
                        // Use exponential backoff
                        await this.exponentialBackoff(attempt)
                    }
                    continue
                }

                // Handle other HTTP errors
                if (!response.ok) {
                    throw new Error(`Google Books API error: ${response.status} ${response.statusText}`)
                }

                return response

            } catch (error) {
                lastError = error as Error

                // Only retry on network errors or 429s
                if (attempt < maxRetries && (
                    error instanceof TypeError || // Network errors
                    (error as Error).message.includes('429') ||
                    (error as Error).message.includes('rate limit')
                )) {
                    await this.exponentialBackoff(attempt)
                    continue
                }

                // Don't retry other errors
                break
            }
        }

        throw lastError
    }

    /**
     * Log rate limit information using local tracking
     * (Google Books API doesn't provide quota headers)
     */
    private logRateLimitInfo(): void {
        const estimated = Math.max(0, this.dailyRequestLimit - this.requestCount)
        const percentUsed = (this.requestCount / this.dailyRequestLimit) * 100
        const percentRemaining = ((estimated / this.dailyRequestLimit) * 100).toFixed(1)

        // Only log every 10 requests to reduce noise
        if (this.requestCount % 10 === 0 || estimated < 100) {
            console.log(`   📊 Estimated quota: ${estimated.toLocaleString()}/${this.dailyRequestLimit.toLocaleString()} remaining (${percentRemaining}%)`)
        }

        // Warn when running low
        if (estimated < 100 && estimated > 0) {
            console.log(`   ⚠️  API quota running low: ${estimated} requests remaining`)
        } else if (estimated === 0) {
            console.log(`   🚫 Estimated daily quota exhausted (${this.requestCount}/${this.dailyRequestLimit})`)
        }

        // Warn at key milestones
        if (percentUsed >= 90 && this.requestCount % 50 === 0) {
            console.log(`   ⚠️  Used ${percentUsed.toFixed(1)}% of daily quota`)
        }
    }

    /**
     * Get current API usage statistics
     */
    public getUsageStats(): {
        requestCount: number
        dailyLimit: number
        estimatedRemaining: number
        percentUsed: number
    } {
        const estimatedRemaining = Math.max(0, this.dailyRequestLimit - this.requestCount)
        const percentUsed = (this.requestCount / this.dailyRequestLimit) * 100

        return {
            requestCount: this.requestCount,
            dailyLimit: this.dailyRequestLimit,
            estimatedRemaining,
            percentUsed
        }
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect()
    }
}

export default GoogleBooksAPI