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
      `SELECT f.id, u.name, u.email, f.department, f.specialization 
       FROM faculties f
       JOIN users u ON f.user_id = u.id
       WHERE u.status = 'active'
       ORDER BY u.name ASC`
    ) as any;

    await connection.end();

    const faculties = (rows as any[]).map((faculty) => ({
      id: faculty.id.toString(),
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
      specialization: faculty.specialization,
    }));

    return NextResponse.json({ faculties }, { status: 200 });
  } catch (error: any) {
    console.error('[v0] Faculty list error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch faculties' },
      { status: 500 }
    );
  }
}
