// src/auth/RequestOtpSms.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import "../index.css";

const BASE_URL = "https://backend.defcomm.ng/api";

const RequestOtpSms = () => {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.warn("Please enter your phone number");
      return;
    }

    // Optional: Basic format check (you can improve with lib like libphonenumber-js later)
    if (!phone.startsWith("+")) {
      toast.warn("Please include country code (e.g. +234...)");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { phone: phone.trim() };

      const res = await axios.post(`${BASE_URL}/requestOtpSms`, payload);

      toast.success(
        res.data?.message || "OTP sent successfully! Check your phone.",
      );

      // Navigate to OTP verification page (create this next)
      // Pass phone via state so it can be pre-filled there
      navigate("/verify-otp", { state: { phone: phone.trim() } });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to send OTP. Please check the number and try again.";
      toast.error(errorMsg);
      console.error("Request OTP error:", err);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-gray-900 text-2xl font-bold mb-4">
            Verify Phone Number
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your phone number to receive a verification code via SMS.
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="tel"
                placeholder="+2347062787760"
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
                className="w-full bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black border border-gray-300 focus:border-[#36460A]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  Sending OTP...
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
                "Send OTP"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Back to{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-[#36460A] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestOtpSms;
