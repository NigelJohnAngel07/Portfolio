// ~/context/terminal-context.tsx
import { createContext, useContext, useState } from "react";

interface TerminalContextType {
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  closeTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | null>(null);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const toggleTerminal = () => setIsTerminalOpen((prev) => !prev);
  const closeTerminal = () => setIsTerminalOpen(false);

  return (
    <TerminalContext.Provider value={{ isTerminalOpen, toggleTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used within TerminalProvider");
  return ctx;
}