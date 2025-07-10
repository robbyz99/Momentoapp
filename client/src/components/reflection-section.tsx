import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertReflection, Reflection } from "@shared/schema";

interface ReflectionSectionProps {
  onComplete: () => void;
}

export default function ReflectionSection({ onComplete }: ReflectionSectionProps) {
  const [wellDone, setWellDone] = useState("");
  const [embodied, setEmbodied] = useState("");
  const [grateful, setGrateful] = useState("");
  
  const { toast } = useToast();
  const today = new Date().toDateString();

  const { data: reflections } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
    staleTime: 0,
  });

  const createReflectionMutation = useMutation({
    mutationFn: async (data: InsertReflection) => {
      const response = await apiRequest("POST", "/api/reflections", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      toast({
        title: "Success!",
        description: "Reflection saved successfully!",
      });
      onComplete();
      setWellDone("");
      setEmbodied("");
      setGrateful("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    const data: InsertReflection = {
      date: today,
      wellDone,
      embodied,
      grateful,
    };

    createReflectionMutation.mutate(data);
  };

  const handleExport = () => {
    if (!reflections || reflections.length === 0) {
      toast({
        title: "No Reflections",
        description: "You don't have any reflections to export yet.",
      });
      return;
    }

    const lastWeek = reflections.slice(-7);
    let exportText = 'Morning Momentum - Weekly Reflections\n\n';
    
    lastWeek.forEach(reflection => {
      exportText += `Date: ${reflection.date}\n`;
      exportText += `What I did well: ${reflection.wellDone || 'N/A'}\n`;
      exportText += `How I embodied my new self: ${reflection.embodied || 'N/A'}\n`;
      exportText += `What I'm grateful for: ${reflection.grateful || 'N/A'}\n\n`;
    });

    navigator.clipboard.writeText(exportText).then(() => {
      toast({
        title: "Exported!",
        description: "Weekly reflections copied to clipboard!",
      });
    }).catch(() => {
      toast({
        title: "Export Failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-md mx-auto">
        <div className="sunrise-header text-white p-4 rounded-2xl shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Evening Reflection</h2>
          <p className="text-sm opacity-90">
            Take a moment to appreciate your day and set intentions for tomorrow.
          </p>
        </div>
        
        <div className="space-y-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                What did I do well today?
              </Label>
              <Textarea
                value={wellDone}
                onChange={(e) => setWellDone(e.target.value)}
                placeholder="Reflect on your wins..."
                className="resize-none"
                rows={3}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                How did I embody my new self?
              </Label>
              <Textarea
                value={embodied}
                onChange={(e) => setEmbodied(e.target.value)}
                placeholder="Describe moments of growth..."
                className="resize-none"
                rows={3}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Label className="text-gray-700 font-semibold mb-2 block">
                What am I grateful for today?
              </Label>
              <Textarea
                value={grateful}
                onChange={(e) => setGrateful(e.target.value)}
                placeholder="List your gratitudes..."
                className="resize-none"
                rows={3}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex space-x-4">
          <Button
            onClick={handleSave}
            disabled={createReflectionMutation.isPending}
            className="flex-1 bg-primary text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 h-auto"
          >
            {createReflectionMutation.isPending ? "Saving..." : "Save Reflection"}
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex-1 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 h-auto"
          >
            Export Weekly
          </Button>
        </div>
      </div>
    </section>
  );
}
