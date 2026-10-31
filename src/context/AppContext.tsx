import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  DJPlatformId,
  ConnectionState,
  DetectionMode,
  Track,
  GameSession,
  MetadataEvent,
  DiagnosticCheckItem,
  DiagnosticLog,
  ApplicationPreferences
} from '../types';
import { DJ_PLATFORMS } from '../data/platforms';
import { MOCK_PLAYLIST } from '../data/tracks';
import { MOCK_GAMES } from '../data/games';
import { INITIAL_MOCK_EVENTS } from '../data/events';
import { INITIAL_DIAGNOSTIC_CHECKS, INITIAL_DIAGNOSTIC_LOGS } from '../data/diagnostics';
import { useToast } from './ToastContext';

interface AppStats {
  eventsDetected: number;
  eventsTransmitted: number;
  duplicatesPrevented: number;
  failedTransmissions: number;
  connectionDurationSec: number;
}

interface AppContextType {
  // Connection & Platform
  selectedPlatform: DJPlatformId;
  connectionStatus: ConnectionState;
  detectionStatus: 'detecting' | 'paused' | 'idle';
  detectionMode: DetectionMode;
  isConnecting: boolean;
  connectionStep: string;
  setDJPlatform: (platform: DJPlatformId) => void;
  connectDJ: (mode?: DetectionMode) => Promise<void>;
  disconnectDJ: () => void;
  setDetectionStatus: (status: 'detecting' | 'paused' | 'idle') => void;
  setDetectionMode: (mode: DetectionMode) => void;

  // Track & Playback
  currentTrack: Track;
  playlist: Track[];
  changeTrack: (track: Track) => void;
  simulateTrackChange: () => void;
  simulateRapidTrackChange: () => Promise<void>;
  isProcessingTrack: boolean;
  lastDetectionLatencyMs: number;

  // Games & OmniDrop
  games: GameSession[];
  activeGame: GameSession | null;
  selectGame: (gameId: string) => boolean;
  manualOverrideEnabled: boolean;
  toggleManualOverride: () => void;

  // Event Pipeline History
  eventHistory: MetadataEvent[];
  stats: AppStats;
  clearActivity: () => void;
  selectedEventForModal: MetadataEvent | null;
  setSelectedEventForModal: (event: MetadataEvent | null) => void;

  // Diagnostics
  diagnosticChecks: DiagnosticCheckItem[];
  diagnosticLogs: DiagnosticLog[];
  networkStatus: 'connected' | 'interrupted' | 'reconnecting';
  isRunningDiagnostics: boolean;
  runDiagnosticTest: () => Promise<void>;
  simulateNetworkInterruption: () => Promise<void>;
  clearDiagnosticLogs: () => void;

  // Global settings & preferences
  preferences: ApplicationPreferences;
  updatePreferences: (partial: Partial<ApplicationPreferences>) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  resetDemo: () => void;
  applyScenario: (scenario: 'normal' | 'interruption' | 'duplicate') => void;

  // Tour & Modals
  isTourOpen: boolean;
  setIsTourOpen: (open: boolean) => void;
}

const LOCAL_STORAGE_KEY = 'omnibeat_universal_state_v1';

const defaultPreferences: ApplicationPreferences = {
  theme: 'dark',
  launchAtStartup: true,
  startWithLastDJSource: true,
  showDesktopNotifications: true,
  autoReconnect: true,
  reconnectAttempts: 5,
  reconnectIntervalSec: 3,
  metadataFields: {
    title: true,
    artist: true,
    playbackStatus: true,
    sourceId: true,
    duplicatePrevention: true
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();

  // Load initial preferences
  const [preferences, setPreferences] = useState<ApplicationPreferences>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_prefs');
      return saved ? JSON.parse(saved) : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  const [theme, setThemeState] = useState<'dark' | 'light'>(preferences.theme);

  // Core Connection States
  const [selectedPlatform, setSelectedPlatform] = useState<DJPlatformId>('virtualdj');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>('connected');
  const [detectionStatus, setDetectionStatus] = useState<'detecting' | 'paused' | 'idle'>('detecting');
  const [detectionMode, setDetectionMode] = useState<DetectionMode>('event-state');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState('');

  // Track & Pipeline States
  const [playlist] = useState<Track[]>(MOCK_PLAYLIST);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_PLAYLIST[0]);
  const [isProcessingTrack, setIsProcessingTrack] = useState(false);
  const [lastDetectionLatencyMs, setLastDetectionLatencyMs] = useState(1840);

  // Games & OmniDrop
  const [games, setGames] = useState<GameSession[]>(MOCK_GAMES);
  const [activeGame, setActiveGame] = useState<GameSession | null>(MOCK_GAMES[0]);
  const [manualOverrideEnabled, setManualOverrideEnabled] = useState(false);

  // History & Stats
  const [eventHistory, setEventHistory] = useState<MetadataEvent[]>(INITIAL_MOCK_EVENTS);
  const [selectedEventForModal, setSelectedEventForModal] = useState<MetadataEvent | null>(null);
  const [stats, setStats] = useState<AppStats>({
    eventsDetected: 128,
    eventsTransmitted: 126,
    duplicatesPrevented: 2,
    failedTransmissions: 0,
    connectionDurationSec: 1458 // 24m 18s initial duration
  });

  // Diagnostics & Network
  const [diagnosticChecks, setDiagnosticChecks] = useState<DiagnosticCheckItem[]>(INITIAL_DIAGNOSTIC_CHECKS);
  const [diagnosticLogs, setDiagnosticLogs] = useState<DiagnosticLog[]>(INITIAL_DIAGNOSTIC_LOGS);
  const [networkStatus, setNetworkStatus] = useState<'connected' | 'interrupted' | 'reconnecting'>('connected');
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  // Product Tour
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Track recent events memory for duplicate detection debounce (track title + artist within 45s)
  const recentTracksCache = useRef<{ key: string; timestamp: number }[]>([
    { key: 'Midnight City-M83', timestamp: Date.now() }
  ]);

  // Connection duration incrementer
  useEffect(() => {
    const timer = setInterval(() => {
      if (connectionStatus === 'connected' && networkStatus === 'connected') {
        setStats((prev) => ({
          ...prev,
          connectionDurationSec: prev.connectionDurationSec + 1
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [connectionStatus, networkStatus]);

  // Save prefs
  const updatePreferences = useCallback((partial: Partial<ApplicationPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY + '_prefs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  const setTheme = useCallback(
    (newTheme: 'dark' | 'light') => {
      setThemeState(newTheme);
      updatePreferences({ theme: newTheme });
    },
    [updatePreferences]
  );

  // Set DJ Platform
  const setDJPlatform = useCallback((platform: DJPlatformId) => {
    setSelectedPlatform(platform);
  }, []);

  // Connect DJ software with simulated staged handshake
  const connectDJ = useCallback(
    async (mode: DetectionMode = 'event-state') => {
      setIsConnecting(true);
      setConnectionStep('Initializing interface bridge...');
      setConnectionStatus('connecting');

      await new Promise((r) => setTimeout(r, 450));
      setConnectionStep(`Checking ${DJ_PLATFORMS[selectedPlatform]?.name} process...`);

      await new Promise((r) => setTimeout(r, 550));
      setConnectionStep('Establishing loopback IPC socket & security handshake...');

      await new Promise((r) => setTimeout(r, 600));
      setConnectionStep('Syncing playback state with OmniDrop gateway...');

      await new Promise((r) => setTimeout(r, 450));
      setIsConnecting(false);
      setConnectionStep('');
      setConnectionStatus('connected');
      setDetectionStatus('detecting');
      setDetectionMode(mode);

      // Add diagnostic log
      setDiagnosticLogs((prev) => [
        {
          id: 'log_' + Date.now(),
          timestamp: new Date().toLocaleTimeString('en-GB'),
          level: 'success',
          subsystem: 'CONNECT',
          message: `${DJ_PLATFORMS[selectedPlatform]?.name} connected successfully (${mode === 'event-state' ? 'Event/State' : 'History-File'} mode).`
        },
        ...prev
      ]);

      addToast(`${DJ_PLATFORMS[selectedPlatform]?.name} connected successfully`, 'success');
    },
    [selectedPlatform, addToast]
  );

  // Disconnect DJ
  const disconnectDJ = useCallback(() => {
    setConnectionStatus('disconnected');
    setDetectionStatus('idle');
    setDiagnosticLogs((prev) => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('en-GB'),
        level: 'warn',
        subsystem: 'CONNECT',
        message: `${DJ_PLATFORMS[selectedPlatform]?.name} connection terminated by user.`
      },
      ...prev
    ]);
    addToast(`${DJ_PLATFORMS[selectedPlatform]?.name} disconnected`, 'info');
  }, [selectedPlatform, addToast]);

  // Core event generation pipeline
  const processTrackPlaybackEvent = useCallback(
    (track: Track, forceDuplicate: boolean = false) => {
      const now = Date.now();
      const dateStr = new Date().toISOString();
      const timeFormatted = new Date().toLocaleTimeString('en-GB');
      const trackKey = `${track.title}-${track.artist}`;

      // Check duplicates (within 45s debounce window)
      const lastPlayedIndex = recentTracksCache.current.findIndex(
        (item) => item.key === trackKey && now - item.timestamp < 45000
      );
      const isDuplicate = forceDuplicate || (lastPlayedIndex !== -1 && preferences.metadataFields.duplicatePrevention);

      const nextEventNumber = stats.eventsDetected + 1;
      const eventId = `OB-2026-${String(nextEventNumber).padStart(6, '0')}`;

      // Calculate latency based on mode
      const latency = detectionMode === 'event-state' ? Math.floor(1600 + Math.random() * 350) : 44800; // ~1.8s vs ~45s
      setLastDetectionLatencyMs(latency);

      // Determine delivery status
      let deliveryStatus: MetadataEvent['deliveryStatus'] = 'delivered';
      if (isDuplicate) {
        deliveryStatus = 'duplicate_prevented';
      } else if (manualOverrideEnabled) {
        deliveryStatus = 'pending'; // In manual override, automatic event stays pending/suppressed
      } else if (connectionStatus !== 'connected' || networkStatus !== 'connected' || !activeGame) {
        deliveryStatus = 'failed';
      }

      const newEvent: MetadataEvent = {
        id: eventId,
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        source: DJ_PLATFORMS[selectedPlatform]?.name || 'VirtualDJ',
        targetGame: activeGame?.sessionId || 'None',
        timestamp: dateStr,
        timestampFormatted: timeFormatted,
        deliveryStatus,
        latencyMs: latency,
        detectionMode,
        duplicateChecked: true,
        isDuplicate,
        rawPayload: {
          eventId,
          eventType: isDuplicate ? 'track.cue_retrigger' : 'track.changed',
          source: DJ_PLATFORMS[selectedPlatform]?.name || 'VirtualDJ',
          timestamp: dateStr,
          track: {
            title: track.title,
            artist: track.artist,
            duration: track.duration,
            bpm: track.bpm,
            key: track.key
          },
          playbackStatus: isDuplicate ? 'cue_seek' : 'playing',
          targetGame: activeGame?.sessionId || 'None',
          gateway: 'OmniDrop Gateway v2.4.1',
          retryCount: 0,
          duplicateCheckResult: isDuplicate
            ? 'Suppressed: Track signature matched active debounce memory (<45s)'
            : 'Passed (Unique track signature)'
        }
      };

      // Update recent track memory if not duplicate
      if (!isDuplicate) {
        recentTracksCache.current = [
          { key: trackKey, timestamp: now },
          ...recentTracksCache.current.filter((item) => now - item.timestamp < 60000)
        ];
      }

      // Update current track
      setCurrentTrack({ ...track, playbackStatus: 'playing' });

      // Update event history
      setEventHistory((prev) => [newEvent, ...prev].slice(0, 100));

      // Update counters
      setStats((prev) => ({
        ...prev,
        eventsDetected: prev.eventsDetected + 1,
        eventsTransmitted: deliveryStatus === 'delivered' ? prev.eventsTransmitted + 1 : prev.eventsTransmitted,
        duplicatesPrevented: isDuplicate ? prev.duplicatesPrevented + 1 : prev.duplicatesPrevented,
        failedTransmissions: deliveryStatus === 'failed' ? prev.failedTransmissions + 1 : prev.failedTransmissions
      }));

      // Diagnostic log entry
      if (isDuplicate) {
        setDiagnosticLogs((prev) => [
          {
            id: 'log_' + Date.now(),
            timestamp: timeFormatted,
            level: 'warn',
            subsystem: 'PIPELINE',
            message: `Duplicate track event suppressed: "${track.title}" by ${track.artist}`
          },
          ...prev
        ]);
        addToast(`Duplicate event prevented: "${track.title}"`, 'warn');
      } else if (manualOverrideEnabled) {
        setDiagnosticLogs((prev) => [
          {
            id: 'log_' + Date.now(),
            timestamp: timeFormatted,
            level: 'info',
            subsystem: 'OMNIDROP',
            message: `Manual Override active: Event ${eventId} paused from auto-delivery.`
          },
          ...prev
        ]);
        addToast(`Track detected (${track.title}), auto-delivery held (Manual Override ON)`, 'info');
      } else if (deliveryStatus === 'delivered') {
        setDiagnosticLogs((prev) => [
          {
            id: 'log_' + Date.now(),
            timestamp: timeFormatted,
            level: 'success',
            subsystem: 'GATEWAY',
            message: `Event ${eventId} delivered to OmniDrop session ${activeGame?.sessionId} (${(latency / 1000).toFixed(1)}s)`
          },
          ...prev
        ]);
        addToast(`Metadata delivered to ${activeGame?.title || 'game'}: "${track.title}"`, 'success');
      }
    },
    [
      stats.eventsDetected,
      detectionMode,
      preferences.metadataFields.duplicatePrevention,
      manualOverrideEnabled,
      connectionStatus,
      networkStatus,
      activeGame,
      selectedPlatform,
      addToast
    ]
  );

  // Manual or UI trigger track change
  const changeTrack = useCallback(
    (track: Track) => {
      setIsProcessingTrack(true);
      processTrackPlaybackEvent(track);
      setTimeout(() => {
        setIsProcessingTrack(false);
      }, 500);
    },
    [processTrackPlaybackEvent]
  );

  // Cycle next track from playlist
  const simulateTrackChange = useCallback(() => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    changeTrack(playlist[nextIndex]);
  }, [playlist, currentTrack, changeTrack]);

  // Rapid track change test (3 successive changes, demonstrating queuing and duplicate prevention)
  const simulateRapidTrackChange = useCallback(async () => {
    setIsProcessingTrack(true);
    addToast('Simulating rapid live DJ track changes...', 'info');

    // 1st change
    const t1 = playlist[3]; // Feel Good Inc.
    processTrackPlaybackEvent(t1);

    await new Promise((r) => setTimeout(r, 650));

    // 2nd change (immediate cue seek back to the same track to trigger duplicate protection!)
    processTrackPlaybackEvent(t1, true);

    await new Promise((r) => setTimeout(r, 650));

    // 3rd change to distinct track
    const t2 = playlist[6]; // Get Lucky
    processTrackPlaybackEvent(t2);

    setIsProcessingTrack(false);
  }, [playlist, processTrackPlaybackEvent, addToast]);

  // Select game
  const selectGame = useCallback(
    (gameId: string) => {
      const selected = games.find((g) => g.id === gameId);
      if (!selected) return false;

      if (selected.status === 'scheduled') {
        addToast(`Cannot deliver events to scheduled game "${selected.title}" until active.`, 'warn');
        return false;
      }

      setActiveGame(selected);
      addToast(`Active game updated: ${selected.title} (${selected.sessionId})`, 'success');
      setDiagnosticLogs((prev) => [
        {
          id: 'log_' + Date.now(),
          timestamp: new Date().toLocaleTimeString('en-GB'),
          level: 'info',
          subsystem: 'GATEWAY',
          message: `Target game switched to ${selected.title} [${selected.sessionId}]`
        },
        ...prev
      ]);
      return true;
    },
    [games, addToast]
  );

  // Toggle manual override
  const toggleManualOverride = useCallback(() => {
    setManualOverrideEnabled((prev) => {
      const next = !prev;
      if (next) {
        addToast('OmniDrop Manual Override ENABLED. DJ automation paused.', 'warn');
      } else {
        addToast('OmniDrop Manual Override DISABLED. Automated delivery active.', 'info');
      }
      setDiagnosticLogs((logs) => [
        {
          id: 'log_' + Date.now(),
          timestamp: new Date().toLocaleTimeString('en-GB'),
          level: next ? 'warn' : 'info',
          subsystem: 'OVERRIDE',
          message: `Manual Override ${next ? 'activated by DJ operator' : 'deactivated, automated delivery resumed'}.`
        },
        ...logs
      ]);
      return next;
    });
  }, [addToast]);

  // Clear activity
  const clearActivity = useCallback(() => {
    setEventHistory([]);
    addToast('Demonstration activity history cleared.', 'info');
  }, [addToast]);

  // Diagnostic Test Runner (animates sequentially through all 8 checks)
  const runDiagnosticTest = useCallback(async () => {
    setIsRunningDiagnostics(true);
    addToast('Starting system diagnostic self-test...', 'info');

    // Set all to checking
    setDiagnosticChecks((prev) =>
      prev.map((c) => ({
        ...c,
        status: 'checking' as const
      }))
    );

    for (let i = 0; i < INITIAL_DIAGNOSTIC_CHECKS.length; i++) {
      await new Promise((r) => setTimeout(r, 380));
      setDiagnosticChecks((prev) =>
        prev.map((item, index) => {
          if (index === i) {
            return {
              ...item,
              status: 'passed',
              lastChecked: 'Just now'
            };
          }
          return item;
        })
      );
    }

    setIsRunningDiagnostics(false);
    addToast('All 8 diagnostic checks passed successfully.', 'success');
    setDiagnosticLogs((prev) => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('en-GB'),
        level: 'success',
        subsystem: 'DIAGNOSTIC',
        message: 'System self-test completed: All 8 subsystems operational.'
      },
      ...prev
    ]);
  }, [addToast]);

  // Network Interruption & Auto-Recovery Simulator
  const simulateNetworkInterruption = useCallback(async () => {
    addToast('Simulating live venue network drop...', 'error');
    setNetworkStatus('interrupted');
    setDiagnosticChecks((prev) =>
      prev.map((c) => (c.category === 'network' ? { ...c, status: 'failed', details: 'Socket lost. Reconnection queued.' } : c))
    );

    setDiagnosticLogs((prev) => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('en-GB'),
        level: 'error',
        subsystem: 'NETWORK',
        message: 'Network socket closed unexpectedly (TCP RST received from venue router).'
      },
      ...prev
    ]);

    // Reconnection attempt after 2s
    await new Promise((r) => setTimeout(r, 2000));
    setNetworkStatus('reconnecting');
    addToast('Auto-reconnecting to OmniDrop gateway (Attempt 1/5)...', 'warn');

    setDiagnosticLogs((prev) => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('en-GB'),
        level: 'warn',
        subsystem: 'RECOVERY',
        message: 'Initiating backoff reconnection handshake to OmniBeat ingestion gateway...'
      },
      ...prev
    ]);

    // Restored after 2.2s
    await new Promise((r) => setTimeout(r, 2200));
    setNetworkStatus('connected');
    setDiagnosticChecks((prev) =>
      prev.map((c) =>
        c.category === 'network'
          ? { ...c, status: 'passed', details: 'TLS handshake renewed. Latency 34ms.', lastChecked: 'Just now' }
          : c
      )
    );

    setDiagnosticLogs((prev) => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('en-GB'),
        level: 'success',
        subsystem: 'RECOVERY',
        message: 'Connection restored. Queue reconciled (0 dropped packets).'
      },
      ...prev
    ]);
    addToast('Connection restored! Event queue reconciled.', 'success');
  }, [addToast]);

  const clearDiagnosticLogs = useCallback(() => {
    setDiagnosticLogs([]);
    addToast('Diagnostic logs cleared.', 'info');
  }, [addToast]);

  // Reset Demo to initial pristine state
  const resetDemo = useCallback(() => {
    setSelectedPlatform('virtualdj');
    setConnectionStatus('connected');
    setDetectionStatus('detecting');
    setDetectionMode('event-state');
    setCurrentTrack(MOCK_PLAYLIST[0]);
    setActiveGame(MOCK_GAMES[0]);
    setManualOverrideEnabled(false);
    setEventHistory(INITIAL_MOCK_EVENTS);
    setStats({
      eventsDetected: 128,
      eventsTransmitted: 126,
      duplicatesPrevented: 2,
      failedTransmissions: 0,
      connectionDurationSec: 1458
    });
    setDiagnosticChecks(INITIAL_DIAGNOSTIC_CHECKS);
    setDiagnosticLogs(INITIAL_DIAGNOSTIC_LOGS);
    setNetworkStatus('connected');
    setPreferences(defaultPreferences);
    setThemeState('dark');
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY + '_prefs');
    } catch {}
    addToast('OmniBeat demonstration reset to initial state.', 'info');
  }, [addToast]);

  // Apply predefined scenarios (PRD Section 21)
  const applyScenario = useCallback(
    (scenario: 'normal' | 'interruption' | 'duplicate') => {
      if (scenario === 'normal') {
        setSelectedPlatform('virtualdj');
        setConnectionStatus('connected');
        setNetworkStatus('connected');
        setManualOverrideEnabled(false);
        setActiveGame(MOCK_GAMES[0]);
        addToast('Scenario 1 loaded: Normal Live Event Operation', 'success');
      } else if (scenario === 'interruption') {
        simulateNetworkInterruption();
      } else if (scenario === 'duplicate') {
        simulateRapidTrackChange();
      }
    },
    [simulateNetworkInterruption, simulateRapidTrackChange, addToast]
  );

  return (
    <AppContext.Provider
      value={{
        selectedPlatform,
        connectionStatus,
        detectionStatus,
        detectionMode,
        isConnecting,
        connectionStep,
        setDJPlatform,
        connectDJ,
        disconnectDJ,
        setDetectionStatus,
        setDetectionMode,

        currentTrack,
        playlist,
        changeTrack,
        simulateTrackChange,
        simulateRapidTrackChange,
        isProcessingTrack,
        lastDetectionLatencyMs,

        games,
        activeGame,
        selectGame,
        manualOverrideEnabled,
        toggleManualOverride,

        eventHistory,
        stats,
        clearActivity,
        selectedEventForModal,
        setSelectedEventForModal,

        diagnosticChecks,
        diagnosticLogs,
        networkStatus,
        isRunningDiagnostics,
        runDiagnosticTest,
        simulateNetworkInterruption,
        clearDiagnosticLogs,

        preferences,
        updatePreferences,
        theme,
        setTheme,
        resetDemo,
        applyScenario,

        isTourOpen,
        setIsTourOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

