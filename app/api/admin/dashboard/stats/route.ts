import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, getOne } from '@/lib/db-config';

export async function GET(request: NextRequest) {
  try {
    // Get total faculties
    const facultyResult = await executeQuery(
      'SELECT COUNT(*) as count FROM faculties'
    ) as any;
    const totalFaculties = facultyResult[0]?.count || 0;

    // Get total students
    const studentResult = await executeQuery(
      'SELECT COUNT(*) as count FROM students'
    ) as any;
    const totalStudents = studentResult[0]?.count || 0;

    // Get active courses
    const coursesResult = await executeQuery(
      "SELECT COUNT(*) as count FROM courses WHERE status = 'active'"
    ) as any;
    const activeCourses = coursesResult[0]?.count || 0;

    // Get total fees collected
    const feesResult = await executeQuery(
      'SELECT COALESCE(SUM(paid_amount), 0) as total FROM payments WHERE payment_status = "completed"'
    ) as any;
    const totalFeesCollected = feesResult[0]?.total || 0;

    return NextResponse.json({
      totalFaculties,
      totalStudents,
      activeCourses,
      totalFeesCollected: parseFloat(totalFeesCollected),
    });
  } catch (error: any) {
    console.error('[v0] Dashboard stats error:', error);
    return NextResponse.json(
      {
        totalFaculties: 0,
        totalStudents: 0,
        activeCourses: 0,
        totalFeesCollected: 0,
      },
      { status: 200 } // Return 200 even on error so dashboard loads with 0s
    );
  }
}
