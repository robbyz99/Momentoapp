import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

interface MicroVisualizationProps {
  onComplete: () => void;
}

export default function MicroVisualization({ onComplete }: MicroVisualizationProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setTimeout(() => onComplete(), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onComplete]);

  const startVisualization = () => {
    setIsActive(true);
    setTimeLeft(15);
  };

  const handleDone = () => {
    setIsActive(false);
    onComplete();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pb-20 sunrise-header">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white mr-3" />
          <h2 className="text-3xl font-bold text-white">Visualize Success</h2>
        </div>
        
        <Card className="mb-8 bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              ✨ Take 15 seconds to imagine yourself at the end of today, having achieved your goals, feeling proud, calm, and grateful.
            </p>
            
            {isActive && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-pulse-slow">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-primary mb-2">
                    {timeLeft}
                  </div>
                  <div className="text-sm text-gray-600">
                    Visualizing your successful day...
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center mb-4">
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                size="sm"
                className="mr-2"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <span className="text-sm text-gray-600 self-center">
                {soundEnabled ? 'Sound On' : 'Sound Off'}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {!isActive && (
            <>
              <Button 
                onClick={startVisualization}
                className="w-full bg-white text-orange-600 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 h-auto"
              >
                Start Visualization
              </Button>
              <Button 
                onClick={handleDone}
                variant="outline"
                className="w-full py-3 px-6 rounded-2xl font-semibold border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-200 h-auto"
              >
                Skip
              </Button>
            </>
          )}
          
          {isActive && (
            <Button 
              onClick={handleDone}
              className="w-full bg-white text-orange-600 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 h-auto"
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}