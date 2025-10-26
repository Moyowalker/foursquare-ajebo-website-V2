'use client';

import { useState } from 'react';
import { CreditCard, Zap } from 'lucide-react';

interface FloatingPayButtonProps {
  onClick: () => void;
}

export default function FloatingPayButton({ onClick }: FloatingPayButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Quick Payment"
    >
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-red-600 opacity-75 animate-ping"></div>
      
      {/* Main button */}
      <div className="relative flex items-center gap-2 bg-red-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105">
        <CreditCard className="w-6 h-6" />
        <span className={`font-semibold transition-all duration-300 ${isHovered ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'} overflow-hidden whitespace-nowrap`}>
          Quick Pay
        </span>
        <Zap className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'rotate-12' : ''}`} />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Make a quick payment
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </button>
  );
}
