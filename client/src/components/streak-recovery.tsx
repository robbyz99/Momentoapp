import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertReflection } from "@shared/schema";

interface StreakRecoveryProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function StreakRecovery({ onComplete, onSkip }: StreakRecoveryProps) {
  const [reflection, setReflection] = useState("");
  const { toast } = useToast();

  const createReflectionMutation = useMutation({
    mutationFn: async (data: InsertReflection) => {
      const response = await apiRequest("/api/reflections", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      toast({
        title: "Streak Recovered! 🎉",
        description: "Your reflection has been saved and your streak continues.",
      });
      onComplete();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRecover = () => {
    if (!reflection.trim()) {
      toast({
        title: "Please add a reflection",
        description: "A brief reflection is needed to recover your streak.",
        variant: "destructive",
      });
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const data: InsertReflection = {
      date: yesterday.toDateString(),
      wellDone: reflection,
      embodied: "Showed up with intention to maintain momentum",
      grateful: "Grateful for the opportunity to restart and continue growing",
    };

    createReflectionMutation.mutate(data);
  };

  return (
    <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your Journey Continues
          </h2>
          <p className="text-gray-600 text-center leading-relaxed">
            You missed yesterday, but your journey continues. Want to restore your streak with a quick reflection?
          </p>
        </div>

        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did you learn or appreciate yesterday?
                </label>
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Even small moments of growth or gratitude count..."
                  className="resize-none"
                  rows={4}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Grace Period:</strong> You can recover your streak once per week with a reflection. 
                  This helps maintain momentum while being gentle with yourself.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button
            onClick={handleRecover}
            disabled={createReflectionMutation.isPending}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {createReflectionMutation.isPending ? 'Recovering...' : 'Recover Streak'}
          </Button>
          
          <Button
            onClick={onSkip}
            variant="outline"
            className="w-full py-3"
          >
            Continue Without Recovery
          </Button>
        </div>
      </div>
    </section>
  );
}