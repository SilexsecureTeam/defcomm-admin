// ProgramDetails.jsx
import React from "react";
import {
  BarChart3,
  Edit2,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Trophy,
  AlertCircle,
  X,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";

const trafficByDeviceData = [
  { name: "Critical", value: 15, fill: "#ef4444" },
  { name: "High", value: 35, fill: "#facc15" },
  { name: "Medium", value: 25, fill: "#eab308" },
  { name: "Low", value: 25, fill: "#22c55e" },
];

const reportsOverTimeData = [
  { month: "Jan", reports: 65 },
  { month: "Feb", reports: 78 },
  { month: "Mar", reports: 72 },
  { month: "Apr", reports: 90 },
  { month: "May", reports: 82 },
  { month: "Jun", reports: 95 },
];

export default function ProgramDetails() {
  const navigate = useNavigate();
  const { programId } = useParams();
  // const navigate = useNavigate();
  const programName = programId
    ? programId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Unknown Program";
  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8BAF2B] bg-transparent border border-[#8BAF2B] rounded hover:bg-[#6a7520]/10 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          Edit
        </button>
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Program Details: {programName}
            </h1>
            <p className="text-sm ">
              Manage and monitor the SecureApp Bounty program
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8BAF2B] bg-transparent border border-[#8BAF2B] rounded hover:bg-[#6a7520]/10 transition-colors duration-150">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="px-5 py-2 text-sm font-medium  bg-[#8BAF2B] rounded hover:bg-[#b8c83f] transition-colors duration-150">
            Claims
          </button>
          <button className="px-5 py-2 text-sm font-medium text-[#8BAF2B] bg-transparent border border-[#8BAF2B] rounded hover:bg-[#6a7520]/10 transition-colors duration-150">
            Archive
          </button>
        </div>

        {/* Program Brief Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Program Brief
          </h2>
          <p className="text-base  leading-relaxed">
            SecureApp Bounty is a program focused on identifying vulnerabilities
            within the SecureApp application. This program aims to enhance the
            security posture of SecureApp by engaging with the security research
            community.
          </p>
        </div>

        {/* In-Scope Assets Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            In-Scope Assets
          </h2>
          <ul className="space-y-2">
            <li className="text-base  flex items-start">
              <span className="mr-2">-</span>
              <span>SecureApp iOS Application</span>
            </li>
            <li className="text-base  flex items-start">
              <span className="mr-2">-</span>
              <span>SecureApp Android Application</span>
            </li>
            <li className="text-base  flex items-start">
              <span className="mr-2">-</span>
              <span>SecureApp API Endpoints</span>
            </li>
          </ul>
        </div>

        {/* Out-of-Scope Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Out-of-Scope
          </h2>
          <ul className="space-y-2">
            <li className="text-base  flex items-start">
              <span className="mr-2">-</span>
              <span>SecureApp Website (marketing pages)</span>
            </li>
            <li className="text-base flex items-start">
              <span className="mr-2">-</span>
              <span>Third-party integrations</span>
            </li>
          </ul>
        </div>

        {/* Rules of Engagement Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Rules of Engagement
          </h2>
          <ul className="space-y-2">
            <li className="text-base flex items-start">
              <span className="mr-2">-</span>
              <span>
                Researchers must adhere to responsible disclosure practices
              </span>
            </li>
            <li className="text-base flex items-start">
              <span className="mr-2">-</span>
              <span>
                Testing should not disrupt the availability of SecureApp
                services
              </span>
            </li>
            <li className="text-base flex items-start">
              <span className="mr-2">-</span>
              <span>
                Exploitation of vulnerabilities is limited to proof-of-concept
                demonstrations
              </span>
            </li>
          </ul>
        </div>

        {/* Reward Table */}
        <div className="">
          <div className="">
            <h2 className="text-xl font-bold text-white mb-3">Reward Table</h2>
          </div>
          <div className="bg-[#8BAF2B]/20 rounded-t-xl border border-[#1e3a2a] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#8BAF2B]/40 border-b border-[#1e3a2a]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-lime-300">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-lime-300">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lime-900/50">
                {[
                  {
                    severity: "Critical",
                    reward: "$5,000",
                    color: "text-red-400",
                  },
                  {
                    severity: "High",
                    reward: "$2,500",
                    color: "text-yellow-400",
                  },
                  {
                    severity: "Medium",
                    reward: "$1,000",
                    color: "text-amber-400",
                  },
                  { severity: "Low", reward: "$500", color: "text-green-400" },
                ].map((item) => (
                  <tr
                    key={item.severity}
                    className="hover:bg-lime-900/20 transition"
                  >
                    <td className="px-6 py-5">
                      <span className={`font-medium ${item.color}`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-left font-bold text-white">
                      {item.reward}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics & Analytics */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            {/* <BarChart3 className="w-7 h-7 text-lime-500" /> */}
            Metrics & Analytics
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Total Reports",
                value: "125",
                icon: AlertCircle,
                color: "text-blue-400",
              },
              {
                label: "Accepted Reports",
                value: "85",
                icon: Trophy,
                color: "text-green-400",
              },
              {
                label: "Rejected Reports",
                value: "40",
                icon: X,
                color: "text-red-400",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#8BAF2B]/20 backdrop-blur-sm text-[#E5E5E5] rounded-xl border border-[#1e3a2a] p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-base
                  "
                  >
                    {stat.label}
                  </span>
                </div>
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic by Device */}
            <div className="bg-[#8BAF2B]/20 backdrop-blur-sm rounded-xl border border-[#1e3a2a] p-6">
              <h3 className="text-lg font-semibold mb-6 text-white">
                Traffic by Device
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={trafficByDeviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334433" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a2a1a",
                      border: "1px solid #334433",
                    }}
                  />
                  <Bar dataKey="value" barSize={20} radius={[8, 8, 0, 0]}>
                    {trafficByDeviceData.map((entry, i) => (
                      <cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Reports Over Time */}
            <div className="bg-[#8BAF2B]/20 backdrop-blur-sm rounded-xl border border-[#1e3a2a] p-6">
              <h3 className="text-lg font-semibold mb-6 text-white">
                Reports Over Time
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={reportsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334433" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a2a1a",
                      border: "1px solid #334433",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ fill: "#22d3ee" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            {/* <Users className="w-7 h-7 text-lime-500" /> */}
            Top Contributors
          </h2>
          <div className="bg-[#8BAF2B]/20 to-black rounded-xl border border-[#1e3a2a] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#8BAF2B]/40">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-lime-200">
                    Hacker
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-lime-200">
                    Accepted Reports
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-lime-200">
                    Rewards
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lime-900/50">
                {[
                  { name: "Alex", reports: 25, reward: "$12,500" },
                  { name: "Jordan", reports: 20, reward: "$10,000" },
                  { name: "Taylor", reports: 15, reward: "$7,500" },
                ].map((hacker) => (
                  <tr
                    key={hacker.name}
                    className="hover:bg-lime-900/20 transition"
                  >
                    <td className="px-6 py-5 font-medium text-white">
                      {hacker.name}
                    </td>
                    <td className="px-6 py-5 text-center text-lime-300">
                      {hacker.reports}
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-white">
                      {hacker.reward}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reports + Metadata */}
        <div className="grid grid-cols-1  gap-8">
          {/* Recent Reports */}
          <div className="">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Recent Reports
            </h2>
            <div className="bg-[#8BAF2B]/20 rounded-xl border border-[#1e3a2a] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#8BAF2B]/40">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-lime-200 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-lime-200 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-lime-200 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-lime-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-lime-200 uppercase tracking-wider">
                      Submitted Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lime-900/50">
                  {[
                    {
                      id: "#125",
                      title: "SQL Injection in User Login",
                      severity: "Critical",
                      status: "Accepted",
                      date: "2023-07-15",
                    },
                    {
                      id: "#124",
                      title: "Cross-site Scripting (XSS) in Profile Page",
                      severity: "High",
                      status: "Accepted",
                      date: "2023-07-10",
                    },
                    {
                      id: "#123",
                      title: "Insecure Direct Object References (IDOR) in API",
                      severity: "Medium",
                      status: "Accepted",
                      date: "2023-07-05",
                    },
                    {
                      id: "#122",
                      title: "Information Disclosure in Error Messages",
                      severity: "Low",
                      status: "Rejected",
                      date: "2023-06-30",
                    },
                    {
                      id: "#121",
                      title: "Missing Rate Limiting on Password Reset",
                      severity: "Medium",
                      status: "Accepted",
                      date: "2023-06-25",
                    },
                  ].map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-lime-900/20 transition"
                    >
                      <td className="px-6 py-4 font-mono text-lime-300">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 text-white">{report.title}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            report.severity === "Critical"
                              ? "bg-red-600 text-white"
                              : report.severity === "High"
                              ? "bg-yellow-600 text-black"
                              : report.severity === "Medium"
                              ? "bg-amber-600 text-black"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {report.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            report.status === "318"
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400 text-sm">
                        {report.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Metadata</h2>
            <div className="bg-[#8BAF2B]/20 rounded-xl border border-[#1e3a2a]/50 p-6">
              <div className="space-y-6">
                {[
                  { label: "Launch Date", value: "16-05-2025", icon: Calendar },
                  { label: "Last Updated", value: "16-05-2025", icon: Clock },
                  { label: "Last Updated", value: "16-05-2025", icon: Clock },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-15 md:gap-40 pb-6 ${
                      index < 2 ? "border-b border-[#1e3a2a]/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* <item.icon className="w-5 h-5 text-[#8BAF2B]" /> */}
                      <span className="text-sm ">{item.label}</span>
                    </div>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
