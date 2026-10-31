import React from 'react';

export type StatusVariant = 'connected' | 'connecting' | 'disconnected' | 'error' | 'info';

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  pulse = true,
  className = ''
}) => {
  const normStatus = status.toLowerCase() as StatusVariant;

  const config: Record<
    StatusVariant,
    { bg: string; text: string; dot: string; defaultLabel: string }
  > = {
    connected: {
      bg: 'bg-[#4F765D]/15 border-[#4F765D]/30',
      text: 'text-[#4F765D] dark:text-[#91AA94]',
      dot: 'bg-[#4F765D]',
      defaultLabel: 'Connected'
    },
    connecting: {
      bg: 'bg-[#B58C4B]/15 border-[#B58C4B]/30',
      text: 'text-[#B58C4B] dark:text-[#D1A863]',
      dot: 'bg-[#B58C4B]',
      defaultLabel: 'Connecting'
    },
    disconnected: {
      bg: 'bg-[#8A8D88]/15 border-[#8A8D88]/30',
      text: 'text-[#8A8D88] dark:text-[#A9B0A8]',
      dot: 'bg-[#8A8D88]',
      defaultLabel: 'Disconnected'
    },
    error: {
      bg: 'bg-[#A95E58]/15 border-[#A95E58]/30',
      text: 'text-[#A95E58] dark:text-[#D4837D]',
      dot: 'bg-[#A95E58]',
      defaultLabel: 'Error'
    },
    info: {
      bg: 'bg-[#607E8A]/15 border-[#607E8A]/30',
      text: 'text-[#607E8A] dark:text-[#88A8B6]',
      dot: 'bg-[#607E8A]',
      defaultLabel: 'Active'
    }
  };

  const current = config[normStatus] || config.info;
  const displayLabel = label || current.defaultLabel;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${current.bg} ${current.text} ${sizeClasses} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && normStatus === 'connected' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.dot} opacity-60`}
          />
        )}
        {pulse && normStatus === 'connecting' && (
          <span
            className={`animate-pulse absolute inline-flex h-full w-full rounded-full ${current.dot} opacity-80`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`} />
      </span>
      <span>{displayLabel}</span>
    </span>
  );
};

