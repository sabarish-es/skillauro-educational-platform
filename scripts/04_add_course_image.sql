-- Add Image Column to Courses Table
-- This migration adds image support for courses

-- Add image_url and course_level columns if they don't exist
-- For older MySQL versions, we handle this gracefully
ALTER TABLE courses ADD COLUMN image_url VARCHAR(500) NULL DEFAULT NULL;
ALTER TABLE courses ADD COLUMN course_level VARCHAR(50) DEFAULT 'Beginner';
ALTER TABLE courses ADD COLUMN duration_weeks INT DEFAULT 12;
ALTER TABLE courses ADD COLUMN instructor_name VARCHAR(255) DEFAULT 'TBD';

-- Create an index on status for faster queries
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_name ON courses(name);
