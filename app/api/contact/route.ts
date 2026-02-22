import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

// Configure email (using environment variables)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// POST - Handle contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await connection.execute(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status) 
       VALUES (?, ?, ?, ?, ?, 'new')`,
      [name, email, phone || null, subject, message]
    ) as any;

    await connection.end();

    // Send email to Skillauro
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'management@skillauro.com',
        subject: `New Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `,
        replyTo: email,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - message is saved to database
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully. We will contact you soon.',
        messageId: (result).insertId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const { getAuthUser } = await import('@/lib/auth');
    const { getAll } = await import('@/lib/db-config');

    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await getAll(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );

    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
