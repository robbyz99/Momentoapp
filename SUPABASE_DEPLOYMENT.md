# Morning Momentum PWA - Supabase Deployment Guide

## Current Status ✅
- ✅ App is running locally with Supabase database
- ✅ Database schema is configured
- ✅ API endpoints are working
- ✅ Frontend is connected to Supabase

## Step-by-Step Supabase Deployment

### Step 1: Set up Database Schema in Supabase

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in and select your project: `glqkmqucggccnxxlbjzq`

2. **Create Database Tables**
   - Go to **SQL Editor** in the left sidebar
   - Run this SQL to create your tables:

```sql
-- Create morning_entries table
CREATE TABLE IF NOT EXISTS morning_entries (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  identity TEXT,
  feeling TEXT,
  action TEXT,
  replace TEXT,
  why_today_matters TEXT,
  starter_action_suggestion_used BOOLEAN DEFAULT FALSE,
  drank_water BOOLEAN DEFAULT FALSE,
  exposed_to_light BOOLEAN DEFAULT FALSE,
  moved_body BOOLEAN DEFAULT FALSE,
  timer_completed BOOLEAN DEFAULT FALSE,
  visualization_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reflections table
CREATE TABLE IF NOT EXISTS reflections (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  well_done TEXT,
  embodied TEXT,
  grateful TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  last_completion_date TEXT
);

-- Insert default user stats
INSERT INTO user_stats (id, current_streak, total_completions, last_completion_date) 
VALUES (1, 0, 0, NULL) 
ON CONFLICT (id) DO NOTHING;
```

### Step 2: Deploy Frontend to Supabase Hosting

1. **Build your app**
   ```bash
   npm run build
   ```

2. **Go to Supabase Dashboard**
   - Navigate to **Settings** > **General**
   - Scroll down to **Custom Domains**
   - Click **Add Domain**

3. **Configure your custom domain**
   - Enter your domain (e.g., `morningmomentum.com`)
   - Follow the DNS configuration instructions

### Step 3: Set up Edge Functions (Alternative to Express Server)

1. **In Supabase Dashboard**
   - Go to **Edge Functions** in the left sidebar
   - Click **Create a new function**

2. **Create the API function**
   - Name: `api`
   - Copy the code from `supabase/functions/api/index.ts`
   - Deploy the function

3. **Update your frontend API calls**
   - Change API base URL to: `https://glqkmqucggccnxxlbjzq.supabase.co/functions/v1/api`

### Step 4: Configure Environment Variables

In your Supabase project settings, add these environment variables:

```bash
SUPABASE_URL=https://glqkmqucggccnxxlbjzq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscWttcXVjZ2djY254eGxianpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTI2OTksImV4cCI6MjA2NzkyODY5OX0.c3lrKS3rvrS6C-nM98bDYrG-xtYTaLHeLIDFY2DQy1g
DATABASE_URL=postgresql://postgres:UR8mIV7amEbsS8oG@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres?pgbouncer=true
```

### Step 5: Deploy using Supabase CLI (Alternative Method)

If you want to use the CLI approach:

1. **Install Supabase CLI manually**
   ```bash
   # Download the binary
   curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz | tar -xz
   
   # Move to your PATH
   sudo mv supabase /usr/local/bin/
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link your project**
   ```bash
   supabase link --project-ref glqkmqucggccnxxlbjzq
   ```

4. **Deploy functions**
   ```bash
   supabase functions deploy api
   ```

### Step 6: Configure PWA Settings

1. **Update your manifest.json**
   - Make sure the start URL points to your Supabase domain
   - Update the scope to match your domain

2. **Update service worker**
   - Ensure it works with your Supabase hosting
   - Test offline functionality

### Step 7: Test Your Deployment

1. **Test API endpoints**
   ```bash
   curl https://glqkmqucggccnxxlbjzq.supabase.co/functions/v1/api/user-stats
   ```

2. **Test PWA installation**
   - Open your app in Chrome
   - Look for the install prompt
   - Test offline functionality

### Step 8: Set up Custom Domain (Optional)

1. **DNS Configuration**
   - Add a CNAME record pointing to your Supabase URL
   - Or add an A record if using IP addresses

2. **SSL Certificate**
   - Supabase provides automatic SSL certificates
   - No additional configuration needed

## Database Connection Details

Your Supabase database is configured with:
- **Host**: `db.glqkmqucggccnxxlbjzq.supabase.co`
- **Database**: `postgres`
- **Username**: `postgres`
- **Password**: `UR8mIV7amEbsS8oG`
- **Port**: `5432`

## Environment Variables for Deployment

```bash
SUPABASE_URL=https://glqkmqucggccnxxlbjzq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscWttcXVjZ2djY254eGxianpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTI2OTksImV4cCI6MjA2NzkyODY5OX0.c3lrKS3rvrS6C-nM98bDYrG-xtYTaLHeLIDFY2DQy1g
DATABASE_URL=postgresql://postgres:UR8mIV7amEbsS8oG@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres?pgbouncer=true
```

## Next Steps

1. **Follow Step 1** to set up your database schema
2. **Choose your deployment method** (Edge Functions or CLI)
3. **Deploy your frontend** to Supabase hosting
4. **Configure your custom domain**
5. **Test all functionality**
6. **Monitor performance** in Supabase dashboard

## Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Verify database connection
3. Test Edge Functions in the dashboard
4. Check browser console for frontend errors 