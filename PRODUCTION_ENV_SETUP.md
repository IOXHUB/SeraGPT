# 🔧 Production Environment Variables Setup

## 🚨 URGENT: Current Issues Fixed

**✅ Admin Redirect Bug FIXED**
- Normal users now go to `/dashboard`
- Only actual admins (`admin@seragpt.com`, `info@isitmax.com`) go to `/admin`

**⚠️ Environment Variables NEEDED**
- Current variables are placeholder/demo values
- Need real Supabase and Resend API keys

## 📋 Required Environment Variables

### 1. Supabase Database
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-service-role-key-here
```

**Nereden Bulunur:**
1. [supabase.com](https://supabase.com) → Login
2. Your Project → Settings → API
3. **URL:** Project URL kısmı
4. **anon key:** Project API Keys → `anon` `public`
5. **service_role:** Project API Keys → `service_role` `secret`

### 2. Resend Email API
```env
RESEND_API_KEY=re_your-resend-api-key-here
```

**Nereden Bulunur:**
1. [resend.com](https://resend.com) → Login
2. API Keys → Create API Key
3. Copy the `re_xxxxx` key

### 3. Next.js Configuration
```env
NEXTAUTH_URL=https://seragpt.com
NEXTAUTH_SECRET=your-random-secret-string-here
NODE_ENV=production
```

## 🔄 Current Status

**Current Settings (Demo/Development):**
```
❌ SUPABASE_URL: Demo placeholder
❌ SUPABASE_ANON_KEY: Demo placeholder  
❌ RESEND_API_KEY: Demo placeholder
❌ All auth/email disabled
```

**Production Settings Needed:**
```
✅ Real Supabase project
✅ Real Resend account
✅ Domain verification
✅ SSL certificates
```

## 🚀 Deployment Steps

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. **New Project** → Name: "SeraGPT"
3. **Region:** Select closest to users
4. Copy URL and API keys

### Step 2: Setup Authentication
```sql
-- Enable Email Auth in Supabase Dashboard
-- Authentication → Settings → Auth
-- Enable: Email
-- Disable: Phone, Social (if not needed)
```

### Step 3: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with business email
3. Create API key
4. Add domain (seragpt.com) later

### Step 4: Update Vercel Environment
1. Vercel Dashboard → SeraGPT Project
2. **Settings** → **Environment Variables**
3. Add all production variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`

### Step 5: Deploy & Test
1. Push code to GitHub
2. Vercel auto-deploys
3. Test: seragpt.com → "Ücretsiz Başla"
4. Should redirect to `/dashboard` (not `/admin`)

## 🔧 Quick Fix Commands

**If site still redirects to admin:**
```bash
# Clear all auth cookies
# Browser DevTools → Application → Cookies → Delete All
```

**Test user flow:**
1. seragpt.com → "Ücretsiz Başla"
2. Register with any email
3. Should get email verification
4. After verification → `/dashboard` ✅

## 📊 Expected Behavior

```
👤 Normal User Flow:
Homepage → "Ücretsiz Başla" → /auth/login → Register → Email Verify → /dashboard ✅

👨‍💼 Admin User Flow (Only admin@seragpt.com):
Homepage → "Ücretsiz Başla" → /auth/login → Login → /admin ✅
```

## 🚨 Current Setup Priority

**Immediate (1-2 hours):**
1. ✅ Fix admin redirect (DONE)
2. 🔄 Setup Supabase project
3. 🔄 Setup Resend account
4. 🔄 Update Vercel environment variables

**Next (2-4 hours):**
5. Test complete user flow
6. Setup custom domain DNS
7. Configure email domain

## 📞 Need Help?

**Supabase Setup Issues:**
- Check [Supabase Documentation](https://supabase.com/docs)
- Ensure project region is correct

**Resend Email Issues:**
- Check [Resend Documentation](https://resend.com/docs)
- Domain verification may take 24-48 hours

**Vercel Deployment Issues:**
- Check build logs in Vercel dashboard
- Environment variables must be exactly as shown

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] Supabase URL and keys copied
- [ ] Resend account created  
- [ ] Resend API key copied
- [ ] Vercel environment variables updated
- [ ] Site deployed successfully
- [ ] "Ücretsiz Başla" → `/dashboard` (not `/admin`)
- [ ] User registration working
- [ ] Email verification working

**Once complete:** seragpt.com will be fully functional! 🎉
