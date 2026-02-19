# Skillauro Registration & User Management System

## Overview

This document outlines the new user registration system that has been implemented for the Skillauro Educational Platform. The system provides:

- Automatic user ID generation for students and faculties
- Automatic password generation for security
- Email notifications with credentials
- Admin-based manual registration process
- Login with email or user ID

## Database Schema Changes

### Updated `users` Table

A new column `user_id` has been added to store unique identifiers:

```sql
ALTER TABLE users ADD COLUMN user_id VARCHAR(50) UNIQUE DEFAULT NULL;
```

**Properties:**
- **Type:** VARCHAR(50)
- **Unique:** Yes
- **Nullable:** Yes (for backward compatibility)
- **Purpose:** Alternative login identifier instead of email

### User ID Formats

Different prefixes are used for different roles:

- **Students:** `STU` + 6 digits (e.g., `STU001234`)
- **Faculties:** `FAC` + 5 digits (e.g., `FAC00123`)
- **Admins:** `ADM` + 4 digits (e.g., `ADM0001`)

## Registration Workflow

### Admin Registration Process

1. **Admin Opens Registration Modal**
   - Click "Add Faculty" or "Add Student" button in admin dashboard
   - Registration modal appears with form

2. **Admin Enters Information**
   - Name
   - Email
   - Phone Number
   - Department (Faculty only)
   - Specialization (Faculty only)
   - Batch (Student only)
   - Enrollment Number (Student only)

3. **System Generates Credentials**
   - Unique User ID (automatic)
   - Strong Password (automatic)
   - Displays both on screen

4. **Admin Shares Credentials**
   - Copy button to copy to clipboard
   - Send via Email button
   - Manual sharing option

5. **Credentials Email Sent**
   - Formatted email with login instructions
   - User ID and password
   - Login URL
   - Security reminder to change password

## Components

### 1. RegisterFacultyModal (`components/admin/register-faculty-modal.tsx`)

Modal component for registering faculty members.

**Features:**
- Two-step process (form → credentials)
- Form validation
- Auto-generates credentials
- Email sending capability
- Copy-to-clipboard functionality

**Props:**
```typescript
interface RegisterFacultyModalProps {
  onClose: () => void;
  onSuccess?: (data: any) => void;
}
```

### 2. RegisterStudentModal (`components/admin/register-student-modal.tsx`)

Modal component for registering students.

**Features:**
- Same as faculty modal
- Different form fields (batch, enrollment number)

**Props:**
```typescript
interface RegisterStudentModalProps {
  onClose: () => void;
  onSuccess?: (data: any) => void;
}
```

## Utilities

### User ID Generator (`lib/user-id-generator.ts`)

Utility functions for generating IDs and passwords:

```typescript
// Generate unique user IDs
generateStudentUserId(): string
generateFacultyUserId(): string
generateAdminUserId(): string

// Generate secure password
generatePassword(length?: number): string

// Validate user ID format
isValidUserIdFormat(userId: string): boolean
```

## API Endpoints

### POST `/api/admin/register-faculty`

Register a new faculty member.

**Request:**
```json
{
  "name": "Dr. John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "department": "Computer Science",
  "specialization": "Web Development",
  "user_id": "FAC00123",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Faculty registered successfully",
  "data": {
    "user_id": "FAC00123",
    "email": "john@example.com",
    "role": "faculty"
  }
}
```

### POST `/api/admin/register-student`

Register a new student member.

**Request:**
```json
{
  "name": "John Student",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "batch": "2024-2026",
  "enrollment_number": "STU001",
  "user_id": "STU001234",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "user_id": "STU001234",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### POST `/api/send-credentials-email`

Send login credentials via email.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "user_id": "STU001234",
  "password": "SecurePassword123!",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Credentials email sent successfully"
}
```

## Login Page Updates

### Changes Made

- **Input Field:** Changed from email-only to accept both email and user ID
- **Placeholder:** "Enter your email or user ID"
- **Example Format:** Shows both email and user ID examples
- **Demo Credentials Removed:** No hardcoded demo credentials displayed
- **Help Section:** Added instructions on how to login

### Login Flow

1. User enters email or user ID
2. User enters password
3. Select role (Admin, Faculty, or Student)
4. System authenticates credentials
5. Redirect to appropriate dashboard

## Database Sample Data

### Removed Sample Data

The following have been removed from the database initialization:
- Demo admin account (skillauro@gmail.com)
- Demo faculty accounts (faculty1-4@skillauro.com)
- Demo student accounts (student1-6@skillauro.com)
- All associated records (courses, enrollments, etc.)

**File:** `scripts/02_insert_sample_data.sql`

```sql
-- Sample Data will be inserted manually through admin panel
-- No demo users or sample data included
```

## Email Configuration

### Environment Variables Required

Set these in your `.env` or Vercel project settings:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### For Gmail:

1. Enable 2-Factor Authentication
2. Create an App Password
3. Use the App Password as `EMAIL_PASSWORD`

### For Other Services:

Update the `nodemailer` transporter configuration in `/api/send-credentials-email/route.ts`

## Security Recommendations

1. **Hash Passwords:** Replace plain-text passwords with bcrypt hashing
   ```typescript
   import bcrypt from 'bcrypt';
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **SSL/TLS:** Use HTTPS for all communications

3. **Password Requirements:**
   - Minimum 8 characters
   - Uppercase and lowercase letters
   - Numbers and special characters
   - Expires after 90 days (optional)

4. **Rate Limiting:** Implement rate limiting on login and registration endpoints

5. **Two-Factor Authentication:** Consider adding 2FA for admin accounts

## Database Integration Steps

### 1. Create Tables

Run the migration script:
```bash
mysql -u username -p database_name < scripts/01_create_tables.sql
```

### 2. Add Missing Tables

Run the additional migration:
```bash
mysql -u username -p database_name < scripts/add-missing-tables.sql
```

### 3. Insert Initial Data (Optional)

Run the sample data script:
```bash
mysql -u username -p database_name < scripts/02_insert_sample_data.sql
```

## Testing the System

### Manual Testing Steps

1. **Register Faculty:**
   - Go to Admin Dashboard → Manage Faculties
   - Click "Add Faculty"
   - Fill in form details
   - System generates user ID and password
   - Copy or send credentials via email

2. **Register Student:**
   - Go to Admin Dashboard → Manage Students
   - Click "Add Student"
   - Fill in form details
   - System generates user ID and password
   - Copy or send credentials via email

3. **Login with Credentials:**
   - Go to Login Page
   - Enter email or user ID
   - Enter password
   - Select role
   - Click Login

## Future Enhancements

1. **Bulk Registration:** Import users via CSV
2. **Sync with External Systems:** Connect to existing student/faculty databases
3. **Auto-Enrollment:** Automatically enroll students in courses
4. **Credential Refresh:** Allow resetting passwords via email
5. **Audit Trail:** Log all registration activities
6. **Advanced Validation:** Email verification, phone OTP

## Troubleshooting

### Issue: MySQL Syntax Error

**Error:** `You have an error in your SQL syntax; check the manual...`

**Solution:** Use proper MySQL syntax (not all versions support `IF NOT EXISTS` for indexes):
```sql
-- Wrong (if your MySQL version < 5.7)
CREATE INDEX IF NOT EXISTS idx_name ON table_name(column);

-- Correct
CREATE INDEX idx_name ON table_name(column);
-- Or drop first if exists:
DROP INDEX IF EXISTS idx_name ON table_name;
CREATE INDEX idx_name ON table_name(column);
```

### Issue: Emails Not Sending

**Check:**
1. Environment variables are set correctly
2. Email service is properly configured
3. Check server logs for nodemailer errors
4. Verify email credentials are valid

### Issue: User Can't Login with User ID

**Check:**
1. User ID is stored in database
2. Login API properly checks both email and user_id columns
3. User ID format matches expectations

## Support

For issues or questions, contact: management@skillauro.in
