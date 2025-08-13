'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DirectAdminAccess() {
  const router = useRouter();

  useEffect(() => {
    // Set admin user in localStorage for development
    const adminUser = {
      id: 'admin-user-123',
      email: 'admin@seragpt.com',
      name: 'Admin User',
      role: 'admin'
    };
    
    localStorage.setItem('seragpt_user', JSON.stringify(adminUser));
    
    // Redirect to admin panel
    router.push('/admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Admin girişi yapılıyor...</p>
      </div>
    </div>
  );
}
