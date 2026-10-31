import React, { useState } from 'react';
import { DJPlatformId, DetectionMode } from '../../types';
import { DJ_PLATFORMS } from '../../data/platforms';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  Radio,
  Zap,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';

interface PlatformSetupModalProps {
  platformId: DJPlatformId | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformSetupModal: React.FC<PlatformSetupModalProps> = ({
  platformId,
  isOpen,
  onClose
}) => {
  const {
    connectDJ,
    setDJPlatform,
    selectedPlatform,
    connectionStatus,
    isConnecting,
    connectionStep
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedMethod, setSelectedMethod] = useState<DetectionMode>('event-state');

  if (!platformId) return null;
  const platform = DJ_PLATFORMS[platformId];
  if (!platform) return null;

  const isVirtualDJ = platformId === 'virtualdj';

  const handleConnectVirtualDJ = async () => {
    setDJPlatform('virtualdj');
    await connectDJ(selectedMethod);
    onClose();
    setStep(1);
  };

  const handleSelectEvaluationPlatform = () => {
    setDJPlatform(platformId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${platform.name} Connection Environment`}
      subtitle={platform.statusLabel}
      maxWidth="max-w-2xl"
    >
      {isVirtualDJ ? (
        // VirtualDJ Guided 4-Step Setup Flow (PRD Section 8)
        <div className="space-y-6">
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between border-b border-brand-border dark:border-app-border pb-3">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                    step >= s
                      ? 'bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg'
                      : 'bg-brand-stone/60 dark:bg-app-elevated text-brand-muted dark:text-app-muted'
                  }`}
                >
                  {s}
                </span>
                <span className="hidden sm:inline text-xs font-medium text-brand-muted dark:text-app-muted">
                  {s === 1
                    ? 'Confirm Platform'
                    : s === 2
                    ? 'Verify Process'
                    : s === 3
                    ? 'Detection Mode'
                    : 'Connect'}
                </span>
                {s < 4 && <span className="text-brand-border dark:text-app-border">›</span>}
              </div>
            ))}
          </div>

          {/* Step 1: Confirm VirtualDJ */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-stone/30 dark:bg-app-elevated border border-brand-border dark:border-app-border">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-charcoal dark:text-app-text mb-1">
                  <Radio className="w-4 h-4 text-brand-forest dark:text-app-accent" />
                  <span>VirtualDJ (Existing Beta Foundation)</span>
                </div>
                <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed">
                  VirtualDJ is currently supported via history-file polling in the existing client Beta.
                  This demonstration connects your desktop instance to evaluate lower-latency event hooks.
                </p>
              </div>

              <div className="text-xs space-y-2 text-brand-muted dark:text-app-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Compatible with VirtualDJ 2023 / 2024 (Windows & macOS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Supports dual-deck and four-deck live mixing events</span>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-semibold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirm Process Running */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-sageLight/50 dark:bg-app-elevated border border-brand-sage/40 dark:border-app-border">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest dark:text-app-accent mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Local DJ Process Discovery</span>
                </div>
                <p className="text-xs text-brand-charcoal dark:text-app-text leading-relaxed">
                  In a production desktop application, OmniBeat Universal detects the active VirtualDJ
                  background process (`virtualdj.exe` on Windows or `VirtualDJ.app` on macOS) via local system IPC.
                </p>
                <div className="mt-3 p-2.5 rounded bg-brand-surface dark:bg-app-bg text-[11px] font-mono text-brand-muted dark:text-app-muted">
                  PID: 14208 • Status: Active (Simulated) • Local loopback port: 127.0.0.1:49202
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted dark:text-app-muted hover:text-brand-charcoal dark:hover:text-app-text"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-semibold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Choose Detection Mode */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-brand-muted dark:text-app-muted">
                Choose which track-detection pipeline to simulate in this demonstration:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Proposed Low-latency mode */}
                <div
                  onClick={() => setSelectedMethod('event-state')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedMethod === 'event-state'
                      ? 'bg-brand-sageLight/50 dark:bg-app-elevated border-brand-forest dark:border-app-accent shadow-sm ring-1 ring-brand-forest/20'
                      : 'bg-brand-surface dark:bg-app-bg border-brand-border dark:border-app-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-forest dark:text-app-accent flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Target Playback-State
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-forest/10 dark:bg-app-accent/10 text-brand-forest dark:text-app-accent font-semibold">
                      ~1.8s Target
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted dark:text-app-muted leading-relaxed">
                    Evaluates real-time playback hooks, listening to fader status and deck loading.
                    (Simulated representation pending technical validation).
                  </p>
                </div>

                {/* Existing History-file mode */}
                <div
                  onClick={() => setSelectedMethod('history-file')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedMethod === 'history-file'
                      ? 'bg-brand-stone/40 dark:bg-app-elevated border-brand-charcoal dark:border-app-accent shadow-sm'
                      : 'bg-brand-surface dark:bg-app-bg border-brand-border dark:border-app-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-charcoal dark:text-app-text flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Existing History-File
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-status-connecting/15 text-status-connecting font-semibold">
                      ~45s Beta Delay
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted dark:text-app-muted leading-relaxed">
                    Replicates the current Beta behavior where track changes wait for VirtualDJ history
                    log updates before transmitting.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted dark:text-app-muted"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-semibold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
                >
                  <span>Continue to Step 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Connect Animated Sequence */}
          {step === 4 && (
            <div className="space-y-5 text-center py-4">
              {isConnecting ? (
                <div className="space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-forest dark:text-app-accent mx-auto" />
                  <div className="text-xs font-semibold text-brand-charcoal dark:text-app-text">
                    {connectionStep || 'Establishing secure connection...'}
                  </div>
                  <p className="text-[11px] text-brand-muted dark:text-app-muted max-w-sm mx-auto">
                    Simulating local loopback IPC socket connection with VirtualDJ playback engine.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-brand-sageLight dark:bg-app-elevated flex items-center justify-center mx-auto text-brand-forest dark:text-app-accent">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold font-heading text-brand-charcoal dark:text-app-text">
                    Ready to Connect VirtualDJ
                  </h4>
                  <p className="text-xs text-brand-muted dark:text-app-muted max-w-md mx-auto">
                    Click Connect below to initiate the simulated handshake, activate real-time track
                    detection, and route metadata to your active Omni-Bingo game.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => setStep(3)}
                      className="px-4 py-2 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted dark:text-app-muted"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConnectVirtualDJ}
                      className="px-5 py-2.5 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold hover:bg-brand-forestDark dark:hover:bg-app-accentHover shadow-sm transition-all"
                    >
                      Connect VirtualDJ
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Honest Feasibility Evaluation Panel for Serato, rekordbox, Engine DJ (PRD Section 8 & 20)
        <div className="space-y-5">
          {/* Status banner */}
          <div className="p-4 rounded-xl bg-status-connecting/10 border border-status-connecting/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-status-connecting flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                Technical Feasibility Evaluation Required
              </div>
              <p className="text-xs text-brand-muted dark:text-app-muted mt-1 leading-relaxed">
                {platform.description}
              </p>
            </div>
          </div>

          {/* Current State vs Investigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-app-muted">
              Current Metadata Mechanism
            </h4>
            <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg text-xs text-brand-charcoal dark:text-app-text border border-brand-border dark:border-app-border leading-relaxed">
              {platform.currentMethodDescription}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-app-muted">
              Key Technical Investigation Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-charcoal dark:text-app-text">
              {platform.investigationAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-forest dark:text-app-accent font-bold">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-app-muted">
              Expected Platform Limitations
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-muted dark:text-app-muted">
              {platform.expectedLimitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-status-error flex-shrink-0 mt-0.5" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/30 dark:bg-app-elevated border border-brand-border/60 dark:border-app-border/60 text-xs text-brand-muted dark:text-app-muted italic">
            {platform.evaluationNote}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-brand-border dark:border-app-border">
            <span className="text-[11px] text-brand-muted dark:text-app-muted">
              Selected in demo as simulated adapter
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted dark:text-app-muted"
              >
                Close
              </button>
              <button
                onClick={handleSelectEvaluationPlatform}
                className="px-4 py-2 rounded-lg bg-brand-stone/60 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text text-xs font-semibold transition-colors"
              >
                Select {platform.name} for Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

