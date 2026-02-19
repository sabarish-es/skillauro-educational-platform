# 🚀 Skillauro Setup - Step by Step Guide

Complete instructions to run Skillauro on your Windows machine using VS Code.

## ✅ Prerequisites Check

Before starting, ensure you have:
- [ ] Windows 10/11 operating system
- [ ] VS Code installed (https://code.visualstudio.com)
- [ ] Node.js installed (https://nodejs.org) - LTS version recommended
- [ ] Internet connection

### Verify Node.js Installation
1. Open Command Prompt (Win + R, type `cmd`)
2. Type: `node --version`
3. You should see a version number (e.g., v18.0.0)

If not installed:
1. Download Node.js LTS from https://nodejs.org
2. Run the installer
3. Follow the installation wizard (all default settings are fine)
4. Restart your computer

## 📥 Step 1: Download and Extract Project

1. **Download the project ZIP file**
   - You should have a file like `skillauro-project.zip`

2. **Extract the ZIP file**
   - Right-click on the ZIP file
   - Select "Extract All..."
   - Choose a location (e.g., `C:\Users\YourName\Desktop\skillauro`)
   - Click "Extract"

3. **Remember the extracted folder path** (you'll need it in Step 2)

## 📂 Step 2: Open Project in VS Code

1. **Open VS Code**
   - Click the Windows Start button
   - Type "Visual Studio Code"
   - Press Enter

2. **Open the project folder**
   - In VS Code, click `File` → `Open Folder`
   - Navigate to your extracted skillauro folder
   - Click `Select Folder`

3. **Trust the workspace** (if prompted)
   - VS Code may ask if you trust the project
   - Click "Yes, I trust the authors"

## 🔧 Step 3: Install Dependencies

1. **Open Terminal in VS Code**
   - Press `Ctrl + ~` (Control key + Tilde)
   - Or go to `View` → `Terminal`

2. **Type the installation command**
   ```
   npm install
   ```

3. **Wait for installation to complete**
   - This may take 2-5 minutes
   - You'll see a lot of text scrolling - this is normal
   - Wait until you see a completion message

4. **Verify installation**
   - You should see a new folder `node_modules` in your project

## 🎯 Step 4: Start the Development Server

1. **In the same Terminal, type:**
   ```
   npm run dev
   ```

2. **Wait for the server to start**
   - You should see messages like:
   ```
   > skillauro@1.0.0 dev
   > next dev
   
   ▲ Next.js 15.x.x
   - Local:        http://localhost:3000
   ```

3. **The application is now running!**
   - Copy the URL: `http://localhost:3000`

## 🌐 Step 5: Open in Browser

1. **Open your web browser**
   - Chrome, Firefox, Safari, or Edge

2. **Go to the application**
   - Paste in the address bar: `http://localhost:3000`
   - Press Enter

3. **You should see the Skillauro landing page!**

## 🔑 Step 6: Login to Your Dashboard

### Option A: Login as Admin
Click **Login** button on the landing page and enter:
```
Role: Admin
Email: skillauro@gmail.com
Password: Skillauro@2026
```

### Option B: Login as Faculty
```
Role: Faculty
Email: faculty1@skillauro.com
Password: Faculty@123
```

### Option C: Login as Student
```
Role: Student
Email: student1@skillauro.com
Password: Student@123
```

## 📋 Troubleshooting

### Problem: "npm: command not found"
**Solution:**
- Node.js not installed properly
- Restart your computer
- Reinstall Node.js from https://nodejs.org

### Problem: "Port 3000 is already in use"
**Solution:**
- Close other applications using port 3000
- Or run on a different port:
  ```
  npm run dev -- -p 3001
  ```
- Then access at `http://localhost:3001`

### Problem: "Cannot find module" errors
**Solution:**
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again

### Problem: Blank page loads
**Solution:**
- Check browser console (F12 → Console tab)
- Hard refresh the page (Ctrl + Shift + R)
- Try in an incognito/private window

### Problem: Invalid credentials on login
**Solution:**
- Copy-paste credentials exactly as shown above
- Make sure Role is selected correctly
- Check for extra spaces in email/password

## 🛠️ Common VS Code Commands

| Task | Command |
|------|---------|
| Open Terminal | Ctrl + ~ |
| Save File | Ctrl + S |
| Find in Files | Ctrl + Shift + F |
| Format Code | Shift + Alt + F |
| Comment Code | Ctrl + / |

## 📖 Project Structure Overview

After opening in VS Code, you'll see:

```
skillauro/
├── app/               ← All pages and routes
├── components/        ← React components
├── lib/               ← Utilities and helpers
├── public/            ← Images and assets
├── package.json       ← Project dependencies
├── tailwind.config.ts ← Styling configuration
└── tsconfig.json      ← TypeScript configuration
```

## 🎓 Exploring the Platform

### Landing Page (http://localhost:3000)
- View features
- See course listings
- Click "Login" to access dashboards

### Admin Dashboard (http://localhost:3000/admin/dashboard)
- Manage faculties and students
- Create courses
- Track fees
- Send notifications

### Faculty Dashboard (http://localhost:3000/faculty/dashboard)
- View assigned courses
- Schedule online classes
- Mark attendance
- Create assessments

### Student Dashboard (http://localhost:3000/student/dashboard)
- View enrolled courses
- Join live classes
- Check attendance
- Pay fees
- Complete assessments

## 💾 Making Changes

### Edit a Page
1. In VS Code, find the file (e.g., `app/student/dashboard/page.tsx`)
2. Make your changes
3. Save (Ctrl + S)
4. The browser auto-refreshes!

### Add a New Page
1. Create a new folder in `app/` directory
2. Add `page.tsx` inside
3. Write your React component
4. It's automatically accessible via its path

## 🌐 Access from Other Devices

Want to access from your phone or another computer?

1. **Find your computer's IP address:**
   - Open Command Prompt
   - Type: `ipconfig`
   - Look for "IPv4 Address" (usually starts with 192.168...)

2. **On another device, visit:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 📚 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/ui**: https://ui.shadcn.com

## ✨ Next Steps

After setup:

1. **Explore each dashboard** - Admin, Faculty, Student
2. **Test all features** - Try different actions
3. **Customize branding** - Change colors, logo
4. **Connect database** - For production use
5. **Deploy to Vercel** - Go live for free

## 🆘 Still Need Help?

Contact Skillauro:
- **Email**: management@skillauro.in
- **Phone**: 8220946279, 6379652485, 6369721553

---

**Skillauro - Learn • Innovate • Succeed**

Happy learning! 🚀
