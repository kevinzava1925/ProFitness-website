# Authentication System Guide

## Overview

The member area now has a production-ready authentication system with:
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token-based authentication
- ✅ User registration and login
- ✅ Session persistence
- ✅ Protected API routes
- ✅ User data management

## Features

### Authentication
- **Registration**: Users can create accounts with email and password
- **Login**: Secure authentication with JWT tokens
- **Session Management**: Tokens stored in localStorage, persist across sessions
- **Password Security**: Passwords are hashed with bcrypt (10 rounds)

### User Data
- User accounts stored in `data/users.json` (can be upgraded to database)
- Each user has:
  - Unique ID
  - Email (used for login)
  - Hashed password
  - Name (optional)
  - Membership type (Basic, Premium, Elite)
  - Membership status (Active, Inactive, Expired)
  - Class bookings count
  - Personal training sessions count

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Important**: For production, generate a strong secret:
```bash
openssl rand -base64 32
```

### 2. Data Directory

The `data/` directory is automatically created. User data is stored in `data/users.json`.

**Note**: `data/users.json` is in `.gitignore` to keep user data private.

## API Endpoints

### POST `/api/auth/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123...",
    "email": "user@example.com",
    "name": "John Doe",
    "membershipType": "Basic",
    "membershipStatus": "Active",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET `/api/auth/me`
Get current user data (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user_123...",
    "email": "user@example.com",
    ...
  }
}
```

## Usage

### For Users

1. **Register**: Go to `/member-area` and click "Create an account"
2. **Login**: Enter email and password
3. **Dashboard**: View membership info, classes, and training sessions
4. **Logout**: Click logout button

### For Developers

#### Client-Side Auth Utilities

```typescript
import { saveAuth, clearAuth, getUser, isAuthenticated, authenticatedFetch } from '@/utils/auth';

// Save auth after login
saveAuth(token, user);

// Get current user
const user = getUser();

// Check if authenticated
if (isAuthenticated()) {
  // User is logged in
}

// Make authenticated API request
const response = await authenticatedFetch('/api/auth/me');

// Logout
clearAuth();
```

#### Server-Side User Management

```typescript
import { createUser, findUserByEmail, updateUser } from '@/utils/users';

// Create user
const user = await createUser('email@example.com', 'password', 'Name');

// Find user
const user = findUserByEmail('email@example.com');

// Update user
updateUser(userId, { membershipType: 'Premium' });
```

## Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt (10 salt rounds)
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 7 days
4. **Input Validation**: Email format and password strength validation
5. **Error Handling**: Secure error messages (no password leaks)

## Production Considerations

### Current Setup (Development)
- User data stored in JSON file (`data/users.json`)
- Suitable for development and small deployments
- **Limitations**: Not suitable for high-traffic or multi-server deployments

### Recommended Upgrades for Production

1. **Database Integration**
   - Replace JSON file with a real database:
     - PostgreSQL (recommended)
     - MongoDB
     - Supabase
     - Firebase Firestore

2. **Environment Variables**
   - Set `JWT_SECRET` in Vercel environment variables
   - Use strong, randomly generated secret
   - Never commit secrets to Git

3. **Additional Security**
   - Add rate limiting to login/register endpoints
   - Implement password reset functionality
   - Add email verification
   - Consider 2FA for sensitive accounts

4. **Session Management**
   - Consider using httpOnly cookies instead of localStorage
   - Implement token refresh mechanism
   - Add CSRF protection

5. **User Management**
   - Admin panel for user management
   - User profile editing
   - Password change functionality

## Migration to Database

To migrate from JSON file to a database:

1. **Choose a database** (e.g., PostgreSQL, MongoDB)
2. **Update `src/utils/users.ts`**:
   - Replace file operations with database queries
   - Use database client (e.g., Prisma, Mongoose)
3. **Update environment variables**:
   - Add database connection string
4. **Migrate existing users** (if any):
   - Export from JSON
   - Import to database

## Troubleshooting

### "User data not persisting"
- Check that `data/` directory exists
- Verify write permissions
- Check server logs for errors

### "Token invalid or expired"
- Token may have expired (7 days)
- User needs to login again
- Check `JWT_SECRET` is set correctly

### "Password not working"
- Passwords are hashed, cannot be recovered
- Users must use "Forgot Password" (to be implemented)
- Or reset via admin panel

## Next Steps

1. ✅ Basic authentication - **DONE**
2. ⏳ Password reset functionality
3. ⏳ Email verification
4. ⏳ Admin user management
5. ⏳ Database integration
6. ⏳ Profile editing
7. ⏳ Class booking integration
8. ⏳ Payment integration

## Support

For issues or questions:
- Check server logs for errors
- Verify environment variables are set
- Ensure data directory has proper permissions
- Review API endpoint responses for error messages

