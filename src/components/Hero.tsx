import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, ChevronDown, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ResponsivePhoto } from './ResponsivePhoto';
import { HERO_SIZES, HERO_SRC_WIDTHS } from '../lib/images';

interface HeroProps {
  currentLang: Language;
  onOpenTripModal: () => void;
  onExploreClick: () => void;
}

const HERO_HERO_VISTAS = [
  {
    id: 'santorini',
    title: {
      ET: 'Santorini, Kreeka',
      RU: 'Санторини, Греция',
      EN: 'Santorini, Greece',
    },
    // Unsplash XGKaRnWjv1c — already the first hero frame; caldera stairs, not Amalfi.
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'maldives',
    title: {
      ET: 'Noonu atoll, Maldiivid',
      RU: 'Атолл Ноону, Мальдивы',
      EN: 'Noonu Atoll, Maldives',
    },
    // Unsplash DtWyp_4YEes — overwater villas at Soneva Jani, Noonu Atoll (not Baa).
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'manarola',
    title: {
      ET: 'Manarola, Itaalia',
      RU: 'Манарола, Италия',
      EN: 'Manarola, Italy',
    },
    // Unsplash rknrvCrfS1k — already used in BrandStatement.
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'kyoto',
    title: {
      ET: 'Kyoto, Jaapan',
      RU: 'Киото, Япония',
      EN: 'Kyoto, Japan',
    },
    // Unsplash _UIN-pFfJ7c — Gion street, Kyoto; keep the darker existing frame.
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'istanbul',
    title: {
      ET: 'Istanbul, Türgi',
      RU: 'Стамбул, Турция',
      EN: 'Istanbul, Turkey',
    },
    // Unsplash photo-1541432901042 — Sultan Ahmed Mosque; already used for the Turkey destination card.
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'krabi',
    title: {
      ET: 'Phra Nang, Krabi',
      RU: 'Пхра-Нанг, Краби',
      EN: 'Phra Nang, Krabi',
    },
    // Unsplash jWKk-0ZBUyg — Phra Nang Beach, Krabi; already used for the Thailand destination card.
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2200&q=90',
  },
];

const formatSlideIndex = (index: number) => String(index).padStart(2, '0');

const SLIDE_DURATION = 7000; // 7 seconds per slide

const getHeadlineParts = (lang: Language): string[] => {
  if (lang === 'ET') {
    return ['Reisid, mis on loodud', 'Sinu järgi.'];
  }
  if (lang === 'RU') {
    return ['Путешествия, созданные', 'вокруг вас.'];
  }
  return ['Journeys designed', 'around you.'];
};

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenTripModal,
  onExploreClick,
}) => {
  const [activeVistaIndex, setActiveVistaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const slideImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const pendingAdvanceRef = useRef<number | null>(null);
  const [warmedSlides, setWarmedSlides] = useState<Set<number>>(() => new Set([0, 1]));
  const activeIndexRef = useRef(activeVistaIndex);
  activeIndexRef.current = activeVistaIndex;

  const warmSlide = (index: number) => {
    setWarmedSlides((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const isSlideDecoded = (index: number) => {
    const node = slideImageRefs.current[index];
    return Boolean(node && node.complete && node.naturalWidth > 0);
  };

  const pauseFocusRef = useRef(false);
  const pauseHiddenRef = useRef(false);
  const pauseOffscreenRef = useRef(false);
  // Pointer activation focuses a segment but must not freeze the timer.
  const pointerActivationRef = useRef(false);

  const startTimeRef = useRef<number | null>(null);
  const elapsedBeforePauseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const syncClockRef = useRef<() => void>(() => {});

  // Subtle parallax while scrolling — idle unless the hero is on-screen
  useEffect(() => {
    if (reducedMotion) return;
    let rafId: number | null = null;
    const handleScroll = () => {
      if (pauseOffscreenRef.current || pauseHiddenRef.current) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (!pauseOffscreenRef.current && !pauseHiddenRef.current) {
          if (window.scrollY < window.innerHeight * 1.2) {
            setScrollY(window.scrollY);
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    warmSlide(activeVistaIndex);
    warmSlide((activeVistaIndex + 1) % HERO_HERO_VISTAS.length);
  }, [activeVistaIndex]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      HERO_HERO_VISTAS.forEach((_, index) => warmSlide(index));
    }, 2800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Slideshow timer: runs while visible, not keyboard-focused, and the tab is active.
  // Hover does not pause; a manual slide choice starts a fresh 7s interval.
  useEffect(() => {
    if (reducedMotion) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      startTimeRef.current = null;
      elapsedBeforePauseRef.current = 0;
      setProgress(100);
      return;
    }

    const shouldRunClock = () =>
      !pauseFocusRef.current &&
      !pauseHiddenRef.current &&
      !pauseOffscreenRef.current;

    const freezeElapsed = () => {
      if (startTimeRef.current !== null) {
        elapsedBeforePauseRef.current += performance.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
    };

    const stopClock = () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      freezeElapsed();
    };

    const tick = (now: number) => {
      animFrameRef.current = null;
      if (!shouldRunClock()) {
        freezeElapsed();
        return;
      }
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current + elapsedBeforePauseRef.current;
      const currentProgress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(currentProgress);

      if (elapsed >= SLIDE_DURATION) {
        const nextIdx = (activeIndexRef.current + 1) % HERO_HERO_VISTAS.length;
        // Hold the outgoing frame until the next photo is decoded — no empty crossfade.
        if (!isSlideDecoded(nextIdx)) {
          pendingAdvanceRef.current = nextIdx;
          setProgress(100);
          animFrameRef.current = requestAnimationFrame(tick);
          return;
        }
        pendingAdvanceRef.current = null;
        setActiveVistaIndex(nextIdx);
        startTimeRef.current = now;
        elapsedBeforePauseRef.current = 0;
        setProgress(0);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    const startClock = () => {
      if (animFrameRef.current !== null || !shouldRunClock()) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = performance.now();
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    const syncClock = () => {
      setIsPaused(pauseFocusRef.current);
      if (shouldRunClock()) startClock();
      else stopClock();
    };

    syncClockRef.current = syncClock;
    pauseHiddenRef.current = document.visibilityState === 'hidden';

    const section = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        pauseOffscreenRef.current = !entry.isIntersecting;
        if (entry.isIntersecting) {
          setScrollY(window.scrollY);
        }
        syncClock();
      },
      { threshold: 0 }
    );
    if (section) io.observe(section);

    const onVisibility = () => {
      pauseHiddenRef.current = document.visibilityState === 'hidden';
      syncClock();
    };
    document.addEventListener('visibilitychange', onVisibility);

    syncClock();

    return () => {
      syncClockRef.current = () => {};
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      stopClock();
    };
  }, [reducedMotion]);

  const commitSlide = (index: number) => {
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = performance.now();
    setProgress(reducedMotion ? 100 : 0);
    if (index !== activeIndexRef.current) {
      setActiveVistaIndex(index);
    }
    syncClockRef.current();
  };

  const handleManualSelect = (index: number) => {
    warmSlide(index);
    if (index === activeVistaIndex || isSlideDecoded(index)) {
      pendingAdvanceRef.current = null;
      commitSlide(index);
      return;
    }
    pendingAdvanceRef.current = index;
  };

  const handleSlideLoaded = (index: number) => {
    if (pendingAdvanceRef.current !== index) return;
    pendingAdvanceRef.current = null;
    commitSlide(index);
  };

  const handlePointerActivationStart = () => {
    pointerActivationRef.current = true;
  };

  const handlePointerActivationEnd = () => {
    requestAnimationFrame(() => {
      pointerActivationRef.current = false;
    });
  };

  // Pointer clicks leave DOM focus on the segment; only keyboard focus should pause.
  const handleFocusPause = () => {
    pauseFocusRef.current = !pointerActivationRef.current;
    syncClockRef.current();
  };

  const handleFocusResume = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!sectionRef.current?.contains(next)) {
      pauseFocusRef.current = false;
      syncClockRef.current();
    }
  };

  const headlineParts = getHeadlineParts(currentLang);
  const activeVista = HERO_HERO_VISTAS[activeVistaIndex];

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-[96vh] md:min-h-screen pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
      onPointerDownCapture={handlePointerActivationStart}
      onPointerUpCapture={handlePointerActivationEnd}
      onPointerCancelCapture={handlePointerActivationEnd}
      onFocusCapture={handleFocusPause}
      onBlurCapture={handleFocusResume}
    >
      {/* Cinematic Image Frame with soft outer margins */}
      <div className="absolute inset-3 sm:inset-5 lg:inset-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)]">
        {/* Parallax & slow continuous scaling container */}
        <div
          className="absolute -inset-6 sm:-inset-8 transition-transform duration-100 ease-out"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translateY(${scrollY * 0.16}px)`,
            willChange: 'transform',
          }}
        >
          {/* Smooth stacked crossfade of all hero vistas */}
          {HERO_HERO_VISTAS.map((vista, idx) => {
            const isActive = activeVistaIndex === idx;
            const shouldLoad = warmedSlides.has(idx);
            return (
              <div
                key={vista.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                } ${reducedMotion ? '' : isActive ? 'animate-editorial-scale' : ''}`}
                style={{ willChange: 'opacity, transform' }}
                aria-hidden={!isActive}
              >
                {shouldLoad ? (
                  <ResponsivePhoto
                    ref={(node) => {
                      slideImageRefs.current[idx] = node;
                    }}
                    src={vista.imageUrl}
                    alt=""
                    widths={HERO_SRC_WIDTHS}
                    sizes={HERO_SIZES}
                    fallbackWidth={1600}
                    loading="eager"
                    fetchPriority={idx === 0 ? 'high' : 'low'}
                    decoding={idx === 0 ? 'async' : 'async'}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onLoad={() => handleSlideLoaded(idx)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#181816]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Light full-frame wash — even coverage, milder than the previous pass */}
        <div className="absolute inset-0 bg-black/25 md:bg-black/20 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20 pointer-events-none z-10" />

        {/* Bottom-left Interactive Slide Progress Indicator */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 flex items-center space-x-3 bg-black/65 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 z-20 shadow-lg select-none"
          role="region"
          aria-label={getTranslation(translations.hero.sliderLabel, currentLang)}
        >
          {/* Progress Segments */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {HERO_HERO_VISTAS.map((vista, idx) => {
              const isActive = activeVistaIndex === idx;
              return (
                <button
                  key={vista.id}
                  type="button"
                  onClick={() => handleManualSelect(idx)}
                  className="group relative py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full"
                  aria-label={`${getTranslation(translations.hero.slideLabel, currentLang)
                    .replace('{n}', String(idx + 1))
                    .replace('{title}', getTranslation(vista.title, currentLang))}${
                    isActive ? ` ${getTranslation(translations.hero.slideActive, currentLang)}` : ''
                  }`}
                  aria-current={isActive ? 'true' : 'false'}
                  title={getTranslation(vista.title, currentLang)}
                >
                  {/* Segment track */}
                  <div className="w-5 sm:w-8 h-1 rounded-full bg-white/40 overflow-hidden transition-colors group-hover:bg-white/60">
                    {/* Active filling progress bar */}
                    {isActive && (
                      <div
                        className="h-full bg-white rounded-full transition-all duration-75"
                        style={{
                          width: reducedMotion ? '100%' : `${progress}%`,
                          willChange: 'width',
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slide counter */}
          <div className="text-[11px] font-mono text-white tracking-wider border-l border-white/30 pl-3 flex items-center space-x-1.5">
            <span className="text-white font-medium">{formatSlideIndex(activeVistaIndex + 1)}</span>
            <span className="text-white/80">/</span>
            <span className="text-white/80">{formatSlideIndex(HERO_HERO_VISTAS.length)}</span>
            {isPaused && !reducedMotion && (
              <span className="text-[9px] uppercase tracking-widest text-white ml-1 font-sans font-medium">
                {currentLang === 'ET' ? 'paus' : currentLang === 'RU' ? 'пауза' : 'pause'}
              </span>
            )}
          </div>
        </div>

        {/* Location Indicator with subtle crossfade */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 hidden md:flex items-center space-x-2.5 bg-black/65 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs z-20 shadow-lg transition-all duration-500">
          <MapPin className="w-3.5 h-3.5 text-white" />
          <span className="font-light">
            {getTranslation(activeVista.title, currentLang)}
          </span>
        </div>
      </div>

      {/* Hero Foreground Content - Centered Editorial Poster Composition with restrained stagger */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-28 md:py-32 flex flex-col items-center text-center">
        {/* 1. Eyebrow first */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white text-xs uppercase tracking-wider font-medium mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E09074]" />
          <span>{getTranslation(translations.hero.subtitle, currentLang)}</span>
        </motion.div>

        {/* 2. Centered Oversized Serif Poster Headline - Two lines on desktop for Russian */}
        <h1
          id="hero-headline"
          className={`font-serif text-white font-medium tracking-[-0.02em] leading-[1.04] sm:leading-[1.0] mb-6 sm:mb-8 drop-shadow-[0_6px_22px_rgba(0,0,0,0.55)] ${
            currentLang === 'RU'
              ? 'text-4xl sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[96px] max-w-5xl lg:max-w-6xl'
              : 'text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] max-w-4xl'
          }`}
        >
          {headlineParts.map((line, idx) => (
            <span
              key={idx}
              className={`block overflow-hidden py-0.5 ${
                currentLang === 'RU' ? 'md:whitespace-nowrap' : ''
              }`}
            >
              <motion.span
                className="block"
                initial={reducedMotion ? false : { opacity: 0, y: '32%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.26 + idx * 0.14,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* 3. Supporting text follows */}
        <motion.p
          id="hero-description"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mb-10 sm:mb-12 drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]"
        >
          {getTranslation(translations.hero.description, currentLang)}
        </motion.p>

        {/* 4. CTA group appears last */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          <button
            id="hero-primary-cta"
            onClick={onOpenTripModal}
            className="group bg-[#FAF8F5] text-[#181816] px-8 sm:px-9 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center justify-center space-x-3 w-full sm:w-auto cursor-pointer"
          >
            <span>{getTranslation(translations.hero.primaryCta, currentLang)}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onExploreClick}
            className="px-7 sm:px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-medium text-white border border-white/45 bg-black/40 backdrop-blur-xs transition-all duration-300 hover:bg-black/55 hover:border-white/70 flex items-center justify-center space-x-2 w-full sm:w-auto cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{getTranslation(translations.hero.secondaryCta, currentLang)}</span>
          </button>
        </motion.div>

        {/* Calm scroll down indicator (no bouncy animation) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 sm:mt-16 flex flex-col items-center text-white/90 hover:text-white transition-colors cursor-pointer group drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          onClick={onExploreClick}
        >
          <span className="tracking-widest uppercase text-[10px] mb-2 font-mono">
            {currentLang === 'ET' ? 'Vaata lähemalt' : currentLang === 'RU' ? 'Подробнее' : 'Explore'}
          </span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </motion.div>
      </div>
    </section>
  );
};
