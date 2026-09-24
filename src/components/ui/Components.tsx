import { useEffect, useId, useState, type ReactNode } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { Button } from "./Primitives";

export function FormField({ label, description, error, required, children }: { label: string; description?: string; error?: string; required?: boolean; children: ReactNode }) {
  return <div className="form-field"><label className="form-label">{label}{required ? <span className="required">*</span> : null}</label>{children}{error ? <span className="form-error">{error}</span> : description ? <span className="form-help">{description}</span> : null}</div>;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return <textarea className={`textarea ${props.error ? "has-error" : ""}`} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="select" {...props} />;
}

export function Checkbox({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
  return <label className="check-control"><button type="button" role="checkbox" aria-checked={checked} className={`check-box ${checked ? "is-checked" : ""}`} onClick={() => onChange?.(!checked)}>{checked ? <Icon icon="solar:check-read-bold" size={13} /> : null}</button>{label}</label>;
}

export function Radio({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: () => void }) {
  return <label className="check-control"><button type="button" role="radio" aria-checked={checked} className={`radio-box ${checked ? "is-checked" : ""}`} onClick={onChange} />{label}</label>;
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label?: string }) {
  return <label className="check-control">{label ? <span>{label}</span> : null}<button type="button" className={`toggle ${checked ? "is-on" : ""}`} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}><span className="toggle-thumb" /></button></label>;
}

export function EmptyState({ icon = "solar:box-minimalistic-bold-duotone", title, description, action }: { icon?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon icon={icon} size={25} /></div><h3 className="empty-title">{title}</h3><p className="empty-description">{description}</p>{action}</div>;
}

export function Spinner({ size = "md" }: { size?: "sm" | "md" }) { return <span className={`spinner ${size === "sm" ? "spinner-sm" : ""}`} role="status" aria-label="Loading" />; }

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return <span className="tooltip" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>{children}{visible ? <span className="tooltip-bubble" role="tooltip">{label}</span> : null}</span>;
}

export function Tabs({ items, active, onChange }: { items: string[]; active: string; onChange: (value: string) => void }) {
  return <div className="tabs" role="tablist">{items.map((item) => <button key={item} className={`tab ${active === item ? "is-active" : ""}`} role="tab" aria-selected={active === item} onClick={() => onChange(item)}>{item}</button>)}</div>;
}

export function Dropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return <div className="dropdown-wrap"><Button variant="outline" size="sm" rightIcon="solar:alt-arrow-down-linear" onClick={() => setOpen((value) => !value)}>{label}</Button>{open ? <div className="dropdown-menu" role="menu">{items.map((item) => <button className="dropdown-item" key={item} onClick={() => setOpen(false)} role="menuitem"><Icon icon="solar:arrow-right-up-linear" size={15} />{item}</button>)}</div> : null}</div>;
}

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

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true"><div className="modal-header"><h2 className="modal-title">{title}</h2><button className="icon-button" aria-label="Close" onClick={onClose}><Icon icon="solar:close-circle-linear" size={19} /></button></div><div className="modal-body">{children}</div></div></div>;
}

export function Drawer({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="drawer" role="dialog" aria-modal="true"><div className="modal-header"><h2 className="modal-title">{title}</h2><button className="icon-button" aria-label="Close" onClick={onClose}><Icon icon="solar:close-circle-linear" size={19} /></button></div><div className="modal-body">{children}</div></aside></div>;
}

export interface ToastApi { show: (title: string, description: string, tone?: "success" | "warning" | "danger" | "info") => void; }
export function ToastStack({ items, onDismiss }: { items: { id: number; title: string; description: string; tone: "success" | "warning" | "danger" | "info" }[]; onDismiss: (id: number) => void }) {
  return <div className="toast-stack" aria-live="polite">{items.map((item) => <div className="toast" key={item.id}><Icon icon={item.tone === "success" ? "solar:check-circle-bold-duotone" : item.tone === "danger" ? "solar:danger-triangle-bold-duotone" : item.tone === "warning" ? "solar:bell-bold-duotone" : "solar:info-circle-bold-duotone"} size={22} color={`var(--${item.tone === "danger" ? "danger" : item.tone})`} /><div className="toast-copy"><div className="toast-title">{item.title}</div><div className="toast-description">{item.description}</div></div><button className="toast-close" aria-label="Dismiss" onClick={() => onDismiss(item.id)}><Icon icon="solar:close-circle-linear" size={16} /></button></div>)}</div>;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
