import React from "react";
import logo from "../../assets/log.png";
import cer from "../../assets/cer.png";
import bountylogo from "../../assets/afd-logo.png";
import afrlogo from "../../assets/afr-logo.png";
import sponsor2 from "../../assets/sponsor2.png";
import sponsor4 from "../../assets/sponsor4.png";
import sponsor6 from "../../assets/sponsor6.png";
import sponsor11 from "../../assets/sponsor11.png";
import { useAuth } from "../../context/AuthContext";

const Certificate = () => {
  const { user } = useAuth();

  const displayName = user?.name || "Your Name"; // fallback if no name

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Certificate Container */}
        <div className="relative w-full max-w-5xl mx-auto shadow-2xl overflow-hidden rounded-lg">
          {/* Left Green Ribbon - thinner on mobile */}
          <div className="absolute left-0 top-0 w-10 sm:w-20 md:w-24 h-48 sm:h-64 bg-[#102206] clip-ribbon-left z-10">
            <div
              className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-[#85AB20]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            ></div>
          </div>

          {/* Right Green Ribbon - adjust gradient if needed */}
          <div className="absolute right-0 top-0 w-10 sm:w-20 md:w-24 h-full bg-[linear-gradient(to_bottom,#36460A_0%,#85AB20_100%)]"></div>

          {/* Main Content Area - more padding on larger, less on mobile */}
          <div className="relative px-12 sm:px-16 md:px-24 py-10 sm:py-12 md:py-16 z-20">
            {/* Header Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img src={logo} alt="logo" className="w-16 sm:w-20" />
              </div>

              <div className="flex justify-center mb-2">
                <img src={bountylogo} alt="" className="w-48 sm:w-60" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide mb-6 sm:mb-8">
                CERTIFICATE OF APPRECIATION
              </h1>
            </div>

            {/* Body Text */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-700 italic mb-4 sm:mb-6">
                This is to certify that
              </p>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight">
                {displayName.split(" ")[0]}
              </h2>

              <div className="w-full max-w-xl sm:max-w-2xl mx-auto h-0.5 bg-gray-300 mb-6 sm:mb-8"></div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
                Volunteered for the{" "}
                <span className="font-bold">BUG BOUNTY PROGRAMME</span> and
                demonstrated outstanding dedication and commitment, contributing
                to the success of the event.
              </p>
            </div>

            {/* Africa Map Decoration - smaller & reposition on mobile */}
            <div className="absolute left-2 sm:left-4 bottom-10 sm:bottom-20 w-40 sm:w-56 h-40 sm:h-56 opacity-30 hidden sm:block">
              <img src={afrlogo} alt="" className="w-full" />
            </div>

            {/* Signatures Section - stack on very small screens if needed */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 sm:mt-16 mb-6 sm:mb-8 relative z-30 mx-auto max-w-xl gap-8 sm:gap-0">
              {/* Left Signature */}
              <div className="text-center">
                <div className="w-40 sm:w-48 h-0.5 bg-gray-800 mb-2"></div>
                <p className="text-sm font-bold text-gray-900">
                  Salami Sophiat
                </p>
                <p className="text-xs text-gray-600">Project Manager</p>
                <p className="text-xs text-gray-600">Defcomm solutions.</p>
              </div>

              {/* Center Seal */}
              <img src={cer} alt="" className="w-8 sm:w-10" />

              {/* Right Signature */}
              <div className="text-center">
                <div className="w-40 sm:w-48 h-0.5 bg-gray-800 mb-2"></div>
                <p className="text-sm font-bold text-gray-900">
                  Nike Ndikak Nelson
                </p>
                <p className="text-xs text-gray-600">Co-Founder</p>
                <p className="text-xs text-gray-600">Defcomm solutions.</p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-gray-200 md:ml-30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
                {/* Left - Initiative */}
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    An Initiative of
                  </p>
                  <img
                    src={logo}
                    alt=""
                    className="w-8 sm:w-10 mx-auto sm:mx-0"
                  />
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Solutions
                  </p>
                </div>

                {/* Right - Partnership */}
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    In Partnership with
                  </p>
                  <div className="flex gap-3 sm:gap-4 items-center justify-center sm:justify-end">
                    <img src={sponsor2} alt="" className="w-10 sm:w-12" />
                    <img src={sponsor4} alt="" className="w-10 sm:w-12" />
                    <img src={sponsor6} alt="" className="w-10 sm:w-12" />
                    <img src={sponsor11} alt="" className="w-10 sm:w-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button - Disabled for now */}
        <div className="mt-8 text-center">
          <button
            disabled
            className="inline-flex items-center px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed opacity-70"
            title="Coming soon – certificate download not available yet. Check back later!"
          >
            Download Certificate
          </button>
          <p className="mt-2 text-sm text-gray-600">
            (Not available yet – feature coming soon!)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
