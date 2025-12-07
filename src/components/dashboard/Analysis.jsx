// Analysis.tsx
import React from "react";
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  Clock,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const vulnerabilityData = [
  { name: "Last Month", value: 320 },
  { name: "", value: 380 },
  { name: "", value: 350 },
  { name: "", value: 420 },
  { name: "", value: 390 },
  { name: "This Month", value: 300 },
];

const resolutionTrendData = [
  { date: "May 5", resolved: 180, pending: 120 },
  { date: "May 6", resolved: 200, pending: 140 },
  { date: "May 7", resolved: 240, pending: 160 },
  { date: "May 8", resolved: 300, pending: 180 },
  { date: "May 9", resolved: 340, pending: 200 },
  { date: "May 10", resolved: 320, pending: 220 },
  { date: "May 11", resolved: 280, pending: 190 },
  { date: "May 12", resolved: 250, pending: 170 },
  { date: "May 13", resolved: 220, pending: 150 },
  { date: "May 14", resolved: 200, pending: 130 },
  { date: "May 15", resolved: 190, pending: 120 },
];

const categoryData = [
  { name: "XSS", value: 478, amount: "$6,855" },
  { name: "SQL Injection", value: 483, amount: "$6,025" },
  { name: "CSRF", value: 327, amount: "$3,027" },
  { name: "Clickjacking", value: 142, amount: "$1,142" },
  { name: "Open Redirect", value: 78, amount: "$478" },
];

const topHackers = [
  {
    rank: 1,
    name: "Lucas Bennett",
    points: 1500,
    accepted: 120,
    rejected: 30,
    severity: "Critical: 30, High: 70, Medium: 40, Low: 20",
    accuracy: "95%",
    rewards: "$10,000",
  },
  {
    rank: 2,
    name: "Sophia Carter",
    points: 1450,
    accepted: 115,
    rejected: 25,
    severity: "High: 50, Medium: 65, Low: 30",
    accuracy: "92%",
    rewards: "$9,500",
  },
  {
    rank: 3,
    name: "Sophia Carter",
    points: 1450,
    accepted: 115,
    rejected: 26,
    severity: "Critical: 18, High: 32, Medium: 65, Low: 30",
    accuracy: "91%",
    rewards: "$9,500",
  },
  {
    rank: 4,
    name: "Sophia Carter",
    points: 1450,
    accepted: 115,
    rejected: 25,
    severity: "High: 32, Medium: 65, Low: 30",
    accuracy: "92%",
    rewards: "$9,500",
  },
];

const recentReports = [
  {
    id: "#125",
    title: "SQL Injection in User Login",
    severity: "Critical",
    status: "Accepted",
    date: "2025-01-15",
  },
  {
    id: "#124",
    title: "Cross-Site Scripting (XSS) in Profile Page",
    severity: "High",
    status: "Accepted",
    date: "2025-01-10",
  },
  {
    id: "#123",
    title: "Insecure Direct Object Reference in /api",
    severity: "Medium",
    status: "Accepted",
    date: "2025-01-08",
  },
  {
    id: "#122",
    title: "Information Disclosure in Error Messages",
    severity: "Low",
    status: "Rejected",
    date: "2025-01-05",
  },
  {
    id: "#121",
    title: "Missing Rate Limiting on Password Reset",
    severity: "Medium",
    status: "Accepted",
    date: "2025-01-03",
  },
];

export default function Analysis() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Filters */}
      <div className=" ">
        <div className="px-6 py-4 flex w-full  items-center gap-6 text-sm">
          <div className="flex flex-1 items-center justify-between gap-2 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2">
            <span>Date Range</span>
            <Calendar className="w-4 h-4 text-[#E5E5E5]" />
          </div>
          <select className="bg-[#8BAF2B]/20 flex-1 border border-[#2a3e2a]/50 rounded-lg px-4 py-2">
            <option>Programme</option>
          </select>
          <select className="bg-[#8BAF2B]/20 flex-1 border border-[#2a3e2a]/50 rounded-lg px-4 py-2">
            <option>Asset / Category</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-5">
          <p className="text-[#E5E5E5] text-xs">Submitted Reports</p>
          <p className="text-2xl font-bold ">1,265</p>
        </div>
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-5">
          <p className="text-[#E5E5E5] text-xs">Pending Reports</p>
          <p className="text-2xl font-bold ">120</p>
        </div>
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-5">
          <p className="text-[#E5E5E5] text-xs">Resolved Reports</p>
          <p className="text-2xl font-bold ">1,100</p>
        </div>
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-5">
          <p className="text-[#E5E5E5] text-xs flex items-center gap-2">
            <Clock className="w-4 h-4" /> First Response Time
          </p>
          <p className="text-2xl font-bold">2 days</p>
        </div>
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-5">
          <p className="text-[#E5E5E5] text-xs">Resolution Time</p>
          <p className="text-2xl font-bold">5 days</p>
        </div>
      </div>

      {/* Total Rewards */}
      <div className="px-6 mb-6">
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6 ">
          <p className="text-[#E5E5E5] text-sm">Total Rewards Awarded</p>
          <p className="text-2xl font-bold ">$50,000</p>
        </div>
      </div>

      {/* Report Analysis Section */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Report Analysis</h2>
        <div className="grid  gap-6">
          {/* Top Products + Vulnerability Report */}
          <div className=" p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Top Products</h3>
                <div className="space-y-4 bg-[#8BAF2B]/20 h-64 border border-[#2a3e2a]/50  rounded-xl p-6">
                  {["Critical", "High", "Medium", "Low"].map((sev, i) => (
                    <div key={sev} className="flex items-center gap-3">
                      <span className="text-[#E5E5E5]] w-8">0{i + 1}</span>
                      <span className="w-20 text-sm">{sev}</span>
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            i === 0
                              ? "bg-red-500"
                              : i === 1
                              ? "bg-yellow-500"
                              : i === 2
                              ? "bg-orange-500"
                              : "bg-emerald-500"
                          }`}
                          style={{
                            width:
                              i === 0
                                ? "46%"
                                : i === 1
                                ? "17%"
                                : i === 2
                                ? "18%"
                                : "19%",
                          }}
                        />
                      </div>
                      <span className="text-sm w-12 text-right">
                        {i === 0
                          ? "46%"
                          : i === 1
                          ? "17%"
                          : i === 2
                          ? "18%"
                          : "19%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Vulnerability Report
                </h3>
                <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={vulnerabilityData}>
                      <defs>
                        <linearGradient
                          id="colorThis"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#a78bfa"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#a78bfa"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#E5E5E5" />
                      <YAxis stroke="#E5E5E5" />
                      <Tooltip
                        contentStyle={{
                          background: "#0f0f0f",
                          border: "1px solid #333",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#a78bfa"
                        fillOpacity={1}
                        fill="url(#colorThis)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  <div className="flex justify-center gap-6 mt-2 text-xs">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full" /> Last
                      Month <span className="text-emerald-400">+2%</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full" />{" "}
                      This Month <span className="text-red-400">-30%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Trend */}
          <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Resolution Trend</h3>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1 bg-zinc-800 rounded">Day</button>
                <button className="px-3 py-1 bg-emerald-900/50 text-emerald-400 rounded">
                  Month
                </button>
                <button className="px-3 py-1 bg-zinc-800 rounded">Month</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={resolutionTrendData}>
                <CartesianGrid stroke="#27272a" strokeDasharray="5 5" />
                <XAxis dataKey="date" stroke="#E5E5E5" fontSize={12} />
                <YAxis stroke="#E5E5E5" />
                <Tooltip
                  contentStyle={{
                    background: "#0f0f0f",
                    border: "1px solid #333",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="mt-6 bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <p className="text-2xl font-bold mb-6">1,058 Reports</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={categoryData}
              layout="horizontal"
              margin={{ left: 20, right: 40 }}
            >
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />

              <XAxis
                type="number"
                stroke="#E5E5E5"
                domain={[0, "dataMax + 100"]}
                ticks={[0, 100, 200, 300, 400, 500]}
              />

              <YAxis
                dataKey="name"
                type="category"
                stroke="#E5E5E5"
                width={110}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f0f0f",
                  border: "1px solid #333",
                }}
                formatter={(value) => [`${value} reports`, "Count"]}
              />

              <Bar
                dataKey="value"
                fill="#10b981"
                radius={[0, 8, 8, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Top Hackers + Recent Reports */}
      <div className="px-6 grid  gap-6">
        {/* Top Hackers */}
        <div className=" overflow-auto rounded-xl text-[#E5E5E5]">
          <div className="p-6 border-b border-[#2a3e2a]/50 flex justify-between">
            <h3 className="text-xl font-bold">Top Hackers</h3>
            <button className=" text-sm">View all</button>
          </div>
          <table className="w-full bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl">
            <thead className="text-xs text-[#E5E5E5] bg-black">
              <tr>
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Hacker Name</th>
                <th className="px-6 py-3 text-left">Points</th>
                <th className="px-6 py-3 text-left">Accepted Reports</th>
                <th className="px-6 py-3 text-left">Severity Breakdown</th>
                <th className="px-6 py-3 text-left">Avg Report Quality</th>
                <th className="px-6 py-3 text-left">Rewards Earned</th>
              </tr>
            </thead>
            <tbody>
              {topHackers.map((h) => (
                <tr
                  key={h.rank}
                  className="border-b border-[#2a3e2a]/50 hover:bg-zinc-900/30"
                >
                  <td className="px-6 py-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        h.rank === 1
                          ? "bg-yellow-500 text-black"
                          : "bg-zinc-800"
                      }`}
                    >
                      {h.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{h.name}</td>
                  <td className="px-6 py-4">{h.points}</td>
                  <td className="px-6 py-4 text-emerald-400">{h.accepted}</td>
                  <td className="px-6 py-4 text-xs text-[#E5E5E5]">
                    {h.severity}
                  </td>
                  <td className="px-6 py-4">{h.accuracy}</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">
                    {h.rewards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Reports */}
        <div className="overflow-auto rounded-xl text-[#E5E5E5]">
          <div className="p-6 border-b border-[#2a3e2a]/50">
            <h3 className="text-xl font-bold">Recent Reports</h3>
          </div>
          <table className="w-full">
            <thead className="text-xs text-[#E5E5E5] bg-[#8BAF2B]/60">
              <tr>
                <th className="px-6 py-3 text-left">Report ID</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Soverity</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Submitted Date</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((r) => (
                <tr
                  key={r.id}
                  className="w-full bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl"
                >
                  <td className="px-6 py-4 ">{r.id}</td>
                  <td className="px-6 py-4">{r.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        r.severity === "Critical"
                          ? "bg-red-900/50 text-red-400"
                          : r.severity === "High"
                          ? "bg-orange-900/50 text-orange-400"
                          : r.severity === "Medium"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-emerald-900/50 text-emerald-400"
                      }`}
                    >
                      {r.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        r.status === "Accepted"
                          ? "bg-emerald-900/50 text-emerald-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4  text-sm">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
