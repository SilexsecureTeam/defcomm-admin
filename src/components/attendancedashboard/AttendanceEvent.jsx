import React, { useState } from "react";
import { Search, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";

const AttendanceEvent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Upcoming", "Ongoing", "Past", "Registered"];
  const itemsPerPage = 12;

  // Mock data - in production this would come from API
  const allEvents = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    title: "SecureComm Hack & Build Challenge",
    date: "January 12, 2025",
    time: "9:00 AM",
    location: "Virtual",
    attendees: 0,
    status:
      i % 4 === 0
        ? "Upcoming"
        : i % 4 === 1
        ? "Ongoing"
        : i % 4 === 2
        ? "Past"
        : "Upcoming",
    registrationOpen: i % 3 === 0,
    isCreateCard: i % 8 === 0,
  }));

  // Filter events based on active tab
  const filteredEvents = allEvents.filter((event) => {
    if (activeTab === "All") return true;
    return event.status === activeTab;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const EventCard = ({ event }) => {
    if (event) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-[#333333]/20 text-[#1A1A1A] text-xs font-medium rounded-full">
              {event.status}
            </span>
            <span className="px-3 py-1 bg-[#14D50A]/20 text-[#26C640] text-xs font-medium rounded-full">
              Create event
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
            {event.title}
          </h3>
          <div className="text-sm text-[#8A8A8A] mb-1 flex items-center">
            {event.date}, {event.time}{" "}
            <h2 className="bg-[#333333] h-2 w-2 rounded-full ml-2"></h2>
            <span className="text-[#8A8A8A] ml-2">{event.location}</span>
          </div>

          <button className="w-full mt-2 bg-[#85AB20]/50 hover:bg-[#85AB20]/70 text-[#36460A] font-medium py-2.5 px-4 rounded-md transition-colors">
            View Details
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              event.status === "Ongoing"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {event.status}
          </span>
          {event.registrationOpen && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Create event
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          {event.title}
        </h3>
        <div className="text-sm text-gray-600 mb-1">
          {event.date}, {event.time}
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{event.attendees}</span>
          </div>
        </div>
        <button className="w-full bg-green-200 hover:bg-green-300 text-gray-800 font-medium py-2.5 px-4 rounded-md transition-colors">
          View Details
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs and Search */}
        <div className=" mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-md text-sm text-[#1A1A1A] font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab ? "bg-[#85AB20]/20 " : "bg-none"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative bg-white rounded-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and one page on each side of current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] h-10 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-green-500 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
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
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceEvent;
