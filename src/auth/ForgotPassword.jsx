// src/auth/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import "../index.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://backend.defcomm.ng/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });

      toast.success(
        res.data?.message || "Reset code sent to your email! Check your inbox.",
      );

      // NEW: Navigate to reset password page after success
      navigate("/reset-password");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to send reset request. Please try again.";
      toast.error(errorMsg);
      console.error("Forgot password error:", err);
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
            Forgot Password
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your email and we'll send you a reset code/token.
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
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
                  Sending...
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
                "Send Reset Code"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Remember your password?{" "}
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

export default ForgotPassword;
