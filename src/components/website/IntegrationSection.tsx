import React, { useState } from 'react';
import { DJ_PLATFORMS } from '../../data/platforms';
import { DJPlatformId } from '../../types';
import { PlatformSetupModal } from '../app/PlatformSetupModal';
import { Radio, ArrowRight, CheckCircle2, AlertTriangle, Layers, Cpu } from 'lucide-react';

export const IntegrationSection: React.FC = () => {
  const [selectedPlatformModal, setSelectedPlatformModal] = useState<DJPlatformId | null>(null);
  const platforms = Object.values(DJ_PLATFORMS);

  return (
    <section id="integrations" className="py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-forest mb-2 block">
            DJ ECOSYSTEM COMPATIBILITY
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            One interface. Multiple DJ environments.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            A modular adapter architecture designed to respect the unique security boundaries, APIs, and operating modes of each DJ ecosystem.
          </p>
        </div>

        {/* 4 Large Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => {
            const isBeta = platform.status === 'existing-beta';

            return (
              <div
                key={platform.id}
                className="p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-sage/60 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-2xl text-brand-charcoal">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5">
                        {platform.tagline}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                        isBeta
                          ? 'bg-brand-sageLight text-brand-forest border border-brand-sage/40'
                          : 'bg-status-connecting/15 text-status-connecting border border-status-connecting/30'
                      }`}
                    >
                      {platform.statusLabel}
                    </span>
                  </div>

                  <p className="text-xs text-brand-charcoal/80 leading-relaxed mb-6">
                    {platform.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-2 text-xs py-4 border-y border-brand-border/60">
                    <div className="flex items-center gap-2 text-brand-muted">
                      <Cpu className="w-4 h-4 text-brand-forest" />
                      <span><strong>Supported OS:</strong> {platform.osCompatibility.join(' • ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-muted">
                      <Layers className="w-4 h-4 text-brand-forest" />
                      <span className="truncate"><strong>Modes:</strong> {platform.supportedModes.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted font-mono">
                    {isBeta ? 'Active production benchmark' : 'Requires technical feasibility check'}
                  </span>

                  <button
                    onClick={() => setSelectedPlatformModal(platform.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-stone/40 hover:bg-brand-stone text-brand-charcoal text-xs font-semibold transition-colors"
                  >
                    <span>Explore Integration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PlatformSetupModal
        platformId={selectedPlatformModal}
        isOpen={!!selectedPlatformModal}
        onClose={() => setSelectedPlatformModal(null)}
      />
    </section>
  );
};

