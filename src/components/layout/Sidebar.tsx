import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { Avatar } from "../ui/Primitives";

const nav = [
  { label: "لمحة سريعة", path: "/dashboard", icon: "solar:widget-5-bold-duotone" },
  { label: "Design system", path: "/design-system", icon: "solar:palette-round-bold-duotone" },
];

export function Sidebar({ collapsed, mobileOpen, onClose }: { collapsed: boolean; mobileOpen: boolean; onClose: () => void }) {
  const isCollapsed = collapsed;

  return <aside className={`app-sidebar ${isCollapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`} aria-label="Primary navigation">
    <div className="brand-lockup"><div className="brand-mark"><Icon icon="solar:layers-minimalistic-bold-duotone" size={20} /></div><div className="brand-copy"><div className="brand-name">Aurora</div><div className="brand-subtitle">Design language</div></div></div>
    <nav className="sidebar-nav">
      <div className="nav-group-label">Workspace</div>
      {nav.map((item) => <NavLink key={item.path} to={item.path} onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`} title={isCollapsed ? item.label : undefined}><Icon icon={item.icon} size={19} className="nav-icon" /><span className="nav-copy">{item.label}</span></NavLink>)}
      <div className="nav-group-label" style={{ marginBlockStart: 25 }}>Resources</div>
      {[{ label: "Tokens", icon: "solar:code-square-bold-duotone" }, { label: "Changelog", icon: "solar:history-bold-duotone" }].map((item) => <button className="nav-item" key={item.label} title={isCollapsed ? item.label : undefined} onClick={() => undefined}><Icon icon={item.icon} size={19} className="nav-icon" /><span className="nav-copy">{item.label}</span></button>)}
    </nav>
    <div className="sidebar-footer"><div className="sidebar-profile"><Avatar initials="NS" size="sm" /><div className="profile-copy"><div style={{ color: "var(--text)", fontSize: 12, fontWeight: 750 }}>Noura Salem</div><div style={{ marginBlockStart: 3, color: "var(--sidebar-muted)", fontSize: 10 }}>Product designer</div></div></div></div>
  </aside>;
}
