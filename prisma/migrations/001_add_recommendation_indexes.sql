-- Add indexes for recommendation engine performance

-- User interactions indexes
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_liked ON user_interactions(userId, liked);
CREATE INDEX IF NOT EXISTS idx_user_interactions_work_liked ON user_interactions(workId, liked);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created_at ON user_interactions(createdAt DESC);

-- Works indexes for filtering and similarity calculations
CREATE INDEX IF NOT EXISTS idx_works_publish_date ON works(firstPublishDate);
CREATE INDEX IF NOT EXISTS idx_works_created_at ON works(createdAt DESC);

-- Author-work relationship indexes
CREATE INDEX IF NOT EXISTS idx_author_work_author_id ON author_work(authorId);
CREATE INDEX IF NOT EXISTS idx_author_work_work_id ON author_work(workId);

-- Authors indexes
CREATE INDEX IF NOT EXISTS idx_authors_name ON authors(name);
CREATE INDEX IF NOT EXISTS idx_authors_birth_date ON authors(birthDate);