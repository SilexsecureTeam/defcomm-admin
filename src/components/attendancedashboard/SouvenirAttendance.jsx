import React, { useState, useEffect, useMemo } from "react";
import { Search, Gift, Wine, Shirt, ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "https://backend.defcomm.ng/api";

const SouvenirAttendance = () => {
  const { token, loading: authLoading } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = ["All", "Available", "Pending", "Claimed"];

  // Fetch souvenirs
  useEffect(() => {
    const fetchData = async () => {
      if (!token || authLoading) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/user/event/souvenir`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.data || [];
        setRegistrations(data);

        // Auto-select the event that has souvenirs
        const eventWithSouvenirs = data.find(
          (reg) => Array.isArray(reg.souvenir) && reg.souvenir.length > 0,
        );
        setSelectedEvent(
          eventWithSouvenirs?.event_id || (data[0]?.event_id ?? null),
        );
      } catch (err) {
        setError("Failed to load souvenirs. Please try again.");
        toast.error("Failed to load data");
        console.error("Error fetching souvenirs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, authLoading]);

  // Get souvenirs for selected event
  const souvenirs = useMemo(() => {
    if (!selectedEvent) return [];

    const selectedReg = registrations.find(
      (reg) => reg.event_id === selectedEvent,
    );
    if (!selectedReg) return [];

    const souvenirList = Array.isArray(selectedReg.souvenir)
      ? selectedReg.souvenir
      : [];

    return souvenirList.map((souv) => ({
      id: souv.id,
      name: souv.name || "Unnamed Souvenir",
      image: souv.image,
      status: souv.is_collected === 1 ? "Claimed" : "Available",
      type: "Physical Souvenir",
      limited: 8,
      eventName: selectedReg.event_name || selectedReg.name || "Unknown Event",
    }));
  }, [selectedEvent, registrations]);

  const statusFiltered = useMemo(
    () =>
      activeFilter === "All"
        ? souvenirs
        : souvenirs.filter((s) => s.status === activeFilter),
    [souvenirs, activeFilter],
  );

  const displayedSouvenirs = useMemo(
    () =>
      statusFiltered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.type.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [statusFiltered, searchTerm],
  );

  const totalSouvenirs = souvenirs.length;
  const claimedSouvenirs = souvenirs.filter(
    (s) => s.status === "Claimed",
  ).length;
  const availableSouvenirs = souvenirs.filter(
    (s) => s.status === "Available",
  ).length;

  const selectedEventName =
    registrations.find((reg) => reg.event_id === selectedEvent)?.event_name ||
    registrations.find((reg) => reg.event_id === selectedEvent)?.name ||
    "Select an Event";

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

  const SkeletonSouvenirCard = () => (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonSouvenirCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <p className="text-gray-600 text-lg">No events or souvenirs found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Event Selector Dropdown */}
        <div className="mb-6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-64 bg-white border border-gray-300 rounded-lg px-4 py-2 text-left flex items-center justify-between"
            >
              <span>{selectedEventName}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full md:w-64 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
                {registrations.map((reg) => (
                  <button
                    key={reg.event_id}
                    onClick={() => {
                      setSelectedEvent(reg.event_id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {reg.event_name || reg.name || "Unnamed Event"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedEvent ? (
          <>
            {/* Progress Header */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                Claim Progress for {selectedEventName}
              </h2>
              <div className="relative h-2 bg-[#000000]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#36460A] rounded-full transition-all duration-500"
                  style={{
                    width: `${(claimedSouvenirs / totalSouvenirs) * 100 || 0}%`,
                  }}
                />
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search souvenirs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
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

            {/* Souvenir Cards */}
            {displayedSouvenirs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No souvenirs found for this event
                {searchTerm ? ` matching "${searchTerm}"` : "."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedSouvenirs.map((souvenir) => (
                  <div
                    key={souvenir.id}
                    className="bg-white pb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      {souvenir.image ? (
                        <img
                          src={souvenir.image}
                          alt={souvenir.name}
                          className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="bg-[#333333] h-full flex items-center justify-center text-white">
                          No Image
                        </div>
                      )}
                    </div>

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
                      <p className="text-sm text-[#333333]/80 mb-4">
                        {souvenir.type}
                      </p>

                      <div
                        className={`w-full py-3 text-center rounded-lg font-medium bg-[#85AB20] text-white`}
                      >
                        {souvenir.status === "Claimed"
                          ? souvenir.status
                          : "✓ Claimed"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-600">
            Please select an event to view its souvenirs.
          </div>
        )}
      </div>
    </div>
  );
};

export default SouvenirAttendance;
