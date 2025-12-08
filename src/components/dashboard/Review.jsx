import React from "react";
import { Eye } from "lucide-react";
import { useState } from "react";

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const reports = [
    {
      id: "#12345",
      title: "Cross-site scripting vulnerability in user profile page",
      reporter: "Alex Turner",
      submittedOn: "2023-08-15",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12346",
      title: "SQL injection vulnerability in login form",
      reporter: "Jamie Cook",
      submittedOn: "2023-08-16",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12347",
      title: "Remote code execution vulnerability in file upload",
      reporter: "Matt Helders",
      submittedOn: "2023-09-17",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12348",
      title: "Denial of service vulnerability in API endpoint",
      reporter: "Nick O'Malley",
      submittedOn: "2023-08-18",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12349",
      title: "Information disclosure vulnerability in error messages",
      reporter: "Miles Kane",
      submittedOn: "2023-08-19",
      severity: "Low",
      status: "Pending",
    },
    {
      id: "#12350",
      title: "Cross-site request forgery vulnerability in password reset",
      reporter: "Bill Ryder-Jones",
      submittedOn: "2023-08-20",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12351",
      title: "Server-side request forgery vulnerability in image proxy",
      reporter: "Richard Hawley",
      submittedOn: "2023-08-21",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12345",
      title: "Cross-site scripting vulnerability in user profile page",
      reporter: "Alex Turner",
      submittedOn: "2023-08-15",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12346",
      title: "SQL injection vulnerability in login form",
      reporter: "Jamie Cook",
      submittedOn: "2023-08-16",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12347",
      title: "Remote code execution vulnerability in file upload",
      reporter: "Matt Helders",
      submittedOn: "2023-09-17",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12348",
      title: "Denial of service vulnerability in API endpoint",
      reporter: "Nick O'Malley",
      submittedOn: "2023-08-18",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12349",
      title: "Information disclosure vulnerability in error messages",
      reporter: "Miles Kane",
      submittedOn: "2023-08-19",
      severity: "Low",
      status: "Pending",
    },
    {
      id: "#12350",
      title: "Cross-site request forgery vulnerability in password reset",
      reporter: "Bill Ryder-Jones",
      submittedOn: "2023-08-20",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12351",
      title: "Server-side request forgery vulnerability in image proxy",
      reporter: "Richard Hawley",
      submittedOn: "2023-08-21",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12345",
      title: "Cross-site scripting vulnerability in user profile page",
      reporter: "Alex Turner",
      submittedOn: "2023-08-15",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12346",
      title: "SQL injection vulnerability in login form",
      reporter: "Jamie Cook",
      submittedOn: "2023-08-16",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12347",
      title: "Remote code execution vulnerability in file upload",
      reporter: "Matt Helders",
      submittedOn: "2023-09-17",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12348",
      title: "Denial of service vulnerability in API endpoint",
      reporter: "Nick O'Malley",
      submittedOn: "2023-08-18",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12349",
      title: "Information disclosure vulnerability in error messages",
      reporter: "Miles Kane",
      submittedOn: "2023-08-19",
      severity: "Low",
      status: "Pending",
    },
    {
      id: "#12350",
      title: "Cross-site request forgery vulnerability in password reset",
      reporter: "Bill Ryder-Jones",
      submittedOn: "2023-08-20",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12351",
      title: "Server-side request forgery vulnerability in image proxy",
      reporter: "Richard Hawley",
      submittedOn: "2023-08-21",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12345",
      title: "Cross-site scripting vulnerability in user profile page",
      reporter: "Alex Turner",
      submittedOn: "2023-08-15",
      severity: "High",
      status: "Pending",
    },
    {
      id: "#12346",
      title: "SQL injection vulnerability in login form",
      reporter: "Jamie Cook",
      submittedOn: "2023-08-16",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12347",
      title: "Remote code execution vulnerability in file upload",
      reporter: "Matt Helders",
      submittedOn: "2023-09-17",
      severity: "Critical",
      status: "Pending",
    },
    {
      id: "#12348",
      title: "Denial of service vulnerability in API endpoint",
      reporter: "Nick O'Malley",
      submittedOn: "2023-08-18",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12349",
      title: "Information disclosure vulnerability in error messages",
      reporter: "Miles Kane",
      submittedOn: "2023-08-19",
      severity: "Low",
      status: "Pending",
    },
    {
      id: "#12350",
      title: "Cross-site request forgery vulnerability in password reset",
      reporter: "Bill Ryder-Jones",
      submittedOn: "2023-08-20",
      severity: "Medium",
      status: "Pending",
    },
    {
      id: "#12351",
      title: "Server-side request forgery vulnerability in image proxy",
      reporter: "Richard Hawley",
      submittedOn: "2023-08-21",
      severity: "High",
      status: "Pending",
    },
  ];

  const getSeverityStyles = (severity) => {
    const styles = {
      Critical: "bg-red-600 text-red-50 border-red-700",
      High: "bg-yellow-500 text-yellow-950 border-yellow-600",
      Medium: "bg-yellow-700 text-yellow-50 border-yellow-800",
      Low: "bg-green-600 text-green-50 border-green-700",
    };
    return styles[severity] || "";
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E5E5] p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Review Queue</h1>
          <p className="text-sm ">Pending reports waiting for admin review</p>
        </div>

        {/* Table Container */}
        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5] backdrop-blur-sm rounded-lg border border-[#2a3e2a]/50 overflow-hidden">
          <div className="overflow-x-auto k">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a3e2a] bg-[#8BAF2B]/40 text-[#E5E5E5]">
                  <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider w-28">
                    Report ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-40">
                    Reporter
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-36">
                    Submitted On
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-32">
                    Suggested Severity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-28">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a3e2a]/30">
                {reports
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-[#8BAF2B]/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-[#c8ddc8]">
                          {report.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#e8f5e8] leading-5">
                          {report.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#c8ddc8]">
                          {report.reporter}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#c8ddc8]">
                          {report.submittedOn}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-md border ${getSeverityStyles(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#c8ddc8]">
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#e8f5e8] bg-[#2a3e2a]/60 hover:bg-[#2a3e2a] rounded border border-[#3a4e3a] transition-colors duration-150">
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {/* Pagination */}
            </table>
            <div className="flex items-center justify-between w-full px-6 py-4 border-t border-[#2a3e2a]/50">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded border border-[#3a4e3a] bg-[#2a3e2a]/60 hover:bg-[#2a3e2a] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <p className="text-sm text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, reports.length)} of{" "}
                {reports.length} reports
              </p>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(Math.ceil(reports.length / itemsPerPage), prev + 1)
                  )
                }
                disabled={
                  currentPage === Math.ceil(reports.length / itemsPerPage)
                }
                className="px-3 py-1.5 text-sm rounded border border-[#3a4e3a] bg-[#2a3e2a]/60 hover:bg-[#2a3e2a] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
