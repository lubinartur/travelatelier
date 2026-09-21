import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import {
  addDays,
  addMonths,
  formatDepartureRange,
  formatMonthTitle,
  getFullDateLabel,
  getWeekdayLabels,
  isSameDay,
  startOfDay,
  toIsoDate,
} from '../lib/dates';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DatePickerProps {
  id: string;
  lang: Language;
  value: DateRange;
  onChange: (range: DateRange) => void;
  minDate: Date;
  maxDate: Date;
  placeholder: string;
  fieldClassName: string;
  invalid?: boolean;
  describedBy?: string;
}

const monthKey = (date: Date) => date.getFullYear() * 12 + date.getMonth();

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  lang,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  fieldClassName,
  invalid = false,
  describedBy,
}) => {
  const t = translations.tripModal;
  const min = startOfDay(minDate);
  const max = startOfDay(maxDate);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState<Date>(() => addMonths(value.start ?? min, 0));
  const [focusDate, setFocusDate] = useState<Date>(() => value.start ?? min);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocusGrid = useRef(false);
  const panelId = `${id}-calendar`;

  const weekdays = useMemo(() => getWeekdayLabels(lang), [lang]);

  const cells = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const list: (Date | null)[] = Array.from({ length: offset }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      list.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }
    return list;
  }, [viewMonth]);

  useEffect(() => {
    if (!isOpen || !shouldFocusGrid.current) return;
    shouldFocusGrid.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${toIsoDate(focusDate)}"]`)
      ?.focus();
  }, [isOpen, focusDate, viewMonth]);

  const isDisabled = (date: Date) => date < min || date > max;
  const canGoPrev = monthKey(viewMonth) > monthKey(min);
  const canGoNext = monthKey(viewMonth) < monthKey(max);

  const openPanel = () => {
    const start = value.start ?? min;
    setViewMonth(addMonths(start, 0));
    setFocusDate(start);
    setIsOpen(true);
  };

  const closePanel = (returnFocus: boolean) => {
    // Only a first day was chosen: treat it as a single-day window.
    if (value.start && !value.end) onChange({ start: value.start, end: value.start });
    setIsOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const moveFocus = (next: Date) => {
    const clamped = next < min ? min : next > max ? max : next;
    shouldFocusGrid.current = true;
    setFocusDate(clamped);
    if (monthKey(clamped) !== monthKey(viewMonth)) setViewMonth(addMonths(clamped, 0));
  };

  const handleGridKeyDown = (event: React.KeyboardEvent) => {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in steps) {
      event.preventDefault();
      moveFocus(addDays(focusDate, steps[event.key]));
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveFocus(addDays(focusDate, -((focusDate.getDay() + 6) % 7)));
    } else if (event.key === 'End') {
      event.preventDefault();
      moveFocus(addDays(focusDate, 6 - ((focusDate.getDay() + 6) % 7)));
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const target = addMonths(focusDate, event.key === 'PageUp' ? -1 : 1);
      const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      moveFocus(new Date(target.getFullYear(), target.getMonth(), Math.min(focusDate.getDate(), lastDay)));
    }
  };

  const today = startOfDay(new Date());

  const handleSelect = (date: Date) => {
    const { start, end } = value;
    if (!start || end) {
      onChange({ start: date, end: null });
    } else if (date < start) {
      onChange({ start: date, end: null });
    } else {
      onChange({ start, end: date });
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      data-escape-layer
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.stopPropagation();
          closePanel(true);
        }
      }}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (isOpen ? closePanel(false) : openPanel())}
        className={`${fieldClassName} flex items-center justify-between gap-3 text-left ${
          invalid ? 'border-[#A04E32]' : ''
        }`}
      >
        <span className={value.start ? 'text-[#181816]' : 'text-[#8A857A]'}>
          {value.start ? formatDepartureRange(value.start, value.end, lang) : placeholder}
        </span>
        <Calendar className="w-4 h-4 shrink-0 text-[#67635A]" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label={getTranslation(t.calendarLabel, lang)}
          className="mt-2 rounded-2xl border border-[#DDD5C7] bg-white p-3 sm:p-4"
        >
          <p className="mb-3 text-xs text-[#67635A]">{getTranslation(t.calendarHint, lang)}</p>
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              disabled={!canGoPrev}
              onClick={() => setViewMonth(addMonths(viewMonth, -1))}
              aria-label={getTranslation(t.calendarPrevMonth, lang)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#54514B] hover:bg-[#ECE6DA]/60 disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div
              aria-live="polite"
              className="font-serif text-lg font-medium text-[#181816]"
            >
              {formatMonthTitle(viewMonth, lang)}
            </div>
            <button
              type="button"
              disabled={!canGoNext}
              onClick={() => setViewMonth(addMonths(viewMonth, 1))}
              aria-label={getTranslation(t.calendarNextMonth, lang)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#54514B] hover:bg-[#ECE6DA]/60 disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1" aria-hidden="true">
            {weekdays.map((label, index) => (
              <div
                key={index}
                className="h-8 flex items-center justify-center text-[11px] uppercase tracking-wider text-[#67635A]"
              >
                {label}
              </div>
            ))}
          </div>

          <div
            ref={gridRef}
            role="group"
            aria-label={getTranslation(t.calendarLabel, lang)}
            onKeyDown={handleGridKeyDown}
            className="grid grid-cols-7 gap-y-1"
          >
            {cells.map((date, index) => {
              if (!date) return <div key={`blank-${index}`} aria-hidden="true" />;
              const isStart = value.start !== null && isSameDay(date, value.start);
              const isEnd = value.end !== null && isSameDay(date, value.end);
              const selected = isStart || isEnd;
              const inRange =
                value.start !== null && value.end !== null && date > value.start && date < value.end;
              const isToday = isSameDay(date, today);
              const disabled = isDisabled(date);
              const isFocusTarget = isSameDay(date, focusDate);
              return (
                <button
                  key={toIsoDate(date)}
                  type="button"
                  data-date={toIsoDate(date)}
                  disabled={disabled}
                  tabIndex={isFocusTarget ? 0 : -1}
                  aria-pressed={selected}
                  aria-label={getFullDateLabel(date, lang)}
                  onClick={() => handleSelect(date)}
                  className={`mx-auto w-10 h-10 rounded-full text-sm flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] ${
                    selected
                      ? 'bg-[#181816] text-[#FAF8F5]'
                      : inRange
                      ? 'bg-[#ECE6DA] text-[#181816]'
                      : disabled
                      ? 'text-[#B9B4A8] cursor-not-allowed'
                      : 'text-[#181816] hover:bg-[#ECE6DA]/70'
                  } ${isToday && !selected ? 'ring-1 ring-[#DDD5C7]' : ''}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
