# Supabase Full Hosting Setup Guide

## 🎯 **What You'll Get**
- ✅ **Custom domain** (your purchased domain)
- ✅ **Built-in hosting** for your React app
- ✅ **PostgreSQL database** with real-time features
- ✅ **User authentication** with social logins
- ✅ **PWA features** with push notifications
- ✅ **Global CDN** and automatic HTTPS

## 📋 **Step-by-Step Setup**

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization (if needed)
4. Create new project
5. Choose a name (e.g., "morning-momentum")
6. Set a database password
7. Choose your region
8. Wait for project to be ready (2-3 minutes)

### **Step 2: Get Your Project Credentials**
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **Anon Key**: `[your-anon-key]`
   - **Service Role Key**: `[your-service-role-key]`

### **Step 3: Update Environment Variables**
Create `.env.local` file:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Database (for migrations)
DATABASE_URL=postgresql://postgres:[your-password]@db.[your-project-ref].supabase.co:5432/postgres
```

### **Step 4: Install Supabase CLI**
```bash
npm install -g supabase
supabase login
```

### **Step 5: Initialize Supabase in Your Project**
```bash
supabase init
supabase link --project-ref [your-project-ref]
```

### **Step 6: Push Database Schema**
```bash
supabase db push
```

### **Step 7: Deploy to Supabase Hosting**
```bash
# Build your app
npm run build

# Deploy to Supabase
supabase functions deploy
```

### **Step 8: Configure Custom Domain**
1. Go to Supabase Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (5-10 minutes)

## 🎨 **App Modifications Needed**

### **1. Update Database Schema**
```sql
-- Enable Row Level Security
ALTER TABLE morning_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON morning_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON morning_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### **2. Add Authentication**
```typescript
// Add Supabase Auth to your app
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### **3. Update API Routes**
```typescript
// Use Supabase client instead of direct database
const { data, error } = await supabase
  .from('morning_entries')
  .select('*')
  .eq('user_id', user.id)
```

## 🌐 **Custom Domain Setup**

### **DNS Configuration**
Add these records to your domain provider:
```
Type: CNAME
Name: @
Value: [your-project-ref].supabase.co

Type: CNAME  
Name: www
Value: [your-project-ref].supabase.co
```

### **SSL Certificate**
- Automatic HTTPS
- Validates in 5-10 minutes
- Global CDN included

## 🚀 **Deployment Commands**

```bash
# Install dependencies
npm install @supabase/supabase-js

# Build for production
npm run build

# Deploy to Supabase
supabase functions deploy

# Your app will be available at:
# https://your-domain.com
```

## 📱 **PWA Features**
- ✅ Installable on mobile
- ✅ Offline capability
- ✅ Push notifications
- ✅ Home screen icon
- ✅ Splash screen

## 🔐 **Security Features**
- ✅ Row Level Security
- ✅ User authentication
- ✅ API protection
- ✅ Environment variables
- ✅ Automatic backups

Your Morning Momentum PWA will be live at your custom domain with full Supabase hosting! 🎉 