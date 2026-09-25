import { useEffect, useMemo, useState, type ReactNode } from "react";
import { readStorage, writeStorage } from "../lib/storage";
import { DirectionContext, type Direction, type DirectionContextValue } from "../contexts/DirectionContext";

const DIRECTION_KEY = "aurora-direction";

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirectionState] = useState<Direction>(() => 
    readStorage<Direction>(DIRECTION_KEY, "ltr")
  );

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === "rtl" ? "ar" : "en";
    writeStorage(DIRECTION_KEY, direction);
  }, [direction]);

  const value = useMemo<DirectionContextValue>(() => ({
    direction,
    setDirection: setDirectionState,
    toggleDirection: () => setDirectionState((current) => (current === "rtl" ? "ltr" : "rtl")),
  }), [direction]);

  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
}