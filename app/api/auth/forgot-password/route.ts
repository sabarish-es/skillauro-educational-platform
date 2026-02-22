import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Check if user exists
    const [users] = await connection.execute(
      'SELECT id, name FROM users WHERE email = ?',
      [email]
    ) as any;

    if (!users || users.length === 0) {
      await connection.end();
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await connection.execute(
      `INSERT INTO password_reset_otp (email, otp, expires_at) 
       VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, expires_at=?`,
      [email, otp, otpExpiry, otp, otpExpiry]
    ) as any;

    await connection.end();

    // Send OTP email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('[v0] Email credentials not configured');
    } else {
      try {
        await transporter.sendMail({
          from: `Skillauro <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Password Reset OTP - Skillauro',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Password Reset Request</h2>
              <p>Hi ${users[0].name},</p>
              <p>You requested to reset your password. Use the OTP below:</p>
              <div style="background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <h1 style="letter-spacing: 5px; color: #2563eb; margin: 0;">${otp}</h1>
              </div>
              <p style="color: #666;">This OTP is valid for 10 minutes.</p>
              <p style="color: #666;">If you didn't request this, ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999;">© 2024 Skillauro. All rights reserved.</p>
            </div>
          `,
        });
        console.log('[v0] Password reset OTP sent to:', email);
      } catch (emailError: any) {
        console.error('[v0] Email sending failed:', emailError.message || emailError);
        console.log('[v0] OTP saved to database:', otp, 'for email:', email);
      }
    }

    return NextResponse.json(
      { message: 'OTP sent to your email' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
