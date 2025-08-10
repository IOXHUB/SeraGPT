'use client';

import { useEffect, useState } from 'react';

interface AuthClientWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthClientWrapper({ children, fallback }: AuthClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
