'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ClientOnly from '@/components/ui/ClientOnly';

// Dynamic rendering for auth protection

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
  analysisData?: any;
  isAnalysisStep?: boolean;
  stepType?: 'start' | 'collecting' | 'processing' | 'completed';
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  messages: ChatMessage[];
}

interface AnalysisFlow {
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  currentStep: number;
  collectedData: any;
  isActive: boolean;
  questions: Array<{
    id: string;
    question: string;
    type: 'text' | 'number' | 'select' | 'multiselect';
    options?: string[];
    validation?: (value: any) => boolean;
    required: boolean;
  }>;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const [analysisFlow, setAnalysisFlow] = useState<AnalysisFlow | null>(null);
  const [userTokens, setUserTokens] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [favoriteMessages, setFavoriteMessages] = useState<Set<string>>(new Set());
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [replyingToMessage, setReplyingToMessage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentSummary, setCurrentSummary] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTokenCard, setSelectedTokenCard] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - Chat sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    },
    {
      id: '2',
      title: 'Yatırım Geri Dönüş (ROI) Analizi',
      lastMessage: 'Sohbet Başlatıldı...',
      date: 'Şubat Başında',
      messageCount: 0,
      messages: []
    }
  ]);

  // Analysis options
  const analysisOptions = [
    { id: 'roi', title: 'ROI Analizi', description: 'Yatırım geri dönüş hesaplaması' },
    { id: 'climate', title: 'İklim Analizi', description: 'Bölgesel iklim uygunluğu' },
    { id: 'equipment', title: 'Ekipman Listesi', description: 'Mühendis onaylı ekipmanlar' },
    { id: 'market', title: 'Pazar Analizi', description: 'Ticaret ve fiyat verileri' },
    { id: 'layout', title: 'Yerleşim Planı', description: '2D/3D sera tasarımları' },
    { id: 'reports', title: 'Raporlar��m', description: 'Önceki analizlerinizi görün' }
  ];

  // Token packages for purchase
  const tokenPackages = [
    { id: 'small', amount: 10, price: 29.99, popular: false },
    { id: 'medium', amount: 50, price: 119.99, popular: true },
    { id: 'large', amount: 100, price: 199.99, popular: false }
  ];

  // Token operations
  const tokenOperations = [
    {
      id: 'view',
      title: 'Token Görüntüle',
      description: 'Mevcut token bakiyenizi görüntüleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
        </svg>
      ),
      action: () => setSelectedTokenCard('view')
    },
    {
      id: 'purchase',
      title: 'Token Satın Al',
      description: 'Analiz için token satın alın',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
        </svg>
      ),
      action: () => setSelectedTokenCard('purchase')
    },
    {
      id: 'usage',
      title: 'Kullanım Geçmişi',
      description: 'Token kullanım raporlarınızı inceleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
        </svg>
      ),
      action: () => setSelectedTokenCard('usage')
    },
    {
      id: 'transaction',
      title: 'İşlem Geçmişi',
      description: 'Ödeme ve token alım geçmişi',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19M16.5,16.25C16.5,16.8 16.05,17.25 15.5,17.25H14.5C13.95,17.25 13.5,16.8 13.5,16.25V15.75C13.5,15.2 13.95,14.75 14.5,14.75H15.5C16.05,14.75 16.5,15.2 16.5,15.75V16.25M16.5,13.5C16.5,14.05 16.05,14.5 15.5,14.5H14.5C13.95,14.5 13.5,14.05 13.5,13.5V6.75C13.5,6.2 13.95,5.75 14.5,5.75H15.5C16.05,5.75 16.5,6.2 16.5,6.75V13.5M11,16.25C11,16.8 10.55,17.25 10,17.25H9C8.45,17.25 8,16.8 8,16.25V15.75C8,15.2 8.45,14.75 9,14.75H10C10.55,14.75 11,15.2 11,15.75V16.25M11,13.5C11,14.05 10.55,14.5 10,14.5H9C8.45,14.5 8,14.05 8,13.5V6.75C8,6.2 8.45,5.75 9,5.75H10C10.55,5.75 11,6.2 11,6.75V13.5Z"/>
        </svg>
      ),
      action: () => setSelectedTokenCard('transaction')
    }
  ];

  // User operations
  const userOperations = [
    {
      id: 'profile',
      title: 'Profil Bilgileri',
      description: 'Kişisel bilgilerinizi görüntüleyin ve düzenleyin',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
        </svg>
      )
    },
    {
      id: 'security',
      title: 'Güvenlik Ayarları',
      description: 'Şifre değiştirme ve güvenlik seçenekleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    },
    {
      id: 'preferences',
      title: 'Tercihler',
      description: 'Uygulama ayarları ve bildirim tercihleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
        </svg>
      )
    },
    {
      id: 'logout',
      title: 'Çıkış Yap',
      description: 'Hesabınızdan güvenli çıkış yapın',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
        </svg>
      )
    }
  ];

  // Settings categories
  const settingsCategories = [
    {
      id: 'account',
      title: 'Hesap Ayarları',
      description: 'Kişisel bilgiler ve hesap yönetimi',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
        </svg>
      )
    },
    {
      id: 'notifications',
      title: 'Bildirim Ayarları',
      description: 'E-posta ve uygulama bildirimleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
        </svg>
      )
    },
    {
      id: 'privacy',
      title: 'Gizlilik ve Güvenlik',
      description: 'Veri kontrolü ve güvenlik seçenekleri',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    },
    {
      id: 'preferences',
      title: 'Uygulama Tercihleri',
      description: 'Dil, tema ve görünüm ayarları',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
        </svg>
      )
    }
  ];

  // Analysis categories and data
  const analysisCategories = [
    {
      id: 'recent',
      title: 'Son Analizler',
      description: 'En yakın zamanda yapılan analizler',
      count: 8
    },
    {
      id: 'roi',
      title: 'ROI Analizleri',
      description: 'Yatırım geri dönüş hesaplamaları',
      count: 5
    },
    {
      id: 'climate',
      title: 'İklim Analizleri',
      description: 'Bölgesel iklim uygunluk raporları',
      count: 3
    },
    {
      id: 'equipment',
      title: 'Ekipman Analizleri',
      description: 'Sera ekipman listesi ve önerileri',
      count: 4
    },
    {
      id: 'market',
      title: 'Pazar Analizleri',
      description: 'Ticaret ve fiyat analiz raporları',
      count: 2
    },
    {
      id: 'layout',
      title: 'Yerleşim Planları',
      description: '2D/3D sera tasarım projeleri',
      count: 6
    }
  ];

  const mockAnalyses = [
    {
      id: '1',
      title: 'Domates Serası ROI Analizi',
      type: 'roi',
      date: '15 Ocak 2025',
      status: 'Tamamlandı',
      result: 'Pozitif (%23 geri dönüş)'
    },
    {
      id: '2',
      title: 'Antalya İklim Uygunluk Raporu',
      type: 'climate',
      date: '14 Ocak 2025',
      status: 'Tamamlandı',
      result: 'Çok Uygun'
    },
    {
      id: '3',
      title: '500m² Sera Ekipman Listesi',
      type: 'equipment',
      date: '13 Ocak 2025',
      status: 'Tamamlandı',
      result: '₺145,000 toplam maliyet'
    },
    {
      id: '4',
      title: 'Salatalık Pazar Analizi',
      type: 'market',
      date: '12 Ocak 2025',
      status: 'İşleniyor',
      result: 'Beklemede'
    },
    {
      id: '5',
      title: 'Modern Sera Yerleşim Planı',
      type: 'layout',
      date: '11 Ocak 2025',
      status: 'Tamamlandı',
      result: '3D Model Hazır'
    }
  ];

  // Dashboard menu items - Direct links to working pages
  const dashboardMenuItems = [
    { id: 'tokens', title: 'Token İşlemleri', href: '/dashboard/tokens' },
    { id: 'analysis', title: 'Tüm Analizler', href: '/dashboard/analysis' },
    { id: 'reports', title: 'Raporlarım', href: '/dashboard/reports' },
    { id: 'settings', title: 'Hesap Ayarları', href: '/dashboard/settings' },
    { id: 'ai-chat', title: 'AI Chat', href: '/dashboard/ai-chat' },
    { id: 'projects', title: 'Projelerim', href: '/dashboard/projects' },
    { id: 'help', title: 'Yardım', href: '/dashboard/help' },
    { id: 'consulting', title: 'Danışmanlık', href: '/dashboard/consulting' },
    { id: 'support', title: 'Destek', href: '/destek' },
    { id: 'homepage', title: 'Anasayfaya Çıkış', href: '/' }
  ];

  // Token purchase handler
  const handleTokenPurchase = (packageId: string) => {
    const selectedPackage = tokenPackages.find(p => p.id === packageId);
    if (selectedPackage) {
      // Redirect to iyzico payment with package details
      const iyzicoPay = `/api/payment/iyzico?tokens=${selectedPackage.amount}&price=${selectedPackage.price}`;
      window.location.href = iyzicoPay;
    }
  };

  // Helper functions for new features
  const toggleFavorite = (messageId: string) => {
    setFavoriteMessages(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(messageId)) {
        newFavorites.delete(messageId);
      } else {
        newFavorites.add(messageId);
      }
      return newFavorites;
    });
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.role === 'user' ? 'Kullanıcı' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sohbet-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const startEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditValue(content);
  };

  const saveEditMessage = () => {
    if (editingMessageId && editValue.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, content: editValue, timestamp: new Date() }
          : msg
      ));
      setEditingMessageId(null);
      setEditValue('');
    }
  };

  const renderMessageContent = (content: string) => {
    // Basic markdown support for code blocks
    if (content.includes('```')) {
      const parts = content.split('```');
      return (
        <div>
          {parts.map((part, i) => 
            i % 2 === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <pre key={i} className="bg-black/25 border border-white/10 rounded p-2 my-2 overflow-auto">
                <code className="text-green-300">{part}</code>
              </pre>
            )
          )}
        </div>
      );
    }
    
    // Basic table support
    if (content.includes('|')) {
      const lines = content.split('\n');
      const tableLines = lines.filter(line => line.includes('|'));
      if (tableLines.length > 1) {
        return (
          <div>
            {lines.map((line, i) => {
              if (line.includes('|')) {
                const cells = line.split('|').filter(cell => cell.trim());
                return (
                  <div key={i} className="flex border-b border-white/10">
                    {cells.map((cell, j) => (
                      <div key={j} className="flex-1 p-2 border-r border-white/10 last:border-r-0">
                        {cell.trim()}
                      </div>
                    ))}
                  </div>
                );
              }
              return <div key={i}>{line}</div>;
            })}
          </div>
        );
      }
    }
    
    return <div className="whitespace-pre-wrap">{content}</div>;
  };

  // Voice recording functions
  const handleVoiceRecord = async () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      // Simulate voice recording
      setTimeout(() => {
        setIsRecordingVoice(false);
        setInputValue(prev => prev + " [Sesli mesaj metni]");
      }, 3000);
    } else {
      setIsRecordingVoice(false);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Add file info to chat
    files.forEach(file => {
      const fileMessage: ChatMessage = {
        id: Date.now().toString() + Math.random(),
        role: 'user',
        content: `📎 Dosya yüklendi: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        timestamp: new Date(),
        attachments: [file]
      };
      setMessages(prev => [...prev, fileMessage]);
    });
  };

  // Text-to-speech function
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // Generate summary
  const generateSummary = () => {
    const summary = `📋 Sohbet Özeti:
• Toplam ${messages.length} mesaj
• ${favoriteMessages.size} favorili mesaj
• Başlangıç: ${messages[0]?.timestamp.toLocaleString() || 'Bilinmiyor'}
• Son: ${messages[messages.length-1]?.timestamp.toLocaleString() || 'Bilinmiyor'}

🎯 Ana Konular: ${messages.filter(m => m.role === 'user').slice(0, 3).map(m => m.content.substring(0, 50)).join(', ')}...`;
    
    setCurrentSummary(summary);
    
    const summaryMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: summary,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, summaryMessage]);
  };

  const filteredMessages = searchQuery.trim() 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: 'Yeni Sohbet',
      lastMessage: 'Sohbet başlatıldı...',
      date: new Date().toLocaleDateString('tr-TR'),
      messageCount: 0,
      messages: []
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chatSessions.find(c => c.id === chatId);
    setMessages(chat?.messages || []);
  };

  const handleAnalysisClick = (optionId: string) => {
    const option = analysisOptions.find(opt => opt.id === optionId);
    if (option && option.id !== 'reports') {
      handleNewChat();
    } else if (option?.id === 'reports') {
      // Open reports modal instead of navigation
      console.log('Open reports modal');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update current chat session
    if (currentChatId) {
      setChatSessions(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, lastMessage: inputValue.substring(0, 50) + '...', messageCount: chat.messageCount + 1 }
          : chat
      ));
    } else {
      handleNewChat();
    }
    
    setInputValue('');
    setIsTyping(true);

    // Simple AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Merhaba! "${inputValue}" konusunda size yardımcı olmaktan mutluluk duyarım. Bu konu hakkında detaylı bilgi verebilir ve size özel öneriler geliştirebilirim.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Track window size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      // Sidebar always open on desktop, controlled by user on mobile
      if (desktop) {
        setSidebarOpen(true);
      }
    };

    // Set initial value
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard - redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('🚫 Dashboard access denied - redirecting to login');
      window.location.href = '/auth/login';
    }
  }, [user, loading, mounted]);

  // Prevent access in incognito/unauthorized state
  if (!loading && !user) {
    window.location.href = '/auth/login';
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">Yönlendiriliyor...</div>
      </div>
    );
  }

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">🔐 Authentication kontrolü...</div>
      </div>
    );
  }

  // Show login message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#146448' }}>
        <div className="text-white text-lg">Giriş yapmanız gerekiyor...</div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="flex h-screen bg-[#146448] overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className={`lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-40 flex flex-col w-64 bg-[#146448] border-r border-white/10 h-full ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Üst logo alanı */}
          <div className="h-16 flex items-center px-4 border-b border-white/10">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F9f4710c59a39492e92e469b69a3b57a3?format=webp&width=800" 
              className="h-8" 
              alt="SeraGPT Logo" 
            />
          </div>
          
          {/* Menü listesi */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <div>
              <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 px-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                </svg>
                ANALİZLER
              </h3>
              <div className="space-y-1">
                {chatSessions.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full p-2 rounded-lg text-left transition-colors text-sm ${
                      currentChatId === chat.id
                        ? 'bg-[#baf200]/20 text-[#baf200]'
                        : 'text-[#f6f8f9]/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-xs opacity-60 truncate">{chat.lastMessage}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-[#f6f8f9]/70 mb-3 px-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                </svg>
                SOHBETLER
              </h3>
              <div className="px-2">
                {chatSessions.filter(chat => chat.messageCount > 0).length > 0 ? (
                  chatSessions.filter(chat => chat.messageCount > 0).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className="w-full p-2 rounded-lg text-left transition-colors text-sm text-[#f6f8f9]/80 hover:bg-white/10"
                    >
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs opacity-60 truncate">{chat.lastMessage}</div>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-[#f6f8f9]/40">Henüz sohbet geçmişi yok</p>
                )}
              </div>
            </div>
          </nav>
          
          {/* Alt menü - Ayarlar */}
          <div className="p-4 border-t border-white/10 mb-5">
            <button 
              className="w-full bg-[#baf200] border-l-4 border-[#baf200] rounded-lg p-3 hover:bg-[#baf200]/80 transition-colors relative"
              onClick={() => setMenuPopupOpen(!menuPopupOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="text-sm font-medium text-black">Ayarlar</span>
                </div>
              </div>
              
              {/* Settings Menu Popup */}
              {menuPopupOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Dashboard Menü</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuPopupOpen(false);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="py-2 max-h-80 overflow-y-auto">
                    {dashboardMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.modal) {
                            setActiveModal(item.id);
                          } else if (item.href) {
                            window.location.href = item.href;
                          }
                          setMenuPopupOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* HEADER */}
          <header className="h-16 flex items-center justify-between px-4 border-b border-white/10 bg-[#146448]">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden text-white hover:bg-white/10 rounded-lg flex items-center justify-center"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ width: '24px', height: '24px', padding: '0' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <h1 className="text-white font-semibold text-lg" style={{ lineHeight: '24px', margin: '0' }}>AI Dashboard</h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                <span className="opacity-70">Hoşgeldin, </span>
                <span className="font-medium">{user?.email || 'Kullanıcı'}</span>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.href = '/auth/login';
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Çıkış
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 bg-[#146448]" style={{paddingBottom: '160px'}}>
            {!currentChatId && messages.length === 0 ? (
              // Welcome State
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] py-8 mx-auto w-full max-w-[900px] px-4">
                <div className="max-w-2xl mx-auto mb-8">
                  <h1 className="text-[#f6f8f9] mb-6 text-center" style={{ fontSize: '36px', fontWeight: '600' }}>
                    Hoşgeldiniz
                  </h1>
                  <div className="mb-8 text-center">
                    <p className="text-[#f6f8f9]/90 mb-4 text-base md:text-lg text-center">
                      Aşağıdan Analiz Başlatabilirsiniz yada menüden düzenlemek istediğiniz geçmiş analizlerinden birini seçin.
                    </p>
                    <p className="text-[#baf200] font-medium text-sm md:text-base text-center">
                      Tam havamdayım, çalışal��m. Ya siz?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md md:max-w-lg w-full">
                  {analysisOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnalysisClick(option.id)}
                      className="h-20 md:h-24 p-3 bg-white/95 hover:bg-white rounded-lg text-center transition-all hover:scale-105 group flex flex-col justify-center items-center border border-[#baf200]/20 hover:border-[#baf200]/40 shadow-sm"
                    >
                      <h3 className="font-semibold text-[#1e3237] mb-1 group-hover:text-[#146448] transition-colors text-xs md:text-sm lg:text-base">
                        {option.title}
                      </h3>
                      <p className="text-[#1e3237]/70 leading-tight text-xs">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* Chat Controls */}
                <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                        title="Arama"
                      >
                        🔍 Ara
                      </button>
                      <button
                        onClick={exportChat}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                        title="Dışa Aktar"
                      >
                        💾 Dışa Aktar
                      </button>
                      <button
                        onClick={handleNewChat}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                        title="Yeni Sohbet"
                      >
                        ➕ Yeni Sohbet
                      </button>
                    </div>
                    <div className="text-xs text-white/60">
                      {messages.length} mesaj ��� {favoriteMessages.size} favorili
                    </div>
                  </div>
                  
                  {showSearch && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Mesajlarda ara..."
                        className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 text-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                    >
                      <div className={`max-w-[70%] p-3 rounded-lg relative ${
                        message.role === 'user'
                          ? 'bg-[#baf200] text-[#146448]'
                          : 'bg-white/10 text-[#f6f8f9]'
                      }`}>
                        {editingMessageId === message.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full p-2 bg-white/10 border border-white/20 rounded text-white resize-none"
                              rows={3}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={saveEditMessage}
                                className="px-3 py-1 bg-green-500/30 rounded text-xs"
                              >
                                Kaydet
                              </button>
                              <button
                                onClick={() => setEditingMessageId(null)}
                                className="px-3 py-1 bg-gray-500/30 rounded text-xs"
                              >
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          renderMessageContent(message.content)
                        )}

                        {/* Message Actions */}
                        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1 mt-2 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <button
                            onClick={() => navigator.clipboard.writeText(message.content)}
                            className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                            title="Kopyala"
                          >
                            ⎘
                          </button>
                          <button
                            onClick={() => toggleFavorite(message.id)}
                            className={`p-1.5 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs ${
                              favoriteMessages.has(message.id) ? 'bg-yellow-500/30' : 'bg-white/10'
                            }`}
                            title="Favorilere Ekle"
                          >
                            ⭐
                          </button>
                          {message.role === 'user' && (
                            <button
                              onClick={() => startEditMessage(message.id, message.content)}
                              className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                              title="Düzenle"
                            >
                              ✏
                            </button>
                          )}
                          <button
                            className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                            title="Alıntıla"
                          >
                            ❝
                          </button>
                          {message.role === 'assistant' && (
                            <button
                              className="p-1.5 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors text-xs"
                              title="Paylaş"
                            >
                              ⤴
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setMessages(prev => prev.filter(m => m.id !== message.id));
                            }}
                            className="p-1.5 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors text-xs"
                            title="Sil"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 text-[#f6f8f9] p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[#baf200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </main>

          {/* FOOTER (chat input) - Fixed within main area */}
          <footer className="fixed bottom-0 z-30 bg-[#146448] border-t border-white/10 p-4 left-0 lg:left-64 right-0 transition-all duration-300">
            <div className="max-w-4xl mx-auto">
              {/* Input Area */}
              <div className="mb-2">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      // Auto-resize with max 4 lines
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = 'auto';
                      const maxHeight = 24 * 4; // 4 lines × 24px line height
                      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                      textarea.style.height = newHeight + 'px';
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="SeraGPT'ye bir mesaj yazın..."
                    className="w-full p-3 pl-16 pr-12 bg-white/95 border border-[#baf200]/30 rounded-lg resize-none focus:ring-2 focus:ring-[#baf200] focus:border-[#baf200] placeholder-[#1e3237]/50 text-[#1e3237] overflow-hidden"
                    rows={1}
                    style={{
                      minHeight: '48px',
                      maxHeight: '96px', // 4 lines
                      lineHeight: '24px'
                    }}
                  />

                  {/* Input Icons */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <button
                      className="p-1 text-[#146448] hover:text-[#146448]/70 transition-colors"
                      title="Dosya Ekle"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button
                      className={`p-1 transition-colors ${isRecordingVoice ? 'text-red-500 animate-pulse' : 'text-[#146448] hover:text-[#146448]/70'}`}
                      title="Sesli Mesaj"
                      onClick={handleVoiceRecord}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2a1 1 0 012 0v2a5 5 0 0010 0v-2a1 1 0 012 0z"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#baf200] hover:bg-[#baf200]/80 text-[#1e3237] rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </footer>
        </div>

        {/* MODAL SYSTEM */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
              style={{ backgroundColor: '#f6f8f9' }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#146448]/20">
                <h2 className="text-2xl font-semibold" style={{ color: '#1e3237' }}>
                  {activeModal === 'tokens' && 'Token İşlemleri'}
                  {activeModal === 'user' && 'Kullanıcı İşlemleri'}
                  {activeModal === 'settings' && 'Hesap Ayarları'}
                  {activeModal === 'analysis' && 'Tüm Analizler'}
                  {activeModal === 'ai-assistant' && 'AI Asistan İşlemleri'}
                </h2>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setSelectedTokenCard(null);
                  }}
                  className="p-2 hover:bg-[#146448]/10 rounded-lg transition-colors"
                  style={{ color: '#1e3237' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {activeModal === 'tokens' && (
                  <div>
                    {!selectedTokenCard ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tokenOperations.map((operation) => (
                          <button
                            key={operation.id}
                            onClick={operation.action}
                            className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
                            style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
                          >
                            <div
                              className="flex flex-col items-center text-center rounded-lg p-4"
                              style={{ backgroundColor: '#baf200' }}
                            >
                              <div className="transition-colors mb-2" style={{ color: '#1e3237' }}>
                                {operation.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-medium mb-1" style={{ color: '#1e3237' }}>
                                  {operation.title}
                                </h3>
                                <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                  {operation.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="max-w-md mx-auto">
                        <div className="flex items-center mb-6">
                          <button
                            onClick={() => setSelectedTokenCard(null)}
                            className="mr-4 p-2 hover:bg-[#146448]/10 rounded-lg transition-colors"
                            style={{ color: '#1e3237' }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                          </button>
                          <h3 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                            {selectedTokenCard === 'view' && 'Token Bakiyesi'}
                            {selectedTokenCard === 'purchase' && 'Token Satın Al'}
                            {selectedTokenCard === 'usage' && 'Kullanım Geçmişi'}
                            {selectedTokenCard === 'transaction' && 'İşlem Geçmişi'}
                          </h3>
                        </div>

                        {/* Token Balance View */}
                        {selectedTokenCard === 'view' && (
                          <div className="text-center">
                            <div className="mb-6">
                              <div className="text-5xl font-bold mb-2" style={{ color: '#146448' }}>
                                {userTokens}
                              </div>
                              <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                Kalan Token Sayısı
                              </p>
                            </div>
                            <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#146448' }}>
                              <p className="text-sm" style={{ color: '#f6f8f9' }}>
                                Her analiz 1 token harcar. Daha fazla analiz için token satın alabilirsiniz.
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedTokenCard('purchase')}
                              className="w-full py-3 px-4 rounded-lg font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                            >
                              Token Satın Al
                            </button>
                          </div>
                        )}

                        {/* Token Purchase */}
                        {selectedTokenCard === 'purchase' && (
                          <div>
                            <div className="space-y-4">
                              {tokenPackages.map((pkg) => (
                                <div
                                  key={pkg.id}
                                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                                    pkg.popular ? 'border-opacity-100' : 'border-opacity-30 hover:border-opacity-60'
                                  }`}
                                  style={{ borderColor: '#146448' }}
                                  onClick={() => handleTokenPurchase(pkg.id)}
                                >
                                  {pkg.popular && (
                                    <div
                                      className="text-xs font-medium mb-2 text-center px-2 py-1 rounded-full"
                                      style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                                    >
                                      EN POPÜLER
                                    </div>
                                  )}
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="text-lg font-bold" style={{ color: '#1e3237' }}>
                                        {pkg.amount} Token
                                      </div>
                                      <div className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                        {pkg.amount} Analiz
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold" style={{ color: '#146448' }}>
                                        ₺{pkg.price}
                                      </div>
                                      <div className="text-xs opacity-70" style={{ color: '#1e3237' }}>
                                        ₺{(pkg.price / pkg.amount).toFixed(2)}/token
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                              <p className="text-xs text-center" style={{ color: '#f6f8f9' }}>
                                Güvenli ödeme için iyzico kullanılır. Kartınızdan ücret çekilir ve tokenlarınız hesabınıza yüklenir.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Usage History */}
                        {selectedTokenCard === 'usage' && (
                          <div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                                <div>
                                  <p className="font-medium" style={{ color: '#f6f8f9' }}>ROI Analizi</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>15 Ocak 2025, 14:30</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium" style={{ color: '#baf200' }}>-1 Token</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                                <div>
                                  <p className="font-medium" style={{ color: '#f6f8f9' }}>İklim Analizi</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>14 Ocak 2025, 09:15</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium" style={{ color: '#baf200' }}>-1 Token</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                                <div>
                                  <p className="font-medium" style={{ color: '#f6f8f9' }}>Ekipman Analizi</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>13 Ocak 2025, 16:45</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium" style={{ color: '#baf200' }}>-1 Token</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 text-center">
                              <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                Son 30 gün içinde 3 token kullandınız
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Transaction History */}
                        {selectedTokenCard === 'transaction' && (
                          <div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                                <div>
                                  <p className="font-medium" style={{ color: '#f6f8f9' }}>Token Satın Alma</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>10 Ocak 2025, 12:00</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium" style={{ color: '#baf200' }}>+50 Token</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>₺119.99</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#146448' }}>
                                <div>
                                  <p className="font-medium" style={{ color: '#f6f8f9' }}>Token Satın Alma</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>25 Aralık 2024, 15:30</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium" style={{ color: '#baf200' }}>+10 Token</p>
                                  <p className="text-xs opacity-80" style={{ color: '#f6f8f9' }}>₺29.99</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 text-center">
                              <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                Toplam ₺149.98 harcadınız
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeModal === 'user' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {userOperations.map((operation) => (
                        <button
                          key={operation.id}
                          className={`rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border ${
                            operation.id === 'logout'
                              ? 'border-red-300 hover:border-red-400'
                              : 'border-[#146448] hover:shadow-md'
                          }`}
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <div
                            className={`flex flex-col items-center text-center rounded-lg p-4 ${
                              operation.id === 'logout' ? 'bg-red-100' : ''
                            }`}
                            style={{ backgroundColor: operation.id === 'logout' ? '#fee2e2' : '#baf200' }}
                          >
                            <div
                              className="transition-colors mb-3"
                              style={{ color: operation.id === 'logout' ? '#dc2626' : '#1e3237' }}
                            >
                              {operation.icon}
                            </div>
                            <div>
                              <h3
                                className="text-lg font-medium mb-2"
                                style={{ color: operation.id === 'logout' ? '#dc2626' : '#1e3237' }}
                              >
                                {operation.title}
                              </h3>
                              <p
                                className="text-sm opacity-70"
                                style={{ color: operation.id === 'logout' ? '#dc2626' : '#1e3237' }}
                              >
                                {operation.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* User Info Card */}
                    <div className="rounded-lg p-6 border" style={{ backgroundColor: '#146448', borderColor: '#146448' }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: '#f6f8f9' }}>
                        Hesap Bilgileri
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Ad Soyad</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>{user?.name || 'Volkan Şimşirkaya'}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>E-posta</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>{user?.email || 'volkan@seragpt.com'}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Hesap Türü</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>Premium Kullanıcı</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Kayıt Tarihi</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>25 Aralık 2024</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Token Bakiyesi</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>{userTokens} Token</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Son Giriş</p>
                          <p className="font-medium" style={{ color: '#baf200' }}>Bugün, 14:30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'settings' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {settingsCategories.map((category) => (
                        <button
                          key={category.id}
                          className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border border-[#146448] hover:shadow-md"
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <div
                            className="flex flex-col items-center text-center rounded-lg p-4"
                            style={{ backgroundColor: '#baf200' }}
                          >
                            <div className="transition-colors mb-3" style={{ color: '#1e3237' }}>
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium mb-2" style={{ color: '#1e3237' }}>
                                {category.title}
                              </h3>
                              <p className="text-sm opacity-70" style={{ color: '#1e3237' }}>
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Quick Settings */}
                    <div className="space-y-6">
                      <div className="rounded-lg p-6 border" style={{ backgroundColor: '#146448', borderColor: '#146448' }}>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: '#f6f8f9' }}>
                          Hızlı Ayarlar
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{ color: '#f6f8f9' }}>E-posta Bildirimleri</p>
                              <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Yeni analiz sonuçları için bildirim al</p>
                            </div>
                            <button
                              className="w-12 h-6 rounded-full relative focus:outline-none transition-colors"
                              style={{ backgroundColor: '#baf200' }}
                            >
                              <div
                                className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform transform translate-x-6"
                                style={{ backgroundColor: '#1e3237' }}
                              ></div>
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{ color: '#f6f8f9' }}>Otomatik Kaydetme</p>
                              <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Analizleri otomatik olarak kaydet</p>
                            </div>
                            <button
                              className="w-12 h-6 rounded-full relative focus:outline-none transition-colors"
                              style={{ backgroundColor: '#baf200' }}
                            >
                              <div
                                className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform transform translate-x-6"
                                style={{ backgroundColor: '#1e3237' }}
                              ></div>
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{ color: '#f6f8f9' }}>Karanlık Mod</p>
                              <p className="text-sm opacity-80" style={{ color: '#f6f8f9' }}>Gece kullanımı için karanlık tema</p>
                            </div>
                            <button
                              className="w-12 h-6 rounded-full relative focus:outline-none transition-colors bg-gray-300"
                            >
                              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Account Actions */}
                      <div className="rounded-lg p-6 border" style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3237' }}>
                          Hesap İşlemleri
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            className="p-3 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                          >
                            Şifre Değiştir
                          </button>
                          <button
                            className="p-3 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                          >
                            Verileri Dışa Aktar
                          </button>
                          <button className="p-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-all">
                            Hesabı Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'analysis' && (
                  <div>
                    {/* Analysis Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {analysisCategories.map((category) => (
                        <button
                          key={category.id}
                          className="rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-center group border border-[#146448] hover:shadow-md"
                          style={{ backgroundColor: '#f6f8f9' }}
                        >
                          <div
                            className="rounded-lg p-3 mb-3"
                            style={{ backgroundColor: '#baf200' }}
                          >
                            <div className="text-2xl font-bold" style={{ color: '#1e3237' }}>
                              {category.count}
                            </div>
                          </div>
                          <h3 className="font-medium mb-1" style={{ color: '#1e3237' }}>
                            {category.title}
                          </h3>
                          <p className="text-xs opacity-70" style={{ color: '#1e3237' }}>
                            {category.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Recent Analyses */}
                    <div className="rounded-lg p-6 border" style={{ backgroundColor: '#146448', borderColor: '#146448' }}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold" style={{ color: '#f6f8f9' }}>
                          Son Analizler
                        </h3>
                        <button
                          className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                        >
                          Tümünü Görüntüle
                        </button>
                      </div>

                      <div className="space-y-4">
                        {mockAnalyses.map((analysis) => (
                          <div
                            key={analysis.id}
                            className="rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                            style={{ backgroundColor: '#f6f8f9' }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-1" style={{ color: '#1e3237' }}>
                                  {analysis.title}
                                </h4>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="opacity-70" style={{ color: '#1e3237' }}>
                                    {analysis.date}
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      analysis.status === 'Tamamlandı'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                  >
                                    {analysis.status}
                                  </span>
                                  <span className="font-medium" style={{ color: '#146448' }}>
                                    {analysis.result}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                                  title="Görüntüle"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                                  </svg>
                                </button>
                                <button
                                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                                  title="İndir"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        className="p-4 rounded-lg font-medium transition-all hover:opacity-90 flex items-center justify-center space-x-2"
                        style={{ backgroundColor: '#baf200', color: '#1e3237' }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                        </svg>
                        <span>Yeni Analiz Başlat</span>
                      </button>
                      <button
                        className="p-4 rounded-lg font-medium transition-all hover:opacity-90 flex items-center justify-center space-x-2"
                        style={{ backgroundColor: '#146448', color: '#f6f8f9' }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                        <span>Tüm Raporları Dışa Aktar</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeModal === 'ai-assistant' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e3237' }}>
                      AI Asistan İşlemleri
                    </h3>
                    <p className="opacity-70" style={{ color: '#1e3237' }}>
                      Bu modal yakında kullanıma açılacak
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
