import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, method = 'GET', headers = {}, body: testBody } = body;

    // Validate endpoint
    if (!endpoint) {
      return NextResponse.json(
        { success: false, error: 'Endpoint URL is required' },
        { status: 400 }
      );
    }

    // Security check - only allow certain domains for testing
    const allowedDomains = [
      'api.openai.com',
      'supabase.com',
      'api.openweathermap.org',
      'httpbin.org',
      'jsonplaceholder.typicode.com'
    ];

    const url = new URL(endpoint);
    const isDomainAllowed = allowedDomains.some(domain => 
      url.hostname === domain || url.hostname.endsWith('.' + domain)
    );

    if (!isDomainAllowed) {
      return NextResponse.json({
        success: false,
        error: 'Domain not allowed for testing',
        allowedDomains: allowedDomains
      }, { status: 403 });
    }

    const startTime = Date.now();
    let testResult;

    try {
      // Make the actual API call
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: testBody ? JSON.stringify(testBody) : undefined,
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      const responseTime = Date.now() - startTime;
      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      testResult = {
        success: true,
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTime,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
        size: responseText.length
      };

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      testResult = {
        success: false,
        error: error.message,
        responseTime: responseTime,
        errorType: error.name || 'Unknown'
      };
    }

    console.log('🔌 API Test yapıldı:', { endpoint, method, result: testResult.success });

    return NextResponse.json({
      success: true,
      data: testResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Test Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform API test' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return available test endpoints
  return NextResponse.json({
    success: true,
    data: {
      availableEndpoints: [
        {
          name: 'JSONPlaceholder - Posts',
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET',
          description: 'Test GET request'
        },
        {
          name: 'HTTPBin - Status Test',
          url: 'https://httpbin.org/status/200',
          method: 'GET',
          description: 'Test HTTP status codes'
        },
        {
          name: 'HTTPBin - JSON Response',
          url: 'https://httpbin.org/json',
          method: 'GET',
          description: 'Test JSON response'
        }
      ],
      allowedDomains: [
        'api.openai.com',
        'supabase.com', 
        'api.openweathermap.org',
        'httpbin.org',
        'jsonplaceholder.typicode.com'
      ]
    }
  });
}
