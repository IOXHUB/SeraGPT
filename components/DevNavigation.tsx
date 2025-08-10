'use client';

import { useSimpleAuth } from '@/lib/hooks/useSimpleAuth';
import Link from 'next/link';

export default function DevNavigation() {
  const { user, isAdmin, login, logout, switchRole } = useSimpleAuth();

  // Always return null to hide dev navigation
  return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black p-2 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="font-bold">🔧 DEV MODE</span>
          
          {user ? (
            <>
              <span>Logged in as: <strong>{user.email}</strong></span>
              <span className={`px-2 py-1 rounded text-xs ${
                isAdmin ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {user.role.toUpperCase()}
              </span>
            </>
          ) : (
            <span>Not logged in</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <button
                onClick={() => switchRole(isAdmin ? 'user' : 'admin')}
                className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
              >
                Switch to {isAdmin ? 'User' : 'Admin'}
              </button>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => login('user@seragpt.com', 'user')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Login as User
              </button>
              <button
                onClick={() => login('admin@seragpt.com', 'admin')}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Login as Admin
              </button>
            </>
          )}

          <Link 
            href="/dashboard" 
            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
          >
            Dashboard
          </Link>
          
          <Link 
            href="/admin" 
            className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
