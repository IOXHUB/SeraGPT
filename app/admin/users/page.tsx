'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'premium' | 'admin';
  status: 'active' | 'suspended' | 'pending' | 'inactive';
  createdAt: string;
  lastLoginAt?: string;
  totalAnalyses: number;
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt?: string;
  };
  usage: {
    analysesThisMonth: number;
    tokensUsed: number;
    storageUsed: number;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: boolean;
  };
}

export default function UsersManagementPage() {
  const { user, isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const roles = [
    { id: 'all', title: 'Tüm Roller' },
    { id: 'user', title: 'Kullanıcı' },
    { id: 'premium', title: 'Premium' },
    { id: 'admin', title: 'Admin' }
  ];

  const statuses = [
    { id: 'all', title: 'Tüm Durumlar' },
    { id: 'active', title: 'Aktif' },
    { id: 'suspended', title: 'Askıya Alınmış' },
    { id: 'pending', title: 'Beklemede' },
    { id: 'inactive', title: 'Pasif' }
  ];

  useEffect(() => {
    if (user && !loading) {
      loadUsers();
    }
  }, [user, loading]);

  const loadUsers = async () => {
    if (!isAdmin()) {
      window.location.href = '/admin';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock users data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers: User[] = [
        {
          id: 'user-001',
          email: 'ahmet.yilmaz@example.com',
          fullName: 'Ahmet Yılmaz',
          role: 'premium',
          status: 'active',
          createdAt: '2024-01-15T10:30:00Z',
          lastLoginAt: '2024-03-15T14:20:00Z',
          totalAnalyses: 45,
          subscription: {
            plan: 'premium',
            status: 'active',
            expiresAt: '2024-12-15T00:00:00Z'
          },
          usage: {
            analysesThisMonth: 12,
            tokensUsed: 85000,
            storageUsed: 245
          },
          preferences: {
            language: 'tr',
            timezone: 'Europe/Istanbul',
            notifications: true
          }
        },
        {
          id: 'user-002',
          email: 'fatma.demir@example.com',
          fullName: 'Fatma Demir',
          role: 'user',
          status: 'active',
          createdAt: '2024-02-20T09:15:00Z',
          lastLoginAt: '2024-03-14T16:45:00Z',
          totalAnalyses: 8,
          subscription: {
            plan: 'free',
            status: 'active'
          },
          usage: {
            analysesThisMonth: 3,
            tokensUsed: 12000,
            storageUsed: 56
          },
          preferences: {
            language: 'tr',
            timezone: 'Europe/Istanbul',
            notifications: false
          }
        },
        {
          id: 'user-003',
          email: 'mehmet.kaya@enterprise.com',
          fullName: 'Mehmet Kaya',
          role: 'premium',
          status: 'active',
          createdAt: '2023-11-10T14:20:00Z',
          lastLoginAt: '2024-03-15T11:30:00Z',
          totalAnalyses: 156,
          subscription: {
            plan: 'enterprise',
            status: 'active',
            expiresAt: '2024-11-10T00:00:00Z'
          },
          usage: {
            analysesThisMonth: 28,
            tokensUsed: 245000,
            storageUsed: 1200
          },
          preferences: {
            language: 'tr',
            timezone: 'Europe/Istanbul',
            notifications: true
          }
        },
        {
          id: 'user-004',
          email: 'ayse.ozkan@example.com',
          fullName: 'Ayşe Özkan',
          role: 'user',
          status: 'suspended',
          createdAt: '2024-03-01T12:00:00Z',
          lastLoginAt: '2024-03-10T10:15:00Z',
          totalAnalyses: 2,
          subscription: {
            plan: 'basic',
            status: 'cancelled'
          },
          usage: {
            analysesThisMonth: 0,
            tokensUsed: 3500,
            storageUsed: 12
          },
          preferences: {
            language: 'tr',
            timezone: 'Europe/Istanbul',
            notifications: true
          }
        },
        {
          id: 'user-005',
          email: 'admin@seragpt.com',
          fullName: 'System Admin',
          role: 'admin',
          status: 'active',
          createdAt: '2023-01-01T00:00:00Z',
          lastLoginAt: '2024-03-15T16:00:00Z',
          totalAnalyses: 0,
          subscription: {
            plan: 'enterprise',
            status: 'active'
          },
          usage: {
            analysesThisMonth: 0,
            tokensUsed: 0,
            storageUsed: 0
          },
          preferences: {
            language: 'tr',
            timezone: 'Europe/Istanbul',
            notifications: true
          }
        }
      ];
      
      setUsers(mockUsers);
      
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#DC2626';
      case 'premium': return '#7C3AED';
      case 'user': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'suspended': return '#EF4444';
      case 'pending': return '#F59E0B';
      case 'inactive': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'suspended': return 'Askıya Alınmış';
      case 'pending': return 'Beklemede';
      case 'inactive': return 'Pasif';
      default: return 'Bilinmiyor';
    }
  };

  const getPlanText = (plan: string) => {
    switch (plan) {
      case 'free': return 'Ücretsiz';
      case 'basic': return 'Temel';
      case 'premium': return 'Premium';
      case 'enterprise': return 'Kurumsal';
      default: return plan;
    }
  };

  const changeUserStatus = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: newStatus as any } : u
    ));
  };

  const changeUserRole = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole as any } : u
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-white/10 rounded"></div>
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
                <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Kullanıcı Yönetimi</h1>
                <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Kullanıcı hesapları ve yetkilendirme</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ➕ Yeni Kullanıcı
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
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Toplam Kullanıcı</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>{users.length}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Aktif Kullanıcı</p>
                <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Premium Kullanıcı</p>
                <p className="text-2xl font-bold" style={{ color: '#7C3AED' }}>
                  {users.filter(u => u.role === 'premium').length}
                </p>
              </div>
              <div className="text-2xl">⭐</div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>Bu Ay Yeni</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                  {users.filter(u => new Date(u.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <div className="text-2xl">🆕</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#146448' }}
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.title}</option>
              ))}
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#146448' }}
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.title}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Ad, e-posta veya ID ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg flex-1 max-w-md"
              style={{ borderColor: '#146448' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>
              Kullanıcılar ({filteredUsers.length})
            </h2>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    selectedUser?.id === user.id ? 'ring-2 ring-white/20' : ''
                  }`}
                  style={{ backgroundColor: '#f6f8f9' }}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#1e3237' }}>
                            {user.fullName}
                          </h3>
                          <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {user.email}
                          </p>
                        </div>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getRoleColor(user.role) }}
                        >
                          {user.role.toUpperCase()}
                        </span>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getStatusColor(user.status) }}
                        >
                          {getStatusText(user.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Kayıt Tarihi</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Son Giriş</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {user.lastLoginAt 
                              ? new Date(user.lastLoginAt).toLocaleDateString('tr-TR')
                              : 'Hiç giriş yapmadı'}
                          </p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Analiz Sayısı</p>
                          <p className="font-medium" style={{ color: '#146448' }}>{user.totalAnalyses}</p>
                        </div>
                        <div>
                          <p className="opacity-70" style={{ color: '#1e3237' }}>Plan</p>
                          <p className="font-medium" style={{ color: '#146448' }}>
                            {getPlanText(user.subscription.plan)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      {user.status === 'active' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeUserStatus(user.id, 'suspended');
                          }}
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#EF4444', color: '#f6f8f9' }}
                        >
                          🚫 Askıya Al
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeUserStatus(user.id, 'active');
                          }}
                          className="px-3 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#10B981', color: '#f6f8f9' }}
                        >
                          ✅ Aktifleştir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👤</div>
                  <p className="text-xl" style={{ color: '#f6f8f9' }}>Hiç kullanıcı bulunamadı</p>
                  <p className="opacity-70" style={{ color: '#f6f8f9' }}>
                    Arama kriterlerinizi değiştirin
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Detail Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#f6f8f9' }}>Kullanıcı Detayı</h2>
            {selectedUser ? (
              <div className="rounded-lg p-6 space-y-6" style={{ backgroundColor: '#f6f8f9' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-semibold">
                    {selectedUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>
                      {selectedUser.fullName}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Rol
                    </label>
                    <select 
                      value={selectedUser.role}
                      onChange={(e) => changeUserRole(selectedUser.id, e.target.value)}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: '#146448' }}
                    >
                      <option value="user">Kullanıcı</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                      Durum
                    </label>
                    <select 
                      value={selectedUser.status}
                      onChange={(e) => changeUserStatus(selectedUser.id, e.target.value)}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: '#146448' }}
                    >
                      <option value="active">Aktif</option>
                      <option value="suspended">Askıya Alınmış</option>
                      <option value="pending">Beklemede</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Kullanım İstatistikleri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Bu Ay Analiz:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>
                        {selectedUser.usage.analysesThisMonth}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Token Kullanımı:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>
                        {selectedUser.usage.tokensUsed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Depolama:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>
                        {selectedUser.usage.storageUsed} MB
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#1e3237' }}>Abonelik Bilgileri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Plan:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>
                        {getPlanText(selectedUser.subscription.plan)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: '#1e3237' }}>Durum:</span>
                      <span className="font-medium" style={{ color: '#146448' }}>
                        {selectedUser.subscription.status === 'active' ? 'Aktif' : 
                         selectedUser.subscription.status === 'expired' ? 'Süresi Dolmuş' : 'İptal Edildi'}
                      </span>
                    </div>
                    {selectedUser.subscription.expiresAt && (
                      <div className="flex justify-between">
                        <span style={{ color: '#1e3237' }}>Bitiş Tarihi:</span>
                        <span className="font-medium" style={{ color: '#146448' }}>
                          {new Date(selectedUser.subscription.expiresAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                  >
                    📧 E-posta Gönder
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                  >
                    📊 Detaylı Rapor
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: '#f6f8f9' }}
              >
                <div className="text-4xl mb-4">👤</div>
                <p style={{ color: '#1e3237' }}>Detayları görmek için bir kullanıcı seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="max-w-md w-full rounded-lg p-6"
            style={{ backgroundColor: '#f6f8f9' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                Yeni Kullanıcı Oluştur
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-2xl hover:opacity-70"
                style={{ color: '#1e3237' }}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Tam Ad
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                  placeholder="Örn: Ahmet Yılmaz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  E-posta
                </label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg" 
                  style={{ borderColor: '#146448' }}
                  placeholder="Örn: ahmet@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Rol
                </label>
                <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                  <option value="user">Kullanıcı</option>
                  <option value="premium">Premium</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e3237' }}>
                  Plan
                </label>
                <select className="w-full p-3 border rounded-lg" style={{ borderColor: '#146448' }}>
                  <option value="free">Ücretsiz</option>
                  <option value="basic">Temel</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Kurumsal</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#6B7280', color: '#f6f8f9' }}
                >
                  İptal
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                >
                  👤 Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
