# Vercel Deployment Guide

This guide will help you deploy your ProFitness website to Vercel.

## ✅ Configuration Complete

Your Next.js app has been configured for Vercel:
- ✅ Removed static export (enables API routes, SSR, and full Next.js features)
- ✅ Enabled Next.js image optimization
- ✅ Updated package.json with Vercel deployment scripts
- ✅ Your `/api/upload` route will now work!

## 🚀 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket (recommended for automatic deployments)

2. **Import Your Project**
   - Click "Add New Project"
   - Import your Git repository
   - If your code isn't in Git yet, push it to GitHub first

3. **Configure Project Settings**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default - Vercel handles this automatically)
   - Install Command: `npm install` (default)

4. **Add Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add any Cloudinary or other API keys:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
   - Or add them in `vercel.json` if you prefer

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-3 minutes)
   - Your site will be live at `your-project.vercel.app`

6. **Automatic Deployments**
   - Every push to `main` branch = Production deployment
   - Every PR = Preview deployment (unique URL)
   - No manual deployment needed!

### Method 2: Deploy via CLI

1. **Install Vercel CLI** (optional - can use npx)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   npx vercel login
   ```
   - Follow the prompts to authenticate

3. **Deploy to Production**
   ```bash
   npm run deploy
   ```
   Or:
   ```bash
   npx vercel --prod
   ```

4. **First Time Setup**
   - When prompted, answer:
     - Set up and deploy? **Yes**
     - Which scope? (select your account)
     - Link to existing project? **No** (first time)
     - Project name? (enter your project name or press Enter for default)
     - Directory? **./** (press Enter)
     - Override settings? **No** (press Enter)

## 🌐 Adding Custom Domain

1. **In Vercel Dashboard**
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `profitness.com` or `www.profitness.com`)

2. **Get DNS Records**
   - Vercel will show you the DNS records to add
   - For root domain: Add **A record** pointing to Vercel's IP
   - For www: Add **CNAME record** pointing to `cname.vercel-dns.com`

3. **Update DNS at Your Registrar**
   - Go to your domain registrar (Namecheap, GoDaddy, Hostinger, etc.)
   - Navigate to DNS settings
   - Add the DNS records Vercel provided
   - Save changes

4. **Wait for DNS Propagation**
   - Usually takes 5-60 minutes
   - Vercel will automatically issue SSL certificate
   - You'll get an email when domain is ready

5. **Verify**
   - Visit your custom domain
   - Should see your site with HTTPS automatically enabled

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server locally
- `npm run deploy` - Deploy to Vercel production
- `npm run deploy:preview` - Deploy preview (for testing)

## 🔧 Environment Variables

If you need to add environment variables:

1. **Via Dashboard** (Recommended)
   - Project Settings → Environment Variables
   - Add variables for Production, Preview, and Development

2. **Via CLI**
   ```bash
   npx vercel env add CLOUDINARY_CLOUD_NAME
   npx vercel env add CLOUDINARY_API_KEY
   npx vercel env add CLOUDINARY_API_SECRET
   ```

## ✨ Benefits of Vercel

- ✅ **Full Next.js Support** - API routes, SSR, ISR all work
- ✅ **Automatic Deployments** - Deploy on every Git push
- ✅ **Preview Deployments** - Test PRs before merging
- ✅ **Free SSL** - Automatic HTTPS for all domains
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Zero Configuration** - Works out of the box
- ✅ **Analytics** - Built-in performance monitoring
- ✅ **Edge Functions** - Run code at the edge

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run lint`

### API Routes Not Working
- Make sure `output: 'export'` is removed from `next.config.js` ✅ (Already done!)
- Check that routes are in `src/app/api/` directory

### Images Not Loading
- Verify `remotePatterns` in `next.config.js` includes your image domains
- Check that image URLs are correct

### Environment Variables Not Working
- Make sure variables are added in Vercel dashboard
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

## 🎉 Next Steps

1. Deploy your site using one of the methods above
2. Add your custom domain
3. Set up environment variables if needed
4. Enjoy automatic deployments!

