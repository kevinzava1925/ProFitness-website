import { NextResponse } from 'next/server';
import { createUser } from '@/utils/users';
import { generateToken } from '@/utils/jwt';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

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

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const user = await createUser(email, password, name);

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Return user data (without password hash) and token
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    if (error instanceof Error && error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

