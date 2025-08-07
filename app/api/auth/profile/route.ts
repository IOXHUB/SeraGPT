// =====================================================
// AUTH PROFILE API ENDPOINT
// =====================================================
// Handles user profile operations: get, update, create
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth-service';
import type { 
  CreateUserProfileRequest, 
  UpdateUserProfileRequest,
  UserProfile,
  AUTH_ERROR_CODES 
} from '@/types/auth';

// =====================================================
// GET - Fetch User Profile
// =====================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get user profile
    const profileData = await authService.getUserProfile(user.id);

    // Get user tokens info
    const tokensData = await authService.getUserTokens(user.id);

    // Get user preferences
    const preferencesData = await authService.getUserPreferences(user.id);

    // Combine all user data
    const userData = {
      user: {
        id: user.id,
        email: user.email,
        email_confirmed_at: user.email_confirmed_at,
        created_at: user.created_at,
        updated_at: user.updated_at,
        user_metadata: user.user_metadata,
        app_metadata: user.app_metadata
      },
      profile: profileData,
      tokens: tokensData,
      preferences: preferencesData
    };

    return NextResponse.json({
      success: true,
      data: userData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST - Create User Profile
// =====================================================

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: CreateUserProfileRequest = await request.json();

    // Validate required fields
    if (!body.full_name) {
      return NextResponse.json(
        { error: 'Full name is required', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Create user profile
    const profileData = await authService.createUserProfile(user.id, body);

    if (!profileData) {
      return NextResponse.json(
        { error: 'Failed to create profile', code: 'PROFILE_CREATE_ERROR' },
        { status: 400 }
      );
    }

    // Profile created successfully

    return NextResponse.json({
      success: true,
      data: profileData,
      message: 'Profile created successfully',
      timestamp: new Date().toISOString()
    }, { status: 201 });

  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// =====================================================
// PUT - Update User Profile
// =====================================================

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: UpdateUserProfileRequest = await request.json();

    // Update user profile
    const profileData = await authService.updateUserProfile(user.id, body);

    if (!profileData) {
      return NextResponse.json(
        { error: 'Failed to update profile', code: 'PROFILE_UPDATE_ERROR' },
        { status: 400 }
      );
    }

    // Profile updated successfully

    return NextResponse.json({
      success: true,
      data: profileData,
      message: 'Profile updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE - Delete User Profile (Soft Delete)
// =====================================================

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Soft delete user profile (mark as deleted)
    const updateData = await authService.updateUserProfile(user.id, {
      location: {
        city: 'Deactivated',
        district: new Date().toISOString()
      }
    });

    if (!updateData) {
      return NextResponse.json(
        { error: 'Failed to deactivate profile', code: 'PROFILE_DELETE_ERROR' },
        { status: 400 }
      );
    }

    // Profile deactivated successfully

    // Note: We don't actually delete the user from auth.users
    // That should be handled by a separate admin process if needed

    return NextResponse.json({
      success: true,
      message: 'Profile deactivated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Profile DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
