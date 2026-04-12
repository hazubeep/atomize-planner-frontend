// src/components/history/StatCard.jsx
import React from 'react';

const StatCard = ({ title, subtitle, children, variant = 'light' }) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={`p-8 rounded-[40px] shadow-sm flex flex-col justify-between h-full ${
      isDark ? 'bg-[#3C6660] text-white' : 'bg-white text-gray-900 border border-gray-100'
    }`}>
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
          isDark ? 'text-white/60' : 'text-gray-400'
        }`}>
          {subtitle}
        </p>
        <h3 className="text-2xl font-bold leading-tight mb-6">{title}</h3>
      </div>
      
      <div className="flex items-end justify-between">
        {children}
      </div>
    </div>
  );
};

export default StatCard;