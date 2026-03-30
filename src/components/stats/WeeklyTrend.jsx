// src/components/stats/WeeklyTrend.jsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

const WeeklyTrend = ({ data = [] }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="lg:col-span-2 bg-[#F7F7F5] p-8 rounded-[40px] flex flex-col justify-between min-h-[300px]">
      <div className="flex justify-between items-start text-left">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Weekly Productivity Trend</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Last 7 Days</p>
        </div>
        <BarChart3 size={18} className="text-gray-300" />
      </div>
      
      <div className="flex items-end justify-between gap-4 h-32 mt-8">
        {days.map((day, i) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-4">
            <div 
              style={{ height: `${data[i] || 0}%` }} 
              className={`w-full max-w-[45px] rounded-t-xl transition-all duration-700 ${i === 3 ? 'bg-[#1C4641]' : 'bg-[#BFEBE4]/50'}`}
            ></div>
            <span className="text-[10px] font-bold text-[#777C77] uppercase tracking-widest">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTrend;