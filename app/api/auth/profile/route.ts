import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Authentication required'
      }, { status: 401 });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch profile'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: profile
    });

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Authentication required'
      }, { status: 401 });
    }

    // Parse request body
    const updates = await request.json();

    // Validate required fields
    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({
        success: false,
        error: 'Invalid request body'
      }, { status: 400 });
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({
          success: false,
          error: `Failed to update profile: ${error.message}`
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        data: data,
        message: 'Profile updated successfully'
      });

    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          ...updates,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Profile creation error:', error);
        return NextResponse.json({
          success: false,
          error: `Failed to create profile: ${error.message}`
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        data: data,
        message: 'Profile created successfully'
      }, { status: 201 });
    }

  } catch (error: any) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({
      success: false,
      error: `Internal server error: ${error.message}`
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // For creating a new profile (same as PUT but explicit create)
  return PUT(request);
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Authentication required'
      }, { status: 401 });
    }

    // Soft delete the profile (mark as deactivated)
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        is_active: false,
        deactivated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Profile deactivation error:', error);
      return NextResponse.json({
        success: false,
        error: `Failed to deactivate profile: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Profile deactivated successfully'
    });

  } catch (error: any) {
    console.error('Profile DELETE error:', error);
    return NextResponse.json({
      success: false,
      error: `Internal server error: ${error.message}`
    }, { status: 500 });
  }
}
