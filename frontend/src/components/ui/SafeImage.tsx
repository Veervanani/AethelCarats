import React, { useState } from 'react';

// Sleek luxury SVG fallback data URL (Gold & Dark Luxury Diamond Icon)
export const LUXURY_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="%230B0B0B"/><rect x="2" y="2" width="796" height="796" fill="none" stroke="%231F1F1F" stroke-width="4"/><path d="M400 280 L480 360 L400 520 L320 360 Z" fill="none" stroke="%23C9A96E" stroke-width="8"/><circle cx="400" cy="360" r="16" fill="%23C9A96E"/><text x="400" y="580" font-family="'Cormorant Garamond', serif" font-size="26" fill="%23F5F1E8" font-weight="600" letter-spacing="4" text-anchor="middle">AETHELCARATS</text></svg>`;

// Normalize any image path format (e.g. img_*, /uploads/*, /assets/*, http*, etc.)
export const normalizeImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('/assets/')) {
    return trimmed;
  }
  if (trimmed.startsWith('img_')) {
    return `/uploads/media/${trimmed}`;
  }
  if (trimmed.startsWith('uploads/')) {
    return `/${trimmed}`;
  }
  if (trimmed.startsWith('assets/')) {
    return `/${trimmed}`;
  }
  if (!trimmed.startsWith('/')) {
    // If it is a filename with an image extension, check if it looks like an uploaded file or asset
    if (trimmed.includes('img_')) {
      return `/uploads/media/${trimmed}`;
    }
    return `/assets/${trimmed}`;
  }
  return trimmed;
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = LUXURY_FALLBACK_IMAGE,
  loading = 'lazy',
  decoding = 'async',
  fetchpriority,
  onError,
  ...props
}) => {
  const initialResolved = normalizeImageUrl(src) || fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initialResolved);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    const nextResolved = normalizeImageUrl(src) || fallbackSrc;
    setImgSrc(nextResolved);
    setHasError(false);
  }, [src, fallbackSrc]);

  const [attemptedFallback, setAttemptedFallback] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!attemptedFallback && imgSrc.startsWith('/assets/')) {
      setAttemptedFallback(true);
      if (imgSrc.includes('aura_')) {
        setImgSrc(imgSrc.replace('aura_', 'gem_'));
        return;
      }
      if (imgSrc.includes('floksy_')) {
        setImgSrc(imgSrc.replace('floksy_', 'gem_'));
        return;
      }
    }

    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  return (
    <img
      loading={loading}
      decoding={decoding}
      {...(fetchpriority ? ({ fetchpriority } as any) : {})}
      {...props}
      src={imgSrc}
      alt={alt || 'AethelCarats Fine Jewellery'}
      onError={handleError}
    />
  );
};
