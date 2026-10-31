import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  showSubtitle?: boolean;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  className = '',
  showSubtitle = true,
  to = '/'
}) => {
  // SVG symbol: refined audio/connection waveform with node
  const symbol = (
    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand-charcoal border border-[#3C453E]/60 shadow-sm flex-shrink-0 group-hover:border-brand-sage transition-colors">
      <svg
        className="w-5 h-5 text-brand-sage"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h2" />
        <path d="M8 8v8" />
        <path d="M12 5v14" />
        <path d="M16 9v6" />
        <path d="M20 12h-2" />
        <circle cx="20" cy="12" r="1.5" className="fill-brand-forest stroke-none" />
      </svg>
    </div>
  );

  const textClasses =
    variant === 'dark'
      ? 'text-[#F5F4EF]'
      : variant === 'light'
      ? 'text-brand-charcoal'
      : 'text-brand-charcoal dark:text-[#F5F4EF]';

  const subClasses =
    variant === 'dark'
      ? 'text-app-muted'
      : variant === 'light'
      ? 'text-brand-muted'
      : 'text-brand-muted dark:text-app-muted';

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {symbol}
      <div className="flex flex-col">
        <span className={`font-heading font-extrabold tracking-tight text-base leading-none ${textClasses}`}>
          OMNIBEAT
        </span>
        {showSubtitle && (
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase font-semibold leading-tight mt-0.5 ${subClasses}`}>
            UNIVERSAL
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
};

