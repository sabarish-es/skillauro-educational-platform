// Database initialization script
// This file demonstrates the database schema needed for Skillauro

export const DATABASE_SCHEMA = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
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
  `,
  
  courses: `
    CREATE TABLE IF NOT EXISTS courses (
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
  `,
  
  enrollments: `
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      course_id INT NOT NULL,
      enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
      FOREIGN KEY (student_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id),
      UNIQUE KEY unique_enrollment (student_id, course_id)
    );
  `,
  
  classes: `
    CREATE TABLE IF NOT EXISTS classes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      course_id INT NOT NULL,
      faculty_id INT NOT NULL,
      class_date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      meet_link VARCHAR(500),
      recording_url VARCHAR(500),
      status ENUM('scheduled', 'ongoing', 'completed') DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id),
      FOREIGN KEY (faculty_id) REFERENCES users(id)
    );
  `,
  
  attendance: `
    CREATE TABLE IF NOT EXISTS attendance (
      id INT PRIMARY KEY AUTO_INCREMENT,
      class_id INT NOT NULL,
      student_id INT NOT NULL,
      status ENUM('present', 'absent') DEFAULT 'absent',
      marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (class_id) REFERENCES classes(id),
      FOREIGN KEY (student_id) REFERENCES users(id),
      UNIQUE KEY unique_attendance (class_id, student_id)
    );
  `,
  
  assessments: `
    CREATE TABLE IF NOT EXISTS assessments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      course_id INT NOT NULL,
      faculty_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      type ENUM('quiz', 'assignment', 'exam') DEFAULT 'quiz',
      total_marks INT DEFAULT 100,
      time_limit_minutes INT,
      due_date DATETIME,
      status ENUM('draft', 'published', 'closed') DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id),
      FOREIGN KEY (faculty_id) REFERENCES users(id)
    );
  `,
  
  submissions: `
    CREATE TABLE IF NOT EXISTS submissions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      assessment_id INT NOT NULL,
      student_id INT NOT NULL,
      submission_text TEXT,
      submission_file VARCHAR(500),
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      marks_obtained INT,
      feedback TEXT,
      evaluated_at TIMESTAMP NULL,
      FOREIGN KEY (assessment_id) REFERENCES assessments(id),
      FOREIGN KEY (student_id) REFERENCES users(id),
      UNIQUE KEY unique_submission (assessment_id, student_id)
    );
  `,
  
  fees: `
    CREATE TABLE IF NOT EXISTS fees (
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      course_id INT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      paid_amount DECIMAL(10, 2) DEFAULT 0,
      status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id),
      UNIQUE KEY unique_fee (student_id, course_id)
    );
  `,
  
  payments: `
    CREATE TABLE IF NOT EXISTS payments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      fee_id INT NOT NULL,
      student_id INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      payment_method VARCHAR(50),
      razorpay_order_id VARCHAR(255),
      razorpay_payment_id VARCHAR(255),
      razorpay_signature VARCHAR(255),
      status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
      payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (fee_id) REFERENCES fees(id),
      FOREIGN KEY (student_id) REFERENCES users(id)
    );
  `,
  
  notifications: `
    CREATE TABLE IF NOT EXISTS notifications (
      id INT PRIMARY KEY AUTO_INCREMENT,
      sender_id INT NOT NULL,
      recipient_id INT NOT NULL,
      type ENUM('class_update', 'exam_alert', 'fee_alert', 'announcement') DEFAULT 'announcement',
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      course_id INT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (recipient_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `,
  
  contact_messages: `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('new', 'read', 'replied') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `
};

// Default Admin User for initialization
export const DEFAULT_ADMIN = {
  email: 'skillauro@gmail.com',
  password: 'Skillauro@2026',
  name: 'Admin User',
  role: 'admin'
};
