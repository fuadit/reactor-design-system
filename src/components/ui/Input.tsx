import type {  InputHTMLAttributes } from "react";

export function Input({ error = false, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input className={`input ${error ? "has-error" : ""} ${className}`} {...props} />;
}
