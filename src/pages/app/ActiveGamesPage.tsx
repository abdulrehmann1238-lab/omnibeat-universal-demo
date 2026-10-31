import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameSession } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  Gamepad2,
  Users,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  Radio,
  Send,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export const ActiveGamesPage: React.FC = () => {
  const {
    games,
    activeGame,
    selectGame,
    manualOverrideEnabled,
    toggleManualOverride,
    connectionStatus,
    selectedPlatform
  } = useApp();

  const [confirmModalGame, setConfirmModalGame] = useState<GameSession | null>(null);

  const handleConfirmSelect = () => {
    if (confirmModalGame) {
      selectGame(confirmModalGame.id);
      setConfirmModalGame(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
          Active Omni-Bingo Games
        </h1>
        <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
          Select the game that should receive metadata events from the connected DJ source.
        </p>
      </div>

      {/* 10.1 OmniDrop Manual Override Concept Card (Critical Feature) */}
      <div className="p-6 rounded-2xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
              manualOverrideEnabled
                ? 'bg-status-connecting/20 border-status-connecting text-status-connecting'
                : 'bg-brand-forest/10 border-brand-forest/30 text-brand-forest dark:bg-app-accent/15 dark:text-app-accent'
            }`}>
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-brand-charcoal dark:text-app-text">
                  OmniDrop Manual Override
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  manualOverrideEnabled
                    ? 'bg-status-connecting/20 text-status-connecting'
                    : 'bg-status-connected/20 text-status-connected'
                }`}>
                  {manualOverrideEnabled ? 'Manual Control Active' : 'DJ Automation Active'}
                </span>
              </div>
              <p className="text-xs text-brand-muted dark:text-app-muted mt-1 leading-relaxed max-w-2xl">
                Manual gameplay controls remain available independently of DJ connectivity. If a DJ misses a track change or custom gameplay decisions are needed, the game operator can trigger songs manually through OmniDrop without disconnecting OmniBeat.
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-semibold text-brand-charcoal dark:text-app-text">
              {manualOverrideEnabled ? 'Override Enabled' : 'Override Disabled'}
            </span>
            <button
              onClick={toggleManualOverride}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                manualOverrideEnabled ? 'bg-status-connecting' : 'bg-brand-stone dark:bg-app-elevated'
              }`}
              role="switch"
              aria-checked={manualOverrideEnabled}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  manualOverrideEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 3 Status Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-brand-border/60 dark:border-app-border/60 text-xs">
          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="text-brand-muted dark:text-app-muted block text-[11px]">DJ Connection State:</span>
            <span className="font-semibold text-brand-charcoal dark:text-app-text flex items-center gap-1.5 mt-0.5">
              <Radio className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
              {connectionStatus === 'connected' ? 'Connected (Deck Active)' : 'Disconnected'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="text-brand-muted dark:text-app-muted block text-[11px]">Automated Transmission:</span>
            <span className="font-semibold text-brand-charcoal dark:text-app-text flex items-center gap-1.5 mt-0.5">
              <Send className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
              {manualOverrideEnabled ? (
                <span className="text-status-connecting">Paused by Override</span>
              ) : (
                <span className="text-status-connected">Streaming to Omni-Bingo</span>
              )}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-brand-stone/20 dark:bg-app-bg border border-brand-border/60 dark:border-app-border/60">
            <span className="text-brand-muted dark:text-app-muted block text-[11px]">Active Destination:</span>
            <span className="font-semibold text-brand-charcoal dark:text-app-text flex items-center gap-1.5 mt-0.5">
              <Gamepad2 className="w-3.5 h-3.5 text-brand-forest dark:text-app-accent" />
              {activeGame?.title || 'None Selected'}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Mock Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {games.map((game) => {
          const isSelected = activeGame?.id === game.id;
          const isActiveStatus = game.status === 'active';

          return (
            <div
              key={game.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-brand-surface dark:bg-app-secondary border-brand-forest dark:border-app-accent ring-1 ring-brand-forest/30 dark:ring-app-accent/30 shadow-md'
                  : 'bg-brand-surface/70 dark:bg-app-secondary/60 border-brand-border dark:border-app-border hover:border-brand-sage'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-bold text-base text-brand-charcoal dark:text-app-text">
                    {game.title}
                  </h3>
                  <StatusBadge
                    status={isActiveStatus ? 'connected' : 'connecting'}
                    label={isActiveStatus ? 'Active' : 'Scheduled'}
                    size="sm"
                  />
                </div>

                <div className="text-xs text-brand-muted dark:text-app-muted mb-3 font-mono">
                  Session: <span className="font-semibold text-brand-charcoal dark:text-app-text">{game.sessionId}</span>
                </div>

                <div className="space-y-2 text-xs bg-brand-stone/20 dark:bg-app-bg p-3 rounded-lg border border-brand-border/60 dark:border-app-border/60 mb-4 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-muted dark:text-app-muted flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Players:
                    </span>
                    <span className="font-bold text-brand-charcoal dark:text-app-text">
                      {game.playersCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-muted dark:text-app-muted">Type:</span>
                    <span className="text-brand-charcoal dark:text-app-text">{game.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-muted dark:text-app-muted">Progress:</span>
                    <span className="text-brand-forest dark:text-app-accent font-semibold">
                      Round {game.currentRound} / {game.totalRounds}
                    </span>
                  </div>
                </div>

                {game.scheduledTime && (
                  <div className="flex items-center gap-1.5 text-xs text-status-connecting mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Starts {game.scheduledTime}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-brand-border/60 dark:border-app-border/60">
                {isSelected ? (
                  <div className="w-full py-2 px-3 rounded-lg bg-brand-forest/10 dark:bg-app-accent/15 text-brand-forest dark:text-app-accent text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Currently Active Destination</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmModalGame(game)}
                    className="w-full py-2 px-3 rounded-lg bg-brand-stone/50 hover:bg-brand-stone dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text text-xs font-semibold transition-colors"
                  >
                    Select Game
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal (PRD Section 10) */}
      <Modal
        isOpen={!!confirmModalGame}
        onClose={() => setConfirmModalGame(null)}
        title="Confirm Game Selection"
        subtitle="Route OmniBeat metadata transmission"
        maxWidth="max-w-md"
      >
        {confirmModalGame && (
          <div className="space-y-4">
            {confirmModalGame.status === 'scheduled' ? (
              <div className="p-3.5 rounded-xl bg-status-connecting/15 border border-status-connecting/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-status-connecting flex-shrink-0 mt-0.5" />
                <div className="text-xs text-brand-charcoal dark:text-app-text">
                  <div className="font-bold">Game is currently Scheduled</div>
                  <div className="text-brand-muted dark:text-app-muted mt-0.5">
                    "{confirmModalGame.title}" has not started yet. In accordance with live event integrity rules, song metadata can only be routed to active gameplay sessions.
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed">
                Connect OmniBeat Universal to <strong>{confirmModalGame.title}</strong> (Session ID: <code>{confirmModalGame.sessionId}</code>)? All subsequent track detection events will be normalized and delivered to this game's OmniDrop endpoint.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-brand-border dark:border-app-border">
              <button
                onClick={() => setConfirmModalGame(null)}
                className="px-4 py-2 rounded-lg border border-brand-border dark:border-app-border text-xs font-medium text-brand-muted"
              >
                Cancel
              </button>
              {confirmModalGame.status === 'active' && (
                <button
                  onClick={handleConfirmSelect}
                  className="px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
                >
                  Confirm Selection
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

