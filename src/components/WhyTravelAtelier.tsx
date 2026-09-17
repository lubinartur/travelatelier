import React, { useRef, useEffect, useState } from 'react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll, EditorialParallaxLayer } from './EditorialMotion';
import { ResponsivePhoto } from './ResponsivePhoto';
import { COLUMN_SIZES, COLUMN_SRC_WIDTHS } from '../lib/images';
import { useWarmedIndexes } from '../hooks/useWarmedIndexes';

interface WhyTravelAtelierProps {
  currentLang: Language;
}

const PILLAR_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85',
    caption: {
      ET: '01 · Isiklik dialoog ja rätsepatöö',
      RU: '01 · Живой диалог и авторский подход',
      EN: '01 · Personal dialogue & bespoke design',
    },
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    caption: {
      ET: '02 · Majutus reisi rütmi järgi',
      RU: '02 · Проживание под ритм поездки',
      EN: '02 · Stays shaped around the trip',
    },
  },
  {
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
    caption: {
      ET: '03 · Kindel tugi kogu teekonnal',
      RU: '03 · Надежная поддержка на каждом этапе',
      EN: '03 · Steadfast support throughout',
    },
  },
  {
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
    caption: {
      ET: '04 · Sihtkohtade tõeline olemus',
      RU: '04 · Подлинный характер мест',
      EN: '04 · Authentic destination character',
    },
  },
];

export const WhyTravelAtelier: React.FC<WhyTravelAtelierProps> = ({ currentLang }) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { warmed, warm, warmAll } = useWarmedIndexes(
    activePillarIndex,
    PILLAR_IMAGES.length
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
      id="why-us"
      className="py-24 sm:py-36 bg-[#181816] text-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Top Header with Reveal */}
        <RevealOnScroll threshold={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-16 border-b border-white/10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-3 mb-4">
                <span className="h-[1px] w-8 bg-[#E09074]" />
                <span className="text-xs uppercase tracking-wider font-medium text-[#E09074]">
                  {getTranslation(translations.whyUs.tagline, currentLang)}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
                {getTranslation(translations.whyUs.title, currentLang)}
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
                {getTranslation(translations.whyUs.lead, currentLang)}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Editorial Storytelling Layout: Visual Vertical Anchor (Left) + 4 Large Numbered Statements (Right) */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Full-Height Travel Photography Anchor with Parallax/Scale */}
          <div className="lg:col-span-5 flex flex-col">
            <RevealOnScroll variant="media" distance={14} threshold={0.12} className="h-full">
            <div className="relative w-full h-full min-h-[480px] lg:min-h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
              <EditorialParallaxLayer>
                {PILLAR_IMAGES.map((img, idx) =>
                  warmed.has(idx) ? (
                  <ResponsivePhoto
                    key={idx}
                    src={img.url}
                    alt={getTranslation(img.caption, currentLang)}
                    widths={COLUMN_SRC_WIDTHS}
                    sizes={COLUMN_SIZES}
                    fallbackWidth={1200}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activePillarIndex === idx
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  />
                  ) : null
                )}
              </EditorialParallaxLayer>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
            </RevealOnScroll>
          </div>

          {/* Right: Four numbered statements; copy is visible without staggered wait */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
            {translations.whyUs.points.map((point, idx) => {
              const isActive = activePillarIndex === idx;
              return (
                  <button
                    key={idx}
                    type="button"
                    onMouseEnter={() => {
                      warm(idx);
                      setActivePillarIndex(idx);
                    }}
                    onClick={() => setActivePillarIndex(idx)}
                    aria-pressed={isActive}
                    className={`group w-full text-left p-7 sm:p-8 rounded-2xl transition-all duration-400 ease-out border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E09074]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181816] ${
                      isActive
                        ? 'border-white/15 bg-white/[0.05] shadow-[0_12px_30px_rgba(0,0,0,0.2)] opacity-100 -translate-y-0.5'
                        : 'border-transparent hover:border-white/10 hover:bg-white/[0.025] opacity-60 hover:opacity-90'
                    }`}
                  >
                    <span className="text-xs font-mono tracking-wider text-[#E09074] uppercase block mb-2 font-medium">
                      {point.num || `0${idx + 1}`}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-3 tracking-tight leading-snug">
                      {getTranslation(point.title, currentLang)}
                    </h3>

                    <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                      {getTranslation(point.desc, currentLang)}
                    </p>
                  </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
