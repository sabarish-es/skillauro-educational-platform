import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, description, instructor, duration, credits, maxStudents, level, status } = body;

    if (!name || !code || !instructor || !duration || !credits || !maxStudents) {
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

    const [result] = await connection.execute(
      `INSERT INTO courses (code, name, description, duration, credits, max_students, level, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, description || '', duration, credits, maxStudents, level || 'Beginner', status || 'Active']
    ) as any;

    await connection.end();

    return NextResponse.json(
      {
        message: 'Course added successfully',
        courseId: (result).insertId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Course add error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add course' },
      { status: 500 }
    );
  }
}
