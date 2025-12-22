// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
// bounty dashboard imports
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./components/dashboard/Overview";
import Review from "./components/dashboard/Review";
import Submission from "./components/dashboard/Submission";
import Program from "./components/dashboard/Program";
import ProgramDetails from "./components/dashboard/ProgramDetails";
import Setting from "./components/dashboard/Setting";
import Scoreboard from "./components/dashboard/Scoreboard";
import Analysis from "./components/dashboard/Analysis";
// attendance dashboard imports
import AttendanceDashboardLayout from "./pages/AttendanceDashboardLayout";
import AttendanceOverview from "./components/attendancedashboard/AttendanceOverview";
import AttendanceEvent from "./components/attendancedashboard/AttendanceEvent.jsx";
import Attendance from "./components/attendancedashboard/Attendance.jsx";
// auth imports
import SignIn from "./auth/Signin";
import OTP from "./auth/Otp.jsx";

function App() {
  return (
    <Routes>
      {/* All bounty dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="reviews" element={<Review />} />
        <Route path="submissions" element={<Submission />} />
        <Route path="programs" element={<Program />} />
        <Route
          path="programs/details/:programId"
          element={<ProgramDetails />}
        />
        <Route path="setting" element={<Setting />} />
        <Route path="scoreboard" element={<Scoreboard />} />
        <Route path="analysis" element={<Analysis />} />
      </Route>
      {/* All attendance dashboard routes */}
      <Route
        path="/attendancedashboard"
        element={<AttendanceDashboardLayout />}
      >
        <Route index element={<AttendanceOverview />} />
        <Route path="events" element={<AttendanceEvent />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/otp" element={<OTP />} />
    </Routes>
  );
}

export default App;
