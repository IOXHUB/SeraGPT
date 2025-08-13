import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock API monitoring data
    const apiEndpoints = [
      {
        id: 'openai-api',
        name: 'OpenAI API',
        url: 'https://api.openai.com',
        status: 'healthy',
        responseTime: 245,
        lastCheck: new Date().toISOString(),
        uptime: 99.8,
        errorRate: 0.2,
        calls24h: 1247,
        avgResponseTime: 220
      },
      {
        id: 'supabase-api', 
        name: 'Supabase Database',
        url: 'https://supabase.com/api',
        status: 'healthy',
        responseTime: 89,
        lastCheck: new Date().toISOString(),
        uptime: 99.9,
        errorRate: 0.1,
        calls24h: 3521,
        avgResponseTime: 95
      },
      {
        id: 'weather-api',
        name: 'Hava Durumu API',
        url: 'https://api.openweathermap.org',
        status: 'healthy',
        responseTime: 156,
        lastCheck: new Date().toISOString(),
        uptime: 99.5,
        errorRate: 0.5,
        calls24h: 428,
        avgResponseTime: 175
      },
      {
        id: 'soil-api',
        name: 'Toprak Analizi API',
        url: 'https://api.soilapi.org',
        status: 'warning',
        responseTime: 1250,
        lastCheck: new Date().toISOString(),
        uptime: 98.2,
        errorRate: 1.8,
        calls24h: 156,
        avgResponseTime: 890
      },
      {
        id: 'market-api',
        name: 'Pazar Fiyatları API',
        url: 'https://api.marketprices.com',
        status: 'healthy',
        responseTime: 320,
        lastCheck: new Date().toISOString(),
        uptime: 99.1,
        errorRate: 0.9,
        calls24h: 234,
        avgResponseTime: 340
      }
    ];

    const stats = {
      totalEndpoints: apiEndpoints.length,
      healthyEndpoints: apiEndpoints.filter(e => e.status === 'healthy').length,
      warningEndpoints: apiEndpoints.filter(e => e.status === 'warning').length,
      downEndpoints: apiEndpoints.filter(e => e.status === 'down').length,
      avgResponseTime: Math.round(apiEndpoints.reduce((sum, ep) => sum + ep.responseTime, 0) / apiEndpoints.length),
      totalCalls24h: apiEndpoints.reduce((sum, ep) => sum + ep.calls24h, 0),
      avgUptime: Math.round(apiEndpoints.reduce((sum, ep) => sum + ep.uptime, 0) / apiEndpoints.length * 10) / 10
    };

    return NextResponse.json({
      success: true,
      data: {
        endpoints: apiEndpoints,
        stats: stats,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API Monitor Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch API monitoring data' },
      { status: 500 }
    );
  }
}
