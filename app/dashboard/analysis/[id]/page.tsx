'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function AnalysisDetailPage() {
  const params = useParams();

  useEffect(() => {
    // Analiz türünü belirlemek için analiz ID'sini kontrol edebiliriz
    // Şimdilik direkt olarak analiz listesine yönlendirelim
    window.location.href = '/dashboard/analysis';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
