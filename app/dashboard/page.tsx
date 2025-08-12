'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientOnly from '@/components/ui/ClientOnly';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

interface DashboardStats {
  totalAnalyses: number;
  completedAnalyses: number;
  pendingAnalyses: number;
  totalReports: number;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalAnalyses: 0,
    completedAnalyses: 0,
    pendingAnalyses: 0,
    totalReports: 0
  });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      loadDashboardData();
    }
  }, [user, loading]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    try {
      setDataLoading(true);
      
      // Load user stats
      const statsResponse = await fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats || stats);
      }
      
      // Load recent chat sessions
      const chatResponse = await fetch('/api/chat/sessions', {
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });
      
      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        setChatSessions(chatData.sessions || []);
      }
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return (
      <ClientOnly>
        <DashboardLayout user={user} signOut={signOut}>
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <DashboardLayout user={user} signOut={signOut}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e3237' }}>
                Hoş geldiniz, {user?.displayName || user?.email}!
              </h1>
              <p className="text-gray-600">
                SeraGPT dashboard'unuzda tüm analizlerinizi ve raporlarınızı yönetebilirsiniz.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Toplam Analiz</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                      {stats.totalAnalyses}
                    </p>
                  </div>
                  <div className="text-2xl">📊</div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tamamlanan</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                      {stats.completedAnalyses}
                    </p>
                  </div>
                  <div className="text-2xl">✅</div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bekleyen</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                      {stats.pendingAnalyses}
                    </p>
                  </div>
                  <div className="text-2xl">⏳</div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Raporlar</p>
                    <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                      {stats.totalReports}
                    </p>
                  </div>
                  <div className="text-2xl">📋</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>
                  Hızlı Analiz
                </h2>
                <p className="text-gray-600 mb-6">
                  Yaygın kullanılan analiz türleri ile hızlıca başlayın
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="/dashboard/analysis/roi"
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-medium" style={{ color: '#1e3237' }}>ROI Analizi</div>
                  </a>
                  <a
                    href="/dashboard/analysis/climate"
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="font-medium" style={{ color: '#1e3237' }}>İklim Analizi</div>
                  </a>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>
                  Son Chat Oturumları
                </h2>
                {chatSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-600 mb-4">Henüz chat oturumu yok</p>
                    <a
                      href="/dashboard/ai-chat"
                      className="inline-block px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      AI Chat Başlat
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatSessions.slice(0, 3).map((session) => (
                      <div
                        key={session.id}
                        className="p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                        style={{ backgroundColor: '#ffffff' }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-sm line-clamp-1" style={{ color: '#1e3237' }}>
                            {session.title}
                          </h3>
                          <span className="text-xs text-gray-500">{session.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                          {session.lastMessage}
                        </p>
                        <div className="text-xs text-gray-500">
                          {session.messageCount} mesaj
                        </div>
                      </div>
                    ))}
                    <a
                      href="/dashboard/ai-chat"
                      className="block text-center py-2 px-4 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      Tüm Chat Oturumları
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>
                Son Aktiviteler
              </h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-600">
                  Henüz aktivite bulunmuyor. İlk analizinizi oluşturun!
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ClientOnly>
  );
}
