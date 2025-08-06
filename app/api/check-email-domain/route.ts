import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 });
  }

  try {
    // Check Resend domain status
    const response = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ 
        error: 'Failed to check domains',
        details: error,
        status: response.status
      });
    }

    const domains = await response.json();
    
    return NextResponse.json({
      success: true,
      domains: domains.data || domains,
      hasSeragpt: domains.data ? 
        domains.data.some((d: any) => d.name === 'seragpt.com') : false
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Domain check failed',
      details: error 
    }, { status: 500 });
  }
}
