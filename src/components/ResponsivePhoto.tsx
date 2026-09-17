import React from 'react';
import {
  CARD_SIZES,
  CARD_SRC_WIDTHS,
  unsplashFallbackSrc,
  unsplashSrcSet,
} from '../lib/images';

interface ResponsivePhotoProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'srcSet' | 'sizes'
> {
  src: string;
  alt: string;
  widths?: readonly number[];
  sizes?: string;
  fallbackWidth?: number;
}

export const ResponsivePhoto = React.forwardRef<HTMLImageElement, ResponsivePhotoProps>(
  (
    {
      src,
      alt,
      className,
      widths = CARD_SRC_WIDTHS,
      sizes = CARD_SIZES,
      fallbackWidth = 1280,
      loading = 'lazy',
      decoding = 'async',
      referrerPolicy = 'no-referrer',
      ...rest
    },
    ref
  ) => {
    return (
      <img
        ref={ref}
        src={unsplashFallbackSrc(src, fallbackWidth)}
        srcSet={unsplashSrcSet(src, widths)}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        referrerPolicy={referrerPolicy}
        {...rest}
      />
    );
  }
);

ResponsivePhoto.displayName = 'ResponsivePhoto';
