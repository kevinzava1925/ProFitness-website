# Cloudflare Pages Deployment Guide

## ✅ Overview

This project is configured for Cloudflare Pages with full SSR and API routes using `@cloudflare/next-on-pages`.

## 🚀 Build Settings

- **Build command**: `npm run build && npm run pages:build`
- **Build output directory**: `.vercel/output/static`
- **Node version**: 20

## 🔐 Environment Variables

Add these in **Settings → Environment variables** (Production + Preview):

### Authentication
```
JWT_SECRET=...
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=...
```

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Cloudinary
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Email (Optional)
```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
CONTACT_EMAIL=...
```

## ✅ Deploy Steps

1. Connect the GitHub repo in Cloudflare Pages
2. Set build command and output directory
3. Add environment variables
4. Trigger a deployment (or push a commit)

## ✅ Verify

- `/admin` login works
- `/contact` submits and stores messages
- Admin dashboard uploads work (Cloudinary)

---

**Status**: Ready for Cloudflare Pages deployment.
