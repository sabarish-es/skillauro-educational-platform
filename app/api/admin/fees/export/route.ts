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

    // Get fees data
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

    // Generate CSV content
    const headers = ['Student Name', 'Enrollment Number', 'Total Fees', 'Amount Paid', 'Amount Due', 'Status', 'Last Payment Date'];
    const csvRows = (rows as any[]).map((row) => [
      row.studentName || 'Unknown',
      row.enrollmentNumber || 'N/A',
      row.totalFees || 0,
      row.amountPaid || 0,
      row.amountDue || 0,
      row.status,
      row.lastPaymentDate === 'N/A' ? 'N/A' : new Date(row.lastPaymentDate).toISOString().split('T')[0],
    ]);

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...csvRows.map((row) =>
        row
          .map((cell: any) => {
            const cellStr = String(cell);
            return cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')
              ? `"${cellStr.replace(/"/g, '""')}"`
              : cellStr;
          })
          .join(',')
      ),
    ].join('\n');

    // Calculate summary
    const totalFees = csvRows.reduce((sum, row) => sum + (parseInt(row[2]) || 0), 0);
    const totalPaid = csvRows.reduce((sum, row) => sum + (parseInt(row[3]) || 0), 0);
    const totalDue = csvRows.reduce((sum, row) => sum + (parseInt(row[4]) || 0), 0);

    const summary = `\n\nSummary Report Generated on ${new Date().toLocaleString()}\n`;
    const summaryData = `Total Students,${csvRows.length}\nTotal Fees,${totalFees}\nTotal Paid,${totalPaid}\nTotal Due,${totalDue}\nCollection Rate,${((totalPaid / totalFees) * 100).toFixed(2)}%`;

    const finalCsv = csvContent + summary + summaryData;

    // Return as downloadable file
    return new NextResponse(finalCsv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="fees-report-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    console.error('[v0] Export error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to export report' },
      { status: 500 }
    );
  }
}
