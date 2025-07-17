import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isGuest: boolean;
};

export type Progress = {
  morningEntries: any[];
  reflections: any[];
};

type UserContextType = {
  user: User | null;
  progress: Progress;
  setUser: (user: User | null) => void;
  setProgress: (progress: Progress) => void;
  signOut: () => void;
  signInWithProvider: (provider: 'google' | 'apple') => Promise<void>;
};

const defaultProgress: Progress = { morningEntries: [], reflections: [] };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  // On mount, check for Supabase session
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { id, email, user_metadata } = session.user;
        setUser({
          id,
          name: user_metadata?.name || "",
          email: email || "",
          phone: user_metadata?.phone || "",
          isGuest: false,
        });
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      }
      const storedProgress = localStorage.getItem("progress");
      if (storedProgress) setProgress(JSON.parse(storedProgress));
    };
    getSession();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const { id, email, user_metadata } = session.user;
        setUser({
          id,
          name: user_metadata?.name || "",
          email: email || "",
          phone: user_metadata?.phone || "",
          isGuest: false,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProgress(defaultProgress);
    localStorage.removeItem("user");
    localStorage.removeItem("progress");
  };

  const signInWithProvider = async (provider: 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <UserContext.Provider value={{ user, progress, setUser, setProgress, signOut, signInWithProvider }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}; 