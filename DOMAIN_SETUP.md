# 🌐 SeraGPT.com Domain Email Setup

## Durum: ✅ Email Sistemi Çalışıyor
- **API:** Resend aktif
- **Geçici Domain:** onboarding@resend.dev  
- **Hedef:** SeraGPT <noreply@seragpt.com>

## 📋 Domain Doğrulama Adımları

### 1. Resend Dashboard'a Git
1. [resend.com](https://resend.com) → Login
2. **Domains** bölümüne git
3. **Add Domain** butonuna tıkla
4. `seragpt.com` ekle

### 2. DNS Kayıtları Ekle

Resend sana şu DNS kayıtlarını verecek (örnek):

```dns
# 1. SPF Record (Required)
Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"

# 2. DKIM Record (Required) 
Type: TXT
Name: resend._domainkey
Value: "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..." (Resend'den alacaksın)

# 3. DMARC Record (Recommended)
Type: TXT  
Name: _dmarc
Value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@seragpt.com"

# 4. MX Record (Optional, if you want to receive emails)
Type: MX
Name: @
Value: feedback-smtp.resend.com
Priority: 10
```

### 3. DNS Kayıtlarını Ekle

**CloudFlare/Domain Provider'ında:**
1. DNS Management'e git
2. Yukarıdaki kayıtları ekle
3. TTL: 3600 (1 saat) veya Auto

### 4. Doğrulama Bekle
- DNS propagation: **24-48 saat**
- Resend otomatik kontrol eder
- Status: "Verified" olduğunda hazır

## 🚀 Verification Sonrası

Domain doğrulandığında:

```typescript
// lib/services/email-service.ts
this.from = 'SeraGPT <noreply@seragpt.com>'; // ✅ Kendi domain'in
```

## 📧 Test Komutları

```bash
# Domain status check (Resend'de)
curl -X GET https://api.resend.com/domains \
  -H "Authorization: Bearer YOUR_API_KEY"

# Email test  
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "to": "test@example.com",
    "name": "Test User"
  }'
```

## 🔧 Troubleshooting

### "Domain not verified" Hatası
- DNS kayıtlarını tekrar kontrol et
- 24 saat bekle
- `dig TXT resend._domainkey.seragpt.com` ile test et

### Email Gelmiyor
1. Spam klasörünü kontrol et
2. DNS DKIM kaydı doğru mu?
3. Resend logs'u kontrol et

### Rate Limit
- Free plan: 3000 email/ay
- Aşarsan paid plan'e geç

## 📊 Current Status

```
✅ Resend API Key: Aktif
✅ Email Templates: Hazır  
✅ Test Domain: onboarding@resend.dev (geçici)
🔄 Custom Domain: seragpt.com (doğrulama bekliyor)
✅ Code: Hazır, domain değişikliği yeterli
```

## 🎯 Next Steps

1. **Resend'e git** → Domain ekle
2. **DNS kayıtları** ekle
3. **24 saat bekle**
4. **Code'u güncelle** (domain değişikliği)
5. **Test et** → Markalı email'ler! 🎉

Bu setup sonrası email'ler:
- **Gönderen:** `SeraGPT <noreply@seragpt.com>`
- **Branding:** 100% kendi markası
- **Güvenilirlik:** Yüksek deliverability
- **Professional:** Kurumsal görünüm
