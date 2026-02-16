// src/auth/SignIn.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import "../index.css";
import OtpInput from "../components/OtpInput"; // ← reuse the 4-box OTP component

const BASE_URL = "https://backend.defcomm.ng/api";

const SignIn = () => {
  const { login } = useAuth(); // existing email login
  const navigate = useNavigate();

  // Tab state: "email" or "phone"
  const [activeTab, setActiveTab] = useState("email");

  // Email login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);

  // Phone login states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneSubmitting, setIsPhoneSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // show OTP field after sending

  // ── Email Login ──
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsEmailSubmitting(true);
    await login(email, password);
    setIsEmailSubmitting(false);
  };

  // ── Phone Login ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.trim() || !phone.startsWith("+")) {
      toast.warn(
        "Please enter a valid phone number with country code (+234...)",
      );
      return;
    }

    setIsPhoneSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/requestOtpSms`, { phone: phone.trim() });
      toast.success("OTP sent to your phone!");
      setOtpSent(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send OTP. Try again.";
      toast.error(msg);
      console.error("Send OTP error:", err);
    } finally {
      setIsPhoneSubmitting(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.warn("Please enter the 4-digit OTP");
      return;
    }

    setIsPhoneSubmitting(true);

    try {
      const payload = {
        phone: phone.trim(),
        otp: otp,
      };

      const res = await axios.post(`${BASE_URL}/loginWithPhone`, payload);

      // Assuming backend returns similar structure as email login
      const response = res.data;
      const apiToken = response?.data?.access_token;
      const userData = response?.data?.user;

      if (apiToken && userData) {
        sessionStorage.setItem("authToken", apiToken);
        sessionStorage.setItem("authUser", JSON.stringify(userData));

        // If you have setToken/setUser in AuthContext, call them
        // setToken(apiToken);
        // setUser(userData);

        toast.success(response?.message || "Login successful!");
        navigate("/attendancedashboard");
      } else {
        throw new Error("Login failed - invalid response");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Invalid OTP or login failed.";
      toast.error(msg);
      console.error("Phone login error:", err);
    } finally {
      setIsPhoneSubmitting(false);
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
          <h1 className="text-gray-900 text-2xl font-bold mb-6">Sign In</h1>

          {/* Tabs */}
          <div className="flex w-full mb-6 border-b">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === "email"
                  ? "text-[#36460A] border-b-2 border-[#36460A]"
                  : "text-gray-500"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === "phone"
                  ? "text-[#36460A] border-b-2 border-[#36460A]"
                  : "text-gray-500"
              }`}
            >
              Phone Number
            </button>
          </div>

          {/* Email Form */}
          {activeTab === "email" && (
            <form className="w-full" onSubmit={handleEmailSubmit}>
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
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black border border-gray-300 focus:border-[#36460A]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isEmailSubmitting}
                className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60"
              >
                {isEmailSubmitting ? (
                  <>
                    Signing in...
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
                  "Sign In with Email"
                )}
              </button>
            </form>
          )}

          {/* Phone Form */}
          {activeTab === "phone" && (
            <div className="w-full">
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
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
                    disabled={isPhoneSubmitting}
                    className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60"
                  >
                    {isPhoneSubmitting ? (
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
              ) : (
                <form onSubmit={handlePhoneLogin}>
                  <p className="text-center text-gray-600 mb-6">
                    Enter the 4-digit code sent to <br />
                    <span className="font-medium">{phone}</span>
                  </p>

                  <OtpInput length={4} onChange={setOtp} />

                  <button
                    type="submit"
                    disabled={isPhoneSubmitting || otp.length !== 4}
                    className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60 mt-8"
                  >
                    {isPhoneSubmitting ? (
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
                      "Login with Phone"
                    )}
                  </button>
                </form>
              )}

              {otpSent && (
                <p className="mt-6 text-sm text-center text-gray-600">
                  Didn't receive code?{" "}
                  <button
                    onClick={() => setOtpSent(false)}
                    className="text-[#36460A] hover:underline font-medium"
                  >
                    Try again
                  </button>
                </p>
              )}
            </div>
          )}

          {/* Common links */}
          <div className="mt-6 text-sm text-gray-600 w-full text-center">
            {activeTab === "email" && (
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-[#36460A] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            )}
            <p className="mt-3 hidden">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-[#36460A] hover:underline font-medium"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
