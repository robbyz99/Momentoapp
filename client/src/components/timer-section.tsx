import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TimerSectionProps {
  onComplete: () => void;
  onNext: () => void;
}

export default function TimerSection({ onComplete, onNext }: TimerSectionProps) {
  const [duration, setDuration] = useState(120); // 2 minutes default
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleDurationChange = (minutes: number) => {
    const newDuration = minutes * 60;
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsRunning(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    onNext();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pb-20">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Breathe & Visualize</h2>
        <p className="text-gray-600 mb-8">
          Take a moment to center yourself and visualize your best self moving confidently through your day.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className={`breathing-circle ${isRunning ? 'animate-pulse-slow' : ''}`}></div>
        </div>
        
        <div className="text-6xl font-bold text-gray-800 mb-8">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center mb-8">
          <svg className="w-24 h-24 progress-ring">
            <circle
              className="progress-ring-circle"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="transparent"
              r="45"
              cx="48"
              cy="48"
            />
            <circle
              className="progress-ring-circle"
              stroke="#10B981"
              strokeWidth="4"
              fill="transparent"
              r="45"
              cx="48"
              cy="48"
              style={{ strokeDashoffset }}
            />
          </svg>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            onClick={() => handleDurationChange(2)}
            className="px-4 py-2"
            disabled={isRunning}
          >
            2 min
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDurationChange(3)}
            className="px-4 py-2"
            disabled={isRunning}
          >
            3 min
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDurationChange(5)}
            className="px-4 py-2"
            disabled={isRunning}
          >
            5 min
          </Button>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleTimerToggle}
            className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 h-auto"
          >
            {isRunning ? 'Pause' : timeLeft === 0 ? 'Start Breathing' : 'Resume'}
          </Button>
          
          {timeLeft === 0 && (
            <Button
              onClick={handleComplete}
              variant="outline"
              className="w-full py-4 px-6 rounded-2xl font-semibold text-lg h-auto"
            >
              Continue to Planning
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
