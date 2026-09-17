import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { howItWorksSteps } from '../data/destinations';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll, EditorialParallaxLayer } from './EditorialMotion';
import { ResponsivePhoto } from './ResponsivePhoto';
import { COLUMN_SIZES, COLUMN_SRC_WIDTHS } from '../lib/images';
import { useWarmedIndexes } from '../hooks/useWarmedIndexes';

interface HowItWorksProps {
  currentLang: Language;
  onOpenTripModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  currentLang,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { warmed, warm, warmAll } = useWarmedIndexes(
    activeStepIndex,
    howItWorksSteps.length
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          warmAll();
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [warmAll]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 sm:py-32 lg:py-40 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <RevealOnScroll threshold={0.2}>
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-[1px] w-8 bg-[#B85A38]" />
              <span className="text-xs uppercase tracking-wider font-medium text-[#67635A]">
                {getTranslation(translations.howItWorks.tagline, currentLang)}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#181816] tracking-tight mb-6">
              {getTranslation(translations.howItWorks.title, currentLang)}
            </h2>
            <p className="text-[#67635A] text-base sm:text-lg font-light leading-relaxed">
              {getTranslation(translations.howItWorks.subtitle, currentLang)}
            </p>
          </div>
        </RevealOnScroll>

        {/* Editorial Interactive Stage / Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Left Column: Interactive Step Progression (Manual selection) */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 justify-between">
            {howItWorksSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  type="button"
                  id={`process-step-${step.step}`}
                  onMouseEnter={() => warm(idx)}
                  onFocus={() => warm(idx)}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-6 sm:p-7 rounded-2xl transition-all duration-300 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] ${
                    isActive
                      ? 'bg-[#F5F2EB] border-[#DDD5C7] shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-[#DDD5C7]/70 opacity-100'
                      : 'bg-[#FAF8F5] border-[#E8E1D5] hover:bg-[#F5F2EB]/50 hover:border-[#DDD5C7] opacity-80 hover:opacity-100'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start space-x-5">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all duration-300 shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-[#181816] text-[#FAF8F5] border-[#181816]'
                          : 'bg-[#ECE6DA] text-[#67635A] border-[#DDD5C7]'
                      }`}
                    >
                      {step.step}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-serif text-xl sm:text-2xl font-medium transition-colors duration-300 mb-2 ${
                          isActive ? 'text-[#181816]' : 'text-[#2C2A26]'
                        }`}
                      >
                        {getTranslation(step.title, currentLang)}
                      </h3>

                      <p
                        className={`text-sm sm:text-base font-light leading-relaxed mb-3 transition-colors duration-300 ${
                          isActive ? 'text-[#484641]' : 'text-[#5C5850]'
                        }`}
                      >
                        {getTranslation(step.description, currentLang)}
                      </p>

                      {isActive && (
                        <div className="pt-3 border-t border-[#DDD5C7]/70 flex items-center space-x-2 text-xs text-[#A04E32] font-medium tracking-wide animate-fade-in">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{getTranslation(step.detail, currentLang)}</span>
                        </div>
                      )}

                      {/* Mobile lightweight accordion image */}
                      {isActive && warmed.has(idx) && (
                        <div className="lg:hidden mt-4 rounded-xl overflow-hidden aspect-16/9 relative bg-[#ECE6DA] shadow-xs">
                          <ResponsivePhoto
                            src={step.imageUrl}
                            alt={getTranslation(step.title, currentLang)}
                            widths={COLUMN_SRC_WIDTHS}
                            sizes="100vw"
                            fallbackWidth={1200}
                            className="w-full h-full object-cover transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 text-white text-xs font-light">
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20">
                              {step.step} · Atelier Protocol
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Desktop Visual Frame aligned with left column height */}
          <div className="hidden lg:flex lg:col-span-6 flex-col h-full">
            <RevealOnScroll variant="media" distance={14} threshold={0.12} className="h-full">
            <div className="w-full h-full min-h-[520px] rounded-3xl overflow-hidden bg-[#ECE6DA] relative shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              <EditorialParallaxLayer>
              {howItWorksSteps.map((step, idx) =>
                warmed.has(idx) ? (
                <ResponsivePhoto
                  key={step.step}
                  src={step.imageUrl}
                  alt={getTranslation(step.title, currentLang)}
                  widths={COLUMN_SRC_WIDTHS}
                  sizes={COLUMN_SIZES}
                  fallbackWidth={1200}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    activeStepIndex === idx
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                />
                ) : null
              )}
              </EditorialParallaxLayer>

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

              {/* Bottom active step pill */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-light pointer-events-none">
                <span className="font-mono uppercase tracking-widest text-[11px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/20">
                  {howItWorksSteps[activeStepIndex].step} · Atelier Protocol
                </span>
                <span className="font-serif italic text-sm text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/20">
                  {getTranslation(howItWorksSteps[activeStepIndex].title, currentLang)}
                </span>
              </div>
            </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
