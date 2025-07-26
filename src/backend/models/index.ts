export type { Author, AuthorCreateInput, AuthorUpdateInput } from './Author'
export type { 
  Work, 
  WorkWithAuthors, 
  AuthorWork, 
  WorkCreateInput, 
  WorkUpdateInput 
} from './Work'
export type {
  Cover,
  CoverRaw,
  CoverWithWork,
  CoverCreateInput,
  CoverUpdateInput,
  CoverSize,
  parseCover,
  generateCoverUrl,
  generateCoverUrlByIsbn
} from './Cover'
export type { 
  User,
  UserRaw,
  UserProfileRaw,
  UserCreateInput,
  UserUpdateInput,
  parseUser,
  parseUserProfile
} from './User'
export type { 
  UserInteraction, 
  UserInteractionWithWork, 
  UserInteractionCreateInput,
  RecommendationData 
} from './UserInteraction'
export type {
  RecommendationScore,
  RecommendationScoreRaw,
  RecommendationScoreCalculation,
  RecommendationScoreCreateInput,
  RecommendationScoreUpdateInput,
  parseRecommendationScore,
  toCalculationFormat
} from './RecommendationScore'
export type {
  WorkSimilarity,
  WorkSimilarityRaw,
  WorkSimilarityCompat,
  WorkSimilarityCreateInput,
  WorkSimilarityUpdateInput,
  SimilarityType,
  parseWorkSimilarity,
  toWorkSimilarityCompat
} from './WorkSimilarity'
export { SIMILARITY_TYPES } from './WorkSimilarity'