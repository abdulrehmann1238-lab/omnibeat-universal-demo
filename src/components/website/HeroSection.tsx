import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Radio,
  Gamepad2,
  Disc3,
  Clock,
  Sparkles,
  Music,
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [heroConnected, setHeroConnected] = useState(true);
  const [showTrackHover, setShowTrackHover] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#1A1F1C] text-[#F5F4EF]">
      {/* Cinematic Performance Atmosphere Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-forest/25 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#819685]/15 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />

        {/* Minimal geometric grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#F5F4EF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#303832]/80 border border-[#3C453E] text-[11px] font-mono tracking-[0.2em] uppercase text-[#91AA94] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#91AA94] animate-pulse" />
              UNIVERSAL DJ CONNECTIVITY
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] tracking-tight leading-[1.08]">
              Every Track.{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#91AA94]">One Universal Connection.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#A9B0A8] max-w-xl font-normal leading-relaxed">
              OmniBeat Universal connects your DJ software to Omni-Bingo, bringing track detection, real-time metadata, and live entertainment connectivity together through one simple application.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/app"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F5F4EF] hover:bg-white text-[#202522] text-sm font-bold transition-all shadow-md hover:shadow-lg group"
              >
                <span>Explore the Application</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#292F2B] hover:bg-[#303832] text-[#F5F4EF] text-sm font-semibold border border-[#3C453E] transition-colors"
              >
                <span>Discover How It Works</span>
              </a>
            </div>

            {/* 3 Small Trust Indicators */}
            <div className="pt-6 border-t border-[#3C453E]/60 flex flex-wrap items-center gap-6 text-xs text-[#A9B0A8]">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#91AA94]" />
                <span>Windows & macOS</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#91AA94]" />
                <span>Multiple DJ Platforms</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#91AA94]" />
                <span>Metadata-Only Transmission</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Desktop Application Window Preview */}
          <div className="lg:col-span-5 relative">
            {/* Desktop Window Shell */}
            <div className="rounded-2xl bg-[#202522] border border-[#3C453E] shadow-2xl overflow-hidden transition-all duration-300 ring-1 ring-white/5">
              {/* Window Titlebar */}
              <div className="h-10 bg-[#292F2B] px-4 flex items-center justify-between border-b border-[#3C453E]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4A524D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4A524D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4A524D]" />
                </div>
                <div className="text-[11px] font-mono text-[#A9B0A8] font-semibold">
                  OmniBeat Universal • Live Preview
                </div>
                <div className="w-8" />
              </div>

              {/* Preview Body */}
              <div className="p-5 space-y-4 text-xs">
                {/* Header status bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#3C453E]/70">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#91AA94]" />
                    <span className="font-semibold text-[#F5F4EF]">VirtualDJ</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#303832] text-[#A9B0A8]">
                      Deck 1
                    </span>
                  </div>

                  {/* Interactive connection pill */}
                  <button
                    onClick={() => setHeroConnected(!heroConnected)}
                    title="Click to toggle simulated connection"
                    className="cursor-pointer"
                  >
                    <StatusBadge
                      status={heroConnected ? 'connected' : 'disconnected'}
                      label={heroConnected ? 'Connected (Click to toggle)' : 'Disconnected'}
                      size="sm"
                    />
                  </button>
                </div>

                {/* Detected Track Item with hover detail */}
                <div
                  onMouseEnter={() => setShowTrackHover(true)}
                  onMouseLeave={() => setShowTrackHover(false)}
                  className="relative p-3.5 rounded-xl bg-[#292F2B] border border-[#3C453E] cursor-pointer hover:border-[#91AA94] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#303832] flex items-center justify-center text-[#91AA94] flex-shrink-0">
                        <Music className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold font-heading text-[#F5F4EF]">
                          Midnight City
                        </div>
                        <div className="text-xs text-[#A9B0A8]">
                          M83 • Hurry Up, We're Dreaming
                        </div>
                      </div>
                    </div>
                    <AudioVisualizer isPlaying={heroConnected} bars={4} height="h-4" />
                  </div>

                  {/* Hover detail panel */}
                  {showTrackHover && (
                    <div className="mt-3 pt-2.5 border-t border-[#3C453E] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A9B0A8]">
                      <div>Latency: <span className="text-[#91AA94] font-semibold">1.8s</span></div>
                      <div>Key: <span className="text-[#F5F4EF]">B minor</span></div>
                      <div>BPM: <span className="text-[#F5F4EF]">105</span></div>
                      <div>Deck: <span className="text-[#F5F4EF]">1 (Playing)</span></div>
                    </div>
                  )}
                </div>

                {/* Active Destination & Pipeline Line */}
                <div className="p-3 rounded-xl bg-[#292F2B]/60 border border-[#3C453E]/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#A9B0A8] flex items-center gap-1.5">
                      <Gamepad2 className="w-3.5 h-3.5 text-[#91AA94]" />
                      Target Omni-Bingo Game:
                    </span>
                    <span className="font-semibold text-[#F5F4EF] font-mono">
                      Friday Music Bingo
                    </span>
                  </div>

                  {/* Visual Connection flow bar */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-1.5 bg-[#303832] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          heroConnected ? 'w-full bg-[#4F765D]' : 'w-1/4 bg-[#8A8D88]'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#91AA94]">
                      {heroConnected ? 'Live Route' : 'Idle'}
                    </span>
                  </div>
                </div>

                {/* Small recent activity list */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#A9B0A8] font-bold">
                    Transmission History
                  </div>
                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-[#A9B0A8] py-1 border-b border-[#3C453E]/40">
                      <span className="text-[#F5F4EF] truncate">Midnight City — M83</span>
                      <span className="text-[#91AA94] flex-shrink-0">Delivered</span>
                    </div>
                    <div className="flex justify-between text-[#A9B0A8] py-1 border-b border-[#3C453E]/40">
                      <span className="truncate">Blinding Lights — The Weeknd</span>
                      <span className="text-[#91AA94] flex-shrink-0">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Launch full app button */}
                <button
                  onClick={() => navigate('/app')}
                  className="w-full py-2.5 rounded-lg bg-[#303832] hover:bg-[#374039] text-[#91AA94] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#3C453E]"
                >
                  <span>Launch Full Interactive Application</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ambient indicator card underneath */}
            <div className="mt-3 flex items-center justify-between px-3 text-[11px] text-[#A9B0A8]">
              <span>Desktop Application Simulation</span>
              <span className="font-mono text-[#91AA94]">v1.0 Demo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

