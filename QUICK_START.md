# Quick Start Guide - Skillauro Platform

## 🚀 Get Started in 5 Minutes

### Step 1: Configure Environment Variables
Go to your Vercel project dashboard and add these variables in the **Settings → Environment Variables** section:

**Database Setup:**
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=skillauro_db
```

**Authentication:**
```
JWT_SECRET=your-secret-key-here
```

**Email (Optional):**
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Razorpay Payment:**
```
RAZORPAY_KEY_ID=your_key_id_from_razorpay
RAZORPAY_KEY_SECRET=your_key_secret_from_razorpay
```

Get Razorpay credentials from: https://dashboard.razorpay.com → Settings → API Keys

### Step 2: Initialize Database
Create these tables in your MySQL database:

```sql
-- Run this in your MySQL client
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

### Step 3: Deploy
Push your code to GitHub and redeploy on Vercel:

```bash
git add .
git commit -m "Add Skillauro improvements"
git push origin main
```

Vercel will automatically:
- Install dependencies (including razorpay)
- Build the project
- Deploy to production

### Step 4: Start Using the Platform

**Homepage:** `https://yourdomain.com`
- View featured courses
- See platform features
- Click "Get Started" to login

**Admin Panel:** `https://yourdomain.com/admin`
- Add faculties
- Add students
- Create courses
- View contact messages

**Student Dashboard:** `https://yourdomain.com/student`
- View enrolled courses
- Pay fees via Razorpay
- Track progress

**Faculty Dashboard:** `https://yourdomain.com/faculty`
- Manage courses
- View enrolled students
- Track submissions

**Contact Page:** `https://yourdomain.com/contact`
- Send messages (emails to management@skillauro.in)
- View contact information

---

## 📋 What's New

✅ **All sample data removed** - Start fresh with manual data entry

✅ **Faculty Management Forms** - Add, edit faculty with validation

✅ **Student Management Forms** - Add, edit students with validation

✅ **Razorpay Integration** - Secure payment processing for student fees

✅ **Hero Image** - Professional landing page visual

✅ **Contact Email** - Messages sent to management@skillauro.in

✅ **Faculty Dashboard** - Complete course and student management interface

---

## 🧪 Test Razorpay Payments

In test mode, use these test card details:

**Card Number:** `4111 1111 1111 1111`  
**Expiry:** Any future date (e.g., 12/25)  
**CVV:** Any 3 digits (e.g., 123)  
**Name:** Any name  

After payment, you'll see a success message. Check your database's `payments` table for the transaction.

---

## 🔧 Troubleshooting

### Database Connection Error
- Verify DB_HOST, DB_USER, DB_PASSWORD in environment variables
- Check MySQL is running and accessible
- Ensure firewall allows connections

### Razorpay Not Working
- Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correct
- Make sure they're from the same environment (test vs live)
- Check Razorpay dashboard for API key status

### Email Not Sending
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- If using Gmail, enable "Less secure apps" or use app password
- Check spam folder for emails

### Forms Not Appearing
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check browser console for JavaScript errors

---

## 📞 Support

**Contact Email:** management@skillauro.in  
**Phone:** 8220946279 | 6379652485 | 6369721553

---

## 📚 Documentation

For detailed information:
- **SETUP_GUIDE.md** - Complete setup instructions
- **PROJECT_UPDATES.md** - All changes made to the project
- **README.md** - Project overview (if available)

---

## ✨ Key Features

| Feature | Status | Location |
|---------|--------|----------|
| Admin Panel | ✅ Ready | `/admin` |
| Faculty Management | ✅ Ready | `/admin/faculties` |
| Student Management | ✅ Ready | `/admin/students` |
| Faculty Dashboard | ✅ Ready | `/faculty/dashboard` |
| Student Dashboard | ✅ Ready | `/student` |
| Razorpay Payments | ✅ Ready | `/student/fees` |
| Contact Form | ✅ Ready | `/contact` |
| Landing Page | ✅ Ready | `/` |
| User Authentication | ✅ Ready | `/login` |

---

**Last Updated:** February 2024  
**Platform Version:** 1.0.0

Happy Learning! 🎓
