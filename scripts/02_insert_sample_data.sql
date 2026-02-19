-- Insert Sample Data for Skillauro Platform

-- Insert Admin User
INSERT INTO users (email, password, name, role, phone, status) VALUES
('skillauro@gmail.com', 'Skillauro@2026', 'Admin User', 'admin', '8220946279', 'active');

-- Insert Faculty Users
INSERT INTO users (email, password, name, role, phone, status) VALUES
('faculty1@skillauro.com', 'Faculty@123', 'Dr. Raj Kumar', 'faculty', '9876543210', 'active'),
('faculty2@skillauro.com', 'Faculty@123', 'Ms. Priya Verma', 'faculty', '9876543211', 'active'),
('faculty3@skillauro.com', 'Faculty@123', 'Prof. Arun Singh', 'faculty', '9876543212', 'active'),
('faculty4@skillauro.com', 'Faculty@123', 'Dr. Meera Gupta', 'faculty', '9876543213', 'active');

-- Insert Student Users
INSERT INTO users (email, password, name, role, phone, status) VALUES
('student1@skillauro.com', 'Student@123', 'Arjun Singh', 'student', '9876543220', 'active'),
('student2@skillauro.com', 'Student@123', 'Anjali Sharma', 'student', '9876543221', 'active'),
('student3@skillauro.com', 'Student@123', 'Rahul Patel', 'student', '9876543222', 'active'),
('student4@skillauro.com', 'Student@123', 'Sneha Desai', 'student', '9876543223', 'active'),
('student5@skillauro.com', 'Student@123', 'Vikram Das', 'student', '9876543224', 'active'),
('student6@skillauro.com', 'Student@123', 'Pooja Mishra', 'student', '9876543225', 'active');

-- Insert Faculty Details
INSERT INTO faculties (user_id, department, specialization, qualifications, bio) VALUES
(2, 'Computer Science', 'Web Development', 'B.Tech, M.Tech', 'Expert in Full Stack Development'),
(3, 'Computer Science', 'React & JavaScript', 'B.Tech, M.Tech', 'React Expert with 8 years experience'),
(4, 'Computer Science', 'Backend Development', 'B.Tech, M.Tech', 'Node.js and Database Expert'),
(5, 'Data Science', 'Python & Data Science', 'B.Tech, M.Tech', 'Data Science & ML Expert');

-- Insert Student Details
INSERT INTO students (user_id, enrollment_number, batch, semester, cgpa) VALUES
(6, 'STU001', '2024-2026', 1, 8.5),
(7, 'STU002', '2024-2026', 1, 8.2),
(8, 'STU003', '2024-2026', 1, 7.9),
(9, 'STU004', '2024-2026', 1, 8.7),
(10, 'STU005', '2024-2026', 1, 8.3),
(11, 'STU006', '2024-2026', 1, 8.1);

-- Insert Courses
INSERT INTO courses (code, name, description, duration_weeks, credits, max_students, faculty_id, status) VALUES
(1, 'WEB101', 'Web Development Mastery', 'Complete Web Development Course', 12, 100, 1, 'active'),
(2, 'REACT201', 'Advanced React', 'Master React for Modern Web Apps', 10, 80, 2, 'active'),
(3, 'NODE301', 'Node.js Backend Development', 'Build Scalable Backend with Node.js', 10, 75, 3, 'active'),
(4, 'PYDS401', 'Python Data Science', 'Learn Data Science with Python', 12, 60, 4, 'active');

-- Insert Course Enrollments
INSERT INTO course_enrollments (student_id, course_id, enrollment_date, status) VALUES
(1, 1, '2024-01-15', 'enrolled'),
(1, 2, '2024-01-15', 'enrolled'),
(2, 1, '2024-01-15', 'enrolled'),
(2, 3, '2024-01-15', 'enrolled'),
(3, 2, '2024-01-15', 'enrolled'),
(3, 4, '2024-01-15', 'enrolled'),
(4, 1, '2024-01-15', 'enrolled'),
(4, 3, '2024-01-15', 'enrolled'),
(5, 2, '2024-01-15', 'enrolled'),
(5, 4, '2024-01-15', 'enrolled'),
(6, 1, '2024-01-15', 'enrolled'),
(6, 3, '2024-01-15', 'enrolled');

-- Insert Classes
INSERT INTO classes (course_id, title, description, class_date, start_time, end_time, meeting_link, status) VALUES
(1, 'Introduction to HTML', 'Learn HTML Basics', '2024-02-15', '10:00:00', '11:30:00', 'https://meet.google.com/abc-xyz-123', 'completed'),
(1, 'CSS Fundamentals', 'Master CSS Styling', '2024-02-16', '10:00:00', '11:30:00', 'https://meet.google.com/def-uvw-456', 'scheduled'),
(2, 'React Hooks Deep Dive', 'Understanding React Hooks', '2024-02-17', '14:00:00', '15:30:00', 'https://meet.google.com/ghi-rst-789', 'scheduled'),
(3, 'Express.js Framework', 'Build REST APIs', '2024-02-18', '16:00:00', '17:30:00', 'https://meet.google.com/jkl-opq-012', 'scheduled'),
(4, 'Data Visualization', 'Matplotlib and Seaborn', '2024-02-19', '15:00:00', '16:30:00', 'https://meet.google.com/mno-lmn-345', 'scheduled');

-- Insert Attendance Records
INSERT INTO attendance (student_id, class_id, status) VALUES
(1, 1, 'present'),
(2, 1, 'present'),
(3, 1, 'absent'),
(4, 1, 'present'),
(5, 1, 'leave'),
(6, 1, 'present');

-- Insert Assessments
INSERT INTO assessments (course_id, title, description, assessment_type, total_marks, due_date, duration_minutes, status) VALUES
(1, 'HTML Quiz', 'Test your HTML knowledge', 'quiz', 20, '2024-02-20 23:59:59', 30, 'published'),
(1, 'CSS Assignment', 'Create a responsive layout', 'assignment', 50, '2024-02-25 23:59:59', NULL, 'published'),
(2, 'React Component Test', 'Build reusable components', 'test', 100, '2024-02-28 23:59:59', 90, 'published'),
(3, 'API Development', 'Build REST API endpoints', 'assignment', 75, '2024-03-05 23:59:59', NULL, 'published'),
(4, 'Data Analysis Project', 'Analyze dataset and visualize', 'project', 100, '2024-03-10 23:59:59', NULL, 'published');

-- Insert Assessment Submissions
INSERT INTO assessment_submissions (assessment_id, student_id, submitted_at, marks_obtained, status) VALUES
(1, 1, '2024-02-19 10:30:00', 18, 'graded'),
(1, 2, '2024-02-19 11:00:00', 20, 'graded'),
(1, 3, '2024-02-19 09:45:00', 15, 'graded'),
(1, 4, '2024-02-19 12:00:00', 19, 'graded');

-- Insert Study Materials
INSERT INTO study_materials (course_id, title, description, material_type, file_url, uploaded_by) VALUES
(1, 'HTML Complete Guide', 'Comprehensive HTML reference', 'pdf', '/materials/html-guide.pdf', 2),
(1, 'CSS Tricks & Tips', 'Advanced CSS techniques', 'video', 'https://www.youtube.com/watch?v=xyz123', 2),
(2, 'React Documentation', 'Official React Docs Link', 'link', 'https://react.dev', 3),
(3, 'Express.js Tutorial', 'Complete Express guide', 'pdf', '/materials/express-tutorial.pdf', 4),
(4, 'Python Data Science', 'Pandas & NumPy guide', 'video', 'https://www.youtube.com/watch?v=abc456', 5);

-- Insert Fees
INSERT INTO fees (student_id, course_id, total_amount, paid_amount, pending_amount, payment_status, due_date) VALUES
(1, 1, 5000.00, 5000.00, 0.00, 'paid', '2024-01-31'),
(1, 2, 6000.00, 3000.00, 3000.00, 'partial', '2024-02-28'),
(2, 1, 5000.00, 0.00, 5000.00, 'pending', '2024-01-31'),
(2, 3, 7000.00, 0.00, 7000.00, 'pending', '2024-02-28'),
(3, 2, 6000.00, 6000.00, 0.00, 'paid', '2024-02-28'),
(3, 4, 8000.00, 4000.00, 4000.00, 'partial', '2024-03-31'),
(4, 1, 5000.00, 5000.00, 0.00, 'paid', '2024-01-31'),
(4, 3, 7000.00, 7000.00, 0.00, 'paid', '2024-02-28'),
(5, 2, 6000.00, 0.00, 6000.00, 'pending', '2024-02-28'),
(5, 4, 8000.00, 0.00, 8000.00, 'pending', '2024-03-31'),
(6, 1, 5000.00, 0.00, 5000.00, 'pending', '2024-01-31'),
(6, 3, 7000.00, 3500.00, 3500.00, 'partial', '2024-02-28');

-- Insert Notifications
INSERT INTO notifications (sender_id, notification_type, title, message, target_role, course_id) VALUES
(1, 'announcement', 'Welcome to Skillauro', 'Welcome to our online learning platform', 'all', NULL),
(2, 'class_update', 'Upcoming Class', 'CSS class will be held on 2024-02-16 at 10:00 AM', 'student', 1),
(3, 'exam_alert', 'Assessment Deadline', 'React Component Test due on 2024-02-28', 'student', 2),
(1, 'fee_alert', 'Fee Payment Reminder', 'Please complete your pending fee payments', 'student', NULL);

-- Insert Contact Messages
INSERT INTO contact_messages (name, email, phone, subject, message, status) VALUES
('John Doe', 'john@example.com', '9876543000', 'Course Inquiry', 'I want to know more about Web Development course', 'new'),
('Jane Smith', 'jane@example.com', '9876543001', 'Technical Issue', 'Unable to access course materials', 'new'),
('Mike Wilson', 'mike@example.com', '9876543002', 'General Inquiry', 'How to enroll in a course?', 'read');
