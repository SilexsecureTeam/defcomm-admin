import React from "react";
import { Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Program = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const reports = [
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
    {
      speed: "2 days",
      paid: "$5,000",
      date: "2023-09-17",
      report: "12",
      status: "Active",
      name: "Acme Corp",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E5E5] p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold ">Program</h1>
          <button className="text-[#E5E5E5] bg-[#8BAF2B] py-2 px-4 rounded-xl cursor-pointer">
            Create New Program
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2.5 min-w-[130px] cursor-pointer hover:bg-[#8BAF2B]/30 transition">
            <span className="text-sm text-[#E5E5E5]">Program Name</span>
            <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
          </div>

          <div className="flex items-center gap-2 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2.5 min-w-[130px] cursor-pointer hover:bg-[#8BAF2B]/30 transition">
            <span className="text-sm text-[#E5E5E5]">Status</span>
            <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
          </div>

          <div className="flex items-center gap-2 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2.5 min-w-[130px] cursor-pointer hover:bg-[#8BAF2B]/30 transition">
            <span className="text-sm text-[#E5E5E5]">Type</span>
            <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
          </div>

          <div className="flex items-center gap-2 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2.5 min-w-[130px] cursor-pointer hover:bg-[#8BAF2B]/30 transition">
            <span className="text-sm text-[#E5E5E5]">Reward Range</span>
            <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5] backdrop-blur-sm rounded-lg border border-[#2a3e2a]/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a3e2a] bg-[#8BAF2B]/40 text-[#E5E5E5]">
                  <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Program Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider ">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Reports Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Rewards Paid
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Response Speed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
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
                        <span className="text-sm text-[#c8ddc8]">
                          {report.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-md  text-green-400  border border-green-600/50  `}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-[#c8ddc8]">
                          {report.report}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-[#e8f5e8] leading-5">
                          {report.paid}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold  `}
                        >
                          {report.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold  `}
                        >
                          {report.speed}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/dashboard/programs/details/${report.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#e8f5e8] bg-[#2a3e2a]/60 hover:bg-[#2a3e2a] rounded border border-[#3a4e3a] transition-colors duration-150"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>
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

export default Program;
