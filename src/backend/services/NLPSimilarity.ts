import type { WorkWithAuthors } from '../models'

export interface TextFeatures {
  tokens: string[]
  bigrams: string[]
  trigrams: string[]
  wordFrequency: Record<string, number>
  tfidf: Record<string, number>
}

export interface SemanticSimilarity {
  workA: number
  workB: number
  titleSimilarity: number
  descriptionSimilarity: number
  combinedSimilarity: number
}

export class NLPSimilarity {
  private stopWords: Set<string>
  private documentFrequencies: Record<string, number> = {}
  private totalDocuments: number = 0

  constructor() {
    // Common English stop words
    this.stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
      'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
      'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
    ])
  }

  /**
   * Calculate semantic similarity between two works
   */
  calculateSimilarity(work1: WorkWithAuthors, work2: WorkWithAuthors): SemanticSimilarity {
    const titleSimilarity = this.calculateTextSimilarity(
      work1.title + (work1.subtitle ? ' ' + work1.subtitle : ''),
      work2.title + (work2.subtitle ? ' ' + work2.subtitle : '')
    )

    const descriptionSimilarity = this.calculateTextSimilarity(
      work1.description || '',
      work2.description || ''
    )

    // Weight title more heavily than description
    const combinedSimilarity = (titleSimilarity * 0.4) + (descriptionSimilarity * 0.6)

    return {
      workA: work1.id,
      workB: work2.id,
      titleSimilarity,
      descriptionSimilarity,
      combinedSimilarity
    }
  }

  /**
   * Find works most similar to a target work based on text content
   */
  findSimilarWorks(
    targetWork: WorkWithAuthors, 
    candidateWorks: WorkWithAuthors[], 
    limit: number = 10
  ): Array<{ workId: number; similarity: number }> {
    const similarities = candidateWorks
      .filter(work => work.id !== targetWork.id)
      .map(work => {
        const result = this.calculateSimilarity(targetWork, work)
        return {
          workId: work.id,
          similarity: result.combinedSimilarity
        }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)

    return similarities
  }

  /**
   * Calculate TF-IDF weighted similarity between two texts
   */
  private calculateTextSimilarity(text1: string, text2: string): number {
    if (!text1 || !text2) return 0

    const features1 = this.extractTextFeatures(text1)
    const features2 = this.extractTextFeatures(text2)

    // Calculate cosine similarity using TF-IDF vectors
    return this.cosineSimilarity(features1.tfidf, features2.tfidf)
  }

  /**
   * Extract text features including tokens, n-grams, and TF-IDF
   */
  private extractTextFeatures(text: string): TextFeatures {
    const cleanText = this.cleanText(text)
    const tokens = this.tokenize(cleanText)
    const filteredTokens = tokens.filter(token => !this.stopWords.has(token))
    
    const bigrams = this.generateNGrams(filteredTokens, 2)
    const trigrams = this.generateNGrams(filteredTokens, 3)
    
    const wordFrequency = this.calculateTermFrequency(filteredTokens)
    const tfidf = this.calculateTFIDF(wordFrequency, filteredTokens.length)

    return {
      tokens: filteredTokens,
      bigrams,
      trigrams,
      wordFrequency,
      tfidf
    }
  }

  /**
   * Clean and normalize text
   */
  private cleanText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
  }

  /**
   * Tokenize text into words
   */
  private tokenize(text: string): string[] {
    return text.split(/\s+/).filter(token => token.length > 2) // Filter out very short words
  }

  /**
   * Generate n-grams from tokens
   */
  private generateNGrams(tokens: string[], n: number): string[] {
    const ngrams: string[] = []
    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.push(tokens.slice(i, i + n).join(' '))
    }
    return ngrams
  }

  /**
   * Calculate term frequency for tokens
   */
  private calculateTermFrequency(tokens: string[]): Record<string, number> {
    const frequency: Record<string, number> = {}
    const totalTokens = tokens.length

    for (const token of tokens) {
      frequency[token] = (frequency[token] || 0) + 1
    }

    // Normalize by total tokens (TF)
    for (const token in frequency) {
      frequency[token] = frequency[token] / totalTokens
    }

    return frequency
  }

  /**
   * Calculate TF-IDF scores
   */
  private calculateTFIDF(termFrequency: Record<string, number>, _documentLength: number): Record<string, number> {
    const tfidf: Record<string, number> = {}

    for (const term in termFrequency) {
      const tf = termFrequency[term]
      const df = this.documentFrequencies[term] || 1 // Default to 1 if not found
      const idf = Math.log(this.totalDocuments / df)
      tfidf[term] = tf * idf
    }

    return tfidf
  }

  /**
   * Calculate cosine similarity between two TF-IDF vectors
   */
  private cosineSimilarity(vector1: Record<string, number>, vector2: Record<string, number>): number {
    const keys1 = Object.keys(vector1)
    const keys2 = Object.keys(vector2)
    const allKeys = new Set([...keys1, ...keys2])

    let dotProduct = 0
    let magnitude1 = 0
    let magnitude2 = 0

    for (const key of allKeys) {
      const val1 = vector1[key] || 0
      const val2 = vector2[key] || 0

      dotProduct += val1 * val2
      magnitude1 += val1 * val1
      magnitude2 += val2 * val2
    }

    const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2)
    return magnitude === 0 ? 0 : dotProduct / magnitude
  }

  /**
   * Build document frequency index from a collection of works
   */
  buildDocumentFrequencies(works: WorkWithAuthors[]): void {
    this.documentFrequencies = {}
    this.totalDocuments = works.length

    const allTerms = new Set<string>()

    // Extract all unique terms
    for (const work of works) {
      const text = (work.title + ' ' + (work.subtitle || '') + ' ' + (work.description || '')).toLowerCase()
      const tokens = this.tokenize(this.cleanText(text))
      const filteredTokens = tokens.filter(token => !this.stopWords.has(token))
      
      const uniqueTerms = new Set(filteredTokens)
      for (const term of uniqueTerms) {
        allTerms.add(term)
      }
    }

    // Calculate document frequencies
    for (const term of allTerms) {
      let documentCount = 0
      for (const work of works) {
        const text = (work.title + ' ' + (work.subtitle || '') + ' ' + (work.description || '')).toLowerCase()
        const tokens = this.tokenize(this.cleanText(text))
        const filteredTokens = tokens.filter(token => !this.stopWords.has(token))
        
        if (filteredTokens.includes(term)) {
          documentCount++
        }
      }
      this.documentFrequencies[term] = documentCount
    }
  }

  /**
   * Get semantic similarity score for a work against user's liked works
   */
  calculateAverageSemanticSimilarity(
    likedWorks: WorkWithAuthors[], 
    candidateWork: WorkWithAuthors
  ): number {
    if (likedWorks.length === 0) return 0

    const similarities = likedWorks.map(work => {
      const result = this.calculateSimilarity(work, candidateWork)
      return result.combinedSimilarity
    })

    return similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length
  }

  /**
   * Extract key phrases from text using simple frequency analysis
   */
  extractKeyPhrases(text: string, maxPhrases: number = 5): string[] {
    const features = this.extractTextFeatures(text)
    
    // Combine bigrams and trigrams, sort by frequency
    const phrases = [...features.bigrams, ...features.trigrams]
    const phraseFreq: Record<string, number> = {}
    
    for (const phrase of phrases) {
      phraseFreq[phrase] = (phraseFreq[phrase] || 0) + 1
    }

    return Object.entries(phraseFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxPhrases)
      .map(([phrase]) => phrase)
  }

  /**
   * Calculate reading level/complexity score (simplified Flesch-Kincaid)
   */
  calculateReadingComplexity(text: string): number {
    if (!text) return 0

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = this.tokenize(this.cleanText(text))
    const syllables = words.reduce((total, word) => total + this.countSyllables(word), 0)

    if (sentences.length === 0 || words.length === 0) return 0

    const avgWordsPerSentence = words.length / sentences.length
    const avgSyllablesPerWord = syllables / words.length

    // Simplified Flesch Reading Ease (higher = easier)
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    
    // Normalize to 0-1 scale (0 = very complex, 1 = very simple)
    return Math.max(0, Math.min(1, fleschScore / 100))
  }

  /**
   * Count syllables in a word (simplified heuristic)
   */
  private countSyllables(word: string): number {
    const vowels = 'aeiouy'
    let count = 0
    let previousWasVowel = false

    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i].toLowerCase())
      if (isVowel && !previousWasVowel) {
        count++
      }
      previousWasVowel = isVowel
    }

    // Handle silent 'e'
    if (word.endsWith('e') && count > 1) {
      count--
    }

    return Math.max(1, count) // Every word has at least 1 syllable
  }
}