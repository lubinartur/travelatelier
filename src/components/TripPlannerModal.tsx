import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Language } from '../types';
import { company } from '../data/company';
import { translations, getTranslation } from '../data/translations';
import { useDialog } from '../hooks/useDialog';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialDestination?: string;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialDestination = '',
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [selectedStyle, setSelectedStyle] = useState('relax');
  const [timing, setTiming] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useDialog({
    isOpen,
    onClose,
    dialogRef,
    initialFocusRef: titleRef,
  });

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const titleId = 'trip-planner-title';
  const noticeId = 'trip-planner-unavailable';
  const closeLabel = getTranslation(translations.tripModal.close, currentLang);

  return (
    <div
      id="trip-planner-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={noticeId}
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#ECE6DA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#7A7569] hover:text-[#181816] hover:bg-[#ECE6DA]/60 transition-colors z-10"
          aria-label={closeLabel}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.26em] text-[#B85A38] font-mono block mb-2">
              Travel Atelier
            </span>
            <h2
              id={titleId}
              ref={titleRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-4xl font-medium text-[#181816] mb-2 tracking-tight outline-none"
            >
              {getTranslation(translations.tripModal.title, currentLang)}
            </h2>
            <p className="text-[#7A7569] text-xs sm:text-sm font-light">
              {getTranslation(translations.tripModal.subtitle, currentLang)}
            </p>
            <p
              id={noticeId}
              role="status"
              className="text-[#7A7569] text-xs sm:text-sm font-light mt-3"
            >
              {getTranslation(translations.tripModal.unavailableNotice, currentLang)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                {getTranslation(translations.tripModal.destinationLabel, currentLang)}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={getTranslation(
                  translations.tripModal.destinationPlaceholder,
                  currentLang
                )}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38] focus:ring-1 focus:ring-[#B85A38]"
              />
            </div>

            {/* Travel Style Pills */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2.5">
                {getTranslation(translations.tripModal.travelStyleLabel, currentLang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {translations.tripModal.styles.map((style) => (
                  <button
                    type="button"
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      selectedStyle === style.id
                        ? 'bg-[#181816] text-[#FAF8F5] border-[#181816]'
                        : 'bg-white text-[#54514B] border-[#DDD5C7] hover:border-[#181816]'
                    }`}
                  >
                    {getTranslation(style, currentLang)}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing & Party Size Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                  {getTranslation(translations.tripModal.timingLabel, currentLang)}
                </label>
                <input
                  type="text"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder={getTranslation(
                    translations.tripModal.timingPlaceholder,
                    currentLang
                  )}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                  {getTranslation(translations.tripModal.travelersLabel, currentLang)}
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38]"
                >
                  <option value="1">1 {currentLang === 'ET' ? 'reisija' : currentLang === 'RU' ? 'путешественник' : 'traveler'}</option>
                  <option value="2">2 {currentLang === 'ET' ? 'reisijat' : currentLang === 'RU' ? 'путешественника' : 'travelers'}</option>
                  <option value="3-4">3–4 {currentLang === 'ET' ? 'reisijat' : currentLang === 'RU' ? 'путешественника' : 'travelers'}</option>
                  <option value="5+">5+ {currentLang === 'ET' ? 'reisijat (pere / seltskond)' : currentLang === 'RU' ? 'человек (семья / компания)' : 'travelers (family / private group)'}</option>
                </select>
              </div>
            </div>

            {/* Contact info: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                  {getTranslation(translations.tripModal.nameLabel, currentLang)}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                  {getTranslation(translations.tripModal.emailLabel, currentLang)}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                  {getTranslation(translations.tripModal.phoneLabel, currentLang)}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+372 ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38]"
                />
              </div>
            </div>

            {/* Special wishes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2">
                {getTranslation(translations.tripModal.notesLabel, currentLang)}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={getTranslation(
                  translations.tripModal.notesPlaceholder,
                  currentLang
                )}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38] resize-none"
              />
            </div>

            {/* Submit CTA — disabled until a delivery channel exists */}
            <div className="pt-4">
              <button
                type="submit"
                disabled
                aria-describedby={noticeId}
                className="w-full bg-[#181816] text-[#FAF8F5] py-4 rounded-full text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center space-x-2 shadow-md opacity-50 cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{getTranslation(translations.tripModal.submit, currentLang)}</span>
              </button>
              <p className="text-center text-[11px] text-[#8C887B] mt-3">
                {company.legalName}
                {' · '}
                <a href={company.emailHref} className="hover:text-[#181816] transition-colors">
                  {company.email}
                </a>
                {' · '}
                <a href={company.phoneHref} className="hover:text-[#181816] transition-colors">
                  {company.phoneDisplay}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
