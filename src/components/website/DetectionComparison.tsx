import React, { useState } from 'react';
import { Clock, Zap, Play, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';

export const DetectionComparison: React.FC = () => {
  const [isComparing, setIsComparing] = useState(false);
  const [targetProgress, setTargetProgress] = useState(100);
  const [historyProgress, setHistoryProgress] = useState(100);

  const handleRunComparison = async () => {
    if (isComparing) return;
    setIsComparing(true);
    setTargetProgress(0);
    setHistoryProgress(0);

    // Fast target timeline reaches 100% in 1.8 seconds
    const targetInterval = setInterval(() => {
      setTargetProgress((prev) => {
        if (prev >= 100) {
          clearInterval(targetInterval);
          return 100;
        }
        return prev + 6;
      });
    }, 100);

    // Slow history timeline takes ~6 seconds in the visual simulation to represent the 45s delay
    const historyInterval = setInterval(() => {
      setHistoryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(historyInterval);
          setIsComparing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 120);
  };

  return (
    <section id="detection" className="py-24 bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-forest mb-2 block">
            SOLVING THE 45-SECOND BOTTLENECK
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            Less waiting. Faster track awareness.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            Track detection should respond to playback changes, not depend exclusively on delayed history-file updates.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRunComparison}
              disabled={isComparing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestDark text-brand-surface text-xs font-bold transition-all shadow-sm disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isComparing ? 'Running Side-by-Side Test...' : 'Compare Detection Flows'}</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Existing Beta Mechanism */}
          <div className="p-8 rounded-2xl bg-brand-ivory border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-status-connecting" />
                  Existing Beta Mechanism
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-status-connecting/20 text-status-connecting">
                  ~45s Reported Delay
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-brand-charcoal mb-2">
                History-File-Based Detection
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Current implementations poll disk logs (e.g. VirtualDJ <code>History.txt</code>). Tracks are only written after reaching a playback duration threshold, resulting in substantial delays before Omni-Bingo can recognize the song.
              </p>

              {/* Timeline Steps */}
              <div className="space-y-3 relative mb-6">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-stone flex items-center justify-center text-[10px] font-bold text-brand-charcoal flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-brand-charcoal">Track starts playing</div>
                    <div className="text-[11px] text-brand-muted">DJ fader moves up, audio begins at venue</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-status-connecting/20 flex items-center justify-center text-[10px] font-bold text-status-connecting flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-status-connecting">Waiting for disk write threshold (~45s)</div>
                    <div className="text-[11px] text-brand-muted">VirtualDJ internal buffer delays writing to disk</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-stone flex items-center justify-center text-[10px] font-bold text-brand-charcoal flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-brand-charcoal">History file updates</div>
                    <div className="text-[11px] text-brand-muted">OmniBeat file watcher detects new text line</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-stone flex items-center justify-center text-[10px] font-bold text-brand-charcoal flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-brand-charcoal">Delayed metadata transmitted</div>
                    <div className="text-[11px] text-brand-muted">Players finally see track nearly 1 minute in</div>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-brand-muted">
                  <span>Detection Timeline</span>
                  <span className="font-semibold">{historyProgress === 100 ? '~45.0s' : `${(historyProgress * 0.45).toFixed(1)}s`}</span>
                </div>
                <div className="w-full bg-brand-stone h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-status-connecting transition-all duration-150"
                    style={{ width: `${historyProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-brand-border text-[11px] text-brand-muted italic">
              Existing Beta mechanism — reported delay, subject to validation.
            </div>
          </div>

          {/* Card 2: Target Detection Concept */}
          <div className="p-8 rounded-2xl bg-brand-surface border-2 border-brand-forest shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-forest flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-brand-forest" />
                  Target Architecture
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-brand-sageLight text-brand-forest">
                  1–3s Latency Target
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-brand-charcoal mb-2">
                Authorized Event & Playback-State Detection
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Evaluates direct query hooks, fader events, and playback state. Track identification occurs as soon as the crossfader or volume fader moves, ensuring the game updates almost immediately.
              </p>

              {/* Timeline Steps */}
              <div className="space-y-3 relative mb-6">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-forest text-brand-surface flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-brand-charcoal">Track starts playing</div>
                    <div className="text-[11px] text-brand-muted">Fader cross engages or play status triggers</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-forest text-brand-surface flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-brand-forest">Supported playback event intercepted</div>
                    <div className="text-[11px] text-brand-muted">OmniBeat reads deck metadata via IPC hook</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-forest text-brand-surface flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-brand-charcoal">Metadata normalized immediately</div>
                    <div className="text-[11px] text-brand-muted">JSON structure generated in ~0.4ms</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-forest text-brand-surface flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-brand-forest">Immediate Omni-Bingo display</div>
                    <div className="text-[11px] text-brand-muted">Players confirm song in 1–3s of opening beat</div>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-brand-muted">
                  <span>Detection Timeline</span>
                  <span className="font-semibold text-brand-forest">{targetProgress === 100 ? '1.8s' : `${(targetProgress * 0.018).toFixed(1)}s`}</span>
                </div>
                <div className="w-full bg-brand-stone h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-forest transition-all duration-150"
                    style={{ width: `${targetProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-brand-border text-[11px] text-brand-muted italic">
              Target latency where technically achievable across platform APIs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

