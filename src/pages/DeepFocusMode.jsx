import React, { useState } from 'react';
import { Play, RotateCcw, Settings, CheckCircle2 } from 'lucide-react';

const FocusTimer = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9F8] flex flex-col items-center justify-center p-4 font-sans text-[#333]">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-4">
          Current Objective
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-md mx-auto text-[#2D3632]">
          Draft 200 words for the introduction
        </h1>
      </div>

      {/* Timer Circle Section */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Decorative Background Frame */}
        <div className="absolute w-64 h-64 border-[16px] border-gray-100 opacity-50 rounded-[40px]"></div>
        
        {/* Main Timer Circle */}
        <div className="relative w-56 h-56 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-50">
          {/* Progress Ring (Visual Only) */}
          <div className="absolute inset-2 rounded-full border-[3px] border-emerald-100"></div>
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-emerald-400 border-r-emerald-400 -rotate-45"></div>
          
          <span className="text-6xl font-semibold tracking-tighter text-[#2D3632]">
            25:00
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-10">
        <button className="p-4 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
          <RotateCcw size={20} className="text-gray-600" />
        </button>

        <button 
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-2 px-8 py-4 bg-[#3E5C54] hover:bg-[#344d46] text-white rounded-full transition-all shadow-md group"
        >
          <Play size={18} fill="currentColor" className={isActive ? 'hidden' : 'block'} />
          <span className="font-medium">{isActive ? 'Pause Session' : 'Start Session'}</span>
        </button>

        <button className="p-4 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
          <Settings size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Mark as Done Button */}
      <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all mb-12 shadow-sm">
        <CheckCircle2 size={18} className="text-gray-400" />
        Mark as Done
      </button>

      {/* Social Proof / Avatars */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" 
            className="w-8 h-8 rounded-full border-2 border-white object-cover" 
            alt="user"
          />
          <div className="w-8 h-8 rounded-full border-2 border-white bg-[#3E5C54] flex items-center justify-center text-[10px] text-white font-bold">
            +12
          </div>
        </div>
        <p className="text-xs text-gray-400 font-medium">
          12 others are focusing right now
        </p>
      </div>

    </div>
  );
};

export default FocusTimer;