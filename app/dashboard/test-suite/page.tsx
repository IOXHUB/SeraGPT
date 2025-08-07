'use client';

// =====================================================
// COMPREHENSIVE TEST SUITE PAGE
// =====================================================
// Development and testing interface for all system components
// =====================================================

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { 
  runAllTests, 
  testAuthService, 
  testAIService, 
  testAnalysisService,
  healthCheck,
  performanceTest,
  TestSuite,
  ApiTestResult
} from '@/lib/utils/test-utils';
import { errorHandler, classifyError } from '@/lib/utils/error-handler';
import { validateUserProfile, validateROIInputs } from '@/lib/utils/validation';

interface TestResults {
  suites: TestSuite[];
  totalPassed: number;
  totalFailed: number;
  totalTime: number;
  overallStatus: 'pass' | 'fail';
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, boolean>;
  timestamp: string;
}

export default function TestSuitePage() {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user && !loading;
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<string>('all');
  const [errorLog, setErrorLog] = useState<any[]>([]);

  // =====================================================
  // TEST EXECUTION
  // =====================================================

  const runTests = async (suiteType: string = 'all') => {
    setIsRunningTests(true);
    setTestResults(null);

    try {
      let results: TestResults;

      switch (suiteType) {
        case 'auth':
          const authSuite = await testAuthService();
          results = {
            suites: [authSuite],
            totalPassed: authSuite.passed,
            totalFailed: authSuite.failed,
            totalTime: authSuite.totalTime,
            overallStatus: authSuite.failed === 0 ? 'pass' : 'fail'
          };
          break;
        case 'ai':
          const aiSuite = await testAIService();
          results = {
            suites: [aiSuite],
            totalPassed: aiSuite.passed,
            totalFailed: aiSuite.failed,
            totalTime: aiSuite.totalTime,
            overallStatus: aiSuite.failed === 0 ? 'pass' : 'fail'
          };
          break;
        case 'analysis':
          const analysisSuite = await testAnalysisService();
          results = {
            suites: [analysisSuite],
            totalPassed: analysisSuite.passed,
            totalFailed: analysisSuite.failed,
            totalTime: analysisSuite.totalTime,
            overallStatus: analysisSuite.failed === 0 ? 'pass' : 'fail'
          };
          break;
        default:
          results = await runAllTests();
      }

      setTestResults(results);
    } catch (error) {
      console.error('Test execution failed:', error);
      errorHandler.logError(classifyError(error, { component: 'TestSuite' }));
    } finally {
      setIsRunningTests(false);
    }
  };

  const runHealthCheck = async () => {
    try {
      const health = await healthCheck();
      setHealthStatus(health);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const runValidationTests = () => {
    // Test profile validation
    const validProfile = {
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '05551234567'
    };

    const invalidProfile = {
      full_name: 'T',
      email: 'invalid-email',
      phone: '123'
    };

    const validResult = validateUserProfile(validProfile);
    const invalidResult = validateUserProfile(invalidProfile);

    console.log('Profile Validation Tests:');
    console.log('Valid profile result:', validResult);
    console.log('Invalid profile result:', invalidResult);

    // Test ROI validation
    const validROI = {
      greenhouseSize: 1000,
      initialInvestment: 500000,
      expectedYield: { annual: 50000, pricePerKg: 8 },
      operationalCosts: { monthly: 15000 }
    };

    const invalidROI = {
      greenhouseSize: -100,
      initialInvestment: 0,
      expectedYield: { annual: -1000, pricePerKg: 0 },
      operationalCosts: { monthly: -500 }
    };

    const validROIResult = validateROIInputs(validROI);
    const invalidROIResult = validateROIInputs(invalidROI);

    console.log('ROI Validation Tests:');
    console.log('Valid ROI result:', validROIResult);
    console.log('Invalid ROI result:', invalidROIResult);
  };

  const getErrorStats = () => {
    const stats = errorHandler.getErrorStats();
    setErrorLog(stats.recent);
    return stats;
  };

  // =====================================================
  // EFFECTS
  // =====================================================

  useEffect(() => {
    runHealthCheck();
  }, []);

  // =====================================================
  // RENDER HELPERS
  // =====================================================

  const renderTestResult = (test: ApiTestResult) => {
    const statusColors = {
      success: 'text-green-600 bg-green-50',
      error: 'text-red-600 bg-red-50',
      timeout: 'text-yellow-600 bg-yellow-50'
    };

    return (
      <div key={test.endpoint} className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{test.endpoint}</span>
          <span className={`px-2 py-1 rounded text-sm ${statusColors[test.status]}`}>
            {test.status.toUpperCase()}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <div>Response time: {test.responseTime}ms</div>
          {test.errorMessage && (
            <div className="text-red-600 mt-1">Error: {test.errorMessage}</div>
          )}
        </div>
      </div>
    );
  };

  const renderTestSuite = (suite: TestSuite) => {
    const successRate = suite.tests.length > 0 
      ? Math.round((suite.passed / suite.tests.length) * 100) 
      : 0;

    return (
      <div key={suite.name} className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{suite.name}</h3>
          <div className="text-sm text-gray-600">
            {suite.totalTime}ms
          </div>
        </div>
        
        <div className="flex space-x-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{suite.passed}</div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{suite.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        <div className="space-y-2">
          {suite.tests.map(renderTestResult)}
        </div>
      </div>
    );
  };

  // =====================================================
  // MAIN RENDER
  // =====================================================

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Test Suite - Giriş Gerekli
          </h2>
          <p className="text-gray-600">
            Test suite'i kullanmak için giriş yapmanız gerekiyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comprehensive Test Suite
          </h1>
          <p className="text-gray-600">
            Sistem bileşenlerini test et ve sağlık durumunu izle
          </p>
        </div>

        {/* Health Status */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">System Health</h2>
            <button
              onClick={runHealthCheck}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {healthStatus ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  healthStatus.status === 'healthy' ? 'text-green-600' :
                  healthStatus.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {healthStatus.status.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">Overall Status</div>
              </div>
              
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(healthStatus.services).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{service}</span>
                      <span className={`text-sm font-medium ${status ? 'text-green-600' : 'text-red-600'}`}>
                        {status ? 'OK' : 'FAIL'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading health status...</div>
          )}
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Tests</option>
              <option value="auth">Auth Service</option>
              <option value="ai">AI Service</option>
              <option value="analysis">Analysis Service</option>
            </select>

            <button
              onClick={() => runTests(selectedSuite)}
              disabled={isRunningTests}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {isRunningTests ? 'Running Tests...' : 'Run Tests'}
            </button>

            <button
              onClick={runValidationTests}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Test Validation
            </button>

            <button
              onClick={getErrorStats}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Error Stats
            </button>
          </div>

          {/* Progress indicator */}
          {isRunningTests && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          )}
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="mb-6">
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Overall Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${testResults.overallStatus === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults.overallStatus.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Overall Status</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{testResults.totalPassed}</div>
                  <div className="text-sm text-gray-600">Total Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{testResults.totalFailed}</div>
                  <div className="text-sm text-gray-600">Total Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{testResults.totalTime}ms</div>
                  <div className="text-sm text-gray-600">Total Time</div>
                </div>
              </div>
            </div>

            <div>
              {testResults.suites.map(renderTestSuite)}
            </div>
          </div>
        )}

        {/* Error Log */}
        {errorLog.length > 0 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Errors</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {errorLog.map((error, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded text-sm">
                  <div className="font-medium text-red-800">{error.type}: {error.message}</div>
                  <div className="text-red-600 text-xs mt-1">{error.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Development Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Development Notes</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Bu sayfa sadece development ve testing için tasarlanmıştır</li>
            <li>• Production ortamında bu sayfaya erişim kısıtlanmalıdır</li>
            <li>• Tüm API endpoint'leri ve servisler test edilir</li>
            <li>• Validation ve error handling fonksiyonları doğrulanır</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
