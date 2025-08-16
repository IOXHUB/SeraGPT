import { NextRequest, NextResponse } from 'next/server';

// Simple auth connection test endpoint
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ 
      success: true, 
      message: 'Auth API connection successful',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV
      }
    });
  } catch (error: any) {
    console.error('Auth test endpoint error:', error);
    return NextResponse.json(
      { 
        error: `Auth connection test failed: ${error.message}`,
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
