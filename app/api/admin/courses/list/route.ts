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
      `SELECT id, code, name, description, duration_weeks as duration, credits, max_students as maxStudents, 
              course_level as level, status, image_url as imageUrl, instructor_name as instructor, created_at 
       FROM courses 
       WHERE status != 'draft'
       ORDER BY created_at DESC`
    ) as any;

    await connection.end();

    const courses = (rows as any[]).map((course) => ({
      id: course.id.toString(),
      code: course.code,
      name: course.name,
      description: course.description,
      duration: course.duration || 12,
      credits: course.credits,
      maxStudents: course.maxStudents,
      level: course.level,
      status: course.status,
      instructor: course.instructor || 'TBD',
      imageUrl: course.imageUrl || '/course-default.jpg',
      students: 0, // Will be calculated from enrollments
    }));

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error: any) {
    console.error('[v0] Course list error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
