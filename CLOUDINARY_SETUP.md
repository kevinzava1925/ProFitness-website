# Cloudinary Setup Guide

## Issue: "Failed to get upload signature" or "Cloudinary not configured"

This error means your Cloudinary environment variables are not set.

## Quick Fix

### Step 1: Get Your Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://console.cloudinary.com/)
2. Log in to your account
3. Go to **Settings** (gear icon) → **Security** tab
4. You'll see:
   - **Cloud name** (e.g., `dvdogsvf6`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Step 2: Add to `.env.local`

Open your `.env.local` file and add these three lines:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important:**
- Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual values
- Don't use quotes around the values
- The `NEXT_PUBLIC_` prefix is required for the cloud name (it's used in the browser)

### Step 3: Restart Your Dev Server

After adding the variables, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all three Cloudinary variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Enable for **Production**, **Preview**, and **Development**
6. Click **Save**
7. **Redeploy** your site

## Verify It's Working

1. Go to your admin dashboard: `http://localhost:3001/admin/dashboard`
2. Try uploading an image
3. You should see "Upload successful" instead of an error

## Example `.env.local` File

Your `.env.local` should look something like this:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvdogsvf6
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

# JWT
JWT_SECRET=192525
```

## Troubleshooting

### Still Getting "Cloudinary not configured"

1. **Check spelling**: Make sure variable names are exactly:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (with underscores, not hyphens)
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

2. **No quotes**: Don't wrap values in quotes:
   - ✅ `CLOUDINARY_API_KEY=123456`
   - ❌ `CLOUDINARY_API_KEY="123456"`

3. **Restart server**: Environment variables are only loaded when the server starts

4. **Check file location**: `.env.local` should be in the project root (same folder as `package.json`)

### "Invalid Signature" Error

This means your API secret is incorrect. Double-check:
- Copy the **API Secret** from Cloudinary (not the API Key)
- Make sure there are no extra spaces
- Restart your dev server after fixing

### Can't Find Cloudinary Dashboard

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up" if you don't have an account
3. Free tier includes:
   - 25 GB storage
   - 25 GB monthly bandwidth
   - Perfect for your website!

## Need Help?

If you're still having issues:
1. Check the browser console (F12) for detailed error messages
2. Check your terminal where `npm run dev` is running for server errors
3. Verify your Cloudinary account is active (not suspended)





