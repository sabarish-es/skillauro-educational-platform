import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(
      `SELECT id, code, name, description, duration, credits, max_students as maxStudents, 
              level, status, created_at FROM courses ORDER BY created_at DESC`
    ) as any;

    await connection.end();

    const courses = (rows as any[]).map((course) => ({
      id: course.id.toString(),
      code: course.code,
      name: course.name,
      description: course.description,
      duration: course.duration,
      credits: course.credits,
      maxStudents: course.maxStudents,
      level: course.level,
      status: course.status,
      instructor: 'TBD', // Will be linked to faculty in future
      students: 0, // Will be linked to enrollments in future
    }));

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error: any) {
    console.error('Course list error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
