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

    // Join with faculties and users to get instructor information
    const [rows] = await connection.execute(
      `SELECT c.id, c.code, c.name, c.description, c.duration_weeks as duration, c.credits, c.max_students as maxStudents, 
              c.status, c.faculty_id, c.created_at, u.name as instructor
       FROM courses c
       LEFT JOIN faculties f ON c.faculty_id = f.id
       LEFT JOIN users u ON f.user_id = u.id
       WHERE c.status != 'draft'
       ORDER BY c.created_at DESC`
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
      level: 'Intermediate',
      status: course.status,
      instructor: course.instructor || 'TBD',
      imageUrl: '/course-default.jpg',
      students: 0,
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
