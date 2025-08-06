'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AuthDebugInfo() {
  const [show, setShow] = useState(false);
  const [backupUser, setBackupUser] = useState<any>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const backup = localStorage.getItem('seragpt_user');
      if (backup) {
        try {
          setBackupUser(JSON.parse(backup));
        } catch (e) {}
      }
    }
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShow(!show)}
        className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        🔧
      </button>
      
      {show && (
        <div className="absolute bottom-12 right-0 bg-white border shadow-lg rounded-lg p-4 w-80 text-xs">
          <h3 className="font-bold mb-2">🔧 Auth Debug</h3>
          
          <div className="space-y-2">
            <div>
              <strong>Loading:</strong> {loading ? 'true' : 'false'}
            </div>
            
            <div>
              <strong>Supabase User:</strong> {user ? '✅' : '❌'}
              {user && (
                <div className="ml-2 text-green-600">
                  • Email: {user.email}<br/>
                  • ID: {user.id?.substring(0, 8)}...<br/>
                  • Name: {user.user_metadata?.full_name || 'None'}
                </div>
              )}
            </div>
            
            <div>
              <strong>LocalStorage Backup:</strong> {backupUser ? '✅' : '❌'}
              {backupUser && (
                <div className="ml-2 text-blue-600">
                  • Email: {backupUser.email}<br/>
                  • ID: {backupUser.id?.substring(0, 8)}...<br/>
                  • Login: {backupUser.loginTime}
                </div>
              )}
            </div>
            
            <div>
              <strong>Environment:</strong>
              <div className="ml-2">
                • URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}<br/>
                • Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              localStorage.removeItem('seragpt_user');
              window.location.reload();
            }}
            className="mt-3 bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Clear & Reload
          </button>
        </div>
      )}
    </div>
  );
}
