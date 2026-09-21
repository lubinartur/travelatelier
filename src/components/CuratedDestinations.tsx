import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Destination, Language } from '../types';
import { destinations } from '../data/destinations';
import { translations, getTranslation } from '../data/translations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { RevealOnScroll } from './EditorialMotion';
import { ResponsivePhoto } from './ResponsivePhoto';

interface CuratedDestinationsProps {
  currentLang: Language;
  onSelectDestination: (dest: Destination) => void;
}

export const CuratedDestinations: React.FC<CuratedDestinationsProps> = ({
  currentLang,
  onSelectDestination,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const pauseHiddenRef = useRef(false);
  const pauseOffscreenRef = useRef(true);
  const dragStartXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const totalDragDistanceRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const syncAutoScrollRef = useRef<() => void>(() => {});

  const [isDragging, setIsDragging] = useState(false);
  const suppressClickRef = useRef(false);
  const isFocusedRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const uniqueCount = destinations.length;

  // We duplicate the 6 destinations 3 times (18 items) to enable seamless infinite scrolling
  const repeatedDestinations = [...destinations, ...destinations, ...destinations];

  // Set initial scroll position to the middle set for seamless bidirectional scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for layout calculation
    const timer = setTimeout(() => {
      if (container.scrollWidth > 0) {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll only while the rail is on-screen, the tab is visible, and idle
  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container) return;

    const stopLoop = () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };

    if (reducedMotion) {
      stopLoop();
      return;
    }

    const SCROLL_SPEED = 0.55; // Refined slow continuous auto-scroll

    const shouldRun = () =>
      !isHoveredRef.current &&
      !isDraggingRef.current &&
      !isFocusedRef.current &&
      !isTouchingRef.current &&
      !pauseHiddenRef.current &&
      !pauseOffscreenRef.current;

    const wrapScroll = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth <= 0) return;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
      }
    };

    const autoScroll = () => {
      animationFrameIdRef.current = null;
      if (!shouldRun()) return;
      container.scrollLeft += SCROLL_SPEED;
      wrapScroll();
      animationFrameIdRef.current = requestAnimationFrame(autoScroll);
    };

    const startLoop = () => {
      if (animationFrameIdRef.current !== null || !shouldRun()) return;
      animationFrameIdRef.current = requestAnimationFrame(autoScroll);
    };

    const sync = () => {
      if (shouldRun()) startLoop();
      else stopLoop();
    };

    syncAutoScrollRef.current = sync;
    pauseHiddenRef.current = document.visibilityState === 'hidden';

    const io = new IntersectionObserver(
      ([entry]) => {
        pauseOffscreenRef.current = !entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(section ?? container);

    const onVisibility = () => {
      pauseHiddenRef.current = document.visibilityState === 'hidden';
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    sync();

    return () => {
      syncAutoScrollRef.current = () => {};
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      stopLoop();
    };
  }, [reducedMotion]);

  // Handle seamless infinite wrapping during manual trackpad or touch scrolling
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 10) {
      container.scrollLeft += singleSetWidth;
    }
  }, []);

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    scrollStartLeftRef.current = container.scrollLeft;
    totalDragDistanceRef.current = 0;
    syncAutoScrollRef.current();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const deltaX = e.clientX - dragStartXRef.current;
      totalDragDistanceRef.current += Math.abs(e.movementX);
      containerRef.current.scrollLeft = scrollStartLeftRef.current - deltaX;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        // Ignore the click that follows a real drag; then clear so keyboard
        // Enter/Space is not blocked by leftover distance.
        suppressClickRef.current = totalDragDistanceRef.current >= 8;
        syncAutoScrollRef.current();
        requestAnimationFrame(() => {
          suppressClickRef.current = false;
          totalDragDistanceRef.current = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleCardClick = (
    dest: Destination,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Keyboard-generated clicks have detail 0 and must not inherit leftover drag distance.
    if (e.detail === 0) {
      onSelectDestination(dest);
      return;
    }
    if (suppressClickRef.current || totalDragDistanceRef.current >= 8) {
      return;
    }
    onSelectDestination(dest);
  };

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="py-24 sm:py-32 bg-[#FAF8F5] text-[#181816] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        {/* Section Header with soft viewport reveal */}
        <RevealOnScroll threshold={0.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#ECE6DA]">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="h-[1px] w-8 bg-[#B85A38]" />
                <span className="text-xs uppercase tracking-wider font-medium text-[#67635A]">
                  {getTranslation(translations.destinations.tagline, currentLang)}
                </span>
              </div>
              {/* Section heading: medium weight */}
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#181816]">
                {getTranslation(translations.destinations.title, currentLang)}
              </h2>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end">
              <p className="text-[#67635A] max-w-md text-sm sm:text-base font-light leading-relaxed">
                {getTranslation(translations.destinations.subtitle, currentLang)}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Cinematic Horizontal Scrolling Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          syncAutoScrollRef.current();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          syncAutoScrollRef.current();
        }}
        onFocusCapture={() => {
          isFocusedRef.current = true;
          syncAutoScrollRef.current();
        }}
        onBlurCapture={(e) => {
          const next = e.relatedTarget as Node | null;
          if (!containerRef.current?.contains(next)) {
            isFocusedRef.current = false;
            syncAutoScrollRef.current();
          }
        }}
        onTouchStart={() => {
          isTouchingRef.current = true;
          syncAutoScrollRef.current();
        }}
        onTouchEnd={() => {
          isTouchingRef.current = false;
          syncAutoScrollRef.current();
        }}
        onTouchCancel={() => {
          isTouchingRef.current = false;
          syncAutoScrollRef.current();
        }}
        onMouseDown={handleMouseDown}
        tabIndex={-1}
        className={`w-full overflow-x-auto flex items-center space-x-6 sm:space-x-8 px-6 sm:px-10 lg:px-16 pt-2 pb-14 -mb-10 select-none scrollbar-none touch-pan-x transition-colors duration-200 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {repeatedDestinations.map((dest, idx) => {
          const destName = getTranslation(dest.name, currentLang);
          const subtitle = getTranslation(dest.subtitle, currentLang);
          const region = getTranslation(dest.region, currentLang);
          // Infinite rail starts on the middle copy; only that set is tabbable / announced.
          const isKeyboardTarget = idx >= uniqueCount && idx < uniqueCount * 2;

          return (
            <button
              key={`${dest.id}-${idx}`}
              type="button"
              tabIndex={isKeyboardTarget ? 0 : -1}
              aria-hidden={isKeyboardTarget ? undefined : true}
              draggable={false}
              onClick={(e) => handleCardClick(dest, e)}
              className="group relative w-[82vw] sm:w-[500px] md:w-[560px] lg:w-[620px] h-[520px] sm:h-[620px] lg:h-[700px] shrink-0 rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] appearance-none border-0 p-0 bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04E32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]"
            >
              {/* Full-bleed Destination Photography with subtle hover zoom */}
              <ResponsivePhoto
                src={dest.imageUrl}
                alt={isKeyboardTarget ? destName : ''}
                className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] pointer-events-none"
              />

              {/* Editorial Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Card Top: Region descriptor & Subtle Arrow Indicator */}
              <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs uppercase tracking-wider text-white font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/20">
                  {region}
                </span>

                {/* Subtle arrow indicator with gentle movement on hover */}
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-400 group-hover:bg-white group-hover:text-[#181816] group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-400 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Bottom: Large serif destination name & one short descriptive line */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white pointer-events-none">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-2 leading-[1.08] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {destName}
                </h3>

                <p className="text-white text-sm sm:text-base font-light leading-relaxed max-w-md line-clamp-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]">
                  {subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
