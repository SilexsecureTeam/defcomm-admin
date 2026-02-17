import React from "react";
import cer from "../../assets/certificate.svg";

const Certificate = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Certificate Container */}
        <img
          src={cer}
          alt="certificate-img"
          className="mx-auto max-w-4xl w-full"
        />

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
