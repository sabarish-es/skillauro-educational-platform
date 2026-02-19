import { NextRequest, NextResponse } from 'next/server';
import { getAll, getOne, insert, update, deleteRecord } from '@/lib/db-config';
import { getAuthUser } from '@/lib/auth';

// GET all faculties
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const faculties = await getAll(`
      SELECT u.id, u.email, u.name, u.phone, f.department, f.specialization, u.status
      FROM users u
      JOIN faculties f ON u.id = f.user_id
      ORDER BY u.name
    `);

    return NextResponse.json(faculties);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch faculties' },
      { status: 500 }
    );
  }
}

// POST - Create new faculty
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, phone, password, department, specialization } = body;

    // Create user
    const userResult = await insert('users', {
      email,
      name,
      password,
      phone,
      role: 'faculty',
      status: 'active',
    });

    const userId = (userResult as any).insertId;

    // Create faculty record
    await insert('faculties', {
      user_id: userId,
      department,
      specialization,
    });

    return NextResponse.json(
      { message: 'Faculty created successfully', userId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create faculty' },
      { status: 500 }
    );
  }
}

// PUT - Update faculty
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, email, name, phone, department, specialization, password } = body;

    // Update user
    const userData: any = { email, name, phone };
    if (password) userData.password = password;

    await update('users', userData, `id = ${id}`);

    // Update faculty
    await update(
      'faculties',
      { department, specialization },
      `user_id = ${id}`
    );

    return NextResponse.json({ message: 'Faculty updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update faculty' },
      { status: 500 }
    );
  }
}

// DELETE - Remove faculty
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Faculty ID required' }, { status: 400 });
    }

    // Delete user (cascade will handle faculty record)
    await deleteRecord('users', `id = ${id}`);

    return NextResponse.json({ message: 'Faculty deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete faculty' },
      { status: 500 }
    );
  }
}
