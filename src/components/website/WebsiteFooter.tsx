import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';

export const WebsiteFooter: React.FC = () => {
  return (
    <footer className="bg-brand-ivory border-t border-brand-border py-16 text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-brand-border/70">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="light" to="/" />
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              Universal DJ connectivity for interactive music entertainment. Intelligent playback detection, unified metadata transmission, and dependable live-event routing.
            </p>
            <div className="pt-2 text-[11px] font-mono text-brand-forest font-semibold">
              Your DJ. Your Software. One Connection.
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3 text-xs">
            <div className="font-heading font-bold text-brand-charcoal text-sm">
              Product
            </div>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <a href="#how-it-works" className="hover:text-brand-forest transition-colors">
                  Overview & Pipeline
                </a>
              </li>
              <li>
                <a href="#detection" className="hover:text-brand-forest transition-colors">
                  Track Detection
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-brand-forest transition-colors">
                  Desktop Experience
                </a>
              </li>
              <li>
                <a href="#reliability" className="hover:text-brand-forest transition-colors">
                  Live Event Reliability
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Integrations */}
          <div className="space-y-3 text-xs">
            <div className="font-heading font-bold text-brand-charcoal text-sm">
              Integrations
            </div>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <a href="#integrations" className="hover:text-brand-forest transition-colors">
                  VirtualDJ (Existing Beta)
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-brand-forest transition-colors">
                  Serato DJ Pro (Evaluation)
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-brand-forest transition-colors">
                  rekordbox (Evaluation)
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-brand-forest transition-colors">
                  Engine DJ (Evaluation)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore & Demo */}
          <div className="space-y-3 text-xs">
            <div className="font-heading font-bold text-brand-charcoal text-sm">
              Explore
            </div>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <Link to="/app" className="font-semibold text-brand-forest hover:underline">
                  Interactive Demo App
                </Link>
              </li>
              <li>
                <Link to="/app/live" className="hover:text-brand-forest transition-colors">
                  Live Track Detection
                </Link>
              </li>
              <li>
                <Link to="/app/games" className="hover:text-brand-forest transition-colors">
                  OmniDrop Manual Override
                </Link>
              </li>
              <li>
                <Link to="/app/diagnostics" className="hover:text-brand-forest transition-colors">
                  Diagnostic Self-Test
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Honest Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            © 2026 OmniBeat Universal. "Connecting music to interactive entertainment."
          </div>
          <div className="text-[11px] font-mono text-brand-muted/80 text-center sm:text-right">
            Client Demonstration Prototype • Realistic simulated frontend dataset
          </div>
        </div>
      </div>
    </footer>
  );
};

