// import { Shield, ChevronDown } from "lucide-react";
import defsignin from "../assets/defsignin.jpg";
import logo from "../assets/defdashboard.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple required check
    if (!username.trim() || !password.trim()) return;

    // Replace with real auth later — for now just go to OTP
    navigate("/otp");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white ">
        {/* Header Navigation */}
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
              alt="Security researcher working"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                backgroundImage: `url(${defsignin})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Main Login Card */}
            <div className="flex-1 flex items-center justify-center px-2">
              <div className="w-full max-w-xl bg-[#0C1017]/95 px-8 py-12 rounded-md">
                <h1 className="text-4xl font-semibold mb-8 ">SIGN IN</h1>

                {/* Registration Tabs */}
                <div className="flex justify-center mb-10">
                  <div className="inline-flex  space-x-2  p-1 rounded-xl">
                    <button className="rounded-2xl border px-3 py-3 text-center font-semibold transition-all duration-150 border-[#A0B84B] bg-[#161C12] text-white shadow-[0_20px_40px_rgba(35,44,18,0.55)]">
                      Create a User Account
                    </button>
                    <button className="rounded-2xl border px-3 py-3 text-center font-semibold transition-all duration-150 border-white/10 bg-[#0F141D] text-[#A7ADBB] hover:border-[#394050] hover:text-white">
                      Register a New Group
                    </button>
                    <button className="rounded-2xl border px-3 py-3 text-center font-semibold transition-all duration-150 border-white/10 bg-[#0F141D] text-[#A7ADBB] hover:border-[#394050] hover:text-white">
                      Register a New Company
                    </button>
                  </div>
                </div>

                {/* Welcome Text */}

                <p className="flex items-start gap-4 rounded-3xl border border-white/12 bg-[#11151E] p-6 text-base mb-3 text-[#D6D9E6]">
                  Bug hunters and security teams, welcome! Join the Defcomm
                  community of cybersecurity enthusiasts and help us build a
                  safer digital world.
                </p>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      USERNAME OR EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username or email"
                      className="w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    SIGN IN
                  </button>
                </form>

                {/* Footer CTA */}
                <div className="rounded-3xl border border-white/12 bg-[#11151C] p-6 m-6 text-sm text-[#C7CBD7]">
                  <p className="text-[13px]">Don't have an account.</p>
                  <button className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#3D4330] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B4BC92] transition-colors duration-150 hover:border-[#607046] hover:text-white">
                    JOIN THE HUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
