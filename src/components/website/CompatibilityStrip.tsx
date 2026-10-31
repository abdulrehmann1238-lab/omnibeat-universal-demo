import React, { useState } from 'react';
import { DJ_PLATFORMS } from '../../data/platforms';
import { DJPlatformId } from '../../types';
import { PlatformSetupModal } from '../app/PlatformSetupModal';
import { Radio, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export const CompatibilityStrip: React.FC = () => {
  const [activePlatformModal, setActivePlatformModal] = useState<DJPlatformId | null>(null);
  const platforms = Object.values(DJ_PLATFORMS);

  return (
    <section className="py-12 bg-brand-surface border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-heading font-extrabold text-2xl text-brand-charcoal tracking-tight">
            Designed for your DJ environment.
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            Engineered around the software and hardware setups professional DJs already rely on.
          </p>
        </div>

        {/* 4 Integration Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const isBeta = platform.status === 'existing-beta';

            return (
              <div
                key={platform.id}
                onClick={() => setActivePlatformModal(platform.id)}
                className="group relative p-5 rounded-xl bg-brand-ivory border border-brand-border hover:border-brand-sage hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-heading font-bold text-base text-brand-charcoal group-hover:text-brand-forest transition-colors">
                      {platform.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        isBeta
                          ? 'bg-brand-sageLight text-brand-forest border border-brand-sage/40'
                          : 'bg-status-connecting/15 text-status-connecting border border-status-connecting/30'
                      }`}
                    >
                      {isBeta ? 'Existing Beta' : 'Feasibility eval'}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                    {platform.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-semibold text-brand-forest">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical distinction note */}
        <p className="text-[11px] text-center text-brand-muted mt-6 max-w-3xl mx-auto leading-relaxed">
          * Note: VirtualDJ represents the client's existing production Beta integration. Serato DJ Pro, rekordbox, and Engine DJ are architectural feasibility targets requiring dedicated technical validation.
        </p>
      </div>

      <PlatformSetupModal
        platformId={activePlatformModal}
        isOpen={!!activePlatformModal}
        onClose={() => setActivePlatformModal(null)}
      />
    </section>
  );
};

