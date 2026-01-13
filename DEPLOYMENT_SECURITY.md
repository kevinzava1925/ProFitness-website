# Security Fixes & Deployment Guide

## ✅ Security Fixes Implemented

### Critical Fixes
1. ✅ **Replaced hardcoded admin credentials** - Now uses server-side authentication with environment variables
2. ✅ **Added API authentication** - All content modification endpoints require admin authentication
3. ✅ **Fixed XSS vulnerability** - Contact form messages are now sanitized with DOMPurify
4. ✅ **Added rate limiting** - Contact form and upload endpoints are rate-limited
5. ✅ **Added input validation** - Using Zod for comprehensive input validation
6. ✅ **Improved file upload security** - File type and size validation, admin-only access
7. ✅ **Added security headers** - X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.

## Required Environment Variables

### Critical (Must Set)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Secret (✅ Already Generated)
JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=

# Admin Credentials
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u
# Admin password: Pr0f1ttness123

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Optional (Recommended)
```bash
# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=borrowdale@pro-fitness.co.zw
```

## ✅ JWT Secret (Already Generated)

**JWT Secret**: `DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=`

This has been generated and is ready to use. Set this as `JWT_SECRET` in your environment variables.

## ✅ Admin Password Hash (Already Generated)

**Admin Password**: `Pr0f1ttness123`

**Password Hash**: `$2b$10$c8T8TyEph47pBbl2ALqegOg4tx0myNt8uG2TgoukfDnEtMyDm0nvG`

This hash is for the password "Pr0f1ttness123". Set this as `ADMIN_PASSWORD_HASH` in your environment variables.

### To Generate a New Password Hash

If you want to change the admin password:

```bash
# Use the provided script
node scripts/generate-password-hash.js your_new_secure_password
```

Or manually:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your_new_password', 10).then(hash => console.log('ADMIN_PASSWORD_HASH=' + hash));"
```

## Installation Steps

1. **Install new dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables** in your deployment platform:
   - Netlify: Site Settings → Environment Variables
   - Vercel: Project Settings → Environment Variables
   
   **Copy all variables from `.env.example`** and set them in your deployment platform.

3. **✅ JWT_SECRET is already generated:**
   - Set `JWT_SECRET=DEMEyg3+0Vz1Zu4oStDbIt1tCBF8V954inSyxdi5h2M=`

4. **✅ ADMIN_PASSWORD_HASH is already generated:**
   - Set `ADMIN_PASSWORD_HASH=$2b$10$53.R4Bm14cslQ0tDADOWHuy2YLcEBMISExl./GR.7evtRhaFIa76u`
   - Set `ADMIN_EMAIL=admin@pro-fitness.co.zw`
   - Admin password: `Pr0f1ttness123`

## Security Features

### Authentication
- Admin login now uses server-side JWT authentication
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- All admin API routes require valid JWT token

### Rate Limiting
- Contact form: 10 requests per 15 minutes per IP
- Admin login: 5 attempts per 15 minutes per IP
- File uploads: 20 uploads per hour per IP

### Input Validation
- Contact form validated with Zod schema
- File uploads validated for type and size
- All user inputs sanitized

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restricted

## Testing Checklist

Before deploying, test:

- [ ] Admin login with correct credentials
- [ ] Admin login with incorrect credentials (should fail)
- [ ] Access admin dashboard without token (should redirect)
- [ ] Contact form submission
- [ ] Contact form rate limiting (submit 11 times quickly)
- [ ] File upload with valid file
- [ ] File upload with invalid file type (should fail)
- [ ] File upload with oversized file (should fail)
- [ ] API content modification without auth (should fail)
- [ ] API content modification with valid token (should succeed)

## Migration Notes

### Breaking Changes
1. **Admin login** - Now requires API call instead of client-side check
2. **Admin dashboard** - Requires valid JWT token
3. **Content API** - POST requests now require admin authentication

### Backward Compatibility
- Old localStorage `adminAuth` key is replaced with `adminToken`
- Admin must re-login after deployment

## Additional Security Recommendations

1. **Use HTTP-only cookies** for token storage (more secure than localStorage)
2. **Implement CSRF tokens** for state-changing operations
3. **Add request logging** and monitoring
4. **Set up error tracking** (Sentry, etc.)
5. **Regular security audits** and dependency updates
6. **Enable HTTPS only** in production
7. **Consider using Redis** for rate limiting in production (current is in-memory)

## Support

If you encounter issues:
1. Check all environment variables are set correctly
2. Verify JWT_SECRET is a strong random string
3. Ensure ADMIN_PASSWORD_HASH is properly generated
4. Check browser console and server logs for errors

