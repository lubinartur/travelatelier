import React from 'react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { RevealOnScroll, EditorialImageMask } from './EditorialMotion';

interface BrandStatementProps {
  currentLang: Language;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ currentLang }) => {
  return (
    <section
      id="brand-statement-section"
      className="py-24 sm:py-32 lg:py-40 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Subtle Section Marker */}
        <RevealOnScroll distance={12} threshold={0.2}>
          <div className="flex items-center space-x-3 mb-10 md:mb-16">
            <span className="h-[1px] w-8 bg-[#B85A38]" />
            <span className="text-xs uppercase tracking-wider font-medium text-[#67635A]">
              {getTranslation(translations.brandStatement.eyebrow, currentLang)}
            </span>
          </div>
        </RevealOnScroll>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Statement - Immense Typography with soft reveal */}
          <div className="lg:col-span-8">
            <RevealOnScroll distance={18} threshold={0.15}>
              <h2
                id="statement-headline"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181816] font-medium leading-[1.14] tracking-tight mb-10"
              >
                “{getTranslation(translations.brandStatement.headline, currentLang)}”
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#54514B] text-base md:text-lg font-light leading-relaxed">
                <p>{getTranslation(translations.brandStatement.paragraph1, currentLang)}</p>
                <p>{getTranslation(translations.brandStatement.paragraph2, currentLang)}</p>
              </div>

              <div className="mt-12 pt-8 border-t border-[#ECE6DA] text-xs text-[#67635A] tracking-wider uppercase font-medium">
                <span>{getTranslation(translations.brandStatement.authorTitle, currentLang)}</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Supporting Visual Vignette - Editorial Image Mask Reveal */}
          <div className="lg:col-span-4 mt-4 lg:mt-8">
            <EditorialImageMask
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=85"
              alt="Italian coastal stone architecture"
              aspectRatio="aspect-3/4"
              caption="Vernazza, Liguria"
              className="shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)]"
              parallax
            />
          </div>
        </div>
      </div>
    </section>
  );
};
