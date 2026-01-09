# ✅ Next Steps After Pushing to GitHub

Great! Your code is now on GitHub. Here's what to do next to deploy to Netlify.

## 🚀 Step 1: Deploy to Netlify

### Option A: Via Netlify Dashboard (Recommended - Easiest)

1. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Sign up or log in (you can use your GitHub account)

2. **Import Your Project**
   - Click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select repository: **`kevinzava1925/ProFitness-website`**

3. **Configure Build Settings**
   - Netlify will auto-detect Next.js settings:
     - **Build command**: `npm run build` ✅
     - **Publish directory**: `.next` ✅
   - Click **"Show advanced"** to add environment variables (see Step 2)
   - Click **"Deploy site"**

4. **Wait for Build**
   - First build takes 3-5 minutes
   - You'll see build progress in real-time
   - When complete, your site will be live at `your-site-name.netlify.app`

### Option B: Via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
npx netlify login

# Initialize and deploy
npx netlify init
# Follow prompts:
# - Create & configure a new site? Yes
# - Team: Select your team
# - Site name: (press Enter for auto-generated name)
# - Build command: npm run build
# - Directory to deploy: .next

# Deploy to production
npx netlify deploy --prod
```

## 🔐 Step 2: Add Environment Variables (CRITICAL)

Your site needs these environment variables to work properly.

1. **Go to Netlify Dashboard**
   - Click on your site
   - Go to **Site settings** → **Environment variables**

2. **Add These Variables** (for Production, Deploy previews, and Branch deploys):

### Required (Supabase)
```
NEXT_PUBLIC_SUPABASE_URL=https://uitncbzxnumrnslfucso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these:**
- Go to your Supabase Dashboard: https://supabase.com/dashboard
- Select your project
- Go to **Settings** → **API**
- Copy:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### Optional (Cloudinary - if you're using it)
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

3. **Redeploy After Adding Variables**
   - After adding environment variables, go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Or wait for the next automatic deploy

## ✅ Step 3: Verify Deployment

1. **Check Build Status**
   - Go to **Deploys** tab in Netlify
   - Click on the latest deploy
   - Check build logs for any errors

2. **Visit Your Site**
   - Your site URL: `https://your-site-name.netlify.app`
   - Test all pages and features
   - Check admin dashboard: `https://your-site-name.netlify.app/admin`

3. **Verify Environment Variables**
   - Make sure Supabase connections work
   - Test image uploads
   - Check that content loads from Supabase

## 🔄 Step 4: Automatic Deployments

✅ **Already Configured!** 

Netlify will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Rebuild when you push new commits

No manual deployment needed!

## 🌐 Step 5: Add Custom Domain (Optional)

1. **In Netlify Dashboard**
   - Go to **Site settings** → **Domain management**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `profitness.com`)

2. **Update DNS**
   - Netlify will show you DNS records to add
   - Go to your domain registrar (Namecheap, GoDaddy, etc.)
   - Add the DNS records Netlify provides
   - Wait 5-60 minutes for DNS propagation

3. **SSL Certificate**
   - Netlify automatically issues SSL certificates
   - HTTPS will be enabled automatically

## 🐛 Troubleshooting

### Build Fails?

1. **Check Build Logs**
   - Go to Deploys → Click failed build
   - Look for error messages
   - Common issues:
     - Missing environment variables
     - TypeScript errors
     - Missing dependencies

2. **Test Locally First**
   ```bash
   npm ci  # Clean install
   npm run build  # Test build
   ```
   - Fix any errors locally
   - Push fixes to GitHub
   - Netlify will rebuild automatically

### Environment Variables Not Working?

- Make sure variables are added for **Production**, **Deploy previews**, and **Branch deploys**
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### Site Not Loading?

- Check build status (should be "Published")
- Verify environment variables are set
- Check browser console for errors
- Try hard refresh (Ctrl+F5 / Cmd+Shift+R)

## 📋 Checklist

- [ ] Deployed to Netlify (via dashboard or CLI)
- [ ] Added all required environment variables
- [ ] Build completed successfully
- [ ] Site is accessible at `your-site.netlify.app`
- [ ] Tested admin dashboard
- [ ] Tested image uploads
- [ ] Verified Supabase connections work
- [ ] (Optional) Added custom domain

## 🎉 You're Done!

Once your site is deployed and working:
- ✅ Every push to GitHub = Automatic deployment
- ✅ Your site is live and accessible
- ✅ All features should work (admin dashboard, image uploads, etc.)

## 📚 Helpful Links

- Netlify Dashboard: https://app.netlify.com
- Netlify Docs: https://docs.netlify.com
- Supabase Dashboard: https://supabase.com/dashboard
- Your GitHub Repo: https://github.com/kevinzava1925/ProFitness-website

---

**Status**: Ready to deploy! Follow Step 1 to get started! 🚀




