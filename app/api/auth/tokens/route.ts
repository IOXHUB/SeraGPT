// =====================================================
// USER TOKENS API ENDPOINT
// =====================================================
// Handles user token operations: get balance, consume tokens, add tokens
// Author: SeraGPT Development Team
// Created: 2024-12-01
// =====================================================

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth-service';
import type { TokenUsageResponse, ActivityType } from '@/types/auth';

// =====================================================
// GET - Get User Token Balance and Info
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

    // Get user tokens
    const tokensData = await authService.getUserTokens(user.id);

    if (!tokensData) {
      return NextResponse.json(
        { error: 'Failed to fetch tokens', code: 'TOKENS_FETCH_ERROR' },
        { status: 400 }
      );
    }

    // Get recent token activities (last 30 days)
    const { data: recentActivities } = await supabase
      .from('user_activity_log')
      .select('*')
      .eq('user_id', user.id)
      .in('activity_type', ['token_used', 'token_purchased'])
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: {
        tokens: tokensData,
        recent_activities: recentActivities || []
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Tokens GET error:', error);
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
// POST - Consume Tokens
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
    const body = await request.json();
    const { amount = 1, activity_type = 'token_used' as ActivityType, details } = body;

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid token amount', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Check if user has enough tokens
    const tokensData = await authService.getUserTokens(user.id);
    if (!tokensData) {
      return NextResponse.json(
        { error: 'Failed to get token balance', code: 'TOKENS_FETCH_ERROR' },
        { status: 400 }
      );
    }

    if (tokensData.total_tokens < amount) {
      return NextResponse.json(
        { error: 'Insufficient tokens', code: 'INSUFFICIENT_TOKENS' },
        { status: 400 }
      );
    }

    // Consume tokens
    const consumeResponse = await authService.consumeTokens({
      userId: user.id,
      amount: amount,
      activityType: activity_type,
      details: details
    });
    
    if (!consumeResponse.success) {
      return NextResponse.json(
        { error: consumeResponse.error || 'Failed to consume tokens', code: 'TOKEN_CONSUMPTION_ERROR' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        tokens_consumed: amount,
        remaining_tokens: consumeResponse.remaining_tokens || 0,
        activity_logged: true
      },
      message: `${amount} tokens consumed successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Tokens POST error:', error);
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
// PUT - Add Tokens (Admin or Purchase)
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
    const body = await request.json();
    const { amount, purchase_price = 0, reason = 'Token addition' } = body;

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid token amount', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Check if this is an admin operation or a purchase
    const isAdmin = user.user_metadata?.role === 'admin';
    const isPurchase = purchase_price > 0;

    if (!isAdmin && !isPurchase) {
      return NextResponse.json(
        { error: 'Unauthorized token addition', code: 'UNAUTHORIZED_TOKEN_ADDITION' },
        { status: 403 }
      );
    }

    // Add tokens
    const addResponse = await authService.addTokens(user.id, amount, purchase_price);
    
    if (!addResponse) {
      return NextResponse.json(
        { error: 'Failed to add tokens', code: 'TOKEN_ADDITION_ERROR' },
        { status: 400 }
      );
    }

    // Tokens added successfully

    return NextResponse.json({
      success: true,
      data: {
        tokens_added: amount,
        purchase_price: purchase_price,
        activity_logged: true
      },
      message: `${amount} tokens added successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Tokens PUT error:', error);
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
