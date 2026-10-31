import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DiagnosticCheckItem } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Wrench,
  Radio,
  Server,
  Gamepad2,
  Activity,
  ShieldCheck,
  Play,
  Wifi,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  RefreshCw,
  Loader2
} from 'lucide-react';

export const DiagnosticsPage: React.FC = () => {
  const {
    diagnosticChecks,
    diagnosticLogs,
    networkStatus,
    isRunningDiagnostics,
    runDiagnosticTest,
    simulateNetworkInterruption,
    clearDiagnosticLogs,
    selectedPlatform,
    connectionStatus,
    activeGame
  } = useApp();

  const [selectedCheckForDetails, setSelectedCheckForDetails] = useState<DiagnosticCheckItem | null>(null);

  const passedCount = diagnosticChecks.filter((c) => c.status === 'passed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
            Connection Diagnostics
          </h1>
          <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
            Understand your connection status and identify potential problems before they affect a live event.
          </p>
        </div>

        {/* Action simulators */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={runDiagnosticTest}
            disabled={isRunningDiagnostics}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-brand-surface dark:text-app-bg text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
          >
            {isRunningDiagnostics ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span>Run Diagnostic Test</span>
          </button>

          <button
            onClick={simulateNetworkInterruption}
            disabled={networkStatus !== 'connected'}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-status-error/40 hover:bg-status-error/10 text-xs font-semibold text-status-error transition-colors disabled:opacity-50"
            title="Simulate live venue network socket drop & auto recovery"
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Simulate Network Drop</span>
          </button>
        </div>
      </div>

      {/* Network Warning Banner if Interrupted */}
      {networkStatus !== 'connected' && (
        <div className="p-4 rounded-xl bg-status-error/15 border border-status-error/40 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-status-error flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                {networkStatus === 'interrupted'
                  ? 'Venue Network Interruption Detected'
                  : 'Reconnecting to OmniDrop Gateway (Attempt 1/5)...'}
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                Automatic backoff active. Outbound track events are queued locally and will be reconciled upon reconnect.
              </div>
            </div>
          </div>
          <StatusBadge status="connecting" label="Auto-Recovering" size="sm" />
        </div>
      )}

      {/* 12.1 System Status Cards (6 Indicators) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            DJ Source
          </span>
          <div className="text-xs font-bold text-brand-charcoal dark:text-app-text mt-1">
            {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            IPC Loopback
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            OmniBeat Session
          </span>
          <div className="text-xs font-bold text-status-connected mt-1">
            Active
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            Demo Host
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            Backend Connection
          </span>
          <div className="text-xs font-bold text-brand-forest dark:text-app-accent mt-1">
            Simulated Online
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            No real API
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            Active Game
          </span>
          <div className="text-xs font-bold text-brand-charcoal dark:text-app-text mt-1 truncate">
            {activeGame ? activeGame.sessionId : 'None'}
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            Omni-Bingo
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            Event Pipeline
          </span>
          <div className="text-xs font-bold text-status-connected mt-1">
            Ready
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            Schema v2.4
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted block">
            Duplicate Protection
          </span>
          <div className="text-xs font-bold text-status-connected mt-1">
            Enabled
          </div>
          <span className="text-[10px] text-brand-muted dark:text-app-muted font-mono">
            45s Debounce
          </span>
        </div>
      </div>

      {/* 12.2 Diagnostic Checks (8 items) */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
              System Health & Subsystem Integrity Checks
            </h3>
            <p className="text-xs text-brand-muted dark:text-app-muted">
              {passedCount} of {diagnosticChecks.length} checks passing. Click any item for technical diagnostics.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-brand-forest dark:text-app-accent">
            {passedCount === 8 ? '✓ All Subsystems Normal' : 'Verification In Progress'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {diagnosticChecks.map((chk) => (
            <div
              key={chk.id}
              onClick={() => setSelectedCheckForDetails(chk)}
              className="p-3.5 rounded-xl bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60 hover:border-brand-sage dark:hover:border-app-accent transition-colors cursor-pointer flex items-start justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                    {chk.name}
                  </span>
                  <span className="text-[10px] font-mono text-brand-muted dark:text-app-muted uppercase">
                    [{chk.category}]
                  </span>
                </div>
                <p className="text-[11px] text-brand-muted dark:text-app-muted leading-relaxed line-clamp-1">
                  {chk.description}
                </p>
                <div className="text-[10px] font-mono text-brand-muted dark:text-app-muted">
                  Checked: {chk.lastChecked}
                </div>
              </div>

              <div className="flex-shrink-0 pt-0.5">
                <StatusBadge
                  status={
                    chk.status === 'passed'
                      ? 'connected'
                      : chk.status === 'checking'
                      ? 'connecting'
                      : 'error'
                  }
                  label={
                    chk.status === 'passed'
                      ? 'Passed'
                      : chk.status === 'checking'
                      ? 'Testing...'
                      : 'Attention'
                  }
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Log History */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
              Diagnostic Event Stream & Subsystem Logs
            </h3>
            <p className="text-xs text-brand-muted dark:text-app-muted">
              Live audit trace of socket handshakes, detection events, and auto-reconciliation.
            </p>
          </div>

          <button
            onClick={clearDiagnosticLogs}
            className="text-xs text-brand-muted hover:text-status-error dark:text-app-muted dark:hover:text-status-error p-1.5 rounded transition-colors inline-flex items-center gap-1"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Clear Logs</span>
          </button>
        </div>

        <div className="rounded-lg bg-[#181C1A] text-[#E0E6DF] p-3 text-[11px] font-mono border border-app-border max-h-56 overflow-y-auto space-y-1.5 shadow-inner">
          {diagnosticLogs.length === 0 ? (
            <div className="text-app-muted py-3 text-center">No diagnostic logs recorded.</div>
          ) : (
            diagnosticLogs.map((log) => {
              let badgeColor = 'text-brand-sage';
              if (log.level === 'warn') badgeColor = 'text-status-connecting';
              if (log.level === 'error') badgeColor = 'text-status-error';
              if (log.level === 'success') badgeColor = 'text-status-connected';

              return (
                <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#A9B0A8] flex-shrink-0">[{log.timestamp}]</span>
                  <span className={`font-semibold flex-shrink-0 ${badgeColor}`}>
                    [{log.subsystem}]
                  </span>
                  <span className="text-[#F5F4EF]">{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Check Details Modal */}
      <Modal
        isOpen={!!selectedCheckForDetails}
        onClose={() => setSelectedCheckForDetails(null)}
        title={selectedCheckForDetails?.name || 'Diagnostic Check'}
        subtitle={`Category: ${selectedCheckForDetails?.category.toUpperCase()} • Verification Details`}
        maxWidth="max-w-md"
      >
        {selectedCheckForDetails && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-brand-stone/30 dark:bg-app-bg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-brand-muted dark:text-app-muted">Subsystem Status:</span>
                <StatusBadge
                  status={selectedCheckForDetails.status === 'passed' ? 'connected' : 'error'}
                  label={selectedCheckForDetails.status.toUpperCase()}
                  size="sm"
                />
              </div>
              <div>
                <span className="text-brand-muted dark:text-app-muted block text-[11px] mb-0.5">Description:</span>
                <p className="text-brand-charcoal dark:text-app-text">{selectedCheckForDetails.description}</p>
              </div>
              <div className="pt-2 border-t border-brand-border/60 dark:border-app-border/60">
                <span className="text-brand-muted dark:text-app-muted block text-[11px] mb-0.5">Technical Telemetry:</span>
                <div className="p-2 rounded bg-brand-surface dark:bg-app-elevated font-mono text-[11px] text-brand-forest dark:text-app-accent">
                  {selectedCheckForDetails.details}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCheckForDetails(null)}
                className="px-4 py-1.5 rounded-lg bg-brand-stone/60 dark:bg-app-elevated text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

