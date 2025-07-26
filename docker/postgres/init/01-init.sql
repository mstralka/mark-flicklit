-- PostgreSQL initialization script for FlickLit
-- This script runs automatically when the PostgreSQL container starts for the first time

-- Create extensions that might be useful for the application
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For better text search performance

-- Set some PostgreSQL configurations for better performance with large datasets
-- Note: These are container-level settings, adjust based on your requirements

-- Enable more detailed logging for development (optional)
-- ALTER SYSTEM SET log_statement = 'all';
-- ALTER SYSTEM SET log_duration = on;

-- Optimize for the types of queries FlickLit will perform
-- These settings will be applied when the container restarts
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET work_mem = '4MB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';

-- Better performance for bulk inserts (like OpenLibrary data import)
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;

-- Enable auto-vacuum for better maintenance
ALTER SYSTEM SET autovacuum = on;
ALTER SYSTEM SET autovacuum_max_workers = 3;

-- Reload configuration
SELECT pg_reload_conf();

-- Show status
SELECT 'FlickLit PostgreSQL database initialized successfully' AS status;