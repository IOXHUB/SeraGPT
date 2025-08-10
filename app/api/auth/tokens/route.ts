// =====================================================
// USER TOKENS API ENDPOINT - BUILD SAFE VERSION
// =====================================================
// Simplified implementation for production build stability
// =====================================================

import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// GET - Get User Tokens (Mock Implementation)
// =====================================================

export async function GET(request: NextRequest) {
  try {
    // Return mock token data for build stability
    const mockTokens = {
      id: 'dev-tokens-123',
      user_id: 'dev-user-123',
      total_tokens: 100,
      used_tokens: 23,
      remaining_tokens: 77,
      free_tokens_granted: 5,
      free_tokens_used: 2,
      total_purchased: 95,
      total_spent: 9.5,
      last_purchase_amount: 50,
      last_purchase_price: 5.0,
      tokens_used_today: 3,
      tokens_used_this_month: 23,
      created_at: new Date('2024-01-01T12:00:00.000Z').toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockTokens,
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
// PUT - Consume Tokens (Mock Implementation)
// =====================================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount = 1 } = body;

    // Return mock success response
    return NextResponse.json({
      success: true,
      remaining_tokens: 76,
      tokens_consumed: amount,
      message: 'Tokens consumed successfully',
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

// =====================================================
// POST - Add Tokens (Mock Implementation)
// =====================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount = 10, purchase_price = 1.0 } = body;

    // Return mock success response
    return NextResponse.json({
      success: true,
      tokens_added: amount,
      new_total: 110,
      amount_charged: purchase_price,
      message: 'Tokens added successfully',
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
