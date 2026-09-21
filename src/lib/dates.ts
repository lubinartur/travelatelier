import { Language } from '../types';

export const DATE_LOCALES: Record<Language, string> = {
  ET: 'et-EE',
  RU: 'ru-RU',
  EN: 'en-GB',
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;

export const parseIsoDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const addMonths = (date: Date, months: number) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1);

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Month name in the form used next to a day number ("juuni", "июня", "June").
const monthWithDay = (date: Date, lang: Language): string =>
  new Intl.DateTimeFormat(DATE_LOCALES[lang], { day: 'numeric', month: 'long' })
    .formatToParts(date)
    .find((part) => part.type === 'month')?.value ?? '';

/** "15. juuni 2026" / "15 июня 2026" / "15 June 2026" */
export const formatDepartureDate = (date: Date, lang: Language): string => {
  const month = monthWithDay(date, lang);
  const day = date.getDate();
  const year = date.getFullYear();
  return lang === 'ET' ? `${day}. ${month} ${year}` : `${day} ${month} ${year}`;
};

/** "20.–30. juuni 2026" / "20–30 июня 2026" / "20–30 June 2026"; falls back to one date. */
export const formatDepartureRange = (start: Date, end: Date | null, lang: Language): string => {
  if (!end || isSameDay(start, end)) return formatDepartureDate(start, lang);
  const dot = lang === 'ET' ? '.' : '';
  const d1 = start.getDate();
  const d2 = end.getDate();
  const m1 = monthWithDay(start, lang);
  const m2 = monthWithDay(end, lang);
  const y1 = start.getFullYear();
  const y2 = end.getFullYear();
  if (y1 === y2 && start.getMonth() === end.getMonth()) return `${d1}${dot}–${d2}${dot} ${m1} ${y1}`;
  if (y1 === y2) return `${d1}${dot} ${m1} – ${d2}${dot} ${m2} ${y1}`;
  return `${formatDepartureDate(start, lang)} – ${formatDepartureDate(end, lang)}`;
};

export const formatMonthTitle = (date: Date, lang: Language): string => {
  const month = new Intl.DateTimeFormat(DATE_LOCALES[lang], { month: 'long' }).format(date);
  return `${capitalize(month)} ${date.getFullYear()}`;
};

/** Monday-first short weekday names for the given language. */
export const getWeekdayLabels = (lang: Language): string[] => {
  const formatter = new Intl.DateTimeFormat(DATE_LOCALES[lang], { weekday: 'short' });
  // 1 January 2024 is a Monday.
  return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(2024, 0, 1 + i)));
};

export const getFullDateLabel = (date: Date, lang: Language): string =>
  new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(/\s?г\.$/, '');

/** "5 ööd" / "5 ночей" / "5 nights" with correct Russian plural forms. */
export const formatNights = (count: number, lang: Language): string => {
  if (lang === 'ET') return `${count} ööd`;
  if (lang === 'EN') return `${count} nights`;
  const rule = new Intl.PluralRules('ru-RU').select(count);
  const word = rule === 'one' ? 'ночь' : rule === 'few' ? 'ночи' : 'ночей';
  return `${count} ${word}`;
};
