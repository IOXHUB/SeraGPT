import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock admin dashboard data
    const adminStats = {
      totalUsers: 1247,
      activeUsers: 89,
      totalAnalyses: 5429,
      systemHealth: 98.5,
      apiCalls: 12450,
      revenue: 8947.50,
      errorCount: 3,
      backupStatus: 'success'
    };

    const systemStatus = {
      services: {
        database: { status: 'healthy', responseTime: 45, uptime: 99.9 },
        api: { status: 'healthy', responseTime: 120, uptime: 99.8 },
        ai_service: { status: 'healthy', responseTime: 890, uptime: 99.5 },
        storage: { status: 'healthy', responseTime: 25, uptime: 100.0 },
        cache: { status: 'healthy', responseTime: 15, uptime: 99.9 }
      },
      alerts: [
        {
          id: 'alert-001',
          type: 'info',
          message: 'Sistem bakımı 23:00\'da planlandı',
          timestamp: '2024-01-20T15:30:00Z'
        }
      ],
      metrics: {
        cpuUsage: 35.4,
        memoryUsage: 68.2,
        diskUsage: 42.1,
        activeConnections: 234
      }
    };

    return NextResponse.json({
      success: true,
      data: {
        stats: adminStats,
        systemStatus: systemStatus,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Admin Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin dashboard data' },
      { status: 500 }
    );
  }
}
