import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeMode } from "../types";
import { readStorage, writeStorage } from "../lib/storage";

export type ThemeColorKey =
  | "primary" | "secondary" | "accent" | "bg" | "surface" | "surface2" | "surface3"
  | "border" | "borderStrong" | "text" | "textSoft" | "textFaint" | "primaryStrong" | "primaryInk"
  | "success" | "successBg" | "warning" | "warningBg" | "danger" | "dangerBg" | "info" | "infoBg";

export type ThemeColors = Partial<Record<ThemeColorKey, string>>;
export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: "light" | "dark";
  colors: ThemeColors;
  activePreset: string;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setColor: (key: ThemeColorKey, value: string) => void;
  applyPreset: (preset: ThemePreset) => void;
  resetColors: () => void;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "aurora", name: "Aurora", description: "Warm coral with violet and teal",
    light: { primary: "#ef654d", secondary: "#7667e8", accent: "#37b7a1", bg: "#f5f6fa", surface: "#ffffff", surface2: "#f0f1f7", surface3: "#e8eaf2", border: "#e4e6ee", borderStrong: "#d4d7e2", text: "#1a1b22", textSoft: "#5f6475", textFaint: "#8d93a5", primaryStrong: "#d94e3c", primaryInk: "#fff9f7", success: "#229c72", successBg: "#e6f7f0", warning: "#ce851a", warningBg: "#fff4db", danger: "#d74e5b", dangerBg: "#ffebee", info: "#3975d3", infoBg: "#eaf1ff" },
    dark: { primary: "#ff775f", secondary: "#9b8fff", accent: "#54d4bc", bg: "#151720", surface: "#20232f", surface2: "#292c39", surface3: "#333746", border: "#343847", borderStrong: "#44495c", text: "#f5f5f7", textSoft: "#b6bbcb", textFaint: "#81889c", primaryStrong: "#ff947f", primaryInk: "#231518", success: "#54cf9e", successBg: "#1b3c34", warning: "#f2b858", warningBg: "#44351f", danger: "#ff7a82", dangerBg: "#44282f", info: "#76a7ff", infoBg: "#243657" }
  },
  {
    id: "ocean", name: "Ocean", description: "Confident blue with cyan accents",
    light: { primary: "#2563eb", secondary: "#6366f1", accent: "#06b6d4", bg: "#f3f7fb", surface: "#ffffff", surface2: "#eaf1f8", surface3: "#dde8f2", border: "#d8e2ec", borderStrong: "#c2d0df", text: "#172033", textSoft: "#536174", textFaint: "#8390a2", primaryStrong: "#1d4ed8", primaryInk: "#ffffff", success: "#0f9f78", successBg: "#e5f7f2", warning: "#c98512", warningBg: "#fff5df", danger: "#dc4c5a", dangerBg: "#ffedf0", info: "#1677c8", infoBg: "#e7f3ff" },
    dark: { primary: "#60a5fa", secondary: "#a5b4fc", accent: "#22d3ee", bg: "#0f1724", surface: "#172235", surface2: "#1f2d43", surface3: "#293951", border: "#30425a", borderStrong: "#425673", text: "#eef6ff", textSoft: "#b7c7d9", textFaint: "#8195ad", primaryStrong: "#93c5fd", primaryInk: "#0b1626", success: "#4fd1ae", successBg: "#163d35", warning: "#f4bf63", warningBg: "#43351f", danger: "#ff7f8c", dangerBg: "#42272e", info: "#67b7ff", infoBg: "#1d3653" }
  },
  {
    id: "emerald", name: "Emerald", description: "Fresh green with indigo contrast",
    light: { primary: "#0f9f78", secondary: "#6657d9", accent: "#14b8a6", bg: "#f3f8f6", surface: "#ffffff", surface2: "#e8f1ee", surface3: "#dce9e5", border: "#d6e3de", borderStrong: "#bfd1ca", text: "#18231f", textSoft: "#56665f", textFaint: "#87958f", primaryStrong: "#08795c", primaryInk: "#ffffff", success: "#0f9f78", successBg: "#e2f6ef", warning: "#c98512", warningBg: "#fff5df", danger: "#d64f5c", dangerBg: "#ffedf0", info: "#2877bd", infoBg: "#eaf4ff" },
    dark: { primary: "#43d6ae", secondary: "#a69cff", accent: "#2dd4bf", bg: "#101a18", surface: "#182723", surface2: "#21352f", surface3: "#2b443c", border: "#345149", borderStrong: "#47675d", text: "#eefaf6", textSoft: "#b8cec7", textFaint: "#829a92", primaryStrong: "#71e5c2", primaryInk: "#092018", success: "#54d9b4", successBg: "#173e34", warning: "#f2bf69", warningBg: "#41351f", danger: "#ff808b", dangerBg: "#42272e", info: "#75b9f5", infoBg: "#20384e" }
  },
  {
    id: "plum", name: "Plum", description: "Elegant violet with rose accents",
    light: { primary: "#7c3aed", secondary: "#db2777", accent: "#e85d9e", bg: "#f8f5fb", surface: "#ffffff", surface2: "#f0eaf6", surface3: "#e5dced", border: "#e1d8e9", borderStrong: "#cfc2da", text: "#211b27", textSoft: "#685d70", textFaint: "#978da0", primaryStrong: "#6527c7", primaryInk: "#ffffff", success: "#159570", successBg: "#e6f7f1", warning: "#c98512", warningBg: "#fff5df", danger: "#d74e69", dangerBg: "#ffedf2", info: "#4d72bd", infoBg: "#edf2ff" },
    dark: { primary: "#a78bfa", secondary: "#f472b6", accent: "#fb8fc5", bg: "#19131f", surface: "#251b2d", surface2: "#30223a", surface3: "#3d2c4a", border: "#493653", borderStrong: "#5e476b", text: "#fbf5ff", textSoft: "#c9bbd1", textFaint: "#94859d", primaryStrong: "#c4b5fd", primaryInk: "#1a1024", success: "#59d4b0", successBg: "#193c35", warning: "#f1bf69", warningBg: "#44351f", danger: "#ff8299", dangerBg: "#442732", info: "#83adf2", infoBg: "#283650" }
  },
  {
    id: "sunset", name: "Sunset", description: "Terracotta, amber and rose",
    light: { primary: "#e45b3f", secondary: "#c55a8a", accent: "#e49a36", bg: "#fbf6f2", surface: "#ffffff", surface2: "#f5ebe5", surface3: "#ecded6", border: "#e8dbd2", borderStrong: "#d6c4b8", text: "#28201d", textSoft: "#6f625c", textFaint: "#9d918a", primaryStrong: "#c9472d", primaryInk: "#ffffff", success: "#2d986f", successBg: "#e9f6f0", warning: "#bd7915", warningBg: "#fff3db", danger: "#d24d58", dangerBg: "#ffedf0", info: "#4879ad", infoBg: "#edf4fb" },
    dark: { primary: "#ff8a6e", secondary: "#e98bb3", accent: "#f3b65e", bg: "#1d1715", surface: "#2a211e", surface2: "#362a26", surface3: "#45352f", border: "#514039", borderStrong: "#675047", text: "#fff6f0", textSoft: "#d0beb4", textFaint: "#9d8a80", primaryStrong: "#ffab95", primaryInk: "#2b1510", success: "#64d0a3", successBg: "#1d3d32", warning: "#f6c56e", warningBg: "#44351f", danger: "#ff828b", dangerBg: "#45272d", info: "#8bbcf0", infoBg: "#26384c" }
  }
];

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = "aurora-theme";
const COLORS_KEY = "aurora-theme-colors";
const PRESET_KEY = "aurora-theme-preset";

function getSystemTheme(): "light" | "dark" {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreset(id: string) { return THEME_PRESETS.find((preset) => preset.id === id) ?? THEME_PRESETS[0]; }

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
    entries.forEach(([key, value]) => root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value));
    writeStorage(COLORS_KEY, colors);
    writeStorage(PRESET_KEY, activePreset);
  }, [colors, activePreset]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    resolvedTheme,
    colors,
    activePreset,
    setMode: (next) => {
      setModeState(next);
      const preset = getPreset(activePreset);
      if (activePreset !== "custom") setColors(preset[next === "system" ? resolvedTheme : next]);
    },
    toggleTheme: () => setModeState((current) => {
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
  }), [colors, mode, resolvedTheme, activePreset]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
