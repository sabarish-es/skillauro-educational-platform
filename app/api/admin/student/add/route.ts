import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { generateStudentUserId } from '@/lib/user-id-generator';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, enrollmentNumber, batch, phone, address, password } = body;

    if (!name || !email || !enrollmentNumber || !batch || !phone || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const userId = generateStudentUserId();

    try {
      const [result] = await connection.execute(
        `INSERT INTO users (email, user_id, password, name, role, phone, status, email_verified) 
         VALUES (?, ?, ?, ?, 'student', ?, 'active', TRUE)`,
        [email, userId, password, name, phone]
      );

      const userId_num = (result as any).insertId;

      await connection.execute(
        `INSERT INTO students (user_id, enrollment_number, batch) 
         VALUES (?, ?, ?)`,
        [userId_num, enrollmentNumber, batch]
      );

      // Send confirmation email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Welcome to Skillauro - Student Registration Confirmed',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Welcome to Skillauro!</h2>
              <p>Dear ${name},</p>
              <p>Your student account has been successfully created.</p>
              <div style="background: #f0f4f8; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p><strong>Login Credentials:</strong></p>
                <p><strong>Email/User ID:</strong> ${userId}</p>
                <p><strong>Enrollment Number:</strong> ${enrollmentNumber}</p>
                <p><strong>Batch:</strong> ${batch}</p>
                <p><strong>Role:</strong> Student</p>
              </div>
              <p>You can now log in to the Skillauro platform using your email and the password you set during registration.</p>
              <p style="color: #666; font-size: 14px;">If you have any questions, please contact our support team.</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999;">© 2024 Skillauro Educational Platform. All rights reserved.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('[v0] Email sending failed:', emailError);
        // Continue - student is already created
      }

      await connection.end();

      return NextResponse.json(
        {
          message: 'Student added successfully',
          userId,
          email,
          enrollmentNumber,
          batch,
        },
        { status: 201 }
      );
    } catch (queryError: any) {
      await connection.end();
      console.error('[v0] Database query error:', queryError);
      
      if (queryError.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { message: 'Email or enrollment number already exists' },
          { status: 400 }
        );
      }
      throw queryError;
    }
  } catch (error: any) {
    console.error('[v0] Error adding student:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
