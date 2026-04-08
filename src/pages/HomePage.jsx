import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, Lightbulb } from 'lucide-react';
import ChatInput from '../components/home/ChatInput';
import FeatureCard from '../components/home/FeatureCard';
import useTasks from '../hooks/useTasks';
import Spinner from '../components/atoms/Spinner';

const HomePage = () => {
  const navigate = useNavigate();
  const { tasks, loading } = useTasks();

  const dailyTips = [
    "Pecahkan tugas besar menjadi langkah-langkah 5 menit.",
    "Kemenangan kecil hari ini adalah pondasi sukses besar besok.",
    "Fokus pada satu 'atom' dalam satu waktu untuk hasil maksimal.",
    "Jangan biarkan daftar tugas membuatmu stres, cicil satu per satu.",
    "Istirahat sejenak setelah menyelesaikan sub-tugas yang sulit.",
    "Konsistensi lebih baik daripada intensitas yang meledak-ledak.",
    "Tuliskan tujuanmu, dan biarkan AI membantu memecahnya."
  ];

  const currentTip = useMemo(() => {
    const today = new Date();
    const index = (today.getDate() + today.getMonth()) % dailyTips.length;
    return dailyTips[index];
  }, []);

  const recentTask = useMemo(() => tasks.length > 0 ? tasks[0] : null, [tasks]);
  
  const overallProgress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const totalProgress = tasks.reduce((acc, task) => {
      const steps = task.task_steps || [];
      const done = steps.filter(s => s.is_completed).length;
      return acc + (steps.length > 0 ? (done / steps.length) * 100 : 0);
    }, 0);
    return Math.round(totalProgress / tasks.length);
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#FAF9F6] animate-pulse">
        <Spinner size="lg" />
        <p className="mt-4 text-sm font-medium text-gray-400">Loading your workspace...</p>
      </div>
    );
  }

  const handleTaskAtomized = (response) => {
    if (response.success) navigate(`/goals`);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAF9F6] p-6 animate-fade-in">
      <main className="w-full max-w-4xl text-center">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-950 tracking-tight leading-[1.1]">
            Atomizer Hub
          </h1>
          <p className="text-lg text-gray-600 mt-4 font-medium">
            Don't worry about the size, we'll break it down together.
          </p>
        </div>

        <div className="mb-16">
          <ChatInput onAtomized={handleTaskAtomized} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Clock} 
            title="Recent Atoms" 
            description={recentTask ? `Last: ${recentTask.title}` : "No tasks yet."}
            onClick={() => recentTask && navigate('/goals')}
          />

          <FeatureCard icon={Zap} title="Current Progress">
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-right font-bold text-gray-400 mb-1">{overallProgress}%</span>
              <div className="w-full bg-[#EBFDFA] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#3C6660] h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard 
            icon={Lightbulb} 
            title="Daily Tip" 
            description={currentTip} // Menggunakan tip dinamis berdasarkan tanggal
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;