# Supabase Storage Migration Complete ✅

Your website has been successfully migrated from Cloudinary to Supabase Storage!

## What Changed

### 1. New Upload API Route
- **Created**: `src/app/api/upload-storage/route.ts`
- Handles file uploads to Supabase Storage
- Supports both images and videos (up to 200MB)
- Returns public URLs for uploaded files

### 2. Updated Dashboard Functions
- **`handleImageUpload`**: Now uploads to Supabase Storage instead of Cloudinary
- **`handleHeroMediaUpload`**: Now uploads to Supabase Storage instead of Cloudinary
- Both functions use the new `/api/upload-storage` endpoint

### 3. Updated Image Configuration
- **`next.config.js`**: Added Supabase Storage domain (`uitncbzxnumrnslfucso.supabase.co`) to allowed image sources
- Also added wildcard pattern (`*.supabase.co`) for any Supabase project

## How It Works

1. **User uploads file** in admin dashboard
2. **File is sent** to `/api/upload-storage` endpoint
3. **API route**:
   - Validates file size (20MB images, 200MB videos)
   - Generates unique filename
   - Uploads to Supabase Storage bucket `profitness`
   - Returns public URL
4. **Dashboard** saves the URL to your Supabase database

## File URLs

Uploaded files will be accessible at:
```
https://uitncbzxnumrnslfucso.supabase.co/storage/v1/object/public/profitness/[filename]
```

## Testing

1. **Start your dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Go to admin dashboard**: `http://localhost:3001/admin/dashboard`

3. **Test image upload**:
   - Go to any tab (Classes, Events, Shop, etc.)
   - Click "Edit" on an item
   - Click "Upload" on the image field
   - Select an image file
   - Should see "Upload successful" or the image preview

4. **Test hero media upload**:
   - Go to "Homepage" tab
   - Click "Upload" for hero media
   - Select an image or video
   - Should see success message

5. **Verify in Supabase**:
   - Go to Supabase Dashboard → Storage → `profitness` bucket
   - You should see your uploaded files there

## Environment Variables

Make sure these are set in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Vercel Deployment

When deploying to Vercel:
1. Make sure the same environment variables are set in Vercel
2. The code will automatically use Supabase Storage
3. No Cloudinary variables needed anymore!

## Benefits

✅ **Works in Zimbabwe** - Supabase has global CDN
✅ **Free tier** - 1GB storage, 2GB bandwidth/month
✅ **Integrated** - Already using Supabase for database
✅ **Simple** - No additional service to manage
✅ **Reliable** - Same infrastructure as your database

## Troubleshooting

### "Failed to upload file"
- Check that Supabase Storage bucket `profitness` exists and is public
- Verify storage policies are set (see SUPABASE_STORAGE_SETUP.md)
- Check browser console for detailed error messages

### "Access denied"
- Make sure the bucket is set to **Public**
- Verify storage policies allow uploads

### Images not displaying
- Check that `next.config.js` includes Supabase domain
- Verify the file URL is correct
- Check browser console for CORS errors

### File size errors
- Images: 20MB limit
- Videos: 200MB limit
- Adjust limits in `src/app/api/upload-storage/route.ts` if needed

## Old Cloudinary Code

The following files are no longer needed but kept for reference:
- `src/app/api/upload-signature/route.js` (Cloudinary signature generation)
- `src/app/api/upload-direct/route.js` (Cloudinary direct upload)
- `src/app/api/upload/route.js` (Cloudinary base64 upload)
- `src/utils/cloudinary.js` (Cloudinary configuration)

You can delete these files if you want, but they won't interfere with the new system.

## Next Steps

1. ✅ Test uploads in admin dashboard
2. ✅ Verify files appear in Supabase Storage
3. ✅ Check that images display correctly on the website
4. ✅ Deploy to Vercel with updated code

Your website is now fully migrated to Supabase Storage! 🎉





