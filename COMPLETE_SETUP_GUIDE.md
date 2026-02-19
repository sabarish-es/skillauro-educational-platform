# Skillauro Platform - Complete Setup Guide

## Overview
Skillauro is a comprehensive online learning platform with three separate dashboards:
- **Admin Dashboard** - Manage faculties, students, courses, fees, and system notifications
- **Faculty Dashboard** - Manage courses, online classes, attendance, and assessments
- **Student Dashboard** - View courses, join online classes, track attendance, and manage fees

---

## Default Login Credentials

### Admin Account
- **Email**: skillauro@gmail.com
- **Password**: Skillauro@2026
- **Role**: Admin

### Faculty Test Account
- **Email**: faculty1@skillauro.com
- **Password**: Faculty@123
- **Role**: Faculty

### Student Test Account
- **Email**: student1@skillauro.com
- **Password**: Student@123
- **Role**: Student

---

## Installation Steps (Windows with VS Code)

### Step 1: Download and Extract the Project
1. Download the project ZIP file
2. Extract it to a folder (e.g., `C:\skillauro-platform`)
3. Open the folder in VS Code

### Step 2: Open Terminal in VS Code
1. In VS Code, press `Ctrl + Backtick` (`) to open the terminal
2. Or go to **View → Terminal**

### Step 3: Install Dependencies
```bash
npm install
```
This will take 2-3 minutes to install all required packages.

### Step 4: Start the Development Server
```bash
npm run dev
```

You should see output like:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
```

### Step 5: Open in Browser
1. Click the link or open your browser
2. Go to: `http://localhost:3000`
3. You should see the Skillauro landing page

---

## Navigation

### From Landing Page
- Click **Login** button → You'll see the login page
- Select **Admin/Faculty/Student** role
- Click **Quick Fill** to auto-fill credentials
- Click **Login**

### Admin Dashboard
- URL: `http://localhost:3000/admin/dashboard`
- Manage: Faculties, Students, Courses, Fees, Notifications

### Faculty Dashboard
- URL: `http://localhost:3000/faculty/dashboard`
- Manage: Courses, Online Classes, Attendance, Assessments

### Student Dashboard
- URL: `http://localhost:3000/student/dashboard`
- View: Courses, Join Classes, Check Attendance, Pay Fees

---

## Troubleshooting

### Issue: "Port 3000 is already in use"
**Solution:**
```bash
# Kill the process using port 3000
lsof -ti :3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

### Issue: Module not found errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Issue: Can't login with provided credentials
**Solution:**
1. Make sure you're using exact email and password from this guide
2. Check browser console (F12) for error messages
3. Try logging in with a different role

### Issue: Page shows 404 error
**Solution:**
All pages are pre-created. If you see a 404:
1. Clear browser cache (Ctrl + Shift + Delete)
2. Restart the dev server (Ctrl + C, then `npm run dev`)
3. Check the URL is correct

---

## File Structure

```
skillauro-platform/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/                   # Login page
│   ├── contact/                 # Contact form
│   ├── admin/                   # Admin dashboard
│   ├── faculty/                 # Faculty dashboard
│   ├── student/                 # Student dashboard
│   └── api/auth/                # Authentication API routes
├── components/
│   ├── admin/                   # Admin UI components
│   ├── faculty/                 # Faculty UI components
│   ├── student/                 # Student UI components
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── auth-context.tsx         # Authentication state management
│   └── auth.ts                  # Authentication utilities
├── public/
│   └── skillauro-logo.png       # Logo file
└── package.json                 # Dependencies

```

---

## Key Features Implemented

### Authentication System
- Email/Password login for three roles
- Session management with cookies
- Protected routes by role
- Auto-redirect to correct dashboard

### Admin Features
- Dashboard with statistics
- Manage faculties (Create, Edit, Delete)
- Manage students (Create, Edit, Delete)
- Manage courses
- Manage fee payments
- Send system notifications

### Faculty Features
- Dashboard with course overview
- Manage assigned courses
- Create and manage online classes
- Track student attendance
- Create assessments and manage grades
- Receive notifications

### Student Features
- Dashboard with enrolled courses
- View and join online classes
- Track attendance records
- View assessment scores
- Pay fees via payment gateway
- Receive course notifications

---

## Future Enhancements

### Database Integration (Optional)
To add persistent data storage:
1. Set up Supabase or Neon database
2. Create database schema
3. Replace mock data with real API calls

### Payment Integration (Optional)
To enable Razorpay payments:
1. Get Razorpay API keys
2. Create payment routes
3. Implement payment processing

### Live Class Features (Optional)
To add Google Meet integration:
1. Get Google API credentials
2. Create class scheduling logic
3. Embed Meet iframes in class pages

---

## Support & Contact

For issues or questions about the platform:
- Email: management@skillauro.in
- Phone: 8220946279, 6379652485, 6369721553

---

## Important Notes

1. **Default Admin Credentials**: These are set in the code for demo purposes. Before deploying to production, change these credentials.

2. **No Database**: This demo uses mock data stored in memory. Data will reset when you restart the server.

3. **HTTPS**: The app works on HTTP for development. For production deployment, ensure HTTPS is enabled.

4. **API Routes**: Authentication is handled via `/api/auth/` routes. Modify these to add database connections.

---

## Deployment to Vercel (Optional)

If you want to deploy the app online:

1. Push code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

The app will be live in minutes!

---

**Created with Skillauro Platform v1.0**
