import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DJ_PLATFORMS } from '../../data/platforms';
import { Track } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AudioVisualizer } from '../../components/common/AudioVisualizer';
import {
  Activity,
  Play,
  Pause,
  Shuffle,
  RotateCcw,
  Clock,
  Layers,
  Radio,
  Gamepad2,
  CheckCircle2,
  Sparkles,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  Music
} from 'lucide-react';

export const LiveDetectionPage: React.FC = () => {
  const {
    currentTrack,
    playlist,
    changeTrack,
    simulateTrackChange,
    simulateRapidTrackChange,
    detectionStatus,
    setDetectionStatus,
    detectionMode,
    setDetectionMode,
    selectedPlatform,
    activeGame,
    isProcessingTrack,
    lastDetectionLatencyMs,
    stats,
    resetDemo
  } = useApp();

  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const platformInfo = DJ_PLATFORMS[selectedPlatform];

  const stages = [
    {
      id: 'stg-1',
      title: '1. Playback Initiated',
      desc: 'DJ software deck play / fader engage event',
      status: 'active',
      time: '0.0s'
    },
    {
      id: 'stg-2',
      title: '2. Track Detected',
      desc:
        detectionMode === 'event-state'
          ? 'Local loopback IPC hook read'
          : 'Waiting for History.txt file buffer update',
      status: 'active',
      time: detectionMode === 'event-state' ? '+0.4s' : '+42.5s'
    },
    {
      id: 'stg-3',
      title: '3. Metadata Normalized',
      desc: 'JSON payload structured with title, artist, BPM, deck ID',
      status: 'active',
      time: detectionMode === 'event-state' ? '+0.8s' : '+43.2s'
    },
    {
      id: 'stg-4',
      title: '4. Event Delivered',
      desc: `Transmitted to OmniDrop Gateway (${activeGame?.sessionId || 'FB-2026-014'})`,
      status: 'active',
      time: detectionMode === 'event-state' ? `+${(lastDetectionLatencyMs / 1000).toFixed(1)}s` : '+45.0s'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
            Live Track Detection
          </h1>
          <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
            Monitor simulated track changes and see how metadata moves through the OmniBeat pipeline.
          </p>
        </div>

        {/* Global Controls (9.5) */}
        <div className="flex items-center gap-2 flex-wrap">
          {detectionStatus === 'detecting' ? (
            <button
              onClick={() => setDetectionStatus('paused')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border dark:border-app-border text-xs font-semibold text-brand-charcoal dark:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Detection</span>
            </button>
          ) : (
            <button
              onClick={() => setDetectionStatus('detecting')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-status-connected text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Detection</span>
            </button>
          )}

          <button
            onClick={simulateTrackChange}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-forest hover:bg-brand-forestDark dark:bg-app-accent dark:hover:bg-app-accentHover text-brand-surface dark:text-app-bg text-xs font-bold transition-colors shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Simulate Track Change</span>
          </button>

          <button
            onClick={simulateRapidTrackChange}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-stone/50 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text text-xs font-semibold transition-colors border border-brand-border dark:border-app-border"
            title="Fire 3 successive changes to test event queue & duplicate prevention"
          >
            <Zap className="w-3.5 h-3.5 text-status-connecting" />
            <span>Rapid Change Test</span>
          </button>
        </div>
      </div>

      {/* 9.1 Main Live Track Panel */}
      <div className={`p-6 rounded-2xl bg-brand-surface dark:bg-app-secondary border transition-all duration-300 shadow-sm ${
        isProcessingTrack
          ? 'border-brand-forest dark:border-app-accent ring-2 ring-brand-forest/20'
          : 'border-brand-border dark:border-app-border'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Track metadata */}
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-20 h-20 rounded-xl bg-brand-stone dark:bg-app-elevated border border-brand-border dark:border-app-border flex items-center justify-center text-brand-forest dark:text-app-accent flex-shrink-0 shadow-inner">
              <Music className="w-10 h-10 opacity-80" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-brand-forest/10 dark:bg-app-accent/15 text-brand-forest dark:text-app-accent">
                  Now Playing on Deck 1
                </span>
                <StatusBadge
                  status={detectionStatus === 'detecting' ? 'connected' : 'connecting'}
                  label={detectionStatus === 'detecting' ? 'Monitoring' : 'Paused'}
                  size="sm"
                />
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-charcoal dark:text-app-text truncate tracking-tight">
                {currentTrack.title}
              </h2>
              <p className="text-sm font-semibold text-brand-muted dark:text-app-muted mt-0.5">
                {currentTrack.artist} {currentTrack.album && `• ${currentTrack.album}`}
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-brand-muted dark:text-app-muted">
                <span>{currentTrack.duration}</span>
                <span>•</span>
                <span>{currentTrack.bpm} BPM</span>
                <span>•</span>
                <span>{currentTrack.key}</span>
                <span>•</span>
                <span className="text-brand-forest dark:text-app-accent font-semibold">{currentTrack.genre}</span>
              </div>
            </div>
          </div>

          {/* Real-time telemetry indicators */}
          <div className="flex items-center gap-4 bg-brand-stone/30 dark:bg-app-bg p-4 rounded-xl border border-brand-border/60 dark:border-app-border/60 self-stretch lg:self-auto justify-between lg:justify-start">
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-brand-muted dark:text-app-muted">
                Detection Mode
              </div>
              <div className="text-xs font-bold text-brand-charcoal dark:text-app-text mt-0.5">
                {detectionMode === 'event-state' ? 'Event/State' : 'History-File'}
              </div>
              <div className="text-[10px] text-brand-muted dark:text-app-muted">
                {platformInfo?.name}
              </div>
            </div>

            <div className="h-8 w-px bg-brand-border dark:bg-app-border mx-2" />

            <div className="text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-brand-muted dark:text-app-muted">
                Simulated Latency
              </div>
              <div className="text-xs font-bold font-mono text-brand-forest dark:text-app-accent mt-0.5">
                {(lastDetectionLatencyMs / 1000).toFixed(2)}s
              </div>
              <div className="text-[10px] text-brand-muted dark:text-app-muted">
                {detectionMode === 'event-state' ? 'Low-latency target' : 'Beta log delay'}
              </div>
            </div>

            <div className="h-8 w-px bg-brand-border dark:bg-app-border mx-2" />

            <div className="flex flex-col items-center justify-center pl-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-muted dark:text-app-muted mb-1">
                Audio Stream
              </span>
              <AudioVisualizer isPlaying={detectionStatus === 'detecting'} bars={6} height="h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 9.2 Track Detection Timeline */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-forest dark:text-app-accent" />
            <span>End-to-End Pipeline Progression</span>
          </h3>
          <span className="text-[10px] font-mono text-brand-muted dark:text-app-muted">
            Target Game: {activeGame?.sessionId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {stages.map((stg, i) => (
            <div
              key={stg.id}
              className={`p-3.5 rounded-xl border relative transition-all ${
                isProcessingTrack
                  ? 'bg-brand-sageLight/40 dark:bg-app-elevated border-brand-sage/60 dark:border-app-accent'
                  : 'bg-brand-stone/20 dark:bg-app-bg border-brand-border/60 dark:border-app-border/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                  {stg.title}
                </span>
                <span className="text-[10px] font-mono text-brand-forest dark:text-app-accent font-semibold">
                  {stg.time}
                </span>
              </div>
              <p className="text-[11px] text-brand-muted dark:text-app-muted leading-tight">
                {stg.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 9.4 Expandable Detection Mode Comparison Drawer */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border overflow-hidden shadow-sm">
        <button
          onClick={() => setCompareDrawerOpen(!compareDrawerOpen)}
          className="w-full p-4 flex items-center justify-between hover:bg-brand-stone/20 dark:hover:bg-app-elevated transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-brand-forest dark:text-app-accent" />
            <span className="text-xs font-bold text-brand-charcoal dark:text-app-text font-heading">
              Detection Mode Comparison: History File vs. Authorized Playback-State
            </span>
          </div>
          {compareDrawerOpen ? (
            <ChevronUp className="w-4 h-4 text-brand-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-brand-muted" />
          )}
        </button>

        {compareDrawerOpen && (
          <div className="p-5 pt-0 border-t border-brand-border/60 dark:border-app-border/60 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Mode A */}
              <div className={`p-4 rounded-xl border ${
                detectionMode === 'history-file'
                  ? 'bg-brand-stone/40 dark:bg-app-elevated border-brand-charcoal dark:border-app-accent'
                  : 'bg-brand-stone/20 dark:bg-app-bg border-brand-border dark:border-app-border'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                    Mode A: History-File Polling (Current Beta)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-connecting/20 text-status-connecting font-semibold">
                    ~45s Delay
                  </span>
                </div>
                <p className="text-[11px] text-brand-muted dark:text-app-muted leading-relaxed">
                  VirtualDJ history logs are only written after a track plays for an extended threshold.
                  This reported ~45-second latency means bingo players often hear nearly half the song before
                  the card highlights the title.
                </p>
                <button
                  onClick={() => setDetectionMode('history-file')}
                  className="mt-3 text-xs font-semibold text-brand-forest dark:text-app-accent hover:underline"
                >
                  {detectionMode === 'history-file' ? '✓ Currently Active in Demo' : 'Switch Demo to Mode A'}
                </button>
              </div>

              {/* Mode B */}
              <div className={`p-4 rounded-xl border ${
                detectionMode === 'event-state'
                  ? 'bg-brand-sageLight/50 dark:bg-app-elevated border-brand-forest dark:border-app-accent'
                  : 'bg-brand-stone/20 dark:bg-app-bg border-brand-border dark:border-app-border'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-forest dark:text-app-accent">
                    Mode B: Target Playback-State & Event Hooks
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-forest/10 dark:bg-app-accent/20 text-brand-forest dark:text-app-accent font-semibold">
                    1–3s Target
                  </span>
                </div>
                <p className="text-[11px] text-brand-muted dark:text-app-muted leading-relaxed">
                  Evaluates direct playback state query hooks (`get_loaded_song`, crossfader engage, play status).
                  Metadata arrives at Omni-Bingo within 1–3 seconds of track cueing.
                  (Illustrative demo target pending technical validation).
                </p>
                <button
                  onClick={() => setDetectionMode('event-state')}
                  className="mt-3 text-xs font-semibold text-brand-forest dark:text-app-accent hover:underline"
                >
                  {detectionMode === 'event-state' ? '✓ Currently Active in Demo' : 'Switch Demo to Mode B'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-brand-muted dark:text-app-muted italic">
              Note: Values are illustrative demo comparisons. Final latency depends on authorized platform APIs and OS environment.
            </p>
          </div>
        )}
      </div>

      {/* 9.3 Simulated Playlist (Click any track to trigger pipeline!) */}
      <div className="p-5 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-charcoal dark:text-app-text">
              Simulated DJ Playlist Deck
            </h3>
            <p className="text-xs text-brand-muted dark:text-app-muted">
              Click any song below to instantly trigger the detection pipeline, test duplicate debounce, and view live metadata flow.
            </p>
          </div>
          <span className="text-xs font-mono text-brand-muted dark:text-app-muted">
            {playlist.length} Tracks Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border/80 dark:border-app-border text-[11px] font-mono text-brand-muted dark:text-app-muted uppercase">
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Artist</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">BPM</th>
                <th className="py-2.5 px-3">Key</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 dark:divide-app-border/50">
              {playlist.map((track) => {
                const isCurrent = track.id === currentTrack.id;

                return (
                  <tr
                    key={track.id}
                    onClick={() => changeTrack(track)}
                    className={`hover:bg-brand-sageLight/40 dark:hover:bg-app-elevated/60 cursor-pointer transition-colors ${
                      isCurrent ? 'bg-brand-sageLight/30 dark:bg-app-elevated/40' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      {isCurrent ? (
                        <span className="flex items-center gap-1.5 text-brand-forest dark:text-app-accent font-semibold font-mono text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-status-connected animate-ping" />
                          Playing
                        </span>
                      ) : (
                        <span className="text-brand-muted dark:text-app-muted text-[11px]">
                          Ready
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-semibold text-brand-charcoal dark:text-app-text">
                      {track.title}
                    </td>
                    <td className="py-3 px-3 text-brand-muted dark:text-app-muted">
                      {track.artist}
                    </td>
                    <td className="py-3 px-3 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {track.duration}
                    </td>
                    <td className="py-3 px-3 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {track.bpm}
                    </td>
                    <td className="py-3 px-3 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {track.key}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeTrack(track);
                        }}
                        className="px-2.5 py-1 rounded bg-brand-stone/40 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-[11px] font-semibold text-brand-charcoal dark:text-app-text transition-colors"
                      >
                        {isCurrent ? 'Re-trigger Cue' : 'Play Track'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

