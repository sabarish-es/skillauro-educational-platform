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

    // Get all students with their fee information
    const [rows] = await connection.execute(
      `SELECT 
        s.id,
        u.name as studentName,
        s.enrollment_number as enrollmentNumber,
        COALESCE(SUM(p.amount), 0) as amountPaid,
        COALESCE(f.total_amount, 0) as totalFees,
        (COALESCE(f.total_amount, 0) - COALESCE(SUM(p.amount), 0)) as amountDue,
        COALESCE(MAX(p.created_at), 'N/A') as lastPaymentDate,
        CASE 
          WHEN COALESCE(SUM(p.amount), 0) = 0 THEN 'Unpaid'
          WHEN COALESCE(SUM(p.amount), 0) >= COALESCE(f.total_amount, 0) THEN 'Paid'
          ELSE 'Partially Paid'
        END as status
       FROM students s
       LEFT JOIN users u ON s.user_id = u.id
       LEFT JOIN fees f ON s.id = f.student_id
       LEFT JOIN payments p ON s.id = p.student_id
       WHERE u.role = 'student'
       GROUP BY s.id, u.name, s.enrollment_number, f.total_amount
       ORDER BY u.name ASC`
    ) as any;

    await connection.end();

    const fees = (rows as any[]).map((row) => ({
      id: row.id.toString(),
      studentName: row.studentName || 'Unknown',
      enrollmentNumber: row.enrollmentNumber || 'N/A',
      totalFees: parseInt(row.totalFees) || 0,
      amountPaid: parseInt(row.amountPaid) || 0,
      amountDue: parseInt(row.amountDue) || 0,
      status: row.status,
      lastPaymentDate: row.lastPaymentDate === 'N/A' ? 'N/A' : new Date(row.lastPaymentDate).toISOString().split('T')[0],
    }));

    return NextResponse.json({ fees }, { status: 200 });
  } catch (error: any) {
    console.error('[v0] Fees list error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch fees' },
      { status: 500 }
    );
  }
}
