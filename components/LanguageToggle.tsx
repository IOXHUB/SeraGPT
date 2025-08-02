interface LanguageToggleProps {
  language: 'tr' | 'en'
  onToggle: () => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 bg-white"
    >
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="text-sm font-medium text-gray-700">
        {language.toUpperCase()}
      </span>
      <div className="flex space-x-1">
        <div className={`w-2 h-2 rounded-full ${language === 'tr' ? 'bg-blue-500' : 'bg-gray-300'}`} />
        <div className={`w-2 h-2 rounded-full ${language === 'en' ? 'bg-blue-500' : 'bg-gray-300'}`} />
      </div>
    </button>
  )
}
