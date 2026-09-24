import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { BottomNavbar } from "./components/layout/BottomNavbar";
import { Dashboard } from "./pages/Dashboard";
import { DesignSystem } from "./pages/DesignSystem";
import { readStorage, writeStorage } from "./lib/storage";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => readStorage<boolean>("aurora-sidebar-collapsed", false));
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed((current) => {
    const next = !current;
    writeStorage("aurora-sidebar-collapsed", next);
    return next;
  });

  return (
    <div className="app-shell">
      <div className={`sidebar-backdrop ${mobileOpen ? "is-visible" : ""}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className={`app-main ${sidebarCollapsed ? "is-expanded" : ""}`}>
        <Topbar onMenu={() => setMobileOpen(true)} onToggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
      <BottomNavbar />
    </div>
  );
}
