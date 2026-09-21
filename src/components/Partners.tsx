import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { partners } from '../data/partners';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll } from './EditorialMotion';

interface PartnersProps {
  currentLang: Language;
}

export const Partners: React.FC<PartnersProps> = ({ currentLang }) => {
  return (
    <section
      id="partners"
      className="py-24 sm:py-32 lg:py-40 bg-[#FAF8F5] relative border-t border-[#ECE6DA]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <RevealOnScroll distance={16} threshold={0.15}>
              <div className="flex items-center space-x-3 mb-4">
                <span className="h-[1px] w-8 bg-[#B85A38]" />
                <span className="text-xs uppercase tracking-wider font-medium text-[#67635A]">
                  {getTranslation(translations.partners.tagline, currentLang)}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#181816] tracking-tight leading-[1.12] mb-8">
                {getTranslation(translations.partners.title, currentLang)}
              </h2>

              <p className="text-[#54514B] text-base sm:text-lg font-light leading-relaxed max-w-xl">
                {getTranslation(translations.partners.intro, currentLang)}
              </p>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7 lg:pt-10">
            <RevealOnScroll distance={12} threshold={0.12}>
              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {partners.map((partner) => (
                  <li key={partner.id}>
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={getTranslation(partner.linkLabel, currentLang)}
                      title={partner.name}
                      className="group relative flex h-28 sm:h-32 items-center justify-center rounded-2xl border border-[#ECE6DA] bg-white px-6 transition-all duration-300 hover:border-[#DDD5C7] hover:shadow-[0_12px_32px_rgba(24,24,22,0.07)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="lazy"
                        className={`${partner.logoHeight} w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105`}
                      />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="absolute right-3.5 top-3.5 h-3.5 w-3.5 text-[#67635A] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
