# Netlify Deployment Guide

This guide will help you deploy your ProFitness website to Netlify.

## ✅ Configuration Complete

Your Next.js app has been configured for Netlify:
- ✅ Netlify configuration file (`netlify.toml`) created
- ✅ Next.js plugin configured
- ✅ Build scripts updated in `package.json`
- ✅ Image domains configured for optimization

## 🚀 Deployment Methods

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or Bitbucket (recommended for automatic deployments)

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository
   - If your code isn't in Git yet, see "GitHub Setup" section below

3. **Configure Build Settings** (Auto-detected, but verify)
   - Build command: `npm run build`
   - Publish directory: `.next` (Netlify Next.js plugin handles this automatically)
   - Base directory: `./` (default)

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Click "Add a variable"
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name (if using)
     CLOUDINARY_API_KEY=your_cloudinary_api_key (if using)
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret (if using)
     ```
   - Make sure to add them for **Production**, **Deploy previews**, and **Branch deploys**

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (usually 2-5 minutes)
   - Your site will be live at `your-project-name.netlify.app`

6. **Automatic Deployments**
   - Every push to `main` branch = Production deployment
   - Every PR = Deploy preview (unique URL)
   - No manual deployment needed!

### Method 2: Deploy via CLI

1. **Install Netlify CLI** (optional - can use npx)
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   npx netlify login
   ```
   - This will open your browser to authenticate

3. **Initialize Netlify** (first time only)
   ```bash
   npx netlify init
   ```
   - Follow the prompts:
     - Create & configure a new site? **Yes**
     - Team: Select your team
     - Site name: (enter a name or press Enter for auto-generated)
     - Build command: `npm run build` (press Enter)
     - Directory to deploy: `.next` (press Enter)

4. **Deploy to Production**
   ```bash
   npm run deploy
   ```
   Or:
   ```bash
   npx netlify deploy --prod
   ```

5. **Deploy Preview** (for testing)
   ```bash
   npm run deploy:preview
   ```
   Or:
   ```bash
   npx netlify deploy
   ```

## 📦 GitHub Setup

If you don't have a GitHub repository yet, follow these steps:

### Option A: Create Repository via GitHub Website

1. **Go to GitHub**
   - Visit [github.com](https://github.com) and sign in
   - Click the "+" icon in the top right → "New repository"

2. **Create Repository**
   - Repository name: `profitness-website` (or your preferred name)
   - Description: "ProFitness Gym Website"
   - Visibility: **Public** (for free Netlify) or **Private** (requires paid plan)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Push Your Code**
   ```bash
   # Make sure you're in your project directory
   cd /Users/kevinzava/Downloads/ProFitness_Website_Final
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit - Netlify deployment setup"
   
   # Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Option B: Create Repository via GitHub CLI (if installed)

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Then: gh auth login

# Create repository
gh repo create profitness-website --public --source=. --remote=origin --push
```

## 🌐 Adding Custom Domain

1. **In Netlify Dashboard**
   - Go to your site → **Domain settings** → **Custom domains**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `profitness.com` or `www.profitness.com`)

2. **Configure DNS**
   - Netlify will show you DNS records to add
   - For root domain: Add **A record** pointing to Netlify's IP
   - For www: Add **CNAME record** pointing to your Netlify site URL

3. **Update DNS at Your Registrar**
   - Go to your domain registrar (Namecheap, GoDaddy, Hostinger, etc.)
   - Navigate to DNS settings
   - Add the DNS records Netlify provided
   - Save changes

4. **Wait for DNS Propagation**
   - Usually takes 5-60 minutes
   - Netlify will automatically issue SSL certificate
   - You'll see a notification when domain is ready

5. **Verify**
   - Visit your custom domain
   - Should see your site with HTTPS automatically enabled

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server locally
- `npm run deploy` - Deploy to Netlify production
- `npm run deploy:preview` - Deploy preview (for testing)

## 🔧 Environment Variables

### Required Environment Variables

Make sure to add these in Netlify Dashboard → Site settings → Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Optional Environment Variables (if using Cloudinary)

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Adding Environment Variables via CLI

```bash
# Add a variable
npx netlify env:set VARIABLE_NAME "value"

# List all variables
npx netlify env:list

# Delete a variable
npx netlify env:unset VARIABLE_NAME
```

## ✨ Benefits of Netlify

- ✅ **Full Next.js Support** - API routes, SSR, ISR all work
- ✅ **Automatic Deployments** - Deploy on every Git push
- ✅ **Deploy Previews** - Test PRs before merging
- ✅ **Free SSL** - Automatic HTTPS for all domains
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Edge Functions** - Run code at the edge
- ✅ **Form Handling** - Built-in form submissions
- ✅ **Analytics** - Built-in performance monitoring (paid)

## 🐛 Troubleshooting

### Build Fails

- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run lint`
- Verify Node.js version (should be 20)

### API Routes Not Working

- Make sure `output: 'export'` is NOT in `next.config.js` ✅ (Already correct!)
- Check that routes are in `src/app/api/` directory
- Verify environment variables are set correctly

### Images Not Loading

- Verify `remotePatterns` in `next.config.js` includes your image domains
- Check `netlify.toml` has image domains configured
- Check that image URLs are correct

### Environment Variables Not Working

- Make sure variables are added in Netlify dashboard
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)
- Ensure variables are added for the correct environment (Production/Preview/Branch)

### Build Timeout

- Free tier has 15-minute build timeout
- If builds are timing out, consider:
  - Optimizing dependencies
  - Using Netlify's build cache
  - Upgrading to paid plan for longer timeouts

## 📚 Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## 🎉 Next Steps

1. Set up GitHub repository (if not done)
2. Deploy your site using one of the methods above
3. Add environment variables in Netlify dashboard
4. Add your custom domain (optional)
5. Enjoy automatic deployments!

## 🔄 Migration from Vercel

If you were previously using Vercel:

- ✅ Vercel scripts removed from `package.json`
- ✅ Netlify configuration added
- ✅ Build commands updated
- ⚠️ **Remember to**: Add environment variables in Netlify dashboard (they don't transfer automatically)

