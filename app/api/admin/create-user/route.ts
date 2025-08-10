import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role = 'user', metadata = {} } = body;
    
    if (!email || !password) {
      return NextResponse.json({ 
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    // For now, return mock response - integrate with Supabase later
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      role,
      metadata,
      created_at: new Date().toISOString(),
      email_confirmed: false
    };

    return NextResponse.json({ 
      success: true, 
      user: newUser,
      message: 'User created successfully (mock)' 
    });

  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json({ 
      error: 'Failed to create user: ' + error.message 
    }, { status: 500 });
  }
}
