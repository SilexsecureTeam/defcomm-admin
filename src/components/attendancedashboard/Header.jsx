import { Menu, Bell } from "lucide-react";
import avatar from "../../assets/avatar.png";

export default function Header({ onMenuClick, pageTitle = "Overview" }) {
  return (
    <header className="bg-[#F8F9FB] px-6 py-4 flex items-center justify-between gap-8">
      {/* Left: Hamburger (mobile) + Overview Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-800 rounded-lg text-white lg:hidden"
        >
          <Menu size={28} />
        </button>
        <h2 className="text-xl font-semibold text-[#1A1A1A] block">
          {pageTitle}
        </h2>
      </div>

      {/* Right: Notification + Avatar + Name */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-800 rounded-lg text-[#1A1A1A] transition">
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
            <p className="text-sm font-medium text-[#1A1A1A]">Alex Turner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
