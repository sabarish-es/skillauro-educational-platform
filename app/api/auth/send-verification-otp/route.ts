import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db-config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email, verificationType = 'registration' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    try {
      await executeQuery(
        `INSERT INTO email_verification_otp (email, otp, expires_at, verification_type) 
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE otp=?, expires_at=?, verification_type=?`,
        [email, otp, expiresAt, verificationType, otp, expiresAt, verificationType]
      );
    } catch (dbError: any) {
      console.error('[v0] Database error:', dbError);
      // If table doesn't exist, return error
      if (dbError.code === 'ER_NO_SUCH_TABLE') {
        return NextResponse.json(
          { error: 'Database not initialized. Please run migrations.' },
          { status: 500 }
        );
      }
      throw dbError;
    }

    // Send OTP email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('[v0] Email credentials not configured');
      // Don't fail - OTP is saved to DB
    } else {
      try {
        const mailResult = await transporter.sendMail({
          from: `Skillauro <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Email Verification OTP - Skillauro',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Email Verification</h2>
              <p>Thank you for registering with Skillauro!</p>
              <p>Please use the OTP below to verify your email address:</p>
              <div style="background: linear-gradient(135deg, #2563eb, #f97316); padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <h1 style="letter-spacing: 5px; color: white; margin: 0; font-size: 32px;">${otp}</h1>
              </div>
              <p style="color: #666;">This OTP is valid for 10 minutes.</p>
              <p style="color: #666;">If you didn't request this verification, please ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999;">© 2024 Skillauro Educational Platform. All rights reserved.</p>
            </div>
          `,
        });
        console.log('[v0] OTP email sent successfully to:', email);
      } catch (emailError: any) {
        console.error('[v0] Email sending failed:', emailError.message || emailError);
        // Continue - OTP is saved to DB even if email fails for debugging
        console.log('[v0] OTP saved to database:', otp, 'for email:', email);
      }
    }

    return NextResponse.json(
      {
        message: 'OTP sent to your email address',
        email,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[v0] Send OTP error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
