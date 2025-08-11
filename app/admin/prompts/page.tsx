'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: 'roi' | 'climate' | 'equipment' | 'market' | 'layout' | 'system';
  version: string;
  isActive: boolean;
  createdAt: string;
  lastModified: string;
  usage: number;
  performance: number;
}

export default function PromptsPage() {
  const { user, isAdmin, loading } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  const categories = [
    { id: 'all', title: 'Tümü', icon: '📋' },
    { id: 'roi', title: 'ROI Analizi', icon: '💰' },
    { id: 'climate', title: 'İklim Analizi', icon: '🌤️' },
    { id: 'equipment', title: 'Ekipman Önerileri', icon: '🔧' },
    { id: 'market', title: 'Pazar Analizi', icon: '📈' },
    { id: 'layout', title: 'Layout Planlama', icon: '📐' },
    { id: 'system', title: 'Sistem Promptları', icon: '⚙️' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadPrompts();
    }
  }, [user, loading]);

  const loadPrompts = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPrompts: Prompt[] = [
        {
          id: 'roi-analysis-main',
          title: 'ROI Analizi Ana Prompt',
          content: 'Bu prompt sera yatırımı ROI analizini gerçekleştirmek için kullanılır...',
          category: 'roi',
          version: '2.1.3',
          isActive: true,
          createdAt: '2024-01-15',
          lastModified: '2024-03-10',
          usage: 1245,
          performance: 94.2
        },
        {
          id: 'climate-data-analysis',
          title: 'İklim Veri Analizi',
          content: 'İklim verilerini analiz etmek ve öneriler sunmak için kullanılan prompt...',
          category: 'climate',
          version: '1.8.0',
          isActive: true,
          createdAt: '2024-01-20',
          lastModified: '2024-03-08',
          usage: 892,
          performance: 91.8
        },
        {
          id: 'equipment-recommendation',
          title: 'Ekipman Önerisi Sistemi',
          content: 'Sera koşullarına göre en uygun ekipmanları öneren prompt...',
          category: 'equipment',
          version: '1.4.2',
          isActive: true,
          createdAt: '2024-02-01',
          lastModified: '2024-03-05',
          usage: 567,
          performance: 88.5
        },
        {
          id: 'market-analysis-v2',
          title: 'Pazar Analizi v2',
          content: 'Güncel pazar koşullarını analiz eden geliştirilmiş prompt...',
          category: 'market',
          version: '2.0.1',
          isActive: true,
          createdAt: '2024-02-10',
          lastModified: '2024-03-12',
          usage: 434,
          performance: 92.3
        },
        {
          id: 'layout-planning-ai',
          title: 'AI Destekli Layout Planlama',
          content: 'Sera layout planlaması için AI destekli prompt sistemi...',
          category: 'layout',
          version: '1.2.0',
          isActive: false,
          createdAt: '2024-02-20',
          lastModified: '2024-03-01',
          usage: 298,
          performance: 89.7
        },
        {
          id: 'system-error-handler',
          title: 'Sistem Hata Yöneticisi',
          content: 'Sistem hatalarını analiz eden ve çözüm öneren prompt...',
          category: 'system',
          version: '1.0.8',
          isActive: true,
          createdAt: '2024-03-01',
          lastModified: '2024-03-15',
          usage: 123,
          performance: 96.1
        }
      ];
      
      setPrompts(mockPrompts);
      
    } catch (error) {
      console.error('Failed to load prompts:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      <header className="border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-2xl hover:opacity-70 transition-opacity"
                style={{ color: '#f6f8f9' }}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Prompt Arşivi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Tüm AI promptlarının yönetimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ➕ Yeni Prompt
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Prompt</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{prompts.length}</p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Prompt</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {prompts.filter(p => p.isActive).length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Kullanım</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {prompts.reduce((acc, p) => acc + p.usage, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Ort. Performans</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {(prompts.reduce((acc, p) => acc + p.performance, 0) / prompts.length).toFixed(1)}%
                </p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#baf200' : '#f6f8f9',
                  color: '#1e3237'
                }}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>

          <div className="max-w-md">
            <input
              type="text"
              placeholder="Prompt ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: '#146448' }}
            />
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-4">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {prompt.title}
                    </h3>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prompt.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {prompt.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      v{prompt.version}
                    </span>
                  </div>
                  
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>
                    {prompt.content.substring(0, 150)}...
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="opacity-70" style={{ color: '#1e3237' }}>Kullanım</p>
                      <p className="font-medium" style={{ color: '#146448' }}>{prompt.usage.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="opacity-70" style={{ color: '#1e3237' }}>Performans</p>
                      <p className="font-medium" style={{ color: '#146448' }}>{prompt.performance}%</p>
                    </div>
                    <div>
                      <p className="opacity-70" style={{ color: '#1e3237' }}>Oluşturma</p>
                      <p className="font-medium" style={{ color: '#146448' }}>{prompt.createdAt}</p>
                    </div>
                    <div>
                      <p className="opacity-70" style={{ color: '#1e3237' }}>Son Güncelleme</p>
                      <p className="font-medium" style={{ color: '#146448' }}>{prompt.lastModified}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex space-x-2">
                  <button
                    className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📝 Düzenle
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    🧪 Test Et
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl" style={{ color: '#f6f8f9' }}>Hiç prompt bulunamadı</p>
            <p className="opacity-70" style={{ color: '#f6f8f9' }}>
              Arama kriterlerinizi değiştirin veya yeni prompt oluşturun
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
