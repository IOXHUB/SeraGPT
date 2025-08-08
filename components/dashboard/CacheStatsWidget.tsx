'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCacheStats } from '@/lib/services/cached-api-service';

interface CacheStatsWidgetProps {
  className?: string;
  showDetails?: boolean;
}

export default function CacheStatsWidget({ className = '', showDetails = false }: CacheStatsWidgetProps) {
  const [stats, setStats] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      const cacheStats = getCacheStats();
      setStats(cacheStats);
    };

    // Update stats initially
    updateStats();

    // Update stats every 10 seconds
    const interval = setInterval(updateStats, 10000);

    // Only show in development or for admin users
    const shouldShow = process.env.NODE_ENV === 'development' || 
                      localStorage.getItem('seragpt_admin') === 'true';
    setIsVisible(shouldShow);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !stats) {
    return null;
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🗄️</span>
          <h3 className="text-sm font-semibold text-blue-900">Cache Performance</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${stats.hitRate > 70 ? 'bg-green-400' : stats.hitRate > 40 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
          <span className="text-xs text-blue-700 font-medium">
            {stats.hitRate.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-white/50 rounded-md p-2">
          <div className="text-blue-600 font-medium">Hit Rate</div>
          <div className="text-lg font-bold text-blue-900">
            {stats.hitRate.toFixed(1)}%
          </div>
          <div className="text-blue-600 text-xs">
            {formatNumber(stats.totalHits)}/{formatNumber(stats.totalHits + stats.totalMisses)}
          </div>
        </div>

        <div className="bg-white/50 rounded-md p-2">
          <div className="text-cyan-600 font-medium">Entries</div>
          <div className="text-lg font-bold text-cyan-900">
            {formatNumber(stats.totalEntries)}
          </div>
          <div className="text-cyan-600 text-xs">
            {formatBytes(stats.memoryUsage)}
          </div>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-blue-200"
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-blue-600">Cache Hits:</span>
              <span className="ml-1 font-semibold text-green-700">
                {formatNumber(stats.totalHits)}
              </span>
            </div>
            <div>
              <span className="text-blue-600">Cache Misses:</span>
              <span className="ml-1 font-semibold text-red-700">
                {formatNumber(stats.totalMisses)}
              </span>
            </div>
            <div>
              <span className="text-blue-600">Memory Used:</span>
              <span className="ml-1 font-semibold text-blue-700">
                {formatBytes(stats.memoryUsage)}
              </span>
            </div>
            <div>
              <span className="text-blue-600">Entries:</span>
              <span className="ml-1 font-semibold text-blue-700">
                {stats.totalEntries}
              </span>
            </div>
          </div>
          
          {stats.oldestEntry > 0 && (
            <div className="mt-2 text-xs text-blue-600">
              <span>Oldest entry: {Math.round((Date.now() - stats.oldestEntry) / 60000)}m ago</span>
            </div>
          )}
        </motion.div>
      )}

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-xs text-blue-600">Cache Active</span>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              // Clear cache in development
              localStorage.removeItem('cache_clear_requested');
              window.location.reload();
            }}
            className="text-xs text-blue-500 hover:text-blue-700 underline"
            title="Clear cache (dev only)"
          >
            Clear
          </button>
        )}
      </div>
    </motion.div>
  );
}
