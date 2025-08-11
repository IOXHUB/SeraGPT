'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface DeploymentInfo {
  environment: string;
  status: 'active' | 'deploying' | 'failed';
  lastDeploy: string;
  version: string;
  commitHash: string;
  deployTime: string;
  uptime: string;
}

interface Domain {
  name: string;
  status: 'active' | 'pending' | 'error';
  ssl: boolean;
  lastCheck: string;
}

export default function DeploymentManager() {
  const { user, isAdmin, loading } = useAuth();
  const [deployments, setDeployments] = useState<DeploymentInfo[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'deployments' | 'domains' | 'environments'>('deployments');

  useEffect(() => {
    if (user && !loading) {
      loadDeploymentData();
    }
  }, [user, loading]);

  const loadDeploymentData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock deployment data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockDeployments: DeploymentInfo[] = [
        {
          environment: 'Production',
          status: 'active',
          lastDeploy: '2024-01-15 14:30',
          version: 'v2.1.4',
          commitHash: 'abc123f',
          deployTime: '2m 34s',
          uptime: '15 gün 8 saat'
        },
        {
          environment: 'Staging',
          status: 'active',
          lastDeploy: '2024-01-15 12:15',
          version: 'v2.1.5-beta',
          commitHash: 'def456g',
          deployTime: '1m 56s',
          uptime: '2 gün 4 saat'
        },
        {
          environment: 'Development',
          status: 'deploying',
          lastDeploy: '2024-01-15 15:00',
          version: 'v2.2.0-dev',
          commitHash: 'ghi789h',
          deployTime: '-',
          uptime: '-'
        }
      ];

      const mockDomains: Domain[] = [
        {
          name: 'seragpt.com',
          status: 'active',
          ssl: true,
          lastCheck: '2024-01-15 14:45'
        },
        {
          name: 'www.seragpt.com',
          status: 'active',
          ssl: true,
          lastCheck: '2024-01-15 14:45'
        },
        {
          name: 'api.seragpt.com',
          status: 'active',
          ssl: true,
          lastCheck: '2024-01-15 14:45'
        }
      ];
      
      setDeployments(mockDeployments);
      setDomains(mockDomains);
      
    } catch (error) {
      console.error('Failed to load deployment data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const triggerDeploy = (environment: string) => {
    alert(`${environment} ortamına deployment başlatıldı`);
  };

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

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Deployment Yönetimi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Vercel deployment ve domain yönetimi</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => triggerDeploy('Production')}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
              >
                Production Deploy
              </button>
              <Link 
                href="/admin" 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Admin Panel'e Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#f6f8f9' }}>
            <button
              onClick={() => setActiveTab('deployments')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'deployments' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'deployments' ? '#146448' : 'transparent',
                color: activeTab === 'deployments' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Deployments
            </button>
            <button
              onClick={() => setActiveTab('domains')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'domains' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'domains' ? '#146448' : 'transparent',
                color: activeTab === 'domains' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveTab('environments')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'environments' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'environments' ? '#146448' : 'transparent',
                color: activeTab === 'environments' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Environment Variables
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'deployments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deployments.map((deploy, index) => (
                <div key={index} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>{deploy.environment}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      deploy.status === 'active' ? 'bg-green-100 text-green-800' :
                      deploy.status === 'deploying' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {deploy.status === 'active' ? 'Aktif' : 
                       deploy.status === 'deploying' ? 'Deploy Ediliyor' : 'Hatalı'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Version</span>
                      <span className="text-sm font-medium" style={{ color: '#146448' }}>{deploy.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Commit</span>
                      <span className="text-sm font-mono" style={{ color: '#146448' }}>{deploy.commitHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Son Deploy</span>
                      <span className="text-sm" style={{ color: '#1e3237' }}>{deploy.lastDeploy}</span>
                    </div>
                    {deploy.deployTime !== '-' && (
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#1e3237' }}>Deploy Süresi</span>
                        <span className="text-sm" style={{ color: '#1e3237' }}>{deploy.deployTime}</span>
                      </div>
                    )}
                    {deploy.uptime !== '-' && (
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#1e3237' }}>Uptime</span>
                        <span className="text-sm" style={{ color: '#1e3237' }}>{deploy.uptime}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <button 
                      onClick={() => triggerDeploy(deploy.environment)}
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      disabled={deploy.status === 'deploying'}
                    >
                      {deploy.status === 'deploying' ? 'Deploy Ediliyor...' : 'Yeniden Deploy Et'}
                    </button>
                    <button 
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Logları Görüntüle
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Son Deployment Logları</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
                <div>$ vercel deploy --prod</div>
                <div>🔍 Inspect: https://vercel.com/seragpt/deployments/abc123</div>
                <div>✅ Production: https://seragpt.com</div>
                <div>📦 Uploading files...</div>
                <div>🏗️ Building...</div>
                <div>✨ Build completed successfully</div>
                <div>🚀 Deployment ready</div>
                <div className="text-gray-400">[15:30:45] Deployment completed in 2m 34s</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'domains' && (
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Domain</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Status</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>SSL</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Son Kontrol</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domains.map((domain, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <p className="font-medium" style={{ color: '#1e3237' }}>{domain.name}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            domain.status === 'active' ? 'bg-green-100 text-green-800' :
                            domain.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {domain.status === 'active' ? 'Aktif' : 
                             domain.status === 'pending' ? 'Beklemede' : 'Hatalı'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            domain.ssl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {domain.ssl ? 'Aktif' : 'İnaktif'}
                          </span>
                        </td>
                        <td className="p-4" style={{ color: '#1e3237' }}>{domain.lastCheck}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button 
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                            >
                              Test Et
                            </button>
                            <button 
                              className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              Ayarlar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>SSL Sertifikaları</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>seragpt.com</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Let's Encrypt</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: '#146448' }}>Geçerli</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>90 gün kaldı</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium" style={{ color: '#1e3237' }}>*.seragpt.com</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Let's Encrypt</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: '#146448' }}>Geçerli</p>
                      <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>87 gün kaldı</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>DNS Ayarları</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>A Record</span>
                    <span className="text-sm font-mono" style={{ color: '#146448' }}>76.76.19.61</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>CNAME</span>
                    <span className="text-sm font-mono" style={{ color: '#146448' }}>cname.vercel-dns.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#1e3237' }}>MX Record</span>
                    <span className="text-sm font-mono" style={{ color: '#146448' }}>mx.vercel.app</span>
                  </div>
                </div>
                <button 
                  className="w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  DNS Ayarlarını Güncelle
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environments' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>Environment Variables</h3>
                <button 
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  + Yeni Variable Ekle
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'SUPABASE_URL', value: 'https://xxx.supabase.co', environment: 'all' },
                  { name: 'SUPABASE_ANON_KEY', value: 'eyJ***hidden***', environment: 'all' },
                  { name: 'NEXT_PUBLIC_SITE_URL', value: 'https://seragpt.com', environment: 'production' },
                  { name: 'EMAIL_API_KEY', value: '***hidden***', environment: 'all' },
                  { name: 'OPENAI_API_KEY', value: 'sk-***hidden***', environment: 'all' }
                ].map((envVar, index) => (
                  <div key={index} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#1e3237' }}>{envVar.name}</p>
                      <p className="text-sm opacity-70 font-mono" style={{ color: '#1e3237' }}>{envVar.value}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        envVar.environment === 'all' ? 'bg-blue-100 text-blue-800' :
                        envVar.environment === 'production' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {envVar.environment === 'all' ? 'Tüm Ortamlar' : 
                         envVar.environment === 'production' ? 'Production' : 'Development'}
                      </span>
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        Düzenle
                      </button>
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Build & Deploy Ayarları</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Build Command
                  </label>
                  <input
                    type="text"
                    value="npm run build"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Output Directory
                  </label>
                  <input
                    type="text"
                    value=".next"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                    Install Command
                  </label>
                  <input
                    type="text"
                    value="npm install"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#146448' }}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="auto-deploy" className="rounded" checked />
                  <label htmlFor="auto-deploy" className="text-sm font-medium" style={{ color: '#1e3237' }}>
                    Otomatik Deploy (Git push'ta)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="preview-deploy" className="rounded" checked />
                  <label htmlFor="preview-deploy" className="text-sm font-medium" style={{ color: '#1e3237' }}>
                    Preview Deployments
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  Ayarları Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
