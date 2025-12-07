// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./components/dashboard/Overview";
// import Customers from "./components/dashboard/Customers";
import Review from "./components/dashboard/Review";
import Submission from "./components/dashboard/Submission";
import Program from "./components/dashboard/Program";
import ProgramDetails from "./components/dashboard/ProgramDetails";
import Setting from "./components/dashboard/Setting";
import Scoreboard from "./components/dashboard/Scoreboard";
import Analysis from "./components/dashboard/Analysis";
import SignIn from "./auth/Signin";
import OTP from "./auth/Otp.jsx";
// import Analytics from "./components/dashboard/Analytics";

function App() {
  return (
    <Routes>
      {/* All dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        {/* <Route path="customers" element={<Customers />} /> */}
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
        {/* <Route path="analytics" element={<Analytics />} /> */}
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
