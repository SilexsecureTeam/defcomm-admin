// Scoreboard.tsx
import React from "react";
import {
  Download,
  Search,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
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
// import { format } from "date-fns";

const engagementData = [
  { month: "Jan", value: 78 },
  { month: "Feb", value: 85 },
  { month: "Mar", value: 82 },
  { month: "Apr", value: 90 },
  { month: "May", value: 88 },
  { month: "Jun", value: 95 },
  { month: "Jul", value: 102 },
];

const severityData = [
  { name: "Critical", value: 200, fill: "#ff0044" },
  { name: "High", value: 350, fill: "#ff6600" },
  { name: "Medium", value: 480, fill: "#ffaa00" },
  { name: "Low", value: 300, fill: "#00ff99" },
];

const payoutData = [
  { month: "Jan", amount: 85000 },
  { month: "Feb", amount: 92000 },
  { month: "Mar", amount: 78000 },
  { month: "Apr", amount: 105000 },
  { month: "May", amount: 98000 },
  { month: "Jun", amount: 115000 },
  { month: "Jul", amount: 110000 },
];

const leaderboardData = [
  {
    rank: 1,
    name: "Lucas Bennett",
    hacker: "@lucasb",
    reports: 120,
    accepted: 120,
    rejected: 0,
    severity: "Critical 76, High 32, Low 12",
    accuracy: "100%",
    points: 13000,
    rewards: "$10,000",
    avgPoints: 108.3,
    breakdown: "98%",
    status: "Active",
  },
  {
    rank: 2,
    name: "Sophia Carter",
    hacker: "@sophiac",
    reports: 115,
    accepted: 115,
    rejected: 0,
    severity: "Critical 18, High 32, Med 45, Low 20",
    accuracy: "100%",
    points: 11500,
    rewards: "$9,500",
    avgPoints: 100.0,
    breakdown: "92%",
    status: "Active",
  },
  {
    rank: 3,
    name: "Sophia Carter",
    hacker: "@sophiac",
    reports: 115,
    accepted: 115,
    rejected: 0,
    severity: "Critical 18, High 32, Med 45, Low 20",
    accuracy: "100%",
    points: 11500,
    rewards: "$9,500",
    avgPoints: 100.0,
    breakdown: "92%",
    status: "Active",
  },
  {
    rank: 4,
    name: "Sophia Carter",
    hacker: "@sophiac",
    reports: 115,
    accepted: 115,
    rejected: 0,
    severity: "Critical 18, High 32, Med 45, Low 20",
    accuracy: "100%",
    points: 11500,
    rewards: "$9,500",
    avgPoints: 100.0,
    breakdown: "92%",
    status: "Active",
  },
];

export default function Scoreboard() {
  return (
    <div className="min-h-screen bg-black grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-4 text-white">
      <div className="lg:col-span-2">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#E5E5E5]">
              Scoreboard - Hacker Performance
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center text-[#E5E5E5] gap-2 bg-[#8BAF2B] hover:bg-[#8BAF2B]/30 px-4 py-2 rounded-lg  transition-all">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-[#2a3e2a]/50">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <select className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2 text-white">
                  <option>All Programs</option>
                </select>
                <select className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2 text-white">
                  <option>Time Period: All Time</option>
                </select>
                <select className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2 text-white">
                  <option>Severity: All</option>
                </select>
                <select className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-lg px-4 py-2 text-white">
                  <option>Reward Range: All</option>
                </select>
              </div>
            </div>
            <div className="flex-1" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search hacker usernames"
                className="bg-gray-900 border border-[#2a3e2a]/50 rounded-lg pl-10 pr-4 py-2 w-full text-sm"
              />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Summary */}
          <div className="grid grid-cols-4 text-[#E5E5E5] gap-4">
            <div className="bg-[#8BAF2B]/20 rounded-xl p-6">
              <div className="flex items-center  gap-3">
                <div>
                  <p className=" text-sm">Total Hackers</p>
                  <p className="text-2xl font-bold">1,265</p>
                </div>
              </div>
            </div>
            <div className="bg-[#8BAF2B]/20 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div>
                  <p className=" text-sm">Highest Reward Paid</p>
                  <p className="text-2xl font-bold ">$50,000</p>
                </div>
              </div>
            </div>
            <div className="bg-[#8BAF2B]/20 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div>
                  <p className=" text-sm">Avg Points / Hacker</p>
                  <p className="text-2xl font-bold">75</p>
                </div>
              </div>
            </div>
            <div className="bg-[#8BAF2B]/20 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div>
                  <p className=" text-sm">Total Reports</p>
                  <p className="text-2xl font-bold">1,265</p>
                </div>
              </div>
            </div>
            <div className=" border border-[#8BAF2B]/20 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-zinc-500 text-xs">Total Accepted Reports</p>
              <p className="text-2xl font-bold text-emerald-400">4,567</p>
            </div>
          </div>

          {/* Main Grid: Leaderboard + Analytics */}
          <div className="">
            {/* Leaderboard */}
            <div className="">
              <h2 className="text-xl font-bold py-4">Leaderboard</h2>
              <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl overflow-hidden ">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-black text-[#E5E5E5] text-xs border-b border-[#2a3e2a]/50">
                        <th className="px-6 py-4">Rank</th>
                        <th className="px-6 py-4">Hacker</th>
                        <th className="px-6 py-4">Accepted Reports</th>
                        <th className="px-6 py-4">Rejected Reports</th>
                        <th className="px-6 py-4">Severity Breakdown</th>
                        <th className="px-6 py-4">Report Accuracy</th>
                        <th className="px-6 py-4">Rewards (USD)</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((row) => (
                        <tr
                          key={row.rank}
                          className="border-b border-[#2a3e2a]/50 hover:bg-zinc-900/50 transition-all"
                        >
                          <td className="px-6 py-5">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm `}
                            >
                              {row.rank}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div>
                              <p className="font-medium">{row.name}</p>
                              {/* <p className="text-emerald-400 text-sm">
                                {row.hacker}
                              </p> */}
                            </div>
                          </td>
                          <td className="px-6 py-5  font-medium">
                            {row.accepted}
                          </td>
                          <td className="px-6 py-5 ">{row.rejected}</td>
                          <td className="px-6 py-5 text-xs ">{row.severity}</td>
                          <td className="px-6 py-5">
                            <span className=" font-medium">{row.accuracy}</span>
                          </td>
                          <td className="px-6 py-5 font-medium ">
                            {row.rewards}
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                              {row.status}
                            </span>
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
      </div>
      {/* Analytics Sidebar */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#E5E5E5]">Analysis</h1>
        {/* Program Engagement Trend */}
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
          <div className="flex flex-col  mb-4">
            <h3 className="text-lg font-semibold">Program Engagement Trend</h3>
            <div className="">
              <p className="text-2xl font-bold text-emerald-400">+15%</p>
              <p className="text-xs ">Last 30 Days +15%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" stroke="#E5E5E5" fontSize={12} />
              <YAxis stroke="#E5E5E5" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f0f0f",
                  border: "1px solid #333",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00ff88"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Severity Types */}
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
          <div className="flex flex-col text-[#E5E5E5] mb-4">
            <h3 className="text-lg font-semibold">
              Top Severity Types Reported
            </h3>
            <div className="">
              <p className="text-2xl font-bold text-red-500">35%</p>
              <p className="text-xs 0">Last 30 Days +5%</p>
            </div>
          </div>
          <div className="space-y-3">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-24 text-xs text-[#E5E5E5]">{item.name}</div>
                <div className="flex-1  rounded-full h-6 relative overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      width: `${(item.value / 1330) * 100}%`,
                      backgroundColor: item.fill,

                      opacity: 0.8,
                    }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Distribution */}
        <div className="bg-[#8BAF2B]/20 border border-[#2a3e2a]/50 rounded-xl p-6">
          <div className="flex flex-col text-[#E5E5E5] mb-4">
            <h3 className="text-lg font-semibold">Payout Distribution</h3>
            <div className="">
              <p className="text-2xl font-bold text-emerald-400">$100,000</p>
              <p className="text-xs ">+24%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={payoutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" stroke="#E5E5E5" fontSize={12} />
              <YAxis stroke="#E5E5E5" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f0f0f",
                  border: "1px solid #333",
                }}
              />
              <Bar
                dataKey="amount"
                barSize={16}
                fill="#00ff88"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#E5E5E5] text-center mt-2">
            Last 7 months
          </p>
        </div>
      </div>
    </div>
  );
}
