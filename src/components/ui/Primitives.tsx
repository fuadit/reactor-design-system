import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant, Tone } from "../../types";
import { Icon } from "./Icon";

export function Button({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; leftIcon?: string; rightIcon?: string }) {
  return <button className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""} ${className}`} disabled={loading || props.disabled} {...props}>
    {loading ? <span className="spinner spinner-sm" /> : leftIcon ? <Icon icon={leftIcon} size={17} /> : null}
    {children}
    {!loading && rightIcon ? <Icon icon={rightIcon} size={17} /> : null}
  </button>;
}

export function IconButton({ label, icon, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon: string }) {
  return <button className={`icon-button ${className}`} aria-label={label} {...props}><Icon icon={icon} size={18} ariaLabel={label} /></button>;
}

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`status-badge status-${tone}`}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />{children}</span>;
}

export function Avatar({ initials, size = "md", src }: { initials: string; size?: "sm" | "md" | "lg"; src?: string }) {
  return <div className={`avatar ${size === "sm" ? "avatar-sm" : size === "lg" ? "avatar-lg" : ""}`}>{src ? <img src={src} alt={initials} /> : initials}</div>;
}

export function Card({ children, className = "", flat = false, ...props }: HTMLAttributes<HTMLDivElement> & { flat?: boolean }) {
  return <div className={`surface-card ${flat ? "flat" : ""} ${className}`} {...props}>{children}</div>;
}

export function Divider() { return <div style={{ height: 1, background: "var(--border)", width: "100%" }} aria-hidden="true" />; }

export function Input({ error = false, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input className={`input ${error ? "has-error" : ""} ${className}`} {...props} />;
}
