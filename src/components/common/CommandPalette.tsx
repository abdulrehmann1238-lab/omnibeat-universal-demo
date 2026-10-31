import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Radio,
  Gamepad2,
  Activity,
  Wrench,
  Settings,
  Disc3,
  Wifi,
  Shuffle,
  RotateCcw
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    simulateTrackChange,
    simulateRapidTrackChange,
    runDiagnosticTest,
    simulateNetworkInterruption,
    toggleManualOverride,
    manualOverrideEnabled,
    resetDemo
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // If already open, close; if closed, open
        // Handled by parent or caller
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'dash',
      title: 'Go to Dashboard',
      subtitle: 'Overview, connection status, and current playback',
      icon: <Disc3 className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app');
        onClose();
      }
    },
    {
      id: 'connect',
      title: 'DJ Software Connections',
      subtitle: 'VirtualDJ, Serato, rekordbox, and Engine DJ status',
      icon: <Radio className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/connect');
        onClose();
      }
    },
    {
      id: 'live',
      title: 'Live Track Detection',
      subtitle: 'Inspect real-time metadata transmission & playlist simulation',
      icon: <Activity className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/live');
        onClose();
      }
    },
    {
      id: 'games',
      title: 'Connected Omni-Bingo Games',
      subtitle: 'Select active game session and toggle OmniDrop Manual Override',
      icon: <Gamepad2 className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/games');
        onClose();
      }
    },
    {
      id: 'activity',
      title: 'Event Activity Log',
      subtitle: 'Review normalized JSON payloads and delivery status',
      icon: <Activity className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/activity');
        onClose();
      }
    },
    {
      id: 'diagnostics',
      title: 'Connection Diagnostics',
      subtitle: 'Subsystem integrity checks and latency verification',
      icon: <Wrench className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/diagnostics');
        onClose();
      }
    },
    {
      id: 'settings',
      title: 'Application Settings',
      subtitle: 'Theme, reconnection policies, and demonstration reset',
      icon: <Settings className="w-4 h-4 text-brand-forest dark:text-app-accent" />,
      run: () => {
        navigate('/app/settings');
        onClose();
      }
    },
    {
      id: 'sim_change',
      title: 'Simulate Next Track Change',
      subtitle: 'Trigger playback event pipeline for next playlist item',
      icon: <Shuffle className="w-4 h-4 text-status-connected" />,
      run: () => {
        simulateTrackChange();
        onClose();
      }
    },
    {
      id: 'sim_rapid',
      title: 'Simulate Rapid Track Changes',
      subtitle: 'Trigger 3 quick changes to test queue & duplicate prevention',
      icon: <Shuffle className="w-4 h-4 text-status-connecting" />,
      run: () => {
        simulateRapidTrackChange();
        onClose();
      }
    },
    {
      id: 'sim_diag',
      title: 'Run Diagnostic Self-Test',
      subtitle: 'Execute full 8-point system integrity verification',
      icon: <Wrench className="w-4 h-4 text-status-info" />,
      run: () => {
        runDiagnosticTest();
        onClose();
      }
    },
    {
      id: 'sim_net',
      title: 'Simulate Network Interruption',
      subtitle: 'Test automatic socket drop and reconnection reconciliation',
      icon: <Wifi className="w-4 h-4 text-status-error" />,
      run: () => {
        simulateNetworkInterruption();
        onClose();
      }
    },
    {
      id: 'override',
      title: manualOverrideEnabled ? 'Disable Manual Override' : 'Enable Manual Override',
      subtitle: 'Toggle OmniDrop DJ automation bypass state',
      icon: <RotateCcw className="w-4 h-4 text-brand-muted" />,
      run: () => {
        toggleManualOverride();
        onClose();
      }
    },
    {
      id: 'reset',
      title: 'Reset Demo State',
      subtitle: 'Restore demo playlist, stats, and initial configuration',
      icon: <RotateCcw className="w-4 h-4 text-status-error" />,
      run: () => {
        resetDemo();
        onClose();
      }
    }
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-sm" onClick={onClose} />

      {/* Palette box */}
      <div className="relative w-full max-w-lg rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-2xl overflow-hidden z-10">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-brand-border dark:border-app-border">
          <Search className="w-5 h-5 text-brand-muted dark:text-app-muted" />
          <input
            type="text"
            placeholder="Type a command or navigate... (e.g. track, diagnostic, connect)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-brand-charcoal dark:text-app-text placeholder-brand-muted dark:placeholder-app-muted outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-brand-muted dark:text-app-muted bg-brand-stone/40 dark:bg-app-elevated rounded border border-brand-border dark:border-app-border">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-brand-muted dark:text-app-muted">
              No matching actions found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-brand-sageLight/50 dark:hover:bg-app-elevated transition-colors group"
              >
                <div className="p-1.5 rounded-md bg-brand-stone/40 dark:bg-app-bg border border-brand-border/40 dark:border-app-border/40">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-brand-charcoal dark:text-app-text group-hover:text-brand-forest dark:group-hover:text-app-accent">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-brand-muted dark:text-app-muted truncate">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

