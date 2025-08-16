'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface Deployment {
  id: string;
  environment: 'production' | 'staging' | 'development';
  status: 'deploying' | 'success' | 'failed' | 'cancelled';
  branch: string;
  commit: string;
  deployedBy: string;
  startTime: string;
  duration: number;
  url: string;
  buildLogs: string[];
}

interface EnvironmentConfig {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  lastDeployment: string;
  version: string;
  uptime: string;
  url: string;
  ssl: boolean;
  performance: number;
}

export default function DeploymentPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [environments, setEnvironments] = useState<EnvironmentConfig[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deployInProgress, setDeployInProgress] = useState(false);

  const tabs = [
    { id: 'overview', title: 'Genel Bakış', icon: '🌍' },
    { id: 'deployments', title: 'Deployment\'lar', icon: '🚀' },
    { id: 'environments', title: 'Ortamlar', icon: '🏗️' },
    { id: 'domains', title: 'Domain & SSL', icon: '🔒' },
    { id: 'analytics', title: 'Analytics', icon: '📊' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadDeploymentData();
    }
  }, [user, loading]);

  const loadDeploymentData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Mock deployment data
      const mockDeployments: Deployment[] = [
        {
          id: 'deploy-001',
          environment: 'production',
          status: 'success',
          branch: 'main',
          commit: 'a1b2c3d',
          deployedBy: 'Admin User',
          startTime: '10 dakika önce',
          duration: 45,
          url: 'https://seragpt.com',
          buildLogs: [
            '[14:30] Starting deployment...',
            '[14:31] Installing dependencies...',
            '[14:33] Building application...',
            '[14:35] Deployment successful!'
          ]
        },
        {
          id: 'deploy-002',
          environment: 'staging',
          status: 'deploying',
          branch: 'develop',
          commit: 'e4f5g6h',
          deployedBy: 'Admin User',
          startTime: '2 dakika önce',
          duration: 0,
          url: 'https://staging.seragpt.com',
          buildLogs: [
            '[14:45] Starting deployment...',
            '[14:46] Installing dependencies...',
            '[14:47] Building application... (in progress)'
          ]
        },
        {
          id: 'deploy-003',
          environment: 'development',
          status: 'failed',
          branch: 'feature/new-ui',
          commit: 'i7j8k9l',
          deployedBy: 'Developer',
          startTime: '1 saat önce',
          duration: 30,
          url: 'https://dev.seragpt.com',
          buildLogs: [
            '[13:45] Starting deployment...',
            '[13:46] Installing dependencies...',
            '[13:48] Building application...',
            '[13:50] ERROR: Build failed - TypeScript errors found'
          ]
        }
      ];

      const mockEnvironments: EnvironmentConfig[] = [
        {
          name: 'Production',
          status: 'healthy',
          lastDeployment: '10 dakika önce',
          version: 'v2.1.3',
          uptime: '99.9%',
          url: 'https://seragpt.com',
          ssl: true,
          performance: 95
        },
        {
          name: 'Staging',
          status: 'warning',
          lastDeployment: 'Şu anda deploy oluyor',
          version: 'v2.1.4-beta',
          uptime: '98.5%',
          url: 'https://staging.seragpt.com',
          ssl: true,
          performance: 88
        },
        {
          name: 'Development',
          status: 'error',
          lastDeployment: '1 saat önce (başarısız)',
          version: 'v2.1.4-dev',
          uptime: '85.2%',
          url: 'https://dev.seragpt.com',
          ssl: false,
          performance: 72
        }
      ];

      setDeployments(mockDeployments);
      setEnvironments(mockEnvironments);
    } catch (error) {
      console.error('Failed to load deployment data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': case 'healthy': return 'bg-green-100 text-green-700';
      case 'deploying': case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'failed': case 'error': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Başarılı';
      case 'deploying': return 'Deploy Oluyor';
      case 'failed': return 'Başarısız';
      case 'cancelled': return 'İptal Edildi';
      case 'healthy': return 'Sağlıklı';
      case 'warning': return 'Uyarı';
      case 'error': return 'Hata';
      default: return status;
    }
  };

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case 'production': return '🌍';
      case 'staging': return '🧪';
      case 'development': return '🛠️';
      default: return '⚙️';
    }
  };

  const startDeployment = async (environment: string, branch: string) => {
    setDeployInProgress(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newDeployment: Deployment = {
      id: `deploy-${Date.now()}`,
      environment: environment as any,
      status: Math.random() > 0.2 ? 'success' : 'failed',
      branch: branch,
      commit: Math.random().toString(36).substring(7),
      deployedBy: 'Admin User',
      startTime: 'Şimdi',
      duration: Math.floor(Math.random() * 60 + 30),
      url: `https://${environment === 'production' ? '' : environment + '.'}seragpt.com`,
      buildLogs: [
        '[Şimdi] Starting deployment...',
        '[Şimdi] Installing dependencies...',
        '[Şimdi] Building application...',
        '[Şimdi] Deployment completed!'
      ]
    };
    
    setDeployments(prev => [newDeployment, ...prev.slice(0, 9)]);
    setDeployInProgress(false);
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-white/10 rounded"></div>
                ))}
              </div>
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
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: '#f6f8f9' }}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Deployment Yönetimi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Vercel, domain ve SSL yönetimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadDeploymentData}
                disabled={dataLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dataLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {dataLoading ? '🔄 Yenileniyor...' : '🔄 Yenile'}
              </button>
              <button
                onClick={() => startDeployment('production', 'main')}
                disabled={deployInProgress}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  deployInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#f6f8f9', color: '#1e3237' }}
              >
                🚀 Hızlı Deploy
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Deploy</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{deployments.length}</p>
              </div>
              <div className="text-2xl">🚀</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {Math.round(deployments.filter(d => d.status === 'success').length / deployments.length * 100)}%
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Ortam</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{environments.length}</p>
              </div>
              <div className="text-2xl">🌍</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Uptime</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>99.9%</p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Sistem Durumu</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {environments.map((env) => (
                  <div key={env.name} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold" style={{ color: '#1e3237' }}>{env.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                        {getStatusText(env.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>Version</span>
                        <span style={{ color: '#146448' }}>{env.version}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>Son Deploy</span>
                        <span style={{ color: '#146448' }}>{env.lastDeployment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>Uptime</span>
                        <span style={{ color: '#146448' }}>{env.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>SSL</span>
                        <span style={{ color: '#146448' }}>{env.ssl ? '✅ Aktif' : '❌ Pasif'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#1e3237', opacity: '0.7' }}>Performance</span>
                        <span style={{ color: '#146448' }}>{env.performance}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300" 
                          style={{ backgroundColor: '#baf200', width: `${env.performance}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => window.open(env.url, '_blank')}
                        className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        🌐 Ziyaret Et
                      </button>
                      <button
                        onClick={() => startDeployment(env.name.toLowerCase(), 'main')}
                        disabled={deployInProgress}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          deployInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                        }`}
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        🚀 Deploy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deployments' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Deployment Geçmişi</h3>
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-xl">{getEnvironmentIcon(deployment.environment)}</span>
                          <h4 className="font-semibold" style={{ color: '#1e3237' }}>
                            {deployment.environment.charAt(0).toUpperCase() + deployment.environment.slice(1)}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                            {getStatusText(deployment.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Branch</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{deployment.branch}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Commit</p>
                            <p className="font-medium font-mono" style={{ color: '#146448' }}>{deployment.commit}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Deploy Eden</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{deployment.deployedBy}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Başlangıç</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{deployment.startTime}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Süre</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {deployment.duration > 0 ? `${deployment.duration}s` : 'Devam ediyor...'}
                            </p>
                          </div>
                        </div>
                        
                        {deployment.buildLogs.length > 0 && (
                          <details className="mt-3">
                            <summary className="cursor-pointer text-sm font-medium" style={{ color: '#146448' }}>
                              Build Logları
                            </summary>
                            <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                              <pre className="text-xs font-mono" style={{ color: '#1e3237' }}>
                                {deployment.buildLogs.join('\n')}
                              </pre>
                            </div>
                          </details>
                        )}
                      </div>
                      
                      <div className="ml-6 flex space-x-2">
                        <button
                          onClick={() => window.open(deployment.url, '_blank')}
                          className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          🌐 Ziyaret Et
                        </button>
                        {deployment.status === 'failed' && (
                          <button
                            onClick={() => startDeployment(deployment.environment, deployment.branch)}
                            disabled={deployInProgress}
                            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                              deployInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                            }`}
                            style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                          >
                            🔄 Yeniden Dene
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'environments' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Ortam Yönetimi</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Yeni Deployment</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Ortam
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="production">Production</option>
                        <option value="staging">Staging</option>
                        <option value="development">Development</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Branch
                      </label>
                      <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <option value="main">main</option>
                        <option value="develop">develop</option>
                        <option value="staging">staging</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>Otomatik Deployment</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Push edildiğinde otomatik deploy et
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <button
                      onClick={() => startDeployment('production', 'main')}
                      disabled={deployInProgress}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        deployInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      {deployInProgress ? '🔄 Deploy Oluyor...' : '🚀 Deploy Başlat'}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Environment Variables</h4>
                  <div className="space-y-3">
                    {['NEXT_PUBLIC_API_URL', 'DATABASE_URL', 'REDIS_URL', 'JWT_SECRET'].map((envVar) => (
                      <div key={envVar} className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <span className="font-mono text-sm" style={{ color: '#1e3237' }}>{envVar}</span>
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            ✏️ Düzenle
                          </button>
                          <button
                            className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                            style={{ backgroundColor: '#f69200', color: '#f6f8f9' }}
                          >
                            🗑️ Sil
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90 border-2 border-dashed"
                      style={{ borderColor: '#146448', color: '#146448' }}
                    >
                      ➕ Yeni Variable Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'domains' && (
            <div>
              <h3 className="text-xl font-semibel mb-6" style={{ color: '#f6f8f9' }}>Domain & SSL Yönetimi</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Domains</h4>
                  <div className="space-y-4">
                    {['seragpt.com', 'www.seragpt.com', 'staging.seragpt.com', 'dev.seragpt.com'].map((domain) => (
                      <div key={domain} className="flex items-center justify-between p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                        <div>
                          <span className="font-medium" style={{ color: '#1e3237' }}>{domain}</span>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            SSL: ✅ Aktif • DNS: ✅ Yapılandırılmış
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            🔄 SSL Yenile
                          </button>
                          <button
                            className="px-2 py-1 rounded text-xs font-medium hover:opacity-90"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            ⚙️ Ayarlar
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90 border-2 border-dashed"
                      style={{ borderColor: '#146448', color: '#146448' }}
                    >
                      ➕ Yeni Domain Ekle
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>SSL Certificates</h4>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: '#1e3237' }}>Let's Encrypt Certificate</span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Aktif</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p style={{ color: '#1e3237', opacity: '0.7' }}>Verilen: 15 Ocak 2024</p>
                        <p style={{ color: '#1e3237', opacity: '0.7' }}>Bitiş: 15 Nisan 2024</p>
                        <p style={{ color: '#1e3237', opacity: '0.7' }}>Kalan: 89 gün</p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-2">🔒 SSL Durumu</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>✅ Otomatik yenileme aktif</li>
                        <li>✅ Tüm alt domainler korumalı</li>
                        <li>✅ HSTS etkinleştirildi</li>
                        <li>✅ Mixed content koruması</li>
                      </ul>
                    </div>
                    
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      🔄 SSL Sertifikasını Yenile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Deployment Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Deployment Sıklığı (Son 30 Gün)</h4>
                  <div className="h-48 flex items-end justify-between space-x-1">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          backgroundColor: '#baf200',
                          height: `${Math.random() * 80 + 20}%`,
                          minHeight: '8px'
                        }}
                        title={`Gün ${i + 1} - ${Math.floor(Math.random() * 5 + 1)} deployment`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                    <span>30 gün önce</span>
                    <span>Bugün</span>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Başarı/Başarısızlık Oranları</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Başarılı Deployments</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#baf200', width: '94%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Başarısız Deployments</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>6%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#f69200', width: '6%' }}></div>
                    </div>
                    
                    <div className="mt-4 p-3 rounded-lg bg-gray-50">
                      <h5 className="font-medium mb-2" style={{ color: '#1e3237' }}>Ortalama Metrikler</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Build Süresi</p>
                          <p style={{ color: '#146448' }}>42 saniye</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Deploy Süresi</p>
                          <p style={{ color: '#146448' }}>18 saniye</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Deployment Ayarları</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Vercel Ayarları</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Vercel Token
                      </label>
                      <input 
                        type="password" 
                        defaultValue="vercel_token_***"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Project ID
                      </label>
                      <input 
                        type="text" 
                        defaultValue="seragpt-project-id"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Team ID
                      </label>
                      <input 
                        type="text" 
                        defaultValue="seragpt-team-id"
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Build Ayarları</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Build Command
                      </label>
                      <input 
                        type="text" 
                        defaultValue="npm run build"
                        className="w-full p-3 border rounded-lg font-mono" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Output Directory
                      </label>
                      <input 
                        type="text" 
                        defaultValue=".next"
                        className="w-full p-3 border rounded-lg font-mono" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>TypeScript Check</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Build öncesi TypeScript kontrolü
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium" style={{ color: '#1e3237' }}>ESLint Check</h5>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                          Build öncesi ESLint kontrolü
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  💾 Ayarları Kaydet
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  🧪 Bağlantıyı Test Et
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
