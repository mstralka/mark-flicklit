import type { WorkWithAuthors } from '../models'
import type { ContentFeatures, SimilarityWeights, WorkSimilarity } from '../types'
import { DEFAULT_SIMILARITY_WEIGHTS } from '../types'

export class ContentSimilarity {
  private weights: SimilarityWeights

  constructor(weights: SimilarityWeights = DEFAULT_SIMILARITY_WEIGHTS) {
    this.weights = weights
  }

  /**
   * Calculate similarity between two works based on content features
   */
  calculateSimilarity(work1: WorkWithAuthors, work2: WorkWithAuthors): number {
    const features1 = this.extractFeatures(work1)
    const features2 = this.extractFeatures(work2)

    const subjectSim = this.calculateArraySimilarity(features1.subjects, features2.subjects)
    const placeSim = this.calculateArraySimilarity(features1.subjectPlaces, features2.subjectPlaces)
    const timeSim = this.calculateArraySimilarity(features1.subjectTimes, features2.subjectTimes)
    const peopleSim = this.calculateArraySimilarity(features1.subjectPeople, features2.subjectPeople)
    const languageSim = this.calculateArraySimilarity(features1.originalLanguages, features2.originalLanguages)
    const temporalSim = this.calculateTemporalSimilarity(features1.firstPublishDate, features2.firstPublishDate)
    const authorSim = this.calculateArraySimilarity(
      features1.authorIds.map((id: number) => id.toString()), 
      features2.authorIds.map((id: number) => id.toString())
    )

    return (
      subjectSim * this.weights.subjects +
      placeSim * this.weights.places +
      timeSim * this.weights.times +
      peopleSim * this.weights.people +
      languageSim * this.weights.languages +
      temporalSim * this.weights.temporal +
      authorSim * this.weights.authors
    )
  }

  /**
   * Find the most similar works to a given work
   */
  findSimilarWorks(targetWork: WorkWithAuthors, candidateWorks: WorkWithAuthors[], limit: number = 10): WorkSimilarity[] {
    const similarities: WorkSimilarity[] = candidateWorks
      .filter(work => work.id !== targetWork.id)
      .map(work => ({
        workId: work.id,
        similarity: this.calculateSimilarity(targetWork, work)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)

    return similarities
  }

  /**
   * Calculate similarity between multiple works and a target work
   */
  calculateAverageUserSimilarity(likedWorks: WorkWithAuthors[], candidateWork: WorkWithAuthors): number {
    if (likedWorks.length === 0) return 0

    const similarities = likedWorks.map(work => this.calculateSimilarity(work, candidateWork))
    return similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length
  }

  /**
   * Extract content features from a work
   */
  private extractFeatures(work: WorkWithAuthors): ContentFeatures {
    return {
      subjects: work.subjects || [],
      subjectPlaces: work.subjectPlaces || [],
      subjectTimes: work.subjectTimes || [],
      subjectPeople: work.subjectPeople || [],
      originalLanguages: work.originalLanguages || [],
      firstPublishDate: work.firstPublishDate,
      authorIds: work.authors.map(author => author.authorId)
    }
  }

  /**
   * Calculate Jaccard similarity between two arrays
   */
  private calculateArraySimilarity(arr1: string[], arr2: string[]): number {
    if (arr1.length === 0 && arr2.length === 0) return 1
    if (arr1.length === 0 || arr2.length === 0) return 0

    const set1 = new Set(arr1.map(item => item.toLowerCase()))
    const set2 = new Set(arr2.map(item => item.toLowerCase()))
    
    const intersection = new Set([...set1].filter(item => set2.has(item)))
    const union = new Set([...set1, ...set2])
    
    return intersection.size / union.size
  }

  /**
   * Calculate temporal similarity based on publication dates
   */
  private calculateTemporalSimilarity(date1?: string, date2?: string): number {
    if (!date1 || !date2) return 0.5 // Neutral similarity for missing dates
    
    const year1 = this.extractYear(date1)
    const year2 = this.extractYear(date2)
    
    if (!year1 || !year2) return 0.5
    
    const yearDiff = Math.abs(year1 - year2)
    
    // Similarity decreases with year difference, but levels off after 50 years
    return Math.max(0, 1 - (yearDiff / 50))
  }

  /**
   * Extract year from publication date string
   */
  private extractYear(dateStr: string): number | null {
    const yearMatch = dateStr.match(/(\d{4})/)
    return yearMatch ? parseInt(yearMatch[1], 10) : null
  }

  /**
   * Calculate TF-IDF weights for subjects across a collection of works
   */
  calculateTfIdfWeights(works: WorkWithAuthors[]): Record<string, number> {
    const subjectCounts: Record<string, number> = {}
    const documentCounts: Record<string, number> = {}
    
    // Count subject frequencies and document frequencies
    works.forEach(work => {
      const subjects = new Set(work.subjects.map(s => s.toLowerCase()))
      
      subjects.forEach(subject => {
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1
        documentCounts[subject] = (documentCounts[subject] || 0) + 1
      })
    })
    
    const totalDocuments = works.length
    const tfIdfWeights: Record<string, number> = {}
    
    Object.keys(subjectCounts).forEach(subject => {
      const tf = subjectCounts[subject]
      const df = documentCounts[subject]
      const idf = Math.log(totalDocuments / df)
      tfIdfWeights[subject] = tf * idf
    })
    
    return tfIdfWeights
  }

  /**
   * Update similarity weights
   */
  updateWeights(newWeights: Partial<SimilarityWeights>): void {
    this.weights = { ...this.weights, ...newWeights }
  }
}