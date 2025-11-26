import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  membershipType: 'Basic' | 'Premium' | 'Elite';
  membershipStatus: 'Active' | 'Inactive' | 'Expired';
  createdAt: string;
  upcomingClasses?: number;
  personalTrainingSessions?: number;
}

const USERS_FILE = join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

// Initialize users file if it doesn't exist
function initUsersFile() {
  ensureDataDirectory();
  if (!existsSync(USERS_FILE)) {
    writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
}

// Read users from file
function readUsers(): User[] {
  initUsersFile();
  try {
    const data = readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write users to file
function writeUsers(users: User[]): void {
  ensureDataDirectory();
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create new user
export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<User> {
  const users = readUsers();
  
  // Check if user already exists
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    passwordHash,
    name: name || email.split('@')[0],
    membershipType: 'Basic',
    membershipStatus: 'Active',
    createdAt: new Date().toISOString(),
    upcomingClasses: 0,
    personalTrainingSessions: 0,
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
}

// Find user by email
export function findUserByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Find user by ID
export function findUserById(id: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.id === id);
}

// Update user
export function updateUser(userId: string, updates: Partial<User>): User | null {
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = { ...users[userIndex], ...updates };
  writeUsers(users);
  return users[userIndex];
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return user;
}

