// Settings.jsx
import React from "react";
import { Upload, Camera, X, Check, ChevronDown } from "lucide-react";
import avatar from "../../assets/avatar.png";

export default function Setting() {
  return (
    <div className="min-h-screen bg-black text-[#E5E5E5]">
      {/* Header */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Setting Details</h1>
            <p className="text-sm  mt-1">
              Update your photo and personal details here.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium text-[#8BAF2B] border border-[#8BAF2B] rounded-lg hover:bg-[#8BAF2B]/30 transition">
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-[#8BAF2B] rounded-lg hover:bg-[#8BAF2B]/30 transition flex items-center gap-2">
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-8 bg-[#8BAF2B]/20 rounded-xl p-2 md:p-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-[#E5E5E5] border-b border-b-[#E5E5E5] mb-4 pb-3">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Phone No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone no"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Country Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country name"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                  Bio (Write a short introduction)
                </label>
                <textarea
                  rows={4}
                  placeholder="Normal text"
                  className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600 resize-none"
                />
              </div>

              {/* Sample Text */}
              <div className="mt-4 p-4 bg-[#89868D]/50 border border-gray-800 rounded-lg">
                <p className="text-sm text-[#E5E5E5] leading-relaxed">
                  Lorem ipsum, in graphical and textual context, refers to
                  filler text that is placed in a document or visual
                  presentation. Lorem ipsum is derived from the Latin "dolorem
                  ipsum" roughly translated as "pain itself."
                </p>
              </div>

              {/* Timezone */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                  Timezone
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg appearance-none focus:outline-none focus:border-lime-500 transition pr-10">
                    <option>Pacific Standard Time</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Photo + Password */}
          <div className="space-y-8 bg-[#8BAF2B]/20 rounded-xl p-4 h-fit">
            {/* Your Photo */}
            <div className="bg-[#E5E5E5]  rounded-xl p-2 md:p-6">
              <h3 className="text-xl font-semibold text-black mb-4">
                Your Photo
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <button className="text-sm text-black hover:text-lime-300 flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    Edit your photo
                  </button>
                  <button className="text-sm text-red-400 hover:text-red-300 mt-1 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    Delete Update
                  </button>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div className="border-2 border-dashed border-lime-500/30 rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-lime-500/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-lime-500" />
                </div>
                <p className="text-sm text-[#E5E5E5]">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#E5E5E5] mt-1">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>

            {/* Reset Password */}
            <div className=" rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Reset Password
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter zip code"
                  className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-[#89868D] border border-gray-800 rounded-lg focus:outline-none focus:border-lime-500 transition placeholder-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
