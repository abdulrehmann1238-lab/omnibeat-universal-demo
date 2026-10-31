import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DJ_PLATFORMS } from '../../data/platforms';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AudioVisualizer } from '../../components/common/AudioVisualizer';
import { Modal } from '../../components/common/Modal';
import {
  Radio,
  Disc3,
  Gamepad2,
  Activity,
  Layers,
  ArrowRight,
  Shuffle,
  ShieldAlert,
  Clock,
  Sparkles,
  Trash2,
  Music,
  ExternalLink,
  Power
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedPlatform,
    connectionStatus,
    currentTrack,
    activeGame,
    stats,
    eventHistory,
    disconnectDJ,
    connectDJ,
    simulateTrackChange,
    setSelectedEventForModal,
    clearActivity,
    manualOverrideEnabled,
    setIsTourOpen
  } = useApp();

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [trackDetailOpen, setTrackDetailOpen] = useState(false);
  const [gameDetailOpen, setGameDetailOpen] = useState(false);

  const platformInfo = DJ_PLATFORMS[selectedPlatform];
  const recentFiveEvents = eventHistory.slice(0, 5);

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* 7.1 Welcome Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
              Good evening, DJ.
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-stone/60 dark:bg-app-elevated text-brand-forest dark:text-app-accent border border-brand-border dark:border-app-border">
              Demo Environment
            </span>
          </div>
          <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
            Your DJ connection and Omni-Bingo activity at a glance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTourOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-semibold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Tour</span>
          </button>
        </div>
      </div>

      {/* Manual Override Banner if Active */}
      {manualOverrideEnabled && (
        <div className="p-4 rounded-xl bg-status-connecting/15 border border-status-connecting/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-status-connecting flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                OmniDrop Manual Override Active
              </div>
              <div className="text-[11px] text-brand-muted dark:text-app-muted">
                DJ automation is paused. Manual host actions have priority in the active Omni-Bingo game.
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/app/games')}
            className="text-xs font-semibold text-brand-charcoal dark:text-app-text hover:underline"
          >
            Manage Override
          </button>
        </div>
      )}

      {/* Top 3 Primary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 7.2 Main Connection Card */}
        <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-brand-muted dark:text-app-muted flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
                DJ Software Connection
              </span>
              <StatusBadge status={connectionStatus} size="sm" />
            </div>

            <div className="text-lg font-bold font-heading text-brand-charcoal dark:text-app-text mb-1">
              {platformInfo?.name || 'DJ Source'}
            </div>
            <div className="text-xs text-brand-muted dark:text-app-muted mb-4">
              {platformInfo?.statusLabel}
            </div>

            <div className="space-y-2 text-xs font-mono bg-brand-stone/30 dark:bg-app-bg p-3 rounded-lg border border-brand-border/60 dark:border-app-border/60">
              <div className="flex items-center justify-between">
                <span className="text-brand-muted dark:text-app-muted">Duration:</span>
                <span className="font-semibold text-brand-charcoal dark:text-app-text">
                  {connectionStatus === 'connected' ? formatDuration(stats.connectionDurationSec) : '00:00:00'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted dark:text-app-muted">Last Sync:</span>
                <span className="font-semibold text-brand-forest dark:text-app-accent">
                  {connectionStatus === 'connected' ? 'Just now (IPC Live)' : 'Paused'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-brand-border/60 dark:border-app-border/60">
            <button
              onClick={() => navigate('/app/connect')}
              className="flex-1 py-2 px-3 rounded-lg bg-brand-stone/40 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-elevatedHover text-xs font-semibold text-brand-charcoal dark:text-app-text transition-colors text-center"
            >
              Manage Connection
            </button>
            {connectionStatus === 'connected' ? (
              <button
                onClick={disconnectDJ}
                className="py-2 px-3 rounded-lg border border-status-error/30 hover:bg-status-error/10 text-xs font-semibold text-status-error transition-colors inline-flex items-center gap-1"
                title="Disconnect DJ"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            ) : (
              <button
                onClick={() => connectDJ('event-state')}
                className="py-2 px-3 rounded-lg bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-xs font-semibold text-brand-surface dark:text-app-bg transition-colors inline-flex items-center gap-1"
                title="Reconnect DJ"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>

        {/* 7.3 Current Track Card */}
        <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-brand-muted dark:text-app-muted flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
                Currently Playing
              </span>
              <AudioVisualizer isPlaying={connectionStatus === 'connected'} bars={5} />
            </div>

            <div className="flex items-start gap-3 mb-4">
              {/* Album art placeholder */}
              <div className="w-14 h-14 rounded-lg bg-brand-stone dark:bg-app-elevated border border-brand-border dark:border-app-border flex items-center justify-center text-brand-forest dark:text-app-accent flex-shrink-0 shadow-inner">
                <Music className="w-7 h-7 opacity-80" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold font-heading text-brand-charcoal dark:text-app-text truncate">
                  {currentTrack.title}
                </div>
                <div className="text-xs text-brand-muted dark:text-app-muted font-medium truncate">
                  {currentTrack.artist}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-brand-muted dark:text-app-muted">
                  <span>{currentTrack.bpm} BPM</span>
                  <span>•</span>
                  <span>{currentTrack.key}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-brand-stone/30 dark:bg-app-bg p-2.5 rounded-lg border border-brand-border/60 dark:border-app-border/60">
              <div>
                <span className="text-brand-muted dark:text-app-muted">Source: </span>
                <span className="font-semibold text-brand-charcoal dark:text-app-text">
                  {platformInfo?.name}
                </span>
              </div>
              <div>
                <span className="text-brand-muted dark:text-app-muted">Latency: </span>
                <span className="font-semibold text-brand-forest dark:text-app-accent">1.8s</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-brand-border/60 dark:border-app-border/60">
            <button
              onClick={() => setTrackDetailOpen(true)}
              className="flex-1 py-2 px-3 rounded-lg bg-brand-stone/40 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-elevatedHover text-xs font-semibold text-brand-charcoal dark:text-app-text transition-colors text-center"
            >
              Track Details
            </button>
            <button
              onClick={simulateTrackChange}
              className="py-2 px-3 rounded-lg bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-xs font-semibold text-brand-surface dark:text-app-bg transition-colors inline-flex items-center gap-1.5 shadow-sm"
              title="Trigger simulated track change from playlist"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Change Track</span>
            </button>
          </div>
        </div>

        {/* 7.4 Active Game Card */}
        <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-brand-muted dark:text-app-muted flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
                Connected Omni-Bingo Game
              </span>
              <StatusBadge status="connected" label="Active Game" size="sm" />
            </div>

            <div className="text-lg font-bold font-heading text-brand-charcoal dark:text-app-text mb-1 truncate">
              {activeGame?.title || 'No Active Game'}
            </div>
            <div className="text-xs text-brand-muted dark:text-app-muted mb-4">
              Session: <span className="font-mono font-semibold text-brand-charcoal dark:text-app-text">{activeGame?.sessionId}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-brand-stone/30 dark:bg-app-bg p-3 rounded-lg border border-brand-border/60 dark:border-app-border/60">
              <div>
                <span className="text-brand-muted dark:text-app-muted block text-[10px]">Connected Players</span>
                <span className="font-bold text-sm text-brand-charcoal dark:text-app-text">{activeGame?.playersCount || 0}</span>
              </div>
              <div>
                <span className="text-brand-muted dark:text-app-muted block text-[10px]">Current Round</span>
                <span className="font-bold text-sm text-brand-forest dark:text-app-accent">
                  Round {activeGame?.currentRound} of {activeGame?.totalRounds}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-brand-border/60 dark:border-app-border/60">
            <button
              onClick={() => navigate('/app/games')}
              className="flex-1 py-2 px-3 rounded-lg bg-brand-stone/40 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-elevatedHover text-xs font-semibold text-brand-charcoal dark:text-app-text transition-colors text-center"
            >
              Change Game
            </button>
            <button
              onClick={() => setGameDetailOpen(true)}
              className="py-2 px-3 rounded-lg border border-brand-border dark:border-app-border text-xs font-semibold text-brand-charcoal dark:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors"
            >
              Game Details
            </button>
          </div>
        </div>
      </div>

      {/* 7.5 Metadata Transmission Metrics Card */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
              Metadata Transmission Pipeline
            </h3>
            <p className="text-xs text-brand-muted dark:text-app-muted">
              Live statistics and event delivery metrics (Sample demonstration data).
            </p>
          </div>
          <span className="text-[10px] font-mono text-brand-muted dark:text-app-muted px-2 py-0.5 rounded bg-brand-stone/40 dark:bg-app-bg border border-brand-border dark:border-app-border">
            Real-time Pipeline
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="text-xs text-brand-muted dark:text-app-muted mb-1">
              Events Detected
            </div>
            <div className="text-2xl font-bold font-mono text-brand-charcoal dark:text-app-text">
              {stats.eventsDetected}
            </div>
            <div className="text-[10px] text-brand-muted dark:text-app-muted mt-1">
              From {platformInfo?.name}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="text-xs text-brand-muted dark:text-app-muted mb-1">
              Events Transmitted
            </div>
            <div className="text-2xl font-bold font-mono text-status-connected">
              {stats.eventsTransmitted}
            </div>
            <div className="text-[10px] text-brand-muted dark:text-app-muted mt-1">
              Delivered to OmniDrop
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="text-xs text-brand-muted dark:text-app-muted mb-1">
              Duplicates Prevented
            </div>
            <div className="text-2xl font-bold font-mono text-status-connecting">
              {stats.duplicatesPrevented}
            </div>
            <div className="text-[10px] text-brand-muted dark:text-app-muted mt-1">
              Debounce window (&lt;45s)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <div className="text-xs text-brand-muted dark:text-app-muted mb-1">
              Failed Transmissions
            </div>
            <div className="text-2xl font-bold font-mono text-brand-muted dark:text-app-muted">
              {stats.failedTransmissions}
            </div>
            <div className="text-[10px] text-brand-muted dark:text-app-muted mt-1">
              0% packet drop rate
            </div>
          </div>
        </div>
      </div>

      {/* 7.6 Recent Activity Table (Latest 5 events) */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
              Recent Event Transmission Activity
            </h3>
            <p className="text-xs text-brand-muted dark:text-app-muted">
              Latest 5 normalized song events received from playback deck.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="text-xs text-brand-muted hover:text-status-error dark:text-app-muted dark:hover:text-status-error p-1.5 rounded transition-colors inline-flex items-center gap-1"
              title="Clear activity log"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Clear Activity</span>
            </button>
            <button
              onClick={() => navigate('/app/activity')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest dark:text-app-accent hover:underline"
            >
              <span>View All Activity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border/80 dark:border-app-border text-[11px] font-mono text-brand-muted dark:text-app-muted uppercase">
                <th className="py-2.5 px-3">Track</th>
                <th className="py-2.5 px-3">Artist</th>
                <th className="py-2.5 px-3">Source</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 dark:divide-app-border/50">
              {recentFiveEvents.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => setSelectedEventForModal(event)}
                  className="hover:bg-brand-sageLight/30 dark:hover:bg-app-elevated/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-brand-charcoal dark:text-app-text">
                    {event.title}
                  </td>
                  <td className="py-3 px-3 text-brand-muted dark:text-app-muted">
                    {event.artist}
                  </td>
                  <td className="py-3 px-3 text-brand-muted dark:text-app-muted font-mono text-[11px]">
                    {event.source}
                  </td>
                  <td className="py-3 px-3 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                    {event.timestampFormatted}
                  </td>
                  <td className="py-3 px-3 text-right">
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
                          ? 'Delivered'
                          : event.deliveryStatus === 'duplicate_prevented'
                          ? 'Duplicate Prevented'
                          : 'Failed'
                      }
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Clearing Activity */}
      <Modal
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear Demonstration Activity?"
        subtitle="This will reset the event transmission log"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed">
            Are you sure you want to clear the recent demonstration activity? This does not alter the
            underlying DJ connection or active Omni-Bingo game.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-brand-border dark:border-app-border">
            <button
              onClick={() => setConfirmClearOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                clearActivity();
                setConfirmClearOpen(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-status-error text-white text-xs font-semibold hover:opacity-90"
            >
              Clear Log
            </button>
          </div>
        </div>
      </Modal>

      {/* Track Details Modal */}
      <Modal
        isOpen={trackDetailOpen}
        onClose={() => setTrackDetailOpen(false)}
        title={`Track Information: ${currentTrack.title}`}
        subtitle={`Detected from ${platformInfo?.name} • Live metadata`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-brand-stone/30 dark:bg-app-bg space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Title:</span>
              <span className="font-semibold text-brand-charcoal dark:text-app-text">{currentTrack.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Artist:</span>
              <span className="font-semibold text-brand-charcoal dark:text-app-text">{currentTrack.artist}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Album:</span>
              <span className="text-brand-charcoal dark:text-app-text">{currentTrack.album || 'Single'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Duration:</span>
              <span className="text-brand-charcoal dark:text-app-text">{currentTrack.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">BPM / Key:</span>
              <span className="text-brand-charcoal dark:text-app-text">{currentTrack.bpm} BPM • {currentTrack.key}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Genre:</span>
              <span className="text-brand-charcoal dark:text-app-text">{currentTrack.genre}</span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setTrackDetailOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-brand-stone/60 dark:bg-app-elevated text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Game Details Modal */}
      <Modal
        isOpen={gameDetailOpen}
        onClose={() => setGameDetailOpen(false)}
        title={activeGame?.title || 'Game Details'}
        subtitle={`Session ID: ${activeGame?.sessionId}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-brand-stone/30 dark:bg-app-bg space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Game Type:</span>
              <span className="font-semibold text-brand-charcoal dark:text-app-text">{activeGame?.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Active Players:</span>
              <span className="font-semibold text-brand-charcoal dark:text-app-text">{activeGame?.playersCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Game Theme:</span>
              <span className="text-brand-charcoal dark:text-app-text">{activeGame?.theme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">Current Round:</span>
              <span className="text-brand-charcoal dark:text-app-text">Round {activeGame?.currentRound} / {activeGame?.totalRounds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-app-muted">OmniDrop Gateway:</span>
              <span className="text-brand-forest dark:text-app-accent font-semibold">Active Ingestion</span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setGameDetailOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-brand-stone/60 dark:bg-app-elevated text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
