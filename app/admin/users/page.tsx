'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  tokensRemaining: number;
  tokensPurchased: number;
  analysesCount: number;
  joinDate: string;
  lastActivity: string;
}

export default function AdminUsersPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users data - this would come from API in real implementation
  const users: User[] = [
    {
      id: '1',
      name: 'Mehmet Yılmaz',
      email: 'mehmet@example.com',
      role: 'user',
      status: 'active',
      tokensRemaining: 23,
      tokensPurchased: 100,
      analysesCount: 15,
      joinDate: '2024-01-10',
      lastActivity: '2 saat önce'
    },
    {
      id: '2',
      name: 'Ayşe Kaya',
      email: 'ayse@example.com',
      role: 'user',
      status: 'active',
      tokensRemaining: 5,
      tokensPurchased: 25,
      analysesCount: 8,
      joinDate: '2024-01-15',
      lastActivity: '1 gün önce'
    },
    {
      id: '3',
      name: 'Ali Demir',
      email: 'ali@example.com',
      role: 'admin',
      status: 'active',
      tokensRemaining: 500,
      tokensPurchased: 500,
      analysesCount: 45,
      joinDate: '2023-12-01',
      lastActivity: '30 dk önce'
    },
    {
      id: '4',
      name: 'Fatma Şen',
      email: 'fatma@example.com',
      role: 'user',
      status: 'pending',
      tokensRemaining: 5,
      tokensPurchased: 0,
      analysesCount: 0,
      joinDate: '2024-01-18',
      lastActivity: 'Henüz giriş yapmadı'
    },
    {
      id: '5',
      name: 'Hasan Öz',
      email: 'hasan@example.com',
      role: 'user',
      status: 'inactive',
      tokensRemaining: 0,
      tokensPurchased: 50,
      analysesCount: 12,
      joinDate: '2023-11-20',
      lastActivity: '2 hafta önce'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesRole && matchesSearch;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'inactive': return 'Pasif';
      case 'pending': return 'Beklemede';
      default: return 'Bilinmiyor';
    }
  };

  const getRoleColor = (role: User['role']) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getRoleText = (role: User['role']) => {
    return role === 'admin' ? 'Admin' : 'Kullanıcı';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="page-section-container space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
              <p className="text-gray-600 mt-1">Sistem kullanıcılarını görüntüleyin ve yönetin</p>
            </div>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Yeni Kullanıcı Ekle
            </button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Toplam Kullanıcı</h3>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Aktif Kullanıcı</h3>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Bu Ay Katılan</h3>
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => 
                new Date(u.joinDate).getMonth() === new Date().getMonth()
              ).length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-1">Admin Sayısı</h3>
              <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</p>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                    <option value="pending">Beklemede</option>
                  </select>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Roller</option>
                    <option value="user">Kullanıcı</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedUsers.length} seçili</span>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                    Sil
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                    Dışa Aktar
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Listesi</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jetonlar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Analizler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Aktivite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {getRoleText(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {getStatusText(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{user.tokensRemaining} / {user.tokensPurchased}</div>
                        <div className="text-xs text-gray-500">kalan / toplam</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.analysesCount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.lastActivity}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            Düzenle
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
