import { DiagnosticCheckItem, DiagnosticLog } from '../types';

export const INITIAL_DIAGNOSTIC_CHECKS: DiagnosticCheckItem[] = [
  {
    id: 'chk-01',
    name: 'DJ Source Availability',
    category: 'source',
    status: 'passed',
    description: 'Verifies active process communication and local IPC bridge status with selected DJ software.',
    details: 'VirtualDJ process confirmed (PID 14208). IPC socket loopback latency < 2ms. Ready for playback events.',
    lastChecked: 'Just now'
  },
  {
    id: 'chk-02',
    name: 'Metadata Access Protocol',
    category: 'source',
    status: 'passed',
    description: 'Ensures track title, artist name, BPM, duration, and key can be read without buffer blocking.',
    details: 'Deck 1 and Deck 2 metadata descriptors parsed successfully. Character encoding UTF-8 verified.',
    lastChecked: 'Just now'
  },
  {
    id: 'chk-03',
    name: 'Event Processing Pipeline',
    category: 'metadata',
    status: 'passed',
    description: 'Normalizes raw DJ events into standard OmniBeat JSON schema format.',
    details: 'Normalization latency measured at 0.4ms. Event structure conforms to v2.4 specification.',
    lastChecked: '1 min ago'
  },
  {
    id: 'chk-04',
    name: 'Network Availability & Gateway',
    category: 'network',
    status: 'passed',
    description: 'Monitors live TLS connection to OmniBeat API and OmniDrop ingestion endpoints.',
    details: 'Simulated endpoint ping: 32ms. HTTP/2 multiplexing active. Zero socket drops in current session.',
    lastChecked: 'Just now'
  },
  {
    id: 'chk-05',
    name: 'Authentication Session',
    category: 'gateway',
    status: 'passed',
    description: 'Validates ephemeral DJ event access token and secure payload signature.',
    details: 'Session token valid (Expires in 5h 32m). Scope: `events:write`, `games:read`. Demo mock session.',
    lastChecked: '2 mins ago'
  },
  {
    id: 'chk-06',
    name: 'Active Game Selection',
    category: 'gateway',
    status: 'passed',
    description: 'Verifies that a valid, active Omni-Bingo game session is targeted.',
    details: 'Connected to Friday Music Bingo (FB-2026-014). Status: Active. 42 verified live players connected.',
    lastChecked: 'Just now'
  },
  {
    id: 'chk-07',
    name: 'Event Delivery Handshake',
    category: 'gateway',
    status: 'passed',
    description: 'Checks OmniDrop acknowledgement receipt and round-trip event delivery confirmation.',
    details: 'Ack latency avg 48ms. Delivery success rate: 100% of non-duplicate events.',
    lastChecked: '3 mins ago'
  },
  {
    id: 'chk-08',
    name: 'Duplicate Event Prevention',
    category: 'metadata',
    status: 'passed',
    description: 'Maintains rolling 45-second debounce memory to suppress cue scratching or re-triggers.',
    details: 'Sliding window active (45,000ms TTL). 2 duplicate events successfully intercepted in current session.',
    lastChecked: 'Just now'
  }
];

export const INITIAL_DIAGNOSTIC_LOGS: DiagnosticLog[] = [
  {
    id: 'log-01',
    timestamp: '19:42:12',
    level: 'success',
    subsystem: 'GATEWAY',
    message: 'Event OB-2026-000128 delivered to OmniDrop session FB-2026-014 (Ack 38ms).'
  },
  {
    id: 'log-02',
    timestamp: '19:42:10',
    level: 'info',
    subsystem: 'DETECTION',
    message: 'Deck 1 song change detected: "Midnight City" — M83 via VirtualDJ IPC bridge.'
  },
  {
    id: 'log-03',
    timestamp: '19:38:52',
    level: 'warn',
    subsystem: 'PIPELINE',
    message: 'Duplicate event suppressed: "Blinding Lights" re-triggered within debounce window.'
  },
  {
    id: 'log-04',
    timestamp: '19:38:44',
    level: 'success',
    subsystem: 'GATEWAY',
    message: 'Event OB-2026-000127 delivered to OmniDrop session FB-2026-014 (Ack 42ms).'
  },
  {
    id: 'log-05',
    timestamp: '19:24:00',
    level: 'info',
    subsystem: 'CORE',
    message: 'OmniBeat Universal connection agent initialized. Source: VirtualDJ (Beta adapter).'
  }
];

