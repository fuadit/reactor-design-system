import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readStorage, writeStorage } from "../lib/storage";

export type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextValue | null>(null);
const DIRECTION_KEY = "aurora-direction";

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirectionState] = useState<Direction>(() => readStorage<Direction>(DIRECTION_KEY, "ltr"));

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === "rtl" ? "ar" : "en";
    writeStorage(DIRECTION_KEY, direction);
  }, [direction]);

  const value = useMemo<DirectionContextValue>(() => ({
    direction,
    setDirection: setDirectionState,
    toggleDirection: () => setDirectionState((current) => current === "rtl" ? "ltr" : "rtl"),
  }), [direction]);

  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
}

export function useDirection(): DirectionContextValue {
  const context = useContext(DirectionContext);
  if (!context) throw new Error("useDirection must be used inside DirectionProvider");
  return context;
}
