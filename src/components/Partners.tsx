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
              <ul>
                {partners.map((partner) => (
                  <li key={partner.id} className="border-t border-[#ECE6DA] last:border-b">
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={getTranslation(partner.linkLabel, currentLang)}
                      className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-8 py-6 sm:py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]"
                    >
                      <span className="font-serif text-2xl sm:text-3xl lg:text-[2.125rem] font-medium text-[#181816] tracking-tight group-hover:text-[#A04E32] transition-colors">
                        {partner.name}
                      </span>
                      <span className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#67635A] group-hover:text-[#A04E32] transition-colors shrink-0">
                        <span>{getTranslation(translations.partners.visitSite, currentLang)}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
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
