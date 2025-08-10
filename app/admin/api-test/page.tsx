'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function APITestPage() {
  const [emailTest, setEmailTest] = useState({
    to: '',
    subject: 'SeraGPT API Test',
    message: 'Bu bir test mesajıdır.',
    loading: false,
    result: null as any
  });

  const [aiTest, setAiTest] = useState({
    message: 'Antalya\'da domates serası kurmak istiyorum. ROI analizi hakkında bilgi verir misin?',
    loading: false,
    result: null as any
  });

  const testEmail = async () => {
    setEmailTest(prev => ({ ...prev, loading: true, result: null }));
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailTest.to,
          subject: emailTest.subject,
          message: emailTest.message
        })
      });
      
      const result = await response.json();
      setEmailTest(prev => ({ ...prev, result, loading: false }));
    } catch (error: any) {
      setEmailTest(prev => ({ 
        ...prev, 
        result: { error: error.message }, 
        loading: false 
      }));
    }
  };

  const testAI = async () => {
    setAiTest(prev => ({ ...prev, loading: true, result: null }));
    
    try {
      const response = await fetch('/api/test-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: aiTest.message
        })
      });
      
      const result = await response.json();
      setAiTest(prev => ({ ...prev, result, loading: false }));
    } catch (error: any) {
      setAiTest(prev => ({ 
        ...prev, 
        result: { error: error.message }, 
        loading: false 
      }));
    }
  };

  return (
    <DashboardLayout 
      title="API Entegrasyon Testi" 
      subtitle="Production API'lerini test edin"
    >
      <div className="space-y-8">
        {/* Email Test Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📧 Email Service Test (Resend API)
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Adresi
              </label>
              <input
                type="email"
                value={emailTest.to}
                onChange={(e) => setEmailTest(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konu
              </label>
              <input
                type="text"
                value={emailTest.subject}
                onChange={(e) => setEmailTest(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mesaj
              </label>
              <textarea
                value={emailTest.message}
                onChange={(e) => setEmailTest(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <button
              onClick={testEmail}
              disabled={emailTest.loading || !emailTest.to}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {emailTest.loading ? 'Gönderiliyor...' : 'Email Gönder'}
            </button>
            
            {emailTest.result && (
              <div className={`p-4 rounded-md ${
                emailTest.result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(emailTest.result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* AI Test Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🤖 AI Service Test (OpenAI API)
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI'ya Soru Sorun
              </label>
              <textarea
                value={aiTest.message}
                onChange={(e) => setAiTest(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Sera tarımı hakkında bir soru sorun..."
              />
            </div>
            
            <button
              onClick={testAI}
              disabled={aiTest.loading || !aiTest.message}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiTest.loading ? 'AI Düşünüyor...' : 'AI\'ya Sor'}
            </button>
            
            {aiTest.result && (
              <div className={`p-4 rounded-md ${
                aiTest.result.success ? 'bg-blue-50' : 'bg-red-50'
              }`}>
                {aiTest.result.success ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">AI Yanıtı:</h4>
                    <p className="text-blue-800 whitespace-pre-wrap">
                      {aiTest.result.response}
                    </p>
                    {aiTest.result.usage && (
                      <div className="text-xs text-blue-600 border-t pt-2">
                        Token Kullanımı: {aiTest.result.usage.total_tokens} 
                        (Prompt: {aiTest.result.usage.prompt_tokens}, 
                        Completion: {aiTest.result.usage.completion_tokens})
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-800">
                    <strong>Hata:</strong> {aiTest.result.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* API Status */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📊 API Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">OpenAI API</h3>
              <p className="text-sm text-gray-600">
                Key: {process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Resend API</h3>
              <p className="text-sm text-gray-600">
                Key: {process.env.RESEND_API_KEY ? '✅ Configured' : '❌ Missing'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Supabase</h3>
              <p className="text-sm text-gray-600">
                Key: {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configured' : '❌ Missing'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
