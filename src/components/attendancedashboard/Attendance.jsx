import React, { useState, useEffect } from "react";
import { Calendar, Clock, Award, Gift } from "lucide-react";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="g flex items-center justify-center">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Attendance Actions */}
          <div className="space-y-4">
            {/* Mark Attendance - Clock In */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#009345]">
              <h3 className="text-base text-center font-semibold text-[#000000] mb-1">
                Mark Attendance
              </h3>
              <p className="text-sm text-center text-gray-500 mb-3">
                by office time
              </p>
              <p className="text-2xl text-center font-bold text-gray-900 mb-4">
                {formatTime(currentTime)}
              </p>
              <button className="w-full bg-[#009345] hover:bg-[#009345]/80 text-white font-semibold py-2.5 px-4 rounded transition-colors">
                CLOCK IN
              </button>
            </div>

            {/* Mark Attendance - Close Out */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#E33629]">
              <h3 className="text-base text-center font-semibold text-[#000000] mb-1">
                Mark Attendance
              </h3>
              <p className="text-sm text-center text-gray-500 mb-3">
                by office time
              </p>
              <p className="text-2xl font-bold text-center text-gray-900 mb-4">
                {formatTime(currentTime)}
              </p>
              <button className="w-full bg-[#E33629] hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded transition-colors">
                CLOSE OUT
              </button>
            </div>
          </div>

          {/* Right Side - Daily Attendance Statistics */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Daily attendance statistics
              </h2>
            </div>

            {/* Calendar Icon */}
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

            {/* Chart */}
            <div className="space-y-4">
              {/* Y-axis labels and chart */}
              <div className="flex">
                {/* Y-axis */}
                <div
                  className="flex flex-col justify-between text-xs text-gray-500 pr-4 py-2"
                  style={{ height: "300px" }}
                >
                  <span>100%</span>
                  <span>90%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>50%</span>
                  <span>40%</span>
                </div>

                {/* Chart area */}
                <div className="flex-1 relative" style={{ height: "300px" }}>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-gray-100"></div>
                    ))}
                  </div>

                  {/* Stacked bar */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className="relative w-24" style={{ height: "270px" }}>
                      {/* Present bar (green) - 81.8% of 270px */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[#85AB20] rounded-t-sm flex items-end justify-center pb-2"
                        style={{ height: `${presentPercentage}%` }}
                      >
                        <span className="text-white font-semibold text-sm">
                          {presentCount}
                        </span>
                      </div>

                      {/* Absent bar (red) - 18.2% of 270px, stacked on top */}
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
      </div>
    </div>
  );
};

export default Attendance;
