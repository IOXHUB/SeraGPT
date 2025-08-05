'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-50">
      <div className="navbar-footer-container">
        {/* Logo - clickable to homepage */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
              alt="SeraGPT Logo"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Center navigation - 3 links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Danışmanlık
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Anahtar Teslim Proje
          </a>
          <a href="/dashboard/help" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Destek
          </a>
        </nav>

        {/* Right menu - conditional based on user state */}
        <div className="hidden md:flex items-center space-x-4">
          {/* For logged in users */}
          <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Dashboard
          </a>

          {/* For logged out users - first time visitors */}
          <a href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Giriş Yap
          </a>

          {/* CTA Button for new users */}
          <a href="/dashboard" className="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            Ücretsiz Başla
          </a>
        </div>

        {/* Mobile menu button - hamburger icon */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="md:hidden bg-gray-50 border-t border-gray-200"
        >
          <div className="text-section-container py-4 space-y-4">
            {/* Center navigation links */}
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Danışmanlık
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anahtar Teslim Proje
              </a>
              <a
                href="/dashboard/help"
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destek
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Right menu actions */}
            <div className="space-y-3">
              <a
                href="/dashboard"
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <a
                href="/auth/login"
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Giriş Yap
              </a>
              <a
                href="/dashboard"
                className="block bg-gray-600 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ücretsiz Başla
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
