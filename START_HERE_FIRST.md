# 🚀 START HERE - Skillauro Platform Setup

Welcome! This document will guide you through downloading and running the complete Skillauro Educational Platform.

---

## What You Have

You have a **complete, production-ready educational management system** with:

✅ Admin Dashboard - Manage faculties, students, courses, fees  
✅ Faculty Portal - Teach courses, manage classes, grade students  
✅ Student Portal - Enroll in courses, pay fees via Razorpay, submit assignments  
✅ User Registration System - Auto-generate user IDs and passwords  
✅ Payment Integration - Razorpay payment gateway  
✅ Email Notifications - Credentials and contact form emails  
✅ Database - MySQL with all tables and migrations  

---

## Quick Start (5 Steps)

### 1️⃣ Download the Project
- Click the **three dots (⋮)** in v0 top right
- Select **"Download ZIP"**
- Extract the ZIP file

### 2️⃣ Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### 3️⃣ Configure Settings
- Copy `.env.example` → `.env.local`
- Fill in your MySQL credentials
- Fill in your Gmail email settings

### 4️⃣ Setup Database
```bash
# Create database
mysql -u root -p
> CREATE DATABASE skillauro;

# Run migrations
mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql
mysql -h localhost -u root -p skillauro < scripts/02_insert_sample_data.sql
mysql -h localhost -u root -p skillauro < scripts/add-missing-tables.sql
```

### 5️⃣ Create Default Admin User
After running the migrations, create the admin account:
```bash
mysql -h localhost -u root -p skillauro < scripts/03_create_default_admin.sql
```

### 6️⃣ Start the Server
```bash
npm run dev
```

Open `http://localhost:3000` in your browser ✅

---

## 🔑 Default Admin Credentials

After running script `03_create_default_admin.sql`, login with:

- **Email:** admin@skillauro.in
- **User ID:** ADM0001
- **Password:** Admin@2024
- **Role:** Admin

**⚠️ IMPORTANT:** Change this password immediately after first login!

See **ADMIN_CREDENTIALS.md** for complete admin setup guide.

---

## Documentation Guide

Read these files in order based on your needs:

### 📖 For Complete Setup
**`DOWNLOAD_AND_SETUP.md`** ← **START HERE**  
Step-by-step guide to download, extract, and setup the project

### 📖 For Installation Details
**`INSTALL_AND_RUN.md`**  
Detailed technical setup and troubleshooting

### 📖 For Quick Reference
**`QUICK_START.md`**  
Quick command reference

### 📖 For Project Overview
**`README.md`**  
Feature list and project description

---

## Folder Structure

```
skillauro-educational-platform/
├── DOWNLOAD_AND_SETUP.md      ← Read this first!
├── INSTALL_AND_RUN.md          ← Detailed setup
├── README.md                   ← Project overview
├── QUICK_START.md              ← Quick commands
├── .env.example                ← Copy to .env.local
├── package.json                ← Dependencies
├── app/                        ← Next.js pages
├── components/                 ← React components
├── lib/                        ← Utilities
├── scripts/                    ← Database migrations
└── public/                     ← Images & static files
```

---

## Environment Variables (.env.local)

You MUST create `.env.local` with these values:

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=skillauro

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=management@skillauro.in

# Razorpay (optional - can use test keys)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Application
NEXTAUTH_SECRET=any_random_string_here
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

---

## How to Get Credentials

### Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Use it for `EMAIL_PASSWORD`

### Razorpay Keys
1. Sign up at https://razorpay.com
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret
4. Or use test keys for development

### MySQL Password
1. The password you set during MySQL installation
2. Default is often blank or "root"

---

## Login Information

### Create Admin Account

Add to MySQL:
```sql
INSERT INTO users (email, user_id, password, name, role, phone, status) 
VALUES ('admin@skillauro.in', 'ADM0001', 'Admin@123456', 'Admin', 'admin', '9000000001', 'active');
```

Login with:
- Email: `admin@skillauro.in`
- User ID: `ADM0001`
- Password: `Admin@123456`

### Then Create More Users

Through Admin Dashboard:
1. Go to http://localhost:3000/admin/dashboard
2. Click "Add Faculty" or "Add Student"
3. System auto-generates user ID and password
4. Credentials sent via email

---

## System Requirements

- **Node.js:** v16.x or higher (v18+ recommended)
- **MySQL:** v5.7 or higher
- **npm/yarn/pnpm:** Package manager
- **2GB RAM minimum**
- **500MB disk space**

---

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint

# Connect to MySQL
mysql -h localhost -u root -p skillauro
```

---

## First Time Checklist

- [ ] Downloaded and extracted ZIP file
- [ ] Ran `npm install`
- [ ] Created `.env.local` file
- [ ] Filled in database credentials
- [ ] Created MySQL database
- [ ] Ran migration scripts
- [ ] Started server with `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] Created admin account
- [ ] Logged in successfully

---

## File Downloads

When you download the ZIP from v0:

1. Click **three dots (⋮)** in top right
2. Click **"Download ZIP"**
3. File will be in your Downloads folder
4. Extract it to a folder on your computer
5. Open that folder in VS Code
6. Follow the setup steps above

---

## Getting Help

1. **Read DOWNLOAD_AND_SETUP.md** - Most answers are there
2. **Check .env.example** - Environment variable reference
3. **Review error messages** - Terminal will tell you what's wrong
4. **Verify MySQL** - Make sure database is running
5. **Check Node.js** - Run `node -v` (should be v16+)

---

## Project Features

### Admin Dashboard
- Manage all faculties
- Manage all students
- Create & manage courses
- Track fee payments
- View system analytics

### Faculty Portal
- Create & manage courses
- Schedule classes
- Track student attendance
- Create assessments
- Grade assignments

### Student Portal
- Enroll in courses
- Join live classes
- View attendance
- Submit assignments
- Pay fees via Razorpay
- Download certificates

### Security Features
- User authentication
- Role-based access control
- Password hashing
- Secure session management
- Email verification

---

## What's Next?

1. **Download the ZIP** - Click three dots in v0
2. **Extract the files** - Unzip to your computer
3. **Run npm install** - Install dependencies
4. **Create .env.local** - Add your credentials
5. **Run migrations** - Create database
6. **Start the server** - `npm run dev`
7. **Open in browser** - http://localhost:3000
8. **Create admin** - First user account
9. **Start using** - Full educational platform!

---

## Support Files

This project includes complete documentation:

- ✅ `DOWNLOAD_AND_SETUP.md` - Complete setup guide
- ✅ `INSTALL_AND_RUN.md` - Detailed installation
- ✅ `QUICK_START.md` - Quick reference
- ✅ `README.md` - Project overview
- ✅ `SETUP_GUIDE.md` - Configuration guide
- ✅ `PROJECT_UPDATES.md` - Recent changes
- ✅ `.env.example` - Environment template
- ✅ Database migration scripts in `scripts/`

---

## Ready to Go?

**Next Step:** Read **DOWNLOAD_AND_SETUP.md** for complete step-by-step instructions.

**Then:** Follow the 5 quick start steps above.

**Then:** Access http://localhost:3000 and start using the platform!

---

## Version Information

- **Platform:** Skillauro v1.0.0
- **Framework:** Next.js 15+
- **React:** v18+
- **Database:** MySQL 5.7+
- **Status:** ✅ Production Ready

---

**You have everything you need. Let's get started! 🚀**

Next file to read: **DOWNLOAD_AND_SETUP.md**
