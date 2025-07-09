import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { affirmations } from "@/lib/affirmations";
import type { UserStats } from "@shared/schema";

interface WelcomeSectionProps {
  onStartDay: () => void;
  userStats?: UserStats;
  dailyAffirmation?: string;
  setDailyAffirmation?: (affirmation: string) => void;
  affirmationDate?: string;
  setAffirmationDate?: (date: string) => void;
}

export default function WelcomeSection({ 
  onStartDay, 
  userStats,
  dailyAffirmation,
  setDailyAffirmation,
  affirmationDate,
  setAffirmationDate
}: WelcomeSectionProps) {
  useEffect(() => {
    if (setDailyAffirmation && setAffirmationDate) {
      const today = new Date().toDateString();
      
      if (affirmationDate !== today) {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        setDailyAffirmation(affirmations[randomIndex]);
        setAffirmationDate(today);
      } else if (!dailyAffirmation) {
        setDailyAffirmation(affirmations[0]);
      }
    }
  }, [dailyAffirmation, affirmationDate, setDailyAffirmation, setAffirmationDate]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pb-20">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="mb-8 w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, hsl(158, 64%, 52%), hsl(158, 64%, 72%))' }}>
          <Sun className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Morning Momentum</h1>
        
        <Card className="mb-8 shadow-xl">
          <CardContent className="pt-6">
            <p className="text-xl text-gray-700 mb-4 leading-relaxed">
              "Today is a new page. You get to choose who you are."
            </p>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-primary font-semibold">
                {dailyAffirmation || affirmations[0]}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="text-center">
            <div className="text-2xl streak-flame">🔥</div>
            <div className="text-2xl font-bold text-gray-800">
              {userStats?.currentStreak || 0}
            </div>
            <div className="text-sm text-gray-500">day streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">⭐</div>
            <div className="text-2xl font-bold text-gray-800">
              {userStats?.totalCompletions || 0}
            </div>
            <div className="text-sm text-gray-500">completed</div>
          </div>
        </div>
        
        <Button 
          onClick={onStartDay}
          className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 h-auto"
        >
          Start Your Day
        </Button>
      </div>
    </section>
  );
}
