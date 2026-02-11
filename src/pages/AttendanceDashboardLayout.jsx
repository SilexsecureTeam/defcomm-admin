import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/attendancedashboard/Sidebar.jsx";
import Header from "../components/attendancedashboard/Header.jsx";
import PageTitle from "../components/attendancedashboard/PageTitle.jsx";

export default function AttendanceDashboardLayout() {
  const { isAuthenticated, loading, token } = useAuth();

  // All hooks go here — at the top level
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Debug log (safe to keep here)
  console.log("AttendanceDashboardLayout →", {
    isAuthenticated,
    hasToken: !!token,
    loading,
  });

  // Early returns are fine AFTER all hooks
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    console.log("Not authenticated → redirecting to signin");
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      <Sidebar
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

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
