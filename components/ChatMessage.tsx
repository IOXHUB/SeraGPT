'use client'

import { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  hasPdf?: boolean
}

interface ChatMessageProps {
  message: Message
  onPdfRequest: (content: string) => void
  language: 'tr' | 'en'
}

export function ChatMessage({ message, onPdfRequest, language }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (messageRef.current) {
      observer.observe(messageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const isUser = message.role === 'user'

  const pdfButtonText = language === 'tr' ? 'PDF olarak görüntüle' : 'View as PDF'

  return (
    <div
      ref={messageRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} transition-all duration-700 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
        isUser 
          ? 'bg-blue-500 text-white ml-auto' 
          : 'bg-white text-gray-800 shadow-sm border'
      }`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-600">SeraGPT</span>
          </div>
        )}
        
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {message.hasPdf && (
          <button
            onClick={() => onPdfRequest(message.content)}
            className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200 flex items-center space-x-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>{pdfButtonText}</span>
          </button>
        )}
        
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  )
}
