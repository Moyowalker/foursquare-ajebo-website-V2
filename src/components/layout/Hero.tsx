"use client";

import { useMemo } from 'react';
import HeroModern from './HeroModern';
import HeroLight from './HeroLight';
import HeroVideo from './HeroVideo';
import HeroSimple from './HeroSimple';

type Variant = 'modern' | 'light' | 'video' | 'simple';

type HeroProps = {
  onQuickPay?: () => void;
  variant?: Variant;
};

export default function Hero({ onQuickPay, variant }: HeroProps) {
  const resolveVariant = useMemo<Variant>(() => {
    if (variant) return variant;
    if (typeof window !== 'undefined') {
      const urlParam = new URLSearchParams(window.location.search).get('hero');
      if (urlParam && ['modern', 'light', 'video', 'simple'].includes(urlParam)) {
        return urlParam as Variant;
      }
    }
    const envVar = process.env.NEXT_PUBLIC_HERO_VARIANT as Variant | undefined;
    return envVar && ['modern', 'light', 'video', 'simple'].includes(envVar) ? envVar : 'modern';
  }, [variant]);

  switch (resolveVariant) {
    case 'light':
      return <HeroLight onQuickPay={onQuickPay} />;
    case 'video':
      return <HeroVideo onQuickPay={onQuickPay} />;
    case 'simple':
      return <HeroSimple onQuickPay={onQuickPay} />;
    case 'modern':
    default:
      return <HeroModern onQuickPay={onQuickPay} />;
  }
}
