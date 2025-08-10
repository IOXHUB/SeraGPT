'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

interface PerformanceData {
  summary: {
    totalEntries: number;
    aggregatedMetrics: {
      totalPerformanceMetrics: number;
      totalAPICalls: number;
      totalErrors: number;
      totalJourneyEvents: number;
    };
    performanceStats: {
      coreWebVitals: {
        fcp: number;
        lcp: number;
        fid: number;
        cls: number;
      };
      performance: {
        avgPageLoadTime: number;
        avgApiResponseTime: number;
        apiSuccessRate: number;
      };
      grade: string;
    } | null;
  };
}

export default function PerformanceAnalyticsPage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/performance?limit=50');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setPerformanceData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch performance data');
      console.error('Performance data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPerformanceData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading performance analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Performance Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPerformanceData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const stats = performanceData?.summary?.performanceStats;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
            <p className="text-gray-600 mt-1">Real-time application performance monitoring</p>
          </div>
          <button
            onClick={fetchPerformanceData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-sm font-medium text-gray-500">Total Sessions</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {performanceData?.summary?.totalEntries || 0}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="text-sm font-medium text-gray-500">API Calls</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {performanceData?.summary?.aggregatedMetrics?.totalAPICalls || 0}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="text-sm font-medium text-gray-500">Errors</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {performanceData?.summary?.aggregatedMetrics?.totalErrors || 0}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="text-sm font-medium text-gray-500">User Events</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {performanceData?.summary?.aggregatedMetrics?.totalJourneyEvents || 0}
            </div>
          </div>
        </div>

        {/* Performance Grade */}
        {stats && (
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Overall Performance Grade</h2>
              <div className={`px-4 py-2 rounded-lg border font-bold text-lg ${getGradeColor(stats.grade)}`}>
                {stats.grade}
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-700">Core Web Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg ${getMetricColor(getMetricStatus(stats.coreWebVitals.fcp, { good: 1800, poor: 3000 }))}`}>
                  <div className="text-sm font-medium">First Contentful Paint</div>
                  <div className="text-xl font-bold">{formatTime(stats.coreWebVitals.fcp)}</div>
                  <div className="text-xs opacity-75">Good: ≤1.8s</div>
                </div>

                <div className={`p-4 rounded-lg ${getMetricColor(getMetricStatus(stats.coreWebVitals.lcp, { good: 2500, poor: 4000 }))}`}>
                  <div className="text-sm font-medium">Largest Contentful Paint</div>
                  <div className="text-xl font-bold">{formatTime(stats.coreWebVitals.lcp)}</div>
                  <div className="text-xs opacity-75">Good: ≤2.5s</div>
                </div>

                <div className={`p-4 rounded-lg ${getMetricColor(getMetricStatus(stats.coreWebVitals.fid, { good: 100, poor: 300 }))}`}>
                  <div className="text-sm font-medium">First Input Delay</div>
                  <div className="text-xl font-bold">{formatTime(stats.coreWebVitals.fid)}</div>
                  <div className="text-xs opacity-75">Good: ≤100ms</div>
                </div>

                <div className={`p-4 rounded-lg ${getMetricColor(getMetricStatus(stats.coreWebVitals.cls * 1000, { good: 100, poor: 250 }))}`}>
                  <div className="text-sm font-medium">Cumulative Layout Shift</div>
                  <div className="text-xl font-bold">{stats.coreWebVitals.cls.toFixed(3)}</div>
                  <div className="text-xs opacity-75">Good: ≤0.1</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4 mt-8">
              <h3 className="text-md font-medium text-gray-700">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Average Page Load</div>
                  <div className="text-xl font-bold text-gray-900">{formatTime(stats.performance.avgPageLoadTime)}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Average API Response</div>
                  <div className="text-xl font-bold text-gray-900">{formatTime(stats.performance.avgApiResponseTime)}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">API Success Rate</div>
                  <div className="text-xl font-bold text-gray-900">{stats.performance.apiSuccessRate.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!stats && (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Performance Data Yet</h3>
            <p className="text-gray-600">
              Performance metrics will appear here as users interact with the application.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
