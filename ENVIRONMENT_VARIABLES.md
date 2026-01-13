# Environment Variables Configuration

## ✅ Pre-Configured Values

These values have been generated and are ready to use:

### JWT Secret
```
JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=
```

### Admin Credentials
```
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u
```

**Admin Password**: `Pr0f1ttness123`

## Complete Environment Variables List

Copy these to your deployment platform (Netlify/Vercel):

```bash
# ============================================
# Authentication (✅ Ready to Use)
# ============================================
JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u

# ============================================
# Supabase Database (✅ Configured)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDg3ODAsImV4cCI6MjA3OTc4NDc4MH0.9Vs_WEtQlw6zfgtzLMGYrwQTLynO70DmblauCAr_Xkk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5jYnp4bnVtcm5zbGZ1Y3NvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIwODc4MCwiZXhwIjoyMDc5Nzg0NzgwfQ.FMyMqkPE3qTvYeWmUy8r-thAstwvEWdGXO_1mmPewZQ

# ============================================
# Cloudinary (✅ Configured)
# ============================================
CLOUDINARY_CLOUD_NAME=dvdogsvf6
CLOUDINARY_API_KEY=364193248137179
CLOUDINARY_API_SECRET=Oil3ymOumn72gg4MwOWbiaYlKCY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvdogsvf6

# ============================================
# Email - Resend (Optional but Recommended)
# ============================================
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=borrowdale@pro-fitness.co.zw
```

## How to Set Environment Variables

### Netlify
1. Go to your site dashboard
2. Click **Site Settings**
3. Click **Environment Variables** in the left sidebar
4. Click **Add variable** for each variable above
5. Set the **Key** and **Value**
6. Select **All scopes** (Production, Deploy previews, Branch deploys)
7. Click **Save**

### Vercel
1. Go to your project dashboard
2. Click **Settings**
3. Click **Environment Variables** in the left sidebar
4. Click **Add New** for each variable above
5. Set the **Key** and **Value**
6. Select environments: **Production**, **Preview**, **Development**
7. Click **Save**

## Local Development Setup

Create a `.env.local` file in the root directory:

```bash
# .env.local file has been created with all credentials
# All values are pre-configured and ready to use
```

**Important**: The `.env.local` file is already in `.gitignore` and will not be committed to Git.

## Changing Admin Password

To change the admin password from the default `admin123`:

```bash
node scripts/generate-password-hash.js your_new_secure_password
```

This will output a new hash. Update `ADMIN_PASSWORD_HASH` in your environment variables with the new hash.

## Verification

After setting environment variables:

1. **Restart your development server** (if running locally)
2. **Redeploy your site** (if on Netlify/Vercel)
3. **Test admin login**:
   - Go to `/admin`
   - Email: `admin@pro-fitness.co.zw`
   - Password: `Pr0f1ttness123`

## Security Notes

- ✅ JWT Secret is strong and secure
- ⚠️ Change admin password from default `admin123` in production
- ✅ Never commit `.env.local` or actual secrets to Git
- ✅ All sensitive values are stored as environment variables

