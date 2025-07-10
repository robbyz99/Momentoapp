// Analytics tracking functions for Morning Momentum
// TODO: Integrate with PostHog or Firebase Analytics

export type AnalyticsEvent = 
  | 'app_open'
  | 'start_day_pressed'
  | 'quick_mode_used'
  | 'breathing_completed'
  | 'timer_started'
  | 'timer_completed'
  | 'checklist_submitted'
  | 'visualization_completed'
  | 'reflection_submitted'
  | 'milestone_reached'
  | 'share_clicked'
  | 'referral_sent'
  | 'feedback_submitted'
  | 'streak_recovered'
  | 'onboarding_completed'
  | 'section_navigation';

export interface AnalyticsData {
  event: AnalyticsEvent;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// Mock analytics implementation - ready for real service integration
export const trackEvent = (event: AnalyticsEvent, properties?: Record<string, any>) => {
  const data: AnalyticsData = {
    event,
    properties,
    timestamp: new Date()
  };
  
  // TODO: Replace with actual analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', data);
  }
  
  // Store locally for now
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  events.push(data);
  localStorage.setItem('analytics_events', JSON.stringify(events));
};

// Utility function to track screen time
export const trackScreenTime = (screen: string, startTime: number) => {
  const duration = Date.now() - startTime;
  trackEvent('section_navigation', {
    screen,
    duration_ms: duration,
    duration_seconds: Math.round(duration / 1000)
  });
};

// Get analytics data for debugging
export const getAnalyticsData = () => {
  return JSON.parse(localStorage.getItem('analytics_events') || '[]');
};

// Clear analytics data
export const clearAnalyticsData = () => {
  localStorage.removeItem('analytics_events');
};