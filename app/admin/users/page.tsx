'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayoutWithSidebar from '@/components/dashboard/DashboardLayoutWithSidebar';

// Force dynamic rendering to prevent SSR
export const dynamic = 'force-dynamic';

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

interface UserTokenAssignment {
  userId: string;
  amount: number;
  reason: string;
}

interface NewUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  initialTokens: number;
}

export default function AdminUsersPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<User | null>(null);
  const [tokenAssignment, setTokenAssignment] = useState<UserTokenAssignment>({
    userId: '',
    amount: 0,
    reason: ''
  });
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    role: 'user',
    initialTokens: 5
  });
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'error'
  });

  // Mock users data - this would come from API in real implementation
  const [users, setUsers] = useState<User[]>([
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
  ]);

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

  const handleAssignTokens = () => {
    if (selectedUsers.length > 0) {
      setTokenAssignment({
        userId: selectedUsers[0],
        amount: 0,
        reason: ''
      });
      setShowTokenModal(true);
    }
  };

  const handleTokenAssignmentSubmit = () => {
    // Simulate API call
    console.log('Assigning tokens:', tokenAssignment);
    
    // Update users with new tokens
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, tokensRemaining: user.tokensRemaining + tokenAssignment.amount }
        : user
    ));
    
    setShowTokenModal(false);
    setSelectedUsers([]);
    setTokenAssignment({ userId: '', amount: 0, reason: '' });
  };

  const handleCreateUser = () => {
    // Simulate API call
    const userId = (users.length + 1).toString();
    const newUserData: User = {
      id: userId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      tokensRemaining: newUser.initialTokens,
      tokensPurchased: newUser.initialTokens,
      analysesCount: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Henüz giriş yapmadı'
    };
    
    setUsers(prev => [...prev, newUserData]);
    setShowNewUserModal(false);
    setNewUser({ name: '', email: '', role: 'user', initialTokens: 5 });
  };

  const handleSendNotification = () => {
    // Simulate API call
    console.log('Sending notification to users:', selectedUsers, notification);
    setShowNotificationModal(false);
    setSelectedUsers([]);
    setNotification({ title: '', message: '', type: 'info' });
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
    <DashboardLayoutWithSidebar
      title="Kullanıcı Yönetimi"
      subtitle="Sistem kullanıcılarını görüntüleyin ve yönetin"
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowNewUserModal(true)}
              className="bg-[#146448] hover:bg-[#146448]/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Yeni Kullanıcı Ekle
            </button>
            {selectedUsers.length > 0 && (
              <>
                <button 
                  onClick={handleAssignTokens}
                  className="bg-[#baf200] hover:bg-[#baf200]/90 text-[#1e3237] px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Token Ata ({selectedUsers.length})
                </button>
                <button 
                  onClick={() => setShowNotificationModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Bildirim Gönder ({selectedUsers.length})
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Sil ({selectedUsers.length})
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-[#1e3237]/70 mb-1">Toplam Kullanıcı</h3>
            <p className="text-2xl font-bold text-[#1e3237]">{users.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-[#1e3237]/70 mb-1">Aktif Kullanıcı</h3>
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-[#1e3237]/70 mb-1">Bu Ay Katılan</h3>
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
            <h3 className="text-sm font-medium text-[#1e3237]/70 mb-1">Admin Sayısı</h3>
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                  <option value="pending">Beklemede</option>
                </select>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                >
                  <option value="all">Tüm Roller</option>
                  <option value="user">Kullanıcı</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
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
            <h2 className="text-lg font-semibold text-[#1e3237]">Kullanıcı Listesi</h2>
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
                      className="rounded border-gray-300 text-[#146448] focus:ring-[#146448]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Jetonlar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Analizler
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
                    Son Aktivite
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1e3237]/70 uppercase tracking-wider">
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
                        className="rounded border-gray-300 text-[#146448] focus:ring-[#146448]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#146448] to-[#1e3237] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#1e3237]">{user.name}</div>
                          <div className="text-sm text-[#1e3237]/70">{user.email}</div>
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
                    <td className="px-6 py-4 text-sm text-[#1e3237]">
                      <div>{user.tokensRemaining} / {user.tokensPurchased}</div>
                      <div className="text-xs text-[#1e3237]/70">kalan / toplam</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1e3237]">
                      {user.analysesCount}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1e3237]/70">
                      {user.lastActivity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedUserForDetail(user)}
                          className="text-[#146448] hover:text-[#146448]/80"
                        >
                          Detay
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

      {/* Token Assignment Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#1e3237] mb-4">Token Ata</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Token Miktarı
                </label>
                <input
                  type="number"
                  value={tokenAssignment.amount}
                  onChange={(e) => setTokenAssignment(prev => ({...prev, amount: parseInt(e.target.value) || 0}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Token miktarını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Açıklama
                </label>
                <textarea
                  value={tokenAssignment.reason}
                  onChange={(e) => setTokenAssignment(prev => ({...prev, reason: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Token atama sebebi"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTokenModal(false)}
                className="px-4 py-2 text-[#1e3237] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleTokenAssignmentSubmit}
                className="px-4 py-2 bg-[#146448] text-white rounded-lg hover:bg-[#146448]/90 transition-colors"
              >
                Token Ata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#1e3237] mb-4">Yeni Kullanıcı Oluştur</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Kullanıcı adı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="E-posta adresi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Rol
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({...prev, role: e.target.value as 'user' | 'admin'}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                >
                  <option value="user">Kullanıcı</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Başlangıç Token Miktarı
                </label>
                <input
                  type="number"
                  value={newUser.initialTokens}
                  onChange={(e) => setNewUser(prev => ({...prev, initialTokens: parseInt(e.target.value) || 0}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Başlangıç token miktarı"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="px-4 py-2 text-[#1e3237] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-[#146448] text-white rounded-lg hover:bg-[#146448]/90 transition-colors"
              >
                Kullanıcı Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#1e3237] mb-4">Bildirim Gönder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={notification.title}
                  onChange={(e) => setNotification(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Bildirim başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Mesaj
                </label>
                <textarea
                  value={notification.message}
                  onChange={(e) => setNotification(prev => ({...prev, message: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                  placeholder="Bildirim mesajı"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e3237] mb-2">
                  Tip
                </label>
                <select
                  value={notification.type}
                  onChange={(e) => setNotification(prev => ({...prev, type: e.target.value as any}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#146448] focus:border-transparent"
                >
                  <option value="info">Bilgi</option>
                  <option value="success">Başarı</option>
                  <option value="warning">Uyarı</option>
                  <option value="error">Hata</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-[#1e3237] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSendNotification}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bildirim Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUserForDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#1e3237]">Kullanıcı Detayları</h3>
              <button
                onClick={() => setSelectedUserForDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Ad Soyad</label>
                  <p className="text-[#1e3237] font-medium">{selectedUserForDetail.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">E-posta</label>
                  <p className="text-[#1e3237]">{selectedUserForDetail.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Rol</label>
                  <p className="text-[#1e3237]">{getRoleText(selectedUserForDetail.role)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Durum</label>
                  <p className="text-[#1e3237]">{getStatusText(selectedUserForDetail.status)}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Kalan Tokenlar</label>
                  <p className="text-[#1e3237] font-medium">{selectedUserForDetail.tokensRemaining}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Satın Alınan Tokenlar</label>
                  <p className="text-[#1e3237]">{selectedUserForDetail.tokensPurchased}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Toplam Analiz</label>
                  <p className="text-[#1e3237]">{selectedUserForDetail.analysesCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Katılım Tarihi</label>
                  <p className="text-[#1e3237]">{selectedUserForDetail.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1e3237]/70">Son Aktivite</label>
                  <p className="text-[#1e3237]">{selectedUserForDetail.lastActivity}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setSelectedUsers([selectedUserForDetail.id]);
                  setSelectedUserForDetail(null);
                  setShowTokenModal(true);
                }}
                className="px-4 py-2 bg-[#baf200] text-[#1e3237] rounded-lg hover:bg-[#baf200]/90 transition-colors"
              >
                Token Ata
              </button>
              <button
                onClick={() => {
                  setSelectedUsers([selectedUserForDetail.id]);
                  setSelectedUserForDetail(null);
                  setShowNotificationModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bildirim Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayoutWithSidebar>
  );
}
