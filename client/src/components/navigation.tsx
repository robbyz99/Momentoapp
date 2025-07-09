import { Home, Clock, CheckSquare, Lightbulb } from "lucide-react";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: "welcome" | "timer" | "checklist" | "reflection") => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "welcome", label: "Start", icon: Home },
    { id: "timer", label: "Breathe", icon: Clock },
    { id: "checklist", label: "Plan", icon: CheckSquare },
    { id: "reflection", label: "Reflect", icon: Lightbulb },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-center space-x-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id as any)}
            className={`flex flex-col items-center py-2 px-4 transition-colors ${
              currentSection === id
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
