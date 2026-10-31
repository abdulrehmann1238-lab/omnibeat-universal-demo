import { MetadataEvent } from '../types';

export const INITIAL_MOCK_EVENTS: MetadataEvent[] = [
  {
    id: 'OB-2026-000128',
    trackId: 'trk-001',
    title: 'Midnight City',
    artist: 'M83',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:42:10Z',
    timestampFormatted: '19:42:10',
    deliveryStatus: 'delivered',
    latencyMs: 1840,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: false,
    rawPayload: {
      eventId: 'OB-2026-000128',
      eventType: 'track.changed',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:42:10.421Z',
      track: {
        title: 'Midnight City',
        artist: 'M83',
        duration: '4:03',
        bpm: 105,
        key: 'B minor'
      },
      playbackStatus: 'playing',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Passed (Unique track signature)'
    }
  },
  {
    id: 'OB-2026-000127',
    trackId: 'trk-002',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:38:44Z',
    timestampFormatted: '19:38:44',
    deliveryStatus: 'delivered',
    latencyMs: 1720,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: false,
    rawPayload: {
      eventId: 'OB-2026-000127',
      eventType: 'track.changed',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:38:44.112Z',
      track: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        duration: '3:20',
        bpm: 171,
        key: 'F# minor'
      },
      playbackStatus: 'playing',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Passed (Unique track signature)'
    }
  },
  {
    id: 'OB-2026-000126',
    trackId: 'trk-002-dup',
    title: 'Blinding Lights (Deck Cue Re-trigger)',
    artist: 'The Weeknd',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:38:52Z',
    timestampFormatted: '19:38:52',
    deliveryStatus: 'duplicate_prevented',
    latencyMs: 310,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: true,
    rawPayload: {
      eventId: 'OB-2026-000126',
      eventType: 'track.cue_retrigger',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:38:52.880Z',
      track: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        duration: '3:20'
      },
      playbackStatus: 'cue_seek',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Suppressed: Track ID matched within 45s debounce window'
    }
  },
  {
    id: 'OB-2026-000125',
    trackId: 'trk-003',
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:34:12Z',
    timestampFormatted: '19:34:12',
    deliveryStatus: 'delivered',
    latencyMs: 1950,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: false,
    rawPayload: {
      eventId: 'OB-2026-000125',
      eventType: 'track.changed',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:34:12.605Z',
      track: {
        title: 'Dreams',
        artist: 'Fleetwood Mac',
        duration: '4:17',
        bpm: 120,
        key: 'F major'
      },
      playbackStatus: 'playing',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Passed (Unique track signature)'
    }
  },
  {
    id: 'OB-2026-000124',
    trackId: 'trk-004',
    title: 'Feel Good Inc.',
    artist: 'Gorillaz',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:29:50Z',
    timestampFormatted: '19:29:50',
    deliveryStatus: 'delivered',
    latencyMs: 1880,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: false,
    rawPayload: {
      eventId: 'OB-2026-000124',
      eventType: 'track.changed',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:29:50.040Z',
      track: {
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        duration: '3:41',
        bpm: 139,
        key: 'Eb minor'
      },
      playbackStatus: 'playing',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Passed (Unique track signature)'
    }
  },
  {
    id: 'OB-2026-000123',
    trackId: 'trk-005',
    title: 'Take On Me',
    artist: 'a-ha',
    source: 'VirtualDJ',
    targetGame: 'FB-2026-014',
    timestamp: '2026-10-31T19:25:18Z',
    timestampFormatted: '19:25:18',
    deliveryStatus: 'delivered',
    latencyMs: 1690,
    detectionMode: 'event-state',
    duplicateChecked: true,
    isDuplicate: false,
    rawPayload: {
      eventId: 'OB-2026-000123',
      eventType: 'track.changed',
      source: 'VirtualDJ',
      timestamp: '2026-10-31T19:25:18.910Z',
      track: {
        title: 'Take On Me',
        artist: 'a-ha',
        duration: '3:45',
        bpm: 168,
        key: 'A major'
      },
      playbackStatus: 'playing',
      targetGame: 'FB-2026-014',
      gateway: 'OmniDrop Gateway v2.4.1',
      retryCount: 0,
      duplicateCheckResult: 'Passed (Unique track signature)'
    }
  }
];

