import type { ReactNode } from "react";
import type { Tone } from "../../types";


export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`status-badge status-${tone}`}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />{children}</span>;
}