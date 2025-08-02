export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SeraGPT
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered chat application
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-700">
            Your AI assistant is ready to help. Start a conversation!
          </p>
        </div>
      </div>
    </main>
  )
}
