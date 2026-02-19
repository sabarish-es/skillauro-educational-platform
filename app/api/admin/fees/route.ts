import { NextRequest, NextResponse } from 'next/server';
import { getAll, getOne, insert, update } from '@/lib/db-config';
import { getAuthUser } from '@/lib/auth';

// GET all fees
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || (user.role !== 'admin' && user.role !== 'student')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = `
      SELECT f.id, f.student_id, f.course_id, u.name as student_name, c.name as course_name,
             f.total_amount, f.paid_amount, f.pending_amount, f.payment_status, f.due_date
      FROM fees f
      JOIN students s ON f.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON f.course_id = c.id
    `;

    if (user.role === 'student') {
      const student = await getOne('SELECT id FROM students WHERE user_id = ?', [user.id]);
      query += ` WHERE f.student_id = ${(student as any)?.id}`;
    }

    query += ' ORDER BY f.due_date DESC';
    const fees = await getAll(query);

    return NextResponse.json(fees);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch fees' },
      { status: 500 }
    );
  }
}

// PUT - Update fee status
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, paid_amount, payment_status } = body;

    const pending_amount = (body.total_amount || 0) - (paid_amount || 0);

    await update(
      'fees',
      { paid_amount, pending_amount, payment_status },
      `id = ${id}`
    );

    // Create payment record
    await insert('payments', {
      student_id: body.student_id,
      fee_id: id,
      amount: paid_amount,
      payment_method: 'admin',
      payment_status: 'completed',
      payment_date: new Date(),
    });

    return NextResponse.json({ message: 'Fee updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update fee' },
      { status: 500 }
    );
  }
}
