import { DJPlatformInfo } from '../types';

export const DJ_PLATFORMS: Record<string, DJPlatformInfo> = {
  virtualdj: {
    id: 'virtualdj',
    name: 'VirtualDJ',
    tagline: 'Existing Beta foundation with proposed low-latency event detection',
    status: 'existing-beta',
    statusLabel: 'Existing Beta foundation',
    badgeVariant: 'beta',
    description:
      'Extend the current VirtualDJ integration beyond delayed history-file detection by investigating authorized playback-state and real-time event mechanisms.',
    supportedModes: ['Pro Infinity / Pro Subscription', 'Direct VDJ Script / OS Hook (Evaluation)', 'History Log Parser (Current Beta)'],
    osCompatibility: ['Windows 10 / 11', 'macOS 12+ (Apple Silicon & Intel)'],
    currentMethodDescription:
      'Currently tracks playback via the VirtualDJ History.txt / database updates, which exhibit an observed delay of ~45 seconds before writing played track records.',
    investigationAreas: [
      'Evaluation of VirtualDJ VDJScript SDK query hooks (`get_loaded_song`, `is_playing`)',
      'Local TCP/UDP event bridge or IPC socket listener',
      'Minimizing detection window to 1–3s upon fader/crossfader engagement',
      'Compatibility across Windows and macOS background process contexts'
    ],
    expectedLimitations: [
      'History file is only written after track reaches threshold (often 30–45s into playback)',
      'Direct memory inspection is brittle and violates security guidelines; API/Scripting hook required',
      'User must grant local app loopback permissions on macOS'
    ],
    potentialMethods: [
      'Authorized VirtualDJ Custom Plugin / Pad Script bridge',
      'Local WebSocket / IPC event adapter listening to deck state',
      'Dual-mode fallback: Fast event listener with History-file backup'
    ],
    evaluationNote:
      'VirtualDJ provides the current production benchmark. Transitioning from history-file polling to real-time playback state is the primary engineering priority.'
  },
  serato: {
    id: 'serato',
    name: 'Serato DJ Pro',
    tagline: 'Comprehensive feasibility assessment for authorized live metadata',
    status: 'feasibility-evaluation',
    statusLabel: 'Feasibility evaluation required',
    badgeVariant: 'evaluation',
    description:
      'Evaluate available authorized interfaces, supported metadata access methods, and possible event-detection mechanisms across Serato DJ Pro environments.',
    supportedModes: ['Serato Live Playlists', 'Session File Polling (.session)', 'MIDI / Bridge Assessment'],
    osCompatibility: ['macOS 12+ (Optimized)', 'Windows 10 / 11'],
    currentMethodDescription:
      'Serato does not expose an open real-time developer API for deck playback status. Standard integrations rely on Serato Live Playlists or encrypted session files.',
    investigationAreas: [
      'Serato Live Playlists HTTP stream parsing latency and credentials',
      'Local `_Serato_/History/Sessions` binary file writing frequency and format',
      'Feasibility of companion audio fingerprinting or hardware MIDI signal tapping',
      'Security boundaries imposed by Serato’s sandboxing on macOS'
    ],
    expectedLimitations: [
      'Serato Live Playlists requires internet connectivity and has inherent publication delay (~15–30s)',
      'Session files may only flush buffer periodically or upon track ejection',
      'Proprietary hardware lock-in means deck states are mediated by official controllers'
    ],
    potentialMethods: [
      'Serato Live Playlist webhook relay',
      'Session file tail-parser with chunked binary decoder',
      'External hardware fader tap or virtual audio loopback detection'
    ],
    evaluationNote:
      'Feasibility evaluation required. A reliable 1–3 second detection mechanism in Serato requires technical validation against official Serato session writing behavior.'
  },
  rekordbox: {
    id: 'rekordbox',
    name: 'rekordbox',
    tagline: 'Investigation of Pro DJ Link and software library event streams',
    status: 'feasibility-evaluation',
    statusLabel: 'Feasibility evaluation required',
    badgeVariant: 'evaluation',
    description:
      'Investigate supported integration methods, available metadata interfaces, and the limitations of each rekordbox operating mode (Performance vs Export).',
    supportedModes: ['Performance Mode', 'Export Mode (Pro DJ Link)', 'Master Database Polling'],
    osCompatibility: ['Windows 10 / 11 (64-bit)', 'macOS 12+ (Apple Silicon & Intel)'],
    currentMethodDescription:
      'rekordbox operates in two distinct operational paradigms: Performance Mode (laptop-driven software) and Export Mode (CDJ/XDJ Pro DJ Link network).',
    investigationAreas: [
      'Pro DJ Link network packet inspection (Beat Link Trigger protocol compatibility)',
      'rekordbox 6/7 encrypted master.db access rights and live update trigger hooks',
      'Pioneer DJ Open API partner program eligibility for licensed live metadata access',
      'Latency variance between laptop playback and standalone CDJ/DJM hardware'
    ],
    expectedLimitations: [
      'rekordbox 6+ encrypts its local database with machine-tied keys, preventing arbitrary file tailing',
      'Pro DJ Link requires dedicated Ethernet switch or compatible Pioneer network hardware',
      'No public local WebSocket API in standard consumer builds'
    ],
    potentialMethods: [
      'Pro DJ Link UDP listener (for hardware CDJ/XDJ setups)',
      'Official Pioneer DJ Pioneer DJ Cloud / streaming partner API where authorized',
      'Virtual audio/MIDI deck status interceptor'
    ],
    evaluationNote:
      'Requires separate feasibility paths for standalone club hardware (Pro DJ Link) versus laptop Performance Mode software playback.'
  },
  enginedj: {
    id: 'enginedj',
    name: 'Engine DJ / Denon DJ',
    tagline: 'Hardware StageLinQ protocol and Engine OS metadata evaluation',
    status: 'feasibility-evaluation',
    statusLabel: 'Feasibility evaluation required',
    badgeVariant: 'evaluation',
    description:
      'Assess available hardware and software integration opportunities, supported metadata access, and platform-specific restrictions across the inMusic Engine ecosystem.',
    supportedModes: ['Engine OS Standalone (StageLinQ)', 'Engine DJ Desktop', 'Prime Series Hardware'],
    osCompatibility: ['Engine OS (Embedded Linux)', 'Windows 10 / 11', 'macOS 12+'],
    currentMethodDescription:
      'Engine DJ standalone units (SC6000, Prime 4) broadcast rich broadcast telemetry over the network via the proprietary StageLinQ protocol.',
    investigationAreas: [
      'StageLinQ protocol handshake and real-time deck metadata decoding (title, artist, BPM, track progress)',
      'Engine DJ Desktop software synchronization API capabilities',
      'Network discovery and zero-configuration pairing in live event venues',
      'Hardware fader broadcast reception for sub-second track engagement confirmation'
    ],
    expectedLimitations: [
      'StageLinQ is primarily active on hardware units connected via Wi-Fi or Ethernet',
      'Desktop preparation software has limited live playback broadcast features compared to hardware',
      'Firmware revisions may alter proprietary StageLinQ packet schemas'
    ],
    potentialMethods: [
      'Direct StageLinQ UDP discovery and TCP metadata subscription client',
      'Engine OS companion app bridge',
      'Local network broadcast listener'
    ],
    evaluationNote:
      'Engine OS hardware offers high technical potential for sub-second track detection via StageLinQ, but desktop-only playback requires separate evaluation.'
  }
};

