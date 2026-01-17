# 🚀 Quick Start Guide

## ✅ Everything is Ready!

All security fixes are complete and configuration is ready. Here's what you need to do:

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `zod` - Input validation
- `isomorphic-dompurify` - XSS protection

## Step 2: Set Environment Variables

### For Production (Cloudflare Pages)

Go to your deployment platform and add these environment variables:

**✅ Pre-configured (Copy these exactly):**
```
JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDg3ODAsImV4cCI6MjA3OTc4NDc4MH0.9Vs_WEtQlw6zfgtzLMGYrwQTLynO70DmblauCAr_Xkk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIwODc4MCwiZXhwIjoyMDc5Nzg0NzgwfQ.FMyMqkPE3qTvYeWmUy8r-thAstwvEWdGXO_1mmPewZQ

# Cloudinary
CLOUDINARY_CLOUD_NAME=dvdogsvf6
CLOUDINARY_API_KEY=364193248137179
CLOUDINARY_API_SECRET=Oil3ymOumn72gg4MwOWbiaYlKCY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvdogsvf6
```

**📝 Optional:**
- Resend API key for emails

See `ENVIRONMENT_VARIABLES.md` for the complete list.

### For Local Development

Create `.env.local` file:
```bash
cp .env.example .env.local
# Then edit .env.local with your actual values
```

## Step 3: Deploy (Cloudflare Pages)

1. Connect your Git repository in Cloudflare Pages
2. Set build command: `npm run build && npm run pages:build`
3. Set output directory: `.vercel/output/static`
4. Push to your default branch to deploy

## Step 4: Test

1. **Admin Login**: Go to `/admin`
   - Email: `admin@pro-fitness.co.zw`
   - Password: `Pr0f1ttness123`

2. **Contact Form**: Go to `/contact` and submit a test message

3. **Admin Dashboard**: Verify you can access all tabs

## ⚠️ Important Security Reminders

1. **Admin Password**: Current password is `Pr0f1ttness123` - keep it secure!

2. **Never Commit Secrets**: `.env.local` is in `.gitignore` - keep it that way!

3. **Verify Environment Variables**: Make sure all are set in production

## Documentation

- `DEPLOYMENT_CHECKLIST.md` - Complete deployment checklist
- `DEPLOYMENT_SECURITY.md` - Security details and features
- `ENVIRONMENT_VARIABLES.md` - All environment variables explained

## Need Help?

Check the documentation files or verify:
- All environment variables are set correctly
- Dependencies are installed (`npm install`)
- Build completes successfully
- Admin login works with provided credentials

