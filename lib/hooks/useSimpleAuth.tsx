'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, clearCurrentUser, isUserAdmin, type SimpleUser } from '@/lib/simple-auth';

export function useSimpleAuth() {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = () => {
    clearCurrentUser();
    setUser(null);
    window.location.href = '/';
  };

  const isAdmin = () => {
    return isUserAdmin();
  };

  return {
    user,
    loading,
    signOut,
    isAdmin
  };
}
