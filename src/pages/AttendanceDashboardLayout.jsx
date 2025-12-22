import { Outlet } from "react-router-dom";
import Sidebar from "../components/attendancedashboard/Sidebar";
import Header from "../components/attendancedashboard/Header";
import PageTitle from "../components/attendancedashboard/PageTitle";
import { useState } from "react";

export default function AttendanceDashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={<PageTitle />}
        />

        <main className="flex-1 overflow-auto bg-[#F8F9FB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
