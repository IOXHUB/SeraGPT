import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock error logs data
    const mockLogs = [
      {
        id: 'error-001',
        timestamp: '2024-01-20T15:30:45Z',
        level: 'error',
        source: 'API',
        message: 'OpenAI API rate limit exceeded',
        details: 'Rate limit reached for model gpt-4',
        userId: 'user-123',
        resolved: false,
        resolvedAt: null,
        resolvedBy: null
      },
      {
        id: 'error-002',
        timestamp: '2024-01-20T14:15:22Z',
        level: 'warning',
        source: 'Database',
        message: 'Slow query detected',
        details: 'Query took 3.2 seconds to complete',
        userId: null,
        resolved: true,
        resolvedAt: '2024-01-20T14:30:00Z',
        resolvedBy: 'admin@seragpt.com'
      },
      {
        id: 'error-003',
        timestamp: '2024-01-20T13:45:10Z',
        level: 'info',
        source: 'Auth',
        message: 'Failed login attempt',
        details: 'Invalid credentials for user@example.com',
        userId: null,
        resolved: false,
        resolvedAt: null,
        resolvedBy: null
      }
    ];

    const stats = {
      totalLogs: mockLogs.length,
      errorCount: mockLogs.filter(l => l.level === 'error').length,
      warningCount: mockLogs.filter(l => l.level === 'warning').length,
      resolvedCount: mockLogs.filter(l => l.resolved).length,
      last24h: 15
    };

    return NextResponse.json({
      success: true,
      data: {
        logs: mockLogs,
        stats: stats
      }
    });

  } catch (error) {
    console.error('Error Logs API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch error logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, logId } = body;

    if (action === 'resolve' && logId) {
      console.log('✅ Hata çözüldü olarak işaretlendi:', logId);
      return NextResponse.json({
        success: true,
        message: 'Hata çözüldü olarak işaretlendi'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Geçersiz işlem'
    }, { status: 400 });

  } catch (error) {
    console.error('Error Logs Action Error:', error);
    return NextResponse.json(
      { success: false, error: 'İşlem başarısız' },
      { status: 500 }
    );
  }
}
