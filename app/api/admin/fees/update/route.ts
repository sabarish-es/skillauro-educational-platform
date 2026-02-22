import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const { studentId, amountPaid, paymentMethod = 'manual', transactionId = '', remarks = '' } = await request.json();

    if (!studentId || !amountPaid || amountPaid <= 0) {
      return NextResponse.json(
        { message: 'Invalid student ID or amount' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      // Record the payment
      await connection.execute(
        `INSERT INTO payments (student_id, amount, payment_method, transaction_id, remarks, created_at, status)
         VALUES (?, ?, ?, ?, ?, NOW(), 'completed')`,
        [studentId, amountPaid, paymentMethod, transactionId || null, remarks || null]
      );

      await connection.end();

      return NextResponse.json(
        { message: 'Payment recorded successfully' },
        { status: 201 }
      );
    } catch (queryError: any) {
      await connection.end();
      console.error('[v0] Database query error:', queryError);
      
      if (queryError.code === 'ER_NO_REFERENCED_ROW') {
        return NextResponse.json(
          { message: 'Student not found' },
          { status: 404 }
        );
      }
      throw queryError;
    }
  } catch (error: any) {
    console.error('[v0] Fees update error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to record payment' },
      { status: 500 }
    );
  }
}
