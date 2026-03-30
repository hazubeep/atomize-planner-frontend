// src/pages/HistoryPage.jsx
import React from 'react';
import StatCard from '../components/history/StatCard';
import TimelineItem from '../components/history/TimelineItem';
import { Zap } from 'lucide-react';

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] p-8 md:p-16">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <header className="text-left mb-12">
          <h1 className="text-5xl font-bold text-gray-950 mb-4 tracking-tight">Growth History</h1>
          <p className="text-gray-500 max-w-md text-lg leading-relaxed">
            Your journey toward focused productivity, atomized into micro-steps and core achievements.
          </p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1: Weekly Momentum */}
          <div className="md:col-span-2">
            <StatCard subtitle="Weekly Momentum" title="78 Micro-Steps Atomized">
              {/* Fake Chart Visualization */}
              <div className="flex items-end gap-3 w-full">
                {[30, 50, 40, 70, 60, 100, 55].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className={`flex-1 rounded-t-2xl min-h-[20px] ${i === 5 ? 'bg-[#3C6660]' : 'bg-[#DDEEEB]'}`}
                  ></div>
                ))}
              </div>
              <div className="ml-6 bg-[#BFEBE4] p-3 rounded-full text-[#3C6660]">
                <Zap size={24} fill="currentColor" />
              </div>
            </StatCard>
          </div>

          {/* Card 2: Achievements */}
          <StatCard variant="dark" subtitle="Achievements" title="3 Core Goals Achieved">
            <div className="relative h-24 w-24 flex items-center justify-center">
              {/* Progress Circle SVG */}
              <svg className="h-full w-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-[#BFEBE4]" />
              </svg>
              <span className="absolute text-xl font-bold">75%</span>
            </div>
          </StatCard>
        </div>

        {/* Timeline Section */}
        <section className="text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Completed Big Tasks</h2>
          
          <div className="relative">
            <TimelineItem 
              date="October 24, 2023"
              category="Strategy"
              title="Rebrand Visual Identity System"
              description="Established the core principles for 'The Mindful Sanctuary' design system including typography, palette, and spacing rules."
              microSteps={12}
              avatars={["https://i.pravatar.cc/100?u=1", "https://i.pravatar.cc/100?u=2"]}
            />
            
            <TimelineItem 
              date="October 21, 2023"
              category="Development"
              title="Core Planner Engine Alpha"
              description="Deployment of the primary scheduling algorithm that prioritizes deep work blocks over administrative tasks."
              microSteps={42}
            />

            <TimelineItem 
              date="October 15, 2023"
              category="Planning"
              title="Investor Pitch Deck Finalization"
              description="Completed the 12-slide narrative for the Seed round, focusing on the mental health impact of productivity tools."
              microSteps={24}
            />
          </div>

          {/* Footer Timeline */}
          <div className="mt-8 text-center">
            <button className="text-sm font-bold text-[#3C6660] hover:underline transition">
              Show Older History
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HistoryPage;