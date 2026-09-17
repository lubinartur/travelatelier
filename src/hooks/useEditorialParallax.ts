import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const MOBILE_MAX_WIDTH = 767;
const TABLET_MAX_WIDTH = 1023;

/**
 * Soft scroll parallax for a single editorial photo layer.
 * Writes transform directly (no React state) and only listens while on-screen.
 */
export function useEditorialParallax<T extends HTMLElement>(
  maxOffset = 12,
  scale = 1.06
) {
  const targetRef = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const clearTransform = () => {
      node.style.transform = '';
      node.style.willChange = '';
    };

    if (reducedMotion) {
      clearTransform();
      return;
    }

    let inView = false;
    let listening = false;
    let rafId: number | null = null;

    const resolveOffset = () => {
      const width = window.innerWidth;
      if (width <= MOBILE_MAX_WIDTH) return 0;
      if (width <= TABLET_MAX_WIDTH) return maxOffset * 0.4;
      return maxOffset;
    };

    const apply = () => {
      rafId = null;
      if (!inView || document.visibilityState === 'hidden') return;

      const offset = resolveOffset();
      if (offset === 0) {
        clearTransform();
        return;
      }

      const frame = node.parentElement ?? node;
      const rect = frame.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const progress = span <= 0 ? 0.5 : (window.innerHeight - rect.top) / span;
      const clamped = Math.min(1, Math.max(0, progress));
      const y = (clamped - 0.5) * 2 * offset;

      node.style.willChange = 'transform';
      node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale})`;
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(apply);
    };

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize, { passive: true });
      apply();
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && document.visibilityState === 'visible') start();
        else stop();
      },
      { threshold: 0 }
    );

    io.observe(node.parentElement ?? node);

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stop();
        return;
      }
      if (inView) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      stop();
      clearTransform();
    };
  }, [reducedMotion, maxOffset, scale]);

  return targetRef;
}
