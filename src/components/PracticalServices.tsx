import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { company } from '../data/company';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll } from './EditorialMotion';
import estoWordmark from '../assets/esto-wordmark.svg?url';

interface PracticalServicesProps {
  currentLang: Language;
}

const inquireLinkClassName =
  'inline-flex items-center space-x-1.5 font-medium text-[#181816] hover:text-[#A04E32] transition-colors group min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EB]';

const columnBodyClassName = 'flex h-full flex-col';
const columnFooterClassName =
  'mt-auto pt-6 border-t border-[#DDD5C7]';
const columnFooterRowClassName =
  'flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3 min-h-10';

export const PracticalServices: React.FC<PracticalServicesProps> = ({
  currentLang,
}) => {
  const inquireLabel = getTranslation(translations.practical.inquire, currentLang);

  return (
    <section
      id="insurance"
      className="py-24 sm:py-32 bg-[#F5F2EB] border-y border-[#DDD5C7]/70 text-[#181816]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <RevealOnScroll threshold={0.2}>
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-[1px] w-6 bg-[#B85A38]" />
              <span className="text-xs uppercase tracking-wider font-medium text-[#67635A]">
                {getTranslation(translations.practical.tagline, currentLang)}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#181816] tracking-tight">
              {getTranslation(translations.practical.title, currentLang)}
            </h2>
          </div>
        </RevealOnScroll>

        {/* Editorial Two-Column Service Composition - equal structure and footer height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 divide-y lg:divide-y-0 lg:divide-x divide-[#DDD5C7] items-stretch">
          {/* Column 1: ESTO instalments — keep on the page; do not remove without owner approval */}
          <RevealOnScroll className="h-full" distance={16} threshold={0.15}>
            <div id="esto" className={`${columnBodyClassName} scroll-mt-24 pt-0 pb-12 lg:pb-0 lg:pr-12`}>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#181816] mb-4">
                  {getTranslation(translations.practical.esto.title, currentLang)}
                </h3>

                <p className="text-sm sm:text-base text-[#54514B] font-light leading-relaxed mb-8">
                  {getTranslation(translations.practical.esto.desc, currentLang)}
                </p>
              </div>

              <div className={columnFooterClassName}>
                <div className={columnFooterRowClassName}>
                  <a href={company.emailHref} className={inquireLinkClassName}>
                    <span>{inquireLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <div className="h-10 px-3.5 rounded bg-[#FAF8F5] border border-[#DDD5C7] flex items-center justify-center shadow-xs shrink-0">
                    <img
                      src={estoWordmark}
                      alt="ESTO"
                      className="h-[18px] w-auto"
                      width={92}
                      height={32}
                    />
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Column 2: Travel insurance */}
          <RevealOnScroll className="h-full" distance={16} delay={0.15} threshold={0.15}>
            <div className={`${columnBodyClassName} pt-12 lg:pt-0 lg:pl-16`}>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#181816] mb-4">
                  {getTranslation(translations.practical.insurance.title, currentLang)}
                </h3>

                <p className="text-sm sm:text-base text-[#54514B] font-light leading-relaxed mb-8">
                  {getTranslation(translations.practical.insurance.desc, currentLang)}
                </p>
              </div>

              <div className={columnFooterClassName}>
                <div className={columnFooterRowClassName}>
                  <a href={company.emailHref} className={inquireLinkClassName}>
                    <span>{inquireLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};
