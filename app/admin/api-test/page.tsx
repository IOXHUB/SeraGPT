'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface APITest {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  body?: string;
  expectedStatus: number;
  timeout: number;
}

interface TestResult {
  id: string;
  testId: string;
  status: 'success' | 'error' | 'timeout';
  responseTime: number;
  statusCode: number;
  response: any;
  timestamp: string;
  errorMessage?: string;
}

export default function APITestPage() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('predefined');
  const [apiTests, setApiTests] = useState<APITest[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [customTest, setCustomTest] = useState<Partial<APITest>>({
    name: '',
    url: '',
    method: 'GET',
    headers: {},
    timeout: 10000,
    expectedStatus: 200
  });
  const [dataLoading, setDataLoading] = useState(true);

  const tabs = [
    { id: 'predefined', title: 'Önceden Tanımlı', icon: '📋' },
    { id: 'custom', title: 'Özel Test', icon: '🧪' },
    { id: 'results', title: 'Test Sonuçları', icon: '📊' },
    { id: 'performance', title: 'Performans', icon: '⚡' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadAPITests();
      loadTestResults();
    }
  }, [user, loading]);

  const loadAPITests = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock API tests
      const mockTests: APITest[] = [
        {
          id: 'test-001',
          name: 'Auth Status Check',
          url: '/api/auth/status',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          expectedStatus: 200,
          timeout: 5000
        },
        {
          id: 'test-002',
          name: 'ROI Analysis Test',
          url: '/api/analysis/roi',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            investment: 100000,
            expectedYield: 15,
            productPrice: 8,
            operatingCosts: 25000
          }),
          expectedStatus: 200,
          timeout: 15000
        },
        {
          id: 'test-003',
          name: 'Climate Analysis Test',
          url: '/api/analysis/climate',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location: 'Istanbul',
            analysisPeriod: '1 year'
          }),
          expectedStatus: 200,
          timeout: 15000
        },
        {
          id: 'test-004',
          name: 'OpenWeather API Test',
          url: 'https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=demo',
          method: 'GET',
          headers: {},
          expectedStatus: 200,
          timeout: 5000
        },
        {
          id: 'test-005',
          name: 'Database Health Check',
          url: '/api/admin/system-health',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          expectedStatus: 200,
          timeout: 5000
        }
      ];
      
      setApiTests(mockTests);
      
    } catch (error) {
      console.error('Failed to load API tests:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const loadTestResults = async () => {
    // Mock test results
    const mockResults: TestResult[] = [
      {
        id: 'result-001',
        testId: 'test-001',
        status: 'success',
        responseTime: 125,
        statusCode: 200,
        response: { authenticated: true, user: 'admin' },
        timestamp: new Date().toISOString()
      },
      {
        id: 'result-002',
        testId: 'test-002',
        status: 'success',
        responseTime: 2340,
        statusCode: 200,
        response: { roi: 18.5, paybackPeriod: 4.2 },
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: 'result-003',
        testId: 'test-004',
        status: 'error',
        responseTime: 5000,
        statusCode: 401,
        response: { error: 'Invalid API key' },
        timestamp: new Date(Date.now() - 600000).toISOString(),
        errorMessage: 'Authentication failed'
      }
    ];
    
    setTestResults(mockResults);
  };

  const runSingleTest = async (test: APITest) => {
    try {
      const response = await fetch('/api/admin/test-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: 'single',
          apiData: {
            url: test.url,
            method: test.method,
            headers: test.headers,
            body: test.body,
            timeout: test.timeout
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const newResult: TestResult = {
          id: `result-${Date.now()}`,
          testId: test.id,
          status: data.result.success ? 'success' : 'error',
          responseTime: data.result.responseTime,
          statusCode: data.result.statusCode,
          response: data.result.response,
          timestamp: new Date().toISOString(),
          errorMessage: data.result.error
        };
        
        setTestResults(prev => [newResult, ...prev.slice(0, 19)]);
        return newResult;
      }
    } catch (error) {
      console.error('Test failed:', error);
      return null;
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    try {
      for (const test of apiTests) {
        await runSingleTest(test);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Bulk test failed:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const runCustomTest = async () => {
    if (!customTest.url || !customTest.method) {
      alert('Lütfen URL ve method alanlarını doldurun');
      return;
    }

    const testToRun: APITest = {
      id: `custom-${Date.now()}`,
      name: customTest.name || 'Custom Test',
      url: customTest.url,
      method: customTest.method,
      headers: customTest.headers || {},
      body: customTest.body,
      expectedStatus: customTest.expectedStatus || 200,
      timeout: customTest.timeout || 10000
    };

    await runSingleTest(testToRun);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'timeout': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Başarılı';
      case 'error': return 'Hata';
      case 'timeout': return 'Zaman Aşımı';
      default: return 'Bilinmiyor';
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
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
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Gelişmiş API test ve debugging araçları</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={runAllTests}
                disabled={isRunningTests}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isRunningTests ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                {isRunningTests ? '🔄 Test Ediliyor...' : '🧪 Tümünü Test Et'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Test</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{apiTests.length}</p>
              </div>
              <div className="text-2xl">🧪</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarılı Test</p>
                <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                  {testResults.filter(r => r.status === 'success').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Başarısız Test</p>
                <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                  {testResults.filter(r => r.status === 'error').length}
                </p>
              </div>
              <div className="text-2xl">❌</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Yanıt Süresi</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {testResults.length > 0 
                    ? Math.round(testResults.reduce((acc, r) => acc + r.responseTime, 0) / testResults.length)
                    : 0}ms
                </p>
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
          {activeTab === 'predefined' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Önceden Tanımlı API Testleri</h3>
              <div className="space-y-4">
                {apiTests.map((test) => (
                  <div key={test.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                            {test.name}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            {test.method}
                          </span>
                        </div>
                        
                        <p className="text-sm opacity-70 mb-3" style={{ color: '#1e3237' }}>
                          {test.url}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Beklenen Status</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{test.expectedStatus}</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Timeout</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{test.timeout}ms</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Son Test</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {testResults.find(r => r.testId === test.id)?.timestamp 
                                ? new Date(testResults.find(r => r.testId === test.id)!.timestamp).toLocaleString('tr-TR')
                                : 'Henüz test edilmedi'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex space-x-2">
                        <button
                          onClick={() => runSingleTest(test)}
                          className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          🧪 Test Et
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#1e3237' }}>Özel API Testi</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Test Adı
                    </label>
                    <input 
                      type="text" 
                      value={customTest.name || ''}
                      onChange={(e) => setCustomTest(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                      placeholder="Örn: My Custom Test"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        HTTP Method
                      </label>
                      <select 
                        value={customTest.method || 'GET'}
                        onChange={(e) => setCustomTest(prev => ({ ...prev, method: e.target.value as any }))}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Beklenen Status
                      </label>
                      <input 
                        type="number" 
                        value={customTest.expectedStatus || 200}
                        onChange={(e) => setCustomTest(prev => ({ ...prev, expectedStatus: parseInt(e.target.value) }))}
                        className="w-full p-3 border rounded-lg" 
                        style={{ borderColor: '#146448' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      API URL
                    </label>
                    <input 
                      type="url" 
                      value={customTest.url || ''}
                      onChange={(e) => setCustomTest(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                      placeholder="https://api.example.com/endpoint"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Headers (JSON Format)
                    </label>
                    <textarea 
                      value={JSON.stringify(customTest.headers || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          const headers = JSON.parse(e.target.value);
                          setCustomTest(prev => ({ ...prev, headers }));
                        } catch {} // Ignore parsing errors while typing
                      }}
                      className="w-full p-3 border rounded-lg h-24" 
                      style={{ borderColor: '#146448' }}
                      placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                    />
                  </div>

                  {(customTest.method === 'POST' || customTest.method === 'PUT') && (
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                        Request Body (JSON Format)
                      </label>
                      <textarea 
                        value={customTest.body || ''}
                        onChange={(e) => setCustomTest(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full p-3 border rounded-lg h-32" 
                        style={{ borderColor: '#146448' }}
                        placeholder='{"param1": "value1", "param2": "value2"}'
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Timeout (ms)
                    </label>
                    <input 
                      type="number" 
                      value={customTest.timeout || 10000}
                      onChange={(e) => setCustomTest(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                      className="w-full p-3 border rounded-lg" 
                      style={{ borderColor: '#146448' }}
                    />
                  </div>

                  <button
                    onClick={runCustomTest}
                    className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    🚀 Test Çalıştır
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Test Sonuçları</h3>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold" style={{ color: '#1e3237' }}>
                            {apiTests.find(t => t.id === result.testId)?.name || 'Custom Test'}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: getStatusColor(result.status) }}
                          >
                            {getStatusText(result.status)}
                          </span>
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            {result.statusCode}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Yanıt Süresi</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{result.responseTime}ms</p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Zaman</p>
                            <p className="font-medium" style={{ color: '#146448' }}>
                              {new Date(result.timestamp).toLocaleString('tr-TR')}
                            </p>
                          </div>
                          <div>
                            <p className="opacity-70" style={{ color: '#1e3237' }}>Test ID</p>
                            <p className="font-medium" style={{ color: '#146448' }}>{result.testId}</p>
                          </div>
                        </div>

                        {result.errorMessage && (
                          <div className="mt-3 p-3 rounded bg-red-50 border border-red-200">
                            <p className="text-sm text-red-700">❌ {result.errorMessage}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-6">
                        <button
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          📋 Detaylar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {testResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🧪</div>
                    <p className="text-xl" style={{ color: '#f6f8f9' }}>Henüz test sonucu yok</p>
                    <p className="opacity-70" style={{ color: '#f6f8f9' }}>
                      API testlerini çalıştırın ve sonuçları burada görün
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Yanıt Süreleri</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {testResults.slice(0, 10).map((result, index) => (
                    <div
                      key={result.id}
                      className="flex-1 rounded-t"
                      style={{
                        backgroundColor: getStatusColor(result.status),
                        height: `${Math.min((result.responseTime / 3000) * 100, 100)}%`,
                        minHeight: '8px'
                      }}
                      title={`${result.responseTime}ms - ${getStatusText(result.status)}`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs mt-2 opacity-70" style={{ color: '#1e3237' }}>
                  <span>En Yeni</span>
                  <span>En Eski</span>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Başarı Oranları</h3>
                <div className="space-y-4">
                  {apiTests.map((test) => {
                    const testResults_filtered = testResults.filter(r => r.testId === test.id);
                    const successCount = testResults_filtered.filter(r => r.status === 'success').length;
                    const successRate = testResults_filtered.length > 0 ? (successCount / testResults_filtered.length) * 100 : 0;
                    
                    return (
                      <div key={test.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ color: '#1e3237' }}>{test.name}</span>
                          <span style={{ color: '#146448' }}>{successRate.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              backgroundColor: successRate > 80 ? '#10B981' : successRate > 60 ? '#F59E0B' : '#EF4444',
                              width: `${successRate}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
