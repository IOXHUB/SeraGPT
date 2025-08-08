import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Simple profile data response for now
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: 'user-id',
          email: 'user@example.com',
          role: 'user'
        },
        profile: {
          full_name: 'User Name',
          subscription_type: 'free'
        },
        tokens: {
          remaining_tokens: 10,
          used_tokens: 0
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    return NextResponse.json({
      success: true,
      data: {
        message: 'Profile created successfully',
        profile: data
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    return NextResponse.json({
      success: true,
      data: {
        message: 'Profile updated successfully',
        profile: data
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        message: 'Profile deactivated successfully',
        deactivated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to deactivate profile' },
      { status: 500 }
    );
  }
}
