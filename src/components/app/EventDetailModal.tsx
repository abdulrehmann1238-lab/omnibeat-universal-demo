import React, { useState } from 'react';
import { MetadataEvent } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Copy, Check, Clock, Radio, ShieldCheck, Gamepad2, Database } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface EventDetailModalProps {
  event: MetadataEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const handleCopy = () => {
    const jsonStr = JSON.stringify(event.rawPayload, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    addToast('Normalized JSON metadata copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={!!event}
      onClose={onClose}
      title={`Metadata Event: ${event.id}`}
      subtitle={`Normalized track transmission record • ${event.timestampFormatted}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Top Summary Banner */}
        <div className="p-4 rounded-xl bg-brand-stone/40 dark:bg-app-elevated border border-brand-border dark:border-app-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-brand-charcoal dark:text-app-text font-heading">
              {event.title}
            </div>
            <div className="text-xs text-brand-muted dark:text-app-muted">
              {event.artist}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge
              status={
                event.deliveryStatus === 'delivered'
                  ? 'connected'
                  : event.deliveryStatus === 'duplicate_prevented'
                  ? 'connecting'
                  : 'error'
              }
              label={
                event.deliveryStatus === 'delivered'
                  ? 'Delivered to OmniDrop'
                  : event.deliveryStatus === 'duplicate_prevented'
                  ? 'Duplicate Suppressed'
                  : 'Delivery Failed'
              }
            />
          </div>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="flex items-center gap-1.5 text-brand-muted dark:text-app-muted mb-1 text-[11px]">
              <Radio className="w-3.5 h-3.5" />
              <span>Source</span>
            </div>
            <div className="font-semibold text-brand-charcoal dark:text-app-text">
              {event.source}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="flex items-center gap-1.5 text-brand-muted dark:text-app-muted mb-1 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Pipeline Latency</span>
            </div>
            <div className="font-semibold font-mono text-brand-forest dark:text-app-accent">
              {(event.latencyMs / 1000).toFixed(2)}s
            </div>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="flex items-center gap-1.5 text-brand-muted dark:text-app-muted mb-1 text-[11px]">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Target Game</span>
            </div>
            <div className="font-semibold font-mono text-brand-charcoal dark:text-app-text">
              {event.targetGame}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="flex items-center gap-1.5 text-brand-muted dark:text-app-muted mb-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Duplicate Check</span>
            </div>
            <div className="font-semibold text-brand-charcoal dark:text-app-text truncate">
              {event.isDuplicate ? 'Suppressed' : 'Passed'}
            </div>
          </div>
        </div>

        {/* Normalized JSON Payload Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-charcoal dark:text-app-text">
              <Database className="w-3.5 h-3.5 text-brand-sage" />
              <span>Normalized Transmission JSON Payload</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone/50 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-status-connected" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <div className="relative rounded-lg bg-[#181C1A] text-[#E0E6DF] p-4 text-[11px] font-mono border border-app-border overflow-x-auto shadow-inner leading-relaxed">
            <pre>{JSON.stringify(event.rawPayload, null, 2)}</pre>
          </div>
        </div>

        {/* Technical Honesty Disclaimer Note */}
        <p className="text-[11px] text-brand-muted dark:text-app-muted italic border-t border-brand-border dark:border-app-border pt-3">
          Note: This is simulated frontend demonstration metadata representing the unified OmniBeat event schema. No real HTTP socket or external service credentials were used.
        </p>
      </div>
    </Modal>
  );
};

