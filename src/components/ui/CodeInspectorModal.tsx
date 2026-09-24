import { useEffect, useId } from "react";
import { Button } from "./Primitives";
import { Icon } from "./Icon";

export function CodeInspectorModal({ open, onClose, title, code }: { open: boolean; onClose: () => void; title: string; code: string }) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}><div className="modal-header"><h2 className="modal-title" id={titleId}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><Icon icon="solar:close-circle-linear" size={19} /></button></div><div className="modal-body"><pre style={{ margin: 0, padding: 16, overflow: "auto", borderRadius: 12, color: "#dce3ff", background: "#171a25", fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 11, lineHeight: 1.65 }}><code>{code}</code></pre></div><div className="modal-footer"><Button variant="outline" size="sm" onClick={onClose}>Done</Button></div></div></div>;
}