import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Initializing interface...');

  useEffect(() => {
    // Check if user already saw the intro in this session
    const hasSeenIntro = sessionStorage.getItem('omnibeat_intro_seen');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        if (next >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('omnibeat_intro_seen', 'true');
          setTimeout(() => {
            onComplete();
          }, 250);
          return 100;
        }

        if (next < 25) {
          setStageText('Initializing interface...');
        } else if (next < 50) {
          setStageText('Preparing DJ integration environment...');
        } else if (next < 75) {
          setStageText('Loading connection modules...');
        } else {
          setStageText('Preparing Omni-Bingo connection...');
        }

        return next;
      });
    }, 45); // ~1.5s total

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('omnibeat_intro_seen', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-ivory text-brand-charcoal select-none px-6 transition-opacity duration-300">
      {/* Brand & Wordmark */}
      <div className="flex flex-col items-center text-center">
        {/* Minimal connection/waveform symbol */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-charcoal border border-[#3C453E] shadow-lg mb-4">
          <svg
            className="w-8 h-8 text-brand-sage"
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

        <h1 className="font-heading font-extrabold text-2xl tracking-tight text-brand-charcoal">
          OMNIBEAT
        </h1>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold text-brand-muted mt-1">
          UNIVERSAL
        </p>

        {/* Thin connection line */}
        <div className="w-16 h-0.5 bg-brand-border my-6 overflow-hidden rounded-full">
          <div
            className="h-full bg-brand-forest transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-brand-muted font-medium mb-6">
          Preparing your connection experience.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full bg-brand-stone/60 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-forest h-full rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-2 text-[11px] text-brand-muted font-mono">
          <span className="truncate max-w-[200px]">{stageText}</span>
          <span className="font-semibold text-brand-charcoal">{progress}%</span>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="mt-8 text-xs font-medium text-brand-muted hover:text-brand-charcoal underline underline-offset-4 transition-colors"
      >
        Skip intro
      </button>
    </div>
  );
};

