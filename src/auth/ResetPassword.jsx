// src/auth/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import "../index.css";
import OtpInput from "../components/OtpInput";

const BASE_URL = "https://backend.defcomm.ng/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !token || !password) {
      toast.warn("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { email, token, password };

      const res = await axios.post(`${BASE_URL}/reset-password`, payload);

      toast.success(
        res.data?.message || "Password reset successful! Please sign in.",
      );
      navigate("/signin");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Password reset failed. Check your token or try again.";
      toast.error(errorMsg);
      console.error("Reset password error:", err);
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
            Reset Password
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your email, reset code, and new password.
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black border border-gray-300 focus:border-[#36460A]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">
                Reset Code
              </label>
              <OtpInput length={4} onChange={setToken} />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Resetting...
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
                "Reset Password"
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

export default ResetPassword;
