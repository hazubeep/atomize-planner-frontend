// src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex flex-col items-start gap-3 text-left h-full">
      <div className="text-[#3C6660] h-10 w-10 flex items-center justify-center bg-[#BFEBE4]/50 rounded-full">
        {Icon && <Icon size={20} />}
      </div>
      <div className="w-full">
        <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
        {description && <p className="text-xs text-gray-500 leading-relaxed">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default FeatureCard;