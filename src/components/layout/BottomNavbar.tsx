import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";

const items = [
  { label: "لمحة سريعة", path: "/dashboard", icon: "solar:widget-5-bold-duotone" },
  { label: "النظام", path: "/design-system", icon: "solar:palette-round-bold-duotone" },
];

export function BottomNavbar() {
  return <nav className="mobile-nav" aria-label="Mobile navigation">
    {items.map((item) =>
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => `mobile-nav-item ${isActive ? "is-active" : ""}`}>
        <Icon icon={item.icon} size={20} />
        <span>{item.label}</span></NavLink>)}
  </nav>;
}
