import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, name, user_id, password, role } = await request.json();

    // Validate input
    if (!email || !name || !user_id || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter - Configure with your email service
    // For now using environment variables (set these in your .env or Vercel project)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    // Email template
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; }
            .content { background: #f9f9f9; padding: 20px; border-bottom: 1px solid #ddd; }
            .credentials { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; }
            .credentials-item { margin: 10px 0; }
            .label { font-weight: bold; color: #667eea; }
            .footer { background: #f9f9f9; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Skillauro!</h1>
              <p>Your account has been created</p>
            </div>
            
            <div class="content">
              <p>Dear ${name},</p>
              <p>Welcome to the Skillauro Educational Platform! Your ${roleLabel} account has been successfully created.</p>
              
              <div class="credentials">
                <h3 style="color: #667eea; margin-top: 0;">Your Login Credentials</h3>
                <div class="credentials-item">
                  <span class="label">User ID:</span> ${user_id}
                </div>
                <div class="credentials-item">
                  <span class="label">Password:</span> ${password}
                </div>
                <div class="credentials-item">
                  <span class="label">Login URL:</span> <a href="https://skillauro.com/login">https://skillauro.com/login</a>
                </div>
              </div>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 4px;">
                <p style="margin: 0; color: #856404;">
                  <strong>Important:</strong> Please change your password after your first login for security purposes.
                </p>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Visit the Skillauro platform and log in with your credentials</li>
                <li>Complete your profile information</li>
                <li>Change your password to something more secure</li>
                ${role === 'student' ? '<li>Enroll in your courses</li>' : ''}
                ${role === 'faculty' ? '<li>Set up your courses and class schedule</li>' : ''}
              </ul>
              
              <a href="https://skillauro.com/login" class="button">Go to Skillauro Platform</a>
            </div>
            
            <div class="footer">
              <p>If you didn't request this account or have any questions, please contact our support team at management@skillauro.in</p>
              <p>Skillauro Educational Platform © 2024. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@skillauro.com',
      to: email,
      subject: `[Skillauro] Your ${roleLabel} Account Credentials`,
      html: htmlContent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Credentials email sent successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
