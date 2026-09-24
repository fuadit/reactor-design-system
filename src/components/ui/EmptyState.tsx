import { type ReactNode } from "react";
import { Icon } from "./Icon";

export function EmptyState({ icon = "solar:box-minimalistic-bold-duotone", title, description, action }: { icon?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon icon={icon} size={25} /></div><h3 className="empty-title">{title}</h3><p className="empty-description">{description}</p>{action}</div>;
}
