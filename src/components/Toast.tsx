import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div 
      id="app-toast-notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0d1424] text-white px-4 py-3 rounded-xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 animate-in slide-in-from-bottom-5 duration-300"
    >
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-xs font-medium text-slate-200">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white text-xs font-mono"
      >
        &times;
      </button>
    </div>
  );
};
