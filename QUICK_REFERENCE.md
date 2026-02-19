# Quick Reference Guide - Registration & Login System

## For Admins: How to Register a New User

### Register a Faculty Member

1. Go to **Admin Dashboard** → **Manage Faculties**
2. Click **Add Faculty** button
3. Fill in the form:
   - Full Name
   - Email Address
   - Phone Number
   - Department
   - Specialization
4. Click **Generate Credentials**
5. Choose how to share:
   - **Copy** the User ID and Password
   - **Send via Email** (automatic notification)
6. Share with faculty member

### Register a Student

1. Go to **Admin Dashboard** → **Manage Students**
2. Click **Add Student** button
3. Fill in the form:
   - Full Name
   - Email Address
   - Phone Number
   - Batch/Year
   - Enrollment Number
4. Click **Generate Credentials**
5. Choose how to share:
   - **Copy** the User ID and Password
   - **Send via Email** (automatic notification)
6. Share with student

### What Gets Generated

- **User ID:** Automatically generated unique identifier
  - Students: `STU` + 6 digits (e.g., STU001234)
  - Faculty: `FAC` + 5 digits (e.g., FAC00123)
- **Password:** Strong 12-character password with:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters

### Email Credentials Contains

When you send credentials via email, it includes:
- User ID
- Password
- Login URL
- Security recommendations
- Instructions

---

## For Users: How to Login

### What You Need

- **Email** or **User ID** (provided by admin)
- **Password** (provided by admin)
- **Role** (Admin, Faculty, or Student)

### Login Steps

1. Go to **Login Page**
2. **Select Your Role:**
   - Admin
   - Faculty
   - Student
3. **Enter Identifier:** Email address OR User ID
   - Example: `john@email.com` OR `STU001234`
4. **Enter Password:** The password provided
5. Click **Login**
6. You'll be redirected to your Dashboard

### First Time After Login

1. Go to your **Profile/Account Settings**
2. **Change Your Password** to something you remember
3. Keep your new password secure
4. Never share password with anyone

---

## User ID Formats

### Student IDs
- Format: `STU` + 6 numbers
- Examples: `STU000001`, `STU001234`, `STU999999`
- Can be used to login instead of email

### Faculty IDs
- Format: `FAC` + 5 numbers
- Examples: `FAC00001`, `FAC00123`, `FAC99999`
- Can be used to login instead of email

### Admin IDs
- Format: `ADM` + 4 numbers
- Examples: `ADM0001`, `ADM0042`
- Can be used to login instead of email

---

## Common Issues & Solutions

### Issue: "Invalid Credentials"
**Solutions:**
1. Check if email/user ID is correct
2. Check if password is correct
3. Make sure you selected the correct role
4. Ask admin to resend credentials

### Issue: "Email Not Sending"
**Solutions:**
1. Check email address is correct
2. Check spam/junk folder
3. Ask admin to copy credentials manually
4. Contact: management@skillauro.in

### Issue: "Can't Remember Password"
**Solutions:**
1. Contact admin to send credentials again
2. Admin can regenerate credentials
3. You'll get new User ID and Password

### Issue: "User ID Not Working for Login"
**Solutions:**
1. Copy User ID exactly (case sensitive)
2. Make sure you're using correct role
3. Check if email login works instead
4. Contact admin if problem persists

---

## Password Security Tips

### Good Passwords
- Mix of uppercase, lowercase, numbers, symbols
- At least 12 characters
- Unique (not used anywhere else)
- Changed after first login

### Bad Passwords
- Same password used everywhere
- Only letters or only numbers
- Personal information (name, DOB)
- "123456" or "password"
- Shared with other people

### Never
- ❌ Write password on paper
- ❌ Share password with classmates
- ❌ Use same password everywhere
- ❌ Click password reset links in suspicious emails
- ❌ Share credentials over phone calls

---

## Database Structure

### Users Table
```
id (primary key)
email (unique)
user_id (unique) ← NEW
password (hashed)
name
role (admin/faculty/student)
phone
status (active/inactive)
```

### Faculty Table
```
id (primary key)
user_id (links to users)
department
specialization
created_at
```

### Students Table
```
id (primary key)
user_id (links to users)
enrollment_number
batch
created_at
```

---

## API Endpoints (for Developers)

### Register Faculty
```
POST /api/admin/register-faculty
Body: { name, email, phone, department, specialization, user_id, password }
```

### Register Student
```
POST /api/admin/register-student
Body: { name, email, phone, batch, enrollment_number, user_id, password }
```

### Send Credentials Email
```
POST /api/send-credentials-email
Body: { email, name, user_id, password, role }
```

### Login
```
POST /api/auth/login
Body: { email_or_userid, password, role }
```

---

## Files That Changed

### Core Registration
- ✅ `lib/user-id-generator.ts` (New)
- ✅ `components/admin/register-faculty-modal.tsx` (New)
- ✅ `components/admin/register-student-modal.tsx` (New)

### API Endpoints
- ✅ `app/api/admin/register-faculty/route.ts` (New)
- ✅ `app/api/admin/register-student/route.ts` (New)
- ✅ `app/api/send-credentials-email/route.ts` (New)

### Pages Updated
- ✅ `app/login/page.tsx` (accepts email or user_id)
- ✅ `app/admin/faculties/page.tsx` (uses new modal)
- ✅ `app/admin/students/page.tsx` (uses new modal)

### Database Scripts
- ✅ `scripts/01_create_tables.sql` (added user_id column)
- ✅ `scripts/02_insert_sample_data.sql` (removed all demo data)
- ✅ `scripts/add-missing-tables.sql` (fixed SQL syntax)

### Documentation
- ✅ `REGISTRATION_SYSTEM.md` (Full documentation)
- ✅ `IMPLEMENTATION_SUMMARY.md` (Technical details)
- ✅ `QUICK_REFERENCE.md` (This file)

---

## Environment Variables

Set these in your `.env` or Vercel project settings:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Database (existing)
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=skillauro
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Create App Password in Google Account
3. Use App Password as EMAIL_PASSWORD

---

## Step-by-Step: First Time Setup

### 1. Database Setup
```bash
# Create tables
mysql -u user -p database < scripts/01_create_tables.sql

# Add missing columns
mysql -u user -p database < scripts/add-missing-tables.sql

# No sample data inserted (clean start)
```

### 2. Environment Configuration
```bash
# In .env or Vercel settings:
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 3. Create First Admin
- Go to Login Page (if no admin exists, create manually)
- Or use admin registration endpoint
- Distribute admin credentials securely

### 4. Admin Creates Other Users
- Admin registers faculty members
- Admin registers students
- System auto-generates User IDs and Passwords
- Send credentials to users

### 5. Users Login for First Time
- Users use provided credentials
- Navigate to Profile
- Change password to something they remember

---

## Troubleshooting Checklist

Before asking for help, check:

- [ ] Database migrations ran successfully
- [ ] EMAIL_USER and EMAIL_PASSWORD are set
- [ ] Email service (Gmail) has app password enabled
- [ ] All new files are in correct directories
- [ ] No syntax errors in code
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Server restarted after code changes

---

## Contact & Support

- **Email:** management@skillauro.in
- **Documentation:** See `REGISTRATION_SYSTEM.md`
- **Technical Details:** See `IMPLEMENTATION_SUMMARY.md`

---

## Quick Comparison: Before vs After

| Feature | Before | After |
|---------|--------|-------|
| Demo Users | ✅ (hardcoded) | ❌ (removed) |
| User ID Login | ❌ | ✅ |
| Admin Registration | ❌ (manual DB) | ✅ (UI modal) |
| Auto ID Generation | ❌ | ✅ |
| Auto Password Gen | ❌ | ✅ |
| Email Credentials | ❌ | ✅ |
| Credentials Copy | ❌ | ✅ |

---

## What's Next?

### Recommended Next Steps:

1. **Secure Passwords:**
   - Implement bcrypt password hashing
   - Add password complexity rules
   - Add password expiration

2. **Email Verification:**
   - Require email verification before login
   - Send verification link in credentials email

3. **Audit Logging:**
   - Log all registration activities
   - Track login attempts
   - Monitor account changes

4. **Bulk Operations:**
   - Import users via CSV
   - Bulk password reset
   - Batch email sending

5. **Advanced Features:**
   - Two-factor authentication (2FA)
   - Single Sign-On (SSO)
   - Social login (Google, GitHub)

---

**Last Updated:** February 2026
**Version:** 1.0
**Status:** Production Ready
