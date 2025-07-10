import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, Clock, CheckCircle, Bell } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (preferences: {
    preferredMode: 'full' | 'quick';
    notificationsEnabled: boolean;
  }) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferredMode, setPreferredMode] = useState<'full' | 'quick'>('full');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const steps = [
    {
      title: "Welcome to Morning Momentum",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🌅</div>
          <h2 className="text-2xl font-bold text-gray-800">Start Your Day with Purpose</h2>
          <p className="text-gray-600 leading-relaxed">
            Transform your mornings with neuroscience-backed routines designed to prime your mind for positivity and productivity.
          </p>
        </div>
      )
    },
    {
      title: "What to Expect",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 text-center">Short, Intentional Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Breathe & Center</h3>
                <p className="text-sm text-gray-600">Calm your mind with guided breathing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Set Intentions</h3>
                <p className="text-sm text-gray-600">Define who you want to be today</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Visualize Success</h3>
                <p className="text-sm text-gray-600">Prime your mind for achievement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Reflect & Grow</h3>
                <p className="text-sm text-gray-600">End with gratitude and insights</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Flow",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 text-center">How do you want to start?</h2>
          <div className="space-y-4">
            <Card 
              className={`cursor-pointer transition-all ${preferredMode === 'full' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setPreferredMode('full')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Full Mode</h3>
                    <p className="text-sm text-gray-600">Complete morning routine (5-10 min)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all ${preferredMode === 'quick' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setPreferredMode('quick')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Quick Mode</h3>
                    <p className="text-sm text-gray-600">Essential intentions only (2 min)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Stay Consistent",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Daily Reminders</h2>
            <p className="text-gray-600 text-sm mt-2">
              Get gentle nudges to maintain your morning momentum
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium text-gray-800">Enable Notifications</Label>
              <p className="text-xs text-gray-600 mt-1">Optional daily reminders</p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ preferredMode, notificationsEnabled });
    }
  };

  const handleSkip = () => {
    onComplete({ preferredMode: 'full', notificationsEnabled: false });
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <button 
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[400px] flex flex-col justify-center">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              {steps[currentStep].content}
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white"
          >
            {currentStep === steps.length - 1 ? 'Begin Journey' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}