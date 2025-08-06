import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    console.log('Creating admin user:', { email, role });

    // Create user with Supabase
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        role: role || 'admin',
        full_name: email.split('@')[0],
        created_by: 'admin_api'
      },
      email_confirm: true // Auto-confirm email
    });

    if (error) {
      console.error('Admin user creation failed:', error);
      return NextResponse.json(
        { error: `User creation failed: ${error.message}` },
        { status: 400 }
      );
    }

    console.log('Admin user created successfully:', data.user?.email);

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        role: data.user?.user_metadata?.role
      }
    });

  } catch (error) {
    console.error('Admin user creation exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
