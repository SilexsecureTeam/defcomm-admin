// SignUp.jsx
import React from "react";
import { Mail, Lock, User, Phone, Globe, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import defsignin from "../assets/defsignin.jpg"; // reuse same image

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Left Side - Image (hidden on mobile) */}
        <div className="relative overflow-hidden hidden md:block">
          <img
            src={defsignin}
            alt="Join Defcomm"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-center px-5 py-6 sm:px-8 md:px-12 overflow-y-auto">
          <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-slate-900/95 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Join the Hunt
              </h2>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Create your Defcomm account
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="Type here"
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type here"
                    className="w-full px-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  className="w-full px-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="Type here"
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    placeholder="Type here"
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    placeholder="Type here"
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country of Residence <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#8BAF2B]/20 focus:ring-2 focus:ring-[#8BAF2B]/30 transition-all appearance-none">
                    <option>Select</option>
                    <option>Nigeria</option>
                    <option>United States</option>
                    {/* Add more */}
                  </select>
                </div>
              </div>

              <div className="space-y-4 py-4 text-sm text-gray-400">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-[#8BAF2B] rounded border-gray-600 focus:ring-[#8BAF2B]"
                  />
                  <span>
                    I have read, understood, and accept the{" "}
                    <a
                      href="#"
                      className="text-[#8BAF2B] underline hover:text-[#9ACD32]"
                    >
                      Defcomm General Conditions of Use
                    </a>
                  </span>
                </label>

                <p className="text-xs leading-relaxed">
                  The information you provide will be processed by Defcomm as
                  the data controller for the creation and management of your
                  account. To learn more about how we handle your data and your
                  rights, please review our{" "}
                  <a
                    href="#"
                    className="text-[#8BAF2B] underline hover:text-[#9ACD32]"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <p className="text-xs text-gray-500">• Mandatory Fields</p>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-[#8BAF2B] hover:bg-[#9ACD32] active:bg-[#7A9E26] text-black font-bold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg"
              >
                <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Join the Hunt
              </button>

              <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-[#8BAF2B] hover:text-[#9ACD32] underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
