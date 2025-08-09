'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SeraGPTLogo from '@/components/ui/SeraGPTLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

interface MenuItem {
  name: string;
  href: string;
  icon: string;
  category?: string;
  badge?: string;
  submenu?: MenuItem[];
}

interface SubMenuState {
  [key: string]: boolean;
}

interface SubMenuItem {
  name: string;
  href: string;
  icon: string;
  prompt?: string;
  submenu?: SubMenuItem[];
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<SubMenuState>({});
  const [expandedSubMenus, setExpandedSubMenus] = useState<SubMenuState>({});
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: 'Anasayfa', href: '/dashboard', icon: '', category: 'Menu' },
    {
      name: 'AI Asistan',
      href: '/dashboard/ai-chat',
      icon: '',
      category: 'Menu',
      badge: 'AI',
      submenu: [
        {
          name: 'Raporlarım',
          href: '/dashboard/ai-chat',
          icon: '📊',
          category: 'AI',
          submenu: [
            { name: 'Antalya Domates ROI Analizi', href: '/dashboard/ai-chat?report=demo-roi-001&prompt=roi_report', icon: '💰', prompt: 'Bu ROI analiz raporundaki finansal projeksiyonları nasıl optimize edebilirim?' },
            { name: 'İzmir İklim Uygunluk Analizi', href: '/dashboard/ai-chat?report=demo-climate-001&prompt=climate_report', icon: '🌡️', prompt: 'İklim raporum temelinde hangi dönemlerde en yüksek verimlilik elde edebilirim?' },
            { name: 'Hidroponik Sistem Ekipmanları', href: '/dashboard/ai-chat?report=demo-equipment-001&prompt=equipment_report', icon: '⚙️', prompt: 'Ekipman listesindeki maliyetleri nasıl optimize edebilirim?' },
            { name: 'Salatalık Pazar Analizi', href: '/dashboard/ai-chat?report=demo-market-001&prompt=market_report', icon: '📈', prompt: 'Pazar analizi sonuçlarına göre hangi stratejilerle daha yüksek kar elde edebilirim?' },
            { name: 'Modern Sera Layout Planı', href: '/dashboard/ai-chat?report=demo-layout-001&prompt=layout_report', icon: '📐', prompt: 'Layout planımda verimlilik nasıl artırılabilir?' }
          ]
        },
        {
          name: 'Öneriler',
          href: '/dashboard/ai-chat',
          icon: '💡',
          category: 'AI',
          submenu: [
            { name: 'Maliyet Optimizasyonu', href: '/dashboard/ai-chat?prompt=cost_optimization', icon: '💰', prompt: 'Sera işletmemde maliyet tasarrufu ve optimizasyon konularında önerilerinizi almak istiyorum.' },
            { name: 'Verimlilik Artırma', href: '/dashboard/ai-chat?prompt=efficiency', icon: '📊', prompt: 'Sera verimlili��imi artırmak için hangi stratejileri uygulayabilirim? Detaylı öneriler istiyorum.' },
            { name: 'Teknoloji Yenilikleri', href: '/dashboard/ai-chat?prompt=technology', icon: '🚀', prompt: 'Sera teknolojilerindeki son yenilikler ve bunları işletmeme entegre etme yolları nelerdir?' },
            { name: 'Pazarlama Stratejileri', href: '/dashboard/ai-chat?prompt=marketing', icon: '📢', prompt: 'Sera ürünlerimi pazarlama ve satış kanallarını geliştirme konusunda stratejik öneriler istiyorum.' },
            { name: 'Sürdürülebilirlik', href: '/dashboard/ai-chat?prompt=sustainability', icon: '🌱', prompt: 'Sera işletmemi daha sürd��rülebilir hale getirmek için çevre dostu çözümler önerir misin?' }
          ]
        },
        {
          name: 'Sohbet Geçmişi',
          href: '/dashboard/ai-chat',
          icon: '💬',
          category: 'AI',
          submenu: [
            { name: 'Sera ROI Hesaplaması', href: '/dashboard/ai-chat?session=roi_calc', icon: '💰', prompt: 'Önceki ROI hesaplama sohbetimize devam edelim.' },
            { name: 'İklim Analizi Sorguları', href: '/dashboard/ai-chat?session=climate_qa', icon: '🌡️', prompt: 'İklim analizi üzerine yaptığımız sohbeti devam ettirelim.' },
            { name: 'Ekipman Önerileri', href: '/dashboard/ai-chat?session=equipment_rec', icon: '⚙️', prompt: 'Ekipman önerileri konusundaki sohbetimizi sürdürelim.' },
            { name: 'Pazarlama Stratejileri', href: '/dashboard/ai-chat?session=marketing_strategy', icon: '📢', prompt: 'Pazarlama stratejileri hakkındaki sohbetimize kaldığımız yerden devam edelim.' },
            { name: 'Maliyet Analizi', href: '/dashboard/ai-chat?session=cost_analysis', icon: '💸', prompt: 'Maliyet analizi tartışmamızı derinleştirmeye devam edelim.' }
          ]
        }
      ]
    },
    
    { name: 'ROI Analizi', href: '/dashboard/analysis/roi', icon: '', category: 'Analizler' },
    { name: 'İklim Analizi', href: '/dashboard/analysis/climate', icon: '', category: 'Analizler' },
    { name: 'Ekipman Listesi', href: '/dashboard/analysis/equipment', icon: '', category: 'Analizler' },
    { name: 'Pazar Analizi', href: '/dashboard/analysis/market', icon: '', category: 'Analizler' },
    { name: 'Teknik Planlar', href: '/dashboard/analysis/layout', icon: '', category: 'Analizler' },
    
    { name: 'Demo Raporlar', href: '/dashboard/demo-reports', icon: '', category: 'Yönetim', badge: 'Demo' },
    { name: 'Projeler', href: '/dashboard/projects', icon: '', category: 'Yönetim' },
    { name: 'Token Yönetimi', href: '/dashboard/tokens', icon: '', category: 'Yönetim' },
    
    { name: 'Danışmanlık', href: '/danismanlik', icon: '', category: 'Hizmetler' },
    { name: 'Destek', href: '/destek', icon: '', category: 'Hizmetler' },
    { name: 'Anahtar Teslim', href: '/anahtar-teslim-proje', icon: '', category: 'Hizmetler' },
    
    { name: 'Ayarlar', href: '/dashboard/settings', icon: '', category: 'Hesap' },
    { name: 'Yardım', href: '/dashboard/help', icon: '', category: 'Hesap' },
  ];

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Diğer';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const toggleSubmenu = (itemName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const toggleSubSubmenu = (itemName: string) => {
    setExpandedSubMenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const isSubmenuActive = (submenu: MenuItem[]) => {
    return submenu.some(item => isActive(item.href));
  };

  return (
    <div className="h-screen bg-[#f6f8f9] overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-[#f6f8f9] border-r border-[#146448]/20 shadow-lg transition-all duration-300 ease-in-out hidden lg:block ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className={`flex items-center justify-between h-16 px-4 border-b border-[#146448]/20 ${sidebarCollapsed ? 'px-2' : ''}`}>
            <a href="/dashboard" className="flex items-center space-x-3">
              {sidebarCollapsed ? (
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
              ) : (
                <SeraGPTLogo size="sm" priority />
              )}
            </a>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-3">
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="mb-4">
                {!sidebarCollapsed && (
                  <div className="px-4 mb-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{category}</p>
                  </div>
                )}
                <div className="space-y-1 px-2">
                  {items.map((item) => (
                    <div key={item.href}>
                      {/* Main menu item */}
                      <div className="flex items-center">
                        <a
                          href={item.submenu ? undefined : item.href}
                          onClick={item.submenu ? (e) => { e.preventDefault(); toggleSubmenu(item.name); } : undefined}
                          className={`group flex items-center px-2 py-2 text-xs font-medium rounded-md transition-all flex-1 cursor-pointer ${
                            isActive(item.href) || (item.submenu && isSubmenuActive(item.submenu))
                              ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          title={sidebarCollapsed ? item.name : undefined}
                        >
                          {item.icon && (
                            <span className={`text-base ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`}>
                              {item.icon}
                            </span>
                          )}
                          {!sidebarCollapsed && (
                            <>
                              <span className="flex-1">{item.name === 'Anasayfa' ? <p>Anasayfa</p> : item.name}</span>
                              <div className="flex items-center space-x-1">
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                                {item.submenu && (
                                  <svg
                                    className={`w-3 h-3 text-gray-400 transition-transform ${expandedMenus[item.name] ? 'rotate-90' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </div>
                            </>
                          )}
                        </a>
                      </div>

                      {/* Submenu items */}
                      {item.submenu && !sidebarCollapsed && expandedMenus[item.name] && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <div key={subItem.name}>
                              {/* Submenu item header */}
                              <button
                                onClick={() => toggleSubSubmenu(subItem.name)}
                                className={`w-full group flex items-center px-2 py-2 text-xs font-medium rounded-md transition-all ${
                                  expandedSubMenus[subItem.name]
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                              >
                                <span className="text-sm mr-2">{subItem.icon}</span>
                                <span className="flex-1 text-left">{subItem.name}</span>
                                <svg
                                  className={`w-3 h-3 text-gray-400 transition-transform ${expandedSubMenus[subItem.name] ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>

                              {/* Sub-submenu items */}
                              {subItem.submenu && expandedSubMenus[subItem.name] && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {subItem.submenu.map((subSubItem) => (
                                    <a
                                      key={subSubItem.name}
                                      href={subSubItem.href}
                                      className="flex items-center px-2 py-1.5 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                                      title={subSubItem.prompt}
                                    >
                                      <span className="text-xs mr-2">{subSubItem.icon}</span>
                                      <span className="truncate">{subSubItem.name}</span>
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className={`p-2 border-t border-gray-200 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
            <button className={`w-full flex items-center px-2 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}>
              <span className={`text-base ${sidebarCollapsed ? '' : 'mr-3'}`}>🚪</span>
              {!sidebarCollapsed && <span>Çıkış Yap</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <SeraGPTLogo size="sm" priority />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <div className="px-4 mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">{category}</h3>
                </div>
                <div className="space-y-1 px-2">
                  {items.map((item) => (
                    <div key={item.href}>
                      {/* Main menu item */}
                      <a
                        href={item.submenu ? undefined : item.href}
                        onClick={item.submenu ? (e) => { e.preventDefault(); toggleSubmenu(item.name); } : undefined}
                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                          isActive(item.href) || (item.submenu && isSubmenuActive(item.submenu))
                            ? 'bg-green-50 text-green-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="text-lg mr-3">{item.icon}</span>
                        <span className="flex-1">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {item.submenu && (
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform ${expandedMenus[item.name] ? 'rotate-90' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      </a>

                      {/* Mobile Submenu items */}
                      {item.submenu && expandedMenus[item.name] && (
                        <div className="ml-8 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <div key={subItem.name}>
                              {/* Mobile submenu header */}
                              <button
                                onClick={() => toggleSubSubmenu(subItem.name)}
                                className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                                  expandedSubMenus[subItem.name]
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }`}
                              >
                                <span className="text-base mr-3">{subItem.icon}</span>
                                <span className="flex-1 text-left">{subItem.name}</span>
                                <svg
                                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedSubMenus[subItem.name] ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>

                              {/* Mobile sub-submenu items */}
                              {subItem.submenu && expandedSubMenus[subItem.name] && (
                                <div className="ml-6 mt-1 space-y-1">
                                  {subItem.submenu.map((subSubItem) => (
                                    <a
                                      key={subSubItem.name}
                                      href={subSubItem.href}
                                      className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-all"
                                      title={subSubItem.prompt}
                                    >
                                      <span className="text-sm mr-2">{subSubItem.icon}</span>
                                      <span className="truncate">{subSubItem.name}</span>
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <span className="text-lg mr-3">🚪</span>
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 mr-3 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="min-w-0">
                <div className="flex items-center space-x-3">
                  <h1 className="text-lg font-semibold text-gray-900 truncate leading-tight">Volkan Ş.</h1>
                  <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full shadow-sm">
                    Premium
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate leading-tight -mt-0.5">Hoş Geldiniz</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Mobile AI Chat */}
              <a
                href="/dashboard/ai-chat"
                className="sm:hidden p-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200"
              >
                <span className="text-base">🤖</span>
              </a>

              <div className="flex items-center space-x-3 ml-2">
                <div className="hidden md:block min-w-0">
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-full overflow-hidden">
          <div className="h-full max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
