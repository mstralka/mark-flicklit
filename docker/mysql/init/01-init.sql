-- MySQL initialization script for FlickLit
-- This script runs automatically when the MySQL container starts for the first time

-- Set charset and collation for better text handling
ALTER DATABASE flicklit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create additional user if needed (optional)
-- The main user is already created via environment variables

-- Set MySQL configurations for better performance with large datasets
SET GLOBAL innodb_buffer_pool_size = 256M;
SET GLOBAL max_connections = 200;
SET GLOBAL innodb_log_file_size = 64M;

-- Optimize for the types of queries FlickLit will perform
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL sync_binlog = 0;

-- Enable slow query log for debugging (optional)
-- SET GLOBAL slow_query_log = 'ON';
-- SET GLOBAL long_query_time = 2;

-- Show status
SELECT 'FlickLit database initialized successfully' AS status;