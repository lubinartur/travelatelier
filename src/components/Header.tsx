import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { company } from '../data/company';
import { translations, getTranslation } from '../data/translations';
import { LanguageDropdown } from './LanguageDropdown';
import { AppLink } from './AppLink';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenTripModal: () => void;
  variant?: 'home' | 'page';
  onNavigate?: (href: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  onOpenTripModal,
  variant = 'home',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(variant === 'page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const solidHeader = variant === 'page' || isScrolled || mobileMenuOpen;
  const sectionPrefix = variant === 'page' ? '/' : '';

  useEffect(() => {
    if (variant === 'page') {
      setIsScrolled(true);
      return;
    }

    // Become solid after 80px — before the header meets the hero H1 —
    // and clear only below 48px so the swap does not flicker.
    const SOLID_AFTER_PX = 80;
    const CLEAR_BELOW_PX = 48;
    let solid = window.scrollY >= SOLID_AFTER_PX;

    const syncFromScroll = () => {
      const y = window.scrollY;
      const next = solid ? y >= CLEAR_BELOW_PX : y >= SOLID_AFTER_PX;
      if (next === solid) return;
      solid = next;
      setIsScrolled(next);
    };

    setIsScrolled(solid);
    window.addEventListener('scroll', syncFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', syncFromScroll);
  }, [variant]);

  // Destinations, How it works, Partners, Travel insurance, Contact
  const navLinks = [
    { href: `${sectionPrefix}#destinations`, label: getTranslation(translations.nav.destinations, currentLang) },
    { href: `${sectionPrefix}#how-it-works`, label: getTranslation(translations.nav.howItWorks, currentLang) },
    { href: `${sectionPrefix}#partners`, label: getTranslation(translations.nav.partners, currentLang) },
    { href: `${sectionPrefix}#insurance`, label: getTranslation(translations.nav.insurance, currentLang) },
    { href: `${sectionPrefix}#contact`, label: getTranslation(translations.nav.contact, currentLang) },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed left-0 right-0 z-50 border-b transition-[top,height,background-color,border-color,box-shadow,backdrop-filter] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solidHeader
            ? 'top-0 h-[60px] bg-[#FAF8F5]/96 backdrop-blur-md border-[#ECE6DA]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'top-3 sm:top-5 lg:top-7 h-[70px] bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-14 flex items-center justify-between flex-nowrap">
          {/* Brand Wordmark - Compact footprint */}
          <AppLink
            href={variant === 'page' ? '/' : '#'}
            onNavigate={onNavigate}
            id="brand-logo"
            className="group flex items-baseline focus:outline-none shrink-0"
          >
            <span
              className={`font-serif tracking-[0.16em] text-lg sm:text-xl font-medium uppercase transition-colors duration-[450ms] whitespace-nowrap ${
                solidHeader ? 'text-[#181816]' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
              }`}
            >
              Travel Atelier
            </span>
          </AppLink>

          {/* Desktop Navigation - Fits strictly on ONE horizontal line */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-nowrap"
          >
            {navLinks.map((link) => (
              <AppLink
                key={link.href}
                href={link.href}
                onNavigate={onNavigate}
                className={`text-[13px] tracking-[0.06em] font-medium whitespace-nowrap transition-colors duration-200 py-1 hover:opacity-100 ${
                  solidHeader
                    ? 'text-[#484641] hover:text-[#181816]'
                    : 'text-white hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                }`}
              >
                {link.label}
              </AppLink>
            ))}
          </nav>

          {/* Right Actions: Compact Language Switcher & Primary CTA */}
          <div className="hidden md:flex items-center space-x-4 shrink-0 flex-nowrap">
            <LanguageDropdown
              currentLang={currentLang}
              onSelectLang={onSelectLang}
              isScrolled={solidHeader}
              theme="header"
              id="header-language-dropdown"
            />

            {/* Primary CTA - Compact width */}
            <button
              id="header-cta-button"
              onClick={onOpenTripModal}
              className={`group flex items-center space-x-2 text-[11px] uppercase tracking-[0.14em] px-4.5 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap cursor-pointer ${
                solidHeader
                  ? 'bg-[#181816] text-[#FAF8F5] hover:bg-[#32312D]'
                  : 'bg-white/95 text-[#181816] hover:bg-white shadow-[0_2px_12px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span>{getTranslation(translations.nav.planTrip, currentLang)}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-full focus:outline-none transition-colors ${
                solidHeader ? 'text-[#181816]' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-40 bg-[#FAF8F5] pt-24 px-8 pb-10 flex flex-col justify-between overflow-y-auto animate-fadeIn lg:hidden"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#ECE6DA] mb-8">
              <span className="text-xs uppercase tracking-wider text-[#67635A]">
                {currentLang === 'ET' ? 'Menüü' : currentLang === 'RU' ? 'Меню' : 'Menu'}
              </span>
              <LanguageDropdown
                currentLang={currentLang}
                onSelectLang={(lang) => {
                  onSelectLang(lang);
                }}
                isScrolled={true}
                theme="header"
                id="mobile-language-dropdown"
              />
            </div>

            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <AppLink
                  key={link.href}
                  href={link.href}
                  onNavigate={onNavigate}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-[#181816] hover:text-[#A04E32] transition-colors"
                >
                  {link.label}
                </AppLink>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#ECE6DA] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTripModal();
              }}
              className="w-full bg-[#181816] text-[#FAF8F5] py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium flex items-center justify-center space-x-2"
            >
              <span>{getTranslation(translations.nav.planTrip, currentLang)}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-[#67635A] space-x-2">
              <a href={company.emailHref} className="hover:text-[#181816] transition-colors">
                {company.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={company.phoneHref} className="hover:text-[#181816] transition-colors">
                {company.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
