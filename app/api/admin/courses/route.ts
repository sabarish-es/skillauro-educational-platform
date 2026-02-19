import { NextRequest, NextResponse } from 'next/server';
import { getAll, getOne, insert, update, deleteRecord } from '@/lib/db-config';
import { getAuthUser } from '@/lib/auth';

// GET all courses
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || (user.role !== 'admin' && user.role !== 'faculty')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courses = await getAll(`
      SELECT c.id, c.code, c.name, c.description, c.duration_weeks, c.credits, 
             c.max_students, c.status, u.name as faculty_name
      FROM courses c
      JOIN faculties f ON c.faculty_id = f.id
      JOIN users u ON f.user_id = u.id
      ORDER BY c.name
    `);

    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, name, description, duration_weeks, credits, faculty_id, max_students } = body;

    // Get faculty id from user if not provided
    let facultyId = faculty_id;
    if (!facultyId && user.role === 'faculty') {
      const faculty = await getOne(
        'SELECT id FROM faculties WHERE user_id = ?',
        [user.id]
      );
      facultyId = (faculty as any)?.id;
    }

    const result = await insert('courses', {
      code,
      name,
      description,
      duration_weeks,
      credits,
      faculty_id: facultyId,
      max_students: max_students || 50,
      status: 'active',
    });

    return NextResponse.json(
      { message: 'Course created successfully', courseId: (result as any).insertId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, code, name, description, duration_weeks, credits, faculty_id, status } = body;

    await update(
      'courses',
      { code, name, description, duration_weeks, credits, faculty_id, status },
      `id = ${id}`
    );

    return NextResponse.json({ message: 'Course updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE - Remove course
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    }

    await deleteRecord('courses', `id = ${id}`);

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete course' },
      { status: 500 }
    );
  }
}
