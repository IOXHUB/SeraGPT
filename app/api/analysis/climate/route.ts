import { NextRequest, NextResponse } from 'next/server';
import { climateAnalysisService } from '@/lib/services/climate-analysis-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    
    // Validate required fields
    if (!requestData.location?.lat || !requestData.location?.lon) {
      return NextResponse.json({
        success: false,
        error: 'Location coordinates (lat, lon) are required'
      }, { status: 400 });
    }

    console.log('🌡️ Climate analysis request:', requestData);

    // Perform climate analysis
    const result = await climateAnalysisService.analyzeClimate({
      location: {
        lat: parseFloat(requestData.location.lat),
        lon: parseFloat(requestData.location.lon),
        address: requestData.location.address
      },
      cropType: requestData.cropType || 'tomato',
      analysisType: requestData.analysisType || 'basic',
      timeframe: requestData.timeframe
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Climate analysis completed successfully'
    });

  } catch (error: any) {
    console.error('Climate analysis API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Climate analysis failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const cropType = searchParams.get('cropType') || 'tomato';
    const address = searchParams.get('address');

    if (!lat || !lon) {
      return NextResponse.json({
        success: false,
        error: 'Latitude and longitude parameters are required'
      }, { status: 400 });
    }

    console.log('🌡️ Climate analysis GET request:', { lat, lon, cropType });

    const result = await climateAnalysisService.analyzeClimate({
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        address: address || undefined
      },
      cropType: cropType as any,
      analysisType: 'basic'
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Climate analysis completed successfully'
    });

  } catch (error: any) {
    console.error('Climate analysis GET error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Climate analysis failed'
    }, { status: 500 });
  }
}
