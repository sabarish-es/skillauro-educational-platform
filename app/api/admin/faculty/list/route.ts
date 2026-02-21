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
              f.department, f.specialization
       FROM users u
       LEFT JOIN faculties f ON u.id = f.user_id
       WHERE u.role = 'faculty'
       ORDER BY u.created_at DESC`
    ) as any;

    await connection.end();

    const faculties = (rows as any[]).map((row) => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      userId: row.user_id,
      department: row.department || 'N/A',
      specialization: row.specialization || 'N/A',
      phone: row.phone,
      courses: 0, // This would come from a count query in production
    }));

    return NextResponse.json({ faculties }, { status: 200 });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
