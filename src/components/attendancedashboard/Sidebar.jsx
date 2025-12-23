import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Award,
  Gift,
  ChevronLeft,
  ChevronRight,
  X,
  Settings,
  ChartColumn,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { LogOut } from "lucide-react";

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
    to: "/attendancedashboard/attendance",
    icon: Users,
    label: "Attendance",
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

const Items = [
  { to: "/attendancedashboard/setting", icon: Settings, label: "Settings" },

  { to: "/signin", icon: LogOut, label: "Signout" },
];

export default function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#36460A_0%,_#85AB20_100%)] ">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-90 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-50 text-white flex flex-col justify-between
    transition-all duration-300 ease-in-out
     h-full overflow-x-auto"  
    
    lg:relative lg:z-auto
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    ${isCollapsed ? "w-50 lg:w-20" : "w-50"}
  `}
      >
        {/* Logo + Controls */}
        <div className="flex items-center justify-between p-4 ">
          <div
            className={`font-bold text-xl whitespace-nowrap overflow-hidden transition-all ${
              isCollapsed ? "lg:opacity-0 lg:w-0" : "lg:opacity-100"
            }`}
          >
            <img src={logo} alt="Defcomm" className="h-10 w-40" />
          </div>

          <div className="flex items-center gap-1">
            {/* Collapse Toggle - Desktop only */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex   transition"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            {/* Close Button - Mobile only */}
            <button
              onClick={onMobileClose}
              className="p-2 hover:bg-gray-800 rounded lg:hidden"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1 overflow-x-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 hover:bg-[#8BAF2B]/40 transition-all ${
                  isActive ? "bg-[#8BAF2B]/40 border-l-4 border-green-500 " : ""
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
        <div className="mt-4 overflow-x-auto">
          {Items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 hover:bg-[#8BAF2B]/40 transition-all ${
                  isActive ? "bg-[#8BAF2B]/40 border-l-4 border-green-500 " : ""
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
        </div>
      </aside>
    </div>
  );
}
