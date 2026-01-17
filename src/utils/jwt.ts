import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '192525';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days
const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  isAdmin?: boolean;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

