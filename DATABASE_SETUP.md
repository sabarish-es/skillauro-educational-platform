# Skillauro Database Setup Guide

## Prerequisites

- MySQL Server installed and running
- Node.js (v16 or higher)
- npm or yarn package manager

## Step 1: Install MySQL

### Windows
- Download from: https://dev.mysql.com/downloads/mysql/
- Install with default settings
- During installation, set password for root user (remember this!)
- MySQL will run as a service

### macOS
```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Secure installation
mysql_secure_installation
```

### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
```

## Step 2: Create Database

### Option A: Using Command Line

```bash
# Open MySQL Command Line
mysql -u root -p

# Enter your password when prompted
# Then run:

CREATE DATABASE skillauro_db;
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Click on "Create a new schema"
3. Name it: `skillauro_db`
4. Click "Apply"

## Step 3: Create Tables and Insert Data

### Run the migration scripts:

```bash
# Navigate to project directory
cd /path/to/skillauro-project

# Run the create tables script
mysql -u root -p skillauro_db < scripts/01_create_tables.sql

# Run the sample data script
mysql -u root -p skillauro_db < scripts/02_insert_sample_data.sql
```

Or manually in MySQL Workbench:
1. Open MySQL Workbench
2. Click "File" → "Open SQL Script"
3. Select `scripts/01_create_tables.sql`
4. Click the lightning bolt icon to execute
5. Repeat for `scripts/02_insert_sample_data.sql`

## Step 4: Configure Environment Variables

### Create `.env.local` file in project root:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=skillauro_db

# JWT Secret (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Application
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Step 5: Install Dependencies and Run

```bash
# Install packages
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## Database Schema Overview

### Main Tables

1. **users** - All users (admin, faculty, students)
   - id, email, password, name, role, phone, status

2. **faculties** - Faculty details
   - id, user_id, department, specialization, qualifications

3. **students** - Student details
   - id, user_id, enrollment_number, batch, semester, cgpa

4. **courses** - Course information
   - id, code, name, description, faculty_id, duration_weeks, credits

5. **course_enrollments** - Student enrollment in courses
   - id, student_id, course_id, status

6. **classes** - Class sessions
   - id, course_id, title, class_date, start_time, end_time, meeting_link

7. **attendance** - Attendance records
   - id, student_id, class_id, status (present/absent/leave)

8. **assessments** - Quiz, assignments, tests
   - id, course_id, title, assessment_type, total_marks

9. **assessment_submissions** - Student submission of assessments
   - id, assessment_id, student_id, marks_obtained, status

10. **study_materials** - Course materials
    - id, course_id, title, material_type, file_url

11. **fees** - Fee tracking
    - id, student_id, course_id, total_amount, paid_amount, payment_status

12. **payments** - Payment records
    - id, student_id, amount, payment_method, transaction_id

13. **notifications** - System notifications
    - id, sender_id, recipient_id, title, message, notification_type

14. **contact_messages** - Contact form submissions
    - id, name, email, phone, subject, message, status

## Verifying the Setup

### Check if tables were created:

```bash
mysql -u root -p skillauro_db -e "SHOW TABLES;"
```

You should see all the tables listed.

### Check sample data:

```bash
mysql -u root -p skillauro_db -e "SELECT COUNT(*) FROM users;"
```

Should show data was inserted successfully.

## Default Login Credentials

After running sample data scripts:

### Admin
- Email: skillauro@gmail.com
- Password: Skillauro@2026

### Faculty
- Email: faculty1@skillauro.com
- Password: Faculty@123

### Student
- Email: student1@skillauro.com
- Password: Student@123

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"
- Check your MySQL root password
- Make sure MySQL service is running

### Issue: "Unknown database 'skillauro_db'"
- Verify the database was created: `SHOW DATABASES;`
- Make sure you selected the right database

### Issue: "Table doesn't exist"
- Run the migration scripts again
- Check for errors in the scripts

### Issue: "Connection refused"
- Make sure MySQL is running: `mysql -u root -p`
- On Windows: Check Services > MySQL80 is running
- On Mac: `brew services list`

## Backing Up Database

```bash
# Create backup
mysqldump -u root -p skillauro_db > backup_skillauro_db.sql

# Restore from backup
mysql -u root -p skillauro_db < backup_skillauro_db.sql
```

## Performance Tips

1. All tables have proper indexes for common queries
2. Use JOINs to fetch related data
3. Implement pagination for large result sets
4. Cache frequently accessed data

## Next Steps

1. Configure email for contact form (optional)
2. Set up automated backups
3. Test all features with sample data
4. Deploy to production server
5. Set up monitoring and logging

For more information, visit the main README.md
