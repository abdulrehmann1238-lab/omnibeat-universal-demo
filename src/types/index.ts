export type DJPlatformId = 'virtualdj' | 'serato' | 'rekordbox' | 'enginedj';

export type PlatformStatus = 'existing-beta' | 'feasibility-evaluation';

export interface DJPlatformInfo {
  id: DJPlatformId;
  name: string;
  tagline: string;
  status: PlatformStatus;
  statusLabel: string;
  description: string;
  badgeVariant: 'beta' | 'evaluation';
  supportedModes: string[];
  osCompatibility: string[];
  currentMethodDescription: string;
  investigationAreas: string[];
  expectedLimitations: string[];
  potentialMethods: string[];
  evaluationNote: string;
}

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'error';

export type DetectionMode = 'history-file' | 'event-state';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  bpm: number;
  key: string;
  coverArt?: string;
  genre: string;
  playbackStatus: 'playing' | 'paused' | 'stopped';
}

export interface GameSession {
  id: string;
  title: string;
  type: string;
  sessionId: string;
  playersCount: number;
  status: 'active' | 'scheduled' | 'ended';
  scheduledTime?: string;
  theme: string;
  currentRound: number;
  totalRounds: number;
}

export type EventDeliveryStatus = 'delivered' | 'pending' | 'duplicate_prevented' | 'failed';

export interface MetadataEvent {
  id: string;
  trackId: string;
  title: string;
  artist: string;
  source: string;
  targetGame: string;
  timestamp: string; // ISO or display time
  timestampFormatted: string;
  deliveryStatus: EventDeliveryStatus;
  latencyMs: number;
  detectionMode: DetectionMode;
  duplicateChecked: boolean;
  isDuplicate: boolean;
  rawPayload: {
    eventId: string;
    eventType: string;
    source: string;
    timestamp: string;
    track: {
      title: string;
      artist: string;
      duration: string;
      bpm?: number;
      key?: string;
    };
    playbackStatus: string;
    targetGame: string;
    gateway: string;
    retryCount: number;
    duplicateCheckResult: string;
  };
}

export interface DiagnosticCheckItem {
  id: string;
  name: string;
  category: 'source' | 'metadata' | 'network' | 'gateway';
  status: 'passed' | 'warning' | 'failed' | 'checking';
  description: string;
  details: string;
  lastChecked: string;
}

export interface DiagnosticLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  subsystem: string;
}

export interface ApplicationPreferences {
  theme: 'dark' | 'light';
  launchAtStartup: boolean;
  startWithLastDJSource: boolean;
  showDesktopNotifications: boolean;
  autoReconnect: boolean;
  reconnectAttempts: number;
  reconnectIntervalSec: number;
  metadataFields: {
    title: boolean;
    artist: boolean;
    playbackStatus: boolean;
    sourceId: boolean;
    duplicatePrevention: boolean;
  };
}

