'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { simpleSignIn, simpleSignUp, createDemoUsers } from '@/lib/simple-auth';

export default function SimpleAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    createDemoUsers(); // Create demo users for testing
  }, []);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    resetForm();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = simpleSignIn(email, password);
    
    if (result.success) {
      setMessage(`✅ ${result.message}`);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      setMessage(`❌ ${result.message}`);
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('❌ Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = simpleSignUp(email, password);
    
    if (result.success) {
      setMessage(`✅ ${result.message} Dashboard'a yönlendiriliyorsunuz...`);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      setMessage(`❌ ${result.message}`);
    }

    setLoading(false);
  };

  const handleDemoLogin = (userType: 'demo' | 'admin') => {
    const email = userType === 'admin' ? 'admin@seragpt.com' : 'demo@seragpt.com';
    setEmail(email);
    setPassword('demo123');
    setMessage('Demo kullanıcı bilgileri dolduruldu. "Giriş Yap" butonuna basın.');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto h-16 w-auto mb-6"
          >
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800" 
              alt="SeraGPT Logo" 
              className="h-16 w-auto mx-auto"
            />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Hoş Geldiniz' : 'Hesap Oluşturun'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'SeraGPT hesabınıza giriş yapın' 
              : 'SeraGPT ile tarımsal analizlerinize başlayın'
            }
          </p>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              🎯 Basit Auth Sistemi - Supabase Bağımsız
            </p>
            <p className="text-xs text-green-600 mt-1">
              LocalStorage tabanlı, kurulum gerektirmez
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => switchMode(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => switchMode(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              !isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Auth Form */}
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="ornek@email.com"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={isLogin ? "Şifreniz" : "En az 6 karakter"}
              />
            </div>

            {/* Confirm Password Field (Only for Signup) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre Tekrarı
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error/Success Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg text-sm text-center ${
                    message.includes('✅') 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Giriş yapılıyor...' : 'Kayıt oluşturuluyor...'}
                </div>
              ) : (
                isLogin ? 'Giriş Yap' : 'Hesap Oluştur'
              )}
            </button>
          </form>

          {/* Demo Buttons */}
          {isLogin && (
            <div className="mt-6 space-y-2">
              <div className="text-center text-sm text-gray-500 mb-3">Hızlı Test İçin:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDemoLogin('demo')}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  👤 Demo Kullanıcı
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  🔐 Admin
                </button>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-6 text-center">
            {isLogin ? (
              <p className="text-sm text-gray-600">
                Henüz hesabınız yok mu?{' '}
                <button
                  onClick={() => switchMode(false)}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Ücretsiz kayıt olun
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{' '}
                <button
                  onClick={() => switchMode(true)}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Giriş yapın
                </button>
              </p>
            )}
          </div>
        </motion.div>

        {/* Back to Homepage */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana sayfaya dön
          </a>
        </div>
      </motion.div>
    </div>
  );
}
