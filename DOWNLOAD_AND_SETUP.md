# Skillauro Educational Platform - Complete Download & Setup Guide

## How to Download the Project

### Step 1: Download the ZIP File
1. In the v0 interface, click the **three dots (⋮)** button in the top right corner
2. Select **"Download ZIP"** or **"Download Code"**
3. Save the file to your computer (e.g., Desktop or Documents)

The downloaded file will be named something like:
- `skillauro-educational-platform-main.zip`
- `project.zip`

### Step 2: Extract the ZIP File
**Windows:**
1. Right-click the ZIP file
2. Select "Extract All..."
3. Choose a location (e.g., `C:\Users\YourName\Projects\skillauro`)
4. Click "Extract"

**Mac:**
1. Double-click the ZIP file
2. It will automatically extract to the same folder

**Linux:**
```bash
unzip skillauro-educational-platform.zip
```

---

## Complete Setup Instructions

After extracting, follow these steps:

### Step 1: Open Project in Code Editor

**Using Visual Studio Code (Recommended):**
1. Open VS Code
2. File → Open Folder
3. Select the extracted `skillauro-educational-platform` folder
4. VS Code will load the project

**Using Command Line:**
```bash
cd path/to/skillauro-educational-platform
code .
```

### Step 2: Install Dependencies

Open terminal in the project folder (View → Terminal in VS Code) and run:

```bash
npm install
```

This will install:
- Next.js
- React components
- Database drivers
- UI libraries
- All other dependencies

**Wait for installation to complete** (usually 2-5 minutes depending on internet speed)

You should see output like:
```
added 387 packages in 2m 45s
```

### Step 3: Configure Database

#### 3.1 Install MySQL (if you don't have it)

**Windows:**
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Run the installer
3. Follow installation wizard
4. Choose "MySQL Server" during setup
5. Default port is 3306

**Mac:**
1. Download from: https://dev.mysql.com/downloads/mysql/
2. Or use Homebrew: `brew install mysql`

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install mysql-server
```

#### 3.2 Create Database

Open MySQL command line or workbench and run:

```sql
CREATE DATABASE skillauro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Verify it was created:
```sql
SHOW DATABASES;
```

You should see `skillauro` in the list.

#### 3.3 Create Environment Configuration File

1. In the project root folder, find the file `.env.example`
2. **Right-click** → Duplicate (or Copy and Paste)
3. Rename the copy to `.env.local` (exactly this name)
4. Open `.env.local` in your code editor
5. Fill in your actual values:

```
# Your MySQL credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=skillauro

# Gmail settings (for sending emails)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=management@skillauro.in

# Razorpay (for payments - optional for testing)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Keep these as-is for local development
NEXTAUTH_SECRET=my-super-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**For testing without Razorpay:** You can use test keys:
```
RAZORPAY_KEY_ID=rzp_test_1234567890123
RAZORPAY_KEY_SECRET=test_secret_key
```

### Step 4: Run Database Migrations

Open terminal in project folder and run:

```bash
mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql
mysql -h localhost -u root -p skillauro < scripts/02_insert_sample_data.sql
mysql -h localhost -u root -p skillauro < scripts/add-missing-tables.sql
```

You'll be prompted for your MySQL password. Enter it.

**Or using MySQL Workbench:**
1. Open MySQL Workbench
2. File → Open SQL Script
3. Open `scripts/01_create_tables.sql`
4. Click the lightning bolt (Execute) button
5. Repeat for `02_insert_sample_data.sql` and `add-missing-tables.sql`

### Step 5: Start the Development Server

In terminal, run:

```bash
npm run dev
```

You should see:
```
> skillauro@1.0.0 dev
> next dev

▲ Next.js 15.x.x
- Local:        http://localhost:3000
```

The server is now running! ✅

### Step 6: Access the Application

Open your web browser and go to:

```
http://localhost:3000
```

You should see the **Skillauro home page** with a beautiful hero image.

---

## User Registration & Login

### Create Your First Admin Account

Since demo users were removed, you need to create accounts manually:

#### Method 1: Direct Database (Fastest)

Open MySQL and run this SQL:

```sql
-- Create admin user
INSERT INTO users (email, user_id, password, name, role, phone, status) 
VALUES (
  'admin@skillauro.in',
  'ADM0001',
  'Admin@123456',
  'Admin User',
  'admin',
  '9000000001',
  'active'
);
```

Then login with:
- **Email or User ID:** `admin@skillauro.in` or `ADM0001`
- **Password:** `Admin@123456`

#### Method 2: Using Admin Registration Form

1. Go to Admin Dashboard: `http://localhost:3000/admin/dashboard`
2. Click "Add Faculty" or "Add Student"
3. Fill in the form
4. System will auto-generate user ID and password
5. Credentials will be sent via email (if configured)

### Default User IDs Format

- **Admin:** `ADM` + 4 digits (e.g., `ADM0001`)
- **Faculty:** `FAC` + 5 digits (e.g., `FAC00001`)
- **Student:** `STU` + 6 digits (e.g., `STU000001`)

### Login Page

Go to: `http://localhost:3000/login`

You can login with:
- Email address (e.g., `admin@skillauro.in`)
- OR User ID (e.g., `ADM0001`)
- Password (e.g., `Admin@123456`)

---

## Portal URLs

Once logged in, access these URLs:

### Admin Portal
- Dashboard: `http://localhost:3000/admin/dashboard`
- Manage Faculties: `http://localhost:3000/admin/faculties`
- Manage Students: `http://localhost:3000/admin/students`
- Manage Courses: `http://localhost:3000/admin/courses`
- Manage Fees: `http://localhost:3000/admin/fees`

### Faculty Portal
- Dashboard: `http://localhost:3000/faculty/dashboard`
- My Courses: `http://localhost:3000/faculty/courses`
- Schedule Classes: `http://localhost:3000/faculty/classes`
- Attendance: `http://localhost:3000/faculty/attendance`

### Student Portal
- Dashboard: `http://localhost:3000/student/dashboard`
- My Courses: `http://localhost:3000/student/courses`
- Pay Fees: `http://localhost:3000/student/fees`
- Attendance: `http://localhost:3000/student/attendance`

---

## Project Structure

```
skillauro-educational-platform/
├── app/                          # Next.js pages & routes
│   ├── admin/                    # Admin dashboard pages
│   ├── faculty/                  # Faculty dashboard pages
│   ├── student/                  # Student dashboard pages
│   ├── api/                      # API endpoints
│   ├── login/page.tsx            # Login page
│   ├── page.tsx                  # Home page
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── faculty/                  # Faculty-specific components
│   ├── student/                  # Student-specific components
│   └── ui/                       # UI library components
│
├── lib/                          # Utility functions
│   ├── auth-context.tsx          # Authentication logic
│   ├── db.ts                     # Database connection
│   ├── user-id-generator.ts      # Auto-generate IDs
│   └── utils.ts                  # Helper functions
│
├── scripts/                      # Database migrations
│   ├── 01_create_tables.sql
│   ├── 02_insert_sample_data.sql
│   └── add-missing-tables.sql
│
├── public/                       # Static files & images
├── .env.example                  # Environment template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.mjs               # Next.js config
└── README.md                     # Project documentation
```

---

## Troubleshooting

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```
Access on `http://localhost:3001`

### "next: command not found"
```bash
npm install
```

### MySQL connection failed
Check `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=skillauro
```

### Email not sending
1. Check `.env.local` EMAIL settings
2. Use Gmail App Password (not regular password)
3. Enable 2FA on Gmail account

### Database tables not found
Re-run migrations:
```bash
mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql
```

### Port 3000 won't connect
Make sure development server is running:
```bash
npm run dev
```

---

## Important Files to Know

| File | Purpose |
|------|---------|
| `.env.local` | Your secret credentials (DO NOT SHARE) |
| `package.json` | Project dependencies |
| `scripts/01_create_tables.sql` | Database schema |
| `scripts/02_insert_sample_data.sql` | Initial data |
| `app/api/` | Backend API endpoints |
| `lib/auth-context.tsx` | Authentication logic |

---

## What's Included

✅ Complete Next.js application  
✅ React components & UI library  
✅ Database migration scripts  
✅ Authentication system  
✅ Razorpay payment integration  
✅ Email notification system  
✅ Admin, Faculty, & Student portals  
✅ Course management  
✅ Fee payment tracking  
✅ Attendance system  
✅ Assessment management  

---

## Next Steps After Setup

1. ✅ Download and extract ZIP
2. ✅ Run `npm install`
3. ✅ Create `.env.local` with your settings
4. ✅ Run database migrations
5. ✅ Run `npm run dev`
6. Create admin account
7. Register faculties through admin dashboard
8. Register students through admin dashboard
9. Test different user portals

---

## Getting Help

If you get stuck:

1. Check `INSTALL_AND_RUN.md` for detailed steps
2. Check `.env.example` for environment variables
3. Verify MySQL is running: `mysql -u root -p`
4. Check terminal for error messages
5. Review database migration logs

---

## Support Documentation

- `README.md` - Project overview
- `INSTALL_AND_RUN.md` - Detailed installation
- `SETUP_GUIDE.md` - Configuration guide
- `QUICK_START.md` - Quick start
- `.env.example` - Environment template

---

**You're all set! Start with `npm install` and `npm run dev`** 🚀
