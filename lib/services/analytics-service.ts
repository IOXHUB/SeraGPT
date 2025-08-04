import { ApiResponse } from '../api-config';

export interface AnalyticsMetrics {
  users: {
    total: number;
    active: number;
    new: number;
    growth: number; // percentage
  };
  analyses: {
    total: number;
    today: number;
    byType: Record<string, number>;
    growth: number;
  };
  revenue: {
    total: number;
    monthly: number;
    growth: number;
  };
  tokens: {
    purchased: number;
    used: number;
    remaining: number;
  };
}

export interface UsageData {
  date: string;
  users: number;
  analyses: number;
  revenue: number;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number; // percentage
  responseTime: number; // ms
  errorRate: number; // percentage
  services: {
    api: 'up' | 'down' | 'degraded';
    database: 'up' | 'down' | 'degraded';
    storage: 'up' | 'down' | 'degraded';
    payment: 'up' | 'down' | 'degraded';
  };
  lastChecked: Date;
}

export interface UserActivity {
  userId: string;
  userName: string;
  email: string;
  action: string;
  analysisType?: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

class AnalyticsService {
  // Mock data for demonstration
  private generateMockMetrics(): AnalyticsMetrics {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return {
      users: {
        total: 1247,
        active: 892,
        new: 156,
        growth: 12.5
      },
      analyses: {
        total: 5634,
        today: 89,
        byType: {
          roi: 1876,
          climate: 1245,
          market: 998,
          equipment: 834,
          layout: 681
        },
        growth: 8.3
      },
      revenue: {
        total: 45230,
        monthly: 8960,
        growth: 15.7
      },
      tokens: {
        purchased: 12450,
        used: 8920,
        remaining: 3530
      }
    };
  }

  private generateMockUsageData(days: number): UsageData[] {
    const data: UsageData[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        users: Math.floor(Math.random() * 100) + 50,
        analyses: Math.floor(Math.random() * 150) + 30,
        revenue: Math.floor(Math.random() * 2000) + 500
      });
    }

    return data;
  }

  private generateMockUserActivity(): UserActivity[] {
    const activities: UserActivity[] = [];
    const now = new Date();

    const actions = [
      'ROI analizi tamamladı',
      'İklim analizi başlattı',
      'Pazar verileri görüntüledi',
      'Jeton paketi satın aldı',
      'PDF raporu indirdi',
      'AI sohbet başlattı',
      'Layout planlama tamamladı',
      'Hesap oluşturdu',
      'Giriş yaptı',
      'Çıkış yaptı'
    ];

    const users = [
      { id: 'user_1', name: 'Mehmet Yılmaz', email: 'mehmet@example.com' },
      { id: 'user_2', name: 'Ayşe Kaya', email: 'ayse@example.com' },
      { id: 'user_3', name: 'Ali Demir', email: 'ali@example.com' },
      { id: 'user_4', name: 'Fatma Şen', email: 'fatma@example.com' },
      { id: 'user_5', name: 'Hasan Öz', email: 'hasan@example.com' }
    ];

    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);

      activities.push({
        userId: user.id,
        userName: user.name,
        email: user.email,
        action,
        timestamp,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });
    }

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getMetrics(): Promise<ApiResponse<AnalyticsMetrics>> {
    try {
      // In production, fetch from database
      const metrics = this.generateMockMetrics();
      
      return {
        success: true,
        data: metrics
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch analytics metrics'
      };
    }
  }

  async getUsageData(days: number = 30): Promise<ApiResponse<UsageData[]>> {
    try {
      const data = this.generateMockUsageData(days);
      
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch usage data'
      };
    }
  }

  async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    try {
      // Mock system health check
      const health: SystemHealth = {
        status: 'healthy',
        uptime: 99.8,
        responseTime: 125,
        errorRate: 0.2,
        services: {
          api: 'up',
          database: 'up',
          storage: 'up',
          payment: 'up'
        },
        lastChecked: new Date()
      };

      return {
        success: true,
        data: health
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to check system health'
      };
    }
  }

  async getUserActivity(limit: number = 50): Promise<ApiResponse<UserActivity[]>> {
    try {
      const activities = this.generateMockUserActivity().slice(0, limit);
      
      return {
        success: true,
        data: activities
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch user activity'
      };
    }
  }

  async trackUserAction(
    userId: string,
    action: string,
    metadata?: Record<string, any>
  ): Promise<ApiResponse<void>> {
    try {
      // In production, save to analytics database
      console.log('User action tracked:', {
        userId,
        action,
        metadata,
        timestamp: new Date()
      });

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to track user action'
      };
    }
  }

  async generateReport(
    type: 'users' | 'analyses' | 'revenue' | 'system',
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<any>> {
    try {
      // Generate different types of reports
      let reportData;

      switch (type) {
        case 'users':
          reportData = {
            type: 'User Report',
            period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
            metrics: this.generateMockMetrics().users,
            details: 'User growth and engagement metrics'
          };
          break;

        case 'analyses':
          reportData = {
            type: 'Analysis Report',
            period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
            metrics: this.generateMockMetrics().analyses,
            details: 'Analysis usage and performance metrics'
          };
          break;

        case 'revenue':
          reportData = {
            type: 'Revenue Report',
            period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
            metrics: this.generateMockMetrics().revenue,
            details: 'Revenue and financial metrics'
          };
          break;

        case 'system':
          reportData = {
            type: 'System Report',
            period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
            health: await this.getSystemHealth(),
            details: 'System performance and health metrics'
          };
          break;

        default:
          throw new Error('Invalid report type');
      }

      return {
        success: true,
        data: reportData
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate report'
      };
    }
  }

  // Real-time metrics (would use WebSocket in production)
  async getRealtimeMetrics(): Promise<ApiResponse<{
    activeUsers: number;
    currentAnalyses: number;
    systemLoad: number;
    errorCount: number;
  }>> {
    try {
      const metrics = {
        activeUsers: Math.floor(Math.random() * 50) + 100,
        currentAnalyses: Math.floor(Math.random() * 20) + 5,
        systemLoad: Math.floor(Math.random() * 30) + 40, // 40-70%
        errorCount: Math.floor(Math.random() * 5)
      };

      return {
        success: true,
        data: metrics
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch realtime metrics'
      };
    }
  }

  // Export data for external analysis
  async exportData(
    type: 'users' | 'analyses' | 'revenue',
    format: 'csv' | 'json' | 'xlsx'
  ): Promise<ApiResponse<{ downloadUrl: string; filename: string }>> {
    try {
      // In production, generate actual export files
      const filename = `seragpt_${type}_export_${new Date().toISOString().split('T')[0]}.${format}`;
      const downloadUrl = `https://seragpt-exports.s3.amazonaws.com/${filename}`;

      return {
        success: true,
        data: {
          downloadUrl,
          filename
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to export data'
      };
    }
  }
}

export const analyticsService = new AnalyticsService();
