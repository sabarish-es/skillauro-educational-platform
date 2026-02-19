# Skillauro Platform - Setup Checklist

Print this out or check off as you complete each step.

---

## ✅ Pre-Setup Requirements

- [ ] **Node.js installed** - Check: `node -v` (should be v16+)
- [ ] **npm installed** - Check: `npm -v`
- [ ] **MySQL installed** - Check: `mysql -u root -p` (can connect)
- [ ] **Code editor ready** - VS Code or your preferred editor
- [ ] **ZIP file downloaded** - From v0 platform

---

## ✅ Step 1: Download & Extract (5 minutes)

- [ ] Clicked **three dots (⋮)** in v0 top right
- [ ] Selected **"Download ZIP"** 
- [ ] ZIP file in Downloads folder
- [ ] Extracted ZIP to project folder
- [ ] Folder contains `package.json` file
- [ ] Opened project folder in code editor

**Command to verify:**
```bash
ls -la        # Mac/Linux
dir           # Windows
```
You should see files like `package.json`, `README.md`, etc.

---

## ✅ Step 2: Install Dependencies (3-5 minutes)

- [ ] Opened terminal in project folder
- [ ] Ran: `npm install`
- [ ] Installation completed without errors
- [ ] `node_modules` folder created
- [ ] Installation message shows "added XXX packages"

**Command to verify:**
```bash
npm list --depth=0
```

---

## ✅ Step 3: Database Setup (5 minutes)

### Create Database
- [ ] Opened MySQL command line or workbench
- [ ] Logged in with: `mysql -u root -p`
- [ ] Ran: `CREATE DATABASE skillauro;`
- [ ] Verified with: `SHOW DATABASES;`
- [ ] Database `skillauro` appears in list

### Run Migrations
- [ ] Created database success
- [ ] In project folder terminal
- [ ] Ran: `mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql`
- [ ] Ran: `mysql -h localhost -u root -p skillauro < scripts/02_insert_sample_data.sql`
- [ ] Ran: `mysql -h localhost -u root -p skillauro < scripts/add-missing-tables.sql`
- [ ] All three migrations completed without errors

**Command to verify tables:**
```bash
mysql -u root -p skillauro
> SHOW TABLES;
> EXIT;
```
You should see 15+ tables in the output.

---

## ✅ Step 4: Environment Configuration (5 minutes)

### Create .env.local file
- [ ] Found `.env.example` in project root
- [ ] Duplicated/copied the file
- [ ] Renamed copy to `.env.local` (exactly)
- [ ] `.env.local` file is in project root (same level as `package.json`)
- [ ] File is NOT visible in git (added to `.gitignore`)

### Fill in Database Credentials
- [ ] `DB_HOST=localhost`
- [ ] `DB_PORT=3306`
- [ ] `DB_USER=root` (or your MySQL username)
- [ ] `DB_PASSWORD=your_actual_password` (your MySQL password)
- [ ] `DB_NAME=skillauro`

### Fill in Email Settings (Optional for testing)
- [ ] `EMAIL_SERVICE=gmail`
- [ ] `EMAIL_USER=your_email@gmail.com`
- [ ] `EMAIL_PASSWORD=your_app_password` (Gmail App Password, not regular password)
- [ ] `EMAIL_FROM=management@skillauro.in`

### Fill in Razorpay (Optional for testing)
- [ ] `RAZORPAY_KEY_ID=rzp_test_1234567890` (test key for now)
- [ ] `RAZORPAY_KEY_SECRET=test_secret_key`

### Fill in Application Settings
- [ ] `NEXTAUTH_SECRET=my-super-secret-string-change-this-in-production`
- [ ] `NEXTAUTH_URL=http://localhost:3000`
- [ ] `NODE_ENV=development`
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:3000`

**Verify:**
```bash
cat .env.local
```
Should show all your environment variables.

---

## ✅ Step 5: Start Development Server (2 minutes)

- [ ] In project terminal
- [ ] Ran: `npm run dev`
- [ ] Server started successfully
- [ ] Output shows: `▲ Next.js 15.x.x`
- [ ] Output shows: `- Local: http://localhost:3000`
- [ ] No errors in terminal

**Your terminal should show:**
```
> skillauro@1.0.0 dev
> next dev

▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Environments: .env.local
```

---

## ✅ Step 6: Access the Application (2 minutes)

- [ ] Opened web browser
- [ ] Navigated to: `http://localhost:3000`
- [ ] Home page loaded successfully
- [ ] Can see hero image and Skillauro branding
- [ ] Navigation menu visible
- [ ] "Login" button visible in top right

**Test the following:**
- [ ] Can click "Login" button
- [ ] Login page loads: `http://localhost:3000/login`
- [ ] Can see login form with email/user ID field
- [ ] Can see password field
- [ ] Can see role selector (Admin/Faculty/Student)

---

## ✅ Step 7: Create First Admin Account (5 minutes)

### Option A: Via MySQL (Fastest)

- [ ] Opened MySQL command line
- [ ] Connected to skillauro database
- [ ] Ran this SQL:
```sql
INSERT INTO users (email, user_id, password, name, role, phone, status) 
VALUES ('admin@skillauro.in', 'ADM0001', 'Admin@123456', 'Admin User', 'admin', '9000000001', 'active');
```
- [ ] No errors from the INSERT command
- [ ] Verified with: `SELECT * FROM users;`

### Option B: Via Admin Dashboard

- [ ] Navigated to: `http://localhost:3000/admin/dashboard`
- [ ] Login form appeared
- [ ] (Would need existing admin account first)

---

## ✅ Step 8: Test Login (3 minutes)

- [ ] Admin account created
- [ ] Navigated to: `http://localhost:3000/login`
- [ ] Entered: `admin@skillauro.in` (in email/user ID field)
- [ ] Entered: `Admin@123456` (in password field)
- [ ] Selected: `Admin` (from role dropdown)
- [ ] Clicked: "Login" button
- [ ] Redirected to admin dashboard
- [ ] Admin dashboard loads: `http://localhost:3000/admin/dashboard`

**Admin Dashboard should show:**
- [ ] Welcome message
- [ ] Navigation menu on left
- [ ] Dashboard cards with statistics
- [ ] "Add Faculty" button
- [ ] "Add Student" button

---

## ✅ Step 9: Test Faculty Registration (5 minutes)

- [ ] On Admin Dashboard
- [ ] Clicked: "Add Faculty" button
- [ ] Faculty registration form appeared
- [ ] Form has fields for:
  - [ ] Faculty name
  - [ ] Email address
  - [ ] Department
  - [ ] Specialization
  - [ ] Phone number
- [ ] Filled in test faculty details
- [ ] Clicked: "Register" button
- [ ] Success message appeared
- [ ] Faculty added to list (if list displays)

---

## ✅ Step 10: Test Student Registration (5 minutes)

- [ ] On Admin Dashboard
- [ ] Clicked: "Add Student" button
- [ ] Student registration form appeared
- [ ] Form has fields for:
  - [ ] Student name
  - [ ] Email address
  - [ ] Enrollment number
  - [ ] Batch year
  - [ ] Phone number
- [ ] Filled in test student details
- [ ] Clicked: "Register" button
- [ ] Success message appeared

---

## ✅ Step 11: Test Faculty Login (5 minutes)

- [ ] Created a faculty account
- [ ] Noted their user ID (FAC00001, etc.)
- [ ] Logged out from admin account
- [ ] Went to: `http://localhost:3000/login`
- [ ] Entered faculty email or user ID
- [ ] Entered faculty password
- [ ] Selected: "Faculty" from role dropdown
- [ ] Clicked: "Login"
- [ ] Redirected to faculty dashboard: `http://localhost:3000/faculty/dashboard`
- [ ] Faculty dashboard displays correctly

---

## ✅ Step 12: Test Student Login (5 minutes)

- [ ] Created a student account
- [ ] Noted their user ID (STU000001, etc.)
- [ ] Logged out from faculty account
- [ ] Went to: `http://localhost:3000/login`
- [ ] Entered student email or user ID
- [ ] Entered student password
- [ ] Selected: "Student" from role dropdown
- [ ] Clicked: "Login"
- [ ] Redirected to student dashboard: `http://localhost:3000/student/dashboard`
- [ ] Student dashboard displays correctly

---

## ✅ Step 13: Test Contact Form (3 minutes)

- [ ] Logged out
- [ ] Went to: `http://localhost:3000/contact`
- [ ] Contact form loaded
- [ ] Form has fields:
  - [ ] Name
  - [ ] Email
  - [ ] Phone
  - [ ] Subject
  - [ ] Message
- [ ] Filled in test message
- [ ] Clicked: "Send Message"
- [ ] Success message appeared
- [ ] Message stored in database (verify with MySQL)

---

## ✅ Step 14: Verify Database (5 minutes)

- [ ] Opened MySQL command line
- [ ] Connected to skillauro: `mysql -u root -p skillauro`
- [ ] Listed tables: `SHOW TABLES;`
- [ ] Should see 15+ tables:
  - [ ] `users`
  - [ ] `faculties`
  - [ ] `students`
  - [ ] `courses`
  - [ ] `fees`
  - [ ] `contact_messages`
  - [ ] And others

**View data in key tables:**
```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM faculties;
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM contact_messages;
```

---

## ✅ Optional: Test Razorpay Integration

- [ ] Student account created
- [ ] Logged in as student
- [ ] Navigated to: `http://localhost:3000/student/fees`
- [ ] Fees page loaded
- [ ] Shows list of courses with fees
- [ ] Shows "Pay Now" buttons
- [ ] Clicked "Pay Now"
- [ ] Payment modal opened
- [ ] Shows Razorpay button
- [ ] (Can use test cards in test mode)

---

## ✅ Final Verification

Run this command to verify project health:

```bash
npm run build
```

Should complete without errors:
- [ ] Build successful
- [ ] Output shows "✓ Compiled successfully"
- [ ] No critical errors in output
- [ ] `.next` folder created

---

## ✅ Production Deployment Prep

Before deploying to production:

- [ ] [ ] Update `NEXTAUTH_SECRET` - Generate new random string
- [ ] [ ] Update `RAZORPAY_KEY_ID` - Use live keys, not test
- [ ] [ ] Update `RAZORPAY_KEY_SECRET` - Use live keys
- [ ] [ ] Change `NODE_ENV` to `production`
- [ ] [ ] Change `NEXTAUTH_URL` to your domain name
- [ ] [ ] Update database to production MySQL server
- [ ] [ ] Set email service to live configuration
- [ ] [ ] Review all `.env.local` settings
- [ ] [ ] Back up database before deploying

---

## ✅ Common Issues & Solutions

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Database Connection Failed
- [ ] Check DB_HOST, DB_USER, DB_PASSWORD in `.env.local`
- [ ] Verify MySQL is running
- [ ] Verify database exists: `SHOW DATABASES;`

### Missing Environment Variables
- [ ] Verify `.env.local` file exists in project root
- [ ] Stop dev server and restart: `npm run dev`

### Dependencies Not Installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tables Not Found
- [ ] Run migrations again in correct order
- [ ] Verify database and tables: `SHOW TABLES;`

---

## 🎉 Congratulations!

If all checkboxes are checked, your Skillauro platform is **fully operational**!

You can now:
- ✅ Register faculties and students
- ✅ Manage courses and classes
- ✅ Track fees and payments
- ✅ Process student payments via Razorpay
- ✅ Send emails to users
- ✅ Manage all administrative tasks

---

## 📚 Next Steps

1. **Explore Admin Dashboard** - Create courses, manage users
2. **Test Faculty Portal** - Create classes and assessments
3. **Test Student Portal** - Enroll in courses, pay fees
4. **Configure Email** - Set up Gmail for notifications
5. **Configure Razorpay** - Use live keys for real payments
6. **Deploy to Production** - When ready to go live

---

## 📖 Documentation Files

- `START_HERE_FIRST.md` - Overview (read first)
- `DOWNLOAD_AND_SETUP.md` - Detailed setup steps
- `INSTALL_AND_RUN.md` - Technical installation
- `QUICK_START.md` - Quick reference
- `README.md` - Project overview
- `.env.example` - Environment variables reference

---

## ✅ All Set!

Your Skillauro Educational Platform is ready to use! 🚀

For help or issues, refer to the documentation files or check the terminal for error messages.

**Enjoy!**
