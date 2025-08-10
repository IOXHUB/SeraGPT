'use client'

import { useState } from 'react'

interface PDFPreviewProps {
  isOpen: boolean
  onClose: () => void
  content: string
  language: 'tr' | 'en'
}

export function PDFPreview({ isOpen, onClose, content, language }: PDFPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const translations = {
    tr: {
      title: 'Rapor Önizlemesi',
      download: 'PDF İndir',
      close: 'Kapat',
      generating: 'PDF Oluşturuluyor...',
      viewMode: 'Önizleme Modu'
    },
    en: {
      title: 'Report Preview',
      download: 'Download PDF',
      close: 'Close',
      generating: 'Generating PDF...',
      viewMode: 'Preview Mode'
    }
  }

  const t = translations[language]

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create a simple PDF-like document (in real implementation, use jsPDF or similar)
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `seragpt-report-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    setIsDownloading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
              <p className="text-sm text-gray-500">{t.viewMode}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.generating}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{t.download}</span>
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-gray-50 rounded-lg p-8 min-h-full">
            {/* PDF-like styling */}
            <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">SeraGPT Raporu</h1>
                <p className="text-gray-600">
                  {language === 'tr' ? '16 Ocak 2024' : 'January 16, 2024'}
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {language === 'tr' ? 'Rapor İçeriği' : 'Report Content'}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  {language === 'tr' 
                    ? 'Bu rapor SeraGPT tarafından oluşturulmuştur.'
                    : 'This report was generated by SeraGPT.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
