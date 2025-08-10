import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role = 'user' } = body;

    if (!email || !password) {
      return NextResponse.json({
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // Mock response for production build
    return NextResponse.json({
      success: true,
      user: {
        id: `user_${Date.now()}`,
        email,
        role,
        created_at: new Date().toISOString()
      },
      message: 'User created successfully (mock)'
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to create user'
    }, { status: 500 });
  }
}
