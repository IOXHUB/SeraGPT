# 🌐 seragpt.com Custom Domain Setup

## Durum: 🚀 Production Ready - Domain Ekleme

**Mevcut Site:** https://17ddca60910e4daea7522c0f6038c4a4-b8f31d3d98e049c0991c8629f.fly.dev/  
**Hedef Domain:** seragpt.com

## 📋 Vercel Domain Ekleme Adımları

### 1. Vercel Dashboard'a Git
1. [vercel.com](https://vercel.com) → Login yap
2. **SeraGPT projesini** seç
3. **Settings** → **Domains** sekmesine git

### 2. Domain Ekle
1. **Add** butonuna tıkla
2. `seragpt.com` yaz
3. **Add** butonuna bas

### 3. DNS Ayarlarını Yap

Vercel size şu DNS kayıtlarını verecek:

```dns
# A Record (Required)
Type: A
Name: @
Value: 76.76.19.19

# CNAME Record for www (Required)
Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# Optional: AAAA Record for IPv6
Type: AAAA
Name: @
Value: 2600:1f1c:cc5:2800::19
```

### 4. Domain Provider'ında DNS Ekle

**CloudFlare/GoDaddy/Domain Provider'ında:**

1. **DNS Management** → **Manage DNS**
2. Mevcut A kayıtlarını **SİL**
3. Yeni kayıtları **EKLE:**

```
Kayıt Tipi: A
Host: @ (veya boş)  
Value: 76.76.19.19
TTL: Auto veya 3600

Kayıt Tipi: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Auto veya 3600
```

### 5. SSL Sertifikası (Otomatik)
- Vercel otomatik **Let's Encrypt SSL** verir
- **24-48 saat** içinde aktif olur
- **HTTPS** otomatik çalışır

## ⏱️ Bekleme Süreleri

- **DNS Propagation:** 5-30 dakika
- **SSL Sertifikası:** 24-48 saat
- **Domain Aktif:** DNS propagation sonrası

## 🔧 Domain Status Kontrol

```bash
# DNS kontrol
nslookup seragpt.com

# Domain ping test
ping seragpt.com

# SSL kontrol  
curl -I https://seragpt.com
```

## 📊 Expected Results

```
✅ seragpt.com → Site yüklenir
✅ www.seragpt.com → Site yüklenir  
✅ HTTPS otomatik çalışır
✅ Vercel CDN aktif
✅ Hız optimizasyonu
```

## 🚨 Common Issues

### "Domain Verification Failed"
- **DNS kayıtları doğru mu?** Tekrar kontrol et
- **TTL çok yüksek mi?** 3600 yap
- **15 dakika bekle** ve tekrar dene

### "SSL Certificate Pending"
- **Normal durum** - 24-48 saat bekle
- DNS doğru olmal��
- Vercel otomatik halleder

### Site Açılmıyor
1. **DNS propagation bekle** (5-30 dk)
2. **Clear browser cache**
3. **Incognito mode'da dene**
4. **nslookup** ile DNS kontrol et

## 🎯 Quick Setup Commands

**CloudFlare için:**

```bash
# CloudFlare API ile (opsiyonel)
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"A","name":"@","content":"76.76.19.19","ttl":3600}'
```

## 📈 After Domain Setup

Domain aktif olduktan sonra:

1. **Google Search Console** → seragpt.com ekle  
2. **Google Analytics** → domain güncelle
3. **Social media** → link'leri güncelle
4. **Email signatures** → yeni domain

## 🔄 Redirect Setup (Opsiyonel)

Eski domain'den yönlendirme için:

```javascript
// next.config.js'de
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'old-domain.com',
          },
        ],
        destination: 'https://seragpt.com/:path*',
        permanent: true,
      },
    ]
  },
}
```

## ✅ Success Checklist

- [ ] Vercel'de domain eklendi
- [ ] DNS A record eklendi (@ → 76.76.19.19)  
- [ ] DNS CNAME eklendi (www → cname.vercel-dns.com)
- [ ] DNS propagation bitti (5-30 dk)
- [ ] seragpt.com açılıyor
- [ ] www.seragpt.com açılıyor
- [ ] HTTPS çalışıyor (24-48 saat)
- [ ] Vercel dashboard'da "Valid Configuration" ✅

## 🎉 Final Result

```
🌐 https://seragpt.com → SeraGPT Ana Sayfa
🌐 https://www.seragpt.com → Ana Sayfa  
🌐 https://seragpt.com/dashboard → Dashboard
🌐 https://seragpt.com/auth/login → Login
🔒 SSL Certificate: Let's Encrypt
⚡ CDN: Vercel Global Network
🚀 Performance: Optimized
```

**Ready for production! 🚀**
