# ✅ Next Steps After Pushing to GitHub (Cloudflare Pages)

Your code is on GitHub. Follow these steps to deploy on Cloudflare Pages with SSR and API routes.

## 🚀 Step 1: Create a Cloudflare Pages Project

1. Go to Cloudflare Pages: https://dash.cloudflare.com/
2. Click **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select the repo: `kevinzava1925/ProFitness-website`

## ⚙️ Step 2: Configure Build Settings

- **Build command**: `npm run build && npm run pages:build`
- **Build output directory**: `.vercel/output/static`
- **Node version**: 20 (set in Cloudflare Pages if prompted)

## 🔐 Step 3: Add Environment Variables

Go to **Settings → Environment variables** and add:

### Required (Supabase)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Required (Auth)
```
JWT_SECRET=...
ADMIN_EMAIL=admin@pro-fitness.co.zw
ADMIN_PASSWORD_HASH=...
```

### Required (Cloudinary)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Optional (Email)
```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
CONTACT_EMAIL=...
```

Apply variables to both **Production** and **Preview**.

## ✅ Step 4: Deploy and Verify

1. Trigger a deployment (or push a new commit).
2. Visit `https://your-project.pages.dev`.
3. Test:
   - Admin login at `/admin`
   - Contact form at `/contact`
   - Image uploads in admin dashboard

## 🔄 Automatic Deployments

Cloudflare Pages will deploy on every push to your default branch and create previews for PRs.

## 🌐 Custom Domain (Optional)

1. Go to **Custom domains** in your Pages project
2. Add your domain and follow DNS instructions

## 📋 Checklist

- [ ] Cloudflare Pages project created
- [ ] Build command set to `npm run build && npm run pages:build`
- [ ] Output directory set to `.vercel/output/static`
- [ ] Environment variables added (Production + Preview)
- [ ] Site loads at `*.pages.dev`
- [ ] Admin dashboard works

---

**Status**: Ready to deploy on Cloudflare Pages 🚀
