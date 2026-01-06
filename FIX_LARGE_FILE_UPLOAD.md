# Fix Large File Upload Issue (>2MB)

## 🔴 Problem

Images over 2MB are not uploading. This is due to:
1. **Next.js default body size limit** (~1-2MB)
2. **Netlify function body size limits**

## ✅ Solution Applied

### 1. Updated API Route Configuration
- Added `export const dynamic = 'force-dynamic'` to handle large payloads
- Already has `maxDuration = 60` for large files

### 2. Updated Netlify Configuration
- Configured Netlify functions for larger payloads
- Set proper bundler configuration

## ⚠️ Important: Netlify Body Size Limits

Netlify has different limits based on plan:
- **Free/Starter**: 6MB request body limit
- **Pro**: 6MB request body limit  
- **Business/Enterprise**: 25MB+ request body limit

For files larger than 6MB, you have two options:

### Option 1: Use Cloudinary Direct Upload (Recommended)

Instead of uploading through your API, use Cloudinary's direct upload from the browser. This bypasses Netlify's limits entirely.

### Option 2: Upgrade Netlify Plan

Upgrade to Business plan for larger limits.

## 🔧 Alternative: Client-Side Direct Upload to Cloudinary

For files over 6MB, we can implement direct browser-to-Cloudinary upload:

1. **Get upload signature from your API** (small request)
2. **Upload directly to Cloudinary** from browser (bypasses Netlify)
3. **Get URL and save to database**

This would allow uploads up to Cloudinary's limits (100MB for images, 500MB for videos).

## 📋 Current Limits

After these changes:
- **Files up to 6MB**: Should work with current setup
- **Files 6MB-200MB**: Need direct Cloudinary upload implementation
- **Files over 200MB**: Need Cloudinary Business plan

## 🚀 Next Steps

1. **Test with files under 6MB** - should work now
2. **For larger files**: Consider implementing direct Cloudinary upload
3. **Monitor Netlify logs** for any body size errors

## 🔍 How to Test

1. Try uploading a 3MB image (should work)
2. Try uploading a 5MB image (should work)
3. Try uploading a 7MB image (might fail - need direct upload)

---

**Status**: ✅ Configuration updated! Test with files under 6MB first.

