// src/auth/VerifyOtp.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import "../index.css";

const BASE_URL = "https://backend.defcomm.ng/api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone || ""; // pre-filled from request page

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.warn("Please enter the full 4-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        phone: phone,
        otp: otp, // or "code" — adjust key if backend expects different name
      };

      const res = await axios.post(`${BASE_URL}/verifyOtpSms`, payload); // ← adjust endpoint if different

      toast.success(res.data?.message || "Phone verified successfully!");

      // Where to go after success? e.g. dashboard, complete registration, etc.
      navigate("/attendancedashboard"); // or "/register" / "/profile-setup" — change as needed
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMsg);
      console.error("Verify OTP error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    // Optional: resend OTP logic
    if (!phone) return;
    try {
      await axios.post(`${BASE_URL}/requestOtpSms`, { phone });
      toast.info("New OTP sent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row font-sans"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-10 pt-15">
        <div className="flex flex-col items-center lg:items-start">
          <a href="#" className="mb-7">
            <img src={logo} alt="Logo" className="w-52 h-auto" />
          </a>
          <h2 className="text-white text-xl lg:text-2xl font-normal">
            Redefining Defence, Communication
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 lg:px-20 py-12">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 lg:p-10 flex flex-col items-center mx-auto">
          <h1 className="text-gray-900 text-2xl font-bold mb-4">Verify OTP</h1>
          <p className="text-gray-600 text-center mb-6">
            Enter the 4-digit code sent to <br />
            <span className="font-medium">{phone || "your phone"}</span>
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <OtpInput length={4} onChange={setOtp} />

            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 4}
              className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60 mt-8"
            >
              {isSubmitting ? (
                <>
                  Verifying...
                  <svg
                    className="animate-spin h-5 w-5 ml-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 flex flex-col items-center gap-2">
            <p>
              Didn't receive code?{" "}
              <button
                onClick={handleResend}
                className="text-[#36460A] hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>
            <button
              onClick={() => navigate("/request-otp")}
              className="text-[#36460A] hover:underline font-medium"
            >
              Change Phone Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
