import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 pointer-events-auto max-w-md mx-auto">
      <div className="bg-[#ffffff] text-[#070a0c] p-3 rounded-xl shadow-2xl border border-[#dde3ed] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[#775a19] text-[22px] shrink-0">check_circle</span>
          <span className="font-body-md text-sm font-medium truncate">{message}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-code-data text-[10px] text-[#75777a] uppercase font-semibold">NOW</span>
          <button 
            onClick={onClose}
            className="text-[#75777a] hover:text-[#070a0c] p-0.5"
            aria-label="Dismiss toast"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
