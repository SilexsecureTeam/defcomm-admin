import { useLocation } from "react-router-dom";

export default function PageTitle() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/dashboard") return "Overview";
  if (path === "/dashboard/customers") return "Customers";
  if (path === "/dashboard/reviews") return "Reviews";
  if (path === "/dashboard/scoreboard") return "Scoreboard";
  if (path === "/dashboard/submissions") return "Submissions";
  if (path === "/dashboard/programs") return "Programs";
  if (path === "/dashboard/setting") return "Settings";
  if (path === "/dashboard/analysis") return "Analysis";
  if (path.startsWith("/dashboard/programs/details")) return "Program Details";

  return "Dashboard";
}
