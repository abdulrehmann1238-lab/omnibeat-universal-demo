import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc3, Layers } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#202522] text-[#F5F4EF] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-brand-forest/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold text-[#91AA94] block">
          READY TO EXPERIENCE THE CONNECTION
        </span>

        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] tracking-tight leading-tight">
          Your music is already playing.{' '}
          <br />
          <span className="text-[#91AA94]">Let's connect it.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A9B0A8] max-w-2xl mx-auto leading-relaxed">
          Explore the OmniBeat Universal experience and see how DJ connectivity can become simpler, faster, and more reliable across live entertainment events.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F5F4EF] hover:bg-white text-[#202522] text-sm font-bold transition-all shadow-lg hover:shadow-xl group"
          >
            <Disc3 className="w-4 h-4" />
            <span>Launch Interactive Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#integrations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#292F2B] hover:bg-[#303832] text-[#F5F4EF] text-sm font-semibold border border-[#3C453E] transition-colors"
          >
            <Layers className="w-4 h-4 text-[#91AA94]" />
            <span>Explore Integrations</span>
          </a>
        </div>
      </div>
    </section>
  );
};

