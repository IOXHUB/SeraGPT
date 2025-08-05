'use client'

import { useState, FormEvent } from 'react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  language: 'tr' | 'en'
}

export function EmailModal({ isOpen, onClose, onSubmit, language }: EmailModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const translations = {
    tr: {
      title: 'E-posta Adresinizi Girin',
      subtitle: 'Raporu görüntülemek için e-posta adresinizi paylaşın',
      placeholder: 'ornek@email.com',
      submit: 'Devam Et',
      cancel: 'İptal',
      privacy: 'E-posta adresiniz güvenli bir şekilde saklanır ve spam göndermeyiz.'
    },
    en: {
      title: 'Enter Your Email Address',
      subtitle: 'Share your email to view the report',
      placeholder: 'example@email.com',
      submit: 'Continue',
      cancel: 'Cancel',
      privacy: 'Your email is stored securely and we don\'t send spam.'
    }
  }

  const t = translations[language]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSubmit(email)
    setEmail('')
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>
          <p className="text-gray-600 text-sm">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t.submit
              )}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">{t.privacy}</p>
      </div>
    </div>
  )
}
