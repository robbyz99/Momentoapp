import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sunrise } from "lucide-react";

interface BreathingGratitudeProps {
  onComplete: () => void;
}

export default function BreathingGratitude({ onComplete }: BreathingGratitudeProps) {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('exhale');
            return 5;
          } else {
            setPhase('inhale');
            setCurrentCycle(prev => prev + 1);
            return 5;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  useEffect(() => {
    if (currentCycle >= 3) {
      setIsActive(false);
      setTimeout(() => onComplete(), 1000);
    }
  }, [currentCycle, onComplete]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentCycle(0);
    setPhase('inhale');
    setTimeLeft(5);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pb-20 sunrise-header">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <Sunrise className="w-12 h-12 text-white mr-3" />
          <h2 className="text-3xl font-bold text-white">Good Morning</h2>
        </div>
        
        <Card className="mb-8 bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Take 3 deep breaths and feel gratitude. This moment is yours.
            </p>
            
            {isActive && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="breathing-circle-gratitude mx-auto mb-4"></div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {timeLeft}
                  </div>
                  <div className="text-sm text-gray-600">
                    Cycle {currentCycle + 1} of 3
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {!isActive && currentCycle === 0 && (
            <>
              <Button 
                onClick={startBreathing}
                className="w-full bg-white text-orange-600 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 h-auto"
              >
                I'm Ready
              </Button>
              <Button 
                onClick={handleSkip}
                variant="outline"
                className="w-full py-3 px-6 rounded-2xl font-semibold border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-200 h-auto"
              >
                Skip (I'm in a rush)
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}