import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface PerformanceData {
  performance: any[];
  api: any[];
  errors: any[];
  journey: any[];
}

// In-memory storage for development (in production, use a database)
const performanceData: PerformanceData[] = [];
const MAX_STORED_ENTRIES = 1000;

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json();
    
    // Validate required fields
    if (!data.performance && !data.api && !data.errors && !data.journey) {
      return NextResponse.json(
        { error: 'Invalid performance data format' },
        { status: 400 }
      );
    }

    // Add timestamp if not present
    const enrichedData = {
      ...data,
      receivedAt: Date.now(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    };

    // Store data (in development)
    performanceData.push(enrichedData);

    // Trim old data to prevent memory issues
    if (performanceData.length > MAX_STORED_ENTRIES) {
      performanceData.splice(0, performanceData.length - MAX_STORED_ENTRIES);
    }

    // Log summary for monitoring
    const summary = {
      performanceMetrics: data.performance?.length || 0,
      apiCalls: data.api?.length || 0,
      errors: data.errors?.length || 0,
      journeyEvents: data.journey?.length || 0,
    };

    console.log('📊 Performance data received:', summary);

    // In production, you would store this in a database like:
    // await db.collection('performance_metrics').insertOne(enrichedData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Performance data received',
        summary 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing performance data:', error);
    return NextResponse.json(
      { error: 'Failed to process performance data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const type = url.searchParams.get('type'); // 'performance', 'api', 'errors', 'journey'

    // Return recent performance data
    const recentData = performanceData.slice(-limit);

    if (type) {
      // Filter by specific data type
      const filteredData = recentData.map(entry => ({
        receivedAt: entry.receivedAt,
        data: entry[type as keyof PerformanceData] || []
      }));

      return NextResponse.json({
        success: true,
        type,
        count: filteredData.length,
        data: filteredData
      });
    }

    // Return aggregated summary
    const summary = {
      totalEntries: performanceData.length,
      recentEntries: recentData.length,
      aggregatedMetrics: {
        totalPerformanceMetrics: recentData.reduce((sum, entry) => sum + (entry.performance?.length || 0), 0),
        totalAPICalls: recentData.reduce((sum, entry) => sum + (entry.api?.length || 0), 0),
        totalErrors: recentData.reduce((sum, entry) => sum + (entry.errors?.length || 0), 0),
        totalJourneyEvents: recentData.reduce((sum, entry) => sum + (entry.journey?.length || 0), 0),
      },
      performanceStats: calculatePerformanceStats(recentData),
    };

    return NextResponse.json({
      success: true,
      summary,
      recentData: limit <= 5 ? recentData : undefined // Include raw data only for small requests
    });

  } catch (error) {
    console.error('Error retrieving performance data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve performance data' },
      { status: 500 }
    );
  }
}

function calculatePerformanceStats(data: any[]) {
  const allPerformanceMetrics = data.flatMap(entry => entry.performance || []);
  const allApiCalls = data.flatMap(entry => entry.api || []);
  
  if (allPerformanceMetrics.length === 0) {
    return null;
  }

  const avgFCP = allPerformanceMetrics.reduce((sum, m) => sum + (m.fcp || 0), 0) / allPerformanceMetrics.length;
  const avgLCP = allPerformanceMetrics.reduce((sum, m) => sum + (m.lcp || 0), 0) / allPerformanceMetrics.length;
  const avgFID = allPerformanceMetrics.reduce((sum, m) => sum + (m.fid || 0), 0) / allPerformanceMetrics.length;
  const avgCLS = allPerformanceMetrics.reduce((sum, m) => sum + (m.cls || 0), 0) / allPerformanceMetrics.length;
  const avgPageLoad = allPerformanceMetrics.reduce((sum, m) => sum + (m.pageLoadTime || 0), 0) / allPerformanceMetrics.length;

  const avgApiResponseTime = allApiCalls.length > 0 
    ? allApiCalls.reduce((sum, api) => sum + (api.responseTime || 0), 0) / allApiCalls.length 
    : 0;

  const apiSuccessRate = allApiCalls.length > 0
    ? (allApiCalls.filter(api => api.success).length / allApiCalls.length) * 100
    : 100;

  return {
    coreWebVitals: {
      fcp: Math.round(avgFCP),
      lcp: Math.round(avgLCP),
      fid: Math.round(avgFID),
      cls: Math.round(avgCLS * 1000) / 1000, // Round to 3 decimal places
    },
    performance: {
      avgPageLoadTime: Math.round(avgPageLoad),
      avgApiResponseTime: Math.round(avgApiResponseTime),
      apiSuccessRate: Math.round(apiSuccessRate * 100) / 100,
    },
    grade: getPerformanceGrade(avgFCP, avgLCP, avgFID, avgCLS),
  };
}

function getPerformanceGrade(fcp: number, lcp: number, fid: number, cls: number): string {
  const fcpGood = fcp <= 1800;
  const lcpGood = lcp <= 2500;
  const fidGood = fid <= 100;
  const clsGood = cls <= 0.1;

  const goodMetrics = [fcpGood, lcpGood, fidGood, clsGood].filter(Boolean).length;

  if (goodMetrics >= 3) return 'A';
  if (goodMetrics >= 2) return 'B';
  if (goodMetrics >= 1) return 'C';
  return 'D';
}
