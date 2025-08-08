import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading component for dynamic imports
const LoadingComponent = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Dynamic imports for analysis pages
export const DynamicROIAnalysis = dynamic(
  () => import('@/app/dashboard/analysis/roi/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const DynamicClimateAnalysis = dynamic(
  () => import('@/app/dashboard/analysis/climate/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const DynamicEquipmentAnalysis = dynamic(
  () => import('@/app/dashboard/analysis/equipment/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const DynamicMarketAnalysis = dynamic(
  () => import('@/app/dashboard/analysis/market/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const DynamicLayoutAnalysis = dynamic(
  () => import('@/app/dashboard/analysis/layout/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

// Dynamic imports for heavy UI components
export const DynamicFramerMotion = {
  motion: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion })), {
    loading: () => <div />,
    ssr: false,
  }),
  AnimatePresence: dynamic(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })), {
    loading: () => <div />,
    ssr: false,
  }),
};

// Dynamic charts (if we add charts later)
export const DynamicChart = dynamic(
  () => import('@/components/ui/Chart').catch(() => ({ default: () => <div>Chart not available</div> })),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

// Dynamic admin components
export const DynamicAdminAnalytics = dynamic(
  () => import('@/app/admin/analytics/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

export const DynamicAdminUsers = dynamic(
  () => import('@/app/admin/users/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

// Dynamic chat components  
export const DynamicAIChat = dynamic(
  () => import('@/app/dashboard/ai-chat/page'),
  {
    loading: LoadingComponent,
    ssr: false,
  }
);

// Helper function for creating lazy components
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    loading?: ComponentType;
    ssr?: boolean;
  }
) {
  return dynamic(importFunc, {
    loading: options?.loading || LoadingComponent,
    ssr: options?.ssr ?? false,
  });
}

// Utility for preloading components
export function preloadComponent(importFunc: () => Promise<any>) {
  if (typeof window !== 'undefined') {
    // Preload on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => importFunc());
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => importFunc(), 1);
    }
  }
}

// Component registry for dynamic loading
export const ComponentRegistry = {
  // Analysis components
  ROIAnalysis: () => import('@/app/dashboard/analysis/roi/page'),
  ClimateAnalysis: () => import('@/app/dashboard/analysis/climate/page'),
  EquipmentAnalysis: () => import('@/app/dashboard/analysis/equipment/page'),
  MarketAnalysis: () => import('@/app/dashboard/analysis/market/page'),
  LayoutAnalysis: () => import('@/app/dashboard/analysis/layout/page'),
  
  // Admin components
  AdminAnalytics: () => import('@/app/admin/analytics/page'),
  AdminUsers: () => import('@/app/admin/users/page'),
  
  // Chat components
  AIChat: () => import('@/app/dashboard/ai-chat/page'),
  
  // Heavy libraries
  FramerMotion: () => import('framer-motion'),
} as const;

export type ComponentKeys = keyof typeof ComponentRegistry;