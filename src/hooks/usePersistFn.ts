import { useRef, useLayoutEffect, useCallback } from "react";

type noop = (...args: any[]) => any;

/**
 * usePersistFn (similar to useEvent / useLatest)
 */
export function usePersistFn<T extends noop>(fn: T): T {
  const fnRef = useRef<T>(fn);

  // تحديث المرجعية بعد كل Render لضمان القيمة الأخيرة
  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  // استخدام useCallback بمرجعية ثابتة مع تفادي الوصول المباشر للـ Ref في Render
  return useCallback(
    ((...args) => {
      return fnRef.current?.(...args);
    }) as T,
    []
  );
}