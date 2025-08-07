// =====================================================
// USER PREFERENCES API ENDPOINT
// =====================================================
// Handles user preference operations: get, update preferences
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth-service';
import type { UpdateUserPreferencesRequest } from '@/types/auth';

// =====================================================
// GET - Get User Preferences
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

    // Get user preferences
    const preferencesData = await authService.getUserPreferences(user.id);

    if (!preferencesData) {
      return NextResponse.json(
        { error: 'Failed to fetch preferences', code: 'PREFERENCES_FETCH_ERROR' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: preferencesData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Preferences GET error:', error);
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
// PUT - Update User Preferences
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
    const body: UpdateUserPreferencesRequest = await request.json();

    // Update user preferences
    const preferencesData = await authService.updateUserPreferences(user.id, body);

    if (!preferencesData) {
      return NextResponse.json(
        { error: 'Failed to update preferences', code: 'PREFERENCES_UPDATE_ERROR' },
        { status: 400 }
      );
    }

    // Log activity
    await authService.logUserActivity(user.id, 'preferences_updated', {
      action: 'preferences_updated',
      updated_fields: Object.keys(body),
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: preferencesData,
      message: 'Preferences updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Preferences PUT error:', error);
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
// POST - Reset User Preferences to Default
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

    // Reset to default preferences
    const defaultPreferences: UpdateUserPreferencesRequest = {
      theme: 'light',
      email_notifications: true,
      push_notifications: true,
      marketing_emails: false,
      analysis_reminders: true,
      weekly_reports: true,
      timezone: 'Europe/Istanbul',
      date_format: 'DD/MM/YYYY',
      number_format: 'TR',
      currency: 'TRY',
      measurement_units: 'metric'
    };

    // Update user preferences with defaults
    const preferencesData = await authService.updateUserPreferences(user.id, defaultPreferences);

    if (!preferencesData) {
      return NextResponse.json(
        { error: 'Failed to reset preferences', code: 'PREFERENCES_RESET_ERROR' },
        { status: 400 }
      );
    }

    // Log activity
    await authService.logUserActivity(user.id, 'preferences_updated', {
      action: 'preferences_reset_to_default',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: preferencesData,
      message: 'Preferences reset to default successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Preferences POST error:', error);
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
