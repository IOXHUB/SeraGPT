'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const router = useRouter()

  useEffect(() => {
    // Chat artık dashboard içerisinde, kullanıcıları yönlendir
    router.push('/dashboard/ai-chat')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">SeraGPT AI'ya yönlendiriliyorsunuz...</p>
        <p className="text-sm text-gray-500 mt-2">Chat artık Dashboard içerisinde</p>
      </div>
    </div>
  )
}
