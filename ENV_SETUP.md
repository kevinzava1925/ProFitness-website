# Environment Variable Setup

## ✅ JWT Secret Key

The JWT secret has been set to: `DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=`

### For Local Development

The `.env.local` file has been created with all credentials configured.

**Admin Credentials:**
- Email: `admin@pro-fitness.co.zw`
- Password: `Pr0f1ttness123`

All Supabase and Cloudinary credentials are already configured in `.env.local`.

### For Production Deployment (Netlify/Vercel)

1. **Netlify**: Go to Site Settings → Environment Variables
2. **Vercel**: Go to Project Settings → Environment Variables

Add all required environment variables (see `.env.example` for complete list).

3. Redeploy your project for the changes to take effect.

## Required Environment Variables

See `.env.example` for the complete list of required environment variables.

**Critical Variables:**
- `JWT_SECRET` - ✅ Set to: `DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=`
- `ADMIN_EMAIL` - Admin login email: `admin@pro-fitness.co.zw`
- `ADMIN_PASSWORD_HASH` - ✅ Generated for password: `Pr0f1ttness123`
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Same as CLOUDINARY_CLOUD_NAME

## Admin Password

**Admin password**: `Pr0f1ttness123`

The password hash has been generated: `$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u`

To generate a new password hash:
```bash
node scripts/generate-password-hash.js your_new_password
```

