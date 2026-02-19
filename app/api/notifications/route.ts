import { NextRequest, NextResponse } from 'next/server';
import { getAll, getOne, insert, update } from '@/lib/db-config';
import { getAuthUser } from '@/lib/auth';

// GET all notifications for current user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = `
      SELECT n.id, n.title, n.message, n.notification_type, n.is_read, 
             n.created_at, u.name as sender_name
      FROM notifications n
      JOIN users u ON n.sender_id = u.id
      WHERE (n.target_role = 'all' OR n.target_role = ?)
    `;

    const params = [user.role];

    if (user.role === 'student') {
      query += ` OR (n.recipient_id = (SELECT id FROM users WHERE id = ?) AND n.target_role = 'student')`;
      params.push(user.id);
    }

    query += ' ORDER BY n.created_at DESC LIMIT 50';

    const notifications = await getAll(query, params);

    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST - Create new notification
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || (user.role !== 'admin' && user.role !== 'faculty')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, message, notification_type, target_role, course_id } = body;

    const result = await insert('notifications', {
      sender_id: user.id,
      title,
      message,
      notification_type,
      target_role,
      course_id: course_id || null,
    });

    return NextResponse.json(
      { message: 'Notification created successfully', notificationId: (result as any).insertId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PUT - Mark notification as read
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    await update(
      'notifications',
      { is_read: true, read_at: new Date() },
      `id = ${id}`
    );

    return NextResponse.json({ message: 'Notification marked as read' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update notification' },
      { status: 500 }
    );
  }
}
