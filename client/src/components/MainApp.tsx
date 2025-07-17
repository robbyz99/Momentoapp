import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { EditProfileModal } from "./EditProfileModal";
import { useToast } from "../hooks/use-toast";

const MainApp: React.FC = () => {
  const { user, progress, setProgress, signOut } = useUser();
  const [entry, setEntry] = useState("");
  const [reflection, setReflection] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const toast = useToast();

  return (
    <div className="p-4 max-w-md mx-auto">
      <EditProfileModal open={showEdit} onClose={() => setShowEdit(false)} />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="font-bold">{user?.isGuest ? "Guest" : user?.name}</span>
          {!user?.isGuest && (
            <button className="ml-2 text-xs text-blue-600 underline" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          )}
        </div>
        <button className="text-sm text-blue-600 underline" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Add Morning Entry</h3>
        <input
          className="border rounded px-2 py-1 w-full mb-2"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="What's your focus today?"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => {
            setProgress({
              ...progress,
              morningEntries: [...progress.morningEntries, { text: entry, date: new Date().toISOString() }],
            });
            setEntry("");
            toast({ title: "Entry saved!", description: "Your morning entry was saved." });
          }}
          disabled={!entry}
        >
          Save Entry
        </button>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Add Reflection</h3>
        <input
          className="border rounded px-2 py-1 w-full mb-2"
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="Any thoughts or gratitude?"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => {
            setProgress({
              ...progress,
              reflections: [...progress.reflections, { text: reflection, date: new Date().toISOString() }],
            });
            setReflection("");
            toast({ title: "Reflection saved!", description: "Your reflection was saved." });
          }}
          disabled={!reflection}
        >
          Save Reflection
        </button>
      </div>
      <div>
        <h4 className="font-semibold">Your Progress</h4>
        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">{JSON.stringify(progress, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MainApp; 