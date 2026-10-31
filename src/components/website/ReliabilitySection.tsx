import React, { useState } from 'react';
import { RefreshCw, ShieldCheck, KeyRound, Sliders, Wifi, AlertCircle, CheckCircle2, Play } from 'lucide-react';

export const ReliabilitySection: React.FC = () => {
  const [simState, setSimState] = useState<'idle' | 'interrupted' | 'reconnecting' | 'restored'>('idle');

  const capabilities = [
    {
      icon: <RefreshCw className="w-5 h-5 text-brand-forest" />,
      title: 'Automatic Reconnection',
      desc: 'Local retry engine with backoff continuously monitors venue Wi-Fi and Ethernet sockets, restoring transmission automatically without operator intervention.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-forest" />,
      title: 'Duplicate Event Prevention',
      desc: 'Rolling 45-second debounce memory suppresses cue scratching, fader stutter, and rapid re-triggers from polluting game bingo cards.'
    },
    {
      icon: <KeyRound className="w-5 h-5 text-brand-forest" />,
      title: 'Secure Credential Handling',
      desc: 'Ephemeral session tokens and authenticated payload hashing protect event transmission. Credentials never leave the local environment.'
    },
    {
      icon: <Sliders className="w-5 h-5 text-brand-forest" />,
      title: 'Manual Gameplay Continuity',
      desc: 'Independent architectural separation ensures event hosts can trigger manual gameplay overrides at any moment without disconnecting the DJ.'
    }
  ];

  const handleSimulateInterruption = async () => {
    if (simState !== 'idle' && simState !== 'restored') return;

    setSimState('interrupted');
    await new Promise((r) => setTimeout(r, 1600));

    setSimState('reconnecting');
    await new Promise((r) => setTimeout(r, 1800));

    setSimState('restored');
  };

  return (
    <section id="reliability" className="py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-forest mb-2 block">
            LIVE VENUE RESILIENCE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            Built for live events, not just ideal conditions.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            Live music venues face crowded Wi-Fi, unpredictable power drops, and energetic DJs. OmniBeat Universal is engineered to preserve gameplay integrity through every scenario.
          </p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-sage transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-sageLight flex items-center justify-center mb-4">
                  {cap.icon}
                </div>
                <h3 className="font-heading font-bold text-base text-brand-charcoal mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Reliability Simulator */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-brand-surface border border-brand-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-border/60">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-forest">
                Interactive Reliability Simulator
              </div>
              <h3 className="font-heading font-bold text-base text-brand-charcoal">
                Simulate Network Drop & Automatic Recovery
              </h3>
            </div>

            <button
              onClick={handleSimulateInterruption}
              disabled={simState === 'interrupted' || simState === 'reconnecting'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Interruption</span>
            </button>
          </div>

          {/* Stepper Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div
              className={`p-3 rounded-xl border ${
                simState === 'idle' || simState === 'restored'
                  ? 'bg-brand-sageLight border-brand-forest text-brand-forest font-semibold'
                  : 'bg-brand-ivory border-brand-border text-brand-muted'
              }`}
            >
              <div className="text-[10px] text-brand-muted">Phase 1</div>
              <div>Network Connected</div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                simState === 'interrupted'
                  ? 'bg-status-error/15 border-status-error text-status-error font-semibold'
                  : 'bg-brand-ivory border-brand-border text-brand-muted'
              }`}
            >
              <div className="text-[10px] text-brand-muted">Phase 2</div>
              <div>Socket Interrupted</div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                simState === 'reconnecting'
                  ? 'bg-status-connecting/20 border-status-connecting text-status-connecting font-semibold'
                  : 'bg-brand-ivory border-brand-border text-brand-muted'
              }`}
            >
              <div className="text-[10px] text-brand-muted">Phase 3</div>
              <div>Backoff Reconnection</div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                simState === 'restored'
                  ? 'bg-brand-sageLight border-brand-forest text-brand-forest font-semibold'
                  : 'bg-brand-ivory border-brand-border text-brand-muted'
              }`}
            >
              <div className="text-[10px] text-brand-muted">Phase 4</div>
              <div>Queue Reconciled</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-brand-ivory text-[11px] text-brand-muted leading-relaxed">
            {simState === 'idle' && 'Status: Connected. Simulating normal venue playback.'}
            {simState === 'interrupted' && 'Status: Venue Wi-Fi dropped. Outbound events paused and queued in memory.'}
            {simState === 'reconnecting' && 'Status: Attempting automatic handshake to OmniDrop Gateway...'}
            {simState === 'restored' && 'Status: Connection restored! 0 dropped packets. Queue reconciled seamlessly.'}
          </div>
        </div>
      </div>
    </section>
  );
};

