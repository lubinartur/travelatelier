const DEFAULT_QUALITY = 85;

export const HERO_SRC_WIDTHS = [800, 1200, 1600, 1920, 2200] as const;
export const FULL_BLEED_WIDTHS = [800, 1200, 1600, 1920, 2200] as const;
export const CARD_SRC_WIDTHS = [640, 960, 1280, 1600] as const;
export const PORTRAIT_SRC_WIDTHS = [400, 800, 1200] as const;
export const COLUMN_SRC_WIDTHS = [640, 960, 1200] as const;

export const HERO_SIZES = '100vw';
export const CARD_SIZES =
  '(min-width: 1024px) 620px, (min-width: 768px) 560px, (min-width: 640px) 500px, 82vw';
export const PORTRAIT_SIZES = '(min-width: 1024px) 320px, 90vw';
export const COLUMN_SIZES = '(min-width: 1024px) 42vw, 100vw';
export const FULL_BLEED_SIZES = '100vw';

const parseWidth = (source: string): number | null => {
  try {
    const value = Number(new URL(source).searchParams.get('w'));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
};

const parseQuality = (source: string): number => {
  try {
    const value = Number(new URL(source).searchParams.get('q'));
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_QUALITY;
  } catch {
    return DEFAULT_QUALITY;
  }
};

/** Resize an existing Unsplash URL without changing crop, photo id, or quality. */
export const unsplashWidth = (source: string, width: number): string => {
  const url = new URL(source);
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('w', String(width));
  if (!url.searchParams.has('q')) {
    url.searchParams.set('q', String(DEFAULT_QUALITY));
  }
  return url.toString();
};

export const unsplashSrcSet = (
  source: string,
  widths: readonly number[] = CARD_SRC_WIDTHS
): string => {
  const max = parseWidth(source) ?? Math.max(...widths);
  const qualityKept = parseQuality(source);
  const list = [...new Set([...widths.filter((width) => width < max), max])].sort(
    (a, b) => a - b
  );
  return list
    .map((width) => {
      const url = new URL(unsplashWidth(source, width));
      url.searchParams.set('q', String(qualityKept));
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
};

export const unsplashFallbackSrc = (
  source: string,
  preferredWidth: number
): string => {
  const max = parseWidth(source) ?? preferredWidth;
  const width = Math.min(preferredWidth, max);
  const url = new URL(unsplashWidth(source, width));
  url.searchParams.set('q', String(parseQuality(source)));
  return url.toString();
};

export const FIRST_HERO_IMAGE =
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=90';
