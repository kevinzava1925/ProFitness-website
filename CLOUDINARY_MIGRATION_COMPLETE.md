# ✅ Migrated Back to Cloudinary for Image Uploads

## 🔄 Changes Made

Your image uploads have been switched back to **Cloudinary** from Supabase Storage to support larger file uploads.

### ✅ Updated Files

1. **`src/app/admin/dashboard/page.tsx`**
   - Changed `handleImageUpload` to use `/api/upload-direct` (Cloudinary)
   - Changed `handleHeroMediaUpload` to use `/api/upload-direct` (Cloudinary)
   - Increased file size limits:
     - Images: 20MB → **200MB**
     - Videos: 200MB → **500MB**

### ✅ Upload Routes

- **`/api/upload-direct`** - Now used for all image/video uploads
  - Supports FormData uploads
  - Handles large files (up to 500MB for videos)
  - Uses Cloudinary's upload_stream for efficient large file handling

## 🔐 Required Environment Variables

Make sure these are set in **Netlify**:

### Cloudinary (Required)
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Supabase (Still Required for Content Storage)
```
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Note**: Supabase is still used for storing content data (classes, events, etc.), but images are now uploaded to Cloudinary.

## 📋 How to Add Cloudinary Variables in Netlify

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Click on your site
   - Go to **Site settings** → **Environment variables**

2. **Add Cloudinary Variables**
   - Click **"Add variable"** for each:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (same as CLOUDINARY_CLOUD_NAME)

3. **Get Your Cloudinary Keys**
   - Go to: https://cloudinary.com/console
   - Sign in to your account
   - Go to **Dashboard**
   - Copy:
     - **Cloud name** → `CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
     - **API Key** → `CLOUDINARY_API_KEY`
     - **API Secret** → `CLOUDINARY_API_SECRET` ⚠️ (Keep this secret!)

4. **Redeploy**
   - After adding variables, go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

## ✅ Benefits of Cloudinary

- ✅ **Larger file support**: Up to 200MB images, 500MB videos
- ✅ **Better performance**: Optimized image delivery
- ✅ **Automatic optimization**: Cloudinary optimizes images automatically
- ✅ **Video support**: Better video handling and streaming
- ✅ **Transformations**: On-the-fly image transformations available

## 🚀 Next Steps

1. **Add Cloudinary environment variables** in Netlify (see above)
2. **Redeploy** your site
3. **Test image uploads** in the admin dashboard
4. **Verify** larger images upload successfully

## 📝 File Size Limits

- **Images**: Up to 200MB
- **Videos**: Up to 500MB

These limits are much higher than Supabase Storage, which should solve your large image upload issues!

---

**Status**: ✅ Migration complete! Add Cloudinary variables in Netlify and redeploy.

