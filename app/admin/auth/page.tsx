'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function AdminAuthPage() {
  const { user, loading, isAdmin, supabase } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      router.push('/auth/login');
      return;
    }

    if (user && isAdmin()) {
      fetchUsers();
    }
  }, [user, loading, isAdmin, router]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) {
        setMessage(`Kullanıcılar yüklenemedi: ${error.message}`);
      } else {
        setUsers(data.users);
      }
    } catch (error) {
      setMessage('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoadingUsers(false);
    }
  };

  const promoteToAdmin = async (userId: string, email: string | undefined) => {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role: 'admin' }
      });

      if (error) {
        setMessage(`Admin yetkisi verilemedi: ${error.message}`);
      } else {
        setMessage(`✅ ${email || 'Kullanıcı'} artık admin kullanıcı`);
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      setMessage('Admin yetkisi verilirken hata oluştu');
    }
  };

  const removeAdmin = async (userId: string, email: string | undefined) => {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role: null }
      });

      if (error) {
        setMessage(`Admin yetkisi kaldırılamadı: ${error.message}`);
      } else {
        setMessage(`✅ ${email || 'Kullanıcı'} artık normal kullanıcı`);
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      setMessage('Admin yetkisi kaldırılırken hata oluştu');
    }
  };

  const deleteUser = async (userId: string, email: string | undefined) => {
    if (confirm(`${email || 'Bu kullanıcı'}yı silmek istediğinizden emin misiniz?`)) {
      try {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) {
          setMessage(`Kullanıcı silinemedi: ${error.message}`);
        } else {
          setMessage(`✅ ${email || 'Kullanıcı'} silindi`);
          fetchUsers(); // Refresh the list
        }
      } catch (error) {
        setMessage('Kullanıcı silinirken hata oluştu');
      }
    }
  };

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Kullanıcı Yönetimi
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Kayıtlı kullanıcıları yönet ve admin yetkileri ver
            </p>
          </div>

          {message && (
            <div className={`mx-6 mt-4 p-3 rounded-md ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <div className="px-6 py-4">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Kayıtlı Kullanıcılar ({users.length})
              </h2>
              <button
                onClick={fetchUsers}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                🔄 Yenile
              </button>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-posta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kayıt Tarihi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userData) => (
                    <tr key={userData.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {userData.email || 'Email not available'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(userData.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          userData.email_confirmed_at 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {userData.email_confirmed_at ? 'Doğrulanmış' : 'Bekliyor'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          userData.user_metadata?.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {userData.user_metadata?.role === 'admin' ? '👑 Admin' : '👤 Kullanıcı'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {userData.user_metadata?.role !== 'admin' ? (
                            <button
                              onClick={() => promoteToAdmin(userData.id, userData.email)}
                              className="text-purple-600 hover:text-purple-900 text-xs bg-purple-50 px-2 py-1 rounded"
                            >
                              Admin Yap
                            </button>
                          ) : (
                            <button
                              onClick={() => removeAdmin(userData.id, userData.email)}
                              className="text-gray-600 hover:text-gray-900 text-xs bg-gray-50 px-2 py-1 rounded"
                            >
                              Admin Kaldır
                            </button>
                          )}
                          {userData.email !== user?.email && (
                            <button
                              onClick={() => deleteUser(userData.id, userData.email)}
                              className="text-red-600 hover:text-red-900 text-xs bg-red-50 px-2 py-1 rounded"
                            >
                              Sil
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Henüz kayıtlı kullanıcı yok</p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  🔐 Admin Paneli - Sadece admin kullanıcılar erişebilir
                </p>
              </div>
              <div>
                <a
                  href="/dashboard"
                  className="text-sm bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  ← Dashboard'a Dön
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
