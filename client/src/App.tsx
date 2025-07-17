import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { UserProvider, useUser } from "./context/UserContext";
import { AuthModal } from "./components/AuthModal";
import { SaveProgressPrompt } from "./components/SaveProgressPrompt";
import React, { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

const AppWithAuth: React.FC = () => {
  const { user, progress } = useUser();
  const [showAuth, setShowAuth] = useState(!user);
  const [showDeferred, setShowDeferred] = useState(false);

  React.useEffect(() => {
    if (user?.isGuest && (progress.morningEntries.length > 0 || progress.reflections.length > 0)) {
      setShowDeferred(true);
    }
  }, [progress, user]);

  return (
    <>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      {showDeferred && (
        <SaveProgressPrompt
          onShowAuth={() => {
            setShowAuth(true);
            setShowDeferred(false);
          }}
        />
      )}
      <Router />
    </>
  );
};

function App() {
  return (
    <UserProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
          <AppWithAuth />
      </TooltipProvider>
    </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
