import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';

export interface AuthUser {
  userId: string;
  email: string;
  isAdmin?: boolean;
}

/**
 * Verify authentication token from request headers
 */
export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return null;
    }

    return {
      userId: decoded.userId || '',
      email: decoded.email || '',
      isAdmin: decoded.isAdmin || false,
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

/**
 * Check if user is authenticated (for API routes)
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await verifyAuth(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

/**
 * Check if user is admin (for API routes)
 */
export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
  const user = await requireAuth(request);
  
  // Check if user is admin from token
  // For now, we'll check if email matches admin email or if isAdmin flag is set
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pro-fitness.co.zw';
  
  if (!user.isAdmin && user.email !== ADMIN_EMAIL) {
    throw new Error('Forbidden: Admin access required');
  }
  
  return user;
}
