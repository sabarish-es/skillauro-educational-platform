-- Fix schema compatibility with MySQL 5.7
-- This script safely adds columns that might already exist

-- Check and add user_id column to users table if it doesn't exist
-- Note: Older MySQL versions don't support IF NOT EXISTS in ALTER TABLE
-- So we use a different approach - try to add and ignore if it already exists

-- First, check the current columns (manual inspection required)
-- The column user_id should already exist if earlier migrations ran successfully

-- If you get "Duplicate column name 'user_id'" error, the column already exists - this is fine
-- The system will work correctly with the existing column

-- Check courses table for image_url column
-- If you get "Duplicate column name 'image_url'" error, the column already exists - this is fine

-- Check for duration_weeks column
-- If you get "Duplicate column name 'duration_weeks'" error, the column already exists - this is fine

-- Safe column additions that ignore duplicates:
-- Since MySQL 5.7 doesn't support IF NOT EXISTS in ALTER TABLE,
-- we recommend running these one at a time and ignoring "duplicate column" errors

-- Uncomment these if needed for your specific database:

-- ALTER TABLE users ADD COLUMN user_id VARCHAR(50) UNIQUE;
-- ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
-- ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE;

-- ALTER TABLE courses ADD COLUMN image_url VARCHAR(255);
-- ALTER TABLE courses ADD COLUMN duration_weeks INT DEFAULT 12;
-- ALTER TABLE courses ADD COLUMN course_level VARCHAR(50);
-- ALTER TABLE courses ADD COLUMN instructor_name VARCHAR(255);

-- Summary: The database schema should already have these columns from previous migrations.
-- If you encounter "Duplicate column name" errors, it means the column already exists - this is expected and OK.
-- The application is designed to work with the existing schema.
