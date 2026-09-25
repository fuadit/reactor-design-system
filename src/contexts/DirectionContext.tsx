import { createContext } from "react";

export type Direction = "ltr" | "rtl";

export interface DirectionContextValue {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
}

export const DirectionContext = createContext<DirectionContextValue | null>(null);