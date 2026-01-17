import bcrypt from 'bcryptjs';
import { createServerClient } from '@/utils/supabase';

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

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  membership_type: 'Basic' | 'Premium' | 'Elite';
  membership_status: 'Active' | 'Inactive' | 'Expired';
  created_at: string;
  upcoming_classes: number | null;
  personal_training_sessions: number | null;
}

function mapRowToUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name ?? undefined,
    membershipType: row.membership_type,
    membershipStatus: row.membership_status,
    createdAt: row.created_at,
    upcomingClasses: row.upcoming_classes ?? undefined,
    personalTrainingSessions: row.personal_training_sessions ?? undefined,
  };
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
  const supabase = createServerClient();
  const normalizedEmail = email.toLowerCase();

  const { data: existingUser } = await supabase
    .from('app_users')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hashPassword(password);
  const newUserRow = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password_hash: passwordHash,
    name: name || email.split('@')[0],
    membership_type: 'Basic',
    membership_status: 'Active',
    created_at: new Date().toISOString(),
    upcoming_classes: 0,
    personal_training_sessions: 0,
  };

  const { data, error } = await supabase
    .from('app_users')
    .insert(newUserRow)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create user');
  }

  return mapRowToUser(data as UserRow);
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | undefined> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return undefined;
  }

  return mapRowToUser(data as UserRow);
}

// Find user by ID
export async function findUserById(id: string): Promise<User | undefined> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    return undefined;
  }

  return mapRowToUser(data as UserRow);
}

// Update user
export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  const supabase = createServerClient();
  const updatePayload: Partial<UserRow> = {
    email: updates.email,
    password_hash: updates.passwordHash,
    name: updates.name ?? null,
    membership_type: updates.membershipType,
    membership_status: updates.membershipStatus,
    upcoming_classes: updates.upcomingClasses ?? null,
    personal_training_sessions: updates.personalTrainingSessions ?? null,
  };

  Object.keys(updatePayload).forEach((key) => {
    if (updatePayload[key as keyof UserRow] === undefined) {
      delete updatePayload[key as keyof UserRow];
    }
  });

  const { data, error } = await supabase
    .from('app_users')
    .update(updatePayload)
    .eq('id', userId)
    .select()
    .single();

  if (error || !data) {
    return null;
  }

  return mapRowToUser(data as UserRow);
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return user;
}

