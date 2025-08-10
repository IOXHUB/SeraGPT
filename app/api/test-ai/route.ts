import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ 
        error: 'Message is required' 
      }, { status: 400 });
    }

    // Test OpenAI API directly
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured' 
      }, { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Sen SeraGPT'nin AI asistanısın. Sera tarımı, tarımsal yatırımlar, iklim analizi ve pazar verileri konularında uzmansın.

Görevin:
1. Kullanıcıların sera yatırım analizlerini yorumlamak
2. ROI, iklim, pazar verilerini analiz ederek öneriler sunmak
3. Sera tarımı best practice'leri paylaşmak
4. Türkiye'deki sera tarımı koşulları hakkında bilgi vermek
5. Teknik sorulara pratik çözümler üretmek

Yanıtların:
- Türkçe olmalı
- Teknik fakat anlaşılır olmalı
- Konkret önerilere odaklanmalı
- Türkiye koşullarını dikkate almalı`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'AI yanıt alınamadı';

    return NextResponse.json({ 
      success: true,
      response: aiResponse,
      usage: data.usage,
      message: 'AI entegrasyonu başarıyla çalışıyor!' 
    });

  } catch (error: any) {
    console.error('AI test error:', error);
    return NextResponse.json({ 
      error: 'AI service hatası: ' + error.message 
    }, { status: 500 });
  }
}
