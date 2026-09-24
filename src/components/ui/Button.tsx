import type { ButtonHTMLAttributes } from "react";
import type { ButtonSize, ButtonVariant } from "../../types";
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