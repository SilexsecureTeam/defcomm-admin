import React, { useState, useEffect } from "react";
import { Calendar, Clock, Award, Gift } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

const Attendance = () => {
  const { registrationId } = useParams();
  const location = useLocation();
  const registration = location.state?.registration;
  const { token } = useAuth();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInLoading, setClockInLoading] = useState(false);
  const [clockOutLoading, setClockOutLoading] = useState(false);
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null); // to show actual time
  // Add this line with the other useState calls
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [clockOutTime, setClockOutTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const handleClockIn = async () => {
    if (!registration?.id_enc || !token) {
      toast.error("Missing event or authentication");
      return;
    }

    setClockInLoading(true);
    try {
      const url = `https://backend.defcomm.ng/api/user/event/clock/${registration.id_enc}/in`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === "200") {
        toast.success("Clocked in successfully!");
        setHasClockedIn(true);

        setClockInTime(new Date()); // use current time (or use res.data.data.clockin if formatted)
      } else {
        toast.error(res.data.message || "Clock in failed");
      }
    } catch (err) {
      console.error("Clock in error:", err);
      const msg = err.response?.data?.message || "Failed to clock in";
      toast.error(msg);
    } finally {
      setClockInLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (!registration?.id_enc || !token) {
      toast.error("Missing event or authentication");
      return;
    }

    if (!hasClockedIn) {
      toast.warn("You need to clock in first");
      return;
    }

    setClockOutLoading(true);
    try {
      const url = `https://backend.defcomm.ng/api/user/event/clock/${registration.id_enc}/out`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === "200") {
        toast.success("Clocked out successfully!");
        setHasClockedOut(true);
        setClockOutTime(new Date()); // ← add this line
      } else {
        toast.error(res.data.message || "Clock out failed");
      }
    } catch (err) {
      console.error("Clock out error:", err);
      const msg = err.response?.data?.message || "Failed to clock out";
      toast.error(msg);
    } finally {
      setClockOutLoading(false);
    }
  };

  const stats = [
    { icon: Calendar, label: "Events Attended", value: "50" },
    { icon: Clock, label: "Next Event Starts In", value: "2 days" },
    { icon: Award, label: "Certificates Earned", value: "05" },
    { icon: Gift, label: "Souvenirs Claimed", value: "02" },
  ];

  const presentCount = 90;
  const absentCount = 20;
  const total = presentCount + absentCount;
  const presentPercentage = (presentCount / total) * 100;
  const absentPercentage = (absentCount / total) * 100;

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#36460A]" />
                </div>
                <span className="text-base font-medium text-[#1A1A1A]">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Status Badge */}
        <div className="text-center">
          {hasClockedOut ? (
            <span className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full font-medium text-lg shadow-sm">
              ✓ Clocked Out
            </span>
          ) : hasClockedIn ? (
            <span className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium text-lg shadow-sm">
              ⏰ Currently Clocked In
            </span>
          ) : (
            <span className="inline-block px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full font-medium text-lg shadow-sm">
              Not Clocked In Yet
            </span>
          )}
        </div>

        {/* Clock In / Clock Out */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="space-y-4 lg:col-span-1">
            {/* Clock In */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#009345]">
              <h3 className="text-base text-center font-semibold text-[#000000] mb-1">
                Mark Attendance
              </h3>
              <p className="text-sm text-center text-[#8A8A8A] mb-3">
                by office time
              </p>
              <p className="text-2xl text-center font-bold text-gray-900 mb-4">
                {formatTime(currentTime)}
              </p>
              <button
                onClick={handleClockIn}
                disabled={clockInLoading || hasClockedIn}
                className={`w-full text-white font-semibold py-2.5 px-4 rounded transition-colors ${
                  clockInLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : hasClockedIn
                      ? "bg-green-700 cursor-not-allowed"
                      : "bg-[#009345] hover:bg-[#009345]/80"
                }`}
              >
                {clockInLoading
                  ? "Clocking In..."
                  : hasClockedIn
                    ? "Clocked In"
                    : "CLOCK IN"}
              </button>

              {hasClockedIn && clockInTime && (
                <p className="text-center text-sm text-green-700 mt-3">
                  Clocked in at {formatTime(clockInTime)}
                </p>
              )}
            </div>

            {/* Clock Out */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#E33629]">
              <h3 className="text-base text-center font-semibold text-[#000000] mb-1">
                Mark Attendance
              </h3>
              <p className="text-sm text-center text-[#8A8A8A] mb-3">
                by office time
              </p>
              <p className="text-2xl font-bold text-center text-gray-900 mb-4">
                {formatTime(currentTime)}
              </p>
              <button
                onClick={handleClockOut}
                disabled={clockOutLoading || hasClockedOut || !hasClockedIn}
                className={`w-full text-white font-semibold py-2.5 px-4 rounded transition-colors ${
                  clockOutLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : hasClockedOut
                      ? "bg-red-800 cursor-not-allowed"
                      : "bg-[#E33629] hover:bg-red-600"
                }`}
              >
                {clockOutLoading
                  ? "Clocking Out..."
                  : hasClockedOut
                    ? "Clocked Out"
                    : "CLOSE OUT"}
              </button>

              {hasClockedOut && clockOutTime && (
                <p className="text-center text-sm text-red-700 mt-3">
                  Clocked out at {formatTime(clockOutTime)}
                </p>
              )}
            </div>
          </div>

          {/* Daily Attendance Statistics (Sample) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Daily Attendance Statistics (Sample)
              </h2>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <Calendar className="w-5 h-5 text-[#85AB20]" />
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#85AB20] rounded"></div>
                  <span className="text-[#000000]">Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#CB4D42] rounded"></div>
                  <span className="text-[#000000]">Absent</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex">
                <div
                  className="flex flex-col justify-between text-xs text-[#8A8A8A] pr-4 py-2"
                  style={{ height: "300px" }}
                >
                  <span>100%</span>
                  <span>90%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>50%</span>
                  <span>40%</span>
                </div>

                <div className="flex-1 relative" style={{ height: "300px" }}>
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-gray-100"></div>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className="relative w-24" style={{ height: "270px" }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[#85AB20] rounded-t-sm flex items-end justify-center pb-2"
                        style={{ height: `${presentPercentage}%` }}
                      >
                        <span className="text-white font-semibold text-sm">
                          {presentCount}
                        </span>
                      </div>

                      <div
                        className="absolute left-0 right-0 bg-[#CB4D42] rounded-t-sm flex items-end justify-center pb-2"
                        style={{
                          bottom: `${presentPercentage}%`,
                          height: `${absentPercentage}%`,
                        }}
                      >
                        <span className="text-white font-semibold text-sm">
                          {absentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Summary - Moved to top */}
        {registration ? (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#85AB20]">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
              Event Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  {registration.displayTitle || "Event Details"}
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Date:</strong> {registration.displayDate || "TBD"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Location:</strong>{" "}
                  {registration.displayLocation || "TBD"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Attendance Mode:</strong>{" "}
                  {registration.submission?.participation_details
                    ?.attendance_mode || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Status:</strong>{" "}
                  {registration.displayStatus || "Unknown"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Registered On:</strong>{" "}
                  {registration.submission_date
                    ? new Date(
                        registration.submission_date,
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                {registrationId && (
                  <p className="text-xs text-gray-500 mt-2">
                    Registration ID: {registrationId.substring(0, 8)}...
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p className="text-lg font-medium">No event selected</p>
            <p className="text-sm mt-2">
              Please go back to the events list and select an event to view
              details.
            </p>
            {registrationId && (
              <p className="text-xs text-gray-500 mt-3">
                (Attempted Registration ID: {registrationId})
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
