// src/auth/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Defcomm-04 2.svg";
import bgImage from "../assets/defcoobg.jpg";
import "../index.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;

    setIsSubmitting(true);
    const success = await register(name, email, phone, password);
    setIsSubmitting(false);

    if (success) {
      // already navigated in context, but you can override if needed
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
          <h1 className="text-gray-900 text-2xl font-bold mb-4">Register</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
                className="w-full bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black border border-gray-300 focus:border-[#36460A]"
                required
              />
            </div>
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
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
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
              disabled={isSubmitting}
              className="w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  Creating account...
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
                "Register"
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-[#36460A] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
