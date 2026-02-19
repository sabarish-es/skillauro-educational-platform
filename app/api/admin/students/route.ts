import { NextRequest, NextResponse } from 'next/server';
import { getAll, getOne, insert, update, deleteRecord } from '@/lib/db-config';
import { getAuthUser } from '@/lib/auth';

// GET all students
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const students = await getAll(`
      SELECT u.id, u.email, u.name, u.phone, u.status, s.enrollment_number, s.batch, s.cgpa
      FROM users u
      JOIN students s ON u.id = s.user_id
      ORDER BY s.enrollment_number
    `);

    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST - Create new student
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, phone, password, enrollment_number, batch } = body;

    // Create user
    const userResult = await insert('users', {
      email,
      name,
      password,
      phone,
      role: 'student',
      status: 'active',
    });

    const userId = (userResult as any).insertId;

    // Create student record
    await insert('students', {
      user_id: userId,
      enrollment_number,
      batch,
      semester: 1,
      cgpa: 0,
    });

    return NextResponse.json(
      { message: 'Student created successfully', userId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create student' },
      { status: 500 }
    );
  }
}

// PUT - Update student
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, email, name, phone, enrollment_number, batch, cgpa, password } = body;

    // Update user
    const userData: any = { email, name, phone };
    if (password) userData.password = password;

    await update('users', userData, `id = ${id}`);

    // Update student
    await update(
      'students',
      { enrollment_number, batch, cgpa },
      `user_id = ${id}`
    );

    return NextResponse.json({ message: 'Student updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update student' },
      { status: 500 }
    );
  }
}

// DELETE - Remove student
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    // Delete user (cascade will handle student record)
    await deleteRecord('users', `id = ${id}`);

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete student' },
      { status: 500 }
    );
  }
}
