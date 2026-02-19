# Skillauro - Online Learning Platform

A comprehensive full-stack educational web platform with three separate dashboards for Admin, Faculty, and Students.

## 🌟 Features

### Admin Dashboard
- **Manage Faculties**: Add, update, and remove faculty members
- **Manage Students**: Handle student enrollments and details
- **Course Management**: Create and assign courses to faculty
- **Fees Management**: Track and manage student fee payments
- **Notifications**: Send global announcements to all users

### Faculty Dashboard
- **My Courses**: View assigned courses and batch details
- **Online Classes**: Schedule and manage Google Meet live classes
- **Attendance Management**: Mark student attendance
- **Assessments**: Create quizzes, assignments, and projects
- **Announcements**: Send course-specific announcements

### Student Dashboard
- **My Courses**: View enrolled courses and progress
- **Live Classes**: Join classes and access recordings
- **Attendance Tracking**: View attendance percentage by course
- **Assessments**: Complete tests and view results
- **Fees Management**: Track fees and make payments via Razorpay
- **Notifications**: Receive announcements and alerts

## 🔐 Authentication

**Default Admin Credentials:**
```
Email: skillauro@gmail.com
Password: Skillauro@2026
Role: Admin
```

**Demo Faculty Account:**
```
Email: faculty1@skillauro.com
Password: Faculty@123
Role: Faculty
```

**Demo Student Account:**
```
Email: student1@skillauro.com
Password: Student@123
Role: Student
```

## 🚀 How to Run the Project

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Extract and Open Project
```bash
# Extract the downloaded ZIP file
# Open VS Code in the project directory
code .
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install
```

### Step 3: Start the Development Server
```bash
# Run the Next.js development server
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📁 Project Structure

```
skillauro/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Login page
│   ├── contact/page.tsx         # Contact page
│   ├── admin/                   # Admin dashboard pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── faculties/page.tsx
│   │   ├── students/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── fees/page.tsx
│   │   └── notifications/page.tsx
│   ├── faculty/                 # Faculty dashboard pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── classes/page.tsx
│   │   ├── attendance/page.tsx
│   │   ├── assessments/page.tsx
│   │   └── notifications/page.tsx
│   └── student/                 # Student dashboard pages
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── courses/page.tsx
│       ├── classes/page.tsx
│       ├── attendance/page.tsx
│       ├── fees/page.tsx
│       ├── assessments/page.tsx
│       └── notifications/page.tsx
├── api/
│   └── auth/                    # Authentication routes
│       ├── login/route.ts
│       ├── logout/route.ts
│       └── me/route.ts
├── components/
│   ├── admin/                   # Admin components
│   ├── faculty/                 # Faculty components
│   ├── student/                 # Student components
│   └── ui/                      # Shadcn UI components
├── lib/
│   ├── auth.ts                  # JWT utilities
│   ├── auth-context.tsx         # Auth React context
│   ├── db.ts                    # Database schema
│   └── utils.ts
└── public/
    └── skillauro-logo.png       # Logo asset
```

## 🔑 Key Features Breakdown

### Login Flow
1. User selects role (Admin/Faculty/Student)
2. Enter email and password
3. System validates credentials and creates JWT token
4. Redirects to appropriate dashboard

### No 404 Errors
All pages are pre-created and properly routed. Every user role has complete navigation.

### Protected Routes
- Admin pages only accessible to admin users
- Faculty pages only accessible to faculty users
- Student pages only accessible to student users
- Non-authenticated users redirected to login

## 💳 Payment Integration (Razorpay)

**Fees Payment Page** in Student Dashboard includes:
- View total fees, paid amount, and pending amount
- Pay fees directly via Razorpay
- Transaction security with Razorpay encryption
- Payment status tracking

**Setup Razorpay:**
1. Sign up at https://razorpay.com
2. Get your API keys
3. Add to environment variables (when integrating)

## 📧 Email Notifications

**Contact Form** sends inquiries to:
- Email: **management@skillauro.in**
- Phone: **8220946279, 6379652485, 6369721553**

## 🎓 Online Classes with Google Meet

- Faculty can generate and share Google Meet links
- Students join directly from the platform
- Recording URLs can be added for playback
- Automatic class status tracking

## 📊 Database Schema

The application uses the following tables:
- `users` - All user accounts (admin, faculty, student)
- `courses` - Course information
- `enrollments` - Student enrollments
- `classes` - Class schedules and meet links
- `attendance` - Attendance records
- `assessments` - Tests and assignments
- `submissions` - Student submissions
- `fees` - Fee information
- `payments` - Payment records
- `notifications` - User notifications
- `contact_messages` - Contact form submissions

## 🎨 Design Highlights

- **Blue & Orange Gradient**: Modern brand colors
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Sidebars**: Easy navigation with role-specific menus
- **Clean UI**: Shadcn components for professional appearance
- **Real-time Updates**: Dashboard stats reflect actual data

## 🔧 Customization Guide

### Change Admin Credentials
Edit `/vercel/share/v0-project/app/api/auth/login/route.ts`:
```typescript
const mockUsers = [
  {
    id: 1,
    email: 'your-email@example.com',
    name: 'Admin User',
    role: 'admin',
    password: 'your-password',
    // ... other fields
  },
  // ...
];
```

### Add More Courses
Edit the mock course data in respective pages or connect to a real database.

### Change Brand Colors
Update gradient colors in components:
- From: `from-blue-600` to `from-your-color`
- To: `to-orange-500` to `to-your-color`

## 📱 Mobile Responsive

- Mobile hamburger menu in sidebars
- Touch-friendly buttons and inputs
- Responsive grid layouts
- Mobile-first design approach

## ✨ What's Included

✅ Complete Admin Dashboard
✅ Complete Faculty Dashboard
✅ Complete Student Dashboard
✅ Landing Page with Features
✅ Contact Form
✅ Authentication System
✅ Protected Routes
✅ Responsive Design
✅ Logo Integration
✅ Payment Gateway Ready (Razorpay)
✅ Google Meet Integration Ready
✅ Email Notifications Ready
✅ No 404 Errors - All pages created

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Click "Deploy"
4. App goes live automatically

### Environment Variables
Create `.env.local` file:
```
JWT_SECRET=your-secret-key-here
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## 📞 Support & Contact

For inquiries:
- **Email**: management@skillauro.in
- **Phone**: 8220946279, 6379652485, 6369721553

---

**Skillauro - Learn • Innovate • Succeed**

*Built with Next.js, React, and Tailwind CSS*
