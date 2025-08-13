'use client';

import { useState, useEffect } from 'react';
import { MOCK_USERS, DevMockSystem, MockUser } from '@/lib/utils/dev-mock-system';

export default function DevToolsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showNewTrainingModal, setShowNewTrainingModal] = useState(false);
  const [isCreatingTraining, setIsCreatingTraining] = useState(false);
  const [newTrainingForm, setNewTrainingForm] = useState({
    name: '',
    type: 'fine-tuning',
    datasetId: '',
    epochs: 5,
    learningRate: 0.001,
    batchSize: 32
  });

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run if client and dev
    const isDev = process.env.NODE_ENV === 'development' ||
                  (typeof window !== 'undefined' && window.location.hostname.includes('fly.dev'));

    if (!isDev || !isClient) {
      return;
    }

    // Get current user on mount
    setCurrentUser(DevMockSystem.getCurrentUser());

    // Listen for user changes
    const handleUserChange = (event: CustomEvent) => {
      setCurrentUser(event.detail);
    };

    window.addEventListener('dev-user-changed', handleUserChange as EventListener);

    return () => {
      window.removeEventListener('dev-user-changed', handleUserChange as EventListener);
    };
  }, [isClient]);

  // Force show for development (including fly.dev preview)
  const isDev = process.env.NODE_ENV === 'development' ||
                (typeof window !== 'undefined' && window.location.hostname.includes('fly.dev'));

  if (!isDev || !isClient) {
    return null;
  }

  const handleUserSwitch = (userType: keyof typeof MOCK_USERS) => {
    DevMockSystem.setUser(userType);
    // Refresh the page to apply changes
    window.location.reload();
  };

  const handleLogout = () => {
    DevMockSystem.clearUser();
    window.location.reload();
  };

  const handleCreateTraining = async () => {
    if (!newTrainingForm.name || !newTrainingForm.datasetId) {
      alert('Lütfen eğitim adı ve veri seti seçin');
      return;
    }

    setIsCreatingTraining(true);
    try {
      const response = await fetch('/api/admin/ai-training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrainingForm),
      });

      const result = await response.json();

      if (result.success) {
        setShowNewTrainingModal(false);
        // Reset form
        setNewTrainingForm({
          name: '',
          type: 'fine-tuning',
          datasetId: '',
          epochs: 5,
          learningRate: 0.001,
          batchSize: 32
        });
        alert('✅ Yeni eğitim başarıyla başlatıldı!');
      } else {
        alert('❌ Eğitim başlatılamadı: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating training:', error);
      alert('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsCreatingTraining(false);
    }
  };

  const openNewTrainingModal = () => {
    setShowNewTrainingModal(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-105"
        title="Development Tools"
      >
        🛠️
      </button>

      {/* Tools Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">🚀 Dev Tools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Current User Info */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current User:</h4>
            {currentUser ? (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{currentUser.role === 'admin' ? '👑' : currentUser.role === 'premium' ? '⭐' : '👤'}</span>
                  <span className="font-medium text-sm">{currentUser.name}</span>
                </div>
                <div className="text-xs text-gray-600">{currentUser.email}</div>
                <div className="text-xs text-gray-500 capitalize">Role: {currentUser.role}</div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-500">
                No user logged in
              </div>
            )}
          </div>

          {/* User Switcher */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Switch User:</h4>
            <div className="space-y-2">
              {Object.entries(MOCK_USERS).map(([key, user]) => (
                <button
                  key={key}
                  onClick={() => handleUserSwitch(key as keyof typeof MOCK_USERS)}
                  className={`w-full text-left p-2 rounded-lg border transition-colors ${
                    currentUser?.id === user.id
                      ? 'bg-purple-50 border-purple-200 text-purple-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                  }`}
                  disabled={currentUser?.id === user.id}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {user.role === 'admin' ? '👑' : user.role === 'premium' ? '⭐' : '👤'}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-green-50 hover:bg-green-100 text-green-700 text-sm py-2 px-3 rounded-lg transition-colors"
              >
                👤 Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm py-2 px-3 rounded-lg transition-colors"
              >
                👑 Admin
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-700 text-sm py-2 px-3 rounded-lg transition-colors"
            >
              🚪 Logout
            </button>

            <button
              onClick={() => {
                console.log('Current analyses:', DevMockSystem.getUserAnalyses(currentUser?.id || ''));
                console.log('User tokens:', DevMockSystem.getUserTokens(currentUser?.role || 'user'));
              }}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm py-2 px-3 rounded-lg transition-colors"
            >
              📊 Log Data to Console
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <p className="mb-1">💡 <strong>Console Commands:</strong></p>
              <p>• <code>SeraGPTDev.help()</code> - Show all commands</p>
              <p>• <code>SeraGPTDev.setUser('admin')</code> - Switch user</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
