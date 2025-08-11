'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TokenIslemleriPage() {
  const [userTokens, setUserTokens] = useState(25); // Mock current token balance
  const [selectedTokenCard, setSelectedTokenCard] = useState<string | null>(null);

  const tokenPackages = [
    { id: 'small', amount: 10, price: 29.99, popular: false },
    { id: 'medium', amount: 50, price: 119.99, popular: true },
    { id: 'large', amount: 100, price: 199.99, popular: false }
  ];

  const handleTokenPurchase = (packageId: string) => {
    const selectedPackage = tokenPackages.find(p => p.id === packageId);
    if (selectedPackage) {
      // Redirect to iyzico payment with package details
      const iyzicoPay = `/api/payment/iyzico?tokens=${selectedPackage.amount}&price=${selectedPackage.price}`;
      window.location.href = iyzicoPay;
    }
  };

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#146448' }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: '#146448', borderBottomColor: '#f6f8f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/ai-chat"
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:opacity-70 transition-opacity text-xl font-semibold"
                style={{ backgroundColor: '#baf200', color: '#1e3237' }}
              >
                ←
              </Link>
              <h1 className="text-xl font-semibold" style={{ color: '#f6f8f9' }}>Token İşlemleri</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenOperations.map((operation) => (
            <button
              key={operation.id}
              onClick={operation.action}
              className="rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left group border"
              style={{ backgroundColor: '#f6f8f9', borderColor: '#146448' }}
            >
              <div className="flex flex-col items-center text-center" style={{ backgroundColor: '#baf200', borderRadius: '8px', padding: '16px' }}>
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

        {/* Modal Content */}
        {selectedTokenCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-lg p-8 max-w-md w-full mx-4" style={{ backgroundColor: '#f6f8f9' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold" style={{ color: '#1e3237' }}>
                  {selectedTokenCard === 'view' && 'Token Bakiyesi'}
                  {selectedTokenCard === 'purchase' && 'Token Satın Al'}
                  {selectedTokenCard === 'usage' && 'Kullanım Geçmişi'}
                  {selectedTokenCard === 'transaction' && 'İşlem Geçmişi'}
                </h2>
                <button
                  onClick={() => setSelectedTokenCard(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Token Balance View */}
              {selectedTokenCard === 'view' && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2" style={{ color: '#146448' }}>
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
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all"
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
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          pkg.popular ? 'border-opacity-100' : 'border-opacity-30 hover:border-opacity-60'
                        }`}
                        style={{ borderColor: '#146448' }}
                        onClick={() => handleTokenPurchase(pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="text-xs font-medium mb-2 text-center px-2 py-1 rounded-full"
                               style={{ backgroundColor: '#baf200', color: '#1e3237' }}>
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
          </div>
        )}
      </div>
    </div>
  );
}
