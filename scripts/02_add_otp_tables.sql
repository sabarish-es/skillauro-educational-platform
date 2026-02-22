-- Add OTP and Email Verification Tables for Skillauro
-- Run this after 01_create_tables.sql
-- Compatible with MySQL 5.7+

-- Create Password Reset OTP Table
CREATE TABLE IF NOT EXISTS password_reset_otp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  otp VARCHAR(6) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  used_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_email (email),
  INDEX idx_expires (expires_at)
);

-- Create Email Verification OTP Table
CREATE TABLE IF NOT EXISTS email_verification_otp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  used_at TIMESTAMP NULL,
  verification_type VARCHAR(50) DEFAULT 'registration',
  UNIQUE KEY unique_email_otp (email, otp),
  INDEX idx_email (email),
  INDEX idx_expires (expires_at)
);

-- Create Mobile Verification OTP Table
CREATE TABLE IF NOT EXISTS mobile_verification_otp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(20) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  used_at TIMESTAMP NULL,
  verification_type VARCHAR(50) DEFAULT 'registration',
  UNIQUE KEY unique_phone_otp (phone, otp),
  INDEX idx_phone (phone),
  INDEX idx_expires (expires_at)
);

-- Note: The following columns may already exist in your users table from previous migrations
-- The application is designed to gracefully handle if these columns don't exist
-- Uncomment and run these only if you get errors about missing columns in your app

-- ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
-- ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE;
-- ALTER TABLE users ADD COLUMN email_verification_sent_at TIMESTAMP NULL;
-- ALTER TABLE users ADD COLUMN phone_verification_sent_at TIMESTAMP NULL;
