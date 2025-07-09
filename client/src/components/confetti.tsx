import { useEffect } from "react";

export default function Confetti() {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#10B981', '#6EE7B7', '#60A5FA', '#F59E0B', '#EF4444'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      container.appendChild(confetti);
    }

    const cleanup = () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };

    const timer = setTimeout(cleanup, 5000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return null;
}
