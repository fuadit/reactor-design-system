import { useState, type ReactNode } from "react";

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return <span className="tooltip" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>{children}{visible ? <span className="tooltip-bubble" role="tooltip">{label}</span> : null}</span>;
}