// OTP.jsx - Matches the new SignIn design exactly
import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import defsignin from "../assets/defsignin.jpg";
import logo from "../assets/defdashboard.svg";

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
    // const code = otp.join("");
    // Add your verification logic here
    navigate("/");
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="px-4 md:px-10 py-6 flex justify-between border-b border-b-gray-800 items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-12" />
          </div>
        </header>

        <div className="flex px-4 md:px-10 py-6">
          {/* Left Side - Hero Image */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <img
              src={defsignin}
              alt="Security researcher"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>

          {/* Right Side - OTP Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex-1 flex items-center justify-center px-2">
              <div className="w-full max-w-xl bg-[#0C1017]/95 px-8 py-12 rounded-md">
                {/* Back Button */}
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 text-[#A7ADBB] hover:text-white transition-colors mb-8"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Link>

                {/* Title + Icon */}
                <div className="text-center mb-10">
                  <div className="mx-auto w-20 h-20 bg-[#A0B84B]/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-[#A0B84B]" />
                  </div>
                  <h1 className="text-4xl font-semibold mb-3">
                    Verify Your Phone
                  </h1>
                  <p className="text-[#D6D9E6] text-base">
                    We've sent a 6-digit code to your phone number.
                  </p>
                </div>

                {/* OTP Inputs */}
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="flex justify-center gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-16 h-16 text-3xl font-bold text-center rounded-xl border border-white/12 bg-[#0A0D13] text-[#E8EAF2] focus:border-[#A1B84D] focus:outline-none transition-all duration-200"
                      />
                    ))}
                  </div>

                  {/* Submit Button - Exact same gradient & shadow as SignIn */}
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className="w-full rounded-full bg-gradient-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center"
                  >
                    Verify & Continue
                  </button>
                </form>

                {/* Resend */}
                <div className="mt-8 text-center">
                  <p className="text-[#A7ADBB] text-sm">
                    Didn’t receive the code?{" "}
                    <button
                      type="button"
                      className="text-[#A0B84B] hover:text-[#c0d870] font-medium transition-colors"
                    >
                      Resend Code
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
