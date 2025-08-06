'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Check for error parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorMessage = urlParams.get('message');
    
    if (error === 'auth_code_error') {
      setMessage(errorMessage ? 
        `❌ E-posta doğrulama hatası: ${errorMessage}` : 
        '❌ E-posta doğrulama linkinde bir sorun oluştu. Lütfen tekrar giriş yapmayı deneyin.'
      );
    } else if (error === 'missing_code') {
      setMessage('❌ Doğrulama kodu eksik. Lütfen e-posta linkini tekrar kullanın.');
    }
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

    if (!email || !password) {
      setMessage('❌ E-posta ve şifre gereklidir');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          setMessage('❌ E-posta veya şifre hatalı');
        } else if (error.message.includes('Email not confirmed')) {
          setMessage('❌ E-posta adresinizi doğrulamanız gerekiyor. E-postanızı kontrol edin.');
        } else {
          setMessage(`❌ Giriş hatası: ${error.message}`);
        }
      } else {
        console.log('=== LOGIN SUCCESSFUL ===');
        setMessage('✅ Giriş başarılı, yönlendiriliyorsunuz...');

        // Wait a bit for session to be properly set, then redirect
        setTimeout(async () => {
          console.log('Checking session before redirect...');
          const { data: { session } } = await supabase.auth.getSession();
          console.log('Session before redirect:', {
            hasSession: !!session,
            hasUser: !!session?.user,
            userEmail: session?.user?.email
          });

          console.log('REDIRECTING TO TEST SUCCESS PAGE');
          window.location.href = '/dashboard/test-success';
        }, 1500); // Increased delay to ensure session is set
      }
    } catch (error) {
      setMessage('❌ Giriş yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('Starting signup process for:', email);

    if (!email || !password || !confirmPassword) {
      setMessage('❌ Tüm alanları doldurunuz');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('❌ Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Şifre en az 6 karakter olmalıdır');
      setLoading(false);
      return;
    }

    try {
      const redirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;
      console.log('Sign up with redirect URL:', redirectUrl);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: email.split('@')[0] // Use part of email as default name
          }
        },
      });

      console.log('Signup result:', { data, error });

      if (error) {
        console.error('Signup error details:', error);
        if (error.message.includes('User already registered') ||
            error.message.includes('already registered') ||
            error.message.includes('already been registered') ||
            error.message.includes('email address is already registered') ||
            error.message.includes('email rate limit exceeded')) {
          setMessage('❌ Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.');
        } else if (error.message.includes('email')) {
          setMessage('❌ E-posta adresi geçersiz. Lütfen geçerli bir e-posta adresi girin.');
        } else if (error.message.includes('password')) {
          setMessage('❌ Şifre geçersiz. Lütfen daha güçlü bir şifre deneyin.');
        } else {
          setMessage(`❌ Kayıt hatası: ${error.message}`);
        }
      } else if (data?.user && !data?.session) {
        // User created but needs email confirmation
        setMessage('✅ Kayıt başarılı! E-posta adresinizi kontrol edin ve doğrulama linkine tıklayın.');
        resetForm();
      } else if (data?.user && data?.session) {
        // User created and automatically signed in
        setMessage('✅ Kayıt başarılı! Yönlendiriliyorsunuz...');
        setTimeout(() => {
          console.log('SIGNUP SUCCESS - HARD REDIRECT TO TEST SUCCESS');
          window.location.href = '/dashboard/test-success';
        }, 1000);
      } else if (data && !data.user && !error) {
        // Supabase sometimes returns empty data for existing users without error
        setMessage('❌ Bu e-posta adresi zaten kayıtlı olabilir. Giriş yapmayı deneyin.');
      } else {
        // Always show some feedback
        setMessage('✅ İşlem tamamlandı. E-posta adresinizi kontrol edin.');
        resetForm();
      }
    } catch (error: any) {
      console.error('Signup exception:', error);
      if (error?.message) {
        setMessage(`❌ Kayıt hatası: ${error.message}`);
      } else {
        setMessage('❌ Kayıt oluşturulamadı. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-gray-200 rounded mx-auto mb-6"></div>
          <div className="space-y-4 w-96">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
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
                autoComplete="email"
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
                autoComplete={isLogin ? "current-password" : "new-password"}
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
                    autoComplete="new-password"
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

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}</p>
            <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
