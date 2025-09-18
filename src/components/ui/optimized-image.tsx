import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoadingComplete?: () => void;
}

// Generate a simple blur placeholder
function generateBlurDataURL(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTVlN2ViIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+Cjwvc3ZnPg==';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  fallbackSrc = '/images/placeholder.svg',
  onLoadingComplete,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (!imageError && fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setImageError(true);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };

  // Final fallback if image still fails
  if (imageError && imageSrc === fallbackSrc) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || generateBlurDataURL()}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}

// Church-specific image component with common settings
export function ChurchImage({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}: Omit<OptimizedImageProps, 'placeholder' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={`rounded-lg ${className}`}
      priority={priority}
      quality={80}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}

// Board member avatar component with optimized settings
export function BoardMemberAvatar({
  src,
  alt,
  size = 'md',
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'> & { 
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeMap = {
    sm: { width: 48, height: 48, className: 'w-12 h-12' },
    md: { width: 80, height: 80, className: 'w-20 h-20' },
    lg: { width: 128, height: 128, className: 'w-32 h-32' },
    xl: { width: 192, height: 192, className: 'w-48 h-48' }
  };

  const dimensions = sizeMap[size];

  return (
    <div className={`${dimensions.className} rounded-full overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className="rounded-full object-cover"
        quality={90}
        fallbackSrc="/images/board/placeholder.svg"
        placeholder="blur"
        {...props}
      />
    </div>
  );
}

// Event card image component
export function EventImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'fill'>) {
  return (
    <div className={`relative h-48 w-full overflow-hidden rounded-lg ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={75}
        className="hover:scale-105 transition-transform duration-300 object-cover"
        fallbackSrc="/images/events/placeholder.jpg"
        {...props}
      />
    </div>
  );
}

// Blog post featured image
export function BlogFeaturedImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'fill'>) {
  return (
    <div className={`relative h-64 w-full overflow-hidden rounded-lg ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        quality={80}
        className="hover:scale-105 transition-transform duration-300 object-cover"
        fallbackSrc="/images/blog/placeholder.jpg"
        {...props}
      />
    </div>
  );
}

// Gallery image component
export function GalleryImage({
  src,
  alt,
  className = '',
  onClick,
  ...props
}: Omit<OptimizedImageProps, 'fill'> & {
  onClick?: () => void;
}) {
  return (
    <div 
      className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        quality={75}
        className="hover:scale-110 transition-transform duration-300 object-cover"
        fallbackSrc="/images/gallery/placeholder.jpg"
        {...props}
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
    </div>
  );
}

// Hero background image component
export function HeroBackground({
  src,
  alt = 'Church background',
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      priority
      quality={90}
      sizes="100vw"
      {...props}
    />
  );
}