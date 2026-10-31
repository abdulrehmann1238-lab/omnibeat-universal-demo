import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-status-info flex-shrink-0" />;
        let borderClass = 'border-brand-border dark:border-app-border';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-status-connected flex-shrink-0" />;
          borderClass = 'border-status-connected/40';
        } else if (toast.type === 'warn') {
          icon = <AlertTriangle className="w-4 h-4 text-status-connecting flex-shrink-0" />;
          borderClass = 'border-status-connecting/40';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0" />;
          borderClass = 'border-status-error/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg bg-brand-surface dark:bg-app-elevated text-brand-charcoal dark:text-app-text shadow-lg border ${borderClass} transition-all duration-200 transform translate-y-0`}
          >
            <div className="pt-0.5">{icon}</div>
            <div className="flex-1 text-xs leading-relaxed font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-brand-muted hover:text-brand-charcoal dark:text-app-muted dark:hover:text-app-text p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

