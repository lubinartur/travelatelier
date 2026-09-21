import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { company } from '../data/company';
import { translations, getTranslation } from '../data/translations';
import { LanguageDropdown } from './LanguageDropdown';
import { AppLink } from './AppLink';

interface FooterProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenTripModal: () => void;
  variant?: 'home' | 'page';
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSelectLang,
  onOpenTripModal,
  variant = 'home',
  currentPath = '/',
  onNavigate,
}) => {
  const sectionPrefix = variant === 'page' ? '/' : '';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#121312] text-[#ECE6DA] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <AppLink href={variant === 'page' ? '/' : '#'} onNavigate={onNavigate} className="inline-block mb-6">
              <span className="font-serif tracking-[0.2em] text-2xl font-light uppercase text-white block">
                Travel Atelier
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C887B] block mt-1">
                {company.legalName}
              </span>
            </AppLink>

            <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm mb-6">
              {getTranslation(translations.footer.desc, currentLang)}
            </p>

            {/* Language Selector Dropdown */}
            <div className="pt-1">
              <LanguageDropdown
                currentLang={currentLang}
                onSelectLang={onSelectLang}
                theme="footer"
                id="footer-language-dropdown"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-5">
              {getTranslation(translations.footer.navigationHeading, currentLang)}
            </h4>
            <ul className="space-y-3 text-sm text-white/75 font-light">
              <li>
                <AppLink href={`${sectionPrefix}#destinations`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.destinations, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink href={`${sectionPrefix}#how-it-works`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.howItWorks, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink href={`${sectionPrefix}#why-us`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.whyUs, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink href={`${sectionPrefix}#partners`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.partners, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink href={`${sectionPrefix}#insurance`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.insurance, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink href={`${sectionPrefix}#esto`} onNavigate={onNavigate} className="hover:text-white transition-colors">
                  {getTranslation(translations.nav.esto, currentLang)}
                </AppLink>
              </li>
              <li>
                <button
                  onClick={onOpenTripModal}
                  className="hover:text-[#E09074] transition-colors text-left cursor-pointer"
                >
                  {getTranslation(translations.nav.planTrip, currentLang)}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-5">
              {getTranslation(translations.nav.contact, currentLang)}
            </h4>
            <div className="space-y-4 text-sm text-white/75 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#E09074] shrink-0 mt-0.5" />
                <span>{company.legalAddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#E09074] shrink-0" />
                <a
                  href={company.emailHref}
                  className="hover:text-white transition-colors"
                >
                  {company.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#E09074] shrink-0" />
                <a href={company.phoneHref} className="hover:text-white transition-colors">
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Legal and Registration */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-5">
              {getTranslation(translations.footer.legalHeading, currentLang)}
            </h4>
            <ul className="space-y-3 text-sm text-white/75 font-light">
              <li>
                <AppLink
                  href="/terms"
                  onNavigate={onNavigate}
                  ariaCurrent={currentPath === '/terms' ? 'page' : undefined}
                  className="hover:text-white transition-colors"
                >
                  {getTranslation(translations.footer.legalTerms, currentLang)}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href="/privacy"
                  onNavigate={onNavigate}
                  ariaCurrent={currentPath === '/privacy' ? 'page' : undefined}
                  className="hover:text-white transition-colors"
                >
                  {getTranslation(translations.footer.privacy, currentLang)}
                </AppLink>
              </li>
              <li>
                {getTranslation(translations.footer.license, currentLang)}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-light">
          <div className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} {company.legalName}. {getTranslation(translations.footer.copyright, currentLang)}
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <span>{currentLang === 'ET' ? 'Üles tagasi' : currentLang === 'RU' ? 'Наверх' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
