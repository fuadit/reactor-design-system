import type { ReactNode } from "react";
import { Icon } from "../ui/Icon";

export function Header({
  eyebrow = "Workspace",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <div className="breadcrumbs">
          <span>{eyebrow}</span>
          <span className="inline-block ltr:rotate-0 rtl:rotate-180">
            <Icon icon="solar:alt-arrow-right-linear" size={13} />
          </span>
          <span className="current">{title}</span>
        </div>
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}