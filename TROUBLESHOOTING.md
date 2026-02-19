# Skillauro Platform - Troubleshooting Guide

Common issues and solutions when running Skillauro locally or deploying to production.

---

## Installation Issues

### Issue: `npm install` fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Use legacy peer deps flag
npm install --legacy-peer-deps
```

### Issue: Node version error

**Error**: `The engine "node" is incompatible`

**Solution**:
```bash
# Check your Node version
node --version

# You need Node 18 or higher
# Download from nodejs.org and install
```

---

## Development Server Issues

### Issue: Port 3000 already in use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Run on different port
npm run dev -- -p 3001

# Or kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti :3000 | xargs kill -9
```

### Issue: Module not found errors

**Error**: `Module not found: Can't resolve '@/...'`

**Solution**:
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### Issue: Development server won't start

**Error**: `Error compiling...` or blank terminal

**Solution**:
1. Check browser console (F12) for errors
2. Look at terminal output for specific errors
3. Try restarting: `Ctrl + C` then `npm run dev`
4. Clear Next.js cache: `rm -r .next && npm run dev`

---

## Login Issues

### Issue: Can't login - always says invalid credentials

**Possible Causes**:
1. Wrong email or password (case-sensitive)
2. Wrong role selected
3. Typo in credentials

**Solution**:
1. Click "Quick Fill" button - auto-fills correct credentials
2. Check exact spelling of email
3. Make sure to select correct role
4. Check browser console (F12) for specific error

### Issue: Credentials are correct but still can't login

**Solution**:
1. Clear browser cache and cookies
   - Press Ctrl + Shift + Delete
   - Clear all data
2. Try in incognito/private window
3. Check browser console (F12) for error messages
4. Restart dev server: `Ctrl + C` then `npm run dev`

### Issue: Login button doesn't work

**Solution**:
1. Check that form fields are filled
2. Verify JavaScript is enabled in browser
3. Check browser console for errors
4. Try different browser (Chrome, Firefox, etc.)

---

## Navigation & Routing Issues

### Issue: Page shows 404 error

**Error**: `404 - This page could not be found`

**Solution**:
1. Check URL is correct
   - Admin: `/admin/dashboard`
   - Faculty: `/faculty/dashboard`
   - Student: `/student/dashboard`
2. Make sure you're logged in (login redirects to correct page)
3. Clear browser cache: Ctrl + Shift + Delete
4. Restart dev server: Ctrl + C then `npm run dev`

### Issue: Sidebar doesn't show or navigation is broken

**Solution**:
1. Hard refresh page: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
2. Check that JavaScript is enabled
3. Check browser console for errors
4. Restart dev server

### Issue: Redirects to login page instead of dashboard

**Cause**: Not logged in or session expired

**Solution**:
1. Make sure you're logged in
2. Login with correct role
3. Check that auth cookie is set (F12 > Application > Cookies)
4. Try clearing cookies and login again

---

## Display Issues

### Issue: Styling/CSS not loading

**Symptoms**: Page looks plain without colors or formatting

**Solution**:
```bash
# Rebuild the project
npm run build

# Or restart dev server
npm run dev
```

### Issue: Images not displaying

**Symptoms**: Logo or images show as broken

**Solution**:
1. Check image file exists: `public/skillauro-logo.png`
2. Check image path in code
3. Verify file permissions
4. Try: `npm run dev` in fresh terminal

### Issue: Page layout is broken or misaligned

**Solution**:
1. Hard refresh: Ctrl + Shift + R
2. Clear browser cache
3. Check browser window width (responsive may activate)
4. Try different screen size
5. Check browser zoom level (should be 100%)

### Issue: Dark mode or theme issues

**Solution**:
1. Check if your OS has dark mode enabled
2. Toggle browser dark mode setting
3. Clear browser cache
4. Check CSS loading in DevTools

---

## Database/API Issues

### Issue: Data not saving (resets on refresh)

**Expected behavior**: This is normal! Demo uses mock data.

**Solution**:
- This is expected - no real database is set up
- To persist data, set up Supabase or Neon
- See DEPLOYMENT_GUIDE.md for database setup

### Issue: API route 404 error

**Error**: `404 Not Found` when calling API

**Solution**:
1. Check route path is correct: `/api/auth/login`
2. Verify file exists: `app/api/auth/login/route.ts`
3. Check request method (POST vs GET)
4. Check request headers
5. Look at network tab (F12) for details

---

## Performance Issues

### Issue: Page loads slowly

**Possible Causes**:
- Computer running other programs
- Network connection slow
- Browser has too many extensions
- Dev server needs restart

**Solution**:
1. Close unnecessary programs
2. Check internet connection
3. Disable browser extensions temporarily
4. Restart dev server: `Ctrl + C` then `npm run dev`
5. Try different browser

### Issue: Development server crashes

**Solution**:
1. Check error message in terminal
2. Look for common errors like "module not found"
3. Try rebuilding: `rm -r .next && npm run dev`
4. Check disk space available
5. Restart your computer if nothing helps

---

## Deployment Issues

### Issue: Deployment to Vercel fails

**Solution**:
1. Check build logs on Vercel dashboard
2. Make sure code is pushed to GitHub
3. Verify environment variables are set
4. Try redeploying from Vercel dashboard
5. Check if any files are missing

### Issue: App works locally but not on Vercel

**Likely causes**:
- Missing environment variables
- Hardcoded paths or URLs
- Database not connected
- API routes not working

**Solution**:
1. Check Vercel deployment logs
2. Add any missing environment variables
3. Use relative paths, not absolute
4. Test locally exactly as it will be deployed

### Issue: Can't connect to database after deployment

**Solution**:
1. Check database credentials are correct
2. Verify IP whitelist settings in database
3. Check environment variables are set
4. Test database connection locally first
5. Review database documentation

---

## Browser-Specific Issues

### Chrome Issues

**Issue**: Page cached, changes not showing

**Solution**:
1. Hard refresh: Ctrl + Shift + R
2. Clear cache: Ctrl + Shift + Delete
3. Disable cache in DevTools (F12)

### Firefox Issues

**Issue**: Styling looks different

**Solution**:
1. Clear cache: Ctrl + Shift + Delete
2. Disable extensions temporarily
3. Try in private window

### Safari Issues

**Issue**: Page doesn't work properly

**Solution**:
1. Update Safari to latest version
2. Clear cache: Menu > History > Clear History
3. Disable extensions
4. Try another browser

---

## Windows-Specific Issues

### Issue: Terminal commands don't work

**Cause**: Windows Command Prompt vs PowerShell differences

**Solution**:
1. Use PowerShell instead of cmd
2. Or use VS Code terminal (built-in)
3. Use Git Bash for more Linux-like commands

### Issue: npm command not recognized

**Solution**:
1. Make sure Node.js is installed
2. Restart VS Code or terminal
3. Add Node to PATH if needed
4. Reinstall Node.js

---

## Mac-Specific Issues

### Issue: Port already in use

**Solution**:
```bash
lsof -i :3000
kill -9 <PID>
```

### Issue: Permission denied when installing

**Solution**:
```bash
# Use sudo carefully
sudo npm install

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## Linux-Specific Issues

### Issue: npm install fails

**Solution**:
```bash
sudo apt update
sudo apt install nodejs npm

# Then try again
npm install
```

---

## Getting Help

### Step-by-Step Debugging

1. **Identify the issue** - What exactly is wrong?
2. **Check documentation** - See FEATURES.md, SETUP_GUIDE.md
3. **Check console** - Press F12, look for errors
4. **Search error** - Copy exact error message, search online
5. **Try solutions** - Apply troubleshooting steps above
6. **Contact support** - If still stuck

### Browser Developer Tools (F12)

Use F12 to debug:
- **Console tab**: Shows errors and logs
- **Network tab**: Shows API calls
- **Application tab**: Shows cookies and storage
- **Elements tab**: Shows HTML structure

### Questions to Answer

Before seeking help:
1. What exactly is happening?
2. What should happen instead?
3. What error message (if any)?
4. When did this start?
5. What did you change recently?

### Support Contact

- Email: management@skillauro.in
- Phone: 8220946279, 6379652485, 6369721553
- Include: Error message, steps to reproduce, screenshots

---

## Quick Reference

### Most Common Issues & Fixes

| Issue | Quick Fix |
|-------|-----------|
| Can't login | Click "Quick Fill" button |
| Page shows 404 | Check URL, make sure logged in |
| Styling broken | Hard refresh (Ctrl+Shift+R) |
| Dev server won't start | Kill port 3000, then `npm run dev` |
| Module not found | `npm install`, restart dev server |
| Data not saving | Normal - no database set up yet |
| Slow performance | Close other programs, restart server |

---

## Checklist Before Asking for Help

- [ ] I've cleared browser cache
- [ ] I've restarted the dev server
- [ ] I've checked the browser console (F12)
- [ ] I've tried the solutions in this guide
- [ ] I've checked the documentation
- [ ] I'm using Node 18+
- [ ] I'm using the exact credentials from guide
- [ ] I can see the error message

---

## Tips for Smooth Operation

1. **Keep terminal clean**
   - Use separate terminal for dev server
   - Don't ctrl+c while debugging

2. **Browser management**
   - Use private/incognito for testing login
   - Clear cache if styling looks wrong
   - Use F12 DevTools for debugging

3. **File management**
   - Don't delete important files
   - Backup code before making changes
   - Use git for version control

4. **Regular maintenance**
   - Keep Node.js updated
   - Update npm packages periodically
   - Clean up old branches in git

---

**Still stuck? Contact: management@skillauro.in**

📞 8220946279 | 6379652485 | 6369721553

---

Last Updated: February 2026  
Skillauro Platform v1.0.0
