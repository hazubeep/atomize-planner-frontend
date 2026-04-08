import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { atomizeTask } from '../../services/taskService';

const ChatInput = ({ onAtomized }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAtomize = async () => {
    if (!title.trim()) return;
    setError('');
    setLoading(true);
    try {
      const result = await atomizeTask(title);
      setTitle('');
      setTimeout(() => {
        onAtomized?.(result);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Gagal memproses task.');
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-2xl w-full">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-1 bg-gradient-to-r from-[#BFEBE4] via-[#A8DED5] to-[#BFEBE4] rounded-[26px] blur-md opacity-75 animate-pulse"
          />
        )}
      </AnimatePresence>

      <div className={`relative bg-white rounded-[24px] shadow-lg border p-5 flex flex-col gap-3 transition-all duration-500 ${loading ? 'border-[#A8DED5]' : 'border-gray-100'}`}>
        <textarea
          className="w-full bg-transparent text-gray-950 text-base font-normal placeholder:text-gray-300 outline-none resize-none p-1 min-h-[90px] disabled:opacity-50"
          placeholder={loading ? "Magic is happening..." : "What is your big task for today?"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          spellCheck="false"
        />
        
        {error && <p className="text-xs text-red-500">{error}</p>}
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3.5">
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFEBE4]/50 text-[#1C4641] hover:bg-[#BFEBE4] transition active:scale-[0.96]">
            <span className="flex items-center justify-center text-2xl font-light h-full w-full pb-1">+</span>
          </button>

          <button
            type="button"
            onClick={handleAtomize}
            disabled={loading || !title.trim()}
            className="relative overflow-hidden rounded-full bg-[#1C4641] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2b4844] active:scale-[0.98] disabled:opacity-80"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  {/* Icon loading sederhana yang berputar */}
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Atomizing...
                </motion.div>
              ) : (
                <motion.span
                  key="normal"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  Atomize
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;