import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import { DJ_PLATFORMS } from '../../data/platforms';
import {
  LayoutDashboard,
  Radio,
  Activity,
  Gamepad2,
  ListOrdered,
  Wrench,
  Settings,
  User,
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const {
    connectionStatus,
    selectedPlatform,
    manualOverrideEnabled,
    stats,
    setIsTourOpen
  } = useApp();

  const currentPlatformInfo = DJ_PLATFORMS[selectedPlatform];

  const navItems = [
    { name: 'Overview', to: '/app', icon: LayoutDashboard },
    { name: 'DJ Connections', to: '/app/connect', icon: Radio },
    { name: 'Live Detection', to: '/app/live', icon: Activity },
    { name: 'Active Games', to: '/app/games', icon: Gamepad2 },
    { name: 'Event Activity', to: '/app/activity', icon: ListOrdered },
    { name: 'Diagnostics', to: '/app/diagnostics', icon: Wrench },
    { name: 'Settings', to: '/app/settings', icon: Settings }
  ];

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#202522]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 flex flex-col bg-[#202522] border-r border-[#3C453E] text-[#F5F4EF] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#3C453E]/70">
          <BrandLogo variant="dark" to="/app" />
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#A9B0A8]/80 font-bold">
            Application Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#303832] text-[#91AA94] font-semibold border-l-2 border-[#91AA94]'
                      : 'text-[#A9B0A8] hover:text-[#F5F4EF] hover:bg-[#292F2B]'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick Guided Tour trigger button */}
          <div className="pt-4 px-2">
            <button
              onClick={() => {
                onClose();
                setIsTourOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#303832]/60 hover:bg-[#303832] text-[#91AA94] text-xs font-semibold border border-[#3C453E] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Tour</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Connection status & Profile */}
        <div className="p-4 border-t border-[#3C453E]/70 bg-[#292F2B]/60 space-y-3">
          {/* Connection summary */}
          <div className="p-2.5 rounded-lg bg-[#202522] border border-[#3C453E] space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#A9B0A8] text-[11px] font-medium truncate">
                {currentPlatformInfo?.name || 'DJ Source'}
              </span>
              <StatusBadge status={connectionStatus} size="sm" />
            </div>

            {connectionStatus === 'connected' && (
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A9B0A8]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#91AA94]" />
                  <span>Uptime</span>
                </span>
                <span>{formatDuration(stats.connectionDurationSec)}</span>
              </div>
            )}

            {manualOverrideEnabled && (
              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-status-connecting font-semibold">
                <ShieldAlert className="w-3 h-3" />
                <span>Manual Override Active</span>
              </div>
            )}
          </div>

          {/* User profile dropdown summary */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#303832] border border-[#3C453E] flex items-center justify-center text-[#91AA94] flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-[#F5F4EF] truncate">
                  DJ Demo Account
                </div>
                <div className="text-[10px] text-[#A9B0A8] truncate">
                  Live Event Host
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

