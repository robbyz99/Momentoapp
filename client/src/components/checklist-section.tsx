import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { starterSuggestions } from "@/lib/starter-suggestions";
import type { InsertMorningEntry, UserStats } from "@shared/schema";

interface ChecklistSectionProps {
  onComplete: () => void;
  onNext: () => void;
  onStatsUpdate: () => void;
}

export default function ChecklistSection({ onComplete, onNext, onStatsUpdate }: ChecklistSectionProps) {
  const [identity, setIdentity] = useState("");
  const [feeling, setFeeling] = useState("");
  const [action, setAction] = useState("");
  const [replace, setReplace] = useState("");
  const [whyTodayMatters, setWhyTodayMatters] = useState("");
  const [starterActionSuggestionUsed, setStarterActionSuggestionUsed] = useState(false);
  const [drankWater, setDrankWater] = useState(false);
  const [exposedToLight, setExposedToLight] = useState(false);
  const [movedBody, setMovedBody] = useState(false);
  
  const { toast } = useToast();
  const today = new Date().toDateString();

  const { data: existingEntry } = useQuery({
    queryKey: ["/api/morning-entries/date", today],
    staleTime: 0,
  });

  const { data: userStats } = useQuery<UserStats>({
    queryKey: ["/api/user-stats"],
    staleTime: 0,
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data: InsertMorningEntry) => {
      const response = await apiRequest("POST", "/api/morning-entries", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/morning-entries"] });
      toast({
        title: "Success!",
        description: "Morning checklist completed successfully!",
      });
      onComplete();
      updateStats();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save morning checklist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateStatsMutation = useMutation({
    mutationFn: async (stats: Partial<UserStats>) => {
      const response = await apiRequest("PUT", "/api/user-stats", stats);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-stats"] });
      onStatsUpdate();
    },
  });

  const updateStats = () => {
    if (userStats) {
      const today = new Date().toDateString();
      const lastCompletionDate = userStats.lastCompletionDate;
      
      let newStreak = userStats.currentStreak || 0;
      
      if (lastCompletionDate) {
        const lastDate = new Date(lastCompletionDate);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      updateStatsMutation.mutate({
        currentStreak: newStreak || 0,
        totalCompletions: (userStats.totalCompletions || 0) + 1,
        lastCompletionDate: today,
      });
    }
  };

  const handleSubmit = () => {
    if (existingEntry) {
      toast({
        title: "Already Completed",
        description: "You've already completed today's morning checklist!",
      });
      return;
    }

    const data: InsertMorningEntry = {
      date: today,
      identity,
      feeling,
      action,
      replace,
      whyTodayMatters,
      starterActionSuggestionUsed,
      drankWater,
      exposedToLight,
      movedBody,
      timerCompleted: true,
      visualizationCompleted: false,
    };

    createEntryMutation.mutate(data);
  };

  const getSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * starterSuggestions.length);
    setAction(starterSuggestions[randomIndex]);
    setStarterActionSuggestionUsed(true);
  };

  const allPhysicalCompleted = drankWater && exposedToLight && movedBody;

  return (
    <section className="min-h-screen px-6 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <div className="sunrise-header text-white p-4 rounded-2xl shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Morning Calibration</h2>
          <p className="text-sm opacity-90">
            Set your intention and your goals so your day moves you closer to who you want to become.
          </p>
        </div>
        
        <div className="space-y-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                Who do I want to be today?
              </Label>
              <Textarea
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="Confident, kind, focused..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                What feeling will I generate first?
              </Label>
              <Textarea
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Gratitude, joy, excitement..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-700 font-semibold">
                  What tiny starter action will I take?
                </Label>
                <Button
                  onClick={getSuggestion}
                  variant="outline"
                  size="sm"
                  className="suggestion-button"
                >
                  Need ideas?
                </Button>
              </div>
              <Textarea
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Send one important email..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                Why is it important for you to show up today?
              </Label>
              <Textarea
                value={whyTodayMatters}
                onChange={(e) => setWhyTodayMatters(e.target.value)}
                placeholder="To build my future, to serve others, to grow stronger..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                What old pattern will I replace?
              </Label>
              <Textarea
                value={replace}
                onChange={(e) => setReplace(e.target.value)}
                placeholder="Checking phone first thing..."
                className="resize-none"
                rows={2}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-lg mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Physical Foundation</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="water"
                  checked={drankWater}
                  onCheckedChange={(checked) => setDrankWater(checked as boolean)}
                />
                <Label htmlFor="water" className="text-gray-700 cursor-pointer">
                  💧 Drank water
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="light"
                  checked={exposedToLight}
                  onCheckedChange={(checked) => setExposedToLight(checked as boolean)}
                />
                <Label htmlFor="light" className="text-gray-700 cursor-pointer">
                  ☀️ Exposed to light
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="movement"
                  checked={movedBody}
                  onCheckedChange={(checked) => setMovedBody(checked as boolean)}
                />
                <Label htmlFor="movement" className="text-gray-700 cursor-pointer">
                  🏃 Moved body for 1 min
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-white text-center mb-8" style={{ background: 'linear-gradient(to right, hsl(158, 64%, 52%), hsl(158, 64%, 72%))' }}>
          <CardContent className="pt-6">
            <p className="font-semibold">
              I am greater than my environment, body, and time. I choose to be the creator of my life.
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={createEntryMutation.isPending || !!existingEntry}
            className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 h-auto"
          >
            {createEntryMutation.isPending ? "Saving..." : "Complete Morning Setup"}
          </Button>
          
          <Button
            onClick={onNext}
            variant="outline"
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg h-auto"
          >
            Continue to Reflection
          </Button>
        </div>
      </div>
    </section>
  );
}
