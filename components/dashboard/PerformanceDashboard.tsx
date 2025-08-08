'use client';

import { useState, useEffect } from 'react';
import { usePerformanceMonitor } from '@/lib/services/performance-monitor';

interface PerformanceStats {
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
}

interface PerformanceSummary {
  totalEntries: number;
  aggregatedMetrics: {
    totalPerformanceMetrics: number;
    totalAPICalls: number;
    totalErrors: number;
    totalJourneyEvents: number;
  };
  performanceStats: PerformanceStats | null;
}

export default function PerformanceDashboard() {
  const { getPerformanceSummary } = usePerformanceMonitor();
  const [performanceData, setPerformanceData] = useState<PerformanceSummary | null>(null);
  const [localSummary, setLocalSummary] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch performance data from API
  const fetchPerformanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/performance?limit=10');
      if (response.ok) {
        const data = await response.json();
        setPerformanceData(data.summary);
      }
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update local summary
  const updateLocalSummary = () => {
    const summary = getPerformanceSummary();
    setLocalSummary(summary);
  };

  useEffect(() => {
    // Initial load
    fetchPerformanceData();
    updateLocalSummary();

    // Update local summary every 10 seconds
    const localInterval = setInterval(updateLocalSummary, 10000);

    // Fetch server data every 30 seconds
    const serverInterval = setInterval(fetchPerformanceData, 30000);

    return () => {
      clearInterval(localInterval);
      clearInterval(serverInterval);
    };
  }, []);

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getMetricColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 hover:shadow-xl transition-all duration-300"
          title="Performance Metrics"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">📊</span>
            {localSummary && (
              <div className="text-xs font-mono">
                <div className="text-gray-600 dark:text-gray-400">
                  {formatTime(localSummary.averageResponseTime)} • {Math.round(localSummary.cacheHitRate)}%
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96 max-h-96 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            📊 Performance Metrics
          </h3>
          <div className="flex items-center space-x-2">
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Local Session Metrics */}
          {localSummary && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b pb-1">
                Current Session
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-gray-600 dark:text-gray-400">Avg Response</div>
                  <div className="font-mono text-sm">{formatTime(localSummary.averageResponseTime)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-gray-600 dark:text-gray-400">Cache Hit Rate</div>
                  <div className="font-mono text-sm">{Math.round(localSummary.cacheHitRate)}%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-gray-600 dark:text-gray-400">Error Rate</div>
                  <div className="font-mono text-sm">{Math.round(localSummary.errorRate)}%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-gray-600 dark:text-gray-400">Session Time</div>
                  <div className="font-mono text-sm">{formatTime(localSummary.sessionDuration)}</div>
                </div>
              </div>

              {/* Current Core Web Vitals */}
              {localSummary.currentMetrics && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Core Web Vitals
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>FCP:</span>
                      <span className={`font-mono ${getMetricColor(localSummary.currentMetrics.fcp, { good: 1800, poor: 3000 })}`}>
                        {formatTime(localSummary.currentMetrics.fcp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>LCP:</span>
                      <span className={`font-mono ${getMetricColor(localSummary.currentMetrics.lcp, { good: 2500, poor: 4000 })}`}>
                        {formatTime(localSummary.currentMetrics.lcp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>FID:</span>
                      <span className={`font-mono ${getMetricColor(localSummary.currentMetrics.fid, { good: 100, poor: 300 })}`}>
                        {formatTime(localSummary.currentMetrics.fid)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLS:</span>
                      <span className={`font-mono ${getMetricColor(localSummary.currentMetrics.cls * 1000, { good: 100, poor: 250 })}`}>
                        {localSummary.currentMetrics.cls.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Server Aggregated Metrics */}
          {performanceData && (
            <div className="space-y-3 border-t pt-3">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Aggregated Data
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <div className="text-blue-600 dark:text-blue-400">Total Entries</div>
                  <div className="font-mono text-sm">{performanceData.totalEntries}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <div className="text-green-600 dark:text-green-400">API Calls</div>
                  <div className="font-mono text-sm">{performanceData.aggregatedMetrics.totalAPICalls}</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  <div className="text-yellow-600 dark:text-yellow-400">Errors</div>
                  <div className="font-mono text-sm">{performanceData.aggregatedMetrics.totalErrors}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <div className="text-purple-600 dark:text-purple-400">Events</div>
                  <div className="font-mono text-sm">{performanceData.aggregatedMetrics.totalJourneyEvents}</div>
                </div>
              </div>

              {/* Performance Statistics */}
              {performanceData.performanceStats && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Overall Grade
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(performanceData.performanceStats.grade)}`}>
                      {performanceData.performanceStats.grade}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Avg Page Load:</span>
                      <span className="font-mono">{formatTime(performanceData.performanceStats.performance.avgPageLoadTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg API Response:</span>
                      <span className="font-mono">{formatTime(performanceData.performanceStats.performance.avgApiResponseTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Success Rate:</span>
                      <span className="font-mono">{performanceData.performanceStats.performance.apiSuccessRate}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Refresh Button */}
          <div className="pt-2 border-t">
            <button
              onClick={fetchPerformanceData}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
