import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { ToastContainer } from '../common/ToastContainer';
import { EventDetailModal } from './EventDetailModal';
import { ProductTourModal } from './ProductTourModal';
import { CommandPalette } from '../common/CommandPalette';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Radio, ArrowRight, Gamepad2, Activity } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    theme,
    selectedEventForModal,
    setSelectedEventForModal,
    isTourOpen,
    setIsTourOpen
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Check first-time app launch
  useEffect(() => {
    const hasLaunched = localStorage.getItem('omnibeat_app_first_launch');
    if (!hasLaunched) {
      setShowWelcomeModal(true);
      localStorage.setItem('omnibeat_app_first_launch', 'true');
    }
  }, []);

  // Sync theme with document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark bg-[#202522]' : 'bg-brand-ivory'} text-brand-charcoal dark:text-app-text transition-colors duration-200`}>
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AppTopbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-brand-ivory/60 dark:bg-app-bg">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Reusable Modals & Overlays */}
      <EventDetailModal
        event={selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
      />

      <ProductTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* First-time Welcome Modal (PRD Section 6.1) */}
      <Modal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        title="Welcome to OmniBeat Universal"
        subtitle="Desktop DJ Connectivity & Real-Time Track Detection"
        maxWidth="max-w-md"
      >
        <div className="space-y-5">
          <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed">
            Connect your DJ software and select an active Omni-Bingo game to begin your demonstration.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-stone/30 dark:bg-app-elevated border border-brand-border/60 dark:border-app-border/60">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold flex-shrink-0">
                1
              </span>
              <div>
                <div className="text-xs font-semibold text-brand-charcoal dark:text-app-text">
                  Choose DJ Software
                </div>
                <div className="text-[11px] text-brand-muted dark:text-app-muted">
                  Connect VirtualDJ Beta or inspect Serato, rekordbox, Engine DJ
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-stone/30 dark:bg-app-elevated border border-brand-border/60 dark:border-app-border/60">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold flex-shrink-0">
                2
              </span>
              <div>
                <div className="text-xs font-semibold text-brand-charcoal dark:text-app-text">
                  Observe Track Detection
                </div>
                <div className="text-[11px] text-brand-muted dark:text-app-muted">
                  Simulate live track changes and test duplicate prevention
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-stone/30 dark:bg-app-elevated border border-brand-border/60 dark:border-app-border/60">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold flex-shrink-0">
                3
              </span>
              <div>
                <div className="text-xs font-semibold text-brand-charcoal dark:text-app-text">
                  Select Omni-Bingo Game
                </div>
                <div className="text-[11px] text-brand-muted dark:text-app-muted">
                  Route metadata to the active session or test manual override
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-brand-border dark:border-app-border">
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="text-xs font-medium text-brand-muted dark:text-app-muted hover:text-brand-charcoal dark:hover:text-app-text"
            >
              Explore Dashboard
            </button>
            <button
              onClick={() => {
                setShowWelcomeModal(false);
                navigate('/app/connect');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
};

