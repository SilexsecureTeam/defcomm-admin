import {
  LayoutDashboard,
  CalendarDays,
  Award,
  Gift,
  ChevronLeft,
  ChevronRight,
  X,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext"; // adjust path
import { useState } from "react";

const menuItems = [
  {
    to: "/attendancedashboard",
    icon: LayoutDashboard,
    label: "Overview",
    end: true,
  },
  {
    to: "/attendancedashboard/events",
    icon: CalendarDays,
    label: "Events",
  },
  {
    to: "/attendancedashboard/certificates",
    icon: Award,
    label: "Certificates",
  },
  {
    to: "/attendancedashboard/souvenir",
    icon: Gift,
    label: "Souvenir",
  },
];

const bottomItems = [
  {
    to: "/attendancedashboard/setting",
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}) {
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // open modal
  };

  const confirmLogout = () => {
    logout(); // clears storage, state, toast, navigates to /signin
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="bg-[linear-gradient(to_bottom,_#36460A_0%,_#85AB20_100%)]">
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 opacity-90 z-40 lg:hidden"
            onClick={onMobileClose}
          />
        )}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50 text-white flex flex-col justify-between
            transition-all duration-300 ease-in-out h-full overflow-x-auto
            lg:relative lg:z-auto
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${isCollapsed ? "w-20 lg:w-20" : "w-54"}
          `}
        >
          {/* Logo + Controls */}
          <div className="flex items-center justify-between p-4">
            <div
              className={`font-bold text-xl whitespace-nowrap overflow-hidden transition-all ${
                isCollapsed ? "lg:opacity-0 lg:w-0" : "lg:opacity-100"
              }`}
            >
              <img src={logo} alt="Defcomm" className="h-10 w-40" />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex transition"
              >
                {isCollapsed ? (
                  <ChevronRight size={20} />
                ) : (
                  <ChevronLeft size={20} />
                )}
              </button>

              <button
                onClick={onMobileClose}
                className="p-2 hover:bg-gray-800 rounded lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="mt-8 flex-1 overflow-x-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center px-6 py-4 hover:bg-[#8BAF2B]/40 transition-all ${
                    isActive
                      ? "bg-[#8BAF2B]/40 border-l-4 border-green-500"
                      : ""
                  }`
                }
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <item.icon size={isCollapsed ? 28 : 22} />
                </div>
                <span
                  className={`ml-4 font-medium transition-all ${
                    isCollapsed
                      ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                      : "lg:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Items */}
          <div className="mt-4 pb-6">
            {bottomItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center px-6 py-4 hover:bg-[#8BAF2B]/40 transition-all ${
                    isActive
                      ? "bg-[#8BAF2B]/40 border-l-4 border-green-500"
                      : ""
                  }`
                }
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <item.icon size={isCollapsed ? 28 : 22} />
                </div>
                <span
                  className={`ml-4 font-medium transition-all ${
                    isCollapsed
                      ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                      : "lg:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}

            {/* Signout Button */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-6 py-4 hover:bg-[#8BAF2B]/40 transition-all text-left"
            >
              <div className="flex items-center justify-center w-8 h-8">
                <LogOut size={isCollapsed ? 28 : 22} />
              </div>
              <span
                className={`ml-4 font-medium transition-all ${
                  isCollapsed
                    ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                    : "lg:opacity-100"
                }`}
              >
                Signout
              </span>
            </button>
          </div>
        </aside>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
