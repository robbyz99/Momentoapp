import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import WelcomeSection from "@/components/welcome-section";
import BreathingGratitude from "@/components/breathing-gratitude";
import TimerSection from "@/components/timer-section";
import ChecklistSection from "@/components/checklist-section";
import MicroVisualization from "@/components/micro-visualization";
import ReflectionSection from "@/components/reflection-section";
import Confetti from "@/components/confetti";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { UserStats } from "@shared/schema";

type Section = "welcome" | "breathing" | "timer" | "checklist" | "visualization" | "reflection";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("welcome");
  const [showConfetti, setShowConfetti] = useState(false);
  const [dailyAffirmation, setDailyAffirmation] = useLocalStorage("dailyAffirmation", "");
  const [affirmationDate, setAffirmationDate] = useLocalStorage("affirmationDate", "");

  const { data: userStats, refetch: refetchStats } = useQuery<UserStats>({
    queryKey: ["/api/user-stats"],
    staleTime: 0,
  });

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
  }, []);

  const handleCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
  };

  const handleStatsUpdate = () => {
    refetchStats();
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "welcome":
        return (
          <WelcomeSection
            onStartDay={() => setCurrentSection("breathing")}
            userStats={userStats}
            dailyAffirmation={dailyAffirmation}
            setDailyAffirmation={setDailyAffirmation}
            affirmationDate={affirmationDate}
            setAffirmationDate={setAffirmationDate}
          />
        );
      case "breathing":
        return (
          <BreathingGratitude
            onComplete={() => setCurrentSection("timer")}
          />
        );
      case "timer":
        return (
          <TimerSection
            onComplete={handleCelebration}
            onNext={() => setCurrentSection("checklist")}
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
        return <ReflectionSection onComplete={handleCelebration} />;
      default:
        return <WelcomeSection onStartDay={() => setCurrentSection("breathing")} userStats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--warm-white)' }}>
      {showConfetti && <Confetti />}
      
      <main className="pb-20">
        {renderCurrentSection()}
      </main>
      
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange}
      />
    </div>
  );
}
