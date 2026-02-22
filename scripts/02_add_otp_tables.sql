-- Add OTP and Email Verification Tables for Skillauro
-- Run this after 01_create_tables.sql

-- Create Password Reset OTP Table
CREATE TABLE IF NOT EXISTS password_reset_otp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  otp VARCHAR(6) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
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
  expires_at TIMESTAMP,
  used_at TIMESTAMP NULL,
  verification_type ENUM('registration', 'email_change') DEFAULT 'registration',
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
  expires_at TIMESTAMP,
  used_at TIMESTAMP NULL,
  verification_type ENUM('registration', 'phone_change') DEFAULT 'registration',
  INDEX idx_phone (phone),
  INDEX idx_expires (expires_at)
);

-- Add email_verified and phone_verified columns to users table if they don't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verification_sent_at TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS phone_verification_sent_at TIMESTAMP NULL;
