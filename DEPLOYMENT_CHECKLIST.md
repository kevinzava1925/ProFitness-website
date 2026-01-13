# 🚀 Deployment Checklist

## Pre-Deployment Setup

### ✅ Completed
- [x] JWT Secret generated: `DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=`
- [x] Admin password hash generated: `$2b$10$esPM5gjvADgx.f1hQZQKsurQ40JnOcOPojkybEdKBmwxjMlGI8.6a`
- [x] Security vulnerabilities fixed
- [x] Environment variables template created (`.env.example`)

### Required Environment Variables

Copy these to your deployment platform (Netlify/Vercel):

```bash
# Authentication
JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u

# Supabase (✅ Configured)
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDg3ODAsImV4cCI6MjA3OTc4NDc4MH0.9Vs_WEtQlw6zfgtzLMGYrwQTLynO70DmblauCAr_Xkk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIwODc4MCwiZXhwIjoyMDc5Nzg0NzgwfQ.FMyMqkPE3qTvYeWmUy8r-thAstwvEWdGXO_1mmPewZQ

# Cloudinary (✅ Configured)
CLOUDINARY_CLOUD_NAME=dvdogsvf6
CLOUDINARY_API_KEY=364193248137179
CLOUDINARY_API_SECRET=Oil3ymOumn72gg4MwOWbiaYlKCY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvdogsvf6

# Email (Optional but Recommended)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=borrowdale@pro-fitness.co.zw
```

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables

**For Netlify:**
1. Go to your site dashboard
2. Navigate to: Site Settings → Environment Variables
3. Add each variable from the list above

**For Vercel:**
1. Go to your project dashboard
2. Navigate to: Settings → Environment Variables
3. Add each variable from the list above
4. Select environments: Production, Preview, Development

### 4. Build & Deploy

**Netlify:**
- Push to your connected Git repository
- Netlify will automatically build and deploy
- Or use: `netlify deploy --prod`

**Vercel:**
- Push to your connected Git repository
- Vercel will automatically build and deploy
- Or use: `vercel --prod`

### 5. Post-Deployment Testing

After deployment, test:

- [ ] **Admin Login**
  - URL: `https://your-site.com/admin`
  - Email: `admin@pro-fitness.co.zw`
  - Password: `Pr0f1ttness123`
  - Should redirect to dashboard on success

- [ ] **Admin Dashboard Access**
  - Should require authentication
  - Should show all tabs (homepage, classes, events, messages, schedule, etc.)

- [ ] **Contact Form**
  - URL: `https://your-site.com/contact`
  - Submit a test message
  - Should show success message
  - Check admin dashboard → Messages tab to see the message

- [ ] **File Upload**
  - Go to admin dashboard → Homepage tab
  - Upload a hero image
  - Should upload successfully to Cloudinary

- [ ] **Content Management**
  - Add/edit a class in admin dashboard
  - Check homepage to see if it appears
  - Should show only 3 classes with "View All" button if more exist

- [ ] **Rate Limiting**
  - Try submitting contact form 11 times quickly
  - Should show rate limit error on 11th attempt

- [ ] **Security**
  - Try accessing `/api/content` with POST without auth
  - Should return 401 Unauthorized
  - Try accessing `/api/contact/messages` without auth
  - Should return 401 Unauthorized

## Important Notes

### ⚠️ Security Warnings

1. **Admin Password**: Current password is `Pr0f1ttness123`. Keep it secure!
   ```bash
   node scripts/generate-password-hash.js your_new_secure_password
   ```
   Then update `ADMIN_PASSWORD_HASH` in your environment variables.

2. **JWT Secret**: Already set to a strong value. Keep it secret and never commit it to Git.

3. **Environment Variables**: Never commit `.env.local` or actual secrets to version control.

### Admin Credentials

**Admin Login:**
- Email: `admin@pro-fitness.co.zw`
- Password: `Pr0f1ttness123`

### Troubleshooting

**Build Fails:**
- Check all required environment variables are set
- Verify Supabase and Cloudinary credentials are correct
- Check build logs for specific errors

**Admin Login Fails:**
- Verify `JWT_SECRET` is set correctly
- Verify `ADMIN_EMAIL` matches what you're using
- Verify `ADMIN_PASSWORD_HASH` is correct
- Check browser console for errors

**API Calls Fail:**
- Verify authentication token is being sent
- Check network tab in browser DevTools
- Verify all environment variables are set in production

**File Uploads Fail:**
- Verify Cloudinary credentials are correct
- Check file size (max 20MB images, 200MB videos)
- Verify file type is allowed

## Support

If you encounter issues:
1. Check browser console for client-side errors
2. Check server logs for server-side errors
3. Verify all environment variables are set correctly
4. Review `DEPLOYMENT_SECURITY.md` for detailed security information

## Next Steps After Deployment

1. ✅ Change admin password from default
2. ✅ Test all functionality
3. ✅ Set up monitoring/error tracking (optional)
4. ✅ Configure custom domain (if needed)
5. ✅ Set up SSL/HTTPS (should be automatic)
6. ✅ Test contact form email delivery
7. ✅ Upload initial content (classes, events, etc.)

