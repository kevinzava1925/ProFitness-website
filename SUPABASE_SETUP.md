# Supabase Setup Guide

This guide will help you set up Supabase database for your ProFitness website so that content changes persist across all devices.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Sign up with GitHub, Google, or email

## Step 2: Create a New Project

1. Click "New Project"
2. Fill in the project details:
   - **Name**: ProFitness (or any name you prefer)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the region closest to your users
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be created

## Step 3: Get Your API Keys

1. Once your project is ready, go to **Settings** (gear icon in the left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - **Keep this secret!**

## Step 4: Create the Database Table

1. Go to **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy and paste this SQL:

```sql
-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on type for faster queries
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);

-- Enable Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON content
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- For now, we'll allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON content
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 5: Add Environment Variables

1. In your project root, open `.env.local` (create it if it doesn't exist)
2. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace:
- `xxxxx` with your actual project reference
- The keys with your actual keys from Step 3

**Important**: 
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe to expose (they're public)
- `SUPABASE_SERVICE_ROLE_KEY` is **secret** - never commit it to GitHub!

## Step 6: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Make sure to add them for **Production**, **Preview**, and **Development**
5. Click **Save**

## Step 7: Test the Setup

1. Restart your local development server:
   ```bash
   npm run dev
   ```

2. Go to your admin dashboard: `http://localhost:3001/admin/dashboard`
3. Make a change (e.g., edit a class or event)
4. Check if it saves successfully
5. Open the site in another browser/device
6. Verify the changes appear there too!

## Troubleshooting

### Error: "Supabase not configured"
- Make sure your `.env.local` file has all three environment variables
- Restart your dev server after adding environment variables

### Error: "relation 'content' does not exist"
- Go back to Step 4 and make sure you ran the SQL query successfully
- Check the **Table Editor** in Supabase to see if the `content` table exists

### Changes not syncing across devices
- Make sure you added the environment variables to Vercel (Step 6)
- Redeploy your Vercel site after adding the variables
- Check the browser console for any errors

### Database connection issues
- Verify your Supabase project is active (not paused)
- Check that your API keys are correct
- Make sure your IP isn't blocked (free tier allows all IPs by default)

## Free Tier Limits

Supabase free tier includes:
- ✅ 500 MB database storage
- ✅ 1 GB file storage
- ✅ 2 million monthly API requests
- ✅ Unlimited projects

This is more than enough for your website! You'll only store text and image URLs (images are on Cloudinary).

## Next Steps

Once everything is working:
1. Your content will automatically sync across all devices
2. Changes made in the admin dashboard will appear on the live site
3. No more localStorage issues!

If you need help, check the Supabase documentation: https://supabase.com/docs







