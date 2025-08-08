'use client';

import { usePerformanceMetrics } from '@/components/providers/PerformanceProvider';
import { useState } from 'react';

export default function BundleStatsWidget() {
  const { metrics, summary } = usePerformanceMetrics();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!metrics || !summary) {
    return null;
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-all duration-300 ${
        isExpanded ? 'w-80 p-4' : 'w-16 h-16 p-2'
      }`}>
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center text-sm font-mono text-gray-600 hover:text-gray-800 transition-colors"
            title="Bundle Performance Metrics"
          >
            📊
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Bundle Stats
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {/* Bundle Size */}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bundle Size:</span>
                <span className="font-mono">{formatSize(metrics.bundleSize)}</span>
              </div>

              {/* Load Time */}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Load Time:</span>
                <span className="font-mono">{formatTime(metrics.loadTime)}</span>
              </div>

              {/* Core Web Vitals */}
              <div className="border-t pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Core Web Vitals
                </div>
                
                {/* FCP */}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">FCP:</span>
                  <span className={`font-mono ${getPerformanceColor(metrics.performance.firstContentfulPaint, { good: 1800, poor: 3000 })}`}>
                    {formatTime(metrics.performance.firstContentfulPaint)}
                  </span>
                </div>

                {/* LCP */}
                {metrics.performance.largestContentfulPaint > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">LCP:</span>
                    <span className={`font-mono ${getPerformanceColor(metrics.performance.largestContentfulPaint, { good: 2500, poor: 4000 })}`}>
                      {formatTime(metrics.performance.largestContentfulPaint)}
                    </span>
                  </div>
                )}

                {/* FID */}
                {metrics.performance.firstInputDelay > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">FID:</span>
                    <span className={`font-mono ${getPerformanceColor(metrics.performance.firstInputDelay, { good: 100, poor: 300 })}`}>
                      {formatTime(metrics.performance.firstInputDelay)}
                    </span>
                  </div>
                )}

                {/* CLS */}
                {metrics.performance.cumulativeLayoutShift > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">CLS:</span>
                    <span className={`font-mono ${getPerformanceColor(metrics.performance.cumulativeLayoutShift * 1000, { good: 100, poor: 250 })}`}>
                      {metrics.performance.cumulativeLayoutShift.toFixed(3)}
                    </span>
                  </div>
                )}
              </div>

              {/* Memory Usage */}
              {metrics.memoryUsage && (
                <div className="border-t pt-2 mt-2">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Memory
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">JS Heap:</span>
                    <span className="font-mono">
                      {formatSize(metrics.memoryUsage.usedJSHeapSize)} / {formatSize(metrics.memoryUsage.totalJSHeapSize)}
                    </span>
                  </div>
                </div>
              )}

              {/* Chunks Summary */}
              <div className="border-t pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Chunks
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total:</span>
                  <span className="font-mono">{summary.totalChunksCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Critical:</span>
                  <span className="font-mono">{summary.criticalChunksCount}</span>
                </div>
              </div>

              {/* Performance Grade */}
              <div className="border-t pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Performance Grade
                </div>
                <div className="flex justify-center">
                  <span className={`font-bold text-lg ${
                    summary.averageFCP < 1800 && summary.averageLCP < 2500 ? 'text-green-600' :
                    summary.averageFCP < 3000 && summary.averageLCP < 4000 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {summary.averageFCP < 1800 && summary.averageLCP < 2500 ? 'A' :
                     summary.averageFCP < 3000 && summary.averageLCP < 4000 ? 'B' : 'C'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
