import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { Menu, X, ArrowRight, Disc3 } from 'lucide-react';

export const WebsiteNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'DJ Integrations', href: '#integrations' },
    { name: 'Track Detection', href: '#detection' },
    { name: 'Reliability', href: '#reliability' },
    { name: 'Desktop App', href: '#download' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-ivory/95 backdrop-blur-md border-b border-brand-border/80 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <BrandLogo variant="light" to="/" />

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-brand-charcoal/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="hover:text-brand-forest transition-colors tracking-tight"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
            className="text-xs font-semibold text-brand-charcoal hover:text-brand-forest px-3 py-2 rounded-lg transition-colors"
          >
            See How It Works
          </a>

          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory text-xs font-bold transition-all shadow-sm group"
          >
            <span>Explore Live Demo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-stone/40 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-ivory border-b border-brand-border px-6 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-semibold text-brand-charcoal hover:text-brand-forest py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-charcoal text-brand-ivory text-xs font-bold shadow-sm"
            >
              <Disc3 className="w-4 h-4" />
              <span>Explore Live Demo</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

