import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Award,
  Gift,
  Download,
  Eye,
  FileText,
  Activity,
  MessageSquare,
  PlayCircle,
  CalendarDays,
  User,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import { CalendarClock } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AttendanceOverview = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const BASE_URL = "https://backend.defcomm.ng/api";
  useEffect(() => {
    if (!token) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/event/register`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.data || [];

        const enriched = data.map((reg) => {
          // Reuse same parsing logic you already have in AttendanceEvent
          const desc = reg.description || "";
          let eventTitle = "Event";
          let eventDate = "TBD";
          let eventLocation = "TBD";

          const dateMatch = desc.match(/Date:\s*<strong>(.*?)<\/strong>/i);
          if (dateMatch) eventDate = dateMatch[1].trim();

          const venueMatch = desc.match(/Venue:\s*<strong>(.*?)<\/strong>/i);
          if (venueMatch)
            eventLocation = venueMatch[1].trim().replace(/&amp;/g, "&");

          const titleMatch = desc.match(
            /for\s+(?:registering as a guest\s+)?(.+?)\s+by\s+defcomm/i,
          );
          if (titleMatch) {
            eventTitle = titleMatch[1].trim();
          }

          eventTitle = eventTitle.replace(/\b\w/g, (c) => c.toUpperCase());

          return {
            ...reg,
            displayTitle: eventTitle,
            displayDate: eventDate,
            displayLocation: eventLocation,
          };
        });

        setRegistrations(enriched.slice(0, 3)); // show only 3 recent/last ones
      } catch (err) {
        console.error(err);
        toast.error("Could not load recent events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  const statsCards = [
    {
      icon: Calendar,
      label: "Events Attended",
      value: "0",
      bgColor: "bg-white",
    },
    {
      icon: Clock,
      label: "Next Event Starts In",
      value: ".....",
      bgColor: "bg-white",
    },
    {
      icon: Award,
      label: "Certificates Earned",
      value: "0",
      bgColor: "bg-white",
    },
    {
      icon: Gift,
      label: "Souvenirs Claimed",
      value: "0",
      bgColor: "bg-white",
    },
  ];

  const activities = [
    {
      type: "LIKES",
      icon: FileText,
      time: "Dec 30, 11:26 AM",
      content: "Liked",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Recorded",
    },
    {
      type: "ACTIVITY",
      icon: CalendarDays,
      time: "Dec 30, 10:46 AM",
      content: "Created In",
      entity: "CyberSecurity Bootcamp - Class 1",
      status: "Recorded",
    },
    {
      type: "EVENT",
      icon: User,
      time: "Dec 30, 10:46 AM",
      content: "Created In",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Recorded",
    },
    {
      type: "CERTIFICATE",
      icon: Award,
      time: "Dec 30, 10:46 AM",
      content: "Created In",
      entity: "CyberSecurity Bootcamp - Class 1",
      status: "Recorded",
    },
    {
      type: "LIKES",
      icon: FileText,
      time: "Dec 24, 11:08 PM",
      content: "Checked In",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Recorded",
    },
    {
      type: "ACTIVITY",
      icon: CalendarDays,
      time: "Dec 30, 10:46 AM",
      content: "Created In",
      entity: "CyberSecurity Bootcamp - Class 1",
      status: "Recycled",
    },
    {
      type: "EVENT",
      icon: User,
      time: "Dec 30, 10:46 AM",
      content: "Created In",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Attended",
    },
    {
      type: "CERTIFICATE",
      icon: Award,
      time: "Dec 30, 10:46 AM",
      content: "Checked In",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Attended",
    },
    {
      type: "EVENT",
      icon: User,
      time: "Dec 30, 10:46 AM",
      content: "Checked In",
      entity: "CyberSecurity Bootcamp - Class 2",
      status: "Forwarded",
    },
  ];

  const certificates = [
    { id: "Cyber101", name: "CybersecurityBt Bootcamp" },
    { id: "Cyber201", name: "CybersecurityBt Bootcamp" },
    { id: "Cyber301", name: "CybersecurityBt Bootcamp" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-lg shadow-sm p-6 border border-gray-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="g flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-[#36460A]" />
                </div>
                <span className="text-base font-medium text-[#1A1A1A]">
                  {card.label}
                </span>
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Reports Overview */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
          Reports overview
        </h2>
        <button className="px-4 py-2 bg-[#36460A] hover:bg-[#36460A]/80 text-white text-sm rounded-lg flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select date
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              // Show 3 skeleton cards while loading (matches the 3-column layout)
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 animate-pulse"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-5 w-48 bg-gray-200 rounded mb-1"></div>
                  <div className="h-5 w-56 bg-gray-200 rounded mb-4"></div>
                  <div className="h-11 w-full bg-gray-200 rounded-lg"></div>
                </div>
              ))
            ) : registrations.length === 0 ? (
              <p className="text-center col-span-3 py-12 text-gray-600 font-medium">
                No recent events found
              </p>
            ) : (
              registrations.map((report, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg text-[#1A1A1A] flex-1 line-clamp-2">
                      {report.displayTitle}
                    </h3>
                    <span className="px-3 py-2 bg-[#14D50A]/20 text-[#26C640] text-xs rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                      View report
                    </span>
                  </div>
                  <p className="text-sm text-[#8A8A8A] mb-1">
                    {report.displayDate || "Date not available"}
                  </p>
                  <p className="text-sm text-[#8A8A8A] mb-4">
                    {report.displayLocation || "DefComm Training Hub, Lagos"}
                  </p>
                  <Link
                    to={`/attendancedashboard/attendance/${report.id}`}
                    state={{ registration: report }}
                    className="block w-full"
                  >
                    <button className="w-full py-2 bg-[#85AB20] hover:bg-[#85AB20]/70 text-white text-base font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="lg:col-span-1 grid gap-6 ">
            {/* Attendance Summary */}
            <div className="bg-white rounded-lg h-fit shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  Attendance Summary
                </h2>
                <button className="text-sm text-[#1A1A1A] hover:text-[#1A1A1A]/80">
                  View
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#333333] mb-2">
                    Events Attended : 0/1
                  </p>
                  <p className="text-sm text-[#333333]">
                    Next event:{" "}
                    <span className="font-bold">
                      Securing Communications, Systems, and Skies
                    </span>
                  </p>
                </div>
                <div className="bg-[#000000]/10 rounded-lg h-2 overflow-hidden">
                  <div
                    className="bg-[#36460A] h-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <p className="text-right text-sm font-semibold text-[#1A1A1A]">
                  0% complete
                </p>
              </div>
            </div>

            {/* Recent Certificates */}
            <div className="bg-white hidden rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Certificates
              </h2>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#85AB20]/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#85AB20]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {cert.id}
                        </p>
                        <p className="text-xs text-[#8A8A8A]">{cert.name}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-[#85AB20] text-sm rounded-lg flex items-center gap-2">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="grid gap-6">
            {/* Attendance Summary */}
            <div className="bg-white hidden rounded-lg h-fit shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  Attendance Summary
                </h2>
                <button className="text-sm text-[#1A1A1A] hover:text-[#1A1A1A]/80">
                  View
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#333333] mb-2">
                    Events Attended : 0/1
                  </p>
                  <p className="text-sm text-[#333333]">
                    Next event:{" "}
                    <span className="font-bold">
                      Securing Communications, Systems, and Skies
                    </span>
                  </p>
                </div>
                <div className="bg-[#000000]/10 rounded-lg h-2 overflow-hidden">
                  <div
                    className="bg-[#36460A] h-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <p className="text-right text-sm font-semibold text-[#1A1A1A]">
                  0% complete
                </p>
              </div>
            </div>

            {/* Recent Certificates */}
            <div className="bg-white hidden rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Certificates
              </h2>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#85AB20]/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#85AB20]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {cert.id}
                        </p>
                        <p className="text-xs text-[#8A8A8A]">{cert.name}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-[#85AB20] text-sm rounded-lg flex items-center gap-2">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2 hidden bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent activities
              </h2>
              <button className="px-4 py-2 bg-[#85AB20] hover:bg-[#85AB20]/80 text-white text-sm rounded-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                14th April
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Table Header with Icons */}
            <div className="mb-4">
              <div className="grid grid-cols-4 gap-4 px-4">
                {[
                  { label: "Date", icon: Calendar },
                  { label: "Activity", icon: Activity },
                  { label: "Event", icon: CalendarClock },
                  { label: "Certificate", icon: Award },
                ].map(
                  (
                    { label, icon: Icon }, // ← renamed to Icon (capital I is convention for components)
                  ) => (
                    <div key={label} className="flex items-center gap-1">
                      <Icon className="w-5 h-5 text-[#85AB20]" />
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        {label}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Activities Table */}
            <div className="max-h-96 overflow-y-auto ">
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {activities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-[#1A1A1A] w-1/4">
                        {activity.time}
                      </td>

                      {/* Activity (icon + content) */}
                      <td className="px-4 py-3 w-1/4">
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-[#1A1A1A] truncate">
                            {activity.content}
                          </p>
                        </div>
                      </td>

                      {/* Event (entity) */}
                      <td className="px-4 py-3 w-1/4">
                        <span className="text-sm font-medium text-[#1A1A1A]">
                          {activity.entity}
                        </span>
                      </td>

                      {/* Certificate (checkbox + attended text + status) */}
                      <td className="px-4 py-3 w-1/4">
                        <div className="flex items-center gap-2">
                          {/* Replace with your actual checkbox component if needed */}
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-green-500"
                            defaultChecked={activity.status === "Attended"} // optional logic
                          />
                          <span className="text-xs text-[#1A1A1A]">
                            Attended
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
