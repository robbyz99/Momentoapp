import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, MessageCircle, Twitter, Copy, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Confetti from "@/components/confetti";

interface MilestoneCelebrationProps {
  streak: number;
  onComplete: () => void;
}

export default function MilestoneCelebration({ streak, onComplete }: MilestoneCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const { toast } = useToast();

  const getMilestoneMessage = () => {
    if (streak >= 50) return "You're a Morning Momentum Master! 🏆";
    if (streak >= 21) return "You've built a powerful habit! 💪";
    if (streak >= 7) return "One week of showing up! 🌟";
    return "Great job showing up today! ✨";
  };

  const getShareMessage = () => {
    return `I've completed ${streak} mindful mornings with Morning Momentum 🌅 #MorningMomentum #MindfulMornings`;
  };

  const handleShare = async (platform: string) => {
    const message = getShareMessage();
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'text':
        if (navigator.share) {
          await navigator.share({
            title: 'Morning Momentum',
            text: message,
          });
        } else {
          // Fallback for desktop
          await navigator.clipboard.writeText(message);
          toast({
            title: "Copied to clipboard!",
            description: "Share message copied to clipboard",
          });
        }
        break;
      case 'copy':
        await navigator.clipboard.writeText(message);
        toast({
          title: "Copied to clipboard!",
          description: "Share message copied to clipboard",
        });
        break;
    }
  };

  const isMilestone = streak % 7 === 0 || streak === 21 || streak === 50;

  // Don't show celebration for non-milestone days
  if (!isMilestone) {
    onComplete();
    return null;
  }

  return (
    <section className="min-h-screen px-6 py-8 pb-20" style={{ backgroundColor: 'var(--warm-white)' }}>
      {showConfetti && <Confetti />}
      
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-8">
          <div className="sunrise-header text-white p-8 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">{getMilestoneMessage()}</h2>
            <p className="text-sm opacity-90">
              {streak} days of showing up for yourself
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Your Success</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleShare('twitter')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Twitter className="w-4 h-4 mr-3" />
                  Share on Twitter
                </Button>
                
                <Button
                  onClick={() => handleShare('text')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Share via Text
                </Button>
                
                <Button
                  onClick={() => handleShare('copy')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Copy className="w-4 h-4 mr-3" />
                  Copy Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {streak >= 7 && (
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Gift className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-800">Invite a Friend</h3>
                  <p className="text-sm text-gray-600">
                    Share Morning Momentum with a friend and both of you unlock a premium visualization track!
                  </p>
                  <Button
                    onClick={() => handleShare('text')}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
                  >
                    Send Invitation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center space-x-4">
            <Button
              onClick={onComplete}
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white"
            >
              Continue Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}