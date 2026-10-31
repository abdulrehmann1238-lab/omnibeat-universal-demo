import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EventDeliveryStatus, MetadataEvent } from '../../types';
import {
  ListOrdered,
  Search,
  Filter,
  Trash2,
  Database,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpDown
} from 'lucide-react';

export const EventActivityPage: React.FC = () => {
  const { eventHistory, setSelectedEventForModal, clearActivity } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EventDeliveryStatus>('all');

  const filteredEvents = useMemo(() => {
    return eventHistory.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.targetGame.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ? true : event.deliveryStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [eventHistory, searchQuery, statusFilter]);

  const filterButtons: { label: string; value: 'all' | EventDeliveryStatus; count: number }[] = [
    { label: 'All Events', value: 'all', count: eventHistory.length },
    {
      label: 'Delivered',
      value: 'delivered',
      count: eventHistory.filter((e) => e.deliveryStatus === 'delivered').length
    },
    {
      label: 'Duplicate Prevented',
      value: 'duplicate_prevented',
      count: eventHistory.filter((e) => e.deliveryStatus === 'duplicate_prevented').length
    },
    {
      label: 'Pending (Override)',
      value: 'pending',
      count: eventHistory.filter((e) => e.deliveryStatus === 'pending').length
    },
    {
      label: 'Failed',
      value: 'failed',
      count: eventHistory.filter((e) => e.deliveryStatus === 'failed').length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-brand-border/70 dark:border-app-border/70">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-charcoal dark:text-app-text tracking-tight">
            Event Activity
          </h1>
          <p className="text-xs text-brand-muted dark:text-app-muted mt-1">
            Review metadata events generated during the demonstration. Click any row to inspect normalized JSON.
          </p>
        </div>

        <button
          onClick={clearActivity}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border dark:border-app-border text-xs font-semibold text-brand-muted hover:text-status-error dark:text-app-muted dark:hover:text-status-error transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Activity</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted dark:text-app-muted" />
            <input
              type="text"
              placeholder="Search by track, artist, event ID (e.g. OB-2026), or game session..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-brand-stone/30 dark:bg-app-bg border border-brand-border dark:border-app-border text-brand-charcoal dark:text-app-text placeholder-brand-muted dark:placeholder-app-muted outline-none focus:border-brand-forest dark:focus:border-app-accent"
            />
          </div>

          <div className="text-xs font-mono text-brand-muted dark:text-app-muted self-end sm:self-auto">
            Showing {filteredEvents.length} of {eventHistory.length} events
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-brand-border/60 dark:border-app-border/60">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setStatusFilter(btn.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                statusFilter === btn.value
                  ? 'bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg shadow-sm'
                  : 'bg-brand-stone/30 hover:bg-brand-stone/60 dark:bg-app-elevated dark:hover:bg-app-border text-brand-charcoal dark:text-app-text'
              }`}
            >
              <span>{btn.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  statusFilter === btn.value
                    ? 'bg-white/20 text-white'
                    : 'bg-brand-stone/60 dark:bg-app-bg text-brand-muted'
                }`}
              >
                {btn.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Events Table */}
      <div className="rounded-xl bg-brand-surface dark:bg-app-secondary border border-brand-border dark:border-app-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-brand-stone/20 dark:bg-app-bg/60 border-b border-brand-border/80 dark:border-app-border text-[11px] font-mono text-brand-muted dark:text-app-muted uppercase">
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Artist</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Active Game</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 dark:divide-app-border/50">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-brand-muted dark:text-app-muted">
                    No matching events found. Try clearing your search query or trigger a simulated track change.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => setSelectedEventForModal(event)}
                    className="hover:bg-brand-sageLight/40 dark:hover:bg-app-elevated/60 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-brand-forest dark:text-app-accent">
                      {event.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-charcoal dark:text-app-text">
                      {event.title}
                    </td>
                    <td className="py-3 px-4 text-brand-muted dark:text-app-muted">
                      {event.artist}
                    </td>
                    <td className="py-3 px-4 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {event.source}
                    </td>
                    <td className="py-3 px-4 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {event.targetGame}
                    </td>
                    <td className="py-3 px-4 font-mono text-brand-muted dark:text-app-muted text-[11px]">
                      {event.timestampFormatted}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <StatusBadge
                        status={
                          event.deliveryStatus === 'delivered'
                            ? 'connected'
                            : event.deliveryStatus === 'duplicate_prevented'
                            ? 'connecting'
                            : 'error'
                        }
                        label={
                          event.deliveryStatus === 'delivered'
                            ? 'Delivered'
                            : event.deliveryStatus === 'duplicate_prevented'
                            ? 'Duplicate Prevented'
                            : event.deliveryStatus === 'pending'
                            ? 'Pending (Override)'
                            : 'Failed'
                        }
                        size="sm"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

