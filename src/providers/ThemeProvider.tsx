import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeMode } from "../types";
import { readStorage, writeStorage } from "../lib/storage";
import { ThemeContext } from "../contexts/ThemeContext";
import {
  THEME_KEY,
  COLORS_KEY,
  PRESET_KEY,
  THEME_PRESETS,
  type ThemeColorKey,
  type ThemeColors,
  type ThemeContextValue
} from "../constants/themeConstants";

function getSystemTheme(): "light" | "dark" {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreset(id: string) {
  return THEME_PRESETS.find((preset) => preset.id === id) ?? THEME_PRESETS[0];
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStorage<ThemeMode>(THEME_KEY, "light"));
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => getSystemTheme());
  const [colors, setColors] = useState<ThemeColors>(() => {
    const storedPreset = readStorage<string>(PRESET_KEY, "aurora");
    const storedMode = readStorage<ThemeMode>(THEME_KEY, "light");
    const preset = getPreset(storedPreset);
    const initialTheme = storedMode === "dark" ? "dark" : "light";
    return readStorage<ThemeColors>(COLORS_KEY, preset[initialTheme]);
  });
  const [activePreset, setActivePreset] = useState(() => readStorage<string>(PRESET_KEY, "aurora"));
  const resolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    writeStorage(THEME_KEY, mode);
  }, [mode, resolvedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const entries = Object.entries(colors) as [ThemeColorKey, string][];
    entries.forEach(([key, value]) =>
      root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value)
    );
    writeStorage(COLORS_KEY, colors);
    writeStorage(PRESET_KEY, activePreset);
  }, [colors, activePreset]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      colors,
      activePreset,
      setMode: (next) => {
        setModeState(next);
        const preset = getPreset(activePreset);
        if (activePreset !== "custom") setColors(preset[next === "system" ? resolvedTheme : next]);
      },
      toggleTheme: () =>
        setModeState((current) => {
          const next = current === "dark" ? "light" : "dark";
          const preset = getPreset(activePreset);
          if (activePreset !== "custom") setColors(preset[next]);
          return next;
        }),
      setColor: (key, value) => {
        setActivePreset("custom");
        setColors((current) => ({ ...current, [key]: value }));
      },
      applyPreset: (preset) => {
        setActivePreset(preset.id);
        setColors(preset[resolvedTheme]);
      },
      resetColors: () => {
        const preset = getPreset("aurora");
        setActivePreset("aurora");
        setColors(preset[resolvedTheme]);
      },
    }),
    [colors, mode, resolvedTheme, activePreset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}