import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json({
        error: 'Missing required fields: to, subject, message'
      }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        error: 'RESEND_API_KEY not configured'
      }, { status: 500 });
    }

    // Use fetch instead of dynamic import to avoid build issues
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SeraGPT <no-reply@seragpt.com>',
        to: [to],
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #146448;">🌱 SeraGPT Test Email</h2>
            <p>Bu bir test emailidir. API entegrasyonunuz başarıyla çalışıyor!</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong>Mesaj:</strong><br>
              ${message}
            </div>
            <p style="color: #666; font-size: 12px;">
              Bu email SeraGPT API test sistemi tarafından gönderilmiştir.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      messageId: result.id,
      message: 'Email başarıyla gönderildi!'
    });

  } catch (error: any) {
    console.error('Email test error:', error);
    return NextResponse.json({
      error: 'Email gönderiminde hata oluştu: ' + error.message
    }, { status: 500 });
  }
}
