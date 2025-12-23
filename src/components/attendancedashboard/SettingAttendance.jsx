import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Globe,
  Grid3x3,
  List,
  AlertTriangle,
} from "lucide-react";
import avatar from "../../assets/avatar.png";

const SettingAttendance = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("********");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [eventReminders, setEventReminders] = useState(true);
  const [clockInReminders, setClockInReminders] = useState(true);
  const [certificateReady, setCertificateReady] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [eventViewStyle, setEventViewStyle] = useState("grid");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Profile Information
              </h2>
              <p className="text-sm text-[#8A8A8A] mt-1">
                Upload your profile and personal details here.
              </p>
            </div>
            <button className="bg-[#85AB20] hover:bg-[#85AB20]/80 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>

          <div className="flex gap-6">
            {/* Profile Picture */}
            <div className="">
              <div className="w-20 h-20 rounded-full  flex items-center justify-center overflow-hidden">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full px-4 py-2 border border-[#85AB20] text-[#5E6366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#85AB20]/70 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="w-full px-4 py-2 border border-[#85AB20] text-[#5E6366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#85AB20]/70 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="Type here"
                  className="w-full px-4 py-2 border border-[#85AB20] text-[#5E6366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#85AB20]/70 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value="Attendee"
                  readOnly
                  className="w-full px-4 py-2 border-none rounded-md bg-[#333333]/20 text-[#5E6366] cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              Account Settings
            </h2>
            <p className="text-sm text-[#8A8A8A] mt-1">
              Manage your regional setting and login identifier
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                User Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full px-4 py-2 border border-[#85AB20] text-[#5E6366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#85AB20]/70 focus:border-transparent appearance-none bg-whitet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Language & Region
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2 border border-[#85AB20] text-[#5E6366] rounded-md focus:outline-none focus:ring-2 focus:ring-[#85AB20]/70 focus:border-transparent appearance-none bg-white">
                  <option>English(United States)</option>
                  <option>Spanish(Spain)</option>
                  <option>French(France)</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              Account Security
            </h2>
            <p className="text-sm text-[#8A8A8A] mt-1">
              Ensure your account is secure
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button className="ml-4 bg-[#85AB20]/20 px-3 hover:bg-green-200 text-[#85AB20]px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <p className="text-xs text-[#8A8A8A] mt-2">
            Password must be at least{" "}
            <span className="font-semibold text-[#36460A]">8 Characters</span>{" "}
            and must contain at least{" "}
            <span className="font-semibold text-[#36460A]">
              1 Capital <br /> Letter
            </span>{" "}
            / <span className="font-semibold text-[#36460A]">1 Number</span> /{" "}
            <span className="font-semibold text-[#36460A]">
              1 Special Character
            </span>
            .
          </p>

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-[#8A8A8A] mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Active Sessions
              </h2>
              <p className="text-sm text-[#8A8A8A] mt-1">
                You are logged in on 2 other devices
              </p>
            </div>
            <button className="text-[#E33629] hover:text-red-700 border border-[#E33629] hover:border-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign out of all devices
            </button>
          </div>
        </div>

        {/* Notifications and Preferences Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Notifications
              </h2>
              <p className="text-sm text-[#8A8A8A] mt-1">
                Choose what we get in touch about
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Event Reminders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventReminders}
                    onChange={(e) => setEventReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Clock-in Reminders
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clockInReminders}
                    onChange={(e) => setClockInReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Certificate Ready</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={certificateReady}
                    onChange={(e) => setCertificateReady(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Security Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securityAlerts}
                    onChange={(e) => setSecurityAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Preferences
              </h2>
              <p className="text-sm text-[#8A8A8A] mt-1">
                Customise your dashboard experience
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="(GMT- 8:00) WAT"
                    readOnly
                    className="w-full px-4 py-2 pr-10 border border-[#85AB20] rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event view style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEventViewStyle("grid")}
                    className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-md border transition-colors ${
                      eventViewStyle === "grid"
                        ? "bg-green-100 border-[#85AB20] text-green-700"
                        : "bg-white border-gray-300 text-[#36460A]/30 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                    <span className="text-sm font-medium">Grid</span>
                  </button>
                  <button
                    onClick={() => setEventViewStyle("list")}
                    className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-md border transition-colors ${
                      eventViewStyle === "list"
                        ? "bg-green-100 border-[#85AB20] text-green-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                    <span className="text-sm font-medium">List</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Dark Mode
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-semibold text-red-600">Warning</span>
          </div>

          <div className="bg-red-50  rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">
                  Delete Account
                </h3>
                <p className="text-xs text-gray-600">
                  Once you delete your account, you won't be able to recover it.
                  Please be Certain.
                </p>
              </div>
              <button className="bg-white hover:bg-red-50 text-red-600  px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ml-4">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingAttendance;
