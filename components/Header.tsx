'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SeraGPTLogo from './ui/SeraGPTLogo';
import { useAuth } from '../lib/hooks/useAuth';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user, loading, signOut, isAdmin } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="w-full" style={{ backgroundColor: '#146448' }}>
      <div className="header-footer-container" style={{ margin: '20px auto 0' }}>
        {/* Logo - clickable to homepage */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center space-x-3">
            <SeraGPTLogo size="md" priority variant="white" />
          </a>
        </div>

        {/* Center navigation - 3 main services */}
        <nav className="hidden md:flex items-center space-x-8" style={{ marginTop: '1px' }}>
          <a href="/destek" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9 !important' }}>
            <p style={{ color: '#f6f8f9 !important' }}>Destek</p>
          </a>
          <a href="/danismanlik" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9 !important' }}>
            <p style={{ color: '#f6f8f9 !important' }}>Danışmanlık</p>
          </a>
          <a href="/anahtar-teslim-proje" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9 !important' }}>
            <p style={{ color: '#f6f8f9 !important' }}>Anahtar Teslim Sera</p>
          </a>
          <a href="/blog" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9 !important' }}>
            <p style={{ color: '#f6f8f9 !important' }}>Blog</p>
          </a>
        </nav>

        {/* Right menu - conditional based on user state */}
        <div className="hidden md:flex items-center space-x-4">
          {!isClient ? (
            // SSR fallback - show guest menu to prevent hydration mismatch
            <>
              <a href="/auth/login" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9' }}>
                Giriş Yap
              </a>
              <a href="/auth/login" className="px-6 py-2 rounded-xl font-semibold transition-colors" style={{ backgroundColor: '#baf200', color: '#146448' }}>
                Ücretsiz Başla
              </a>
            </>
          ) : !loading ? (
            <>
              {user ? (
                // For logged in users - show Dashboard and optional Admin
                <div className="flex items-center space-x-4">
                  <a href="/dashboard/direct" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9' }}>
                    Dashboard
                  </a>
                  {isAdmin() && (
                    <a href="/admin/auth" className="text-[#baf200] hover:text-white font-medium transition-colors">
                      👑 Admin
                    </a>
                  )}
                  <button
                    onClick={signOut}
                    className="font-medium transition-colors hover:text-[#baf200]"
                    style={{ color: '#f6f8f9' }}
                  >
                    Çıkış
                  </button>
                </div>
              ) : (
                // For logged out users - show Login or Sign Up CTA
                <>
                  <a href="/auth/login" className="font-medium transition-colors hover:text-[#baf200]" style={{ color: '#f6f8f9' }}>
                    Giriş Yap
                  </a>
                  <a href="/auth/login" className="px-6 py-2 rounded-xl font-semibold transition-colors" style={{ backgroundColor: '#baf200', color: '#146448' }}>
                    Ücretsiz Başla
                  </a>
                </>
              )}
            </>
          ) : null}
        </div>

        {/* Mobile menu button - hamburger icon */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#baf200' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" style={{ color: '#1e3237' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-white/20"
          style={{ backgroundColor: '#146448' }}
        >
          <div className="px-6 py-4 space-y-4">
            {/* Center navigation links */}
            <div className="space-y-3">
              <a
                href="/destek"
                className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destek Kaydı Aç
              </a>
              <a
                href="/danismanlik"
                className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Proje Danışmanlığı
              </a>
              <a
                href="/anahtar-teslim-proje"
                className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anahtar Teslim Sera Teklifi Al
              </a>
              <a
                href="/blog"
                className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-4"></div>

            {/* Right menu actions */}
            <div className="space-y-3">
              {!isClient ? (
                // SSR fallback for mobile menu
                <>
                  <a
                    href="/auth/login"
                    className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Giriş Yap
                  </a>
                  <a
                    href="/auth/login"
                    className="block px-4 py-3 rounded-xl font-medium transition-colors text-center mx-4"
                    style={{ backgroundColor: '#baf200', color: '#146448' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ücretsiz Başla
                  </a>
                </>
              ) : !loading ? (
                <>
                  {user ? (
                    // For logged in users - show Dashboard and optional Admin
                    <>
                      <a
                        href="/dashboard/direct"
                        className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </a>
                      {isAdmin() && (
                        <a
                          href="/admin/auth"
                          className="block text-[#baf200] hover:text-white font-medium transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          👑 Admin Panel
                        </a>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-white hover:text-[#baf200] font-medium transition-colors py-2"
                      >
                        Çıkış Yap
                      </button>
                    </>
                  ) : (
                    // For logged out users - show Login and Sign Up
                    <>
                      <a
                        href="/auth/login"
                        className="block text-white hover:text-[#baf200] font-medium transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Giriş Yap
                      </a>
                      <a
                        href="/auth/login"
                        className="block px-4 py-3 rounded-xl font-medium transition-colors text-center mx-4"
                        style={{ backgroundColor: '#baf200', color: '#146448' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Ücretsiz Başla
                      </a>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
