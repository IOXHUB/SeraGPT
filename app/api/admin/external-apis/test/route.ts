import { NextRequest, NextResponse } from 'next/server';
import { externalApiService } from '@/lib/services/external-api-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing external APIs...');
    
    const status = await externalApiService.getApiStatus();
    
    return NextResponse.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('External API test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { apiName, params } = await request.json();
    
    let result;
    
    switch (apiName) {
      case 'open-meteo':
        result = await externalApiService.getOpenMeteoData(
          params.lat || 39.9334,
          params.lon || 32.8597,
          params.options
        );
        break;
        
      case 'soil-grids':
        result = await externalApiService.getSoilData(
          params.lat || 39.9334,
          params.lon || 32.8597,
          params.depth,
          params.properties
        );
        break;
        
      case 'pvgis':
        result = await externalApiService.getPVGISData(
          params.lat || 39.9334,
          params.lon || 32.8597,
          params.options
        );
        break;
        
      case 'tcmb':
        result = await externalApiService.getTCMBExchangeRates(params.date);
        break;
        
      case 'nominatim':
        result = await externalApiService.geocodeAddress(
          params.address || 'Ankara, Turkey'
        );
        break;
        
      case 'nasa-power':
        result = await externalApiService.getNasaPowerData(
          params.lat || 39.9334,
          params.lon || 32.8597,
          params.parameters || ['T2M', 'RH2M', 'WS2M'],
          params.startDate || '20240101',
          params.endDate || '20240131'
        );
        break;
        
      default:
        return NextResponse.json({
          success: false,
          error: `Unknown API: ${apiName}`
        }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      api: apiName,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error(`API test error for ${apiName}:`, error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
