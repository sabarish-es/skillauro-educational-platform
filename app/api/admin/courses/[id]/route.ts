import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Course ID is required' },
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
      `DELETE FROM courses WHERE id = ?`,
      [id]
    ) as any;

    await connection.end();

    if ((result).affectedRows === 0) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Course delete error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to delete course' },
      { status: 500 }
    );
  }
}
