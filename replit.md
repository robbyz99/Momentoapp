# Morning Momentum App

## Overview

Morning Momentum is a Progressive Web App (PWA) designed to help users start their day with positivity and intention. The app provides a structured morning routine including breathing exercises, goal setting, and reflection components. It's built as a full-stack application with React on the frontend and Express on the backend, utilizing Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: DatabaseStorage class using Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

### Mobile-First Design
- **PWA Support**: Complete Progressive Web App implementation with service worker
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Offline Capability**: Basic caching for core functionality
- **Home Screen Installation**: Full PWA manifest for native-like experience

## Key Components

### 1. Onboarding Flow
- Multi-step introduction with app benefits explanation
- Mode selection (Full vs Quick Mode)
- Notification preference setting
- Skippable for returning users

### 2. Welcome Section
- Daily affirmation system with localStorage persistence
- Motivational messaging and user statistics display
- Streak tracking and progress visualization
- Quick Mode access for busy days

### 3. Breathe & Center (Merged Component)
- 3-cycle guided breathing animation
- Optional extended meditation timer (2-5 minutes)
- Visual progress indicators and motivational messaging
- Flexible completion options

### 4. Quick Mode
- 2-minute essential routine for busy mornings
- Identity statement, gratitude, starter action, and purpose
- Maintains streak while providing flexibility
- Auto-suggested actions to reduce friction

### 5. Morning Checklist
- Comprehensive daily intention setting
- Enhanced with "why today matters" field
- Starter action suggestion generator
- Physical wellness tracking
- Form validation and automatic saving

### 6. Micro-Visualization
- 15-second guided visualization
- Reinforces daily intentions
- Smooth integration with morning flow

### 7. Reflection Section
- End-of-day gratitude and progress tracking
- Historical reflection storage
- Streak recovery integration

### 8. Milestone Celebration
- Automatic celebrations at streak milestones (7, 21, 50 days)
- Social sharing capabilities
- Referral system integration
- Confetti animations and motivational messaging

### 9. Streak Recovery System
- Gentle recovery prompts for missed days
- One grace period per week with reflection
- Maintains motivation while being forgiving

### 10. Analytics System
- Comprehensive event tracking
- Ready for PostHog/Firebase integration
- User behavior insights and completion rates

## Data Flow

### Database Schema
```sql
-- Morning entries for daily planning
morning_entries: id, date, identity, feeling, action, replace, why_today_matters, starter_action_suggestion_used, completion_flags, timestamps

-- Evening reflections for progress tracking
reflections: id, date, well_done, embodied, grateful, timestamps

-- User statistics for gamification
user_stats: id, current_streak, total_completions, last_completion_date
```

### Recent Changes (July 2025)
- **Database Migration**: Replaced MemStorage with DatabaseStorage using PostgreSQL
- **Enhanced Schema**: Added `whyTodayMatters` and `starterActionSuggestionUsed` fields
- **Complete App Refactoring**: 
  - Added comprehensive onboarding flow with mode selection
  - Merged breathing and timer sections into unified "Breathe & Center"
  - Added Quick Mode for time-constrained users (2-minute flow)
  - Implemented milestone celebration system with sharing capabilities
  - Added streak recovery system with grace period
  - Integrated analytics tracking throughout the app
- **New Components**: OnboardingFlow, QuickMode, BreatheCentre, MilestoneCelebration, StreakRecovery
- **Growth Features**: Social sharing, referral system, and celebration animations
- **Analytics Ready**: Event tracking system prepared for PostHog/Firebase integration

### API Endpoints
- `POST /api/morning-entries` - Create daily morning entry
- `GET /api/morning-entries/date/:date` - Retrieve entry by date
- `GET /api/morning-entries` - Get all entries for history
- `POST /api/reflections` - Create evening reflection
- `GET /api/reflections` - Get reflections with optional date filtering
- `GET /api/user-stats` - Retrieve user statistics
- `PUT /api/user-stats` - Update user statistics

### Client-Side Storage
- **Local Storage**: Daily affirmations and preferences
- **Query Cache**: TanStack Query for API response caching
- **Service Worker**: Offline functionality and resource caching

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast bundling for production
- **Drizzle Kit**: Database migrations and schema management

### PWA Features
- **Service Worker**: Custom caching strategy for offline support
- **Web App Manifest**: Native app-like installation experience
- **Responsive Design**: Mobile-first with desktop compatibility

## Deployment Strategy

### Build Process
1. **Client Build**: Vite compiles React app to static assets
2. **Server Build**: ESBuild bundles Express server for Node.js
3. **Database Migration**: Drizzle Kit handles schema updates
4. **Asset Optimization**: Vite optimizes images and fonts

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Optimized builds with minification
- **Database**: Environment-based DATABASE_URL configuration

### Hosting Requirements
- **Node.js Environment**: Server-side Express application
- **PostgreSQL Database**: Neon Database for serverless deployment
- **Static Asset Serving**: Vite-built client assets
- **Environment Variables**: DATABASE_URL and other configuration

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Caching Strategy**: Service worker for offline functionality
- **Database Optimization**: Efficient queries with proper indexing
- **Bundle Optimization**: Tree shaking and minification via Vite

The application follows a monorepo structure with shared TypeScript types and schemas, ensuring type safety across the full stack while maintaining a clean separation between client and server concerns.