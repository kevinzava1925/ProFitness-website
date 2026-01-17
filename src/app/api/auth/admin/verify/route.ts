import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, requireAdmin } from '@/utils/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request);
    
    return NextResponse.json({
      authenticated: true,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}


