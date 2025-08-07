'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check for development bypass in localStorage first
        const devUser = localStorage.getItem('seragpt_user');
        if (devUser && process.env.NODE_ENV === 'development') {
          try {
            const parsedUser = JSON.parse(devUser);
            console.log('🚀 Development bypass user found:', parsedUser);
            setUser({
              id: parsedUser.id,
              email: parsedUser.email,
              user_metadata: { role: parsedUser.role },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              aud: 'authenticated',
              app_metadata: {},
              role: 'authenticated'
            } as any);
            setLoading(false);
            return;
          } catch (e) {
            console.warn('Failed to parse dev user from localStorage:', e);
          }
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('useAuth session check:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          error: error?.message,
          userEmail: session?.user?.email
        });

        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.warn('Auth session check failed:', error);
        setUser(null);
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', { event, hasUser: !!session?.user });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = () => {
    // Check development bypass in localStorage first
    if (process.env.NODE_ENV === 'development') {
      const devUser = localStorage.getItem('seragpt_user');
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          if (parsedUser.role === 'admin') {
            return true;
          }
        } catch (e) {}
      }
    }

    const adminEmails = ['admin@seragpt.com', 'info@isitmax.com'];
    return user?.user_metadata?.role === 'admin' || adminEmails.includes(user?.email || '');
  };

  return { user, loading, signOut, isAdmin, supabase };
}
