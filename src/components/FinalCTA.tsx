import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll, EditorialParallaxLayer } from './EditorialMotion';
import { ResponsivePhoto } from './ResponsivePhoto';
import { FULL_BLEED_SIZES, FULL_BLEED_WIDTHS } from '../lib/images';

interface FinalCTAProps {
  currentLang: Language;
  onOpenTripModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ currentLang, onOpenTripModal }) => {
  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] overflow-hidden"
    >
      {/* Outer framing container with cinematic photo backdrop */}
      <div className="max-w-7xl mx-auto relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl bg-[#181816] group">
        {/* Background Image: evocative golden hour / sea horizon with soft zoom */}
        <EditorialParallaxLayer>
          <ResponsivePhoto
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=90"
            alt=""
            widths={FULL_BLEED_WIDTHS}
            sizes={FULL_BLEED_SIZES}
            fallbackWidth={1600}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-103"
          />
        </EditorialParallaxLayer>

        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35 pointer-events-none" />

        {/* Content with soft viewport reveal */}
        <RevealOnScroll distance={16} threshold={0.2}>
          <div className="relative z-10 px-8 py-20 sm:p-16 lg:p-24 text-center max-w-4xl mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-white font-medium mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Travel Atelier
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-medium text-white tracking-tight leading-[1.08] mb-6">
              {getTranslation(translations.finalCta.headline, currentLang)}
            </h2>

            <p className="text-white text-base sm:text-xl font-light leading-relaxed max-w-2xl mb-10">
              {getTranslation(translations.finalCta.description, currentLang)}
            </p>

            <button
              id="final-plan-trip-cta"
              onClick={onOpenTripModal}
              className="group/btn bg-[#FAF8F5] text-[#181816] px-10 py-5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex items-center space-x-3 cursor-pointer"
            >
              <span>{getTranslation(translations.finalCta.button, currentLang)}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
