import { useLocation } from "react-router-dom";

export default function PageTitle() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/attendancedashboard")
    return (
      <>
        {" "}
        <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] block">
          Welcome back, Chris
        </h2>{" "}
        <p className="text-sm md:text-base font-semibold text-[#333333] block">
          Monday, 8 December 2025
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
