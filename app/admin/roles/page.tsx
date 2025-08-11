'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: number;
  color: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface UserRole {
  userId: string;
  email: string;
  name: string;
  role: string;
  assignedAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export default function RolesManager() {
  const { user, isAdmin, loading } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'users'>('roles');

  useEffect(() => {
    if (user && !loading) {
      loadRolesData();
    }
  }, [user, loading]);

  const loadRolesData = async () => {
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    try {
      setDataLoading(true);
      
      // Mock roles data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPermissions: Permission[] = [
        { id: 'user_read', name: 'Kullanıcı Görüntüleme', description: 'Kullanıcı listesini görüntüleyebilir', category: 'Kullanıcılar' },
        { id: 'user_write', name: 'Kullanıcı Düzenleme', description: 'Kullanıcı bilgilerini düzenleyebilir', category: 'Kullanıcılar' },
        { id: 'user_delete', name: 'Kullanıcı Silme', description: 'Kullanıcıları silebilir', category: 'Kullanıcılar' },
        { id: 'content_read', name: 'İçerik Görüntüleme', description: 'İçerikleri görüntüleyebilir', category: 'İçerik' },
        { id: 'content_write', name: 'İçerik Düzenleme', description: 'İçerik oluşturabilir ve düzenleyebilir', category: 'İçerik' },
        { id: 'admin_panel', name: 'Admin Panel Erişimi', description: 'Admin paneline erişebilir', category: 'Sistem' },
        { id: 'system_settings', name: 'Sistem Ayarları', description: 'Sistem ayarlarını değiştirebilir', category: 'Sistem' },
        { id: 'security_logs', name: 'Güvenlik Günlükleri', description: 'Güvenlik günlüklerini görüntüleyebilir', category: 'Güvenlik' }
      ];

      const mockRoles: Role[] = [
        {
          id: 'super_admin',
          name: 'Super Admin',
          description: 'Tüm sistem yetkilerine sahip',
          permissions: mockPermissions.map(p => p.id),
          userCount: 1,
          level: 1,
          color: '#dc2626'
        },
        {
          id: 'admin',
          name: 'Admin',
          description: 'Sistem yönetimi yetkilerine sahip',
          permissions: ['user_read', 'user_write', 'content_read', 'content_write', 'admin_panel', 'security_logs'],
          userCount: 3,
          level: 2,
          color: '#f97316'
        },
        {
          id: 'moderator',
          name: 'Moderator',
          description: 'İçerik yönetimi yetkilerine sahip',
          permissions: ['user_read', 'content_read', 'content_write'],
          userCount: 8,
          level: 3,
          color: '#eab308'
        },
        {
          id: 'user',
          name: 'Kullanıcı',
          description: 'Temel kullanıcı yetkilerine sahip',
          permissions: ['content_read'],
          userCount: 1835,
          level: 4,
          color: '#146448'
        }
      ];

      const mockUserRoles: UserRole[] = [
        {
          userId: '1',
          email: 'admin@seragpt.com',
          name: 'System Admin',
          role: 'super_admin',
          assignedAt: '2024-01-01',
          lastLogin: '2024-01-15 14:30',
          status: 'active'
        },
        {
          userId: '2',
          email: 'volkan@seragpt.com',
          name: 'Volkan Şimşirkaya',
          role: 'admin',
          assignedAt: '2024-01-02',
          lastLogin: '2024-01-15 13:45',
          status: 'active'
        },
        {
          userId: '3',
          email: 'moderator@seragpt.com',
          name: 'Content Moderator',
          role: 'moderator',
          assignedAt: '2024-01-05',
          lastLogin: '2024-01-14 16:20',
          status: 'active'
        }
      ];
      
      setRoles(mockRoles);
      setPermissions(mockPermissions);
      setUserRoles(mockUserRoles);
      
    } catch (error) {
      console.error('Failed to load roles data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getRoleByName = (roleName: string) => {
    return roles.find(role => role.id === roleName);
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#f6f8f9' }}>Rol & Yetki Yönetimi</h1>
              <p style={{ color: '#f6f8f9', opacity: '0.8' }}>Kullanıcı rolleri ve izin yönetimi</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
              >
                + Yeni Rol Ekle
              </button>
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
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#f6f8f9' }}>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'roles' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'roles' ? '#146448' : 'transparent',
                color: activeTab === 'roles' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Roller
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'permissions' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'permissions' ? '#146448' : 'transparent',
                color: activeTab === 'permissions' ? '#f6f8f9' : '#1e3237'
              }}
            >
              İzinler
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'users' 
                  ? 'text-white' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === 'users' ? '#146448' : 'transparent',
                color: activeTab === 'users' ? '#f6f8f9' : '#1e3237'
              }}
            >
              Kullanıcı Rolleri
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="rounded-lg p-6 border-l-4" 
                     style={{ backgroundColor: '#f6f8f9', borderLeftColor: role.color }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: '#1e3237' }}>{role.name}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium" 
                          style={{ backgroundColor: role.color, color: '#f6f8f9' }}>
                      Level {role.level}
                    </span>
                  </div>
                  
                  <p className="text-sm opacity-70 mb-4" style={{ color: '#1e3237' }}>{role.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#1e3237' }}>Kullanıcı Sayısı</span>
                      <span className="text-sm font-medium" style={{ color: '#146448' }}>{role.userCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#1e3237' }}>İzin Sayısı</span>
                      <span className="text-sm font-medium" style={{ color: '#146448' }}>{role.permissions.length}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button 
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                    >
                      İzinleri Düzenle
                    </button>
                    <button 
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                    >
                      Kullanıcıları Görüntüle
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Rol Hiyerarşisi</h3>
              <div className="space-y-2">
                {roles.sort((a, b) => a.level - b.level).map((role, index) => (
                  <div key={role.id} className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: role.color }}></div>
                    <div className="flex-1">
                      <span className="font-medium" style={{ color: '#1e3237' }}>{role.name}</span>
                      <span className="text-sm opacity-70 ml-2" style={{ color: '#1e3237' }}>
                        ({role.userCount} kullanıcı)
                      </span>
                    </div>
                    <div className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                      Level {role.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(
                permissions.reduce((acc, permission) => {
                  if (!acc[permission.category]) {
                    acc[permission.category] = [];
                  }
                  acc[permission.category].push(permission);
                  return acc;
                }, {} as Record<string, Permission[]>)
              ).map(([category, categoryPermissions]) => (
                <div key={category} className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>{category}</h3>
                  <div className="space-y-3">
                    {categoryPermissions.map((permission) => (
                      <div key={permission.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: '#1e3237' }}>{permission.name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {permission.id}
                          </span>
                        </div>
                        <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>{permission.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                            {roles.filter(role => role.permissions.includes(permission.id)).length} rol tarafından kullanılıyor
                          </div>
                          <button 
                            className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            Düzenle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Kullanıcı</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Email</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Rol</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Atanma Tarihi</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Son Giriş</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>Durum</th>
                      <th className="text-left p-4 font-semibold" style={{ color: '#1e3237' }}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRoles.map((userRole) => {
                      const role = getRoleByName(userRole.role);
                      return (
                        <tr key={userRole.userId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <p className="font-medium" style={{ color: '#1e3237' }}>{userRole.name}</p>
                            <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>ID: {userRole.userId}</p>
                          </td>
                          <td className="p-4" style={{ color: '#1e3237' }}>{userRole.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium" 
                                  style={{ backgroundColor: role?.color || '#gray', color: '#f6f8f9' }}>
                              {role?.name || userRole.role}
                            </span>
                          </td>
                          <td className="p-4" style={{ color: '#1e3237' }}>{userRole.assignedAt}</td>
                          <td className="p-4" style={{ color: '#1e3237' }}>{userRole.lastLogin}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              userRole.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {userRole.status === 'active' ? 'Aktif' : 'Pasif'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button 
                                className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                                style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                              >
                                Rol Değiştir
                              </button>
                              <button 
                                className="px-3 py-1 rounded text-xs font-medium transition-all hover:opacity-90"
                                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                              >
                                Detaylar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#f6f8f9' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>Yeni Kullanıcıya Rol Atama</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="email"
                  placeholder="Email adresi"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#146448' }}
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2">
                  <option value="">Rol seçin</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                >
                  Rol Ata
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
