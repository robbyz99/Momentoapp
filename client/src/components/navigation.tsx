import { Home, Wind, Clock, CheckSquare, Sparkles, Lightbulb } from "lucide-react";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: "welcome" | "breathing" | "timer" | "checklist" | "visualization" | "reflection") => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "welcome", label: "Start", icon: Home },
    { id: "breathing", label: "Breathe", icon: Wind },
    { id: "timer", label: "Timer", icon: Clock },
    { id: "checklist", label: "Plan", icon: CheckSquare },
    { id: "visualization", label: "Visualize", icon: Sparkles },
    { id: "reflection", label: "Reflect", icon: Lightbulb },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex justify-center space-x-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id as any)}
            className={`flex flex-col items-center py-1 px-2 transition-colors ${
              currentSection === id
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
