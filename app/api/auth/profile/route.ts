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
// POST - Create User Profile (SECURED & VALIDATED)
// =====================================================

export const POST = requireAuth(
  withValidation(
    async (request: AuthenticatedRequest, validatedData: CreateUserProfileRequest) => {
      try {
        const user = request.user!;

        // Sanitize input data
        const sanitizedData: CreateUserProfileRequest = {
          full_name: validatedData.full_name ? sanitizeInput.general(validatedData.full_name) : undefined,
          phone: validatedData.phone ? sanitizeInput.general(validatedData.phone) : undefined,
          company_name: validatedData.company_name ? sanitizeInput.general(validatedData.company_name) : undefined,
          experience_level: validatedData.experience_level,
          location: validatedData.location ? {
            city: sanitizeInput.general(validatedData.location.city || ''),
            district: validatedData.location.district ? sanitizeInput.general(validatedData.location.district) : undefined,
            coordinates: validatedData.location.coordinates
          } : undefined,
          preferences: validatedData.preferences
        };

        // Create user profile
        const profileData = await authService.createUserProfile(user.id, sanitizedData);

        if (!profileData) {
          return createErrorResponse('Failed to create profile', 400);
        }

        return createSuccessResponse(profileData, 201);

      } catch (error) {
        console.error('Profile POST error:', error);
        return createErrorResponse(
          'Failed to create profile',
          500,
          { error: error instanceof Error ? error.message : 'Unknown error' }
        );
      }
    },
    (data: any) => {
      const validation = validateUserProfile(data);
      return {
        isValid: validation.isValid,
        data: validation.isValid ? data : undefined,
        errors: validation.errors
      };
    }
  )
);

// =====================================================
// PUT - Update User Profile (SECURED & VALIDATED)
// =====================================================

export const PUT = requireAuth(
  withValidation(
    async (request: AuthenticatedRequest, validatedData: UpdateUserProfileRequest) => {
      try {
        const user = request.user!;

        // Sanitize input data
        const sanitizedData: UpdateUserProfileRequest = {};

        if (validatedData.full_name !== undefined) {
          sanitizedData.full_name = sanitizeInput.general(validatedData.full_name);
        }
        if (validatedData.phone !== undefined) {
          sanitizedData.phone = validatedData.phone ? sanitizeInput.general(validatedData.phone) : undefined;
        }
        if (validatedData.company_name !== undefined) {
          sanitizedData.company_name = validatedData.company_name ? sanitizeInput.general(validatedData.company_name) : undefined;
        }
        if (validatedData.experience_level !== undefined) {
          sanitizedData.experience_level = validatedData.experience_level;
        }
        if (validatedData.location !== undefined) {
          sanitizedData.location = validatedData.location ? {
            city: validatedData.location.city ? sanitizeInput.general(validatedData.location.city) : undefined,
            district: validatedData.location.district ? sanitizeInput.general(validatedData.location.district) : undefined,
            coordinates: validatedData.location.coordinates
          } : undefined;
        }
        if (validatedData.preferences !== undefined) {
          sanitizedData.preferences = validatedData.preferences;
        }

        // Update user profile
        const profileData = await authService.updateUserProfile(user.id, sanitizedData);

        if (!profileData) {
          return createErrorResponse('Failed to update profile', 400);
        }

        return createSuccessResponse(profileData);

      } catch (error) {
        console.error('Profile PUT error:', error);
        return createErrorResponse(
          'Failed to update profile',
          500,
          { error: error instanceof Error ? error.message : 'Unknown error' }
        );
      }
    },
    (data: any) => {
      // Validate only fields that are being updated
      const validation = validateUserProfile(data);
      return {
        isValid: Object.keys(validation.errors).length === 0,
        data: validation.isValid ? data : undefined,
        errors: validation.errors
      };
    }
  )
);

// =====================================================
// DELETE - Deactivate User Profile (SECURED)
// =====================================================

export const DELETE = requireAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user!;

    // Soft delete user profile (mark as deactivated)
    const updateData = await authService.updateUserProfile(user.id, {
      location: {
        city: 'Deactivated',
        district: new Date().toISOString()
      }
    });

    if (!updateData) {
      return createErrorResponse('Failed to deactivate profile', 400);
    }

    // Log security event
    console.log(`User profile deactivated: ${user.id} at ${new Date().toISOString()}`);

    return createSuccessResponse({
      message: 'Profile deactivated successfully',
      deactivated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Profile DELETE error:', error);
    return createErrorResponse(
      'Failed to deactivate profile',
      500,
      { error: error instanceof Error ? error.message : 'Unknown error' }
    );
  }
});
