import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      batch,
      enrollment_number,
      user_id,
      password,
    } = await request.json();

    // Validate input
    if (!name || !email || !phone || !user_id || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Hash the password before storing (use bcrypt)
    // For now, we'll store it as-is for demo
    
    // TODO: Connect to database and insert user record
    // Example: INSERT INTO users (email, user_id, password, name, role, phone) 
    //          VALUES (?, ?, ?, ?, 'student', ?)

    // TODO: Insert into students table with the new user_id
    // Example: INSERT INTO students (user_id, batch, enrollment_number) 
    //          VALUES (?, ?, ?)

    // For demo, return success
    return NextResponse.json(
      {
        success: true,
        message: 'Student registered successfully',
        data: {
          user_id,
          email,
          role: 'student',
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
