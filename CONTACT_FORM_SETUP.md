# Contact Form Email Integration Setup Guide

## ✅ What's Been Implemented

1. **Resend Package** - Added to `package.json`
2. **API Routes** - Created contact form, messages, and recipients endpoints
3. **Contact Form** - Updated to submit to API with proper error handling
4. **Admin Dashboard** - Added Messages tab with full management interface
5. **Supabase Tables** - SQL migration file created

## 📋 Setup Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install the `resend` package that was added to `package.json`.

### Step 2: Create Supabase Tables

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase_contact_tables.sql` in this project
4. Copy and paste the entire SQL into the SQL Editor
5. Click **Run** to create the tables

This creates:
- `contact_messages` - Stores all contact form submissions
- `contact_recipients` - Stores email addresses that receive notifications

### Step 3: Get Resend API Key

1. Sign up/Login at https://resend.com
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "ProFitness Contact Form")
5. Copy the API key (starts with `re_`)

### Step 4: Add Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Navigate to **Site settings → Environment variables**
3. Add the following variables:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Contact Form <noreply@yourdomain.com>
CONTACT_EMAIL=fallback@example.com
```

**Important Notes:**
- `RESEND_FROM_EMAIL`: Use your verified domain in Resend, or use `onboarding@resend.dev` for testing
- `CONTACT_EMAIL`: This is a fallback if no recipients are configured in the admin dashboard
- Add these for **Production**, **Deploy previews**, and **Branch deploys**

### Step 5: Deploy Changes

```bash
git add .
git commit -m "Add contact form email integration with Resend and admin dashboard"
git push origin main
```

Netlify will automatically deploy the changes.

## 🎯 How It Works

### Contact Form Flow:
1. User submits contact form → Saves to Supabase `contact_messages` table
2. System fetches all active recipients from `contact_recipients` table
3. Email sent to all active recipients via Resend
4. User sees success/error message

### Admin Dashboard:
1. Go to `/admin/dashboard`
2. Click **Messages** tab
3. **View Messages**: See all contact form submissions with full details
4. **Manage Recipients**: 
   - Add email addresses that should receive notifications
   - Activate/Deactivate recipients
   - Delete recipients

## 📧 Adding Recipient Emails

### Via Admin Dashboard (Recommended):
1. Go to Admin Dashboard → Messages tab
2. In "Email Recipients" section, enter email address
3. Click "Add"
4. Recipient is now active and will receive all future contact form submissions

### Via Supabase (Alternative):
You can also add recipients directly in Supabase:
```sql
INSERT INTO contact_recipients (email, is_active) 
VALUES ('your-email@example.com', true);
```

## 🧪 Testing

1. **Test Contact Form:**
   - Go to `/contact` page
   - Fill out and submit the form
   - Check that you receive an email
   - Check Admin Dashboard → Messages tab to see the submission

2. **Test Admin Dashboard:**
   - Add a recipient email
   - Submit another test message
   - Verify email is received
   - Try deactivating a recipient and submitting again (should not receive email)

## 🔧 Troubleshooting

### Emails Not Sending:
1. Check Resend API key is correct in Netlify environment variables
2. Verify `RESEND_FROM_EMAIL` uses a verified domain (or `onboarding@resend.dev` for testing)
3. Check Resend dashboard for email logs and errors
4. Ensure at least one recipient is active in admin dashboard (or `CONTACT_EMAIL` is set)

### Messages Not Appearing in Dashboard:
1. Check Supabase tables were created correctly
2. Verify Supabase environment variables are set in Netlify
3. Check browser console for errors
4. Verify RLS policies allow service role to read messages

### Database Errors:
1. Ensure SQL migration was run successfully
2. Check Supabase connection in Netlify logs
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

## 📝 Features

✅ Contact form saves to database  
✅ Emails sent to multiple recipients  
✅ Admin dashboard to view all messages  
✅ Manage recipient emails from admin dashboard  
✅ Activate/Deactivate recipients  
✅ Delete messages and recipients  
✅ Full sender information displayed  
✅ Error handling and user feedback  

## 🚀 Next Steps

1. Run `npm install` to install Resend
2. Run the SQL migration in Supabase
3. Get Resend API key and add to Netlify
4. Deploy to Netlify
5. Add recipient emails via admin dashboard
6. Test the contact form!

---

**Status**: ✅ Ready to deploy! Follow the setup steps above.

