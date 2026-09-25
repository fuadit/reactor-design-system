import { useRef, useLayoutEffect, useCallback } from "react";

type noop = (...args: any[]) => any;

/**
 * usePersistFn (similar to useEvent / useLatest)
 */
export function usePersistFn<T extends noop>(fn: T): T {
  const fnRef = useRef<T>(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  const persistFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args);
  }, []);

  return persistFn as T;
}