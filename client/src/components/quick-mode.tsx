import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { starterSuggestions } from "@/lib/starter-suggestions";
import Confetti from "@/components/confetti";
import type { InsertMorningEntry } from "@shared/schema";

interface QuickModeProps {
  onComplete: () => void;
  onStatsUpdate: () => void;
}

export default function QuickMode({ onComplete, onStatsUpdate }: QuickModeProps) {
  const [identity, setIdentity] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [action, setAction] = useState("");
  const [whyTodayMatters, setWhyTodayMatters] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const createEntryMutation = useMutation({
    mutationFn: async (data: InsertMorningEntry) => {
      const response = await apiRequest("/api/morning-entries", "POST", JSON.stringify(data));
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/morning-entries"] });
      onStatsUpdate();
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save your morning entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * starterSuggestions.length);
    setAction(starterSuggestions[randomIndex]);
  };

  const handleSubmit = () => {
    if (!identity.trim() || !gratitude.trim() || !action.trim()) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required for Quick Mode",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toDateString();
    const data: InsertMorningEntry = {
      date: today,
      identity,
      feeling: `Grateful for: ${gratitude}`,
      action,
      replace: null,
      whyTodayMatters,
      starterActionSuggestionUsed: false,
      drankWater: false,
      exposedToLight: false,
      movedBody: false,
      timerCompleted: false,
      visualizationCompleted: false,
    };

    createEntryMutation.mutate(data);
  };

  return (
    <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      {showConfetti && <Confetti />}
      
      <div className="max-w-md mx-auto">
        <div className="sunrise-header text-white p-6 rounded-2xl shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Quick Mode</h2>
          <p className="text-sm opacity-90">
            2-minute intention setting to maintain your momentum
          </p>
        </div>

        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                Today I am someone who...
              </Label>
              <Textarea
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="takes action, stays positive, serves others..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                One thing I'm grateful for:
              </Label>
              <Input
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="Health, family, opportunity..."
                className="text-base"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-700 font-semibold">
                  My tiny starter action:
                </Label>
                <Button
                  onClick={getSuggestion}
                  variant="outline"
                  size="sm"
                  className="suggestion-button"
                >
                  Suggest
                </Button>
              </div>
              <Textarea
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Send one email, exercise 5 minutes..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                Why today matters:
              </Label>
              <Input
                value={whyTodayMatters}
                onChange={(e) => setWhyTodayMatters(e.target.value)}
                placeholder="To build my future, to serve others..."
                className="text-base"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={createEntryMutation.isPending}
            size="lg"
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
          >
            {createEntryMutation.isPending ? 'Saving...' : 'Complete Quick Mode'}
          </Button>
        </div>
      </div>
    </section>
  );
}