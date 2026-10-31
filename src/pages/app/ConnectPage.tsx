import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DJ_PLATFORMS } from '../../data/platforms';
import { DJPlatformId } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PlatformSetupModal } from '../../components/app/PlatformSetupModal';
import {
  Radio,
  CheckCircle2,
  AlertTriangle,
  Info,
  Power,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ConnectPage: React.FC = () => {
  const {
    selectedPlatform,
    connectionStatus,
    detectionMode,
    disconnectDJ,
    setDJPlatform
  } = useApp();

  const [activeModalPlatform, setActiveModalPlatform] = useState<DJPlatformId | null>(null);

  const platforms = Object.values(DJ_PLATFORMS);
  const currentInfo = DJ_PLATFORMS[selectedPlatform];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
          DJ Software Connections
        </h1>
        <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
          Choose the DJ environment you want OmniBeat Universal to connect with.
        </p>
      </div>

      {/* Active Connection Banner */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-brand-stone/40 dark:bg-app-elevated border border-brand-border dark:border-app-border flex items-center justify-center text-brand-forest dark:text-app-accent flex-shrink-0">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-brand-charcoal dark:text-app-text">
                Current Adapter: {currentInfo?.name}
              </span>
              <StatusBadge status={connectionStatus} size="sm" />
            </div>
            <div className="text-xs text-brand-muted dark:text-app-muted mt-0.5">
              Mode: <span className="font-mono font-medium text-brand-forest dark:text-app-accent">{detectionMode === 'event-state' ? 'Target Event/State (~1.8s)' : 'History-File (~45s)'}</span> • Status: {currentInfo?.statusLabel}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' ? (
            <button
              onClick={disconnectDJ}
              className="px-3.5 py-2 rounded-lg border border-status-error/40 hover:bg-status-error/10 text-xs font-semibold text-status-error transition-colors flex items-center gap-1.5"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Disconnect Source</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModalPlatform(selectedPlatform)}
              className="px-4 py-2 rounded-lg bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-brand-surface dark:text-app-bg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Connect {currentInfo?.name}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Platform Cards Grid (PRD Section 8) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          const isBeta = platform.status === 'existing-beta';

          return (
            <div
              key={platform.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-brand-surface dark:bg-app-secondary border-brand-forest dark:border-app-accent ring-1 ring-brand-forest/30 dark:ring-app-accent/30 shadow-md'
                  : 'bg-brand-surface/70 dark:bg-app-secondary/60 border-brand-border dark:border-app-border hover:border-brand-sage dark:hover:border-app-muted'
              }`}
            >
              <div>
                {/* Card Top Pill & Title */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-brand-charcoal dark:text-app-text">
                      {platform.name}
                    </h3>
                    <p className="text-xs text-brand-muted dark:text-app-muted">
                      {platform.tagline}
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isBeta
                        ? 'bg-brand-sageLight text-brand-forest dark:bg-brand-forest/20 dark:text-brand-sage border border-brand-sage/40'
                        : 'bg-status-connecting/15 text-status-connecting border border-status-connecting/30'
                    }`}
                  >
                    {isBeta ? 'Existing Beta foundation' : 'Feasibility evaluation'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-brand-charcoal/90 dark:text-app-muted leading-relaxed my-3">
                  {platform.description}
                </p>

                {/* OS & Modes Strip */}
                <div className="space-y-1.5 pt-2 border-t border-brand-border/60 dark:border-app-border/60 text-[11px] text-brand-muted dark:text-app-muted">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
                    <span>OS Support: {platform.osCompatibility.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
                    <span className="truncate">Modes: {platform.supportedModes.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-brand-border/60 dark:border-app-border/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-brand-muted dark:text-app-muted">
                  {isSelected ? (
                    <span className="text-brand-forest dark:text-app-accent font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Adapter
                    </span>
                  ) : (
                    'Ready to inspect'
                  )}
                </span>

                <button
                  onClick={() => setActiveModalPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                    isBeta
                      ? 'bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-brand-surface dark:text-app-bg shadow-sm'
                      : 'bg-brand-stone/50 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text'
                  }`}
                >
                  <span>{isBeta ? (isSelected ? 'Configure VirtualDJ' : 'Select VirtualDJ') : `Evaluate ${platform.name}`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Honesty Callout Box (PRD Section 20) */}
      <div className="p-4 rounded-xl bg-brand-stone/30 dark:bg-app-elevated border border-brand-border dark:border-app-border text-xs text-brand-muted dark:text-app-muted space-y-1.5 leading-relaxed">
        <div className="font-semibold text-brand-charcoal dark:text-app-text flex items-center gap-1.5">
          <Info className="w-4 h-4 text-brand-sage" />
          <span>Independent Feasibility Evaluation Principles</span>
        </div>
        <p>
          Each DJ platform enforces unique sandboxing, binary schemas, and API constraints. While VirtualDJ serves as the existing Beta foundation with an observed ~45s history-file delay, Serato DJ Pro, rekordbox, and Engine DJ each require standalone feasibility validation before production implementation.
        </p>
      </div>

      {/* Platform Setup / Feasibility Modal */}
      <PlatformSetupModal
        platformId={activeModalPlatform}
        isOpen={!!activeModalPlatform}
        onClose={() => setActiveModalPlatform(null)}
      />
    </div>
  );
};

