import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage";

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));
  const update = useCallback((next: T | ((current: T) => T)) => {
    setValue((current) => {
      const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
      writeStorage(key, resolved);
      return resolved;
    });
  }, [key]);
  return [value, update] as const;
}
