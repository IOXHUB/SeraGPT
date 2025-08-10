'use client';

import { useCallback } from 'react';

// Hook to generate consistent timestamps that prevent hydration mismatches
export function useStaticTimestamp() {
  const baseTime = new Date('2024-01-16T15:00:00.000Z').getTime();
  
  const getTimestamp = useCallback((offset = 0) => {
    return new Date(baseTime + offset);
  }, [baseTime]);

  const generateId = useCallback((prefix = 'id') => {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  return { getTimestamp, generateId };
}
