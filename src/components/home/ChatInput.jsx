// src/components/ChatInput.jsx
import React from 'react';
import { Plus } from 'lucide-react';

const ChatInput = () => {
  return (
    <div className="mx-auto max-w-2xl w-full bg-white rounded-[24px] shadow-lg border border-gray-100 p-5 flex flex-col gap-3">
      {/* Input Textarea */}
      <textarea 
        className="w-full bg-transparent text-gray-950 text-base font-normal placeholder:text-gray-300 outline-none resize-none p-1 min-h-[90px]"
        placeholder="What is your big task for today?"
        spellCheck="false"
      />
      
      {/* Footer: Tombol Plus dan Atomize */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3.5">
        <button 
          type="button" 
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFEBE4]/50 text-[#1C4641] hover:bg-[#BFEBE4] transition active:scale-[0.96]"
        >
          {/* Menggunakan span dengan sedikit padding bottom agar + terlihat center secara visual */}
          <span className="flex items-center justify-center text-2xl font-light h-full w-full pb-1">+</span>
        </button>

        <button 
          type="button"
          className="rounded-full bg-[#1C4641] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2b4844] active:scale-[0.98]"
        >
          Atomize
        </button>
      </div>
    </div>
  );
};

export default ChatInput;