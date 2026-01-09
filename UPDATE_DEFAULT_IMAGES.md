# Update Default Images Guide

## ✅ What's Been Done

All default images have been centralized into a single configuration file: `src/config/defaultImages.ts`

This makes it easy to update all default images in one place instead of searching through multiple files.

## 📝 How to Update Default Images

### Step 1: Open the Configuration File

Open `src/config/defaultImages.ts` in your editor.

### Step 2: Replace Cloudinary URLs

Replace all the placeholder URLs with your actual Cloudinary URLs.

**Current format:**
```typescript
muayThai: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/profitness/muay-thai.jpg',
```

**Replace with your actual URL:**
```typescript
muayThai: 'https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/profitness/muay-thai.jpg',
```

### Step 3: Update All Image URLs

Go through each section and replace:
- `YOUR_CLOUD_NAME` → Your actual Cloudinary cloud name
- `v1234567890` → Your actual version number (or remove if not needed)
- Image paths → Your actual image paths in Cloudinary

### Example:

**Before:**
```typescript
classes: {
  muayThai: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/profitness/muay-thai.jpg',
  fitness: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/profitness/fitness.jpg',
  // ...
}
```

**After:**
```typescript
classes: {
  muayThai: 'https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/profitness/muay-thai.jpg',
  fitness: 'https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/profitness/fitness.jpg',
  // ...
}
```

## 📋 Image Categories

The configuration file includes:

1. **Classes** - 6 default class images
2. **Events** - 6 default event images
3. **Shop** - 4 default shop item images
4. **Partners** - 2 default partner logos
5. **Collaborations** - 2 default collaboration images
6. **Trainers** - 4 default trainer photos
7. **Amenities** - 6 default amenity images
8. **Hero & Other** - Hero image, trial training, about, location images
9. **Icons** - Calendar, Instagram, Facebook icons (currently using ext.same-assets.com)

## 🔧 Hero Image Loading Fix

The hero image in the admin dashboard has been fixed to:
- Only show default if API doesn't provide one
- Not flash the default image before API loads
- Properly wait for API response before setting defaults

## 📍 Files Updated

All these files now use the constants from `defaultImages.ts`:

- ✅ `src/app/admin/dashboard/page.tsx`
- ✅ `src/app/page.tsx` (Homepage)
- ✅ `src/app/classes/page.tsx`
- ✅ `src/app/classes/[id]/page.tsx`
- ✅ `src/app/events/page.tsx`
- ✅ `src/app/events/[id]/page.tsx`
- ✅ `src/app/shop/page.tsx`
- ✅ `src/app/personal-trainers/page.tsx`
- ✅ `src/app/amenities/page.tsx`
- ✅ `src/app/collaborations/page.tsx`

## 🚀 Next Steps

1. **Update `src/config/defaultImages.ts`** with your actual Cloudinary URLs
2. **Test the pages** to ensure images load correctly
3. **Commit and push** the changes

## 💡 Tips

- You can get Cloudinary URLs from your Cloudinary dashboard
- Upload images to Cloudinary first, then copy the URLs
- Organize images in folders (e.g., `profitness/classes/`, `profitness/events/`)
- The version number (`v1234567890`) is optional but recommended for cache busting

---

**Status**: ✅ Ready to update! Just edit `src/config/defaultImages.ts` with your Cloudinary URLs.

