import { Menu, Search, Bell } from "lucide-react";
import avatar from "../../assets/avatar.png";

export default function Header({ onMenuClick, pageTitle = "Overview" }) {
  return (
    <header className="bg-[#000000] border-b border-gray-800 px-6 py-4 flex items-center justify-between gap-8">
      {/* Left: Hamburger (mobile) + Overview Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-800 rounded-lg text-white lg:hidden"
        >
          <Menu size={28} />
        </button>
        <h3 className="text-xl font-semibold text-white hidden sm:block">
          {pageTitle}
        </h3>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-auto block md:max-w-md lg:max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports, hackers, vulnerabilities..."
            className="w-full bg-gray-900 text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
          />
        </div>
      </div>

      {/* Right: Notification + Avatar + Name */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-800 rounded-lg text-white transition">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
          />
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-white">Alex Turner</p>
            <p className="text-xs text-gray-400">Security Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
}
