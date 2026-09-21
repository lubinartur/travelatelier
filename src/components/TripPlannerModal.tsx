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

const MAX_ADULTS = 10;
const MAX_CHILDREN = 8;
const MAX_CHILD_AGE = 17;

const labelClass = 'block text-xs uppercase tracking-wider text-[#54514B] font-medium mb-2';
const fieldClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#DDD5C7] text-sm text-[#181816] focus:outline-none focus:border-[#B85A38] focus:ring-1 focus:ring-[#B85A38]';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const Required: React.FC = () => (
  <span aria-hidden="true" className="text-[#A04E32] ml-0.5">
    *
  </span>
);

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialDestination = '',
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [selectedStyle, setSelectedStyle] = useState('relax');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [childAges, setChildAges] = useState<string[]>([]);
  const [dates, setDates] = useState('');
  const [durationValue, setDurationValue] = useState('');
  const [durationUnit, setDurationUnit] = useState<'nights' | 'days'>('nights');
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

  const handleChildrenChange = (value: string) => {
    const count = Number(value);
    setChildren(value);
    setChildAges((current) => Array.from({ length: count }, (_, i) => current[i] ?? ''));
  };

  const handleChildAgeChange = (index: number, value: string) => {
    setChildAges((current) => current.map((age, i) => (i === index ? value : age)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tm = translations.tripModal;
    const line = (label: string, value: string) => `${label}: ${value.trim() || '—'}`;
    const styleLabel = getTranslation(
      tm.styles.find((style) => style.id === selectedStyle) ?? tm.styles[0],
      currentLang
    );
    const agesText = childAges
      .map((age) => (age === '0' ? getTranslation(tm.childAgeUnderOne, currentLang) : age))
      .join(', ');
    const durationUnitText = getTranslation(
      durationUnit === 'nights' ? tm.durationNights : tm.durationDays,
      currentLang
    );
    const body = [
      line(getTranslation(tm.destinationLabel, currentLang), destination),
      line(getTranslation(tm.travelStyleLabel, currentLang), styleLabel),
      line(getTranslation(tm.adultsLabel, currentLang), adults),
      line(getTranslation(tm.childrenLabel, currentLang), children),
      ...(childCount > 0 ? [line(getTranslation(tm.childAgesLegend, currentLang), agesText)] : []),
      line(getTranslation(tm.datesLabel, currentLang), dates),
      line(getTranslation(tm.durationLabel, currentLang), `${durationValue} ${durationUnitText}`),
      line(getTranslation(tm.nameLabel, currentLang), name),
      line(getTranslation(tm.emailLabel, currentLang), email),
      line(getTranslation(tm.phoneLabel, currentLang), phone),
      '',
      line(getTranslation(tm.notesLabel, currentLang), notes),
    ].join('\n');
    const subject = getTranslation(tm.mailSubject, currentLang).replace(
      '{destination}',
      destination.trim() || getTranslation(tm.mailOpenDestination, currentLang)
    );
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const t = translations.tripModal;
  const titleId = 'trip-planner-title';
  const noticeId = 'trip-planner-unavailable';
  const closeLabel = getTranslation(t.close, currentLang);
  const childCount = Number(children);

  return (
    <div
      id="trip-planner-modal"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={noticeId}
        className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[92dvh] flex flex-col bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#ECE6DA] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header: title and close stay visible while the form scrolls */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 sm:px-12 pt-5 sm:pt-10 pb-4 border-b border-[#ECE6DA]">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.26em] text-[#A04E32] font-mono block mb-1">
              Travel Atelier
            </span>
            <h2
              id={titleId}
              ref={titleRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-4xl font-medium text-[#181816] tracking-tight outline-none"
            >
              {getTranslation(t.title, currentLang)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 -mr-2 sm:-mr-4 w-11 h-11 flex items-center justify-center rounded-full text-[#54514B] hover:text-[#181816] hover:bg-[#ECE6DA]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32]"
            aria-label={closeLabel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 sm:px-12 pt-6 pb-8 sm:pb-12">
          <p className="text-[#67635A] text-xs sm:text-sm font-light">
            {getTranslation(t.subtitle, currentLang)}
          </p>
          <p
            id={noticeId}
            role="status"
            className="text-[#67635A] text-xs sm:text-sm font-light mt-3"
          >
            {getTranslation(t.unavailableNotice, currentLang)}
          </p>
          <p className="text-[#67635A] text-xs font-light mt-3 mb-8">
            {getTranslation(t.requiredNote, currentLang)}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label htmlFor="trip-destination" className={labelClass}>
                {getTranslation(t.destinationLabel, currentLang)}
              </label>
              <input
                id="trip-destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={getTranslation(t.destinationPlaceholder, currentLang)}
                className={fieldClass}
              />
            </div>

            {/* Travel Style Pills */}
            <div role="group" aria-labelledby="trip-style-label">
              <span id="trip-style-label" className={`${labelClass} mb-2.5`}>
                {getTranslation(t.travelStyleLabel, currentLang)}
              </span>
              <div className="flex flex-wrap gap-2">
                {t.styles.map((style) => (
                  <button
                    type="button"
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    aria-pressed={selectedStyle === style.id}
                    className={`text-xs px-3.5 py-2 rounded-full border transition-all ${
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

            {/* Travellers: adults and children */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="trip-adults" className={labelClass}>
                  {getTranslation(t.adultsLabel, currentLang)}
                  <Required />
                </label>
                <select
                  id="trip-adults"
                  required
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className={fieldClass}
                >
                  {range(1, MAX_ADULTS).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="trip-children" className={labelClass}>
                  {getTranslation(t.childrenLabel, currentLang)}
                  <Required />
                </label>
                <select
                  id="trip-children"
                  required
                  value={children}
                  onChange={(e) => handleChildrenChange(e.target.value)}
                  className={fieldClass}
                >
                  {range(0, MAX_CHILDREN).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* One age per child — required only when children > 0 */}
            {childCount > 0 && (
              <fieldset>
                <legend className={labelClass}>
                  {getTranslation(t.childAgesLegend, currentLang)}
                  <Required />
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {childAges.map((age, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`trip-child-age-${index}`}
                        className="block text-xs text-[#54514B] mb-1.5"
                      >
                        {getTranslation(t.childAgeLabel, currentLang).replace(
                          '{n}',
                          String(index + 1)
                        )}
                      </label>
                      <select
                        id={`trip-child-age-${index}`}
                        required
                        value={age}
                        onChange={(e) => handleChildAgeChange(index, e.target.value)}
                        className={fieldClass}
                      >
                        <option value="" disabled />
                        {range(0, MAX_CHILD_AGE).map((n) => (
                          <option key={n} value={n}>
                            {n === 0 ? getTranslation(t.childAgeUnderOne, currentLang) : n}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Dates and length are separate on purpose: clients often give only one of them */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="trip-dates" className={labelClass}>
                  {getTranslation(t.datesLabel, currentLang)}
                  <Required />
                </label>
                <input
                  id="trip-dates"
                  type="text"
                  required
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder={getTranslation(t.datesPlaceholder, currentLang)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="trip-duration" className={labelClass}>
                  {getTranslation(t.durationLabel, currentLang)}
                  <Required />
                </label>
                <div className="flex gap-2">
                  <input
                    id="trip-duration"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={60}
                    required
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                    placeholder={getTranslation(t.durationPlaceholder, currentLang)}
                    className={`${fieldClass.replace('w-full','flex-1')} min-w-0`}
                  />
                  <select
                    aria-label={getTranslation(t.durationUnitLabel, currentLang)}
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as 'nights' | 'days')}
                    className={`${fieldClass.replace('w-full','w-28')} shrink-0`}
                  >
                    <option value="nights">{getTranslation(t.durationNights, currentLang)}</option>
                    <option value="days">{getTranslation(t.durationDays, currentLang)}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact info: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label htmlFor="trip-name" className={labelClass}>
                  {getTranslation(t.nameLabel, currentLang)}
                  <Required />
                </label>
                <input
                  id="trip-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="trip-email" className={labelClass}>
                  {getTranslation(t.emailLabel, currentLang)}
                  <Required />
                </label>
                <input
                  id="trip-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="trip-phone" className={labelClass}>
                  {getTranslation(t.phoneLabel, currentLang)}
                </label>
                <input
                  id="trip-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+372 ..."
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Special wishes */}
            <div>
              <label htmlFor="trip-notes" className={labelClass}>
                {getTranslation(t.notesLabel, currentLang)}
              </label>
              <textarea
                id="trip-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={getTranslation(t.notesPlaceholder, currentLang)}
                className={`${fieldClass} resize-none`}
              />
            </div>

            {/* Submit CTA — opens the visitor's mail app; nothing is sent by the site itself */}
            <div className="pt-4">
              <button
                type="submit"
                aria-describedby={noticeId}
                className="w-full bg-[#181816] text-[#FAF8F5] py-4 rounded-full text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center space-x-2 shadow-md transition-colors hover:bg-[#32312D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{getTranslation(t.submit, currentLang)}</span>
              </button>
              <p className="text-center text-[11px] text-[#67635A] mt-3">
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
