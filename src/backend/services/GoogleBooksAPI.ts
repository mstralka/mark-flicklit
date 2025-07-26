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

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.GOOGLE_BOOKS_API_KEY
        this.prisma = new PrismaClient()
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

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'FlickLit/1.0 (https://flicklit.com)',
                    'Accept': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Google Books API error: ${response.status} ${response.statusText}`)
            }

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
            const response = await fetch(url)
            if (!response.ok) {
                if (response.status === 404) return null
                throw new Error(`Google Books API error: ${response.status} ${response.statusText}`)
            }

            return await response.json() as GoogleBooksVolume

        } catch (error) {
            console.error(`Error getting Google Books volume ${volumeId}:`, error)
            throw error
        }
    }

    /**
     * Save Google Books volume to database
     */
    async saveVolume(volume: GoogleBooksVolume, workId?: number): Promise<number> {
        try {
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
                ids.push(id)
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
     * Rate limiting helper
     */
    private async rateLimitDelay(delayMs: number = 100): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, delayMs))
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect()
    }
}

export default GoogleBooksAPI