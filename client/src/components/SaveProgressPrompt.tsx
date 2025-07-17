import React from "react";

type Props = {
  onShowAuth: () => void;
};

export const SaveProgressPrompt: React.FC<Props> = ({ onShowAuth }) => (
  <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40">
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-bold"
      onClick={onShowAuth}
    >
      Save Your Progress
    </button>
  </div>
); 