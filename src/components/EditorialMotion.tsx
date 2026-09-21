import React, { useRef, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useEditorialParallax } from '../hooks/useEditorialParallax';
import { ResponsivePhoto } from './ResponsivePhoto';
import { PORTRAIT_SIZES, PORTRAIT_SRC_WIDTHS } from '../lib/images';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  distance?: number;
  threshold?: number;
  as?: React.ElementType;
  variant?: 'content' | 'media';
}

export const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset,
  distance = 16,
  threshold = 0.15,
  as: Component = 'div',
  variant = 'content',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const effectiveDistance = yOffset ?? distance;
  const delayMs = delay > 0 && delay < 1 ? delay * 1000 : delay;

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const isMedia = variant === 'media';

  return (
    <Component
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
      style={{
        // Headings/copy stay readable; media may soften in without hiding copy.
        opacity: isVisible ? 1 : isMedia ? 0.35 : 1,
        transform: isVisible ? 'translateY(0)' : `translateY(${effectiveDistance}px)`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </Component>
  );
};

interface EditorialImageMaskProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  aspectRatio?: string;
  caption?: string;
  className?: string;
  delay?: number;
  threshold?: number;
  parallax?: boolean;
}

export const EditorialImageMask: React.FC<EditorialImageMaskProps> = ({
  children,
  src,
  alt = '',
  aspectRatio = 'aspect-4/3',
  caption,
  className = '',
  delay = 0,
  threshold = 0.15,
  parallax = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useEditorialParallax<HTMLDivElement>(12, 1.06);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const delayMs = delay > 0 && delay < 1 ? delay * 1000 : delay;

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  if (src) {
    return (
      <div className={`relative group ${className}`}>
        <div
          ref={ref}
          className={`${aspectRatio} rounded-2xl overflow-hidden bg-[#ECE6DA] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}
          style={
            reducedMotion
              ? {}
              : {
                  opacity: isVisible ? 1 : 0.4,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${delayMs}ms`,
                }
          }
        >
          <div
            ref={parallax ? parallaxRef : undefined}
            className="absolute inset-0"
          >
            <ResponsivePhoto
              src={src}
              alt={alt}
              widths={PORTRAIT_SRC_WIDTHS}
              sizes={PORTRAIT_SIZES}
              fallbackWidth={800}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104"
            />
          </div>
        </div>
        {caption && (
          <div className="mt-3 text-xs text-[#67635A] font-light">
            {caption}
          </div>
        )}
      </div>
    );
  }

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden`}
      style={{
        opacity: isVisible ? 1 : 0.4,
        transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};

interface EditorialParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  maxOffset?: number;
  scale?: number;
}

export const EditorialParallaxLayer: React.FC<EditorialParallaxLayerProps> = ({
  children,
  className = '',
  maxOffset = 12,
  scale = 1.06,
}) => {
  const ref = useEditorialParallax<HTMLDivElement>(maxOffset, scale);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  );
};
