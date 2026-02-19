# Skillauro Educational Platform - Complete Setup Guide

## Project Overview
Skillauro is a comprehensive educational management platform built with Next.js, React, TypeScript, and MySQL. It provides admin, faculty, and student portals with features for course management, fees, payments via Razorpay, and more.

## Prerequisites
- **Node.js**: v16.x or higher (v18+ recommended)
- **npm** or **yarn** or **pnpm** package manager
- **MySQL**: v5.7 or higher (local or cloud database)
- **Git**: (optional, for cloning the repository)

## Step 1: Extract the Project
1. Download and extract the project ZIP file to your desired location
2. Open a terminal and navigate to the project directory:
   ```bash
   cd skillauro-educational-platform
   ```

## Step 2: Install Dependencies
Install all required npm packages:
```bash
npm install
```

Or if you prefer using yarn:
```bash
yarn install
```

Or if you prefer using pnpm:
```bash
pnpm install
```

This will install:
- Next.js framework
- React and React DOM
- UI components (shadcn/ui)
- Database drivers
- Utility packages

## Step 3: Database Configuration

### 3.1 Create a MySQL Database
Connect to your MySQL server and create a database:
```sql
CREATE DATABASE skillauro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.2 Configure Environment Variables
Create a `.env.local` file in the project root with your database credentials:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skillauro

# Email Configuration (for credentials and contact emails)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=management@skillauro.in
EMAIL_SERVICE=gmail

# Razorpay Configuration (for payment processing)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Application Configuration
NEXTAUTH_SECRET=generate_a_secure_random_string
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 3.3 Run Database Migrations
Execute the SQL migration scripts to create tables:

**Option A: Using MySQL CLI**
```bash
mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql
mysql -h localhost -u root -p skillauro < scripts/02_insert_sample_data.sql
mysql -h localhost -u root -p skillauro < scripts/add-missing-tables.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Open the SQL files from `scripts/` folder in order:
   - `01_create_tables.sql`
   - `02_insert_sample_data.sql`
   - `add-missing-tables.sql`
3. Execute each script in sequence

**Option C: Using Node.js Script**
```bash
node scripts/run-migrations.js
```

## Step 4: Start the Development Server
```bash
npm run dev
```

This will start the development server on `http://localhost:3000`

You should see:
```
> Local:        http://localhost:3000
> Environments: .env.local
```

## Step 5: Access the Application

### Login URL
Open your browser and go to: `http://localhost:3000/login`

### Default Admin Account
After running migrations, you can create an admin account:
- Role: Admin
- Email: admin@skillauro.in
- Password: (You will set this during first-time setup)

To create the first admin user, use the direct database method:
```sql
INSERT INTO users (email, user_id, password, name, role, status) 
VALUES ('admin@skillauro.in', 'ADM0001', 'hashed_password_here', 'Admin', 'admin', 'active');
```

### User Roles & Portals

**Admin Dashboard**
- URL: `http://localhost:3000/admin/dashboard`
- Manage faculties and students
- Register new users
- View analytics and reports

**Faculty Dashboard**
- URL: `http://localhost:3000/faculty/dashboard`
- Manage courses and classes
- Track attendance
- Create assessments

**Student Dashboard**
- URL: `http://localhost:3000/student/dashboard`
- View enrolled courses
- Submit assignments
- Pay fees via Razorpay
- Track attendance and grades

## Step 6: Configure Optional Services

### Razorpay Payment Gateway
1. Create account at https://razorpay.com
2. Get API keys from dashboard
3. Add to `.env.local`:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

### Email Service (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

## Project Structure
```
skillauro-educational-platform/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin portal pages
│   ├── faculty/                  # Faculty portal pages
│   ├── student/                  # Student portal pages
│   ├── api/                      # API routes
│   ├── login/                    # Login page
│   └── contact/                  # Contact page
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── faculty/                  # Faculty-specific components
│   ├── student/                  # Student-specific components
│   └── ui/                       # UI library components
├── lib/                          # Utility functions
│   ├── auth-context.tsx         # Authentication context
│   ├── db.ts                    # Database connection
│   ├── user-id-generator.ts     # Auto-generate user IDs
│   └── utils.ts                 # Helper utilities
├── scripts/                      # Database migration scripts
├── public/                       # Static assets
└── package.json                 # Project dependencies
```

## Common Commands

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Database
```bash
# Run migrations (if you create run-migrations.js)
npm run migrate

# Connect to MySQL directly
mysql -h localhost -u root -p skillauro
```

## Troubleshooting

### Issue: "next: command not found"
**Solution**: Run `npm install` to install dependencies
```bash
npm install
```

### Issue: Database connection failed
**Solution**: Check `.env.local` credentials
```bash
# Test MySQL connection
mysql -h DB_HOST -u DB_USER -p DB_NAME
```

### Issue: Port 3000 already in use
**Solution**: Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: Email not sending
**Solution**: 
1. Check Gmail App Password is correct
2. Enable "Less secure app access" (if not using App Password)
3. Check `.env.local` EMAIL settings

### Issue: Razorpay payment not working
**Solution**:
1. Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
2. Check Razorpay account is in live mode (not test mode)
3. Verify webhook URL in Razorpay dashboard

## Features Implemented

✅ **User Management**
- Admin registration system
- Faculty registration and management
- Student enrollment and management
- Automatic user ID generation
- Email credential delivery

✅ **Authentication**
- Email-based login
- User ID-based login
- Role-based access control (Admin, Faculty, Student)
- Secure password hashing
- Session management

✅ **Admin Portal**
- Dashboard with analytics
- Manage faculties
- Manage students
- Course management
- Fee management
- View all notifications

✅ **Faculty Portal**
- Dashboard with statistics
- Manage courses
- Schedule classes
- Track attendance
- Create and grade assessments
- View enrolled students

✅ **Student Portal**
- Dashboard with course status
- View enrolled courses
- Attendance tracking
- View and submit assessments
- Fee payment via Razorpay
- Download certificates

✅ **Payment Integration**
- Razorpay payment gateway
- Fee payment tracking
- Payment history
- Receipt generation

✅ **Communication**
- Contact form with email
- Notifications system
- Email alerts

## Environment Variables Checklist

Before running the app, ensure you have:
- [ ] DB_HOST
- [ ] DB_PORT
- [ ] DB_USER
- [ ] DB_PASSWORD
- [ ] DB_NAME
- [ ] EMAIL_USER
- [ ] EMAIL_PASSWORD
- [ ] EMAIL_FROM
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL

## Getting Help

For detailed documentation, see:
- `README.md` - Project overview
- `QUICK_START.md` - Quick start guide
- `SETUP_GUIDE.md` - Detailed setup
- `PROJECT_UPDATES.md` - Latest changes

## Support

If you encounter issues:
1. Check `.env.local` is configured correctly
2. Verify MySQL database is running
3. Check Node.js version (v16+)
4. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
5. Check logs in terminal for error messages

## Next Steps

1. Install dependencies: `npm install`
2. Configure `.env.local` with your settings
3. Run database migrations
4. Start development server: `npm run dev`
5. Access admin dashboard to register faculties and students
6. Test the application

---

**Ready to launch?** Start with `npm install` and `npm run dev`!
