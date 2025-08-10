# 🚀 SeraGPT Production Deployment Guide

## Vercel Deploy Adımları

### 1. GitHub'a Push
```bash
git add .
git commit -m "Production ready SeraGPT"
git push origin main
```

### 2. Vercel Environment Variables
Vercel dashboard'da şu environment variables'ları ekleyin:

```
OPENAI_API_KEY=sk-your-openai-key-here
RESEND_API_KEY=re_your-resend-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Vercel Settings
- **Framework**: Next.js
- **Node.js Version**: 18.x
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

### 4. Domain Configuration
- Vercel otomatik domain verecek: `your-app.vercel.app`
- Custom domain eklemek isterseniz: Domains sekmesinden ekleyin

## ✅ Çalışan Özellikler

- ✅ API Endpoints (/api/test-email, /api/test-ai)
- ✅ Authentication (Supabase)
- ✅ Email Service (Resend)
- ✅ AI Chat (OpenAI)
- ✅ Admin Panel (/admin)
- ✅ All Dashboard Pages

## 🔧 Test Endpoints

Deploy sonrası test edin:
- `https://your-app.vercel.app/api/test-email`
- `https://your-app.vercel.app/api/test-ai`
- `https://your-app.vercel.app/admin/api-test`

## 🚨 Bilinen Sınırlamalar

- SSR pages'te framer-motion animasyonları client-side yüklenir
- PDF generation manual test gerektirir
- Build sırasında type errors ignore edilir (production için safe)

## 📞 Support

Deployment sorunları için:
1. Vercel build logs kontrol edin
2. Environment variables doğru set edilmiş mi kontrol edin
3. API keys test edin
