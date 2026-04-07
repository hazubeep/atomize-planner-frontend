import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService'; 

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await register(formData);
      console.log('Registrasi Berhasil:', response);
      navigate('/home'); 
    } catch (err) {
      setError(err.message || 'Gagal membuat akun. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#FAF9F6]">
      
      {/* SISI KIRI */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#BFEBE4] p-16 lg:flex">
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center text-xs font-bold tracking-widest uppercase">
            <span className="rounded-full bg-[#1C4641] px-6 py-2 text-[#BFEBE4] shadow-sm">AtomizePlanner</span>
          </div>
          <div className="max-w-xl text-left">
            <h1 className="mb-4 text-6xl font-extrabold leading-[1.1] text-[#1C4641] tracking-tight">
              Start your journey to calm productivity
            </h1>
            <p className="text-xl text-[#1C4641]/80 max-w-md leading-relaxed">
              Replace the noise of standard productivity tools with a mindful sanctuary designed for deep work.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img key={i} className="h-12 w-12 rounded-full border-2 border-[#BFEBE4] bg-gray-200 shadow-sm" src={`https://i.pravatar.cc/150?u=reg-${i}`} alt="user avatar" />
              ))}
            </div>
            <p className="text-sm font-semibold text-[#1C4641]">Joined by 12,000+ mindful creators</p>
          </div>
        </div>
      </div>

      {/* SISI KANAN */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:p-12 lg:w-1/2 lg:bg-[#FAF9F6]">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 md:p-12 shadow-xl lg:shadow-none">
          
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-bold text-gray-900">Get Started</h2>
            <p className="text-lg text-[#5C605C]">Create an account to continue.</p>
          </div>

          {/* Tampilkan Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            {/* Input Name */}
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  name="name" // Pastikan ada properti name
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-semibold text-[#5C605C]">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                Must be at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="mb-8 mt-4 flex items-start gap-3 px-1 text-left">
              <div className="relative flex items-center shrink-0">
                <input id="terms" type="checkbox" required className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:bg-[#3C6660] checked:border-[#3C6660] focus:outline-none" />
                <svg className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <label htmlFor="terms" className="cursor-pointer text-[13px] leading-tight text-gray-500 select-none">
                I agree to the <span className="text-[#3C6660] font-semibold underline">Terms of Service</span> and <span className="text-[#3C6660] font-semibold underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Button dengan Loading */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="mb-6 flex w-full items-center justify-center rounded-full bg-[#3C6660] py-3.5 font-semibold text-white transition-all hover:bg-[#2b4844] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-sm text-[#5C605C]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#3C6660] hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
