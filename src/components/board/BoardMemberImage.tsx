'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BoardMemberImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  name: string;
  title: string;
  variant?: 'executive' | 'coordinator';
}

export function BoardMemberImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  name, 
  title,
  variant = 'coordinator'
}: BoardMemberImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    const isExecutive = variant === 'executive';
    
    return (
      <div className={`w-full h-full bg-gradient-to-br ${isExecutive ? 'from-blue-300 to-purple-400' : 'from-gray-300 to-slate-400'} flex items-center justify-center relative`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="text-center p-1 relative z-10 flex flex-col items-center justify-center h-full">
          <div className={`${isExecutive ? 'w-12 h-12' : 'w-10 h-10'} bg-white/80 rounded-full flex items-center justify-center mb-2 mx-auto shadow-lg backdrop-blur-sm`}>
            <svg className={`${isExecutive ? 'w-6 h-6' : 'w-5 h-5'} text-gray-700`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <p className={`text-white font-bold ${isExecutive ? 'text-xs' : 'text-xs'} mb-1 drop-shadow-lg leading-tight text-center`}>{name}</p>
          <p className={`text-white/90 text-xs drop-shadow-md text-center`}>{title}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
      style={{ 
        objectFit: 'cover',
        objectPosition: 'center top'
      }}
      priority={variant === 'executive'}
    />
  );
}