# Firebase Deployment Guide

## Prerequisites
1. A Firebase account (sign up at https://firebase.google.com)
2. Node.js and npm installed

## Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

Or use the local version:
```bash
npx firebase-tools login
```

## Step 2: Login to Firebase
```bash
npx firebase login
```

This will open your browser to authenticate with your Google account.

## Step 3: Initialize Firebase Project
```bash
npx firebase init hosting
```

When prompted:
- **Select an existing Firebase project** or create a new one
- **What do you want to use as your public directory?** → `out` (this is where Next.js exports static files)
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds and deploys with GitHub?** → `No` (you can set this up later)

## Step 4: Update .firebaserc
Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID.

## Step 5: Build Your Site
```bash
npm run build
```

This will create a static export in the `out` directory.

## Step 6: Deploy to Firebase
```bash
npm run firebase:deploy
```

Or manually:
```bash
npx firebase deploy --only hosting
```

## Step 7: Access Your Live Site
After deployment, Firebase will provide you with a URL like:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

## Important Notes

### API Routes Limitation
⚠️ **Note**: The static export doesn't support Next.js API routes. The `/api/upload` route won't work with static export.

**Solutions:**
1. **Use Cloudinary's client-side upload** (recommended for static sites)
2. **Use Firebase Functions** for server-side API routes
3. **Use a separate backend service** for API endpoints

### Environment Variables
Make sure to set your environment variables in Firebase Hosting:
- Go to Firebase Console → Hosting → Environment Variables
- Add your Cloudinary credentials there

Or use Firebase Functions for server-side environment variables.

## Custom Domain
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify your domain

## Continuous Deployment
To set up automatic deployments:
1. Connect your GitHub repository to Firebase
2. Enable automatic deployments in Firebase Console
3. Every push to your main branch will automatically deploy

## Troubleshooting

### Build Errors
If you encounter build errors:
```bash
rm -rf .next out node_modules
npm install
npm run build
```

### Deployment Errors
If deployment fails:
```bash
npx firebase deploy --only hosting --debug
```

## Useful Commands
- `npm run firebase:serve` - Test locally before deploying
- `npx firebase hosting:channel:deploy preview` - Deploy to a preview channel
- `npx firebase open hosting:site` - Open your site in browser


