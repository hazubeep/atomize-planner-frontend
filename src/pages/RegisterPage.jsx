import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#FAF9F6]">
      
      {/* SISI KIRI: BRANDING & SOCIAL PROOF (Warna Hijau Muda ke Biru) */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#BFEBE4] p-16 lg:flex">
        <div className="flex flex-col items-start gap-8"> 
          
          {/* 1. Logo Badge */}
          <div className="flex items-center text-xs font-bold tracking-widest uppercase">
            <span className="rounded-full bg-[#1C4641] px-6 py-2 text-[#BFEBE4] shadow-sm">
              AtomizePlanner
            </span>
          </div>

          {/* 2. Headline Group */}
          <div className="max-w-xl text-left">
            <h1 className="mb-4 text-6xl font-extrabold leading-[1.1] text-[#1C4641] tracking-tight">
              Start your journey to calm productivity
            </h1>
            <p className="text-xl text-[#1C4641]/80 max-w-md leading-relaxed">
              Replace the noise of standard productivity tools with a mindful sanctuary designed for deep work.
            </p>
          </div>

          {/* 3. Social Proof Group */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="h-12 w-12 rounded-full border-2 border-[#BFEBE4] bg-gray-200 shadow-sm"
                  src={`https://i.pravatar.cc/150?u=reg-${i}`}
                  alt="user avatar"
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-[#1C4641]">
              Joined by 12,000+ mindful creators
            </p>
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM REGISTER (Warna Putih) */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:p-12 lg:w-1/2 lg:bg-[#FAF9F6]">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 md:p-12 shadow-xl lg:shadow-none">
          
          {/* Header Form */}
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-bold text-gray-900">Get Started</h2>
            <p className="text-lg text-[#5C605C]">Create an account to continue.</p>
          </div>

          <form className="flex w-full flex-col">
            {/* Input Name */}
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="mb-2 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-12 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3C6660]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-2 ml-4 text-[11px] text-gray-500 font-medium italic">
                Must be at least 12 characters with a symbol.
              </p>
            </div>

            {/* Checkbox Bulat (Terms & Policy) */}
            <div className="mb-8 mt-4 flex items-start gap-3 px-1 text-left">
              <div className="relative flex items-center shrink-0">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:bg-[#3C6660] checked:border-[#3C6660] focus:outline-none"
                />
                <svg
                  className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <label htmlFor="terms" className="cursor-pointer text-[13px] leading-tight text-gray-500 select-none">
                I agree to the <span className="text-[#3C6660] font-semibold underline">Terms of Service</span> and <span className="text-[#3C6660] font-semibold underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Button */}
            <button 
              type="submit" 
              className="mb-6 w-full rounded-full bg-[#3C6660] py-3.5 font-semibold text-white transition-all hover:bg-[#2b4844] hover:shadow-lg active:scale-[0.98]"
            >
              Create Account
            </button>

            {/* Link Back to Login */}
            <p className="text-center text-sm text-[#5C605C]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#3C6660] hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

    </main>
  );
};

export default RegisterPage;