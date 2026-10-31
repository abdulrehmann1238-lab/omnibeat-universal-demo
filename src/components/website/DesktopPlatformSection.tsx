import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Apple, ArrowRight, Download, CheckCircle2 } from 'lucide-react';

export const DesktopPlatformSection: React.FC = () => {
  return (
    <section id="download" className="py-24 bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-forest mb-2 block">
            CROSS-PLATFORM ARCHITECTURE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            One familiar experience. Two desktop platforms.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            Consistent design and reliable background process handling whether your DJs perform on Windows gaming rigs or MacBooks.
          </p>
        </div>

        {/* 2 Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Windows Card */}
          <div className="p-8 rounded-2xl bg-brand-ivory border border-brand-border hover:border-brand-sage transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-charcoal">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-forest px-2.5 py-1 rounded-full bg-brand-sageLight">
                  Windows 10 / 11
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-brand-charcoal mb-2">
                Windows Edition
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Lightweight native desktop application with background taskbar tray minimization, automatic loopback IPC listeners, and multi-deck discovery.
              </p>

              <ul className="space-y-2 text-xs text-brand-charcoal mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Single-file MSI / Executable installer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>VirtualDJ & Windows audio subsystem support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Silent background updates & crash recovery</span>
                </li>
              </ul>
            </div>

            <Link
              to="/app"
              className="w-full py-3 px-4 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory text-xs font-bold text-center transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Explore Desktop Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* macOS Card */}
          <div className="p-8 rounded-2xl bg-brand-ivory border border-brand-border hover:border-brand-sage transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-charcoal">
                  <Apple className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-forest px-2.5 py-1 rounded-full bg-brand-sageLight">
                  Universal Binary
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-brand-charcoal mb-2">
                macOS Edition
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Native menu bar accessory optimized for Apple Silicon (M1–M4) and Intel Macs, maintaining sub-1% CPU consumption during live DJ sets.
              </p>

              <ul className="space-y-2 text-xs text-brand-charcoal mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Universal DMG & Apple Notarized package</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>macOS menu bar quick control widget</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-connected" />
                  <span>Low-power battery preservation mode</span>
                </li>
              </ul>
            </div>

            <Link
              to="/app"
              className="w-full py-3 px-4 rounded-xl bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory text-xs font-bold text-center transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Explore Desktop Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-center text-brand-muted max-w-2xl mx-auto italic leading-relaxed">
          The interactive demonstration is browser-based. Production installers and native desktop integrations are part of the proposed implementation.
        </p>
      </div>
    </section>
  );
};

