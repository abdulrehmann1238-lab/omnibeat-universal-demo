import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Gamepad2,
  ExternalLink,
  Sparkles,
  Sliders
} from 'lucide-react';

interface AppTopbarProps {
  onMenuToggle: () => void;
  onOpenCommandPalette: () => void;
}

export const AppTopbar: React.FC<AppTopbarProps> = ({
  onMenuToggle,
  onOpenCommandPalette
}) => {
  const location = useLocation();
  const {
    connectionStatus,
    activeGame,
    theme,
    setTheme,
    applyScenario,
    stats,
    setIsTourOpen
  } = useApp();

  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Map route to title & breadcrumb
  const pageTitles: Record<string, { title: string; crumb: string }> = {
    '/app': { title: 'Operational Overview', crumb: 'Dashboard' },
    '/app/connect': { title: 'DJ Software Connections', crumb: 'Connections' },
    '/app/live': { title: 'Live Track Detection', crumb: 'Live Stream' },
    '/app/games': { title: 'Omni-Bingo Game Routing', crumb: 'Active Games' },
    '/app/activity': { title: 'Metadata Event Activity', crumb: 'Event Log' },
    '/app/diagnostics': { title: 'Connection Diagnostics', crumb: 'Diagnostics' },
    '/app/settings': { title: 'Application Settings', crumb: 'Settings' }
  };

  const currentMeta = pageTitles[location.pathname] || {
    title: 'OmniBeat Universal',
    crumb: 'App'
  };

  return (
    <header className="h-16 flex-shrink-0 bg-brand-surface dark:bg-app-bg border-b border-brand-border dark:border-app-border px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-brand-muted hover:text-brand-charcoal dark:text-app-muted dark:hover:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-muted dark:text-app-muted uppercase tracking-wider">
            <span>OmniBeat</span>
            <span>/</span>
            <span className="text-brand-forest dark:text-app-accent font-semibold">
              {currentMeta.crumb}
            </span>
          </div>
          <h2 className="font-heading font-bold text-sm sm:text-base text-brand-charcoal dark:text-app-text truncate leading-tight">
            {currentMeta.title}
          </h2>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Quick Search / Command Palette Button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-brand-stone/40 hover:bg-brand-stone/70 dark:bg-app-elevated dark:hover:bg-app-elevatedHover text-brand-muted dark:text-app-muted border border-brand-border dark:border-app-border text-xs transition-colors"
          title="Open Command Palette (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Quick Actions</span>
          <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-brand-surface dark:bg-app-bg border border-brand-border dark:border-app-border">
            ⌘K
          </kbd>
        </button>

        {/* Predefined Scenarios Selector */}
        <div className="relative">
          <button
            onClick={() => setIsScenarioOpen(!isScenarioOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-stone/40 hover:bg-brand-stone/70 dark:bg-app-elevated dark:hover:bg-app-elevatedHover text-xs font-medium text-brand-charcoal dark:text-app-text border border-brand-border dark:border-app-border transition-colors"
            title="Load demo scenario"
          >
            <Sliders className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
            <span className="hidden xl:inline text-[11px]">Demo Scenario</span>
          </button>

          {isScenarioOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-xl z-30 p-2 space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-brand-muted dark:text-app-muted font-bold">
                Select Predefined Scenario
              </div>
              <button
                onClick={() => {
                  applyScenario('normal');
                  setIsScenarioOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-brand-sageLight/50 dark:hover:bg-app-elevated text-brand-charcoal dark:text-app-text"
              >
                <div className="font-semibold text-status-connected">1. Normal Event</div>
                <div className="text-[10px] text-brand-muted dark:text-app-muted">
                  Everything connected, steady track flow
                </div>
              </button>
              <button
                onClick={() => {
                  applyScenario('interruption');
                  setIsScenarioOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-brand-sageLight/50 dark:hover:bg-app-elevated text-brand-charcoal dark:text-app-text"
              >
                <div className="font-semibold text-status-connecting">2. Network Interruption</div>
                <div className="text-[10px] text-brand-muted dark:text-app-muted">
                  Socket drops and automatically reconciles
                </div>
              </button>
              <button
                onClick={() => {
                  applyScenario('duplicate');
                  setIsScenarioOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-brand-sageLight/50 dark:hover:bg-app-elevated text-brand-charcoal dark:text-app-text"
              >
                <div className="font-semibold text-brand-forest dark:text-app-accent">3. Duplicate Track Event</div>
                <div className="text-[10px] text-brand-muted dark:text-app-muted">
                  Rapid cue seek suppressed by debounce
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Active game status badge */}
        {activeGame && (
          <Link
            to="/app/games"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-stone/30 dark:bg-app-elevated border border-brand-border/80 dark:border-app-border/80 text-xs text-brand-charcoal dark:text-app-text hover:border-brand-forest transition-colors"
            title={`Connected to ${activeGame.title}`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
            <span className="font-mono text-[11px] font-semibold">{activeGame.sessionId}</span>
          </Link>
        )}

        {/* Connection status pill */}
        <StatusBadge status={connectionStatus} size="sm" />

        {/* Notifications Icon with count */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-charcoal dark:text-app-muted dark:hover:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors relative"
            aria-label="View recent alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-connected" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-xl z-30 p-3 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-brand-border dark:border-app-border">
                <span className="text-xs font-bold text-brand-charcoal dark:text-app-text">
                  Recent Alerts
                </span>
                <span className="text-[10px] font-mono text-brand-muted dark:text-app-muted">
                  {stats.eventsDetected} events processed
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-brand-stone/30 dark:bg-app-elevated">
                  <div className="font-semibold text-brand-charcoal dark:text-app-text text-[11px]">
                    VirtualDJ connected
                  </div>
                  <div className="text-[10px] text-brand-muted dark:text-app-muted">
                    Deck monitoring active via IPC bridge
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-brand-stone/30 dark:bg-app-elevated">
                  <div className="font-semibold text-brand-charcoal dark:text-app-text text-[11px]">
                    Omni-Bingo Session {activeGame?.sessionId}
                  </div>
                  <div className="text-[10px] text-brand-muted dark:text-app-muted">
                    Receiving normalized song changes
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-brand-muted hover:text-brand-charcoal dark:text-app-muted dark:hover:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Link back to Website */}
        <Link
          to="/"
          className="hidden lg:flex items-center gap-1 text-xs font-medium text-brand-muted hover:text-brand-charcoal dark:text-app-muted dark:hover:text-app-text px-2 py-1.5 rounded-lg hover:bg-brand-stone/40 dark:hover:bg-app-elevated transition-colors"
          title="Return to Public Presentation"
        >
          <span>Website</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
};

