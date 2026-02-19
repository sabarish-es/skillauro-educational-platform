-- ==============================================================================
-- SKILLAURO - CREATE DEFAULT ADMIN USER
-- ==============================================================================
-- This script creates a default admin account to access the admin dashboard
-- RUN THIS SCRIPT AFTER 01_create_tables.sql and 02_insert_sample_data.sql
-- 
-- Default Admin Credentials:
-- Email: admin@skillauro.in
-- User ID: ADM0001
-- Password: Admin@2024 (CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN!)
-- ==============================================================================

-- Create default admin user
INSERT INTO users (email, user_id, password, name, role, phone, status) VALUES (
  'admin@skillauro.in',
  'ADM0001',
  'Admin@2024',
  'Administrator',
  'admin',
  '1234567890',
  'active'
);

-- Verify insertion
SELECT 'Admin user created successfully!' as status;
SELECT id, email, user_id, name, role, status FROM users WHERE role = 'admin' LIMIT 1;
