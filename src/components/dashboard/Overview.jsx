// Overview.jsx
import React from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Clock,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  Activity,
  TrendingUp,
  Users,
  BarChart3,
  Calendar,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import avatar from "../../assets/avatar.png";

const submissionTrendData = [
  { month: "SEP", Critical: 45, High: 80, Medium: 120, Low: 140 },
  { month: "OCT", Critical: 48, High: 85, Medium: 115, Low: 135 },
  { month: "NOV", Critical: 42, High: 78, Medium: 125, Low: 145 },
  { month: "DEC", Critical: 50, High: 90, Medium: 130, Low: 138 },
  { month: "JAN", Critical: 44, High: 82, Medium: 118, Low: 142 },
  { month: "FEB", Critical: 46, High: 88, Medium: 122, Low: 139 },
];

const rewardsData = [
  { day: "Mon", amount: 65 },
  { day: "Tue", amount: 40 },
  { day: "Wed", amount: 75 },
  { day: "Thu", amount: 30 },
  { day: "Fri", amount: 70 },
  { day: "Sat", amount: 20 },
  { day: "Sun", amount: 55 },
];

const severityPieData = [
  { name: "Critical", value: 63, color: "#ef4444" },
  { name: "High", value: 63, color: "#f97316" },
  { name: "Medium", value: 63, color: "#eab308" },
  { name: "Low", value: 63, color: "#22c55e" },
];

const todaySubmissionsData = [
  { time: "0-3h", count: 15 },
  { time: "4-7h", count: 35 },
  { time: "8-11h", count: 55 },
  { time: "12-15h", count: 80 },
  { time: "16-19h", count: 45 },
  { time: "20-23h", count: 30 },
  { time: "24h", count: 20 },
];

const topCategoriesData = [
  { name: "Authentication", value: 80, percentage: "30%" },
  { name: "XSS", value: 65, percentage: "20%" },
  { name: "API Vuln", value: 55, percentage: "18%" },
  { name: "Auth Bypass", value: 45, percentage: "17%" },
  { name: "Data Exposure", value: 30, percentage: "8%" },
  { name: "CSRF", value: 15, percentage: "4%" },
  { name: "Other", value: 10, percentage: "3%" },
];

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#000000] text-white p-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5]  rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex text-[#E5E5E5] items-center gap-4 mb-4">
            <BarChart3 className="w-5 h-5 " />
            <h3 className="text-[#E5E5E5] text-sm font-medium">
              Total Submissions
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold">358</div>
            <div className="flex items-center mt-2 text-[#14CA74] bg-[#05C168]/20 text-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>28.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5]  rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="w-5 h-5 " />
            <h3 className=" text-sm font-medium">Pending Reviews</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold">58</div>
            <div className="text-gray-500 text-sm mt-2">0%</div>
          </div>
        </div>

        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5]  rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-5 h-5 " />
            <h3 className=" text-sm font-medium">Approved Reports</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold">330</div>
            <div className="flex items-center mt-2 text-[#14CA74] bg-[#05C168]/20 text-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>6%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#8BAF2B]/20 text-[#E5E5E5]  rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center gap-4 mb-4">
            <DollarSign className="w-5 h-5 " />
            <h3 className=" text-sm font-medium">Rewards Paid</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold">358</div>
            <div className="text-gray-500 text-sm mt-2">0%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4 text-[#E5E5E5] ">
        {/* Submission Trend */}
        <div className=" bg-[#8BAF2B]/20 rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-start justify-between mb-6">
            <div className="grid gap-2">
              <h2 className="text-xl font-semibold">Submission Trend</h2>
              <div className="flex gap-3 text-xs">
                <select className="bg-[#8BAF2B]/40 border border-[#1e3a2a] rounded-lg px-3 py-2">
                  <option>Severity</option>
                </select>
                <select className="bg-[#8BAF2B]/40 border border-[#1e3a2a] rounded-lg px-3 py-2">
                  <option>Program</option>
                </select>
                <select className="bg-[#8BAF2B]/40 border border-[#1e3a2a] rounded-lg px-3 py-2">
                  <option>Platform</option>
                </select>
              </div>
            </div>
            <button className="bg-[#1B254B]  px-4 py-2 rounded-lg text-xs flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This month
            </button>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col space-y-6 w-fit ">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">Low</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={submissionTrendData}>
                <CartesianGrid stroke="#1e3a2a" />
                <XAxis dataKey="month" stroke="#4b6b5a" />
                <YAxis stroke="#4b6b5a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a1f0f",
                    border: "1px solid #1e3a2a",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Critical"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: "#a855f7" }}
                />
                <Line
                  type="monotone"
                  dataKey="High"
                  stroke="#fb923c"
                  strokeWidth={3}
                  dot={{ fill: "#fb923c" }}
                />
                <Line
                  type="monotone"
                  dataKey="Medium"
                  stroke="#fbbf24"
                  strokeWidth={3}
                  dot={{ fill: "#fbbf24" }}
                />
                <Line
                  type="monotone"
                  dataKey="Low"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: "#22d3ee" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rewards Paid */}
        <div className="bg-[#8BAF2B]/20 rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Rewards Paid</h2>
            <button className="bg-[#1B254B]  px-4 py-2 rounded-lg text-xs flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This month
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rewardsData}>
              <CartesianGrid stroke="#1e3a2a" />
              <XAxis dataKey="day" stroke="#4b6b5a" />
              <YAxis stroke="#4b6b5a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a1f0f",
                  border: "1px solid #1e3a2a",
                }}
              />
              <Bar dataKey="amount" barSize={20} radius={[8, 8, 0, 0]}>
                {rewardsData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 || i === 2 || i === 4 ? "#facc15" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 text-[#E5E5E5] gap-2 mb-4">
        <div className="col-span-2 bg-[#8BAF2B]/20 rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Pending Submissions</h2>
            <a href="#" className="text-sm  hover:underline">
              View all
            </a>
          </div>

          <div className="overflow-y-auto max-h-66">
            <table className="w-full text-left">
              <thead>
                <tr className=" text-xs uppercase tracking-wider border-b border-[#1e3a2a]">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 px-4">Report ID</th>
                  <th className="pb-3 px-4">Title</th>
                  <th className="pb-3 pl-4">Date</th>
                </tr>
              </thead>
              <tbody className="">
                {[
                  {
                    name: "Alex Turner",
                    reportId: "RPT-2024-001",
                    title: "Cross-Site Scripting",
                    date: "25-03-15",
                  },
                  {
                    name: "Horizon UI Free",
                    reportId: "RPT-2024-001",
                    title: "Cross-Site Scripting",
                    date: "25-03-15",
                  },
                  {
                    name: "Weekly Update",
                    reportId: "RPT-2024-001",
                    title: "Cross-Site Scripting",
                    date: "25-03-15",
                  },
                  {
                    name: "Venus 3D Asset",
                    reportId: "RPT-2024-001",
                    title: "Cross-Site Scripting",
                    date: "25-03-15",
                  },
                  {
                    name: "Marketplace",
                    reportId: "RPT-2024-001",
                    title: "Cross-Site Scripting",
                    date: "25-03-15",
                  },
                ].map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1e3a2a]/30 transition-colors "
                  >
                    <td className="py-4 pr-4 ">
                      <div className="flex items-center gap-3">
                        {/* Placeholder avatar – replace with real src or use lucide User if preferred */}
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4  text-sm font-mono">{item.reportId}</td>
                    <td className="px-4 text-sm">{item.title}</td>
                    <td className="pl-4  text-sm">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Submissions + Severity Distribution */}

        <div className="bg-[#8BAF2B]/20 rounded-2xl text-[#E5E5E5] p-6 border border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Today's Submissions</h2>
            <span className="text-green-400 text-sm flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12.45%
            </span>
          </div>
          <div className="text-4xl font-bold mb-2">124</div>
          <div className="text-sm mb-6">In the last 24h</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={todaySubmissionsData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <YAxis domain={[0, "dataMax"]} hide />
              <Bar
                dataKey="count"
                barSize={16}
                fill="#8b5cf6"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#8BAF2B]/20 rounded-2xl p-6 border text-[#E5E5E5] border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Severity Distribution</h2>
            <select className="bg-[#0a1f0f] border border-[#1e3a2a] rounded-lg px-3 py-1 text-xs">
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RePieChart>
              <Pie
                data={severityPieData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {severityPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div> Critical{" "}
              </div>
              <span className="ml-auto">63%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div> High{" "}
              </div>
              <span className="ml-auto">63%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>{" "}
                Medium{" "}
              </div>
              <span className="ml-auto">63%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div> Low{" "}
              </div>
              <span className="ml-auto">63%</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
      </div>
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
        {/* Top Categories */}
        <div className="bg-[#8BAF2B]/20 rounded-2xl p-6 border text-[#E5E5E5] border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">
              Top Categories of Issues Reported
            </h2>
            <select className="bg-[#0a1f0f] border border-[#1e3a2a] rounded-lg px-3 py-2 text-sm">
              <option>monthly</option>
            </select>
          </div>

          <div className="mb-2">
            <h2>200</h2>
            <h4>Last 30 days</h4>
          </div>

          <div className="space-y-5">
            {topCategoriesData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-4 text-sm">
                {/* Category Name */}
                <span className="w-40 text-left font-medium truncate">
                  {cat.name}
                </span>

                {/* Bar + Percentage right after it */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    {" "}
                    {/* limits total bar space */}
                    {/* Background track */}
                    <div className="bg-[#0a1f0f] rounded-full h-3 w-full" />
                    {/* Filled bar – takes exact % */}
                    <div
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-700 ${
                        cat.name === "Authentication"
                          ? "bg-orange-500"
                          : cat.name === "XSS"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: cat.percentage }}
                    />
                  </div>

                  {/* Percentage label – sits right after the bar */}
                  <span className="text-gray-400 text-xs font-medium min-w-12 text-right">
                    {cat.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hackers */}
        <div className="bg-[#8BAF2B]/20 rounded-2xl p-6 border border-[#1e3a2a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" /> Top Hackers (205)
            </h2>
            <a href="#" className="text-sm  hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-4 w-full">
            {[
              { name: "@CyberHunter", role: "Cyber Security Analyst", rank: 1 },
              { name: "@CryptoGuard", role: "Blockchain Researcher", rank: 2 },
              { name: "@Jarvis", role: "Cyber Security Analyst", rank: 3 },
              { name: "@CyberHunter", role: "Cyber Security Analyst", rank: 4 },
            ].map((hacker) => (
              <div
                key={hacker.name}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="flex items-center gap-4 ">
                    <div>
                      <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-full w-8 h-8"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{hacker.name}</div>
                      <div className="text-xs text-gray-400">{hacker.role}</div>
                    </div>
                  </div>
                  {hacker.rank}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#8BAF2B]/20 text-[#E5E5E5] rounded-2xl p-6 border border-[#1e3a2a]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <a href="#" className="text-sm  hover:underline">
            View all activity →
          </a>
        </div>
        <div className="space-y-4">
          {[
            {
              icon: <CheckCircle className="w-5 h-5 text-green-400" />,
              bg: "bg-green-900",
              title: "Report #1234 Approved",
              subtitle: "100 points • $500 • Approved",
              time: "2h ago",
              titleClass: "",
            },
            {
              icon: <DollarSign className="w-5 h-5 text-green-400" />,
              bg: "bg-green-900",
              title: "Payout for Report #1234",
              subtitle: "Payout issued",
              time: "3h ago",
              titleClass: "",
            },
            {
              icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
              bg: "bg-red-900",
              title: "Report #5678 SLA Warning",
              subtitle: "SLA warning",
              time: "4h ago",
              titleClass: "text-red-400",
            },
            {
              icon: <Activity className="w-5 h-5 text-blue-400" />,
              bg: "bg-blue-900",
              title: "Report #9012 Status Changed",
              subtitle: "Status changed",
              time: "5h ago",
              titleClass: "",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-[#8BAF2B]/20 rounded-2xl p-4 border border-[#1e3a2a] justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${item.titleClass}`}>
                    {item.title}
                  </div>
                  <div className="text-sm ">{item.subtitle}</div>
                </div>
              </div>
              <div className="text-xs mt-1">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
