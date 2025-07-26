import type { WorkWithAuthors } from '@/models'
import type { User } from '@/types'
import type { RecommendationScoreCalculation } from '../types/recommendation-engine'

export interface DiversityMetrics {
  subjectDiversity: number
  authorDiversity: number
  temporalDiversity: number
  languageDiversity: number
  overallDiversity: number
}

export interface NoveltyScore {
  workId: number
  subjectNovelty: number
  authorNovelty: number
  temporalNovelty: number
  overallNovelty: number
}

export class DiversityEngine {
  private readonly DIVERSITY_WEIGHT = 0.3
  private readonly NOVELTY_WEIGHT = 0.2

  /**
   * Apply diversity constraints to recommendations to avoid filter bubbles
   */
  diversifyRecommendations(
    recommendations: RecommendationScoreCalculation[],
    user: User,
    targetDiversity: number = 0.7
  ): RecommendationScoreCalculation[] {
    if (recommendations.length <= 1) return recommendations

    const diversified: RecommendationScoreCalculation[] = []
    const selectedWorks: Set<number> = new Set()

    // Always include the top recommendation
    diversified.push(recommendations[0])
    selectedWorks.add(recommendations[0].workId)

    // For remaining recommendations, balance score with diversity
    for (let i = 1; i < recommendations.length; i++) {
      const candidate = recommendations[i]
      
      if (selectedWorks.has(candidate.workId)) continue

      const diversityBonus = this.calculateDiversityBonus(
        candidate,
        diversified,
        user,
        targetDiversity
      )

      // Adjust final score with diversity bonus
      const adjustedScore = candidate.finalScore + (diversityBonus * this.DIVERSITY_WEIGHT)
      
      diversified.push({
        ...candidate,
        finalScore: adjustedScore,
        reasons: [...candidate.reasons, ...(diversityBonus > 0.1 ? ['Adds diversity'] : [])]
      })
      
      selectedWorks.add(candidate.workId)
    }

    // Re-sort by adjusted scores
    return diversified.sort((a, b) => b.finalScore - a.finalScore)
  }

  /**
   * Calculate novelty scores for introducing new content to user
   */
  calculateNoveltyScores(
    works: WorkWithAuthors[],
    user: User
  ): NoveltyScore[] {
    return works.map(work => {
      const subjectNovelty = this.calculateSubjectNovelty(work, user)
      const authorNovelty = this.calculateAuthorNovelty(work, user)
      const temporalNovelty = this.calculateTemporalNovelty(work, user)
      
      const overallNovelty = (
        subjectNovelty * 0.5 +
        authorNovelty * 0.3 +
        temporalNovelty * 0.2
      )

      return {
        workId: work.id,
        subjectNovelty,
        authorNovelty,
        temporalNovelty,
        overallNovelty
      }
    })
  }

  /**
   * Analyze diversity metrics of a recommendation set
   */
  analyzeDiversity(
    works: WorkWithAuthors[],
    _user?: User
  ): DiversityMetrics {
    if (works.length === 0) {
      return {
        subjectDiversity: 0,
        authorDiversity: 0,
        temporalDiversity: 0,
        languageDiversity: 0,
        overallDiversity: 0
      }
    }

    const subjectDiversity = this.calculateSubjectDiversity(works)
    const authorDiversity = this.calculateAuthorDiversity(works)
    const temporalDiversity = this.calculateTemporalDiversity(works)
    const languageDiversity = this.calculateLanguageDiversity(works)

    const overallDiversity = (
      subjectDiversity * 0.4 +
      authorDiversity * 0.3 +
      temporalDiversity * 0.2 +
      languageDiversity * 0.1
    )

    return {
      subjectDiversity,
      authorDiversity,
      temporalDiversity,
      languageDiversity,
      overallDiversity
    }
  }

  /**
   * Filter out recommendations that are too similar to recently recommended items
   */
  filterSimilarRecommendations(
    recommendations: RecommendationScoreCalculation[],
    recentlyRecommended: number[],
    _similarityThreshold: number = 0.8
  ): RecommendationScoreCalculation[] {
    // For this implementation, we'll use a simple approach
    // In a full implementation, you'd calculate actual similarity scores
    return recommendations.filter(rec => 
      !recentlyRecommended.includes(rec.workId)
    )
  }

  /**
   * Calculate diversity bonus for a recommendation candidate
   */
  private calculateDiversityBonus(
    _candidate: RecommendationScoreCalculation,
    currentRecommendations: RecommendationScoreCalculation[],
    _user: User,
    targetDiversity: number
  ): number {
    if (currentRecommendations.length === 0) return 0

    // This is a simplified diversity calculation
    // In practice, you'd need the actual work objects to calculate true diversity
    
    // For now, return a small bonus for variety
    const positionPenalty = currentRecommendations.length * 0.02 // Slight penalty for later positions
    const diversityNeed = Math.max(0, targetDiversity - 0.5) // Assume current diversity is 0.5
    
    return diversityNeed * 0.1 - positionPenalty
  }

  /**
   * Calculate subject novelty - how new are the subjects to the user
   */
  private calculateSubjectNovelty(work: WorkWithAuthors, user: User): number {
    const workSubjects = work.subjects.map(s => s.toLowerCase())
    const userSubjects = Object.keys(user.subjectPreferences)
    
    const novelSubjects = workSubjects.filter(subject => 
      !userSubjects.includes(subject)
    )
    
    return workSubjects.length > 0 ? novelSubjects.length / workSubjects.length : 0
  }

  /**
   * Calculate author novelty - how new are the authors to the user
   */
  private calculateAuthorNovelty(work: WorkWithAuthors, user: User): number {
    const workAuthors = work.authors.map(a => a.authorId)
    const knownAuthors = new Set([
      ...Object.keys(user.dislikedAuthors)
      // In a full implementation, you'd also include liked authors
    ])
    
    const novelAuthors = workAuthors.filter(authorId => 
      !knownAuthors.has(authorId.toString())
    )
    
    return workAuthors.length > 0 ? novelAuthors.length / workAuthors.length : 1
  }

  /**
   * Calculate temporal novelty - how different is the publication era
   */
  private calculateTemporalNovelty(work: WorkWithAuthors, user: User): number {
    if (!work.firstPublishDate || !user.preferredPublishEra) return 0.5

    const workEra = this.determineWorkEra(work.firstPublishDate)
    const userEra = user.preferredPublishEra
    
    // Return 1 for different eras, 0 for same era
    return workEra !== userEra ? 1 : 0
  }

  /**
   * Calculate subject diversity within a set of works
   */
  private calculateSubjectDiversity(works: WorkWithAuthors[]): number {
    const allSubjects = new Set<string>()
    let totalSubjects = 0

    for (const work of works) {
      for (const subject of work.subjects) {
        allSubjects.add(subject.toLowerCase())
        totalSubjects++
      }
    }

    return totalSubjects > 0 ? allSubjects.size / totalSubjects : 0
  }

  /**
   * Calculate author diversity within a set of works
   */
  private calculateAuthorDiversity(works: WorkWithAuthors[]): number {
    const allAuthors = new Set<string>()
    let totalAuthorWorks = 0

    for (const work of works) {
      for (const author of work.authors) {
        allAuthors.add(author.authorId.toString())
        totalAuthorWorks++
      }
    }

    return totalAuthorWorks > 0 ? allAuthors.size / totalAuthorWorks : 0
  }

  /**
   * Calculate temporal diversity (spread across different eras)
   */
  private calculateTemporalDiversity(works: WorkWithAuthors[]): number {
    const eras = new Set<string>()
    let totalWorks = 0

    for (const work of works) {
      if (work.firstPublishDate) {
        eras.add(this.determineWorkEra(work.firstPublishDate))
        totalWorks++
      }
    }

    return totalWorks > 0 ? eras.size / Math.min(totalWorks, 5) : 0 // Max 5 eras
  }

  /**
   * Calculate language diversity
   */
  private calculateLanguageDiversity(works: WorkWithAuthors[]): number {
    const allLanguages = new Set<string>()
    let totalLanguageEntries = 0

    for (const work of works) {
      for (const language of work.originalLanguages) {
        allLanguages.add(language.toLowerCase())
        totalLanguageEntries++
      }
    }

    return totalLanguageEntries > 0 ? allLanguages.size / totalLanguageEntries : 0
  }

  /**
   * Determine work era from publication date
   */
  private determineWorkEra(firstPublishDate: string): string {
    const year = this.extractYear(firstPublishDate)
    if (!year) return 'unknown'

    if (year < 1800) return 'classical'
    if (year < 1900) return '19th-century'
    if (year < 1950) return 'early-20th-century'
    if (year < 2000) return 'mid-20th-century'
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
   * Apply serendipity injection - occasionally recommend unexpected items
   */
  injectSerendipity(
    recommendations: RecommendationScoreCalculation[],
    candidateWorks: WorkWithAuthors[],
    user: User,
    serendipityRate: number = 0.1
  ): RecommendationScoreCalculation[] {
    const serendipityCount = Math.ceil(recommendations.length * serendipityRate)
    
    if (serendipityCount === 0 || candidateWorks.length === 0) {
      return recommendations
    }

    // Find works that are very different from user preferences
    const noveltyScores = this.calculateNoveltyScores(candidateWorks, user)
    const highNoveltyWorks = noveltyScores
      .filter(score => score.overallNovelty > 0.7)
      .sort((a, b) => b.overallNovelty - a.overallNovelty)
      .slice(0, serendipityCount)

    // Replace some low-scoring recommendations with serendipitous ones
    const result = [...recommendations]
    const replaceStart = Math.max(0, result.length - serendipityCount)

    for (let i = 0; i < highNoveltyWorks.length; i++) {
      const replaceIndex = replaceStart + i
      if (replaceIndex < result.length) {
        result[replaceIndex] = {
          workId: highNoveltyWorks[i].workId,
          contentScore: 0.2,
          collaborativeScore: 0.1,
          noveltyBonus: highNoveltyWorks[i].overallNovelty * this.NOVELTY_WEIGHT,
          negativeMultiplier: 1.0,
          finalScore: 0.3 + (highNoveltyWorks[i].overallNovelty * this.NOVELTY_WEIGHT),
          reasons: ['Serendipitous discovery', 'Explores new territory']
        }
      }
    }

    return result
  }
}