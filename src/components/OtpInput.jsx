// src/components/OtpInput.jsx
import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^\d$/)) {
      // only allow single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join("")); // send full OTP string to parent

      // Move to next input if available
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous on backspace when empty
        inputs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, length).split("");
      const newOtp = Array(length).fill("");
      digits.forEach((digit, i) => {
        if (i < length) newOtp[i] = digit;
      });
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Focus last filled or next empty
      const nextIndex = digits.length < length ? digits.length : length - 1;
      inputs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 md:gap-4 my-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputs.current[index] = el)}
          className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold bg-[rgb(232,240,254)] border border-gray-300 rounded-lg focus:border-[#36460A] focus:outline-none transition-all"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};

export default OtpInput;
