// src/components/stats/MetricCard.jsx
import React from 'react';

const MetricCard = ({ icon: Icon, title, desc }) => {
  return (
    <div className="bg-[#F7F7F5] p-6 rounded-[32px] text-left border border-transparent hover:border-gray-100 transition-all">
      <div className="text-[#1C4641] mb-3">
        {Icon && <Icon size={20} />}
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default MetricCard;