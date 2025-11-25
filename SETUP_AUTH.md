# Quick Setup Guide - Authentication System

## ✅ What's Been Implemented

1. **Authentication System**
   - User registration with email/password
   - Secure login with JWT tokens
   - Password hashing with bcrypt
   - Session persistence

2. **API Routes**
   - `/api/auth/register` - Create new account
   - `/api/auth/login` - Login
   - `/api/auth/me` - Get current user (protected)

3. **Updated Member Area**
   - Real authentication (no more demo)
   - Registration form
   - Login form
   - User dashboard with real data
   - Logout functionality

## 🚀 Quick Start

### 1. Set Environment Variable

Create a `.env.local` file in the root directory:

```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**For production**, generate a strong secret:
```bash
openssl rand -base64 32
```

Or set it in Vercel:
- Go to Project Settings → Environment Variables
- Add `JWT_SECRET` with a strong random value

### 2. Data Directory

The `data/` directory will be created automatically when the first user registers.

### 3. Test It

1. Start your dev server: `npm run dev`
2. Go to `/member-area`
3. Click "Create an account"
4. Register with email and password
5. You'll be automatically logged in!

## 📝 How It Works

### Registration Flow
1. User fills registration form
2. Password is hashed with bcrypt
3. User account created in `data/users.json`
4. JWT token generated
5. Token and user data saved to localStorage
6. User redirected to dashboard

### Login Flow
1. User enters email/password
2. Password verified against hash
3. JWT token generated
4. Token and user data saved
5. User sees dashboard

### Session Persistence
- Token stored in localStorage
- Valid for 7 days
- Automatically checked on page load
- Invalid tokens are cleared

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with expiration
- ✅ Input validation
- ✅ Secure error messages
- ✅ Token-based API authentication

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts      # Login endpoint
│   │       ├── register/route.ts   # Registration endpoint
│   │       └── me/route.ts         # Get current user
│   └── member-area/
│       └── page.tsx                 # Updated member area
└── utils/
    ├── auth.ts                      # Client-side auth utilities
    ├── jwt.ts                       # JWT token management
    └── users.ts                     # User data management

data/
└── users.json                       # User database (auto-created)
```

## 🎯 Next Steps (Optional)

1. **Add Password Reset**
   - Email verification
   - Reset token generation

2. **Upgrade to Database**
   - Replace JSON file with PostgreSQL/MongoDB
   - Better for production scale

3. **Add Features**
   - Profile editing
   - Password change
   - Email verification
   - 2FA

## ⚠️ Important Notes

1. **JWT_SECRET**: Must be set for authentication to work
2. **User Data**: Stored in `data/users.json` (excluded from Git)
3. **Production**: Consider upgrading to a real database
4. **Security**: Change default JWT_SECRET in production!

## 🐛 Troubleshooting

**"Token invalid" error:**
- Check JWT_SECRET is set
- Token may have expired (login again)

**"User not found" error:**
- Check data/users.json exists
- Verify user was created successfully

**Registration fails:**
- Check password is at least 6 characters
- Verify email format is valid
- Check server logs for errors

## 📚 Full Documentation

See `AUTHENTICATION_GUIDE.md` for complete documentation.

