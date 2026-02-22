import { cookies } from 'next/headers';
import { getOne, executeQuery } from './db-config';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authenticate user from database
export async function authenticate(
  identifier: string, // Can be email, user_id, or enrollment_number
  password: string,
  role: string
) {
  try {
    let user = null;

    // First, try to find user by email or user_id
    user = await getOne(
      'SELECT id, email, user_id, password, name, role, phone, status FROM users WHERE (email = ? OR user_id = ?) AND role = ?',
      [identifier, identifier, role]
    ) as any;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new Error('Account is inactive');
    }

    // For demo purposes, compare plain text passwords
    // In production, use bcrypt: const isValid = await bcrypt.compare(password, user.password);
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      user_id: user.user_id,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('[v0] Authentication error:', error);
    throw new Error('Invalid credentials or database error');
  }
}

export async function setAuthCookie(
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  }
) {
  const cookieStore = await cookies();
  const token = Buffer.from(JSON.stringify(user)).toString('base64');
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return null;
  }

  try {
    const user = JSON.parse(Buffer.from(token.value, 'base64').toString());
    return user;
  } catch (error) {
    return null;
  }
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
