// =====================================================
// AUTH PROFILE API ENDPOINT (SECURED)
// =====================================================
// Handles user profile operations with security middleware
// Author: SeraGPT Development Team
// Created: 2024-12-01
// Updated: 2024-12-02 - Added security middleware
// =====================================================

import { authService } from '@/lib/services/auth-service';
import {
  requireAuth,
  createSuccessResponse,
  createErrorResponse,
  withValidation,
  type AuthenticatedRequest
} from '@/lib/middleware/auth-middleware';
import { validateUserProfile } from '@/lib/utils/validation';
import { sanitizeInput } from '@/lib/utils/security';
import type {
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UserProfile
} from '@/types/auth';

// =====================================================
// GET - Fetch User Profile (SECURED)
// =====================================================

export const GET = requireAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user!;

    // Get user profile with error handling
    const [profileData, tokensData, preferencesData] = await Promise.allSettled([
      authService.getUserProfile(user.id),
      authService.getUserTokens(user.id),
      authService.getUserPreferences(user.id)
    ]);

    // Safely extract results
    const profile = profileData.status === 'fulfilled' ? profileData.value : null;
    const tokens = tokensData.status === 'fulfilled' ? tokensData.value : null;
    const preferences = preferencesData.status === 'fulfilled' ? preferencesData.value : null;

    // Combine all user data with sanitization
    const userData = {
      user: {
        id: user.id,
        email: user.email,
        email_verified: user.email_verified,
        role: user.role
      },
      profile: profile ? {
        ...profile,
        full_name: profile.full_name ? sanitizeInput.general(profile.full_name) : null,
        phone: profile.phone ? sanitizeInput.general(profile.phone) : null,
        company_name: profile.company_name ? sanitizeInput.general(profile.company_name) : null
      } : null,
      tokens,
      preferences
    };

    return createSuccessResponse(userData);

  } catch (error) {
    console.error('Profile GET error:', error);
    return createErrorResponse(
      'Failed to fetch profile data',
      500,
      { error: error instanceof Error ? error.message : 'Unknown error' }
    );
  }
});

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
