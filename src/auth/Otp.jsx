// OTP.jsx - Controlled + Navigates to "/" on submit
import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import defsignin from "../assets/defsignin.jpg";

export default function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Left Side - Image */}
        <div className="relative overflow-hidden hidden md:block">
          <img
            src={defsignin}
            alt="Security & Hacking"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 md:hidden" />
        </div>

        <div className="flex items-center justify-center px-5 py-6 sm:px-8 md:px-12">
          <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-slate-900/95 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl">
            <Link
              to="/signup"
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </Link>

            <div className="text-center mb-10">
              <div className="mx-auto w-16 h-16 bg-[#8BAF2B]/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-[#8BAF2B]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Verify Your Phone
              </h2>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-2xl font-bold text-center bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#8BAF2B] focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={otp.some((d) => d === "")} // optional: disable if incomplete
                className="w-full py-5 bg-[#8BAF2B] hover:bg-[#9ACD32] active:bg-[#7A9E26] disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg"
              >
                Verify & Continue
              </button>

              <p className="text-center text-sm text-gray-400">
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  className="text-[#8BAF2B] hover:text-[#9ACD32] font-medium"
                >
                  Resend Code
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
