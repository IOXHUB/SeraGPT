import { NextRequest, NextResponse } from 'next/server';
import { externalApiService } from '@/lib/services/external-api-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const stats = externalApiService.getCacheStats();
    
    return NextResponse.json({
      success: true,
      data: {
        cacheSize: stats.size,
        cachedKeys: stats.keys,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Cache stats error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    externalApiService.clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Cache clear error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
