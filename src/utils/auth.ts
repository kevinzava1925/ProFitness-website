// Client-side authentication utilities

export interface User {
  id: string;
  email: string;
  name?: string;
  membershipType: 'Basic' | 'Premium' | 'Elite';
  membershipStatus: 'Active' | 'Inactive' | 'Expired';
  createdAt: string;
  upcomingClasses?: number;
  personalTrainingSessions?: number;
}

const TOKEN_KEY = 'profitness_auth_token';
const USER_KEY = 'profitness_user';

// Save token and user to localStorage
export function saveAuth(token: string, user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

// Get token from localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

// Get user from localStorage
export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
  }
  return null;
}

// Clear auth data
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getToken() !== null && getUser() !== null;
}

// Make authenticated API request
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge existing headers
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

