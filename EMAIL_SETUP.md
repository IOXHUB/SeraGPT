# 📧 Email Service Setup

## Resend ile Özel Email Sistemi

### 1. Resend Hesabı Oluştur
1. [resend.com](https://resend.com) sitesine git
2. Ücretsiz hesap oluştur (aylık 3000 email)
3. Domain'inizi ekle (`seragpt.com`)

### 2. Domain Doğrulama
```bash
# DNS kayıtları ekle (Resend dashboard'dan alacaksın):
TXT record: resend._domainkey.seragpt.com
Value: [Resend'den aldığın key]

MX record: seragpt.com
Value: feedback-smtp.resend.com
Priority: 10
```

### 3. API Key Al
1. Resend dashboard → API Keys
2. Yeni key oluştur
3. Environment variable'a ekle:

```bash
# Vercel'de environment variables:
RESEND_API_KEY=re_123456789...
```

### 4. Test Et
```bash
# Local test için:
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "to": "test@example.com", 
    "name": "Test User",
    "url": "https://seragpt.com/dashboard"
  }'
```

## Alternative: SendGrid

Eğer Resend çalışmazsa SendGrid kullan:

1. [sendgrid.com](https://sendgrid.com) hesap aç
2. API key al  
3. Environment variable:
```bash
SENDGRID_API_KEY=SG.123456789...
```

## Email Template'leri

Şu email'ler otomatik gönderilir:

### ✅ Kayıt Sonrası (Welcome)
- **Konu:** 🌱 SeraGPT'e Hoş Geldiniz!
- **İçerik:** Özellikler, Dashboard linki
- **Gönderen:** SeraGPT <noreply@seragpt.com>

### 📧 Email Doğrulama (Verification)  
- **Konu:** ✅ E-posta Adresinizi Doğrulayın
- **İçerik:** Doğrulama linki, güvenlik uyarıları
- **Süre:** 24 saat geçerli

### 🔐 Şifre Sıfırlama (Password Reset)
- **Konu:** 🔐 Şifre Sıfırlama
- **İçerik:** Sıfırlama linki, güvenlik uyarıları  
- **Süre:** 1 saat geçerli

## Avantajları

### ✅ Supabase Email'e Göre Üstün Yanları:
- **Markalı:** @seragpt.com adresinden gelir
- **Özelleştirilebilir:** Logo, renk, içerik
- **Güvenilir:** Yüksek deliverability
- **Analytics:** Açılma, tıklama istatistikleri
- **Template:** Güzel, responsive tasarım

### 📊 Kullanım Limitleri:
- **Resend:** 3000/ay ücretsiz, sonra $20/ay
- **SendGrid:** 100/gün ücretsiz, sonra $15/ay
- **AWS SES:** $0.10/1000 email (en ucuz)

## Troubleshooting

### Email Gönderilmiyor?
```bash
# API key kontrol et:
echo $RESEND_API_KEY

# DNS kayıtları kontrol et:
dig TXT resend._domainkey.seragpt.com

# Logs kontrol et:
vercel logs --project=seragpt
```

### Domain Doğrulanmadı?
1. DNS kayıtlarını tekrar kontrol et
2. 24 saat bekle (DNS propagation)
3. Resend support'a yaz

Bu sistem ile profesyonel, markalı email'ler gönderebilirsin! 🚀
