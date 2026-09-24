import { type ReactNode } from "react";
import { Icon } from "./Icon";

export function Drawer({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="drawer" role="dialog" aria-modal="true"><div className="modal-header"><h2 className="modal-title">{title}</h2><button className="icon-button" aria-label="Close" onClick={onClose}><Icon icon="solar:close-circle-linear" size={19} /></button></div><div className="modal-body">{children}</div></aside></div>;
}