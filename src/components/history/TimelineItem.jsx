// src/components/history/TimelineItem.jsx
import React from 'react';


const TimelineItem = ({ date, title, description, category, microSteps, avatars = [] }) => {
  return (
    <div className="relative pl-12 pb-12 group">
      {/* Garis Vertikal Timeline */}
      <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-gray-100 group-last:bg-transparent"></div>
      {/* Titik Timeline */}
      <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-[#3C6660] shadow-sm z-10"></div>
      
      <div className="bg-white p-8 rounded-[30px] border border-gray-50 shadow-sm text-left transition hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
          {/* Tanggal Timeline */}
          <p className="text-xs font-medium text-gray-400">{date}</p>
          {/* Kategori Timeline */}
          <span className="px-3 py-1 rounded-full bg-[#EBFDFA] text-[#3C6660] text-[10px] font-bold uppercase tracking-wider">
            {category}
          </span>
        </div>
        
        {/* Judul Timeline */}
        <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-2xl">{description}</p>
        
        <div className="flex items-center gap-4">
          {/* Avatar Contributor */}
          {avatars.length > 0 && (
            <div className="flex -space-x-2">
              {avatars.map((url, i) => (
                <img key={i} src={url} className="h-7 w-7 rounded-full border-2 border-white shadow-sm" alt="contributor" />
              ))}
            </div>
          )}
          {/* Mikro-steps */}
          <p className="text-xs font-semibold text-gray-400">@ {microSteps} micro-steps</p>
        </div>
      </div>
    </div>
  );
};
/*******  210944f0-5735-4d8b-8c81-fd927706659d  *******/

export default TimelineItem;