# Running Skillauro in VS Code - Complete Guide

## Prerequisites

Before starting, ensure you have:
1. VS Code installed
2. Node.js v16+ installed
3. MySQL Server running
4. Project downloaded/cloned

## Step 1: Open Project in VS Code

1. Open VS Code
2. Click "File" → "Open Folder"
3. Select the skillauro project folder
4. Click "Select Folder"

Wait for VS Code to recognize the project. You should see the file structure on the left.

## Step 2: Setup Database

### Step 2.1: Open Terminal in VS Code

Press `Ctrl + `` (backtick) or go to Terminal → New Terminal

### Step 2.2: Create `.env.local` File

In the VS Code terminal, type:

```bash
# Windows users
type > .env.local

# Mac/Linux users
touch .env.local
```

This creates a blank `.env.local` file.

### Step 2.3: Configure Environment Variables

1. Right-click on `.env.local` in file explorer (left panel)
2. Click "Open"
3. Copy and paste this content:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=skillauro_db

JWT_SECRET=your-secret-jwt-key-123456

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password!

### Step 2.4: Create MySQL Database

Keep the VS Code terminal open and type:

```bash
# Open MySQL
mysql -u root -p
```

Enter your MySQL password when prompted.

Then in MySQL, type:

```sql
CREATE DATABASE skillauro_db;
EXIT
```

### Step 2.5: Run Migration Scripts

In VS Code terminal, type:

```bash
# Create tables
mysql -u root -p skillauro_db < scripts/01_create_tables.sql

# Insert sample data
mysql -u root -p skillauro_db < scripts/02_insert_sample_data.sql
```

You'll be prompted for your MySQL password twice. Enter it each time.

## Step 3: Install Dependencies

In VS Code terminal, type:

```bash
npm install
```

This will install all required packages. It may take 2-3 minutes.

Wait for it to complete (you should see no errors).

## Step 4: Start Development Server

In VS Code terminal, type:

```bash
npm run dev
```

You should see:
```
> Local:        http://localhost:3000
```

## Step 5: Open Application in Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Visit: http://localhost:3000
3. You should see the Skillauro landing page

## Step 6: Login and Test

### For Admin Dashboard:
1. Click "Login"
2. Select "Admin" from Role dropdown
3. Email: `skillauro@gmail.com`
4. Password: `Skillauro@2026`
5. Click "Login"

### For Faculty Dashboard:
1. Click "Login"
2. Select "Faculty" from Role dropdown  
3. Email: `faculty1@skillauro.com`
4. Password: `Faculty@123`
5. Click "Login"

### For Student Dashboard:
1. Click "Login"
2. Select "Student" from Role dropdown
3. Email: `student1@skillauro.com`
4. Password: `Student@123`
5. Click "Login"

## Checking Database from VS Code

### Option 1: Using VS Code Extensions

Install "MySQL" extension:
1. Click Extensions icon (left sidebar)
2. Search for "MySQL"
3. Install the one by weijan

Then connect to your database and browse tables.

### Option 2: Using Terminal

```bash
mysql -u root -p skillauro_db -e "SELECT * FROM users;"
```

## Common Issues and Fixes

### Issue: "Cannot find module 'mysql2'"

**Fix:** Run `npm install` again

```bash
npm install
```

### Issue: "Port 3000 already in use"

**Fix:** Kill the process on that port

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -i :3000
kill -9 <PID>
```

Then try `npm run dev` again.

### Issue: "Access denied for user 'root'"

**Fix:** Check your `.env.local` password matches MySQL root password

1. Open `.env.local`
2. Check `DB_PASSWORD=` line
3. Make sure password is correct
4. Save file
5. Restart development server (Ctrl+C, then `npm run dev`)

### Issue: "Unknown database 'skillauro_db'"

**Fix:** Run database creation commands again

```bash
mysql -u root -p
CREATE DATABASE skillauro_db;
EXIT

mysql -u root -p skillauro_db < scripts/01_create_tables.sql
mysql -u root -p skillauro_db < scripts/02_insert_sample_data.sql
```

### Issue: "Cannot GET /admin/dashboard"

**Fix:** Make sure you're logged in as admin, not just any user. Check:
1. You selected "Admin" role when logging in
2. Used correct admin credentials
3. Check browser console (F12) for errors

## VS Code Useful Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + `` | Toggle Terminal |
| `Ctrl + /` | Comment/Uncomment |
| `Ctrl + Shift + P` | Command Palette |
| `Ctrl + S` | Save File |
| `Ctrl + Shift + L` | Select All Occurrences |
| `Alt + Up/Down` | Move Line Up/Down |

## File Structure

```
skillauro/
├── app/
│   ├── api/              ← API Routes (Backend)
│   ├── admin/            ← Admin Dashboard Pages
│   ├── faculty/          ← Faculty Dashboard Pages
│   ├── student/          ← Student Dashboard Pages
│   ├── login/            ← Login Page
│   ├── contact/          ← Contact Page
│   └── layout.tsx        ← Root Layout
├── components/           ← React Components
├── lib/                  ← Utilities & Helpers
├── scripts/              ← Database Scripts
├── public/               ← Static Files (Logo, Images)
├── .env.local           ← Environment Variables
├── package.json         ← Dependencies
└── DATABASE_SETUP.md    ← Database Guide
```

## Development Workflow

1. **Make changes** to any file in `app/` or `components/`
2. **Save the file** (Ctrl+S)
3. **Check browser** - it auto-refreshes
4. If error appears, **check VS Code terminal** for error messages
5. **Fix the error** and save again

## Stopping the Server

In VS Code terminal, press `Ctrl + C` to stop the development server.

## Restarting After Changes

If the app doesn't update:
1. Stop server: `Ctrl + C`
2. Start again: `npm run dev`
3. Refresh browser: `Ctrl + R` or `F5`

## Database Modifications

If you need to change database:

1. Stop server (Ctrl+C)
2. Modify `.sql` files in `scripts/` folder
3. Drop database: `mysql -u root -p` then `DROP DATABASE skillauro_db;`
4. Run scripts again to recreate
5. Start server: `npm run dev`

## Next Steps

Once everything is running:

1. Explore all three dashboards
2. Test creating/editing users (Admin panel)
3. Review all pages for functionality
4. Check browser console (F12) for any warnings
5. Read other documentation files

For more details, see:
- `README.md` - Project overview
- `DATABASE_SETUP.md` - Database configuration details
- `FEATURES.md` - Complete feature list
- `TROUBLESHOOTING.md` - Problem solutions

**Happy Learning with Skillauro!** 🎓
