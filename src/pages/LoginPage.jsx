import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { login } from '../services/authService'; 

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === 'email' ? 'email' : 'password']: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await login(formData.email, formData.password);
      console.log('Login Berhasil:', response);
      navigate('/home'); 
    } catch (err) {
      setError(err.message || 'Email atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FAF9F6] p-6">
      <div className="flex w-full max-w-md flex-col items-center">
        
        <div className="mb-8 text-center">
          <img src="images/logo.svg" alt="Logo" className="mx-auto block mb-4 h-16 w-16" />
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight text-center">AtomizePlanner</h2>
          <p className="text-[#5C605C] mt-2">Return to your space of intentional productivity.</p>
        </div>

        <div className="w-full rounded-[40px] bg-white p-10 shadow-xl border border-gray-100 mb-6 text-left">
          
          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Email Field */}
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-[#5C605C]">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 py-3 px-5 outline-none transition-all focus:border-[#3C6660] focus:ring-2 focus:ring-[#3C6660]/10"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="block text-sm font-semibold text-[#5C605C]">Password</label>
                <Link to="/forgot-password" size={20} className="text-xs font-bold text-[#3C6660] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Sign In Button dengan Loading State */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#3C6660] py-3.5 font-bold text-white transition-all hover:bg-[#2b4844] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                'Sign In'
              )}
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
        
        <p className="text-center text-sm text-[#5C605C]">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#3C6660] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
