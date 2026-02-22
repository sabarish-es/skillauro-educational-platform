-- Safe column addition script for older MySQL versions
-- This script uses individual ALTER statements and handles potential duplicate column errors

-- Create a temporary procedure to safely add columns
-- For older MySQL versions that don't support IF NOT EXISTS

-- The following statements will add columns to the users table
-- If columns already exist, the database will return a warning but the script continues

-- Step 1: Create email_verified column
-- In case the column exists, the application handles this gracefully
SET @column_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'email_verified'
);

-- Only add the column if it doesn't exist
SET @sql := IF(@column_exists = 0, 
  'ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Step 2: Add phone_verified column
SET @column_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'phone_verified'
);

SET @sql := IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Step 3: Add email_verification_sent_at column
SET @column_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'email_verification_sent_at'
);

SET @sql := IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN email_verification_sent_at TIMESTAMP NULL DEFAULT NULL',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Step 4: Add phone_verification_sent_at column
SET @column_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'phone_verification_sent_at'
);

SET @sql := IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN phone_verification_sent_at TIMESTAMP NULL DEFAULT NULL',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
