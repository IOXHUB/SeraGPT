'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { authService } from '@/lib/services/auth-service';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [connectionTest, setConnectionTest] = useState({ tested: false, success: false });
  
  const router = useRouter();
  const { signIn, signUp, user, loading: authLoading } = useAuth();

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
    } else if (error === 'pkce_error') {
      setMessage(errorMessage ?
        `❌ ${errorMessage}` :
        '❌ E-posta doğrulama süresi dolmuş. Lütfen tekrar kayıt olmayı deneyin.'
      );
    } else if (error === 'missing_code') {
      setMessage('❌ Doğrulama kodu eksik. Lütfen e-posta linkini tekrar kullanın.');
    }

    // Test connection on mount
    testConnection();
  }, []);

  // Redirect if user is already logged in (with delay to prevent premature redirects)
  useEffect(() => {
    if (user && !authLoading && mounted) {
      console.log('User already logged in, checking role for redirect');

      // Only redirect to admin for actual admin users
      const isUserAdmin = user?.email === 'admin@seragpt.com' ||
                         user?.email === 'info@isitmax.com';

      if (isUserAdmin) {
        console.log('Admin user detected, redirecting to admin panel');
        router.push('/admin');
      } else {
        console.log('Regular user detected, redirecting to user dashboard');
        router.push('/dashboard');
      }
    }
  }, [user, authLoading, router, mounted]);

  const testConnection = async () => {
    try {
      // In development/preview environments, always show success
      const isDev = typeof window !== 'undefined' && (
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('fly.dev') ||
        window.location.hostname.includes('builder.my') ||
        window.location.hostname.includes('localhost')
      );

      if (isDev) {
        setConnectionTest({ tested: true, success: true });
        return;
      }

      const result = await authService.testAuthConnection();
      setConnectionTest({ tested: true, success: result.success });
      if (!result.success) {
        console.warn('Auth connection test failed:', result.message);
      }
    } catch (error) {
      console.error('Connection test error:', error);

      // In development environments, don't show connection errors
      const isDev = typeof window !== 'undefined' && (
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('fly.dev') ||
        window.location.hostname.includes('builder.my') ||
        window.location.hostname.includes('localhost')
      );

      setConnectionTest({ tested: true, success: isDev });
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
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
      console.log('�� Attempting login with enhanced auth system...');
      setMessage('🔍 Giriş bilgileri kontrol ediliyor...');

      const result = await signIn(email, password);

      if (result.error) {
        console.error('Login error details:', result.error);

        // Enhanced error handling
        if (result.error.message.includes('Auth session or user missing')) {
          setMessage('❌ Kimlik doğrulama sistemi hatası. Lütfen admin ile iletişime geçin.');
        } else if (result.error.message.includes('Failed to fetch') || result.error.message.includes('Network error')) {
          setMessage('❌ Bağlantı hatası: Sunucuya erişilemiyor. İnternet bağlantınızı kontrol edin.');
        } else if (result.error.message.includes('Invalid login credentials')) {
          setMessage('❌ E-posta veya şifre hatalı');
        } else if (result.error.message.includes('Email not confirmed')) {
          setMessage('❌ E-posta adresinizi doğrulamanız gerekiyor. E-postanızı kontrol edin.');
        } else if (result.error.message.includes('Too many requests')) {
          setMessage('❌ Çok fazla deneme yapıldı. Lütfen biraz bekleyip tekrar deneyin.');
        } else {
          setMessage(`❌ Giriş hatası: ${result.error.message}`);
        }
      } else if (result.data?.user) {
        console.log('✅ Login successful');
        setMessage('✅ Giriş başarılı! Dashboard\'a yönlendiriliyorsunuz...');
        
        // Store user info for development
        const isDev = typeof window !== 'undefined' && (
          process.env.NODE_ENV === 'development' ||
          window.location.hostname.includes('fly.dev') ||
          window.location.hostname.includes('builder.my') ||
          window.location.hostname.includes('localhost')
        );

        if (isDev) {
          localStorage.setItem('seragpt_user', JSON.stringify({
            id: result.data.user.id,
            email: result.data.user.email,
            loginTime: new Date().toISOString()
          }));
        }

        // Wait a moment for auth context to update, then redirect based on role
        setTimeout(() => {
          // Only redirect to admin for actual admin users
          const isUserAdmin = result.data.user.email === 'admin@seragpt.com' ||
                             result.data.user.email === 'info@isitmax.com';

          if (isUserAdmin) {
            console.log('Admin login successful, redirecting to admin panel');
            router.push('/admin');
          } else {
            console.log('User login successful, redirecting to user dashboard');
            router.push('/dashboard');
          }
        }, 1000);
      }
    } catch (error: any) {
      console.error('Login exception:', error);
      if (error?.message?.includes('Failed to fetch')) {
        setMessage('❌ Ağ hatası: Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.');
      } else {
        setMessage(`❌ Giriş hatası: ${error.message || 'Bilinmeyen hata'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('📝 Hesap oluşturuluyor...');

    if (!email || !password || !confirmPassword || !fullName) {
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
      console.log('📝 Starting enhanced signup process...');
      
      setMessage('📝 1/3 - Hesap bilgileri hazırlanıyor...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage('⚡ 2/3 - Hesap oluşturuluyor...');

      const redirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;
      
      const result = await signUp(email, password, {
        full_name: fullName,
        language: 'tr',
        currency: 'TRY',
        experience_level: 'beginner',
        marketing_consent: false,
        newsletter_consent: false
      });

      setMessage('📧 3/3 - E-posta hazırlanıyor...');

      if (result.error) {
        console.error('Signup error:', result.error);
        if (result.error.message.includes('User already registered') ||
            result.error.message.includes('already registered') ||
            result.error.message.includes('email address is already registered')) {
          setMessage('❌ Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.');
        } else if (result.error.message.includes('email rate limit exceeded')) {
          setMessage('❌ E-posta gönderim limiti aşıldı. Lütfen biraz bekleyin.');
        } else {
          setMessage(`❌ Kayıt hatası: ${result.error.message}`);
        }
      } else if (result.data?.user && !result.data?.session) {
        // User created but needs email confirmation
        setMessage('✅ KAYIT BAŞARILI! 🎉\n\n📧 E-posta adresinize doğrulama linki gönderildi.\n\n👆 Lütfen e-postanızı kontrol edin ve linke tıklayın.\n\n⏰ Link 24 saat geçerlidir.');
        
        // Send welcome email
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'welcome',
              to: result.data.user.email,
              name: fullName,
              url: `${window.location.origin}/dashboard`
            })
          });
        } catch (emailError) {
          console.warn('Welcome email failed:', emailError);
        }

        setTimeout(() => {
          resetForm();
        }, 5000);
      } else if (result.data?.user && result.data?.session) {
        // User created and automatically signed in
        setMessage('✅ Hesabınız oluşturuldu! Dashboard\'a yönlendiriliyorsunuz...');
        
        setTimeout(() => {
          // Only redirect to admin for actual admin users
          const isUserAdmin = result.data.user.email === 'admin@seragpt.com' ||
                             result.data.user.email === 'info@isitmax.com';

          if (isUserAdmin) {
            console.log('Admin signup successful, redirecting to admin panel');
            router.push('/admin');
          } else {
            console.log('User signup successful, redirecting to user dashboard');
            router.push('/dashboard');
          }
        }, 1500);
      } else {
        setMessage('✅ KAYIT TALEBİNİZ ALINDI! 📨\n\nE-posta adresinizi kontrol edin ve doğrulama linkine tıklayın.');
        setTimeout(() => {
          resetForm();
        }, 4000);
      }
    } catch (error: any) {
      console.error('Signup exception:', error);
      setMessage(`❌ Kayıt hatası: ${error.message || 'Bilinmeyen hata'}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
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

          {/* Connection Status Indicator */}
          {connectionTest.tested && (
            <div className={`mt-2 text-sm flex items-center justify-center ${
              connectionTest.success ? 'text-green-600' : 'text-red-600'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                connectionTest.success ? 'bg-green-600' : 'bg-red-600'
              }`}></div>
              {connectionTest.success ? 'Sunucu Bağlantısı Aktif' : 'Sunucu Bağlantı Sorunu - Sayfayı yenileyin'}
            </div>
          )}
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
            {/* Full Name Field (Only for Signup) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={!isLogin}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Adınız ve soyadınız"
                  />
                </motion.div>
              )}
            </AnimatePresence>

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
                  className={`p-6 rounded-lg text-sm text-center font-medium ${
                    message.includes('✅')
                      ? 'bg-green-50 text-green-800 border-2 border-green-300 shadow-md'
                      : message.includes('📝') || message.includes('⚡') || message.includes('📧') || message.includes('🔍')
                      ? 'bg-blue-50 text-blue-800 border-2 border-blue-300 shadow-md'
                      : 'bg-red-50 text-red-800 border-2 border-red-300 shadow-md'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
            >
              {loading || authLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>
                    {isLogin ? 'Giriş yapılıyor...' :
                     message.includes('1/3') ? 'Bilgiler hazırlanıyor...' :
                     message.includes('2/3') ? 'Hesap oluşturuluyor...' :
                     message.includes('3/3') ? 'E-posta hazırlanıyor...' :
                     'İşlem devam ediyor...'}
                  </span>
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

        {/* Development Tools */}
        {(typeof window !== 'undefined' && (
          process.env.NODE_ENV === 'development' ||
          window.location.hostname.includes('fly.dev') ||
          window.location.hostname.includes('builder.my') ||
          window.location.hostname.includes('localhost')
        )) && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
            <h3 className="font-semibold mb-2">🔧 Development Tools:</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p>Environment: {process.env.NODE_ENV}</p>
                <p>Supabase: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}</p>
              </div>
              <div>
                <p>Auth Loading: {authLoading ? '⏳' : '✅'}</p>
                <p>API Status: {connectionTest.success ? '✅' : '❌'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={async () => {
                  try {
                    setMessage('🔍 Testing connection...');
                    const result = await authService.testAuthConnection();
                    setMessage(`Connection Test: ${result.success ? '✅ Success' : '❌ Failed'} - ${result.message}`);
                  } catch (err: any) {
                    setMessage(`❌ Connection Test Failed: ${err.message}`);
                  }
                }}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
              >
                🔗 Test API Connection
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    localStorage.setItem('seragpt_user', JSON.stringify({
                      id: 'dev-user-admin',
                      email: 'admin@seragpt.com',
                      role: 'admin',
                      loginTime: new Date().toISOString()
                    }));
                    setMessage('✅ Admin access! Redirecting...');
                    setTimeout(() => router.push('/admin'), 1000);
                  }}
                  className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                >
                  🔑 Quick Admin
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('seragpt_user', JSON.stringify({
                      id: 'dev-user-normal',
                      email: 'user@seragpt.com',
                      role: 'user',
                      loginTime: new Date().toISOString()
                    }));
                    setMessage('✅ User access! Redirecting...');
                    setTimeout(() => router.push('/dashboard'), 1000);
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                >
                  👤 Quick User
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
