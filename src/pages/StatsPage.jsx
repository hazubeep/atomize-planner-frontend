// src/pages/StatsPage.jsx
import React, { useState } from 'react';
import { Zap, Activity, Target, MousePointer2 } from 'lucide-react';
import WeeklyTrend from '../components/stats/WeeklyTrend';
import IntensityHeatmap from '../components/stats/IntensityHeatmap';
import MetricCard from '../components/stats/MetricCard';

const StatsPage = () => {
  // Data simulasi (nanti diganti dengan fetch API dari Laravel)
  const [statsData] = useState({
    weeklyTrend: [40, 70, 45, 90, 65, 80, 50],
    peakTime: "09:45",
    heatmap: Array.from({ length: 154 }, () => Math.floor(Math.random() * 4)),
    categories: [
      { label: 'Strategic Planning', val: 40 },
      { label: 'Creative Execution', val: 28 },
      { label: 'Deep Research', val: 15 },
      { label: 'Communication', val: 15 }
    ],
    atomizationRate: 8.4
  });

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <header className="mb-10 text-left">
          <h1 className="text-4xl font-bold text-gray-950 mb-2">Performance Insights</h1>
          <p className="text-gray-500 text-sm italic">Your productivity is a rhythm. Understand the tempo of your focus and optimize your atomization levels.</p>
        </header>

        {/* Row 1: Weekly Trend & Peak Time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <WeeklyTrend data={statsData.weeklyTrend} />

          <div className="bg-[#3C6660] p-8 rounded-[40px] text-white flex flex-col justify-between text-left relative overflow-hidden">
            <Zap className="absolute -right-4 -top-4 text-white/5 w-32 h-32" />
            <div>
              <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                <Zap size={20} className="text-[#BFEBE4]" />
              </div>
              <h3 className="text-lg font-bold leading-tight">Your Most Productive Time</h3>
              <p className="text-white/50 text-xs mt-1">Based on deep work sessions</p>
            </div>
            <div>
              <h2 className="text-5xl font-semibold text-[#DCFFF8] mb-1">09:45</h2>
              <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Morning Peak</p>
            </div>
          </div>
        </div>

        {/* Row 2: Heatmap */}
        <IntensityHeatmap data={statsData.heatmap} />

        {/* Row 3: Categories & Atomization (Tetap di Page karena unik) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-left">
          <div className="bg-[#F7F7F5] p-8 rounded-[40px]">
            <h3 className="font-bold text-gray-800 text-sm mb-8">Top Task Categories</h3>
            <div className="space-y-6">
              {statsData.categories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-gray-700">{cat.label}</span>
                    <span className="text-gray-400">{cat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div style={{ width: `${cat.val}%` }} className="h-full bg-[#1C4641]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#C4E8F6]/30 p-8 rounded-[40px] flex items-center justify-between border border-[#BFEBE4]">
            <div className="max-w-[60%]">
              <h3 className="font-bold text-[#1C4641] text-sm">Avg. Atomization</h3>
              <p className="text-xs text-[#1C4641]/60 mt-2 mb-6">How well you break down complex projects into chunks.</p>
              <div className="inline-block px-5 py-2 bg-[#FFFFFF] rounded-full text-[#1C4641] font-black">
                {statsData.atomizationRate} <span className="text-[10px] opacity-40">/ 12.0</span>
              </div>
            </div>
            <div className="h-24 w-24 rounded-full bg-[#1C4641] text-[#BFEBE4] flex items-center justify-center shadow-lg">
              <Activity size={32} />
            </div>
          </div>
        </div>

        {/* Row 4: Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard icon={Activity} title="Consistency Peak" desc="You've maintained a 4-day focus streak. Your output is 12% higher than last week.." />
          <MetricCard icon={Target} title="Cognitive Drift" desc="Focus starts dipping after 14:00. Consider scheduling high-effort tasks earlier." />
          <MetricCard icon={MousePointer2} title="Efficiency Rating" desc="You are in the top 5% of Atomizers globally for project decomposition speed." />
        </div>

      </div>
    </div>
  );
};

export default StatsPage;