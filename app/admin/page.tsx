'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalAnalyses: number;
  systemHealth: number;
  apiCalls: number;
  revenue: number;
  errorCount: number;
  backupStatus: string;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const adminMenuSections = [
    {
      id: 'ai-management',
      title: 'Yapay Zeka Yönetimi',
      description: 'AI sistemleri, promptlar ve model yönetimi',
      icon: '🤖',
      items: [
        { id: 'ai-panel', title: 'AI Panel', description: 'Model performansı ve ayarları', href: '/admin/ai-panel' },
        { id: 'prompt-archive', title: 'Prompt Arşivi', description: 'Sistem ve kullanıcı promptları', href: '/admin/prompts' },
        { id: 'system-prompts', title: 'Sistem Promptları', description: 'Core AI davranış ayarları', href: '/admin/system-prompts' },
        { id: 'ai-training', title: 'AI Eğitimi', description: 'Model eğitim ve fine-tuning', href: '/admin/ai-training' }
      ]
    },
    {
      id: 'analysis-management',
      title: 'Analiz Yönetimi',
      description: 'Tüm analizlerin detaylı kontrolü',
      icon: '📊',
      items: [
        { id: 'analysis-editor', title: 'Analiz Editörü', description: 'Analiz türlerini düzenle', href: '/admin/analysis-editor' },
        { id: 'analysis-results', title: 'Analiz Sonuçları', description: 'Tüm analiz sonuçlarını incele', href: '/admin/analysis-results' },
        { id: 'analysis-templates', title: 'Analiz Şablonları', description: 'Yeni analiz türleri oluştur', href: '/admin/analysis-templates' },
        { id: 'analysis-performance', title: 'Analiz Performansı', description: 'İstatistikler ve optimizasyon', href: '/admin/analysis-performance' }
      ]
    },
    {
      id: 'system-monitoring',
      title: 'Sistem İzleme',
      description: 'Site sağlığı, performans ve güvenlik',
      icon: '🔍',
      items: [
        { id: 'system-health', title: 'Sistem Sağlığı', description: 'Sunucu durumu ve metrikler', href: '/admin/system-health' },
        { id: 'api-monitor', title: 'API İzleme', description: 'Dış API durumları ve testler', href: '/admin/api-monitor' },
        { id: 'error-logs', title: 'Hata Günlükleri', description: 'Sistem hataları ve çözümler', href: '/admin/error-logs' },
        { id: 'backup-system', title: 'Yedekleme Sistemi', description: 'Otomatik yedekler ve restore', href: '/admin/backup-system' }
      ]
    },
    {
      id: 'user-content',
      title: 'Kullanıcı & İçerik',
      description: 'Kullanıcı yönetimi ve içerik kontrolü',
      icon: '👥',
      items: [
        { id: 'user-management', title: 'Kullanıcı Yönetimi', description: 'Detaylı kullanıcı kontrolleri', href: '/admin/users' },
        { id: 'content-manager', title: 'İçerik Yöneticisi', description: 'Blog, sayfalar ve medya', href: '/admin/content' },
        { id: 'seo-manager', title: 'SEO Yöneticisi', description: 'Meta tags, sitemap, robots', href: '/admin/seo' },
        { id: 'analytics', title: 'Detaylı Analitik', description: 'Kullanım istatistikleri', href: '/admin/analytics' }
      ]
    },
    {
      id: 'development',
      title: 'Geliştirici Araçları',
      description: 'API testleri ve sistem ayarları',
      icon: '⚙️',
      items: [
        { id: 'api-tester', title: 'API Test Merkezi', description: 'Kapsamlı API test araçları', href: '/admin/api-test' },
        { id: 'database-admin', title: 'Veritabanı Yönetimi', description: 'SQL sorguları ve optimizasyon', href: '/admin/database' },
        { id: 'cache-manager', title: 'Cache Yöneticisi', description: 'Redis ve cache stratejileri', href: '/admin/cache' },
        { id: 'deployment', title: 'Deployment', description: 'Vercel, domain ve SSL', href: '/admin/deployment' }
      ]
    },
    {
      id: 'security-auth',
      title: 'Güvenlik & Yetkilendirme',
      description: 'Güvenlik ayarları ve access control',
      icon: '🔒',
      items: [
        { id: 'auth-settings', title: 'Auth Ayarları', description: 'Supabase ve JWT ayarları', href: '/admin/auth' },
        { id: 'rate-limiting', title: 'Rate Limiting', description: 'API hız limitlği ayarları', href: '/admin/rate-limit' },
        { id: 'security-logs', title: 'Güvenlik Günlükleri', description: 'Şüpheli aktiviteler', href: '/admin/security-logs' },
        { id: 'admin-roles', title: 'Admin Rolleri', description: 'Yetki seviyesi yönetimi', href: '/admin/roles' }
      ]
    }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAdminData();
    }
  }, [user, loading]);

  const loadAdminData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock comprehensive admin data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: AdminStats = {
        totalUsers: 1847,
        activeUsers: 892,
        totalAnalyses: 5634,
        systemHealth: 99.9,
        apiCalls: 45230,
        revenue: 128450,
        errorCount: 12,
        backupStatus: 'completed'
      };

      const mockSystemStatus = {
        server: { status: 'healthy', cpu: 45, memory: 67, disk: 23 },
        database: { status: 'healthy', connections: 23, queries: 1245 },
        apis: { active: 12, failing: 1, avgResponse: 145 },
        cache: { hitRate: 94.5, size: '2.3GB', evictions: 45 }
      };
      
      setStats(mockStats);
      setSystemStatus(mockSystemStatus);
      
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  // Redirect non-admin users
  if (!loading && user && !isAdmin()) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full rounded-lg p-8 text-center" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Yetkisiz Erişim</h3>
            <p className="mb-6" style={{ color: '#1e3237', opacity: '0.7' }}>Bu sayfaya erişmek için admin yetkisine sahip olmanız gerekir.</p>
            <Link 
              href="/dashboard" 
              className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Dashboard'a Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || dataLoading || !stats) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-lg p-6 animate-pulse" style={{ backgroundColor: '#f6f8f9' }}>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-20 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Admin Panel</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>SeraGPT yönetim merkezi</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Dashboard'a Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* System Overview Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Sistem Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Kullanıcı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>+{Math.floor(stats.totalUsers * 0.1)} bu hafta</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Sistem Sağlığı</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.systemHealth}%</p>
                </div>
                <div className="text-2xl">💚</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Tüm sistemler aktif</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>API Çağrıları</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{stats.apiCalls.toLocaleString()}</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>Son 24 saat</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aylık Gelir</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>₺{stats.revenue.toLocaleString()}</p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#146448' }}>+18% büyüme</p>
            </div>
          </div>
        </div>

        {/* Admin Menu Sections */}
        <div className="space-y-8">
          {adminMenuSections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{section.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>{section.title}</h3>
                  <p style={{ color: '#f6f8f9', opacity: '0.7' }}>{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105 group"
                    style={{ backgroundColor: '#f6f8f9' }}
                  >
                    <h4 className="font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: '#1e3237' }}>
                      {item.title}
                    </h4>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {item.description}
                    </p>
                    <div className="mt-4 text-right">
                      <span 
                        className="text-sm font-medium group-hover:opacity-80 transition-opacity"
                        style={{ color: '#146448' }}
                      >
                        Yönet →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System Status Details */}
        {systemStatus && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Detaylı Sistem Durumu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Sunucu</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>CPU</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.server.cpu}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Memory</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.server.memory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Disk</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.server.disk}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Veritabanı</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Bağlantılar</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.database.connections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Sorgular/dk</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.database.queries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Durum</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>Sağlıklı</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>API Durumu</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Aktif API</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.apis.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Hatalı</span>
                    <span className="text-sm font-medium text-red-600">{systemStatus.apis.failing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Ort. Yanıt</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.apis.avgResponse}ms</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Cache</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Hit Rate</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.cache.hitRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Boyut</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.cache.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>Evictions</span>
                    <span className="text-sm font-medium" style={{ color: '#146448' }}>{systemStatus.cache.evictions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
