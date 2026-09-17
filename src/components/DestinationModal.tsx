import React, { useRef } from 'react';
import { X, ArrowUpRight, Calendar, Compass, CheckCircle2 } from 'lucide-react';
import { Destination, Language } from '../types';
import { getTranslation, translations } from '../data/translations';
import { useDialog } from '../hooks/useDialog';
import { ResponsivePhoto } from './ResponsivePhoto';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  currentLang: Language;
  onPlanTripForDestination: (destName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  currentLang,
  onPlanTripForDestination,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isOpen = destination !== null;

  useDialog({
    isOpen,
    onClose,
    dialogRef,
    initialFocusRef: titleRef,
  });

  if (!destination) return null;

  const destName = getTranslation(destination.name, currentLang);
  const titleId = 'destination-modal-title';
  const closeLabel = getTranslation(translations.tripModal.close, currentLang);

  return (
    <div
      id="destination-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#ECE6DA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20 backdrop-blur-sm"
          aria-label={closeLabel}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative aspect-16/9 w-full bg-[#181816]">
          <ResponsivePhoto
            src={destination.imageUrl}
            alt={destName}
            className="w-full h-full object-cover"
            loading="eager"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white">
            <span className="text-xs uppercase tracking-wider text-[#E09074] font-medium block mb-2">
              {getTranslation(destination.region, currentLang)}
            </span>
            <h2
              id={titleId}
              ref={titleRef}
              tabIndex={-1}
              className="font-serif text-3xl sm:text-5xl font-medium tracking-tight outline-none"
            >
              {destName}
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-light mt-1">
              {getTranslation(destination.subtitle, currentLang)}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Narrative */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#7A7569] font-medium mb-3">
              {currentLang === 'ET' ? 'Teekonna iseloom' : currentLang === 'RU' ? 'Характер маршрута' : 'Itinerary Character'}
            </h3>
            <p className="text-[#54514B] text-base sm:text-lg font-light leading-relaxed">
              {getTranslation(destination.description, currentLang)}
            </p>
          </div>

          {/* Highlights List */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#7A7569] font-medium mb-4">
              {currentLang === 'ET' ? 'Kureeritud elamused' : currentLang === 'RU' ? 'Избранные моменты' : 'Curated Highlights'}
            </h3>
            <div className="space-y-3">
              {(destination.highlights[currentLang] || destination.highlights.ET).map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-[#484641] font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#B85A38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Style and Seasonality Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#F5F2EB] border border-[#DDD5C7]">
            <div className="flex items-start space-x-3">
              <Calendar className="w-4 h-4 text-[#B85A38] shrink-0 mt-1" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#7A7569] font-medium">
                  {currentLang === 'ET' ? 'Parim aeg külastamiseks' : currentLang === 'RU' ? 'Лучшее время для визита' : 'Best Season to Visit'}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#181816] mt-0.5">
                  {getTranslation(destination.bestSeason, currentLang)}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Compass className="w-4 h-4 text-[#B85A38] shrink-0 mt-1" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#7A7569] font-medium">
                  {currentLang === 'ET' ? 'Reisistiil' : currentLang === 'RU' ? 'Стиль отдыха' : 'Travel Style'}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#181816] mt-0.5">
                  {getTranslation(destination.travelStyle, currentLang)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#ECE6DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#8C887B] text-center sm:text-left">
              {currentLang === 'ET'
                ? 'Iga teekond pannakse kokku vastavalt Sinu täpsetele soovidele.'
                : currentLang === 'RU'
                ? 'Маршрут формируется индивидуально с учетом ваших пожеланий.'
                : 'Every itinerary is customized to your exact expectations.'}
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onPlanTripForDestination(destName);
              }}
              className="w-full sm:w-auto bg-[#181816] text-[#FAF8F5] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#32312D] transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>
                {currentLang === 'ET'
                  ? `Planeeri reis: ${destName}`
                  : currentLang === 'RU'
                  ? `Запросить поездку: ${destName}`
                  : `Plan journey to ${destName}`}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
