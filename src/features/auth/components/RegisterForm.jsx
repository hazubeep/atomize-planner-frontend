import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 text-center">
        <img src="images/logo.png" alt="" width="150" height="150" className="mx-auto block"/>
        <h2 className="text-2xl font-bold text-gray-800">Mulai Perjalanan Anda</h2>
        <p className="text-gray-500">Daftar dan Rasakan Pengalaman Baru</p>
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john_doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />

            <button
              type="button" 
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-2 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Daftar Sekarang
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
    Sudah punya akun?{' '}
    <Link 
      to="/login" 
      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
    >
      Login Sekarang
    </Link>
  </p>
      </form>
    </div>
  );
};

export default RegisterForm;