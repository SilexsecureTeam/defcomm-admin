import React, { useState } from "react";
import { Download } from "lucide-react";

const CertificateAttendance = () => {
  const [activeTab, setActiveTab] = useState("all");

  const certificates = [
    {
      id: 1,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
    {
      id: 2,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals - Completion Certificate",
      description: "Issued for completing: Cybersecurity Fundamentals -",
      issueDate: "Dec 10, 2025",
      status: "available",
    },
  ];

  const tabs = [
    { key: "all", label: "All Certificates" },
    { key: "available", label: "Available" },
    { key: "pending", label: "Pending" },
    { key: "not-earned", label: "Not Earned" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-7xl mx-auto hidden">
        {/* Tab Navigation */}
        <div className=" mb-6">
          <nav className="flex space-x-8 ">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 relative  text-base transition-colors ${
                  activeTab === tab.key
                    ? "text-[#1A1A1A] font-semibold"
                    : "text-[#333333] font-normal"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#85AB20]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Certificate Image Placeholder */}
              <div className="w-full h-48 bg-gray-200"></div>

              {/* Certificate Details */}
              <div className="p-4">
                <h3 className="font-semibold text-[#1A1A1A] text-base md:text-lg mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#333333]/80 mb-1">
                  {cert.description}
                </p>
                <p className="text-sm text-[#333333]/80 mb-4">
                  Issued on: {cert.issueDate}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="bg-[#85AB20] hover:bg-[#85AB20]/80 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
                    View Certificate
                  </button>
                  <button className="flex items-center gap-1 text-[#85AB20] hover:text-[#85AB20]/80 text-sm font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateAttendance;
