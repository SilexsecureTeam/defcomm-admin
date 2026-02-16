import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const BASE_URL = "https://backend.defcomm.ng/api";

const AttendanceEvent = () => {
  const { token, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 12;
  const tabs = ["All", "Upcoming", "Ongoing", "Past", "Registered"];

  // Skeleton loader component (single card)
  const SkeletonEventCard = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="h-7 w-3/4 bg-gray-200 rounded mb-3"></div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
          <div className="h-5 w-56 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="h-11 w-full bg-gray-200 rounded-md"></div>
    </div>
  );

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!token || authLoading) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/user/event/register`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.data || [];
        console.log(data);

        // Your existing enrichment logic (unchanged)
        const enriched = data.map((reg) => {
          const desc = reg.description || "";
          let eventTitle = "Registered Event";
          let eventDate = "TBD";
          let eventLocation = "TBD";

          const dateMatch = desc.match(/Date:\s*<strong>(.*?)<\/strong>/i);
          if (dateMatch) eventDate = dateMatch[1].trim();

          const venueMatch = desc.match(/Venue:\s*<strong>(.*?)<\/strong>/i);
          if (venueMatch) {
            eventLocation = venueMatch[1].trim().replace(/&amp;/g, "&");
          }

          const preciseMatch = desc.match(
            /for\s+(?:registering as a guest\s+)?(.+?)\s+by\s+defcomm/i,
          );

          if (preciseMatch && preciseMatch[1]) {
            eventTitle = preciseMatch[1].trim();
          } else {
            const fallbackMatch = desc.match(
              /for\s+(.+?)(?:\s+by\s+defcomm|\.|<br>|thank you)/i,
            );

            if (fallbackMatch && fallbackMatch[1]) {
              let candidate = fallbackMatch[1].trim();
              candidate = candidate
                .replace(
                  /^(registering as a guest\s+for|registering as a guest|guest\s+for|as a guest\s+for|participating in)\s*/i,
                  "",
                )
                .trim();
              if (candidate) eventTitle = candidate;
            }
          }

          eventTitle = eventTitle.replace(/\b\w/g, (c) => c.toUpperCase());

          return {
            ...reg,
            displayTitle: eventTitle,
            displayDate: eventDate,
            displayLocation: eventLocation,
            displayStatus:
              reg.status === "active" ? "Registered" : reg.status || "Unknown",
          };
        });

        setRegistrations(enriched);
      } catch (err) {
        console.error("Fetch registrations error:", err);
        const msg =
          err.response?.data?.message ||
          "Failed to load your registered events. Please try again.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token, authLoading]);

  // Filter & pagination logic (unchanged)
  const filtered = registrations
    .filter((reg) => {
      if (activeTab === "All") return true;
      if (activeTab === "Registered") return reg.displayStatus === "Registered";
      return true;
    })
    .filter(
      (reg) =>
        reg.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.displayLocation?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(start, start + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const EventCard = ({ registration }) => {
    const {
      displayTitle,
      displayDate,
      displayLocation,
      displayStatus,
      submission,
    } = registration;
    const attendanceMode =
      submission?.participation_details?.attendance_mode || "N/A";

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-[#333333]/20 text-[#1A1A1A] text-xs font-medium rounded-full">
            {displayStatus}
          </span>
          <span className="px-3 py-1 bg-[#14D50A]/20 text-[#26C640] text-xs font-medium rounded-full">
            {attendanceMode}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
          {displayTitle}
        </h3>

        <div className="text-sm text-[#8A8A8A] mb-4 space-y-1">
          <div className="flex items-center">
            <span>📅 {displayDate}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{displayLocation}</span>
          </div>
        </div>

        <Link
          to={`/attendancedashboard/attendance/${registration.id}`}
          state={{ registration }}
        >
          <button className="w-full mt-2 bg-[#85AB20]/50 hover:bg-[#85AB20]/70 text-[#36460A] font-medium py-2.5 px-4 rounded-md transition-colors">
            View Details
          </button>
        </Link>
      </div>
    );
  };

  // ── Loading state with skeletons ────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton (tabs + search) */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
            <div className="flex gap-2">
              {tabs.map((_, i) => (
                <div key={i} className="h-10 w-20 bg-gray-200 rounded-md"></div>
              ))}
            </div>
            <div className="h-10 w-full md:w-64 bg-gray-200 rounded-md"></div>
          </div>

          {/* Grid of skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonEventCard key={index} />
            ))}
          </div>
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

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "bg-[#85AB20]/20 text-[#1A1A1A]"
                      : "text-[#1A1A1A]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative bg-white rounded-md w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {currentItems.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No registered events found
            {searchQuery ? ` for "${searchQuery}"` : "."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((reg) => (
              <EventCard key={reg.id} registration={reg} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] h-10 rounded-md text-sm font-medium ${
                      page === currentPage
                        ? "bg-green-500 text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (Math.abs(page - currentPage) === 2) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceEvent;
