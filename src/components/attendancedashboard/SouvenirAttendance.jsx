import React, { useState } from "react";
import { Search, Package, Gift, Wine, Shirt } from "lucide-react";

const SouvenirAttendance = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock data for souvenirs
  const souvenirs = [
    {
      id: 1,
      name: "Defcomm 2025 T-Shirt",
      type: "Physical Souvenir",
      limited: 8,
      status: "Available",
      image: null,
    },
    {
      id: 2,
      name: "Insulated Bottle",
      type: "Physical Souvenir",
      limited: 8,
      status: "Pending",
      image: null,
    },
    {
      id: 3,
      name: "Defcomm 2025 T-Shirt",
      type: "Physical Souvenir",
      limited: 8,
      status: "Claimed",
      image: null,
    },
    {
      id: 4,
      name: "Defcomm 2025 T-Shirt",
      type: "Physical Souvenir",
      limited: 8,
      status: "Available",
      image: null,
    },
    {
      id: 5,
      name: "Insulated Bottle",
      type: "Physical Souvenir",
      limited: 8,
      status: "Pending",
      image: null,
    },
    {
      id: 6,
      name: "Defcomm 2025 T-Shirt",
      type: "Physical Souvenir",
      limited: 8,
      status: "Claimed",
      image: null,
    },
  ];

  const claimHistory = [
    {
      id: 1,
      souvenir: "Exclusive Wallpaper Pack",
      event: "Defcomm 2025",
      claimDate: "Dec 25, 2025",
      status: "Claimed",
      icon: "package",
    },
    {
      id: 2,
      souvenir: "Insulated Silver Bottle",
      event: "Cyberesc Meet Up 2024",
      claimDate: "Dec 25, 2025",
      status: "Claimed",
      icon: "bottle",
    },
    {
      id: 3,
      souvenir: "Exclusive Wallpaper Pack",
      event: "Defcomm 2025",
      claimDate: "Dec 25, 2025",
      status: "Claimed",
      icon: "package",
    },
    {
      id: 4,
      souvenir: "Exclusive Wallpaper Pack",
      event: "Cyberesc Meet Up 2024",
      claimDate: "Dec 25, 2025",
      status: "Claimed",
      icon: "package",
    },
  ];

  const filters = ["All", "Available", "Pending", "Claimed"];

  const filteredSouvenirs =
    activeFilter === "All"
      ? souvenirs
      : souvenirs.filter((s) => s.status === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Claimed":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Claim Progress View */}

        <>
          {/* Progress Header */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">
              Claim Progress
            </h2>
            <div className="relative">
              <div className="h-2 bg-[#000000]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#36460A] rounded-full transition-all"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-black font-bold mt-2">
              You have 3 Souvenirs to claim
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-[#85AB20] text-white"
                      : "bg-[#85AB20]/20 text-[#1A1A1A] "
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Souvenir Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSouvenirs.map((souvenir) => (
              <div
                key={souvenir.id}
                className="bg-white p-4 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="bg-[#333333] h-48 flex items-center justify-center"></div>

                {/* Card Content */}
                <div className="mt-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#1A1A1A] flex-1">
                      {souvenir.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        souvenir.status
                      )}`}
                    >
                      {souvenir.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#333333]/80 mb-1">
                    {souvenir.type}
                  </p>
                  <p className="text-sm text-[#333333]/80 mb-4">
                    Limited: {souvenir.limited} Left
                  </p>

                  {/* Claim Button */}
                  <button
                    // disabled={souvenir.status === "Claimed"}
                    className="w-full py-2.5 rounded-lg font-medium transition-colors bg-[#36460A] text-white"
                  >
                    Claim Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>

        {/* Claim History View */}

        <>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 mt-6">
            Claim History
          </h2>

          {/* History Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#85AB20]/30 border-b border-green-100">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A1A1A]">
                      <input type="checkbox" value="yes" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A1A1A]">
                      Souvenir
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A1A1A]">
                      Event
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A1A1A]">
                      Claim Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A1A1A]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {claimHistory.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <input type="checkbox" value="yes" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[#333333]">
                            {item.souvenir}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#333333]">
                        {item.event}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#333333]">
                        {item.claimDate}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#8A8A8A]/20 text-gray-600">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default SouvenirAttendance;
