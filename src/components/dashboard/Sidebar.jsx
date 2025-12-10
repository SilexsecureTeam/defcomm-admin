import {
  Home,
  Users,
  MessageSquare,
  Send,
  FileText,
  BookOpen,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  X,
  Settings,
  ChartColumn,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LogOut } from "lucide-react";

const menuItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/reviews", icon: MessageSquare, label: "Reviews" },
  { to: "/dashboard/scoreboard", icon: MessageSquare, label: "Scoreboard" },
  { to: "/dashboard/submissions", icon: FileText, label: "Submissions" },
  { to: "/dashboard/programs", icon: BookOpen, label: "Programs" },
  { to: "/dashboard/setting", icon: Settings, label: "Settings" },
  { to: "/dashboard/analysis", icon: ChartColumn, label: "Analysis" },
  { to: "/signin", icon: LogOut, label: "Signout" },
];

export default function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <div className="bg-[#000000] ">
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
    fixed inset-y-0 left-0 z-50 text-white flex flex-col
    transition-all duration-300 ease-in-out
    bg-[#8BAF2B]/20 h-full overflow-x-auto"  
    
    lg:relative lg:z-auto
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    ${isCollapsed ? "w-50 lg:w-20" : "w-50"}
  `}
      >
        {/* Logo + Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
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
      </aside>
    </div>
  );
}
