'use client';

import { useState, useEffect } from 'react';

interface SimpleUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isAuthenticated: boolean;
}

export function useSimpleAuth() {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login in development
    if (process.env.NODE_ENV === 'development') {
      const devUser: SimpleUser = {
        id: 'dev-user-1',
        email: process.env.NEXT_DEV_USER_EMAIL || 'dev@seragpt.com',
        name: process.env.NEXT_DEV_USER_NAME || 'Development User',
        role: (process.env.NEXT_DEV_USER_ROLE as 'user' | 'admin') || 'user',
        isAuthenticated: true
      };
      
      setUser(devUser);
      setLoading(false);
      
      // Store in localStorage for consistency
      localStorage.setItem('simple_auth_user', JSON.stringify(devUser));
    } else {
      // Production: check localStorage or redirect to login
      const storedUser = localStorage.getItem('simple_auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    const newUser: SimpleUser = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
      isAuthenticated: true
    };
    
    setUser(newUser);
    localStorage.setItem('simple_auth_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simple_auth_user');
  };

  const switchRole = (role: 'user' | 'admin') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('simple_auth_user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    switchRole
  };
}
