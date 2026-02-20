import React, { useState } from "react";
import { Search, Package, Gift, Wine, Shirt } from "lucide-react";
import image1 from "../../assets/T-shirt-Mockup.png";
import image2 from "../../assets/Tumbler-Bottle.png";

const SouvenirAttendance = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [souvenirs, setSouvenirs] = useState([
    {
      id: 1,
      name: "Defcomm T-Shirt",
      type: "Physical Souvenir",
      limited: 8,
      status: "Available",
      image: image1,
    },
    {
      id: 2,
      name: "Insulated Bottle",
      type: "Physical Souvenir",
      limited: 8,
      status: "Available",
      image: image2,
    },
  ]);

  const filters = ["All", "Available", "Pending", "Claimed"];

  // Filter by status
  const statusFiltered =
    activeFilter === "All"
      ? souvenirs
      : souvenirs.filter((s) => s.status === activeFilter);

  // Further filter by search term
  const displayedSouvenirs = statusFiltered.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Dynamic progress calculations
  const totalSouvenirs = souvenirs.length;
  const claimedSouvenirs = souvenirs.filter(
    (s) => s.status === "Claimed",
  ).length;
  const availableSouvenirs = souvenirs.filter(
    (s) => s.status === "Available",
  ).length;

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

  const getButtonStyles = (status) => {
    switch (status) {
      case "Available":
        return "bg-[#36460A] hover:bg-[#2a3808] text-white";
      case "Claimed":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "Pending":
      default:
        return "bg-gray-400 text-gray-700 cursor-not-allowed";
    }
  };

  const handleClaimToggle = (id) => {
    setSouvenirs((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Available"
                  ? "Claimed"
                  : item.status === "Claimed"
                    ? "Available"
                    : item.status,
              limited:
                item.status === "Available"
                  ? item.limited - 1
                  : item.status === "Claimed"
                    ? item.limited + 1
                    : item.limited,
            }
          : item,
      ),
    );
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
                  className="h-full bg-[#36460A] rounded-full transition-all duration-500"
                  style={{
                    width: `${(claimedSouvenirs / totalSouvenirs) * 100 || 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-black font-bold mt-2">
              {availableSouvenirs > 0
                ? `You have ${availableSouvenirs} souvenir${availableSouvenirs > 1 ? "s" : ""} to claim`
                : "Congratulations! You have claimed all souvenirs!"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search souvenirs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                      : "bg-[#85AB20]/20 text-[#1A1A1A]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Souvenir Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSouvenirs.map((souvenir) => (
              <div
                key={souvenir.id}
                className="bg-white pb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Wrapper with Hover Effect */}
                <div className="relative w-full h-58 overflow-hidden">
                  {souvenir.image ? (
                    <img
                      src={souvenir.image}
                      alt={souvenir.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  ) : (
                    <div className="bg-[#333333] h-full flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="mt-6 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {souvenir.name.includes("T-Shirt") && (
                        <Shirt className="w-6 h-6 text-[#36460A]" />
                      )}
                      {souvenir.name.includes("Bottle") && (
                        <Wine className="w-6 h-6 text-[#36460A]" />
                      )}
                      {!souvenir.name.includes("T-Shirt") &&
                        !souvenir.name.includes("Bottle") && (
                          <Gift className="w-6 h-6 text-[#36460A]" />
                        )}
                      <h3 className="font-semibold text-[#1A1A1A]">
                        {souvenir.name}
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        souvenir.status,
                      )}`}
                    >
                      {souvenir.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#333333]/80 mb-1">
                    {souvenir.type}
                  </p>
                  {/* <p
                    className={`text-sm mb-4 ${souvenir.limited <= 3 ? "text-red-600 font-medium" : "text-[#333333]/80"}`}
                  >
                    {souvenir.limited} left in stock
                  </p> */}

                  {/* Dynamic Claim / Unclaim Button */}
                  <button
                    onClick={() => handleClaimToggle(souvenir.id)}
                    disabled={souvenir.status === "Pending"}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors ${getButtonStyles(
                      souvenir.status,
                    )}`}
                  >
                    {souvenir.status === "Available"
                      ? "Claim Now"
                      : souvenir.status === "Claimed"
                        ? "Unclaim"
                        : "Pending"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default SouvenirAttendance;
