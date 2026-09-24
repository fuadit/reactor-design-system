import type {  HTMLAttributes } from "react";

export function Card({ children, className = "", flat = false, ...props }: HTMLAttributes<HTMLDivElement> & { flat?: boolean }) {
  return <div className={`surface-card ${flat ? "flat" : ""} ${className}`} {...props}>{children}</div>;
}
