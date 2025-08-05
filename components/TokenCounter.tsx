interface TokenCounterProps {
  tokens: number
  label: string
}

export function TokenCounter({ tokens, label }: TokenCounterProps) {
  const getColorClass = () => {
    if (tokens <= 2) return 'text-red-600 bg-red-50 border-red-200'
    if (tokens <= 5) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getIconColor = () => {
    if (tokens <= 2) return 'text-red-500'
    if (tokens <= 5) return 'text-orange-500'
    return 'text-green-500'
  }

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getColorClass()}`}>
      <svg className={`w-4 h-4 ${getIconColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
      <span className="text-sm font-medium">
        {label}: <strong>{tokens}</strong>
      </span>
    </div>
  )
}
