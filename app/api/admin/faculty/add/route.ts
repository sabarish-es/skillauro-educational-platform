import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { generateFacultyUserId } from '@/lib/user-id-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, department, specialization, phone, address } = body;

    if (!name || !email || !department || !specialization || !phone) {
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

    const userId = generateFacultyUserId();
    const tempPassword = 'TempPass@2024';

    const [result] = await connection.execute(
      `INSERT INTO users (email, user_id, password, name, role, phone, status) 
       VALUES (?, ?, ?, ?, 'faculty', ?, 'active')`,
      [email, userId, tempPassword, name, phone]
    );

    const userId_num = (result as any).insertId;

    await connection.execute(
      `INSERT INTO faculties (user_id, department, specialization) 
       VALUES (?, ?, ?)`,
      [userId_num, department, specialization]
    );

    await connection.end();

    return NextResponse.json(
      {
        message: 'Faculty added successfully',
        userId,
        email,
        tempPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding faculty:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
