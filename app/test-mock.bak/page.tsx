'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { DevMockSystem } from '@/lib/utils/dev-mock-system';
import { useEffect, useState } from 'react';

export default function TestMockPage() {
  const { user, loading, isAdmin } = useAuth();
  const [mockUser, setMockUser] = useState<any>(null);
  const [storageUser, setStorageUser] = useState<any>(null);

  useEffect(() => {
    // Check localStorage directly
    const stored = localStorage.getItem('seragpt_user');
    if (stored) {
      try {
        setStorageUser(JSON.parse(stored));
      } catch (e) {
        setStorageUser('Parse error');
      }
    }

    // Check DevMockSystem
    setMockUser(DevMockSystem.getCurrentUser());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mock Auth System Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* useAuth Hook */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">useAuth Hook</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>User:</strong> {user ? 'Found' : 'null'}</p>
              <p><strong>isAdmin():</strong> {isAdmin() ? 'true' : 'false'}</p>
              {user && (
                <div className="mt-4 p-3 bg-green-50 rounded">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Role:</strong> {user.user_metadata?.role}</p>
                </div>
              )}
            </div>
          </div>

          {/* localStorage */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">localStorage</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Has Data:</strong> {storageUser ? 'Yes' : 'No'}</p>
              {storageUser && typeof storageUser === 'object' && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p><strong>Email:</strong> {storageUser.email}</p>
                  <p><strong>ID:</strong> {storageUser.id}</p>
                  <p><strong>Role:</strong> {storageUser.role}</p>
                  <p><strong>Name:</strong> {storageUser.name}</p>
                </div>
              )}
              {typeof storageUser === 'string' && (
                <p className="text-red-600">{storageUser}</p>
              )}
            </div>
          </div>

          {/* DevMockSystem */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">DevMockSystem</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Mock User:</strong> {mockUser ? 'Found' : 'null'}</p>
              {mockUser && (
                <div className="mt-4 p-3 bg-purple-50 rounded">
                  <p><strong>Email:</strong> {mockUser.email}</p>
                  <p><strong>ID:</strong> {mockUser.id}</p>
                  <p><strong>Role:</strong> {mockUser.role}</p>
                  <p><strong>Name:</strong> {mockUser.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                DevMockSystem.setUser('admin');
                setTimeout(() => window.location.reload(), 500);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Set Admin User
            </button>
            <button
              onClick={() => {
                DevMockSystem.setUser('user');
                setTimeout(() => window.location.reload(), 500);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Set Regular User
            </button>
            <button
              onClick={() => {
                DevMockSystem.clearUser();
                setTimeout(() => window.location.reload(), 500);
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Clear User
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Reload Page
            </button>
          </div>
        </div>

        {/* Navigation Test */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
          <div className="grid grid-cols-3 gap-4">
            <a
              href="/dashboard"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
            >
              Go to Dashboard
            </a>
            <a
              href="/admin"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-center"
            >
              Go to Admin
            </a>
            <a
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Go to Home
            </a>
          </div>
        </div>

        {/* Environment Info */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment</h2>
          <div className="text-sm space-y-1">
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</p>
            <p><strong>Full URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
