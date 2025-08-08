'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cachedApiService, APIResponse, CachedAPIOptions } from '../services/cached-api-service';

export interface UseCachedAPIOptions extends CachedAPIOptions {
  autoLoad?: boolean;
  retries?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  dependencies?: any[];
}

export interface UseCachedAPIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  cached: boolean;
  cacheAge?: number;
  lastUpdated?: number;
}

export function useCachedAPI<T = any>(
  apiFunction: (params: any, options?: CachedAPIOptions) => Promise<APIResponse<T>>,
  params: any = {},
  options: UseCachedAPIOptions = {}
) {
  const [state, setState] = useState<UseCachedAPIState<T>>({
    data: null,
    loading: false,
    error: null,
    cached: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    autoLoad = true,
    retries = 2,
    retryDelay = 1000,
    onSuccess,
    onError,
    dependencies = [],
    ...cacheOptions
  } = options;

  const execute = useCallback(async (
    executeParams = params,
    executeOptions: CachedAPIOptions = {}
  ): Promise<T | null> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Cancel retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    let lastError: string | null = null;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const response = await apiFunction(executeParams, {
          ...cacheOptions,
          ...executeOptions
        });

        if (response.success && response.data) {
          const newState: UseCachedAPIState<T> = {
            data: response.data,
            loading: false,
            error: null,
            cached: response.cached || false,
            cacheAge: response.cacheAge,
            lastUpdated: Date.now()
          };

          setState(newState);
          onSuccess?.(response.data);
          return response.data;
        } else {
          throw new Error(response.error || 'API call failed');
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        attempt++;

        if (attempt <= retries) {
          // Wait before retry
          await new Promise(resolve => {
            retryTimeoutRef.current = setTimeout(resolve, retryDelay * attempt);
          });
        }
      }
    }

    setState(prev => ({
      ...prev,
      loading: false,
      error: lastError
    }));

    onError?.(lastError || 'API call failed');
    return null;
  }, [params, cacheOptions, apiFunction, retries, retryDelay, onSuccess, onError]);

  const refetch = useCallback((newParams?: any) => {
    return execute(newParams || params, { forceRefresh: true });
  }, [execute, params]);

  const refresh = useCallback(() => {
    return execute(params, { skipCache: true });
  }, [execute, params]);

  // Auto-load on mount and dependency changes
  useEffect(() => {
    if (autoLoad) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [autoLoad, ...dependencies]);

  return {
    ...state,
    execute,
    refetch,
    refresh,
    isStale: state.cacheAge ? state.cacheAge > (cacheOptions.ttl || 60000) : false
  };
}

// Specific hooks for different analysis types
export function useROIAnalysis(params: any, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    cachedApiService.calculateROI.bind(cachedApiService),
    params,
    {
      autoLoad: false, // ROI analysis should be triggered manually
      ttl: 2 * 60 * 60 * 1000, // 2 hours
      staleWhileRevalidate: true,
      ...options
    }
  );
}

export function useClimateAnalysis(params: any, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    cachedApiService.analyzeClimate.bind(cachedApiService),
    params,
    {
      autoLoad: false,
      ttl: 6 * 60 * 60 * 1000, // 6 hours
      staleWhileRevalidate: true,
      ...options
    }
  );
}

export function useEquipmentAnalysis(params: any, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    cachedApiService.analyzeEquipment.bind(cachedApiService),
    params,
    {
      autoLoad: false,
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      staleWhileRevalidate: true,
      ...options
    }
  );
}

export function useMarketAnalysis(params: any, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    cachedApiService.analyzeMarket.bind(cachedApiService),
    params,
    {
      autoLoad: false,
      ttl: 30 * 60 * 1000, // 30 minutes
      staleWhileRevalidate: true,
      ...options
    }
  );
}

export function useLayoutAnalysis(params: any, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    cachedApiService.analyzeLayout.bind(cachedApiService),
    params,
    {
      autoLoad: false,
      ttl: 60 * 60 * 1000, // 1 hour
      staleWhileRevalidate: true,
      ...options
    }
  );
}

export function useUserProfile(userId: string, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    (params) => cachedApiService.getUserProfile(params.userId),
    { userId },
    {
      autoLoad: !!userId,
      ttl: 30 * 60 * 1000, // 30 minutes
      dependencies: [userId],
      ...options
    }
  );
}

export function useUserTokens(userId: string, options: UseCachedAPIOptions = {}) {
  return useCachedAPI(
    (params) => cachedApiService.getUserTokens(params.userId),
    { userId },
    {
      autoLoad: !!userId,
      ttl: 10 * 60 * 1000, // 10 minutes
      dependencies: [userId],
      ...options
    }
  );
}

// Batch loading hook for multiple APIs
export function useBatchAnalysis(params: {
  roi?: any;
  climate?: any;
  equipment?: any;
  market?: any;
  layout?: any;
}, options: UseCachedAPIOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roiQuery = useROIAnalysis(params.roi, { autoLoad: false, ...options });
  const climateQuery = useClimateAnalysis(params.climate, { autoLoad: false, ...options });
  const equipmentQuery = useEquipmentAnalysis(params.equipment, { autoLoad: false, ...options });
  const marketQuery = useMarketAnalysis(params.market, { autoLoad: false, ...options });
  const layoutQuery = useLayoutAnalysis(params.layout, { autoLoad: false, ...options });

  const executeAll = useCallback(async () => {
    setLoading(true);
    setErrors({});

    const promises = [];
    const analyses = [];

    if (params.roi) {
      promises.push(roiQuery.execute());
      analyses.push('roi');
    }
    if (params.climate) {
      promises.push(climateQuery.execute());
      analyses.push('climate');
    }
    if (params.equipment) {
      promises.push(equipmentQuery.execute());
      analyses.push('equipment');
    }
    if (params.market) {
      promises.push(marketQuery.execute());
      analyses.push('market');
    }
    if (params.layout) {
      promises.push(layoutQuery.execute());
      analyses.push('layout');
    }

    try {
      const results = await Promise.allSettled(promises);
      const newErrors: Record<string, string> = {};

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          newErrors[analyses[index]] = result.reason?.message || 'Analysis failed';
        }
      });

      setErrors(newErrors);
    } catch (error) {
      console.error('Batch analysis failed:', error);
    }

    setLoading(false);
  }, [params, roiQuery, climateQuery, equipmentQuery, marketQuery, layoutQuery]);

  return {
    loading: loading || roiQuery.loading || climateQuery.loading || equipmentQuery.loading || marketQuery.loading || layoutQuery.loading,
    errors,
    results: {
      roi: roiQuery.data,
      climate: climateQuery.data,
      equipment: equipmentQuery.data,
      market: marketQuery.data,
      layout: layoutQuery.data,
    },
    cached: {
      roi: roiQuery.cached,
      climate: climateQuery.cached,
      equipment: equipmentQuery.cached,
      market: marketQuery.cached,
      layout: layoutQuery.cached,
    },
    executeAll,
    refetchAll: () => {
      roiQuery.refetch();
      climateQuery.refetch();
      equipmentQuery.refetch();
      marketQuery.refetch();
      layoutQuery.refetch();
    }
  };
}
