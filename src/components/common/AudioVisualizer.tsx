import React from 'react';

interface AudioVisualizerProps {
  isPlaying?: boolean;
  bars?: number;
  height?: string;
  className?: string;
  accentColor?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying = true,
  bars = 5,
  height = 'h-4',
  className = '',
  accentColor = 'bg-brand-sage dark:bg-app-accent'
}) => {
  const barDelays = ['0.1s', '0.4s', '0.2s', '0.5s', '0.3s', '0.15s', '0.45s'];
  const barHeights = ['30%', '80%', '50%', '100%', '40%', '70%', '60%'];

  return (
    <div className={`flex items-end gap-1 ${height} ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${accentColor} ${
            isPlaying ? 'animate-equalizer' : 'opacity-40'
          }`}
          style={{
            height: isPlaying ? barHeights[i % barHeights.length] : '20%',
            animationDelay: isPlaying ? barDelays[i % barDelays.length] : '0s',
            animationDuration: isPlaying ? `${0.8 + (i % 3) * 0.25}s` : '0s'
          }}
        />
      ))}
    </div>
  );
};

