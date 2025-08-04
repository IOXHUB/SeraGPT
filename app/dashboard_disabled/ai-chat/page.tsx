'use client'

import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ChatMessage } from '@/components/ChatMessage'
import { ChatInput } from '@/components/ChatInput'
import { TokenCounter } from '@/components/TokenCounter'
import { LanguageToggle } from '@/components/LanguageToggle'
import { EmailModal } from '@/components/EmailModal'
import { PDFPreview } from '@/components/PDFPreview'

// Force dynamic rendering for dashboard pages
export const dynamic = 'force-dynamic';

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  hasPdf?: boolean
}

export default function DashboardAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState(10)
  const [language, setLanguage] = useState<'tr' | 'en'>('tr')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [pendingPdfContent, setPendingPdfContent] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || tokens <= 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setTokens(prev => prev - 1)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'tr' 
          ? 'Bu, SeraGPT\'den örnek bir yanıttır. Gerçek AI entegrasyonu için lütfen bir AI servisi bağlayın. Bu raporu PDF olarak görüntülemek ister misiniz?'
          : 'This is a sample response from SeraGPT. Please connect an AI service for real AI integration. Would you like to view this report as PDF?',
        role: 'assistant',
        timestamp: new Date(),
        hasPdf: true
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handlePdfRequest = (content: string) => {
    setPendingPdfContent(content)
    setShowEmailModal(true)
  }

  const handleEmailSubmit = (email: string) => {
    console.log('Email collected:', email)
    // Here you would send to CRM
    setShowEmailModal(false)
    setShowPdfPreview(true)
  }

  const translations = {
    tr: {
      title: 'SeraGPT AI Asistan',
      subtitle: 'Yapay Zeka Destekli Sera Analizi',
      placeholder: 'Sera projeleriniz hakkında soru sorun...',
      send: 'Gönder',
      tokensLeft: 'Kalan Token',
      newChat: 'Yeni Sohbet'
    },
    en: {
      title: 'SeraGPT AI Assistant',
      subtitle: 'AI-Powered Greenhouse Analysis',
      placeholder: 'Ask questions about your greenhouse projects...',
      send: 'Send',
      tokensLeft: 'Tokens Left',
      newChat: 'New Chat'
    }
  }

  const t = translations[language]

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <TokenCounter tokens={tokens} label={t.tokensLeft} />
            <LanguageToggle 
              language={language} 
              onToggle={() => setLanguage(prev => prev === 'tr' ? 'en' : 'tr')} 
            />
            <button
              onClick={() => setMessages([])}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t.newChat}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'tr' ? 'SeraGPT AI Asistan' : 'SeraGPT AI Assistant'}
              </h3>
              <p className="text-sm mb-4">
                {language === 'tr' 
                  ? 'Sera projeleriniz ve analizleriniz hakkında sorularınızı sorun'
                  : 'Ask questions about your greenhouse projects and analyses'
                }
              </p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>🌱 "Antalya'da domates serası için iklim analizi yap"</p>
                <p>📊 "Son projelerimde ROI hesabı nasıl?"</p>
                <p>💡 "Bu sera için ekipman önerisi ver"</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onPdfRequest={handlePdfRequest}
                language={language}
              />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200">
          <ChatInput 
            onSend={handleSendMessage}
            disabled={tokens <= 0}
            placeholder={t.placeholder}
            sendText={t.send}
            language={language}
          />
        </div>

        {/* Modals */}
        <EmailModal 
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailSubmit}
          language={language}
        />

        <PDFPreview 
          isOpen={showPdfPreview}
          onClose={() => setShowPdfPreview(false)}
          content={pendingPdfContent}
          language={language}
        />
      </div>
    </DashboardLayout>
  )
}
