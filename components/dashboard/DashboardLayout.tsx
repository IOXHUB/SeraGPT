'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import AuthDebugInfo from '@/components/AuthDebugInfo';
import Footer from '@/components/Footer';
import { HighPriorityLink, MediumPriorityLink, LowPriorityLink } from '@/components/ui/OptimizedLink';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  requiresTokens?: boolean;
}

export default function DashboardLayout({ children, title, subtitle, requiresTokens }: DashboardLayoutProps) {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [userReports, setUserReports] = useState([
    { id: 1, name: 'ROI Analizi - Domates Serası', type: 'roi', date: '2024-01-15', status: 'completed' },
    { id: 2, name: 'İklim Analizi - Antalya Bölgesi', type: 'climate', date: '2024-01-14', status: 'completed' },
    { id: 3, name: 'Ekipman Listesi - 1000m² Sera', type: 'equipment', date: '2024-01-13', status: 'completed' },
    { id: 4, name: 'Pazar Analizi - Biber Üretimi', type: 'market', date: '2024-01-12', status: 'draft' },
    { id: 5, name: 'Layout Planı - Hidroponik Sistem', type: 'layout', date: '2024-01-11', status: 'completed' }
  ]);
  const router = useRouter();
  const pathname = usePathname();

  // Relaxed auth check to prevent redirect loops
  useEffect(() => {
    if (!loading && !user) {
      // Check for localStorage backup
      const backupUser = localStorage.getItem('seragpt_user');
      if (backupUser) {
        console.log('DashboardLayout: Found backup user, staying on dashboard');
        return;
      }

      console.log('DashboardLayout: No user found anywhere, will redirect after longer delay');
      // Much longer delay to prevent loops
      const redirectTimer = setTimeout(() => {
        // Only redirect if page is still active
        if (!document.hidden) {
          console.log('DashboardLayout: Redirecting to login after timeout');
          window.location.href = '/auth/login';
        }
      }, 5000); // 5 second delay

      // Cleanup timer
      return () => clearTimeout(redirectTimer);
    }
  }, [user, loading, router]);

  // Show loading screen briefly
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      router.push('/');
    }
  };

  // High priority menu items (preload immediately)
  const highPriorityMenuItems = [
    { name: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { name: 'ROI Simülasyonu', href: '/dashboard/analysis/roi', active: pathname === '/dashboard/analysis/roi' },
    { name: 'SeraGPT AI', href: '/dashboard/ai-chat', active: pathname === '/dashboard/ai-chat' },
  ];

  // Medium priority menu items (preload on hover)
  const mediumPriorityMenuItems = [
    { name: 'İklim Analizi', href: '/dashboard/analysis/climate', active: pathname === '/dashboard/analysis/climate' },
    { name: 'Ekipman Listesi', href: '/dashboard/analysis/equipment', active: pathname === '/dashboard/analysis/equipment' },
    { name: 'Pazar Analizi', href: '/dashboard/analysis/market', active: pathname === '/dashboard/analysis/market' },
    { name: 'Teknik Planlar', href: '/dashboard/analysis/layout', active: pathname === '/dashboard/analysis/layout' },
    { name: 'Raporlarım', href: '/dashboard/reports', active: pathname === '/dashboard/reports' },
    { name: 'Jeton Satın Al', href: '/dashboard/tokens', active: pathname === '/dashboard/tokens' },
  ];

  // Low priority menu items (lazy load)
  const lowPriorityMenuItems = [
    { name: 'Danışmanlık', href: '/danismanlik', active: pathname === '/danismanlik' },
    { name: 'Anahtar Teslim Sera', href: '/anahtar-teslim-proje', active: pathname === '/anahtar-teslim-proje' },
    { name: 'Ayarlar', href: '/dashboard/settings', active: pathname === '/dashboard/settings' },
    { name: 'Yardım', href: '/dashboard/help', active: pathname === '/dashboard/help' },
  ];

  const adminMenuItems = [
    { name: 'Admin Panel', href: '/admin/auth', active: pathname === '/admin/auth' },
    { name: 'Kullanıcılar', href: '/admin/users', active: pathname === '/admin/users' },
    { name: 'Sistem Ayarları', href: '/admin/settings', active: pathname === '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // ALWAYS SHOW DASHBOARD - NO USER CHECK
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
  //       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
  //         <h1 className="text-2xl font-bold text-yellow-600 mb-4">⚠️ Oturum Bulunamadı</h1>
  //         <p className="text-gray-700 mb-6">
  //           Dashboard'a erişmek için giriş yapmış olmanız gerekir.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 fixed inset-y-0 left-0 z-50 w-72 sm:w-80 lg:w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-7 sm:h-8 w-auto"
                />
                <span className="lg:hidden text-lg font-bold text-gray-900">SeraGPT</span>
              </a>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">
                  {user?.email?.charAt(0).toUpperCase() ||
                   (() => {
                     const backupUser = localStorage.getItem('seragpt_user');
                     if (backupUser) {
                       try {
                         const parsed = JSON.parse(backupUser);
                         return parsed.email?.charAt(0).toUpperCase() || 'K';
                       } catch (e) {}
                     }
                     return 'K';
                   })()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                  {user?.user_metadata?.full_name ||
                   (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : null) ||
                   (() => {
                     const backupUser = localStorage.getItem('seragpt_user');
                     if (backupUser) {
                       try {
                         const parsed = JSON.parse(backupUser);
                         const email = parsed.email || '';
                         return email.split('@')[0]?.charAt(0).toUpperCase() + email.split('@')[0]?.slice(1) || 'Kullanıcı';
                       } catch (e) {}
                     }
                     return 'Kullanıcı';
                   })()}
                  {isAdmin() && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                      Admin
                    </span>
                  )}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {user?.email ||
                   (() => {
                     const backupUser = localStorage.getItem('seragpt_user');
                     if (backupUser) {
                       try {
                         const parsed = JSON.parse(backupUser);
                         return parsed.email || 'user@seragpt.com';
                       } catch (e) {}
                     }
                     return 'user@seragpt.com';
                   })()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 lg:px-6 py-4 lg:py-6 space-y-4 lg:space-y-6 overflow-y-auto">
            {/* High Priority Menu - Preloaded immediately */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 sm:px-4">
                Ana Araçlar
              </div>
              {highPriorityMenuItems.map((item) => (
                <HighPriorityLink
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                    item.active
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{item.name}</span>
                </HighPriorityLink>
              ))}
            </div>

            {/* Medium Priority Menu - Preloaded on hover */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 sm:px-4">
                Analizler & Raporlar
              </div>
              {mediumPriorityMenuItems.map((item) => (
                <div key={item.name}>
                  {item.name === 'Raporlarım' ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowReportsDropdown(!showReportsDropdown)}
                        className={`flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                          item.active
                            ? 'bg-green-600 text-white'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${showReportsDropdown ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Reports Dropdown */}
                      {showReportsDropdown && (
                        <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Son Raporlarınız
                          </div>
                          {userReports.slice(0, 3).map((report) => (
                            <LowPriorityLink
                              key={report.id}
                              href={`/dashboard/reports/${report.id}`}
                              className="block px-3 py-2 rounded-md text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">{report.name}</span>
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                  report.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {report.status === 'completed' ? '✓' : '○'}
                                </span>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {new Date(report.date).toLocaleDateString('tr-TR')}
                              </div>
                            </LowPriorityLink>
                          ))}
                          <MediumPriorityLink
                            href="/dashboard/reports"
                            className="block px-3 py-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Tüm raporları görüntüle →
                          </MediumPriorityLink>
                        </div>
                      )}
                    </div>
                  ) : (
                    <MediumPriorityLink
                      href={item.href}
                      className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                        item.active
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{item.name}</span>
                    </MediumPriorityLink>
                  )}
                </div>
              ))}
            </div>

            {/* Low Priority Menu - Lazy loaded */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 sm:px-4">
                Diğer Hizmetler
              </p>
              <div className="space-y-1">
                {lowPriorityMenuItems.map((item) => (
                  <LowPriorityLink
                    key={item.name}
                    href={item.href}
                    className={`block px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </LowPriorityLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Admin Menu (if admin) */}
          {isAdmin() && (
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Admin İşlemleri
              </p>
              <div className="space-y-2">
                {adminMenuItems.map((item) => (
                  <LowPriorityLink
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-purple-700 hover:bg-purple-50 hover:text-purple-900'
                    }`}
                  >
                    <span>{item.name}</span>
                  </LowPriorityLink>
                ))}
              </div>
            </div>
          )}

            <div className="px-4 lg:px-6 pb-4 lg:pb-6">
              <button
                onClick={handleSignOut}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Çıkış Yap</span>
              </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                  alt="SeraGPT Logo"
                  className="h-6 w-auto"
                />
                <span className="text-base font-bold text-gray-900">SeraGPT</span>
              </div>

              {/* Page Title */}
              {title && (
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                  {subtitle && (
                    <p className="text-sm text-gray-600">{subtitle}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Token indicator on mobile */}
              <div className="lg:hidden flex items-center space-x-1 text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                <span className="text-blue-600 font-medium">5</span>
                <span>🪙</span>
              </div>

              {/* User avatar on mobile */}
              <div className="lg:hidden w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'K'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6" style={{ marginTop: '5px' }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Debug Component */}
        <AuthDebugInfo />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
