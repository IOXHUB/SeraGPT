'use client';

import { useEffect, useState } from 'react';

export default function TestWorkingPage() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp(new Date().toLocaleString('tr-TR'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Uygulama Çalışıyor!
        </h1>
        <p className="text-gray-600 mb-4">
          Tüm sistem aktif ve çalışır durumda.
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-sm text-gray-500">Son kontrol:</p>
          <p className="font-mono text-lg">{timestamp}</p>
        </div>
        <div className="space-y-2">
          <a 
            href="/auth/debug" 
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Auth Debug Test
          </a>
          <a 
            href="/dashboard" 
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Dashboard Test
          </a>
          <a 
            href="/" 
            className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Ana Sayfa
          </a>
        </div>
      </div>
    </div>
  );
}
