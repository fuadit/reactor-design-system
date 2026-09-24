import { useMemo } from "react";
import { useTheme, THEME_PRESETS, type ThemeColorKey } from "../../contexts/ThemeContext";
import type { ThemeMode } from "../../types";
import { Button } from "../ui/Primitives";
import { Drawer } from "../ui/Components";

const colorFields: { key: ThemeColorKey; label: string; description: string }[] = [
  { key: "primary", label: "Primary", description: "Main actions and active states" },
  { key: "secondary", label: "Secondary", description: "Supporting actions and accents" },
  { key: "accent", label: "Accent", description: "Highlights and data visuals" },
  { key: "bg", label: "Page background", description: "Application canvas" },
  { key: "surface", label: "Surface", description: "Cards and elevated panels" },
  { key: "surface2", label: "Surface 2", description: "Subtle containers and navigation" },
  { key: "border", label: "Border", description: "Dividers and control edges" },
  { key: "text", label: "Text", description: "Primary content color" },
  { key: "textSoft", label: "Secondary text", description: "Descriptions and supporting copy" },
  { key: "success", label: "Success", description: "Positive feedback" },
  { key: "warning", label: "Warning", description: "Attention feedback" },
  { key: "danger", label: "Danger", description: "Destructive feedback" },
  { key: "info", label: "Info", description: "Informational feedback" },
];

export function ThemeCustomizer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { mode, resolvedTheme, colors, activePreset, setMode, setColor, applyPreset, resetColors } = useTheme();
  const currentPreset = useMemo(() => THEME_PRESETS.find((preset) => preset.id === activePreset), [activePreset]);

  return <Drawer open={open} title="Customize theme" onClose={onClose}>
    <div className="theme-editor">
      <div className="theme-editor-intro">
        <strong>Build your own visual identity.</strong>
        <span>Pick a ready-made palette, then fine-tune semantic colors. Changes are saved locally.</span>
      </div>

      <div className="theme-editor-block">
        <div className="theme-editor-label-row">
          <div className="theme-editor-label">Theme presets</div>
          <span className="theme-preset-active">{currentPreset?.name ?? "Custom"}</span>
        </div>
        <div className="theme-preset-grid">
          {THEME_PRESETS.map((preset) => {
            const palette = preset[resolvedTheme];
            return <button key={preset.id} className={`theme-preset-card ${activePreset === preset.id ? "is-active" : ""}`} onClick={() => applyPreset(preset)}>
              <span className="theme-preset-swatch" style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
                <i style={{ background: palette.accent }} />
                <i style={{ background: palette.surface }} />
                <i style={{ background: palette.text }} />
              </span>
              <span className="theme-preset-copy"><strong>{preset.name}</strong><small>{preset.description}</small></span>
            </button>;
          })}
        </div>
      </div>

      <div className="theme-editor-block">
        <div className="theme-editor-label">Appearance</div>
        <div className="theme-mode-grid">
          {(["light", "dark", "system"] as ThemeMode[]).map((option) => <button key={option} className={`theme-mode-option ${mode === option ? "is-active" : ""}`} onClick={() => setMode(option)}>
            <span>{option === "light" ? "☼" : option === "dark" ? "◐" : "◌"}</span>
            <strong>{option[0].toUpperCase() + option.slice(1)}</strong>
            <small>{option === "system" ? "Follow device" : `${option[0].toUpperCase() + option.slice(1)} palette`}</small>
          </button>)}
        </div>
      </div>

      <div className="theme-editor-block">
        <div className="theme-editor-label-row">
          <div><div className="theme-editor-label">Semantic colors</div><div className="theme-editor-help">Editing any color switches this palette to Custom.</div></div>
          <button className="theme-reset-link" onClick={resetColors}>Restore Aurora</button>
        </div>
        <div className="theme-color-list">
          {colorFields.map((field) => <label className="theme-color-row" key={field.key}>
            <span><strong>{field.label}</strong><small>{field.description}</small></span>
            <span className="theme-color-control">
              <code>{colors[field.key] ?? "—"}</code>
              <input type="color" value={colors[field.key] ?? "#888888"} aria-label={`Edit ${field.label} color`} onChange={(event) => setColor(field.key, event.target.value)} />
            </span>
          </label>)}
        </div>
      </div>

      <div className="theme-editor-actions"><Button variant="ghost" onClick={resetColors}>Reset</Button><Button onClick={onClose}>Done</Button></div>
    </div>
  </Drawer>;
}
