import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db-config';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Check if OTP exists and is valid
    try {
      const results = await executeQuery(
        `SELECT id, is_verified FROM email_verification_otp 
         WHERE email = ? AND otp = ? AND expires_at > NOW() AND is_verified = FALSE`,
        [email, otp]
      ) as any;

      if (!results || results.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      const otpId = results[0].id;

      // Mark OTP as verified
      await executeQuery(
        `UPDATE email_verification_otp SET is_verified = TRUE, used_at = NOW() WHERE id = ?`,
        [otpId]
      );

      // Update user email_verified status if they exist
      await executeQuery(
        `UPDATE users SET email_verified = TRUE WHERE email = ?`,
        [email]
      ).catch(() => {
        // User may not exist yet during registration
      });

      return NextResponse.json(
        {
          message: 'Email verified successfully',
          verified: true,
        },
        { status: 200 }
      );
    } catch (dbError: any) {
      console.error('[v0] Database error:', dbError);
      if (dbError.code === 'ER_NO_SUCH_TABLE') {
        return NextResponse.json(
          { error: 'Database not initialized' },
          { status: 500 }
        );
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error('[v0] Verify OTP error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
