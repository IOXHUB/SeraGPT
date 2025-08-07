'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function TokensPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState({
    remainingTokens: 5,
    usedTokens: 0,
    freeTokens: 5
  });

  const tokenPackages = [
    {
      id: 'small',
      name: '10 Jeton',
      tokens: 10,
      price: 500,
      originalPrice: 500,
      popular: false
    },
    {
      id: 'medium',
      name: '50 Jeton',
      tokens: 50,
      price: 3500,
      originalPrice: 3500,
      popular: true
    },
    {
      id: 'large',
      name: '100 Jeton',
      tokens: 100,
      price: 4900,
      originalPrice: 5000,
      popular: false,
      savings: 100
    }
  ];

  const handlePurchase = async (packageId: string) => {
    setLoading(true);
    setSelectedPackage(packageId);

    setTimeout(() => {
      alert('İyzico ödeme sayfasına yönlendiriliyorsunuz...');
      setLoading(false);
      setSelectedPackage(null);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div style={{ minHeight: '100vh', background: '#ffffff', padding: '32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
              Jeton Yükle
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>
              Her rapor 1 jeton kullanır. AI sohbet sınırsızdır.
            </p>
          </div>

          {/* Current Balance */}
          <div style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #10b981',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.15)',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
              {userTokens.remainingTokens}
            </div>
            <div style={{ fontSize: '18px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
              Kalan Jeton
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              ({userTokens.freeTokens} ücretsiz • {userTokens.usedTokens} kullanılan)
            </div>
          </div>

          {/* Token Packages */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {tokenPackages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  position: 'relative',
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px',
                  border: pkg.popular ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
                  boxShadow: pkg.popular
                    ? '0 0 32px rgba(139, 92, 246, 0.2)'
                    : '0 4px 6px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!pkg.popular) {
                    (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pkg.popular) {
                    (e.target as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                  }
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}>
                    ⭐ En Popüler
                  </div>
                )}

                {/* Package Name */}
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '36px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>
                    ₺{pkg.price.toLocaleString()}
                  </div>
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <div style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' }}>
                      ₺{pkg.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div style={{ fontSize: '16px', color: '#6b7280', marginTop: '8px' }}>
                    {pkg.tokens} jeton
                  </div>
                </div>

                {/* Savings */}
                {pkg.savings && (
                  <div style={{ marginBottom: '24px', fontSize: '14px', color: '#10b981', fontWeight: '600' }}>
                    💰 ₺{pkg.savings.toLocaleString()} tasarruf
                  </div>
                )}

                {/* Per Token Price */}
                <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '32px' }}>
                  ₺{Math.round(pkg.price / pkg.tokens)} / jeton
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading && selectedPackage === pkg.id}
                  style={{
                    width: '100%',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: loading && selectedPackage === pkg.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    background: pkg.popular
                      ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                      : '#111827',
                    color: 'white',
                    boxShadow: pkg.popular
                      ? '0 8px 20px rgba(139, 92, 246, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.15)',
                    opacity: loading && selectedPackage === pkg.id ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!(loading && selectedPackage === pkg.id)) {
                      (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLElement).style.boxShadow = pkg.popular
                        ? '0 12px 28px rgba(139, 92, 246, 0.4)'
                        : '0 8px 20px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(loading && selectedPackage === pkg.id)) {
                      (e.target as HTMLElement).style.transform = 'translateY(0)';
                      (e.target as HTMLElement).style.boxShadow = pkg.popular
                        ? '0 8px 20px rgba(139, 92, 246, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                >
                  {loading && selectedPackage === pkg.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid white',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        marginRight: '8px',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      İşleniyor...
                    </div>
                  ) : (
                    'Satın Al'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #06b6d4',
            boxShadow: '0 0 24px rgba(6, 182, 212, 0.1)',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
              💳 Ödeme Bilgileri
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Güvenli ödeme - İyzico altyapısı',
                'Kredi kartı ve banka kartı kabul edilir',
                'Ödeme onayından sonra jetonlar otomatik yüklenir',
                'E-posta ile onay bildirimi gönderilir'
              ].map((text, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#10b981', marginRight: '12px', fontSize: '16px' }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Info */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #f59e0b',
            boxShadow: '0 0 24px rgba(245, 158, 11, 0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
              📊 Jeton Kullanımı
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', textAlign: 'center', marginBottom: '24px' }}>
              {[
                { icon: '📈', name: 'ROI Analizi' },
                { icon: '🌤️', name: 'İklim Analizi' },
                { icon: '📊', name: 'Pazar Analizi' },
                { icon: '🔧', name: 'Ekipman Listesi' },
                { icon: '📐', name: 'Layout Planlama' }
              ].map((item, index) => (
                <div key={index}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>1 jeton</div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
              borderRadius: '12px',
              border: '1px solid #38bdf8',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '32px', marginRight: '16px' }}>💬</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  AI Sohbet - Sınırsız
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Raporlarınız üzerinde sınırsız soru sorabilirsiniz
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af' }}>
            <p>
              Sorun yaşıyorsanız{' '}
              <a href="/destek" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                destek ekibimizle
              </a>
              {' '}iletişime geçin.
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}
