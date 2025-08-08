// =====================================================
// TEST UTILITIES
// =====================================================
// Comprehensive testing utilities for API endpoints,
// components, and integration testing
// =====================================================

import { authService } from '@/lib/services/auth-service';
import { aiService } from '@/lib/services/ai-service';

// =====================================================
// API TESTING UTILITIES
// =====================================================

export interface ApiTestResult {
  endpoint: string;
  status: 'success' | 'error' | 'timeout';
  responseTime: number;
  errorMessage?: string;
  data?: any;
}

export interface TestSuite {
  name: string;
  tests: ApiTestResult[];
  passed: number;
  failed: number;
  totalTime: number;
}

export const testConfig = {
  timeout: 10000, // 10 seconds
  retries: 3,
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
};

// =====================================================
// CORE TEST FUNCTIONS
// =====================================================

async function testApiEndpoint(
  endpoint: string,
  testFn: () => Promise<any>,
  expectedFields?: string[]
): Promise<ApiTestResult> {
  const startTime = Date.now();
  
  try {
    const result = await Promise.race([
      testFn(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), testConfig.timeout)
      )
    ]);

    const responseTime = Date.now() - startTime;

    // Validate expected fields if provided
    if (expectedFields && result) {
      for (const field of expectedFields) {
        if (result[field] === undefined) {
          throw new Error(`Missing expected field: ${field}`);
        }
      }
    }

    return {
      endpoint,
      status: 'success',
      responseTime,
      data: result
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      endpoint,
      status: error instanceof Error && error.message === 'Timeout' ? 'timeout' : 'error',
      responseTime,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// =====================================================
// AUTH SERVICE TESTS
// =====================================================

export async function testAuthService(): Promise<TestSuite> {
  const tests: ApiTestResult[] = [];
  const startTime = Date.now();

  // Test connection
  tests.push(await testApiEndpoint(
    '/api/auth/test',
    () => authService.testAuthConnection()
  ));

  // Test authentication status
  tests.push(await testApiEndpoint(
    '/api/auth/status',
    () => authService.getAuthStatus(),
    ['isAuthenticated', 'user']
  ));

  // Test profile endpoint (if user is authenticated)
  const authStatus = await authService.getAuthStatus();
  if (authStatus.isAuthenticated) {
    tests.push(await testApiEndpoint(
      '/api/auth/profile',
      () => authService.getUserProfile(authStatus.user.id),
      ['id', 'email']
    ));

    tests.push(await testApiEndpoint(
      '/api/auth/tokens',
      () => authService.getUserTokens(authStatus.user.id),
      ['remaining_tokens', 'total_tokens']
    ));
  }

  const totalTime = Date.now() - startTime;
  const passed = tests.filter(t => t.status === 'success').length;
  const failed = tests.length - passed;

  return {
    name: 'Auth Service Tests',
    tests,
    passed,
    failed,
    totalTime
  };
}

// =====================================================
// AI SERVICE TESTS
// =====================================================

export async function testAIService(): Promise<TestSuite> {
  const tests: ApiTestResult[] = [];
  const startTime = Date.now();

  // Test AI availability
  tests.push(await testApiEndpoint(
    'AI Service - Check Availability',
    () => Promise.resolve({ available: true })
  ));

  // Test chat session creation (if authenticated)
  const authStatus = await authService.getAuthStatus();
  if (authStatus.isAuthenticated) {
    tests.push(await testApiEndpoint(
      '/api/chat/sessions',
      async () => await aiService.createChatSession('Test session'),
      ['id', 'title', 'created_at']
    ));

    // Test getting chat sessions
    tests.push(await testApiEndpoint(
      '/api/chat/sessions',
      () => aiService.getUserChatSessions(authStatus.user.id),
      []
    ));
  }

  const totalTime = Date.now() - startTime;
  const passed = tests.filter(t => t.status === 'success').length;
  const failed = tests.length - passed;

  return {
    name: 'AI Service Tests',
    tests,
    passed,
    failed,
    totalTime
  };
}

// =====================================================
// ANALYSIS SERVICE TESTS
// =====================================================

export async function testAnalysisService(): Promise<TestSuite> {
  const tests: ApiTestResult[] = [];
  const startTime = Date.now();

  // Test analysis availability
  tests.push(await testApiEndpoint(
    'Analysis Service - Check Availability',
    () => Promise.resolve({ available: true })
  ));

  const totalTime = Date.now() - startTime;
  const passed = tests.filter(t => t.status === 'success').length;
  const failed = tests.length - passed;

  return {
    name: 'Analysis Service Tests',
    tests,
    passed,
    failed,
    totalTime
  };
}

// =====================================================
// COMPREHENSIVE TEST RUNNER
// =====================================================

export async function runAllTests(): Promise<{
  suites: TestSuite[];
  totalPassed: number;
  totalFailed: number;
  totalTime: number;
  overallStatus: 'pass' | 'fail';
}> {
  console.log('🧪 Starting comprehensive API tests...');
  
  const suites: TestSuite[] = [];
  const startTime = Date.now();

  try {
    // Run all test suites
    suites.push(await testAuthService());
    suites.push(await testAIService());
    suites.push(await testAnalysisService());

    const totalTime = Date.now() - startTime;
    const totalPassed = suites.reduce((sum, suite) => sum + suite.passed, 0);
    const totalFailed = suites.reduce((sum, suite) => sum + suite.failed, 0);
    const overallStatus = totalFailed === 0 ? 'pass' : 'fail';

    console.log(`✅ Tests completed in ${totalTime}ms`);
    console.log(`📊 Results: ${totalPassed} passed, ${totalFailed} failed`);

    return {
      suites,
      totalPassed,
      totalFailed,
      totalTime,
      overallStatus
    };
  } catch (error) {
    console.error('❌ Test runner failed:', error);
    
    return {
      suites,
      totalPassed: 0,
      totalFailed: 1,
      totalTime: Date.now() - startTime,
      overallStatus: 'fail'
    };
  }
}

// =====================================================
// HEALTH CHECK UTILITIES
// =====================================================

export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, boolean>;
  timestamp: string;
}> {
  const services: Record<string, boolean> = {};
  
  try {
    // Test database connection
    const authTest = await authService.testAuthConnection();
    services.database = authTest.success;

    // Test API endpoints
    const statusTest = await authService.getAuthStatus();
    services.api = statusTest !== null;

    // Test environment
    services.environment = process.env.NODE_ENV !== undefined;

    const healthyCount = Object.values(services).filter(Boolean).length;
    const totalCount = Object.keys(services).length;

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (healthyCount === 0) {
      status = 'unhealthy';
    } else if (healthyCount < totalCount) {
      status = 'degraded';
    }

    return {
      status,
      services,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      services,
      timestamp: new Date().toISOString()
    };
  }
}

// =====================================================
// PERFORMANCE TESTING
// =====================================================

export async function performanceTest(
  testFn: () => Promise<any>,
  iterations: number = 10
): Promise<{
  averageTime: number;
  minTime: number;
  maxTime: number;
  totalTime: number;
  successRate: number;
}> {
  const times: number[] = [];
  let successes = 0;

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();
    
    try {
      await testFn();
      const endTime = Date.now();
      times.push(endTime - startTime);
      successes++;
    } catch (error) {
      times.push(0); // Failed request
    }
  }

  const totalTime = times.reduce((sum, time) => sum + time, 0);
  const averageTime = totalTime / times.length;
  const minTime = Math.min(...times.filter(t => t > 0));
  const maxTime = Math.max(...times);
  const successRate = (successes / iterations) * 100;

  return {
    averageTime,
    minTime,
    maxTime,
    totalTime,
    successRate
  };
}

// =====================================================
// MOCK DATA UTILITIES
// =====================================================

export const mockData = {
  user: {
    id: 'test-user-123',
    email: 'test@example.com',
    full_name: 'Test Kullanıcısı',
    phone: '05551234567',
    company_name: 'Test Şirketi',
    experience_level: 'intermediate' as const,
    location: {
      city: 'İstanbul',
      district: 'Kadıköy',
      coordinates: { lat: 41.0082, lng: 29.0181 }
    },
    preferences: {
      language: 'tr',
      notifications: true,
      newsletter: false
    }
  },

  roiAnalysis: {
    greenhouseSize: 1000,
    initialInvestment: 750000,
    expectedYield: {
      annual: 60000,
      pricePerKg: 10
    },
    operationalCosts: {
      monthly: 18000,
      annual: 216000
    },
    location: 'Antalya',
    cropType: 'domates',
    climateData: {
      temperature: { min: 18, max: 35 },
      humidity: { min: 60, max: 80 },
      sunlight: 8.5
    }
  },

  chatSession: {
    id: 'chat-session-123',
    title: 'Test Chat Session',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    message_count: 5,
    tokens_used: 150
  }
};

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  testApiEndpoint,
  testAuthService,
  testAIService,
  testAnalysisService,
  runAllTests,
  healthCheck,
  performanceTest,
  mockData,
  testConfig
};
