import React from 'react';
import { Radio, Layers, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductIntro: React.FC = () => {
  const cards = [
    {
      icon: <Radio className="w-6 h-6 text-brand-forest" />,
      title: 'Detect the Playing Track',
      desc: 'Identify song changes using supported DJ software interfaces and playback information, with a focus on minimizing unnecessary detection delays.',
      accent: '01'
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-forest" />,
      title: 'Normalize the Metadata',
      desc: 'Convert track information into a consistent event structure, regardless of the connected DJ source, audio encoding, or hardware platform.',
      accent: '02'
    },
    {
      icon: <Send className="w-6 h-6 text-brand-forest" />,
      title: 'Deliver to Omni-Bingo',
      desc: 'Send track metadata to the correct active game through the existing OmniBeat and OmniDrop infrastructure, preserving manual operator override.',
      accent: '03'
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-sage mb-2 block">
            HOW IT CONNECTS
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            From the DJ booth to the game in seconds.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            A single connection layer transforms currently playing track information into structured metadata events for your entertainment platform.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-sage/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-brand-sageLight border border-brand-sage/30 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-brand-stone group-hover:text-brand-sage/40 transition-colors">
                    {card.accent}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-brand-charcoal mb-2">
                  {card.title}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <Link
                  to="/app/live"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest hover:text-brand-forestDark transition-colors"
                >
                  <span>Explore this stage</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

