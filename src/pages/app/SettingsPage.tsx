import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DJ_PLATFORMS } from '../../data/platforms';
import { Modal } from '../../components/common/Modal';
import {
  Settings,
  Sun,
  Moon,
  Radio,
  Sliders,
  ShieldCheck,
  RotateCcw,
  Info,
  Check,
  AlertTriangle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    preferences,
    updatePreferences,
    theme,
    setTheme,
    selectedPlatform,
    setDJPlatform,
    detectionMode,
    setDetectionMode,
    resetDemo
  } = useApp();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
          Configure interface appearance, DJ connectivity parameters, and metadata transmission policies.
        </p>
      </div>

      {/* 1. General Preferences */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-brand-border/60 dark:border-app-border/60 pb-3">
          <Settings className="w-4 h-4 text-brand-forest dark:text-app-accent" />
          <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
            General Preferences
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          {/* Theme selector */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-semibold text-brand-charcoal dark:text-app-text">
                Application Theme
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                Choose between dark studio console appearance and warm ivory mode.
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-brand-stone/40 dark:bg-app-elevated border border-brand-border dark:border-app-border">
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  theme === 'light'
                    ? 'bg-brand-surface text-brand-charcoal shadow-sm'
                    : 'text-brand-muted'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  theme === 'dark'
                    ? 'bg-app-bg text-[#F5F4EF] shadow-sm'
                    : 'text-app-muted'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Startup toggles */}
          <div className="flex items-center justify-between py-2 border-t border-brand-border/40 dark:border-app-border/40">
            <div>
              <div className="font-semibold text-brand-charcoal dark:text-app-text">
                Launch Application at System Startup
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                Run background listener automatically when host machine boots.
              </div>
            </div>
            <input
              type="checkbox"
              checked={preferences.launchAtStartup}
              onChange={(e) => updatePreferences({ launchAtStartup: e.target.checked })}
              className="w-4 h-4 rounded text-brand-forest focus:ring-brand-sage accent-brand-forest"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-brand-border/40 dark:border-app-border/40">
            <div>
              <div className="font-semibold text-brand-charcoal dark:text-app-text">
                Start with Last Connected DJ Source
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                Automatically initialize IPC loopback with {DJ_PLATFORMS[selectedPlatform]?.name}.
              </div>
            </div>
            <input
              type="checkbox"
              checked={preferences.startWithLastDJSource}
              onChange={(e) => updatePreferences({ startWithLastDJSource: e.target.checked })}
              className="w-4 h-4 rounded text-brand-forest focus:ring-brand-sage accent-brand-forest"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-brand-border/40 dark:border-app-border/40">
            <div>
              <div className="font-semibold text-brand-charcoal dark:text-app-text">
                Show Desktop Toast Notifications
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                Display unobtrusive toasts on track change and transmission success.
              </div>
            </div>
            <input
              type="checkbox"
              checked={preferences.showDesktopNotifications}
              onChange={(e) => updatePreferences({ showDesktopNotifications: e.target.checked })}
              className="w-4 h-4 rounded text-brand-forest focus:ring-brand-sage accent-brand-forest"
            />
          </div>
        </div>
      </div>

      {/* 2. DJ Connection & Reconnection Settings */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-brand-border/60 dark:border-app-border/60 pb-3">
          <Radio className="w-4 h-4 text-brand-forest dark:text-app-accent" />
          <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
            DJ Connection & Recovery Policies
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-brand-charcoal dark:text-app-text mb-1">
              Active DJ Software Adapter
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setDJPlatform(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-brand-stone/30 dark:bg-app-bg border border-brand-border dark:border-app-border text-brand-charcoal dark:text-app-text outline-none"
            >
              <option value="virtualdj">VirtualDJ (Beta Foundation)</option>
              <option value="serato">Serato DJ Pro (Feasibility Evaluation)</option>
              <option value="rekordbox">rekordbox (Feasibility Evaluation)</option>
              <option value="enginedj">Engine DJ (Feasibility Evaluation)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-brand-charcoal dark:text-app-text mb-1">
              Detection Pipeline Mode
            </label>
            <select
              value={detectionMode}
              onChange={(e) => setDetectionMode(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-brand-stone/30 dark:bg-app-bg border border-brand-border dark:border-app-border text-brand-charcoal dark:text-app-text outline-none"
            >
              <option value="event-state">Target Playback-State (~1.8s Target)</option>
              <option value="history-file">History-File Polling (~45s Beta Delay)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-brand-charcoal dark:text-app-text mb-1">
              Reconnection Attempts
            </label>
            <select
              value={preferences.reconnectAttempts}
              onChange={(e) => updatePreferences({ reconnectAttempts: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg bg-brand-stone/30 dark:bg-app-bg border border-brand-border dark:border-app-border text-brand-charcoal dark:text-app-text outline-none"
            >
              <option value={3}>3 Attempts</option>
              <option value={5}>5 Attempts (Recommended for Venues)</option>
              <option value={10}>10 Attempts</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-brand-charcoal dark:text-app-text mb-1">
              Backoff Reconnection Interval
            </label>
            <select
              value={preferences.reconnectIntervalSec}
              onChange={(e) => updatePreferences({ reconnectIntervalSec: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg bg-brand-stone/30 dark:bg-app-bg border border-brand-border dark:border-app-border text-brand-charcoal dark:text-app-text outline-none"
            >
              <option value={2}>2 Seconds</option>
              <option value={3}>3 Seconds</option>
              <option value={5}>5 Seconds</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Metadata Fields Configuration */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-brand-border/60 dark:border-app-border/60 pb-3">
          <Sliders className="w-4 h-4 text-brand-forest dark:text-app-accent" />
          <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
            Metadata Fields & Duplicate Prevention
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="font-medium text-brand-charcoal dark:text-app-text">Track Title</span>
            <input
              type="checkbox"
              checked={preferences.metadataFields.title}
              onChange={(e) =>
                updatePreferences({
                  metadataFields: { ...preferences.metadataFields, title: e.target.checked }
                })
              }
              className="w-4 h-4 accent-brand-forest"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="font-medium text-brand-charcoal dark:text-app-text">Artist Name</span>
            <input
              type="checkbox"
              checked={preferences.metadataFields.artist}
              onChange={(e) =>
                updatePreferences({
                  metadataFields: { ...preferences.metadataFields, artist: e.target.checked }
                })
              }
              className="w-4 h-4 accent-brand-forest"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="font-medium text-brand-charcoal dark:text-app-text">Playback Status</span>
            <input
              type="checkbox"
              checked={preferences.metadataFields.playbackStatus}
              onChange={(e) =>
                updatePreferences({
                  metadataFields: { ...preferences.metadataFields, playbackStatus: e.target.checked }
                })
              }
              className="w-4 h-4 accent-brand-forest"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="font-medium text-brand-charcoal dark:text-app-text">Duplicate Debounce Memory (45s)</span>
            <input
              type="checkbox"
              checked={preferences.metadataFields.duplicatePrevention}
              onChange={(e) =>
                updatePreferences({
                  metadataFields: { ...preferences.metadataFields, duplicatePrevention: e.target.checked }
                })
              }
              className="w-4 h-4 accent-brand-forest"
            />
          </label>
        </div>
      </div>

      {/* 4. Security & Architecture Integrity (PRD Section 13 & 20) */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-brand-border/60 dark:border-app-border/60 pb-3">
          <ShieldCheck className="w-4 h-4 text-brand-forest dark:text-app-accent" />
          <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
            Security & Credential Architecture
          </h3>
        </div>

        <div className="text-xs text-brand-muted dark:text-app-muted space-y-2 leading-relaxed">
          <p>
            <strong>Authentication Status:</strong> Authenticated Demo Session (Ephemeral loopback scope).
          </p>
          <p>
            <strong>Architectural Principle:</strong> OmniBeat Universal transmits normalized song metadata only (title, artist, BPM, deck state). Audio stream contents are never recorded, uploaded, or exposed over the network.
          </p>
        </div>
      </div>

      {/* 5. About & Reset Demo */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
            OmniBeat Universal • Demo v1.0
          </div>
          <p className="text-xs text-brand-muted dark:text-app-muted mt-0.5">
            Cross-platform DJ connectivity concept for Windows & macOS.
          </p>
        </div>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-status-error/40 hover:bg-status-error/10 text-xs font-semibold text-status-error transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo to Initial State</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        title="Reset Entire Demonstration State?"
        subtitle="Restore initial playlist, diagnostics, and mock stats"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed">
            This will reset all simulated state back to default: VirtualDJ connected, "Midnight City" playing, Friday Music Bingo targeted, and 128 recorded events.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-brand-border dark:border-app-border">
            <button
              onClick={() => setConfirmResetOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetDemo();
                setConfirmResetOpen(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-status-error text-white text-xs font-semibold hover:opacity-90"
            >
              Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

