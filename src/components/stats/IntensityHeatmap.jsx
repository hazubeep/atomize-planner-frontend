// src/components/stats/IntensityHeatmap.jsx
import React from 'react';

const IntensityHeatmap = ({ data = [] }) => {
  const colors = [
    'bg-[#E0E4DE]', // Tidak ada fokus
    'bg-[#BFEBE4]', // Fokus ringan
    'bg-[#B1DDD6]',    // Fokus sedang
    'bg-[#305954]'     // Fokus dalam (pekat)
  ];

  return (
    <div className="bg-[#F7F7F5] p-8 rounded-[40px] mb-6 text-left">
      <h3 className="font-bold text-gray-800 text-sm mb-6">Focus Intensity Heatmap</h3>
      <div className="grid grid-cols-11 md:grid-cols-22 gap-1.5 overflow-hidden">
        {data.map((val, i) => (
          <div 
            key={i} 
            className={`h-6 w-6 rounded-sm ${colors[val] || colors[0]} transition-all duration-300 hover:scale-110`} 
          />
        ))}
      </div>
      <div className="mt-6 flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>Less Focus</span>
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 bg-[#E0E4DE] rounded-sm"/>
          <div className="h-2.5 w-2.5 bg-[#BFEBE4] rounded-sm"/>
          <div className="h-2.5 w-2.5 bg-[#B1DDD6] rounded-sm"/>
          <div className="h-2.5 w-2.5 bg-[#305954] rounded-sm"/>
        </div>
        <span>Deep Focus</span>
      </div>
    </div>
  );
};

export default IntensityHeatmap;