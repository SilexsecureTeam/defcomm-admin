import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, Award, Gift, MapPin } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "https://backend.defcomm.ng/api";

const Attendance = () => {
  const { registrationId } = useParams();
  const location = useLocation();
  const registration = location.state?.registration;
  const { token } = useAuth();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [userPosition, setUserPosition] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [clockInLoading, setClockInLoading] = useState(false);
  const [clockOutLoading, setClockOutLoading] = useState(false);
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  // ==================== PERSISTENCE WITH LOCALSTORAGE ====================
  const storageKey = `attendance_${registrationId}`;

  // Load saved attendance on mount
  useEffect(() => {
    if (!registrationId) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.clockIn) {
        setHasClockedIn(true);
        setClockInTime(new Date(data.clockIn));
      }
      if (data.clockOut) {
        setHasClockedOut(true);
        setClockOutTime(new Date(data.clockOut));
      }
    }
  }, [registrationId, storageKey]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!registrationId) return;

    const data = {
      clockIn: clockInTime ? clockInTime.toISOString() : null,
      clockOut: clockOutTime ? clockOutTime.toISOString() : null,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [clockInTime, clockOutTime, registrationId, storageKey]);
  // =====================================================================

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

  const fetchUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location.");
      toast.error("Geolocation not supported by your browser");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocationLoading(false);
        toast.success("Location acquired successfully!");
      },
      (err) => {
        let msg = "Failed to get location.";
        if (err.code === 1)
          msg = "Please allow location access in your browser settings.";
        else if (err.code === 2)
          msg = "Please turn on your device's location services and try again.";
        else if (err.code === 3)
          msg = "Location request timed out. Please try again.";
        setLocationError(msg);
        toast.error(msg);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      },
    );
  }, []);

  const canClock = !!userPosition && !locationLoading && !locationError;

  const handleClock = async (state) => {
    if (!registration?.id_enc || !token) {
      toast.error("Missing event or authentication");
      return;
    }

    if (!userPosition) {
      toast.warn("Please click 'Get My Location' first");
      return;
    }

    const setLoading = state === "in" ? setClockInLoading : setClockOutLoading;
    const setDone = state === "in" ? setHasClockedIn : setHasClockedOut;
    const setTime = state === "in" ? setClockInTime : setClockOutTime;

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/user/event/clock`,
        {
          id: registration.id_enc,
          state,
          latitude: userPosition.lat.toFixed(6),
          longitude: userPosition.lng.toFixed(6),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.status === "200") {
        toast.success(`Clocked ${state === "in" ? "in" : "out"} successfully!`);
        setDone(true);
        setTime(new Date());
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err) {
      console.error("Clock error:", err);
      const msg = err.response?.data?.message || `Failed to clock ${state}`;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClockIn = () => handleClock("in");

  const handleClockOut = () => {
    if (!hasClockedIn) {
      toast.warn("You need to clock in first");
      return;
    }
    handleClock("out");
  };

  const stats = [
    { icon: Calendar, label: "Events Attended", value: "0" },
    { icon: Clock, label: "Next Event Starts In", value: "..." },
    { icon: Award, label: "Certificates Earned", value: "0" },
    { icon: Gift, label: "Souvenirs Claimed", value: "0" },
  ];

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
            {/* Clock In Card */}
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

              <div className="mb-4">
                <button
                  onClick={fetchUserLocation}
                  disabled={locationLoading}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
                >
                  {locationLoading ? (
                    "Getting location..."
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      Get My Location
                    </>
                  )}
                </button>

                {locationError && (
                  <p className="text-center text-red-600 text-sm mt-2">
                    {locationError}
                  </p>
                )}

                {userPosition && (
                  <p className="text-center text-green-600 text-sm mt-2">
                    ✅ Location ready ({userPosition.accuracy.toFixed(0)}m
                    accuracy)
                  </p>
                )}
              </div>

              <button
                onClick={handleClockIn}
                disabled={clockInLoading || hasClockedIn || !canClock}
                className={`w-full text-white font-semibold py-2.5 px-4 rounded transition-colors ${
                  clockInLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : hasClockedIn || !canClock
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
            </div>

            {/* Clock Out Card */}
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

              <div className="mb-4">
                <button
                  onClick={fetchUserLocation}
                  disabled={locationLoading}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
                >
                  {locationLoading ? (
                    "Getting location..."
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      Get My Location
                    </>
                  )}
                </button>

                {locationError && (
                  <p className="text-center text-red-600 text-sm mt-2">
                    {locationError}
                  </p>
                )}

                {userPosition && (
                  <p className="text-center text-green-600 text-sm mt-2">
                    ✅ Location ready ({userPosition.accuracy.toFixed(0)}m
                    accuracy)
                  </p>
                )}
              </div>

              <button
                onClick={handleClockOut}
                disabled={
                  clockOutLoading || hasClockedOut || !hasClockedIn || !canClock
                }
                className={`w-full text-white font-semibold py-2.5 px-4 rounded transition-colors ${
                  clockOutLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : hasClockedOut || !hasClockedIn || !canClock
                      ? "bg-red-800 cursor-not-allowed"
                      : "bg-[#E33629] hover:bg-red-600"
                }`}
              >
                {clockOutLoading
                  ? "Clocking Out..."
                  : hasClockedOut
                    ? "Clocked Out"
                    : "CLOCK OUT"}
              </button>
            </div>
          </div>

          {/* STACKED CHART - Green stays, Red on top */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                My Attendance Today
              </h2>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <Calendar className="w-5 h-5 text-[#85AB20]" />
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#85AB20] rounded"></div>
                  <span className="text-[#000000]">Clock In</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#CB4D42] rounded"></div>
                  <span className="text-[#000000]">Clock Out</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-48" style={{ height: "280px" }}>
                {/* Green bar - stays once clocked in */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#85AB20] rounded-t-sm flex flex-col items-center justify-end pb-3 transition-all"
                  style={{ height: hasClockedIn ? "60%" : "25%" }}
                >
                  {hasClockedIn && clockInTime ? (
                    <div className="text-white text-center text-sm font-semibold">
                      Clocked In
                      <br />
                      {formatTime(clockInTime)}
                    </div>
                  ) : (
                    <div className="text-white/70 text-xs">Clock In</div>
                  )}
                </div>

                {/* Red bar - appears on top when clocked out */}
                {hasClockedOut && clockOutTime && (
                  <div
                    className="absolute left-0 right-0 bg-[#CB4D42] rounded-t-sm flex flex-col items-center justify-end pb-3 transition-all"
                    style={{ bottom: "60%", height: "40%" }}
                  >
                    <div className="text-white text-center text-sm font-semibold">
                      Clocked Out
                      <br />
                      {formatTime(clockOutTime)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Event Summary */}
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
