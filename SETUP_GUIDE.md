# Skillauro Educational Platform - Setup Guide

## Overview
This is a complete educational platform with admin, faculty, and student modules, including payment integration with Razorpay.

## Required Environment Variables

### Database Configuration
Add these to your `.env.local` file or Vercel project variables:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=skillauro_db
```

### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Email Configuration (Optional - for contact form)
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### Razorpay Configuration (Required for payment integration)
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

To get Razorpay credentials:
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to Settings → API Keys
3. Copy your Key ID and Key Secret
4. Add them to your environment variables

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Database Setup
Create the required tables in your MySQL database:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'faculty', 'student') NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  profile_pic VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  faculty_id INT NOT NULL,
  batch VARCHAR(100),
  duration_weeks INT,
  start_date DATE,
  end_date DATE,
  total_capacity INT DEFAULT 30,
  status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES users(id)
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE KEY unique_enrollment (student_id, course_id)
);

CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Feature Modules

### Admin Module (`/admin`)
- **Dashboard**: Overview of platform statistics
- **Faculties**: Add, edit, and manage faculty members
- **Students**: Add, edit, and manage student enrollments
- **Courses**: Create and manage courses
- **Contact Messages**: View messages submitted through the contact form

### Faculty Module (`/faculty`)
- **Dashboard**: View courses, students, and upcoming classes
- **Course Management**: Create and manage courses
- **Student Management**: View enrolled students
- **Assignments**: Create and grade assignments
- **Attendance**: Track class attendance

### Student Module (`/student`)
- **Dashboard**: View enrolled courses and progress
- **Fees Management**: View fee details and make payments via Razorpay
- **Assignments**: View and submit assignments
- **Certificates**: Download course certificates

### Public Pages
- **Home** (`/`): Landing page with course showcase
- **Contact** (`/contact`): Contact form for inquiries
- **Login** (`/login`): User authentication

## Payment Integration

### How Razorpay Integration Works

1. **Student initiates payment** on the Fees page
2. **Payment order created** via `/api/payments/razorpay` API
3. **Razorpay checkout modal** opens with payment details
4. **Payment processed** through Razorpay secure gateway
5. **Payment verified** using signature validation
6. **Success callback** updates payment status

### Testing Razorpay Payments

Use these test credentials in Razorpay Test Mode:
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## API Endpoints

### Payments
- `POST /api/payments/razorpay` - Create payment order
- `PUT /api/payments/razorpay` - Verify payment signature

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)

### Admin
- `GET/POST /api/admin/faculties` - Manage faculties
- `GET/POST /api/admin/students` - Manage students
- `GET/POST /api/admin/courses` - Manage courses

## Data Management

### Important Notes
- All sample data has been removed from the platform
- You must manually create faculties and students through the admin interface
- No pre-existing test data is included for security reasons

### Adding Initial Data

1. **Create Admin Account**: Register with admin role
2. **Add Faculties**: Go to Admin → Manage Faculties
3. **Add Students**: Go to Admin → Manage Students
4. **Create Courses**: Go to Admin → Manage Courses
5. **Enroll Students**: Associate students with courses

## Troubleshooting

### Database Connection Issues
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` are correct
- Ensure MySQL server is running
- Check firewall rules allow database access

### Email Not Sending
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Enable "Less secure apps" if using Gmail
- Use app-specific passwords for Gmail

### Razorpay Payment Not Working
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct
- Ensure you're using the correct credentials (live vs test)
- Check Razorpay dashboard for API key status

## Project Structure

```
app/
├── admin/              # Admin module
├── faculty/            # Faculty module
├── student/            # Student module
├── (auth)/             # Authentication pages
├── contact/            # Contact page
├── api/                # API endpoints
└── page.tsx            # Home page

components/
├── admin/              # Admin form components
├── payment-modal.tsx   # Razorpay payment component
└── ui/                 # Reusable UI components

lib/
├── db.ts               # Database schema
├── db-config.ts        # Database connection
└── auth.ts             # Authentication utilities
```

## Support & Contact

For issues or questions:
- **Email**: management@skillauro.in
- **Phone**: 8220946279, 6379652485, 6369721553

---

Last Updated: February 2024
