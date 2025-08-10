# SeraGPT - Vercel Production Deployment Guide

## 🚀 Vercel + Supabase Production Strategy

### Vercel'in Avantajları
- **Preview Deployments**: Her branch otomatik preview
- **Zero Downtime**: Atomic deployments
- **Instant Rollback**: Tek tıkla eski versiyona dön
- **Edge Network**: Global CDN otomatik
- **Built-in Analytics**: Performance monitoring

## 🛡️ Güvenli Production Geçişi

### 1. BACKUP STRATEJİSİ
```bash
# Supabase Backup
npx supabase db dump --file backup-$(date +%Y%m%d).sql

# Environment Variables Backup
vercel env pull .env.backup
```

### 2. PRODUCTION ENVIRONMENT SETUP

#### Vercel Environment Variables
```bash
# Production ortamında set edilecek:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email & Services
SENDGRID_API_KEY=your-sendgrid-key
RESEND_API_KEY=your-resend-key

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your-ga-id
VERCEL_ANALYTICS_ID=your-vercel-analytics
```

#### Supabase Production Project
```sql
-- Production database'de gerekli tablolar:
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  tokens INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### 3. DEPLOYMENT WORKFLOW

#### Current Status Check
- ✅ Vercel project connected to GitHub
- ✅ Automatic deployments on push
- ✅ Preview deployments working
- ⚠️ Production environment variables

#### Production Checklist
- [ ] **Supabase Production Project**: Yeni production database
- [ ] **Environment Variables**: Vercel dashboard'da set et
- [ ] **Custom Domain**: DNS ayarları
- [ ] **SSL Certificate**: Otomatik Vercel tarafından
- [ ] **Performance**: Edge functions optimize et

### 4. ZERO-RISK DEPLOYMENT STRATEGY

#### Option A: Blue-Green Deployment
```bash
# 1. Production branch oluştur
git checkout -b production
git push origin production

# 2. Vercel'de production branch'i production environment'a assign et
# 3. Domain'i production branch'a yönlendir
```

#### Option B: Preview Domain Test
```bash
# 1. Production ayarlarıyla preview deploy
# 2. Preview URL'de tam test
# 3. Custom domain'i preview'dan production'a geçir
```

### 5. MONITORING & ROLLBACK

#### Instant Rollback Plan
1. **Vercel Dashboard**: Previous deployment'a rollback (30 saniye)
2. **DNS Rollback**: Subdomain'e geçir (5 dakika)
3. **Database Rollback**: Backup restore (15 dakika)

#### Real-time Monitoring
```javascript
// next.config.js - Production monitoring
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  // Error tracking
  sentry: {
    hideSourceMaps: true,
  }
}
```

## 🔧 PRODUCTION OPTIMIZATIONS

### Next.js Optimizations
```javascript
// next.config.js production settings
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },
  
  // Compression
  compress: true,
  
  // Security
  poweredByHeader: false,
  
  // Bundle analysis
  experimental: {
    bundlePagesRouterDependencies: true,
  }
}
```

### Supabase Production Config
```typescript
// lib/supabase.ts - Production setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'SeraGPT-Production'
    }
  }
})
```

## 📋 STEP-BY-STEP DEPLOYMENT

### Week 1: Preparation
1. **Supabase Production Project Oluştur**
2. **Production Environment Variables Set Et**
3. **Staging Branch Test Et**

### Week 2: Staging Testing
1. **Preview Deployment'ta Full Test**
2. **Performance Testing**
3. **Security Audit**

### Week 3: Production Go-Live
1. **Friday Evening**: Production deploy
2. **Weekend**: Monitor and fix issues
3. **Monday**: Final optimization

## ⚠️ COMMON ISSUES & SOLUTIONS

### Environment Variables
```bash
# Check current env vars
vercel env ls

# Add production env var
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

### Build Issues
```bash
# Local production build test
npm run build
npm run start

# Vercel build logs
vercel logs your-deployment-url
```

### Database Migration
```sql
-- Run in Supabase SQL editor (Production)
-- Copy tables from development to production
-- Update RLS policies
-- Set up auth triggers
```

## 🎯 SUCCESS METRICS
- **Uptime**: 99.9%+ (Vercel guarantee)
- **Performance**: Core Web Vitals > 90
- **Security**: A+ SSL rating
- **Data**: Zero loss during migration

---

**Next Action**: Supabase production project oluştur ve environment variables'ları hazırla!
