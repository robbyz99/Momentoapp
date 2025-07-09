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

### 1. Welcome Section
- Daily affirmation system with localStorage persistence
- Motivational messaging and user statistics display
- Streak tracking and progress visualization

### 2. Timer Section
- Configurable breathing/meditation timer (2-5 minutes)
- Visual progress indicator with SVG circular progress
- Audio notifications for completion

### 3. Morning Checklist
- Text inputs for daily intentions and goals
- Physical wellness checkboxes (water, light, movement)
- Form validation using Zod schemas
- Automatic date-based entry creation

### 4. Reflection Section
- End-of-day reflection prompts
- Gratitude and progress tracking
- Historical reflection storage and retrieval

### 5. Navigation System
- Bottom tab navigation for mobile-first experience
- Section-based routing with visual indicators
- Smooth transitions between app sections

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
- **New Flow Sections**: Added breathing gratitude and micro-visualization components
- **UI Enhancements**: Starter action suggestion generator and improved navigation

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