import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, password } = await request.json();

    if (!email || !otp || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Verify OTP one more time
    const [otpRecords] = await connection.execute(
      `SELECT otp FROM password_reset_otp 
       WHERE email = ? AND otp = ? AND expires_at > NOW()`,
      [email, otp]
    ) as any;

    if (!otpRecords || otpRecords.length === 0) {
      await connection.end();
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    const [result] = await connection.execute(
      `UPDATE users SET password = ?, password_last_changed = NOW() WHERE email = ?`,
      [hashedPassword, email]
    ) as any;

    // Delete used OTP
    await connection.execute(
      'DELETE FROM password_reset_otp WHERE email = ?',
      [email]
    ) as any;

    await connection.end();

    if ((result).affectedRows === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Password reset successfully. Please login with your new password.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to reset password' },
      { status: 500 }
    );
  }
}
