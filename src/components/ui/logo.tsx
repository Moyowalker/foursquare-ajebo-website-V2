import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const FoursquareLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const sizePx = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Church Logo */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <Image
          src="/images/church-logo.jpg"
          alt="Foursquare Camp Ajebo Logo"
          width={sizePx[size]}
          height={sizePx[size]}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white ${textSizes[size]} leading-tight`}>
            Foursquare Camp
          </span>
          <span className={`font-semibold text-slate-300 ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-lg'} leading-tight`}>
            Ajebo
          </span>
        </div>
      )}
    </div>
  );
};

export default FoursquareLogo;
