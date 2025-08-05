'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { aiService, ChatMessage, ChatSession, AIAnalysisInsight } from '@/lib/services/ai-service';

export default function AIChatPage() {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<AIAnalysisInsight[]>([]);
  const [error, setError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    const session = aiService.createChatSession('user_123', 'SeraGPT AI Sohbet');
    
    // Add welcome message
    const welcomeMessage = aiService.createMessage(
      'assistant',
      'Merhaba! Ben SeraGPT AI asistanınızım. Yaptığınız sera analizleri hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?'
    );
    
    const sessionWithWelcome = aiService.addMessageToSession(session, welcomeMessage);
    setChatSession(sessionWithWelcome);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isTyping) return;

    setError('');
    const userMessage = aiService.createMessage('user', inputValue);
    
    // Add user message to session
    let updatedSession = aiService.addMessageToSession(chatSession, userMessage);
    setChatSession(updatedSession);
    
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Get context from mock previous analyses
      const context = {
        previousAnalyses: [
          {
            type: 'roi',
            summary: { roi: 18.5, paybackPeriod: 4.2, npv: 125000 }
          },
          {
            type: 'climate',
            summary: { riskScore: 28, suitableSeasons: ['spring', 'summer'] }
          }
        ]
      };

      // Send message to AI service
      const response = await aiService.sendMessage(
        currentInput,
        chatSession.id,
        context
      );

      if (response.success && response.data) {
        // Add AI response to session
        const aiMessage = aiService.createMessage('assistant', response.data.response);
        updatedSession = aiService.addMessageToSession(updatedSession, aiMessage);
        setChatSession(updatedSession);
        
        // Set insights
        if (response.data.insights) {
          setInsights(response.data.insights);
        }
      } else {
        setError(response.error || 'AI yanıtı alınamadı');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'ROI analizim nasıl yorumlanır?',
    'İklim verilerim sera için uygun mu?',
    'Pazar fiyatları hangi yönde?',
    'Hangi ekipmanları tercih etmeliyim?',
    'Maliyet optimizasyonu için öneriler?'
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return '💡';
      case 'warning': return '⚠️';
      case 'opportunity': return '🚀';
      case 'insight': return '🔍';
      default: return '💡';
    }
  };

  const getInsightColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (!chatSession) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">AI sohbet başlatılıyor...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        <div className="max-w-4xl mx-auto h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 p-6 border-b border-gray-200 bg-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SeraGPT AI Asistan</h1>
                <p className="text-sm text-gray-600">Sera analizlerinizi yorumluyorum ve öneriler sunuyorum</p>
              </div>
            </div>
          </motion.div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-hidden flex">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatSession.messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gray-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {chatSession.messages.length <= 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Hızlı sorular:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="px-6 py-2">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Sera analizleriniz hakkında soru sorun..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                      rows={1}
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="flex-shrink-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTyping ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                    ) : (
                      'Gönder'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Insights Sidebar */}
            {insights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-80 border-l border-gray-200 bg-white p-6 overflow-y-auto"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Önerileri</h3>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${getInsightColor(insight.priority)}`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-lg">{getInsightIcon(insight.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                              insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {insight.priority === 'high' ? 'Yüksek' : 
                               insight.priority === 'medium' ? 'Orta' : 'Düşük'} Öncelik
                            </span>
                            {insight.actionable && (
                              <span className="text-xs text-blue-600">Uygulanabilir</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
