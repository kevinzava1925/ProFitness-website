import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utils/jwt';
import { rateLimit, getClientIP } from '@/utils/rateLimit';

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pro-fitness.co.zw';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const clientIP = getClientIP(request);
    if (!rateLimit(`admin-login-${clientIP}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if credentials match
    if (email !== ADMIN_EMAIL) {
      // Use same error message to prevent email enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    let passwordValid = false;
    
    if (ADMIN_PASSWORD_HASH) {
      // If password hash is set, use bcrypt to verify
      passwordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } else {
      // Fallback: check against plain text (INSECURE - should only be for initial setup)
      // This should be removed once ADMIN_PASSWORD_HASH is set
      console.warn('WARNING: Using plain text password check. Set ADMIN_PASSWORD_HASH environment variable!');
      const fallbackPassword = process.env.ADMIN_PASSWORD || 'admin123';
      passwordValid = password === fallbackPassword;
    }

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token with admin flag
    const token = await generateToken({
      userId: 'admin',
      email: ADMIN_EMAIL,
      isAdmin: true,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: ADMIN_EMAIL,
        isAdmin: true,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

