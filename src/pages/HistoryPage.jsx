import React, { useState, useEffect } from 'react';
import StatCard from '../components/history/StatCard';
import TimelineItem from '../components/history/TimelineItem';
import { Zap, Loader2 } from 'lucide-react';
import { getWeeklySummary, getCompletedTasksHistory } from '../services/historyService';

const HistoryPage = () => {
  const [summary, setSummary] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [summaryRes, historyRes] = await Promise.all([
        getWeeklySummary(0),
        getCompletedTasksHistory({ page: 1, limit: 5 })
      ]);

      if (summaryRes.success) {
        setSummary(summaryRes.data);
      }
      
      if (historyRes.success) {
        setHistoryItems(historyRes.data.items);
        setHasMore(historyRes.data.pagination.has_next_page);
        setPage(1); 
      }
    } catch (error) {
      console.error("Error loading history from Laravel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const loadMoreHistory = async () => {
    const nextPage = page + 1;
    try {
      const res = await getCompletedTasksHistory({ page: nextPage, limit: 5 });
      if (res.success) {
        setHistoryItems(prev => [...prev, ...res.data.items]);
        setPage(nextPage);
        setHasMore(res.data.pagination.has_next_page);
      }
    } catch (error) {
      console.error("Error loading more history:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#3C6660]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-8 md:p-16 text-left">
      <div className="mx-auto max-w-5xl">
        
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-950 mb-4 tracking-tight">Growth History</h1>
          <p className="text-gray-500 max-w-md text-lg leading-relaxed">
            Your journey toward focused productivity, atomized into micro-steps and core achievements.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="md:col-span-2">
            <StatCard 
              subtitle={summary?.week_label || "Weekly Momentum"} 
              title={`${summary?.total_steps_completed || 0} Micro-Steps Atomized`}
            >
              <div className="flex items-end gap-3 w-full h-24">
                {summary?.daily_breakdown.map((item, i) => {
                  const heightPercentage = Math.min((item.count / 25) * 100, 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div 
                        style={{ height: `${heightPercentage}%` }} 
                        className={`w-full rounded-t-lg min-h-[4px] transition-all duration-700 ${
                          item.count > 10 ? 'bg-[#3C6660]' : 'bg-[#DDEEEB]'
                        }`}
                      />
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{item.day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="ml-6 bg-[#BFEBE4] p-3 rounded-full text-[#3C6660] hidden sm:block">
                <Zap size={24} fill="currentColor" />
              </div>
            </StatCard>
          </div>

          <StatCard 
            variant="dark" 
            subtitle="Achievements" 
            title={`${summary?.achievements.tasks_completed || 0} Core Goals Achieved`}
          >
            <div className="relative h-24 w-24 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                <circle 
                  cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * (summary?.achievements.completion_percentage || 0)) / 100} 
                  className="text-[#BFEBE4] transition-all duration-1000 ease-out" 
                />
              </svg>
              <span className="absolute text-xl font-bold">{summary?.achievements.completion_percentage || 0}%</span>
            </div>
          </StatCard>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Completed Big Tasks</h2>
          
          <div className="relative">
            {historyItems.length > 0 ? (
              historyItems.map((task) => (
                <TimelineItem 
                  key={task.id}
                  // Parsing tanggal ISO8601 dari Laravel
                  date={new Date(task.completed_at).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  category={task.category}
                  title={task.title}
                  description={task.description}
                  microSteps={task.steps_count}
                  avatars={[]} 
                />
              ))
            ) : (
              <p className="text-gray-400 italic py-10">No history found.</p>
            )}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button 
                onClick={loadMoreHistory}
                className="text-sm font-bold text-[#3C6660] hover:underline transition-all underline-offset-4"
              >
                Show Older History
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default HistoryPage;