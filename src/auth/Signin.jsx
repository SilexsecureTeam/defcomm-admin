import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logoss.svg";
import logos from "../assets/afri3.svg";
import afri from "../assets/afri.png";
import { toast } from "react-toastify";
import axios from "axios";
import "../index.css";
import OtpInput from "../components/OtpInput";
import { useAuth } from "../context/AuthContext";   // adjust path if needed

const BASE_URL = "https://backend.defcomm.ng/api";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();  // Correctly used here (top level)

  // Tab state: "email" or "phone"
  const [activeTab, setActiveTab] = useState("email");

  // Email login states
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);

  // Phone login states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneSubmitting, setIsPhoneSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // ── Shared success logic ──
  const handleSuccessfulLogin = (responseData) => {
    const apiToken =
      responseData?.data?.access_token ||
      responseData?.access_token ||
      responseData?.token;

    if (!apiToken) {
      console.warn("No access_token found in response");
      return false;
    }

    const userData =
      responseData?.data?.user ||
      responseData?.user ||
      responseData?.data ||
      {};

    // Save to storage
    sessionStorage.setItem("authToken", apiToken);
    sessionStorage.setItem("authUser", JSON.stringify(userData));

    // MOST IMPORTANT: Update context state immediately
    setToken(apiToken);
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;

    // console.log("[handleSuccessfulLogin] Context updated → token:", apiToken.substring(0, 10) + "...");
    // console.log("[handleSuccessfulLogin] sessionStorage now has token:", !!sessionStorage.getItem("authToken"));

    toast.success(responseData?.message || "Login successful!");

    // Navigate after state update
    navigate("/attendancedashboard", { replace: true });

    return true;
  };

  // ── Email OTP Handlers ──
  const handleSendEmailOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.warn("Please enter a valid email address");
      return;
    }

    setIsEmailSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/requestOtpSms`, { phone: email.trim() });
      toast.success("OTP sent to your email!");
      setEmailOtpSent(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send OTP to email. Try again.";
      toast.error(msg);
      console.error("Send email OTP error:", err);
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  const handleEmailOtpLogin = async (e) => {
    e.preventDefault();
    if (emailOtp.length !== 4) {
      toast.warn("Please enter the 4-digit OTP");
      return;
    }

    setIsEmailSubmitting(true);

    try {
      const payload = {
        phone: email.trim(),
        otp: emailOtp,
      };

      const res = await axios.post(`${BASE_URL}/loginWithPhone`, payload);
      const resp = res.data;

      if (resp?.status === 200) {
        const isSuccess =
          resp.message?.toLowerCase().includes("success") ||
          resp.message?.toLowerCase().includes("successful") ||
          resp.data?.access_token;

        if (isSuccess && handleSuccessfulLogin(resp)) {
          return; // success
        }

        const errorText =
          resp?.data?.original?.error ||
          resp?.data?.error ||
          resp?.message ||
          "Login failed - unexpected response";

        toast.error(errorText);
        console.warn("Login response (failure detected):", resp);
      } else {
        toast.error(resp?.message || "Login failed");
      }
    } catch (err) {
      const msg =
        err.response?.data?.data?.original?.error ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
      console.error("Email OTP login error:", err);
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  // ── Phone OTP Handlers ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.trim() || !phone.startsWith("+")) {
      toast.warn("Please enter a valid phone number with country code (e.g. +234...)");
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
      const resp = res.data;

      if (resp?.status === 200) {
        const isSuccess =
          resp.message?.toLowerCase().includes("success") ||
          resp.message?.toLowerCase().includes("successful") ||
          resp.data?.access_token;

        if (isSuccess && handleSuccessfulLogin(resp)) {
          return; // success
        }

        const errorText =
          resp?.data?.original?.error ||
          resp?.data?.error ||
          resp?.message ||
          "Login failed - unexpected response";

        toast.error(errorText);
        console.warn("Login response (failure detected):", resp);
      } else {
        toast.error(resp?.message || "Login failed");
      }
    } catch (err) {
      const msg =
        err.response?.data?.data?.original?.error ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
      console.error("Phone OTP login error:", err);
    } finally {
      setIsPhoneSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row font-sans relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #212B06 0%, #0a0f02 60%, #020202 100%)",
      }}
    >
      {/* Background image layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
        <img
          src={afri}
          alt="Afri background"
          className="w-[65%] max-w-[800px] h-[80%] object-contain"
        />
      </div>

      <div className="hidden lg:flex flex-col justify-center w-1/2 px-5 md:pl-20 relative z-10">
        <div className="flex flex-col items-center lg:items-start">
          <Link to="/" className="mb-7">
            <img src={logo} alt="Logo" className="w-52 h-auto md:w-140" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 lg:px-20 py-12 relative z-10">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 lg:p-10 flex flex-col items-center mx-auto shadow-2xl">
          <h1 className="text-gray-900 text-xl font-bold mb-6">Sign In</h1>
          <img src={logos} alt="Logo" className="w-48 h-auto mb-6" />

          {/* Tabs */}
          <div className="flex w-full mb-6 border-b">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                activeTab === "email"
                  ? "text-[#36460A] border-b-2 border-[#36460A]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                activeTab === "phone"
                  ? "text-[#36460A] border-b-2 border-[#36460A]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Phone Number
            </button>
          </div>

          {/* Email Form */}
          {activeTab === "email" && (
            <div className="w-full">
              {!emailOtpSent ? (
                <form onSubmit={handleSendEmailOtp}>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
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
                        Sending OTP...
                        <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </>
                    ) : (
                      "Send OTP to Email"
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailOtpLogin}>
                  <p className="text-center text-gray-600 mb-6">
                    Enter the 4-digit code sent to<br />
                    <span className="font-medium">{email}</span>
                  </p>

                  <OtpInput length={4} onChange={setEmailOtp} />

                  <button
                    type="submit"
                    disabled={isEmailSubmitting || emailOtp.length !== 4}
                    className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60 mt-8"
                  >
                    {isEmailSubmitting ? (
                      <>
                        Verifying...
                        <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </>
                    ) : (
                      "Login with Email"
                    )}
                  </button>
                </form>
              )}

              {emailOtpSent && (
                <p className="mt-6 text-sm text-center text-gray-600">
                  Didn't receive code?{" "}
                  <button
                    onClick={() => setEmailOtpSent(false)}
                    className="text-[#36460A] hover:underline font-medium"
                  >
                    Try again
                  </button>
                </p>
              )}
            </div>
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
                        <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
                    Enter the 4-digit code sent to<br />
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
                        <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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

          {/* Footer links */}
          <div className="mt-8 text-sm text-gray-600 w-full text-center space-y-2">
            {activeTab === "email" && (
              <div>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#36460A] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <div>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#36460A] hover:underline font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;