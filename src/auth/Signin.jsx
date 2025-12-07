// SignIn.jsx
import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import defsignin from "../assets/defsignin.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/otp");
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

        {/* Right Side - Form */}
        <div className="flex items-center justify-center px-5 py-6 sm:px-8 md:px-12">
          <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-slate-900/95 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Sign in to your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 text-base bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 text-base bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[#8BAF2B] focus:ring-[#8BAF2B] focus:ring-offset-gray-900"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-[#8BAF2B] hover:text-[#9ACD32] transition whitespace-nowrap"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-[#8BAF2B] hover:bg-[#9ACD32] active:bg-[#7A9E26] text-black font-bold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg"
              >
                <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Sign In
              </button>

              <p className="text-center text-sm sm:text-base text-gray-400 mt-8">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#8BAF2B] hover:text-[#9ACD32] transition underline underline-offset-4"
                >
                  Sign up now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
