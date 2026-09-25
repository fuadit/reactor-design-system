import { useContext } from "react";
import { DirectionContext, type DirectionContextValue } from "../contexts/DirectionContext";

export function useDirection(): DirectionContextValue {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used inside DirectionProvider");
  }
  return context;
}