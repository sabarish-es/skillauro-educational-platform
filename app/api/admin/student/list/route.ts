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
      `SELECT u.id, u.name, u.email, u.user_id, u.phone, 
              s.enrollment_number, s.batch
       FROM users u
       LEFT JOIN students s ON u.id = s.user_id
       WHERE u.role = 'student'
       ORDER BY u.created_at DESC`
    ) as any;

    await connection.end();

    const students = (rows as any[]).map((row) => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      userId: row.user_id,
      enrollmentNumber: row.enrollment_number || 'N/A',
      batch: row.batch || 'N/A',
      phone: row.phone,
      enrolledCourses: 0, // This would come from a count query in production
      feesPaid: false, // This would come from fees table in production
    }));

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
