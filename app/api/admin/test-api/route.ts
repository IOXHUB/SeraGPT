import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface APITestRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
}

interface APITestResult {
  success: boolean;
  statusCode: number;
  responseTime: number;
  response?: any;
  error?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin access
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { testType, apiData } = body;

    if (testType === 'single') {
      const result = await testSingleAPI(apiData);
      return NextResponse.json({ success: true, result });
    } else if (testType === 'bulk') {
      const results = await testMultipleAPIs(apiData);
      return NextResponse.json({ success: true, results });
    } else if (testType === 'predefined') {
      const results = await testPredefinedAPIs();
      return NextResponse.json({ success: true, results });
    }

    return NextResponse.json({ error: 'Invalid test type' }, { status: 400 });

  } catch (error) {
    console.error('API test failed:', error);
    return NextResponse.json(
      { error: 'Failed to execute API test' },
      { status: 500 }
    );
  }
}

async function testSingleAPI(apiData: APITestRequest): Promise<APITestResult> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiData.timeout || 10000);

    const response = await fetch(apiData.url, {
      method: apiData.method,
      headers: {
        'Content-Type': 'application/json',
        ...apiData.headers
      },
      body: apiData.method !== 'GET' ? apiData.body : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    const responseTime = Date.now() - startTime;
    let responseData;
    
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }

    return {
      success: response.ok,
      statusCode: response.status,
      responseTime,
      response: responseData,
      timestamp: new Date().toISOString()
    };

  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    return {
      success: false,
      statusCode: 0,
      responseTime,
      error: error.name === 'AbortError' ? 'Request timeout' : error.message,
      timestamp: new Date().toISOString()
    };
  }
}

async function testMultipleAPIs(apiList: APITestRequest[]): Promise<APITestResult[]> {
  const results: APITestResult[] = [];
  
  for (const apiData of apiList) {
    const result = await testSingleAPI(apiData);
    results.push(result);
    
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return results;
}

async function testPredefinedAPIs(): Promise<APITestResult[]> {
  const predefinedAPIs: APITestRequest[] = [
    {
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=demo',
      method: 'GET',
      timeout: 5000
    },
    {
      url: 'https://nominatim.openstreetmap.org/search?q=Istanbul&format=json&limit=1',
      method: 'GET',
      timeout: 5000
    },
    {
      url: 'https://evds2.tcmb.gov.tr/service/evds/serieList',
      method: 'GET',
      timeout: 5000
    },
    {
      url: '/api/analysis/roi',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        investment: 100000,
        expectedYield: 15,
        productPrice: 8,
        operatingCosts: 25000
      }),
      timeout: 10000
    },
    {
      url: '/api/analysis/climate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: 'Istanbul',
        analysisPeriod: '1 year'
      }),
      timeout: 10000
    },
    {
      url: '/api/auth/status',
      method: 'GET',
      timeout: 5000
    }
  ];

  return await testMultipleAPIs(predefinedAPIs);
}

// GET endpoint for retrieving API test history
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin access
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get API test history (you can implement this with a dedicated table)
    // For now, return mock data
    const testHistory = generateMockTestHistory();

    return NextResponse.json({
      success: true,
      data: testHistory
    });

  } catch (error) {
    console.error('Failed to fetch test history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test history' },
      { status: 500 }
    );
  }
}

function generateMockTestHistory() {
  const history = [];
  const apis = [
    'OpenWeather API',
    'Nominatim Geocoding',
    'TCMB Exchange API',
    'ROI Analysis API',
    'Climate Analysis API',
    'Auth Status API'
  ];

  for (let i = 0; i < 20; i++) {
    const api = apis[Math.floor(Math.random() * apis.length)];
    const success = Math.random() > 0.1; // 90% success rate
    
    history.push({
      id: `test-${i + 1}`,
      endpoint: api,
      status: success ? 'success' : 'error',
      responseTime: Math.floor(Math.random() * 2000) + 100,
      statusCode: success ? 200 : (Math.random() > 0.5 ? 500 : 404),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
