import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipForward } from "lucide-react";

interface BreatheCenterProps {
  onComplete: () => void;
}

export default function BreatheCentre({ onComplete }: BreatheCenterProps) {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [isBreathing, setIsBreathing] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerDuration, setTimerDuration] = useState(2);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breathingCompleted, setBreathingCompleted] = useState(false);

  const breathingCycles = [
    { inhale: 4, hold: 4, exhale: 4, rest: 2 },
    { inhale: 4, hold: 6, exhale: 6, rest: 2 },
    { inhale: 6, hold: 6, exhale: 8, rest: 2 }
  ];

  const gratitudePrompts = [
    "Take a moment to appreciate your breath",
    "Notice three things you can see around you",
    "Feel grateful for this moment of calm"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing && currentCycle < 3) {
      const cycle = breathingCycles[currentCycle];
      let phaseTime = 0;
      
      interval = setInterval(() => {
        phaseTime += 100;
        
        if (breathingPhase === 'inhale' && phaseTime >= cycle.inhale * 1000) {
          setBreathingPhase('hold');
          phaseTime = 0;
        } else if (breathingPhase === 'hold' && phaseTime >= cycle.hold * 1000) {
          setBreathingPhase('exhale');
          phaseTime = 0;
        } else if (breathingPhase === 'exhale' && phaseTime >= cycle.exhale * 1000) {
          setBreathingPhase('rest');
          phaseTime = 0;
        } else if (breathingPhase === 'rest' && phaseTime >= cycle.rest * 1000) {
          setCurrentCycle(prev => prev + 1);
          setBreathingPhase('inhale');
          phaseTime = 0;
        }
      }, 100);
    }

    if (currentCycle >= 3) {
      setIsBreathing(false);
      setBreathingCompleted(true);
    }

    return () => clearInterval(interval);
  }, [isBreathing, currentCycle, breathingPhase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timerRemaining]);

  const startBreathing = () => {
    setIsBreathing(true);
    setCurrentCycle(0);
    setBreathingPhase('inhale');
  };

  const startTimer = () => {
    setTimerRemaining(timerDuration * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const skipToTimer = () => {
    setBreathingCompleted(true);
    setShowTimer(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Breathe out gently...';
      case 'rest': return 'Rest and prepare...';
      default: return 'Ready to breathe?';
    }
  };

  const getCircleScale = () => {
    switch (breathingPhase) {
      case 'inhale': return 'scale-110';
      case 'hold': return 'scale-110';
      case 'exhale': return 'scale-75';
      case 'rest': return 'scale-75';
      default: return 'scale-100';
    }
  };

  if (showTimer) {
    return (
      <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
        <div className="max-w-md mx-auto">
          <div className="sunrise-header text-white p-6 rounded-2xl shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Extended Meditation</h2>
            <p className="text-sm opacity-90">
              Deepen your practice with focused breathing
            </p>
          </div>

          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-48 h-48 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={565.48}
                    strokeDashoffset={565.48 * (1 - (timerDuration * 60 - timerRemaining) / (timerDuration * 60))}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    {formatTime(timerRemaining)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {isTimerRunning ? 'Breathing...' : 'Paused'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[2, 3, 4, 5].map((duration) => (
                  <Button
                    key={duration}
                    onClick={() => setTimerDuration(duration)}
                    variant={timerDuration === duration ? "default" : "outline"}
                    size="sm"
                    disabled={isTimerRunning}
                  >
                    {duration}m
                  </Button>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                {!isTimerRunning && timerRemaining === 0 && (
                  <Button onClick={startTimer} size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Start Timer
                  </Button>
                )}
                {timerRemaining > 0 && (
                  <Button onClick={toggleTimer} size="lg">
                    {isTimerRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isTimerRunning ? 'Pause' : 'Resume'}
                  </Button>
                )}
                <Button onClick={onComplete} variant="outline" size="lg">
                  <SkipForward className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-md mx-auto">
        <div className="sunrise-header text-white p-6 rounded-2xl shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Breathe & Center</h2>
          <p className="text-sm opacity-90">
            Calm your mind and set positive intentions
          </p>
        </div>

        <div className="text-center space-y-8">
          {!isBreathing && !breathingCompleted && (
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-lg font-semibold text-gray-800">
                    Ready for 3 cycles of guided breathing?
                  </div>
                  <div className="text-sm text-gray-600">
                    Each cycle will guide you through inhale, hold, exhale, and rest phases
                  </div>
                  <Button onClick={startBreathing} size="lg">
                    Begin Breathing
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isBreathing && (
            <div className="space-y-6">
              <div className="text-lg font-semibold text-gray-800">
                Cycle {currentCycle + 1} of 3
              </div>
              
              <div className="relative flex items-center justify-center">
                <div 
                  className={`w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 transition-transform duration-1000 ${getCircleScale()}`}
                />
              </div>
              
              <div className="text-xl font-medium text-gray-800">
                {getBreathingInstruction()}
              </div>
              
              <div className="text-sm text-gray-600">
                {gratitudePrompts[currentCycle] || gratitudePrompts[0]}
              </div>

              <Button onClick={skipToTimer} variant="outline" size="sm">
                Skip to Timer
              </Button>
            </div>
          )}

          {breathingCompleted && !showTimer && (
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-lg font-semibold text-gray-800">
                    Beautiful! You've completed the breathing cycles.
                  </div>
                  <div className="text-sm text-gray-600">
                    Would you like to extend your practice with a meditation timer?
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setShowTimer(true)} size="lg">
                      Add Timer
                    </Button>
                    <Button onClick={onComplete} variant="outline" size="lg">
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}