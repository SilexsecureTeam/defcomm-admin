import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PageTitle() {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useAuth();

  const displayName = user?.name;

  // Dynamic current date in "Monday, 8 December 2025" format
  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("en-GB", options); // "en-GB" gives "Monday, 8 December 2025" style
  };

  if (path === "/attendancedashboard")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Welcome back {displayName?.split(" ")[0] || "User"}
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          {getCurrentDate()}
        </p>{" "}
      </>
    );

  if (path === "/attendancedashboard/events")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Events
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          Browse all upcoming training, workshops, and cybersecurity events
        </p>{" "}
      </>
    );

  if (path === "/attendancedashboard/attendance")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Attendance
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          Track your check-in and participation across events.
        </p>{" "}
      </>
    );

  if (path === "/attendancedashboard/certificates")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Certificates
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          View and download certificates from events you completed.
        </p>{" "}
      </>
    );

  if (path === "/attendancedashboard/souvenir")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Souvenirs
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          View available souvenirs and claim your rewards
        </p>{" "}
      </>
    );

  if (path === "/attendancedashboard/setting")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Settings
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          Manage your profile and account preferences
        </p>{" "}
      </>
    );

  return "Dashboard";
}
