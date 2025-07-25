-- Additional indexes for collaborative filtering performance

-- Optimize user interaction queries for similarity calculation
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_work ON user_interactions(userId, workId);
CREATE INDEX IF NOT EXISTS idx_user_interactions_work_user ON user_interactions(workId, userId);

-- Optimize queries for finding users with common interactions
CREATE INDEX IF NOT EXISTS idx_user_interactions_work_liked_user ON user_interactions(workId, liked, userId);

-- Composite index for collaborative filtering queries
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_liked_created ON user_interactions(userId, liked, createdAt DESC);