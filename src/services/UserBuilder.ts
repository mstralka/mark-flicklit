import { PrismaClient } from '@/generated/client'
import type { UserInteraction } from '@/types'
import type { WorkWithAuthors } from '@/models'
import { parseWork } from '../models/Work'
import { parseAuthor } from '../models/Author'

export interface UserProfile {
  id: number
  createdAt: Date
  updatedAt: Date
  
  // Preference weights (0-1 scale)
  subjectPreferences: Record<string, number>
  placePreferences: Record<string, number>
  timePreferences: Record<string, number>
  peoplePreferences: Record<string, number>
  languagePreferences: Record<string, number>
  
  // Temporal preferences
  preferredPublishEra?: string
  
  // Negative preferences (subjects/attributes to avoid)
  dislikedSubjects: Record<string, number>
  dislikedPlaces: Record<string, number>
  dislikedAuthors: Record<string, number>
  
  // Interaction stats
  totalLikes: number
  totalDislikes: number
  lastInteractionAt?: Date
}

export class UserBuilder {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Build or update user profile based on interaction history
   */
  async buildUserProfile(userId: number): Promise<UserProfile> {
    const interactions = await this.getUserInteractions(userId)
    const likedWorks = await this.getLikedWorks(interactions)
    const dislikedWorks = await this.getDislikedWorks(interactions)

    return {
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      
      // Build preference weights from liked works
      subjectPreferences: this.buildPreferences(likedWorks, 'subjects'),
      placePreferences: this.buildPreferences(likedWorks, 'subjectPlaces'),
      timePreferences: this.buildPreferences(likedWorks, 'subjectTimes'),
      peoplePreferences: this.buildPreferences(likedWorks, 'subjectPeople'),
      languagePreferences: this.buildPreferences(likedWorks, 'originalLanguages'),
      
      preferredPublishEra: this.calculatePreferredEra(likedWorks),
      
      // Build negative preferences from disliked works
      dislikedSubjects: this.buildPreferences(dislikedWorks, 'subjects'),
      dislikedPlaces: this.buildPreferences(dislikedWorks, 'subjectPlaces'),
      dislikedAuthors: this.buildAuthorDislikes(dislikedWorks),
      
      totalLikes: interactions.filter(i => i.liked).length,
      totalDislikes: interactions.filter(i => !i.liked).length,
      lastInteractionAt: interactions[0]?.createdAt
    }
  }

  /**
   * Update user profile incrementally with new interaction
   */
  async updateUserProfile(user: UserProfile, workId: number, liked: boolean): Promise<UserProfile> {
    const work = await this.getWorkWithAuthors(workId)
    if (!work) return user

    const updatedUser = { ...user }
    
    if (liked) {
      // Update positive preferences
      this.incrementPreferences(updatedUser.subjectPreferences, work.subjects)
      this.incrementPreferences(updatedUser.placePreferences, work.subjectPlaces)
      this.incrementPreferences(updatedUser.timePreferences, work.subjectTimes)
      this.incrementPreferences(updatedUser.peoplePreferences, work.subjectPeople)
      this.incrementPreferences(updatedUser.languagePreferences, work.originalLanguages)
      
      updatedUser.totalLikes++
    } else {
      // Update negative preferences
      this.incrementPreferences(updatedUser.dislikedSubjects, work.subjects)
      this.incrementPreferences(updatedUser.dislikedPlaces, work.subjectPlaces)
      
      // Add authors to dislike list
      work.authors.forEach(authorWork => {
        const authorId = authorWork.authorId.toString()
        updatedUser.dislikedAuthors[authorId] = (updatedUser.dislikedAuthors[authorId] || 0) + 1
      })
      
      updatedUser.totalDislikes++
    }
    
    updatedUser.lastInteractionAt = new Date()
    updatedUser.updatedAt = new Date()
    
    // Normalize preferences to keep them between 0-1
    this.normalizePreferences(updatedUser.subjectPreferences)
    this.normalizePreferences(updatedUser.placePreferences)
    this.normalizePreferences(updatedUser.timePreferences)
    this.normalizePreferences(updatedUser.peoplePreferences)
    this.normalizePreferences(updatedUser.languagePreferences)
    
    return updatedUser
  }

  /**
   * Get user interaction history
   */
  private async getUserInteractions(userId: number): Promise<UserInteraction[]> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 1000 // Limit to recent interactions for performance
    })

    return interactions.map(interaction => ({
      id: interaction.id,
      userId: interaction.userId,
      workId: interaction.workId,
      liked: interaction.liked,
      createdAt: interaction.createdAt
    }))
  }

  /**
   * Get works that user liked with full author information
   */
  private async getLikedWorks(interactions: UserInteraction[]): Promise<WorkWithAuthors[]> {
    const likedWorkIds = interactions.filter(i => i.liked).map(i => i.workId)
    return this.getWorksWithAuthors(likedWorkIds)
  }

  /**
   * Get works that user disliked with full author information
   */
  private async getDislikedWorks(interactions: UserInteraction[]): Promise<WorkWithAuthors[]> {
    const dislikedWorkIds = interactions.filter(i => !i.liked).map(i => i.workId)
    return this.getWorksWithAuthors(dislikedWorkIds)
  }

  /**
   * Fetch works with author information
   */
  private async getWorksWithAuthors(workIds: number[]): Promise<WorkWithAuthors[]> {
    if (workIds.length === 0) return []

    const works = await this.prisma.work.findMany({
      where: { id: { in: workIds } },
      include: {
        authors: {
          include: {
            author: true
          }
        }
      }
    })

    return works.map(work => ({
      ...parseWork(work),
      authors: work.authors.map(authorWork => ({
        id: authorWork.id,
        authorId: authorWork.authorId,
        workId: authorWork.workId,
        role: authorWork.role || undefined,
        author: parseAuthor(authorWork.author)
      }))
    }))
  }

  /**
   * Get single work with authors
   */
  private async getWorkWithAuthors(workId: number): Promise<WorkWithAuthors | null> {
    const works = await this.getWorksWithAuthors([workId])
    return works[0] || null
  }

  /**
   * Build preference weights from array of works
   */
  private buildPreferences(works: WorkWithAuthors[], field: keyof Pick<WorkWithAuthors, 'subjects' | 'subjectPlaces' | 'subjectTimes' | 'subjectPeople' | 'originalLanguages'>): Record<string, number> {
    const preferences: Record<string, number> = {}
    const totalWorks = works.length
    
    if (totalWorks === 0) return preferences

    works.forEach(work => {
      const values = work[field] as string[]
      values.forEach(value => {
        const key = value.toLowerCase()
        preferences[key] = (preferences[key] || 0) + 1
      })
    })

    // Convert counts to normalized weights (0-1 scale)
    Object.keys(preferences).forEach(key => {
      preferences[key] = preferences[key] / totalWorks
    })

    return preferences
  }

  /**
   * Build author dislike preferences
   */
  private buildAuthorDislikes(works: WorkWithAuthors[]): Record<string, number> {
    const dislikes: Record<string, number> = {}
    const totalWorks = works.length
    
    if (totalWorks === 0) return dislikes

    works.forEach(work => {
      work.authors.forEach(authorWork => {
        const authorId = authorWork.authorId.toString()
        dislikes[authorId] = (dislikes[authorId] || 0) + 1
      })
    })

    // Convert to normalized weights
    Object.keys(dislikes).forEach(authorId => {
      dislikes[authorId] = dislikes[authorId] / totalWorks
    })

    return dislikes
  }

  /**
   * Calculate preferred publication era from liked works
   */
  private calculatePreferredEra(works: WorkWithAuthors[]): string | undefined {
    const years = works
      .map(work => work.firstPublishDate)
      .filter(Boolean)
      .map(date => this.extractYear(date!))
      .filter(Boolean) as number[]

    if (years.length === 0) return undefined

    years.sort((a, b) => a - b)
    const median = years[Math.floor(years.length / 2)]

    // Define eras based on median year
    if (median < 1800) return 'classical'
    if (median < 1900) return '19th-century'
    if (median < 1950) return 'early-20th-century'
    if (median < 2000) return 'mid-20th-century'
    return 'contemporary'
  }

  /**
   * Extract year from date string
   */
  private extractYear(dateStr: string): number | null {
    const yearMatch = dateStr.match(/(\d{4})/)
    return yearMatch ? parseInt(yearMatch[1], 10) : null
  }

  /**
   * Increment preference values for given items
   */
  private incrementPreferences(preferences: Record<string, number>, items: string[]): void {
    items.forEach(item => {
      const key = item.toLowerCase()
      preferences[key] = (preferences[key] || 0) + 0.1 // Small increment
    })
  }

  /**
   * Normalize preferences to 0-1 scale
   */
  private normalizePreferences(preferences: Record<string, number>): void {
    const maxValue = Math.max(...Object.values(preferences))
    if (maxValue > 1) {
      Object.keys(preferences).forEach(key => {
        preferences[key] = preferences[key] / maxValue
      })
    }
  }
}