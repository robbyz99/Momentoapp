# Morning Momentum PWA - Supabase Deployment Guide

## Current Status ✅
- ✅ App is running locally with Supabase database
- ✅ Database schema is configured
- ✅ API endpoints are working
- ✅ Frontend is connected to Supabase

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)
This is the easiest way to deploy your PWA with Supabase as the backend.

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel --prod
```

#### Step 3: Configure Environment Variables
In your Vercel dashboard, add these environment variables:
- `SUPABASE_URL`: `https://glqkmqucggccnxxlbjzq.supabase.co`
- `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscWttcXVjZ2djY254eGxianpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTI2OTksImV4cCI6MjA2NzkyODY5OX0.c3lrKS3rvrS6C-nM98bDYrG-xtYTaLHeLIDFY2DQy1g`

### Option 2: Deploy to Netlify
#### Step 1: Build the app
```bash
npm run build
```

#### Step 2: Deploy via Netlify dashboard
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Configure environment variables in the dashboard

### Option 3: Full Supabase Platform Deployment
This gives you the complete Supabase experience with hosting, database, and more.

#### Step 1: Set up Supabase Edge Functions
1. Go to your Supabase dashboard
2. Navigate to Edge Functions
3. Create a new function for your API

#### Step 2: Configure Supabase Hosting
1. In your Supabase dashboard, go to Settings > General
2. Configure your custom domain
3. Set up SSL certificates

## Database Setup

Your Supabase database is already configured with:
- ✅ Connection string: `postgresql://postgres:UR8mIV7amEbsS8oG@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres`
- ✅ Tables: `morning_entries`, `reflections`, `user_stats`
- ✅ Default user stats record

## Environment Variables

For any deployment platform, you'll need these environment variables:

```bash
SUPABASE_URL=https://glqkmqucggccnxxlbjzq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscWttcXVjZ2djY254eGxianpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTI2OTksImV4cCI6MjA2NzkyODY5OX0.c3lrKS3rvrS6C-nM98bDYrG-xtYTaLHeLIDFY2DQy1g
DATABASE_URL=postgresql://postgres:UR8mIV7amEbsS8oG@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres?pgbouncer=true
```

## Custom Domain Setup

If you want to use your custom domain:

1. **DNS Configuration**:
   - Add a CNAME record pointing to your deployment URL
   - Or add an A record if using IP addresses

2. **SSL Certificate**:
   - Most platforms (Vercel, Netlify) provide automatic SSL
   - For Supabase hosting, SSL is included

3. **Environment Variables**:
   - Update your app's base URL to use your custom domain

## Testing Your Deployment

After deployment, test these endpoints:
- `GET /api/user-stats` - Should return user statistics
- `GET /api/morning-entries/date/[date]` - Should return morning entries
- `GET /api/reflections` - Should return reflections

## PWA Features

Your app includes:
- ✅ Service Worker for offline functionality
- ✅ Web App Manifest for installability
- ✅ Responsive design for mobile
- ✅ Progressive enhancement

## Next Steps

1. **Choose your deployment platform** (Vercel recommended)
2. **Deploy the app**
3. **Configure environment variables**
4. **Test all functionality**
5. **Set up custom domain** (optional)
6. **Monitor performance** and user analytics

## Support

If you encounter issues:
1. Check the deployment platform's logs
2. Verify environment variables are set correctly
3. Test database connectivity
4. Check browser console for frontend errors 