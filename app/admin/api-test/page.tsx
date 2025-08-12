'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  description: string;
  category: string;
  status: 'active' | 'deprecated' | 'beta';
  lastTested: string;
  responseTime: number;
  successRate: number;
}

interface TestResult {
  id: string;
  endpointId: string;
  timestamp: string;
  status: 'success' | 'error' | 'timeout';
  responseTime: number;
  statusCode: number;
  responseSize: number;
  errorMessage?: string;
}

export default function ApiTestPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('endpoints');
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [testInProgress, setTestInProgress] = useState(false);

  const tabs = [
    { id: 'endpoints', title: 'API Endpoints', icon: '🔗' },
    { id: 'test', title: 'Test Merkezi', icon: '🧪' },
    { id: 'results', title: 'Test Sonuçları', icon: '📊' },
    { id: 'monitoring', title: 'İzleme', icon: '📈' },
    { id: 'documentation', title: 'Dokümantasyon', icon: '📚' }
  ];

  const categories = ['AI/Analysis', 'Authentication', 'User Management', 'Content', 'System'];

  useEffect(() => {
    if (user && !loading) {
      loadApiData();
    }
  }, [user, loading]);

  const loadApiData = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);

      // Mock API endpoints data
      const mockEndpoints: ApiEndpoint[] = [
        {
          id: 'api-001',
          name: 'ROI Analysis',
          method: 'POST',
          url: '/api/analysis/roi',
          description: 'Sera ROI analizi gerçekleştir',
          category: 'AI/Analysis',
          status: 'active',
          lastTested: '5 dakika önce',
          responseTime: 1.2,
          successRate: 98.5
        },
        {
          id: 'api-002',
          name: 'Climate Analysis',
          method: 'POST',
          url: '/api/analysis/climate',
          description: 'İklim analizi ve öneriler',
          category: 'AI/Analysis',
          status: 'active',
          lastTested: '10 dakika önce',
          responseTime: 1.8,
          successRate: 97.2
        },
        {
          id: 'api-003',
          name: 'User Authentication',
          method: 'POST',
          url: '/api/auth/login',
          description: 'Kullanıcı giriş işlemi',
          category: 'Authentication',
          status: 'active',
          lastTested: '2 dakika önce',
          responseTime: 0.3,
          successRate: 99.8
        },
        {
          id: 'api-004',
          name: 'Equipment Recommendations',
          method: 'POST',
          url: '/api/analysis/equipment',
          description: 'Ekipman önerisi analizi',
          category: 'AI/Analysis',
          status: 'beta',
          lastTested: '1 saat önce',
          responseTime: 2.1,
          successRate: 94.3
        },
        {
          id: 'api-005',
          name: 'User Profile',
          method: 'GET',
          url: '/api/user/profile',
          description: 'Kullanıcı profil bilgileri',
          category: 'User Management',
          status: 'active',
          lastTested: '15 dakika önce',
          responseTime: 0.15,
          successRate: 99.9
        }
      ];

      const mockTestResults: TestResult[] = [
        {
          id: 'test-001',
          endpointId: 'api-001',
          timestamp: '2 dakika önce',
          status: 'success',
          responseTime: 1180,
          statusCode: 200,
          responseSize: 2456
        },
        {
          id: 'test-002',
          endpointId: 'api-002',
          timestamp: '5 dakika önce',
          status: 'success',
          responseTime: 1820,
          statusCode: 200,
          responseSize: 3201
        },
        {
          id: 'test-003',
          endpointId: 'api-003',
          timestamp: '8 dakika önce',
          status: 'error',
          responseTime: 5000,
          statusCode: 500,
          responseSize: 0,
          errorMessage: 'Internal Server Error'
        }
      ];

      setEndpoints(mockEndpoints);
      setTestResults(mockTestResults);
    } catch (error) {
      console.error('Failed to load API data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-green-100 text-green-700';
      case 'PUT': return 'bg-yellow-100 text-yellow-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      case 'PATCH': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'beta': return 'bg-yellow-100 text-yellow-700';
      case 'deprecated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'beta': return 'Beta';
      case 'deprecated': return 'Kullanımdan Kaldırıldı';
      default: return status;
    }
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'error': return 'bg-red-100 text-red-700';
      case 'timeout': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const runApiTest = async (endpoint: ApiEndpoint) => {
    setTestInProgress(true);
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newResult: TestResult = {
      id: `test-${Date.now()}`,
      endpointId: endpoint.id,
      timestamp: 'Şimdi',
      status: Math.random() > 0.1 ? 'success' : 'error',
      responseTime: Math.random() * 3000 + 200,
      statusCode: Math.random() > 0.1 ? 200 : 500,
      responseSize: Math.random() * 5000 + 1000
    };
    
    if (newResult.status === 'error') {
      newResult.errorMessage = 'Test error simulation';
    }
    
    setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
    setTestInProgress(false);
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>API Test Merkezi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Kapsamlı API test ve izleme araçları</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadApiData}
                disabled={dataLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dataLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {dataLoading ? '🔄 Yenileniyor...' : '🔄 Yenile'}
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#f6f8f9', color: '#1e3237' }}
              >
                🧪 Toplu Test
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
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Endpoint</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{endpoints.length}</p>
              </div>
              <div className="text-2xl">🔗</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt Süresi</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {(endpoints.reduce((sum, ep) => sum + ep.responseTime, 0) / endpoints.length).toFixed(1)}s
                </p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {(endpoints.reduce((sum, ep) => sum + ep.successRate, 0) / endpoints.length).toFixed(1)}%
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Son Test</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>2dk</p>
              </div>
              <div className="text-2xl">🧪</div>
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
          {activeTab === 'endpoints' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>API Endpoints</h3>
              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <h4 className="font-semibold" style={{ color: '#1e3237' }}>{endpoint.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                            {getStatusText(endpoint.status)}
                          </span>
                        </div>
                        
                        <p className="text-sm font-mono mb-2" style={{ color: '#146448' }}>{endpoint.url}</p>
                        <p className="text-sm opacity-70 mb-3" style={{ color: '#1e3237' }}>{endpoint.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Kategori</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{endpoint.category}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Son Test</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{endpoint.lastTested}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Yanıt Süresi</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{endpoint.responseTime}s</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Başarı Oranı</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{endpoint.successRate}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex space-x-2">
                        <button
                          onClick={() => runApiTest(endpoint)}
                          disabled={testInProgress}
                          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                            testInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                          }`}
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          🧪 Test Et
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEndpoint(endpoint);
                            setActiveTab('test');
                          }}
                          className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          ⚙️ Detay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'test' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
                {selectedEndpoint ? `${selectedEndpoint.name} - Test` : 'API Test Merkezi'}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Test Parametreleri</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Endpoint Seç
                      </label>
                      <select 
                        value={selectedEndpoint?.id || ''}
                        onChange={(e) => setSelectedEndpoint(endpoints.find(ep => ep.id === e.target.value) || null)}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      >
                        <option value="">Endpoint seçin</option>
                        {endpoints.map(endpoint => (
                          <option key={endpoint.id} value={endpoint.id}>
                            {endpoint.method} {endpoint.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedEndpoint && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                            Request Body (JSON)
                          </label>
                          <textarea 
                            rows={8}
                            className="w-full p-3 border rounded-lg font-mono text-sm" 
                            style={{ borderColor: '#146448' }}
                            placeholder='{"example": "data"}'
                            defaultValue={JSON.stringify({
                              "sera_tipi": "cam_sera",
                              "yatirim_tutari": 500000,
                              "urun_tipi": "domates",
                              "bolge": "antalya"
                            }, null, 2)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                            Headers
                          </label>
                          <textarea 
                            rows={4}
                            className="w-full p-3 border rounded-lg font-mono text-sm" 
                            style={{ borderColor: '#146448' }}
                            defaultValue={JSON.stringify({
                              "Content-Type": "application/json",
                              "Authorization": "Bearer your-token"
                            }, null, 2)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Test Sonucu</h4>
                  {testInProgress ? (
                    <div className="flex items-center justify-center h-48">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p style={{ color: '#1e3237' }}>Test çalışıyor...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h5 className="font-medium mb-2" style={{ color: '#1e3237' }}>Response</h5>
                        <pre className="text-sm font-mono" style={{ color: '#146448' }}>
{`{
  "success": true,
  "data": {
    "roi_analizi": {
      "yatirimi_geri_odeme_suresi": 3.2,
      "net_bugunku_deger": 245000,
      "ic_verim_orani": 18.5,
      "karlılik_orani": 24.8
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                        </pre>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Status Code</p>
                          <p className="font-medium" style={{ color: '#146448' }}>200 OK</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Response Time</p>
                          <p className="font-medium" style={{ color: '#146448' }}>1.2s</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Response Size</p>
                          <p className="font-medium" style={{ color: '#146448' }}>2.4 KB</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Content Type</p>
                          <p className="font-medium" style={{ color: '#146448' }}>application/json</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <button
                      onClick={() => selectedEndpoint && runApiTest(selectedEndpoint)}
                      disabled={!selectedEndpoint || testInProgress}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        !selectedEndpoint || testInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      {testInProgress ? '🔄 Test Çalışıyor...' : '🧪 Testi Çalıştır'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Test Sonuçları</h3>
              <div className="space-y-4">
                {testResults.map((result) => {
                  const endpoint = endpoints.find(ep => ep.id === result.endpointId);
                  return (
                    <div key={result.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint?.method || 'GET')}`}>
                              {endpoint?.method}
                            </span>
                            <h4 className="font-semibold" style={{ color: '#1e3237' }}>{endpoint?.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getTestStatusColor(result.status)}`}>
                              {result.status === 'success' ? 'Başarılı' : result.status === 'error' ? 'Hata' : 'Timeout'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Zaman</p>
                              <p className="font-medium" style={{ color: '#146448' }}>{result.timestamp}</p>
                            </div>
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Status Code</p>
                              <p className="font-medium" style={{ color: '#146448' }}>{result.statusCode}</p>
                            </div>
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Yanıt Süresi</p>
                              <p className="font-medium" style={{ color: '#146448' }}>{result.responseTime.toFixed(0)}ms</p>
                            </div>
                            <div>
                              <p className="opacity-70" style={{ color: '#1e3237' }}>Boyut</p>
                              <p className="font-medium" style={{ color: '#146448' }}>{(result.responseSize / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          
                          {result.errorMessage && (
                            <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                              <p className="text-sm text-red-700">{result.errorMessage}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-6">
                          <button
                            className="px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#f6f8f9', color: '#1e3237', border: '1px solid #146448' }}
                          >
                            📋 Detay
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>API İzleme</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Yanıt Süreleri (Son 24 Saat)</h4>
                  <div className="h-48 flex items-end justify-between space-x-1">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          backgroundColor: '#baf200',
                          height: `${Math.random() * 80 + 20}%`,
                          minHeight: '8px'
                        }}
                        title={`${i}:00 - ${(Math.random() * 3 + 0.5).toFixed(1)}s`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h4 className="font-semibold mb-4" style={{ color: '#1e3237' }}>Hata Durumları</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>5xx Server Errors</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>4xx Client Errors</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Timeout Errors</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1e3237' }}>Network Errors</span>
                      <span className="font-semibold" style={{ color: '#146448' }}>2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>API Dokümantasyonu</h3>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="prose max-w-none">
                  <h4 style={{ color: '#1e3237' }}>SeraGPT API Rehberi</h4>
                  <p style={{ color: '#1e3237', opacity: '0.8' }}>
                    Bu dokümantasyon SeraGPT API'sinin kullanımı hakkında detaylı bilgi sağlar.
                  </p>
                  
                  <h5 style={{ color: '#146448' }}>Kimlik Doğrulama</h5>
                  <p style={{ color: '#1e3237', opacity: '0.8' }}>
                    Tüm API istekleri Bearer token ile kimlik doğrulaması gerektirir.
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
                    <code>Authorization: Bearer your-api-token</code>
                  </pre>
                  
                  <h5 style={{ color: '#146448' }}>Rate Limiting</h5>
                  <p style={{ color: '#1e3237', opacity: '0.8' }}>
                    API kullanımı saatte 1000 istek ile sınırlıdır.
                  </p>
                  
                  <h5 style={{ color: '#146448' }}>Hata Kodları</h5>
                  <ul style={{ color: '#1e3237', opacity: '0.8' }}>
                    <li>400 - Geçersiz istek parametreleri</li>
                    <li>401 - Kimlik doğrulama başarısız</li>
                    <li>403 - Yetkisiz erişim</li>
                    <li>429 - Rate limit aşıldı</li>
                    <li>500 - Sunucu hatası</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
