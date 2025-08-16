import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (you can implement your admin check logic here)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get system health metrics
    const systemMetrics = {
      server: {
        cpu: await getCPUUsage(),
        memory: await getMemoryUsage(),
        disk: await getDiskUsage(),
        status: 'healthy'
      },
      database: {
        status: await getDatabaseStatus(supabase),
        connections: await getDatabaseConnections(),
        queries: await getQueryCount()
      },
      apis: {
        active: await getActiveAPIs(),
        failing: await getFailingAPIs(),
        avgResponse: await getAverageResponseTime()
      },
      cache: {
        hitRate: await getCacheHitRate(),
        size: await getCacheSize(),
        evictions: await getCacheEvictions()
      }
    };

    const services = await getSystemServices();

    return NextResponse.json({
      success: true,
      data: {
        metrics: systemMetrics,
        services: services,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('System health check failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system health' },
      { status: 500 }
    );
  }
}

// Helper functions for system monitoring
async function getCPUUsage(): Promise<number> {
  // In a real implementation, you would use system monitoring tools
  // For now, return a realistic mock value
  return Math.random() * 30 + 35; // 35-65%
}

async function getMemoryUsage(): Promise<number> {
  // In production, use process.memoryUsage() or system monitoring
  return Math.random() * 20 + 60; // 60-80%
}

async function getDiskUsage(): Promise<number> {
  // In production, use filesystem monitoring
  return Math.random() * 15 + 20; // 20-35%
}

async function getDatabaseStatus(supabase: any): Promise<string> {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    return error ? 'error' : 'healthy';
  } catch (error) {
    return 'error';
  }
}

async function getDatabaseConnections(): Promise<number> {
  // In production, query pg_stat_activity
  return Math.floor(Math.random() * 10) + 15; // 15-25 connections
}

async function getQueryCount(): Promise<number> {
  // In production, use database metrics
  return Math.floor(Math.random() * 500) + 1000; // 1000-1500 queries/min
}

async function getActiveAPIs(): Promise<number> {
  // Check configured APIs
  const apiList = [
    'openweather',
    'meteostat', 
    'nominatim',
    'fao',
    'tcmb',
    'openai',
    'supabase',
    'vercel'
  ];
  return apiList.length;
}

async function getFailingAPIs(): Promise<number> {
  // In production, check actual API health
  return Math.floor(Math.random() * 3); // 0-2 failing APIs
}

async function getAverageResponseTime(): Promise<number> {
  // In production, aggregate response times from monitoring
  return Math.random() * 100 + 100; // 100-200ms
}

async function getCacheHitRate(): Promise<number> {
  // In production, get from Redis or cache monitoring
  return Math.random() * 10 + 90; // 90-100%
}

async function getCacheSize(): Promise<string> {
  // In production, get actual cache size
  const sizes = ['1.2GB', '2.3GB', '3.1GB', '1.8GB'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

async function getCacheEvictions(): Promise<number> {
  // In production, get cache eviction metrics
  return Math.floor(Math.random() * 50) + 20; // 20-70 evictions
}

async function getSystemServices() {
  return [
    {
      id: 'next-app',
      name: 'Next.js Application',
      status: 'running',
      uptime: getRandomUptime(),
      responseTime: Math.floor(Math.random() * 50) + 50,
      errorRate: Math.random() * 0.5,
      lastCheck: 'Az önce',
      port: 3000,
      version: '14.1.0'
    },
    {
      id: 'supabase-db',
      name: 'Supabase Database',
      status: 'running',
      uptime: getRandomUptime(),
      responseTime: Math.floor(Math.random() * 30) + 30,
      errorRate: Math.random() * 0.2,
      lastCheck: 'Az önce',
      version: 'PostgreSQL 15.1'
    },
    {
      id: 'vercel-edge',
      name: 'Vercel Edge Functions',
      status: 'running',
      uptime: getRandomUptime(),
      responseTime: Math.floor(Math.random() * 20) + 15,
      errorRate: Math.random() * 0.1,
      lastCheck: 'Az önce',
      version: 'v1.0'
    }
  ];
}

function getRandomUptime(): string {
  const days = Math.floor(Math.random() * 30) + 1;
  const hours = Math.floor(Math.random() * 24);
  return `${days} gün ${hours} saat`;
}
