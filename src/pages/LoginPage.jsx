import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await login(email, password );
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FAF9F6] p-6">
      <div className="flex w-full max-w-md flex-col items-center">

        {/* Header: Logo & Title */}
        <div className="mb-8 text-center">
          <img src="images/logo.svg" alt="Logo" className="mx-auto block mb-4 h-16 w-16" />
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight text-center">AtomizePlanner</h2>
          <p className="text-[#5C605C] mt-2">Return to your space of intentional productivity.</p>
        </div>

        {/* Card Form */}
        <div className="w-full rounded-[40px] bg-white p-10 shadow-xl border border-gray-100 mb-6 text-left">
          {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            {/* Email Field */}
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-[#5C605C]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-gray-300 py-3 px-5 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="block text-sm font-semibold text-[#5C605C]">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-[#3C6660] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-gray-300 py-3 pl-5 pr-12 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
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
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-[#3C6660] py-3.5 font-bold text-white transition-all hover:bg-[#2b4844] hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center">
              <div className="grow border-t border-gray-200"></div>
              <span className="mx-4 shrink text-[10px] text-gray-400 uppercase tracking-widest font-bold">Or continue with</span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4">
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <img src="images/google.svg" loading="lazy" alt="google" className="h-5 w-5" />
                <span>Google</span>
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <img src="images/apple.svg" loading="lazy" alt="apple" className="h-5 w-5" />
                <span>Apple</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-[#5C605C]">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#3C6660] hover:underline">Create Account</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
