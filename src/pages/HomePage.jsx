import React from 'react';
// src/pages/HomePage.jsx
import { Clock, Zap, Lightbulb } from 'lucide-react';
import ChatInput from '../components/home/ChatInput';
import FeatureCard from '../components/home/FeatureCard';

const HomePage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FAF9F6] p-6">
      <main className="w-full max-w-4xl text-center">
        <div className="mb-12">
            <h1 className="text-6xl font-bold text-gray-950 tracking-tight leading-[1.1]">
              Atomizer Hub
            </h1>
            <p className="text-lg text-gray-600 mt-4 font-medium">
              Don't worry about the size, we'll break it down together.
            </p>
        </div>

        {/* Input Chat */}
        <div className="mb-16">
          <ChatInput />
        </div>

        {/* Grid Kartu Fitur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Clock} 
              title="Recent Atoms" 
              description="Finish the quarterly report..." 
            />

            <FeatureCard icon={Zap} title="Current Progress">
              <div className="w-full bg-[#EBFDFA] rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#BFEBE4] to-[#A8DED5] h-full" style={{ width: '60%' }}></div>
              </div>
            </FeatureCard>

            <FeatureCard 
              icon={Lightbulb} 
              title="Daily Tip" 
              description="Smaller tasks lead to bigger wins." 
            />
        </div>

      </main>
    </div>
  );
};

export default HomePage;

