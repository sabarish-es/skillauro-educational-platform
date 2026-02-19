# Default Admin Credentials

## Initial Admin Account

After running the database setup scripts, use these credentials to login:

### Admin Login Details
- **Email:** admin@skillauro.in
- **User ID:** ADM0001
- **Password:** Admin@2024
- **Role:** Admin

---

## How to Access Admin Dashboard

1. Start the application:
```bash
npm run dev
```

2. Open your browser and go to:
```
http://localhost:3000/login
```

3. Fill in the login form:
   - **Email or User ID:** admin@skillauro.in (or ADM0001)
   - **Password:** Admin@2024
   - **Role:** Select "Admin" from the dropdown

4. Click **Login**

5. You will be redirected to:
```
http://localhost:3000/admin/dashboard
```

---

## First Things To Do After Login

### 1. Change Your Password (IMPORTANT!)
- Go to Settings/Profile (if available)
- Change your password from `Admin@2024` to a strong password
- Save the new password securely

### 2. Create Faculty Accounts
- Navigate to Admin Dashboard → Manage Faculties
- Click "Add Faculty"
- Fill in faculty details
- System auto-generates User ID and Password
- Credentials are sent via email

### 3. Create Student Accounts
- Navigate to Admin Dashboard → Manage Students
- Click "Add Student"
- Fill in student details
- System auto-generates User ID and Password
- Credentials are sent via email

### 4. Configure Email Settings
- Set up your Gmail credentials in `.env.local`
- This enables credential emails to be sent automatically

### 5. Setup Payment Gateway (Optional)
- Add Razorpay keys to `.env.local`
- This enables student fee payments

---

## Database Setup Commands

If you haven't created the admin yet, run these commands:

```bash
# 1. Create the database
mysql -u root -p
> CREATE DATABASE skillauro;
> EXIT;

# 2. Create tables
mysql -h localhost -u root -p skillauro < scripts/01_create_tables.sql

# 3. Insert sample data structure
mysql -h localhost -u root -p skillauro < scripts/02_insert_sample_data.sql

# 4. Add missing tables/fields
mysql -h localhost -u root -p skillauro < scripts/add-missing-tables.sql

# 5. Create default admin user
mysql -h localhost -u root -p skillauro < scripts/03_create_default_admin.sql
```

---

## Verify Admin User Was Created

Run this command to verify the admin account exists:

```bash
mysql -h localhost -u root -p skillauro -e "SELECT id, email, user_id, name, role, status FROM users WHERE role = 'admin';"
```

You should see:
```
+----+----------------------+---------+---------------+-------+--------+
| id | email                | user_id | name          | role  | status |
+----+----------------------+---------+---------------+-------+--------+
|  1 | admin@skillauro.in   | ADM0001 | Administrator | admin | active |
+----+----------------------+---------+---------------+-------+--------+
```

---

## Troubleshooting

### "Login failed" message
- Check the email/user_id and password are correct
- Make sure you selected "Admin" role from the dropdown
- Verify the user exists in database: `mysql -h localhost -u root -p skillauro -e "SELECT * FROM users WHERE email = 'admin@skillauro.in';"`

### "Database connection error"
- Check `.env.local` has correct DB credentials
- Verify MySQL is running: `mysql -h localhost -u root -p`
- Check database exists: `mysql -h localhost -u root -p -e "SHOW DATABASES;"`

### Forgot Admin Password
- You have two options:
  1. Update database directly: `mysql -h localhost -u root -p skillauro -e "UPDATE users SET password = 'NewPassword123' WHERE email = 'admin@skillauro.in';"`
  2. Drop admin and recreate: `mysql -h localhost -u root -p skillauro < scripts/03_create_default_admin.sql`

---

## Security Notes

1. **Change Default Password** - The default password should be changed immediately after first login
2. **Use Strong Passwords** - Ensure all admin passwords are strong (min 12 chars, mixed case, numbers, symbols)
3. **Protect .env.local** - Never commit .env.local to version control
4. **Database Access** - Limit database access to local machine during development
5. **HTTPS** - Use HTTPS in production, not HTTP

---

## Multiple Admins

To create additional admin accounts manually:

```bash
mysql -h localhost -u root -p skillauro
```

Then run:
```sql
INSERT INTO users (email, user_id, password, name, role, phone, status) 
VALUES (
  'newadmin@skillauro.in',
  'ADM0002',
  'NewPassword123',
  'Second Admin',
  'admin',
  '9876543210',
  'active'
);
```

Or use the Admin Panel:
1. Login as existing admin
2. Create users through the dashboard (coming soon)

---

## Questions?

Refer to these files for more help:
- **INSTALL_AND_RUN.md** - Technical setup details
- **DOWNLOAD_AND_SETUP.md** - Complete setup instructions
- **SETUP_CHECKLIST.md** - Step-by-step checklist
