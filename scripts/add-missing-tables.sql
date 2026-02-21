-- Add faculties table
CREATE TABLE IF NOT EXISTS faculties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  department VARCHAR(255),
  specialization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add students table
CREATE TABLE IF NOT EXISTS students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  enrollment_number VARCHAR(255) UNIQUE,
  batch VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add user_id field to users table for unique login identifier
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_id VARCHAR(50) UNIQUE DEFAULT NULL COMMENT 'Unique user ID for login (auto-generated)';

-- Create indexes for better query performance
CREATE INDEX idx_faculties_user_id ON faculties(user_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_enrollment ON students(enrollment_number);
CREATE INDEX idx_users_user_id ON users(user_id);
