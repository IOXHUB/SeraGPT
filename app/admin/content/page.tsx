'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'page' | 'media';
  status: 'published' | 'draft' | 'archived';
  author: string;
  lastModified: string;
  views: number;
}

export default function ContentManager() {
  const { user, isAdmin, loading } = useAuth();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'blog' | 'page' | 'media'>('all');

  useEffect(() => {
    if (user && !loading) {
      loadContentData();
    }
  }, [user, loading]);

  const loadContentData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock content data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockContent: ContentItem[] = [
        {
          id: '1',
          title: 'Sera Teknolojilerinde 2025 Yenilikleri',
          type: 'blog',
          status: 'published',
          author: 'Admin',
          lastModified: '2024-01-15',
          views: 1234
        },
        {
          id: '2',
          title: 'Tarımda Kadın Eli',
          type: 'blog',
          status: 'published',
          author: 'Admin',
          lastModified: '2024-01-14',
          views: 987
        },
        {
          id: '3',
          title: 'Ana Sayfa Hero Görseli',
          type: 'media',
          status: 'published',
          author: 'Admin',
          lastModified: '2024-01-13',
          views: 0
        },
        {
          id: '4',
          title: 'Hakkımızda Sayfası',
          type: 'page',
          status: 'draft',
          author: 'Admin',
          lastModified: '2024-01-12',
          views: 0
        }
      ];
      
      setContentItems(mockContent);
      
    } catch (error) {
      console.error('Failed to load content data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (!loading && user && !isAdmin()) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full rounded-lg p-8 text-center" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3237' }}>Yetkisiz Erişim</h3>
            <p className="mb-6" style={{ color: '#1e3237', opacity: '0.7' }}>Bu sayfaya erişmek için admin yetkisine sahip olmanız gerekir.</p>
            <Link 
              href="/dashboard" 
              className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Dashboard'a Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredContent = filter === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type === filter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>İçerik Yöneticisi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Blog yazıları, sayfalar ve medya dosyalarını yönetin</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                Admin Panel'e Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Tümü ({contentItems.length})
            </button>
            <button
              onClick={() => setFilter('blog')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'blog' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Blog ({contentItems.filter(item => item.type === 'blog').length})
            </button>
            <button
              onClick={() => setFilter('page')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'page' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Sayfalar ({contentItems.filter(item => item.type === 'page').length})
            </button>
            <button
              onClick={() => setFilter('media')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'media' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
            >
              Medya ({contentItems.filter(item => item.type === 'media').length})
            </button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Başlık</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Tür</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Durum</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Yazar</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Son Değişiklik</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Görüntülenme</th>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium" style={{ color: '#1e3237' }}>{item.title}</p>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'blog' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'page' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type === 'blog' ? 'Blog' : 
                         item.type === 'page' ? 'Sayfa' : 'Medya'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' :
                        item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'published' ? 'Yayında' : 
                         item.status === 'draft' ? 'Taslak' : 'Arşivlendi'}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: '#1e3237' }}>{item.author}</td>
                    <td className="p-4" style={{ color: '#1e3237' }}>{item.lastModified}</td>
                    <td className="p-4" style={{ color: '#1e3237' }}>{item.views.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button 
                          className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                        >
                          Düzenle
                        </button>
                        <button 
                          className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#dc2626', color: '#f6f8f9' }}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <button 
            className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
          >
            + Yeni İçerik Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
