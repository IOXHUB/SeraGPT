import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    console.log('Has Key:', !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }, { status: 500 });
    }

    // Test direct fetch to Supabase
    const testUrl = `${supabaseUrl}/auth/v1/settings`;
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey
      }
    });

    const responseData = await response.text();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      responseData: responseData.substring(0, 200),
      environment: {
        url: supabaseUrl,
        hasKey: !!supabaseKey,
        keyPreview: supabaseKey.substring(0, 20) + '...'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Supabase test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      name: error.name,
      stack: error.stack?.substring(0, 500),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
