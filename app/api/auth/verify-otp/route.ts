import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Verify OTP
    const [otpRecords] = await connection.execute(
      `SELECT otp, expires_at FROM password_reset_otp 
       WHERE email = ? AND otp = ? AND expires_at > NOW()`,
      [email, otp]
    ) as any;

    await connection.end();

    if (!otpRecords || otpRecords.length === 0) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'OTP verified successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
