import { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// For production, consider using Redis-based solution like @upstash/ratelimit

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Simple rate limiter
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const key = identifier;
  
  if (!store[key] || now > store[key].resetTime) {
    // Reset or create new entry
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true;
  }
  
  if (store[key].count >= maxRequests) {
    return false;
  }
  
  store[key].count++;
  return true;
}

/**
 * Get client IP from request
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIP || 'unknown';
  return ip.trim();
}

