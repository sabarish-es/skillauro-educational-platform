# Skillauro Platform - Deployment Guide

This guide will help you deploy your Skillauro platform to production using Vercel (recommended) or other hosting services.

---

## Option 1: Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides the easiest deployment experience.

### Prerequisites
- GitHub account
- Vercel account (free)
- Your project code in a GitHub repository

### Step 1: Push Code to GitHub

1. **Create a GitHub repository**
   - Go to github.com
   - Click "New repository"
   - Name it "skillauro-platform"
   - Click "Create repository"

2. **Initialize git and push code**
   ```bash
   # Navigate to your project folder
   cd your-skillauro-folder

   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit: Skillauro platform"
   
   # Add remote and push
   git remote add origin https://github.com/YOUR_USERNAME/skillauro-platform.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to vercel.com**
2. **Sign in or create account**
3. **Click "New Project"**
4. **Select your GitHub repository**
   - You may need to connect GitHub first
5. **Configure project settings**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
   - Environment Variables: (skip for now, use defaults)
6. **Click "Deploy"**

Your app will be deployed in 1-2 minutes!

### What You'll Get
- Live URL: `https://skillauro-platform.vercel.app`
- Automatic deployments on every GitHub push
- Free SSL certificate
- Global CDN

---

## Option 2: Deploy to Netlify

### Prerequisites
- GitHub account
- Netlify account (free)
- Your project code in a GitHub repository

### Steps

1. **Push code to GitHub** (same as above)

2. **Go to netlify.com**

3. **Click "Add new site"**

4. **Select "Import an existing project"**

5. **Choose GitHub**

6. **Select your repository**

7. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

8. **Click "Deploy site"**

---

## Option 3: Deploy to AWS (Self-Hosted)

### Prerequisites
- AWS account
- EC2 instance (Ubuntu recommended)
- Domain name

### Steps

1. **Launch EC2 instance**
   - Instance type: t2.micro (free tier)
   - OS: Ubuntu 22.04 LTS

2. **Connect via SSH**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone your GitHub repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skillauro-platform.git
   cd skillauro-platform
   ```

5. **Install dependencies and build**
   ```bash
   npm install
   npm run build
   ```

6. **Install PM2 (process manager)**
   ```bash
   sudo npm install -g pm2
   ```

7. **Start the application**
   ```bash
   pm2 start npm --name "skillauro" -- start
   pm2 startup
   pm2 save
   ```

8. **Set up Nginx reverse proxy**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

9. **Start Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

10. **Set up SSL with Let's Encrypt**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

---

## Deployment Checklist

Before deploying to production, ensure:

- [ ] All pages load without 404 errors
- [ ] Login works with all three roles
- [ ] Admin can manage faculties and students
- [ ] Faculty can view courses and classes
- [ ] Students can view assigned courses
- [ ] Responsive design works on mobile
- [ ] No console errors (F12 to check)
- [ ] Environment variables are set (if any)

---

## Post-Deployment Tasks

### 1. Change Default Admin Credentials
Edit `/lib/auth.ts` to use database instead of hardcoded credentials:

```typescript
// Instead of hardcoded users, query from database
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
```

### 2. Set Up Database (Optional)

For persistent data, integrate with:
- **Supabase** (PostgreSQL)
- **Firebase** (NoSQL)
- **MongoDB Atlas** (NoSQL)
- **PlanetScale** (MySQL)

### 3. Add Payment Processing

To enable Razorpay payments:

1. Get Razorpay API keys from razorpay.com
2. Add to environment variables:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```
3. Create payment API routes

### 4. Set Up Email Service

For sending notifications:

1. Use SendGrid, Mailgun, or Gmail
2. Add environment variables
3. Update notification routes

---

## Monitoring & Maintenance

### Monitor Application
- Check Vercel/Netlify dashboard for errors
- View logs in deployment console
- Set up error tracking with Sentry

### Update Dependencies
```bash
npm update
npm audit fix
```

### Backup Your Data
- Regular database backups
- Version control on GitHub
- Test restore procedures

---

## Troubleshooting Deployment

### Issue: Build fails
**Solution:**
```bash
# Clear build cache
npm run build
# Check for errors in console
```

### Issue: Pages show 404
**Solution:**
- Check that all routes are created
- Verify `.next` folder exists
- Rebuild application

### Issue: Slow performance
**Solution:**
- Enable caching
- Optimize images
- Use CDN
- Check database queries

### Issue: Can't login after deployment
**Solution:**
- Check environment variables
- Verify auth endpoints accessible
- Check CORS settings
- Look at browser console for errors

---

## Cost Estimates

| Provider | Cost | Storage | Bandwidth |
|----------|------|---------|-----------|
| Vercel | Free-$20/mo | 100GB | 50GB/mo |
| Netlify | Free-$19/mo | 1GB | Unlimited |
| AWS | Free tier | 5GB | 1GB/mo free |
| Heroku | Discontinued | - | - |

---

## Support

If deployment issues occur:
1. Check error logs in deployment dashboard
2. Review this guide again
3. Contact: management@skillauro.in
4. Search: stackoverflow.com for similar issues

---

**Happy Deploying! 🚀**
