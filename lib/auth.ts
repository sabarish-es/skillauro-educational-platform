import { cookies } from 'next/headers';
import { getOne } from './db-config';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authenticate user from database
export async function authenticate(
  email: string,
  password: string,
  role: string
) {
  try {
    const user = await getOne(
      'SELECT id, email, password, name, role, phone FROM users WHERE email = ? AND role = ?',
      [email, role]
    ) as any;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // For demo purposes, compare plain text passwords
    // In production, use bcrypt: const isValid = await bcrypt.compare(password, user.password);
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
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
