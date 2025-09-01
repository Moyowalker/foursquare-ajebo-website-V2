import React from 'react';

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

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Foursquare Logo SVG Recreation */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define the curved shapes that make up the Foursquare logo */}
          <defs>
            <style>
              {`
                .logo-shadow { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }
              `}
            </style>
          </defs>
          
          {/* Red section (Cross) - Top Left */}
          <path
            d="M20 20 Q20 20 80 20 Q100 20 100 40 Q100 80 80 80 Q20 80 20 80 Q20 60 20 20 Z"
            fill="#b91c1c"
            className="logo-shadow"
          />
          
          {/* Blue section (Chalice) - Top Right */}
          <path
            d="M120 20 Q180 20 180 20 Q180 80 180 80 Q160 80 140 80 Q120 80 120 60 Q120 40 120 20 Z"
            fill="#1e40af"
            className="logo-shadow"
          />
          
          {/* Orange section (Dove) - Bottom Left */}
          <path
            d="M20 120 Q20 140 20 180 Q20 180 80 180 Q80 160 80 140 Q80 120 60 120 Q40 120 20 120 Z"
            fill="#f59e0b"
            className="logo-shadow"
          />
          
          {/* Purple section (Crown) - Bottom Right */}
          <path
            d="M120 120 Q140 120 160 120 Q180 120 180 140 Q180 180 180 180 Q120 180 120 180 Q120 160 120 140 Q120 120 120 120 Z"
            fill="#8b5cf6"
            className="logo-shadow"
          />
          
          {/* White symbols overlay */}
          {/* Cross symbol in red section */}
          <g fill="white">
            <rect x="45" y="35" width="4" height="30" />
            <rect x="35" y="47" width="24" height="4" />
          </g>
          
          {/* Chalice symbol in blue section */}
          <g fill="white">
            <ellipse cx="150" cy="45" rx="12" ry="8" />
            <rect x="147" y="50" width="6" height="15" />
            <rect x="140" y="63" width="20" height="4" />
          </g>
          
          {/* Dove symbol in orange section */}
          <g fill="white">
            <path d="M40 150 Q50 145 60 150 Q55 155 50 160 Q45 155 40 150 Z" />
            <path d="M45 148 Q35 145 30 148 Q35 145 45 148 Z" />
          </g>
          
          {/* Crown symbol in purple section */}
          <g fill="white">
            <path d="M135 140 L145 135 L155 140 L165 135 L165 155 L135 155 Z" />
            <circle cx="140" cy="138" r="2" />
            <circle cx="150" cy="135" r="3" />
            <circle cx="160" cy="138" r="2" />
          </g>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white ${textSizes[size]} leading-tight`}>
            Foursquare
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
