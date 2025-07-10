import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import OnboardingFlow from "@/components/onboarding-flow";
import WelcomeSection from "@/components/welcome-section";
import BreatheCentre from "@/components/breathe-center";
import QuickMode from "@/components/quick-mode";
import ChecklistSection from "@/components/checklist-section";
import MicroVisualization from "@/components/micro-visualization";
import ReflectionSection from "@/components/reflection-section";
import MilestoneCelebration from "@/components/milestone-celebration";
import Confetti from "@/components/confetti";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { trackEvent } from "@/lib/analytics";
import type { UserStats } from "@shared/schema";

type Section = "onboarding" | "welcome" | "breathe" | "quick" | "checklist" | "visualization" | "reflection" | "milestone";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("welcome");
  const [showConfetti, setShowConfetti] = useState(false);
  const [dailyAffirmation, setDailyAffirmation] = useLocalStorage("dailyAffirmation", "");
  const [affirmationDate, setAffirmationDate] = useLocalStorage("affirmationDate", "");
  const [isOnboarded, setIsOnboarded] = useLocalStorage("isOnboarded", false);
  const [userPreferences, setUserPreferences] = useLocalStorage("userPreferences", {
    preferredMode: 'full',
    notificationsEnabled: false
  });

  const { data: userStats, refetch: refetchStats } = useQuery<UserStats>({
    queryKey: ["/api/user-stats"],
    staleTime: 0,
  });

  // Check if user needs onboarding
  useEffect(() => {
    if (!isOnboarded) {
      setCurrentSection("onboarding");
    }
  }, [isOnboarded]);

  useEffect(() => {
    // Service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
    
    // Track app open
    trackEvent('app_open');
  }, []);

  const handleCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    trackEvent('section_navigation', { from: currentSection, to: section });
  };

  const handleStatsUpdate = () => {
    refetchStats();
  };

  const handleOnboardingComplete = (preferences: { preferredMode: 'full' | 'quick'; notificationsEnabled: boolean }) => {
    setUserPreferences(preferences);
    setIsOnboarded(true);
    setCurrentSection("welcome");
    trackEvent('onboarding_completed', { preferredMode: preferences.preferredMode, notificationsEnabled: preferences.notificationsEnabled });
  };

  const checkForMilestone = () => {
    const streak = userStats?.currentStreak || 0;
    const isMilestone = streak % 7 === 0 || streak === 21 || streak === 50;
    
    if (isMilestone && streak > 0) {
      setCurrentSection("milestone");
    } else {
      setCurrentSection("welcome");
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "onboarding":
        return (
          <OnboardingFlow
            onComplete={handleOnboardingComplete}
          />
        );
      case "welcome":
        return (
          <WelcomeSection
            onStartDay={() => {
              setCurrentSection("breathe");
              trackEvent('start_day_pressed');
            }}
            onQuickMode={() => {
              setCurrentSection("quick");
              trackEvent('quick_mode_used');
            }}
            userStats={userStats}
            dailyAffirmation={dailyAffirmation}
            setDailyAffirmation={setDailyAffirmation}
            affirmationDate={affirmationDate}
            setAffirmationDate={setAffirmationDate}
          />
        );
      case "breathe":
        return (
          <BreatheCentre
            onComplete={() => setCurrentSection("checklist")}
          />
        );
      case "quick":
        return (
          <QuickMode
            onComplete={checkForMilestone}
            onStatsUpdate={handleStatsUpdate}
          />
        );
      case "checklist":
        return (
          <ChecklistSection
            onComplete={() => setCurrentSection("visualization")}
            onNext={() => setCurrentSection("reflection")}
            onStatsUpdate={handleStatsUpdate}
          />
        );
      case "visualization":
        return (
          <MicroVisualization
            onComplete={() => {
              handleCelebration();
              setCurrentSection("reflection");
            }}
          />
        );
      case "reflection":
        return <ReflectionSection onComplete={checkForMilestone} />;
      case "milestone":
        return (
          <MilestoneCelebration
            streak={userStats?.currentStreak || 0}
            onComplete={() => setCurrentSection("welcome")}
          />
        );
      default:
        return <WelcomeSection onStartDay={() => setCurrentSection("breathe")} userStats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--warm-white)' }}>
      {showConfetti && <Confetti />}
      
      <main className="pb-20">
        {renderCurrentSection()}
      </main>
      
      {/* Hide navigation during onboarding and milestone celebration */}
      {currentSection !== "onboarding" && currentSection !== "milestone" && (
        <Navigation 
          currentSection={currentSection} 
          onSectionChange={handleSectionChange}
        />
      )}
    </div>
  );
}
