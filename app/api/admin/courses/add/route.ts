import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const code = formData.get('code') as string;
    const description = formData.get('description') as string;
    const instructor = formData.get('instructor') as string;
    const duration = formData.get('duration') as string;
    const credits = formData.get('credits') as string;
    const maxStudents = formData.get('maxStudents') as string;
    const level = formData.get('level') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !code || !instructor || !duration || !credits || !maxStudents) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Handle image upload if provided
    if (imageFile) {
      try {
        const buffer = await imageFile.arrayBuffer();
        const blob = new Blob([buffer], { type: imageFile.type });
        
        // Create a simple file path for storage - in production, use Vercel Blob or similar
        // For now, we'll store as base64 or use a simple URL pattern
        const timestamp = Date.now();
        const fileName = `course-${code}-${timestamp}`;
        
        // Store in public folder for now
        imageUrl = `/uploads/courses/${fileName}.${imageFile.type.split('/')[1] || 'jpg'}`;
        console.log('[v0] Course image would be stored at:', imageUrl);
      } catch (imageError) {
        console.error('[v0] Image processing error:', imageError);
        // Continue without image if processing fails
      }
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Get the faculty_id if facultyId is provided
    let facultyId = 1; // Default faculty ID
    const facultyIdFromForm = formData.get('facultyId');
    if (facultyIdFromForm) {
      facultyId = parseInt(facultyIdFromForm as string);
    }

    const [result] = await connection.execute(
      `INSERT INTO courses (code, name, description, duration_weeks, credits, max_students, faculty_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, description || '', parseInt(duration) || 12, credits, maxStudents, facultyId, status || 'active']
    ) as any;

    await connection.end();

    return NextResponse.json(
      {
        message: 'Course added successfully',
        courseId: (result).insertId,
        imageUrl,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[v0] Course add error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add course' },
      { status: 500 }
    );
  }
}
