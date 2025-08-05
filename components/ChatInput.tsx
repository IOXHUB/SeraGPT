'use client'

import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  placeholder: string
  sendText: string
  language: 'tr' | 'en'
}

export function ChatInput({ onSend, disabled, placeholder, sendText, language }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const disabledMessage = language === 'tr' 
    ? 'Token limitiniz doldu' 
    : 'Token limit reached'

  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-4xl mx-auto">
        {disabled && (
          <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 text-center">
              {disabledMessage}
            </p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              suppressHydrationWarning
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">{sendText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
