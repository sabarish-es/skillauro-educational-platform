import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { generateUserId } from '@/lib/user-id-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, enrollmentNumber, batch, phone, address } = body;

    if (!name || !email || !enrollmentNumber || !batch || !phone) {
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

    const userId = generateUserId('student');
    const tempPassword = 'TempPass@2024';

    const [result] = await connection.execute(
      `INSERT INTO users (email, user_id, password, name, role, phone, status) 
       VALUES (?, ?, ?, ?, 'student', ?, 'active')`,
      [email, userId, tempPassword, name, phone]
    );

    const userId_num = (result as any).insertId;

    await connection.execute(
      `INSERT INTO students (user_id, enrollment_number, batch) 
       VALUES (?, ?, ?)`,
      [userId_num, enrollmentNumber, batch]
    );

    await connection.end();

    return NextResponse.json(
      {
        message: 'Student added successfully',
        userId,
        email,
        tempPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
