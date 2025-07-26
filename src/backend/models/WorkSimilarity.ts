// Raw database interface (how Prisma returns data)
export interface WorkSimilarityRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  sourceWorkId: number
  targetWorkId: number
  similarity: number
  similarityType: string
}

// Application interface (same as raw for now)
export interface WorkSimilarity {
  id: number
  createdAt: Date
  updatedAt: Date
  sourceWorkId: number
  targetWorkId: number
  similarity: number
  similarityType: string
}

// For backward compatibility with existing code
export interface WorkSimilarityCompat {
  workId: number
  similarity: number
}

// Utility function to convert raw to parsed (no parsing needed for now)
export function parseWorkSimilarity(raw: WorkSimilarityRaw): WorkSimilarity {
  return raw
}

// Convert to compact format for recommendations
export function toWorkSimilarityCompat(ws: WorkSimilarity, sourceWorkId: number): WorkSimilarityCompat {
  return {
    workId: ws.sourceWorkId === sourceWorkId ? ws.targetWorkId : ws.sourceWorkId,
    similarity: ws.similarity
  }
}

export interface WorkSimilarityCreateInput {
  sourceWorkId: number
  targetWorkId: number
  similarity: number
  similarityType: string
}

export interface WorkSimilarityUpdateInput {
  similarity?: number
  similarityType?: string
}

// Similarity types enum for consistency
export const SIMILARITY_TYPES = {
  CONTENT: 'content',
  COLLABORATIVE: 'collaborative',
  NLP: 'nlp',
  HYBRID: 'hybrid'
} as const

export type SimilarityType = typeof SIMILARITY_TYPES[keyof typeof SIMILARITY_TYPES]