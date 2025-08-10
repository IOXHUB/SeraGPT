'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestDesignPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Vite + React</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Docs
              </Link>
              <Link href="/guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                Guide
              </Link>
              <Link href="/examples" className="text-gray-600 hover:text-gray-900 transition-colors">
                Examples
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🔥</span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Vite + React
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Next Generation Frontend Tooling. Get ready for a development experience that can finally catch up with you.
          </p>

          {/* Interactive Demo */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="/vite.svg" 
                  alt="Vite logo" 
                  className="w-12 h-12 mr-4"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-6xl">+</span>
                <div className="w-12 h-12 ml-4 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Interactive Counter
              </h2>
              
              <button
                onClick={() => setCount(count + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                count is {count}
              </button>
              
              <p className="text-gray-600 text-sm mt-4">
                Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Server Start</h3>
              <p className="text-gray-600">On demand file serving over native ESM, no bundling required!</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast HMR</h3>
              <p className="text-gray-600">Hot Module Replacement (HMR) that stays fast regardless of app size.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich Features</h3>
              <p className="text-gray-600">Out-of-the-box support for TypeScript, JSX, CSS and more.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/guide"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-8 py-3 rounded-lg border border-gray-300 transition-colors"
            >
              View Guide
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-600">Powered by</span>
              <div className="flex items-center space-x-1">
                <span className="text-blue-600 font-semibold">Vite</span>
                <span className="text-gray-400">+</span>
                <span className="text-blue-500 font-semibold">React</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link href="https://vitejs.dev" className="hover:text-gray-900 transition-colors">
                Vite Docs
              </Link>
              <Link href="https://react.dev" className="hover:text-gray-900 transition-colors">
                React Docs
              </Link>
              <Link href="/examples" className="hover:text-gray-900 transition-colors">
                Examples
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
