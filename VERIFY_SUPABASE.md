# Supabase Verification Guide

## ✅ Local Setup Verified

Your Supabase connection is working correctly! The test script confirmed:
- ✅ All environment variables are set
- ✅ Database connection works
- ✅ Table "content" exists
- ✅ Read and write access work

## Next Steps

### 1. Verify Vercel Environment Variables

Your local setup works, but you need to add the same environment variables to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **ProFitness** project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables (same values as in `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Make sure they're enabled for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
6. Click **Save**
7. **Redeploy** your site (or wait for the next automatic deployment)

### 2. Test the API Locally

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and go to: `http://localhost:3001/api/content`
   - You should see: `{}` (empty object if no content yet)
   - If you see an error, check the browser console

3. Test the admin dashboard:
   - Go to: `http://localhost:3001/admin/dashboard`
   - Make a change (e.g., edit a class name)
   - Check the browser console for any errors
   - Refresh the page - your change should persist

### 3. Test on Vercel (After Adding Environment Variables)

1. After adding environment variables to Vercel and redeploying:
2. Go to your live site: `https://your-site.vercel.app`
3. Open the admin dashboard
4. Make a test change
5. Open the site in an incognito window or different device
6. The change should appear there too!

### 4. Verify Data is Being Saved

1. Go to your Supabase dashboard
2. Navigate to **Table Editor** → **content**
3. Make a change in your admin dashboard
4. Refresh the Supabase table - you should see new records appear!

## Troubleshooting

### Changes Not Persisting

**Check 1: Environment Variables in Vercel**
- Go to Vercel → Settings → Environment Variables
- Make sure all three Supabase variables are there
- Redeploy after adding them

**Check 2: Browser Console Errors**
- Open browser DevTools (F12)
- Go to Console tab
- Look for any red errors
- Common errors:
  - "Database not configured" → Environment variables missing
  - "Failed to fetch" → API route error
  - "Invalid signature" → Cloudinary issue (different problem)

**Check 3: Network Tab**
- Open browser DevTools → Network tab
- Make a change in admin dashboard
- Look for a request to `/api/content`
- Check if it returns 200 (success) or an error

**Check 4: Supabase Dashboard**
- Go to Supabase → Table Editor → content
- If the table is empty, data isn't being saved
- Check Supabase → Logs for any errors

### API Returns Empty Object `{}`

This is normal if you haven't added any content yet. Try:
1. Go to admin dashboard
2. Add or edit a class/event
3. Refresh the API endpoint - you should see data

### Still Having Issues?

Run the test script again:
```bash
node test-supabase.js
```

If it passes, the issue is likely:
- Environment variables not set in Vercel
- Need to redeploy Vercel after adding variables
- Browser cache (try hard refresh: Cmd+Shift+R or Ctrl+Shift+R)

## Quick Test Checklist

- [ ] Local test script passes (`node test-supabase.js`)
- [ ] Environment variables added to Vercel
- [ ] Vercel site redeployed after adding variables
- [ ] Can access `/api/content` endpoint (returns `{}` or data)
- [ ] Admin dashboard saves changes without errors
- [ ] Changes appear in Supabase Table Editor
- [ ] Changes persist after page refresh
- [ ] Changes appear on different devices/browsers

## Success Indicators

✅ **Working correctly if:**
- Admin dashboard saves show "success" messages
- No errors in browser console
- Data appears in Supabase table
- Changes persist after refresh
- Changes sync across devices

❌ **Not working if:**
- Browser console shows "Database not configured"
- API returns 500 errors
- Changes disappear after refresh
- Supabase table stays empty



