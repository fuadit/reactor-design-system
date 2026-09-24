import { type ReactNode } from "react";

export function FormField({ label, description, error, required, children }: { label: string; description?: string; error?: string; required?: boolean; children: ReactNode }) {
  return <div className="form-field"><label className="form-label">{label}{required ? <span className="required">*</span> : null}</label>{children}{error ? <span className="form-error">{error}</span> : description ? <span className="form-help">{description}</span> : null}</div>;
}