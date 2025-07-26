import { PrismaClient } from '../generated/client'

/**
 * WorldCat Search API Client
 * 
 * WorldCat provides several APIs:
 * 1. Search API (public, no key required for basic searches)
 * 2. Metadata API (requires API key)
 * 3. Discovery API (requires subscription)
 * 
 * We'll start with the Search API and upgrade as needed.
 */

// WorldCat API Response Types
export interface WorldCatSearchResult {
  numberOfRecords: number
  records: WorldCatRecord[]
  startIndex: number
  itemsPerPage: number
}

export interface WorldCatRecord {
  oclcNumber: string
  title: string
  creator?: string
  date?: string
  language?: string
  generalFormat?: string
  specificFormat?: string
  edition?: string
  publisher?: string
  publicationPlace?: string
  isbn?: string[]
  issn?: string[]
  summary?: string
  subjects?: string[]
  genres?: string[]
  url?: string
  marcRecordUrl?: string
}

export interface WorldCatSearchParams {
  query: string
  startIndex?: number
  itemsPerPage?: number
  format?: 'json' | 'atom' | 'rss'
  servicelevel?: 'default' | 'full'
  frbrGrouping?: 'on' | 'off'
}

export class WorldCatAPI {
  private baseUrl = 'http://www.worldcat.org/webservices/catalog/search/opensearch'
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  /**
   * Search WorldCat for books by title and author
   */
  async searchBooks(params: WorldCatSearchParams): Promise<WorldCatSearchResult> {
    const searchParams = new URLSearchParams({
      q: params.query,
      format: params.format || 'json',
      startIndex: (params.startIndex || 1).toString(),
      itemsPerPage: (params.itemsPerPage || 10).toString(),
      servicelevel: params.servicelevel || 'default',
      frbrGrouping: params.frbrGrouping || 'on'
    })

    const url = `${this.baseUrl}?${searchParams.toString()}`
    
    try {
      console.log(`🔍 Searching WorldCat: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'FlickLit/1.0 (https://flicklit.com)',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`WorldCat API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return this.parseSearchResponse(data)

    } catch (error) {
      console.error('WorldCat search error:', error)
      throw error
    }
  }

  /**
   * Search for a specific book by title and author
   */
  async searchByTitleAuthor(title: string, author?: string): Promise<WorldCatSearchResult> {
    let query = `title:"${title}"`
    if (author) {
      query += ` AND author:"${author}"`
    }
    
    return this.searchBooks({
      query,
      itemsPerPage: 50,
      servicelevel: 'full'
    })
  }

  /**
   * Search by ISBN
   */
  async searchByISBN(isbn: string): Promise<WorldCatSearchResult> {
    return this.searchBooks({
      query: `isbn:${isbn}`,
      itemsPerPage: 10,
      servicelevel: 'full'
    })
  }

  /**
   * Get detailed record by OCLC number
   */
  async getRecordByOCLC(oclcNumber: string): Promise<WorldCatRecord | null> {
    const results = await this.searchBooks({
      query: `no:${oclcNumber}`,
      itemsPerPage: 1,
      servicelevel: 'full'
    })

    return results.records[0] || null
  }

  /**
   * Save WorldCat record to database
   */
  async saveRecord(record: WorldCatRecord, workId?: number): Promise<number> {
    try {
      const existingRecord = await this.prisma.worldCatBook.findUnique({
        where: { oclcNumber: record.oclcNumber }
      })

      if (existingRecord) {
        console.log(`📚 Updating existing WorldCat record: ${record.oclcNumber}`)
        const updated = await this.prisma.worldCatBook.update({
          where: { oclcNumber: record.oclcNumber },
          data: this.mapRecordToDb(record, workId)
        })
        return updated.id
      } else {
        console.log(`📚 Creating new WorldCat record: ${record.oclcNumber}`)
        const created = await this.prisma.worldCatBook.create({
          data: this.mapRecordToDb(record, workId)
        })
        return created.id
      }

    } catch (error) {
      console.error(`Error saving WorldCat record ${record.oclcNumber}:`, error)
      throw error
    }
  }

  /**
   * Bulk save multiple records
   */
  async saveRecords(records: WorldCatRecord[]): Promise<number[]> {
    const ids: number[] = []
    
    for (const record of records) {
      try {
        const id = await this.saveRecord(record)
        ids.push(id)
      } catch (error) {
        console.warn(`Failed to save record ${record.oclcNumber}:`, error)
      }
    }

    return ids
  }

  /**
   * Find potential matches for existing Work records
   */
  async findMatchesForWork(workId: number): Promise<WorldCatRecord[]> {
    const work = await this.prisma.work.findUnique({
      where: { id: workId },
      include: {
        authors: {
          include: { author: true }
        }
      }
    })

    if (!work) {
      throw new Error(`Work ${workId} not found`)
    }

    const primaryAuthor = work.authors[0]?.author?.name
    const results = await this.searchByTitleAuthor(work.title, primaryAuthor)
    
    return results.records.slice(0, 5) // Return top 5 matches
  }

  /**
   * Parse WorldCat OpenSearch response
   */
  private parseSearchResponse(data: any): WorldCatSearchResult {
    // WorldCat OpenSearch response structure varies
    // This is a simplified parser - may need adjustment based on actual API responses
    
    if (data.feed) {
      // Atom format
      return {
        numberOfRecords: parseInt(data.feed['opensearch:totalResults'] || '0'),
        startIndex: parseInt(data.feed['opensearch:startIndex'] || '1'),
        itemsPerPage: parseInt(data.feed['opensearch:itemsPerPage'] || '10'),
        records: (data.feed.entry || []).map((entry: any) => this.parseAtomEntry(entry))
      }
    } else if (data.results) {
      // JSON format
      return {
        numberOfRecords: data.results.totalResults || 0,
        startIndex: data.results.startIndex || 1,
        itemsPerPage: data.results.itemsPerPage || 10,
        records: (data.results.items || []).map((item: any) => this.parseJsonItem(item))
      }
    } else {
      return {
        numberOfRecords: 0,
        startIndex: 1,
        itemsPerPage: 10,
        records: []
      }
    }
  }

  /**
   * Parse Atom entry to WorldCat record
   */
  private parseAtomEntry(entry: any): WorldCatRecord {
    return {
      oclcNumber: this.extractOCLCNumber(entry.id || ''),
      title: entry.title?._ || entry.title || '',
      creator: entry.author?.name || '',
      date: entry['dc:date'] || '',
      language: entry['dc:language'] || '',
      publisher: entry['dc:publisher'] || '',
      summary: entry.summary?._ || entry.summary || '',
      url: entry.link?.find((l: any) => l.rel === 'alternate')?.href || '',
      isbn: this.extractISBNs(entry['dc:identifier'] || []),
      subjects: this.extractSubjects(entry['dc:subject'] || [])
    }
  }

  /**
   * Parse JSON item to WorldCat record
   */
  private parseJsonItem(item: any): WorldCatRecord {
    return {
      oclcNumber: item.oclcNumber || this.extractOCLCNumber(item.id || ''),
      title: item.title || '',
      creator: item.creator || '',
      date: item.date || '',
      language: item.language || '',
      publisher: item.publisher || '',
      publicationPlace: item.publicationPlace || '',
      edition: item.edition || '',
      summary: item.summary || '',
      url: item.url || '',
      isbn: Array.isArray(item.isbn) ? item.isbn : (item.isbn ? [item.isbn] : []),
      subjects: Array.isArray(item.subjects) ? item.subjects : []
    }
  }

  /**
   * Map WorldCat record to database format
   */
  private mapRecordToDb(record: WorldCatRecord, workId?: number) {
    return {
      oclcNumber: record.oclcNumber,
      worldcatId: record.oclcNumber, // Use OCLC as WorldCat ID for now
      title: record.title,
      subtitle: null, // WorldCat doesn't separate subtitle
      author: record.creator || null,
      authors: record.creator ? [record.creator] : [],
      publisher: record.publisher || null,
      publicationYear: this.parseYear(record.date),
      publicationPlace: record.publicationPlace || null,
      edition: record.edition || null,
      format: record.generalFormat || null,
      physicalDescription: null,
      language: record.language || null,
      languageName: this.getLanguageName(record.language),
      subjects: record.subjects || [],
      genres: record.genres || [],
      isbn10: this.filterISBN10(record.isbn || []),
      isbn13: this.filterISBN13(record.isbn || []),
      summary: record.summary || null,
      notes: [],
      worldcatUrl: record.url || null,
      workId: workId || null
    }
  }

  /**
   * Utility methods
   */
  private extractOCLCNumber(id: string): string {
    const match = id.match(/(\d+)/)
    return match ? match[1] : id
  }

  private extractISBNs(identifiers: string | string[]): string[] {
    const ids = Array.isArray(identifiers) ? identifiers : [identifiers]
    return ids.filter(id => id.includes('ISBN')).map(id => id.replace(/ISBN:?\s*/, ''))
  }

  private extractSubjects(subjects: string | string[]): string[] {
    return Array.isArray(subjects) ? subjects : (subjects ? [subjects] : [])
  }

  private parseYear(date?: string): number | null {
    if (!date) return null
    const match = date.match(/(\d{4})/)
    return match ? parseInt(match[1]) : null
  }

  private getLanguageName(code?: string): string | null {
    const languageMap: Record<string, string> = {
      'eng': 'English',
      'fre': 'French',
      'spa': 'Spanish',
      'ger': 'German',
      'ita': 'Italian',
      'por': 'Portuguese',
      'rus': 'Russian',
      'jpn': 'Japanese',
      'chi': 'Chinese'
    }
    return code ? languageMap[code] || code : null
  }

  private filterISBN10(isbns: string[]): string[] {
    return isbns.filter(isbn => isbn.replace(/[-\s]/g, '').length === 10)
  }

  private filterISBN13(isbns: string[]): string[] {
    return isbns.filter(isbn => isbn.replace(/[-\s]/g, '').length === 13)
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
  }
}

export default WorldCatAPI