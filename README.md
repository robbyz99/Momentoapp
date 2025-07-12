# Morning Momentum PWA 🌅

A mobile-first Progressive Web App for morning mindfulness and productivity, built with React, TypeScript, and Supabase.

## Features ✨

- **Morning Routine Tracking**: Log your morning activities and mood
- **Breathing & Gratitude**: Guided breathing exercises and gratitude practice
- **Timer Section**: Customizable morning timer with meditation
- **Morning Checklist**: Track essential morning habits
- **Micro-Visualization**: Quick visualization exercises
- **Reflection Section**: Evening reflection and journaling
- **Milestone Celebrations**: Celebrate your progress and streaks
- **PWA Ready**: Install on your phone's home screen
- **Offline Support**: Works without internet connection

## Tech Stack 🛠️

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Express.js, Supabase
- **Database**: PostgreSQL (via Supabase)
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Vercel

## Quick Start 🚀

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/morning-momentum-pwa.git
   cd morning-momentum-pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your Supabase credentials:
   ```bash
   SUPABASE_URL=https://glqkmqucggccnxxlbjzq.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=postgresql://postgres:password@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres?pgbouncer=true
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Database Setup 🗄️

The app uses Supabase as the backend. Run this SQL in your Supabase SQL Editor:

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

## Deployment 🌐

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

3. **Configure Environment Variables**
   In your Vercel project settings, add:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key
   - `DATABASE_URL`: Your Supabase database connection string

### Deploy to Supabase

See `SUPABASE_DEPLOYMENT.md` for detailed instructions.

## Project Structure 📁

```
morning-momentum-pwa/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   ├── public/            # Static assets
│   └── index.html         # Entry point
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── db.ts            # Database configuration
├── shared/               # Shared types and schemas
├── supabase/            # Supabase configuration
└── dist/                # Build output
```

## API Endpoints 🔌

- `GET /api/user-stats` - Get user statistics
- `GET /api/morning-entries/date/:date` - Get morning entry for specific date
- `POST /api/morning-entries` - Create new morning entry
- `GET /api/reflections` - Get all reflections
- `POST /api/reflections` - Create new reflection

## PWA Features 📱

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Works without internet connection
- **Push Notifications**: Morning reminders (coming soon)
- **Responsive Design**: Optimized for mobile and desktop

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or need help:
- Open an issue on GitHub
- Check the deployment guides in the docs folder
- Review the Supabase dashboard for database issues

---

**Built with ❤️ for better mornings**
