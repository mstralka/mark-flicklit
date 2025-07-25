# FlickLit Recommendation Engine

## Overview

FlickLit uses a hybrid recommendation system that combines content-based filtering with collaborative filtering to suggest books based on user interactions (swipe right = like, swipe left = dislike).

## Data Model

### Available Attributes for Recommendations

**Work Attributes:**
- `subjects`: Content categories (e.g., "Fiction", "Romance", "Science Fiction")
- `subjectPlaces`: Geographic settings (e.g., "England", "New York")
- `subjectTimes`: Time periods (e.g., "20th century", "Medieval")
- `subjectPeople`: People mentioned (e.g., "Napoleon", "Shakespeare")
- `originalLanguages`: Original publication languages
- `firstPublishDate`: Publication era for temporal preferences
- `description`: Text content for NLP analysis
- `title` & `subtitle`: For semantic similarity

**Author Attributes:**
- `location`: Author's geographic origin
- `birthDate`/`deathDate`: Author's era
- `bio`: Author background for similarity matching

**User Interactions:**
- `liked`: Boolean indicating swipe direction
- `workId`: Links to specific work
- `userId`: For personalized recommendations
- `createdAt`: Temporal interaction patterns

## Recommendation Strategies

### 1. Content-Based Filtering (Primary)

**Subject-Based Similarity:**
- Weight subjects by frequency in liked books
- Use TF-IDF scoring for subject importance
- Calculate cosine similarity between work subject vectors
- Boost rare subjects that user likes (personal taste discovery)

**Temporal Preferences:**
- Track preferred publication eras from `firstPublishDate`
- Weight newer recommendations toward user's preferred time periods
- Consider author birth/death dates for author era preferences

**Geographic Preferences:**
- Track liked `subjectPlaces` and author `location`
- Recommend books with similar geographic settings
- Weight by specificity (country > region > continent)

**Language Preferences:**
- Track `originalLanguages` from liked books
- Boost books in preferred languages
- Consider translation patterns

### 2. Negative Feedback Integration

**Dislike Pattern Recognition:**
- Track subjects/authors/places from disliked books
- Apply negative weights to similar content
- Implement cooling-off periods for previously disliked attributes
- Use dislike intensity (consecutive dislikes of similar content)

### 3. Collaborative Filtering (Secondary)

**User Similarity:**
- Find users with similar like/dislike patterns
- Weight by interaction overlap and recency
- Recommend books liked by similar users
- Filter out books current user has already seen

### 4. Hybrid Scoring Algorithm

```
final_score = (
  content_similarity * 0.6 +
  collaborative_score * 0.3 +
  novelty_bonus * 0.1
) * negative_feedback_multiplier
```

**Components:**
- `content_similarity`: Weighted average of subject, temporal, geographic, and author similarity
- `collaborative_score`: Recommendations from similar users
- `novelty_bonus`: Boost for introducing new subjects/authors user hasn't seen
- `negative_feedback_multiplier`: Penalty for patterns user has disliked (0.1-1.0)

## Implementation Architecture

### Core Components

**1. RecommendationEngine Service**
```typescript
interface RecommendationEngine {
  getRecommendations(userId: string, limit: number): Promise<Work[]>
  recordInteraction(userId: string, workId: string, liked: boolean): Promise<void>
  buildUserProfile(userId: string): Promise<UserProfile>
  updateRecommendationWeights(): Promise<void>
}
```

**2. UserProfile Builder**
- Analyzes user interaction history
- Builds weighted preference vectors for all attributes
- Maintains negative preference tracking
- Updates profiles incrementally with new interactions

**3. ContentSimilarity Calculator**
- Precomputes work similarity matrices
- Uses cosine similarity for subject vectors
- Implements temporal and geographic distance functions
- Caches similarity scores for performance

**4. CollaborativeFilter**
- Identifies user cohorts based on interaction patterns
- Calculates user-user similarity using Jaccard coefficient
- Generates collaborative recommendations
- Balances popularity bias with personalization

### Database Optimizations

**Indexes:**
```sql
CREATE INDEX idx_user_interactions_user_liked ON user_interactions(userId, liked);
CREATE INDEX idx_user_interactions_work_liked ON user_interactions(workId, liked);
CREATE INDEX idx_works_subjects ON works USING GIN(subjects);
CREATE INDEX idx_works_publish_date ON works(firstPublishDate);
```

**Precomputed Tables:**
- `work_similarities`: Store top-N similar works for each work
- `user_preferences`: Aggregated user preference vectors
- `subject_weights`: Global subject popularity and TF-IDF scores

### Real-time Processing

**Interaction Pipeline:**
1. Record user interaction in `user_interactions`
2. Update user preference weights incrementally
3. Invalidate cached recommendations for user
4. Update collaborative filtering cohort if needed
5. Precompute recommendations for next session

**Recommendation Generation:**
1. Fetch user profile and recent interactions
2. Apply content-based filtering with current preferences
3. Blend with collaborative recommendations
4. Apply negative feedback filters
5. Add novelty bonuses and diversity constraints
6. Return ranked list of recommendations

## Performance Considerations

**Caching Strategy:**
- Cache user recommendations for 1 hour
- Precompute popular work similarities
- Use Redis for session-based recommendation storage
- Implement cache invalidation on new interactions

**Scalability:**
- Batch process recommendation updates during off-peak hours
- Use approximate algorithms for large-scale collaborative filtering
- Implement recommendation diversity constraints to avoid filter bubbles
- Consider matrix factorization for large user bases

**Quality Metrics:**
- Click-through rate on recommended books
- Session engagement time
- Like/dislike ratio on recommendations
- Diversity of recommendations (avoid echo chambers)

## Future Enhancements

**Advanced Features:**
- NLP analysis of book descriptions for semantic similarity
- Seasonal/trending book boost algorithms
- Social features (friend recommendations)
- Multi-armed bandit for exploration/exploitation balance

**Machine Learning Integration:**
- Deep learning embeddings for books and users
- Reinforcement learning for recommendation optimization
- Sentiment analysis of book descriptions
- Graph neural networks for author/work relationships

## Implementation Priority

**Phase 1: Core Content-Based System** ✅ COMPLETED
1. ✅ Basic subject-based similarity - `ContentSimilarity` service
2. ✅ User preference tracking - `UserBuilder` service  
3. ✅ Negative feedback integration - Dislike pattern recognition
4. ✅ Simple recommendation API - API handlers and test script

**Implemented Components:**
- `RecommendationEngine` - Main orchestrator with caching
- `ContentSimilarity` - Jaccard similarity, TF-IDF weights, temporal matching
- `UserBuilder` - Incremental profile updates from interactions
- Database indexes for performance optimization
- Test suite with `yarn test:recommendations`

**Phase 2: Collaborative Features** ✅ COMPLETED
1. ✅ User similarity calculation - Jaccard coefficient with agreement weighting
2. ✅ Collaborative filtering recommendations - Find users with similar taste patterns
3. ✅ Hybrid scoring implementation - Content (60%) + Collaborative (30%) + Novelty (10%)
4. ✅ Performance optimizations - Additional database indexes and configurable parameters

**Implemented Components:**
- `CollaborativeFilter` - User similarity calculation and collaborative recommendations
- Enhanced `RecommendationEngine` with hybrid scoring algorithm
- Database indexes optimized for collaborative filtering queries
- Test suite with `yarn test:collaborative` for collaborative features

**Phase 3: Advanced Features**
1. NLP-based similarity
2. Temporal trend analysis
3. Diversity and novelty algorithms
4. Real-time recommendation updates