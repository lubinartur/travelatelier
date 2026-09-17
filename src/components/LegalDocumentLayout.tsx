import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { AppLink } from './AppLink';

interface LegalDocumentLayoutProps {
  currentLang: Language;
  title: string;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
  intro?: React.ReactNode;
}

export const LegalDocumentLayout: React.FC<LegalDocumentLayoutProps> = ({
  currentLang,
  title,
  onNavigate,
  children,
  intro,
}) => {
  useEffect(() => {
    const heading = document.getElementById('legal-title');
    heading?.focus();
  }, [title]);

  return (
    <main
      id="legal-main"
      className="flex-1 bg-[#FAF8F5] text-[#181816] pt-[88px] sm:pt-[104px] lg:pt-[120px] pb-24 sm:pb-32 lg:pb-40"
    >
      <article className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <p className="mb-8 sm:mb-10">
          <AppLink
            href="/"
            onNavigate={onNavigate}
            className="text-sm text-[#54514B] hover:text-[#181816] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E32]"
          >
            {getTranslation(translations.legal.backHome, currentLang)}
          </AppLink>
        </p>
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <h1
            id="legal-title"
            tabIndex={-1}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-[#181816] outline-none max-w-4xl"
          >
            {title}
          </h1>
          {intro ? (
            <div className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
              {intro}
            </div>
          ) : null}
        </header>
        <div className="space-y-0">{children}</div>
      </article>
    </main>
  );
};

export const LegalSection: React.FC<{
  heading: string;
  children: React.ReactNode;
  split?: boolean;
}> = ({ heading, children, split = false }) => (
  <section
    className={
      split
        ? 'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 xl:gap-16 border-t border-[#ECE6DA] pt-10 sm:pt-12 lg:pt-16 mt-10 sm:mt-12 lg:mt-16 min-w-0'
        : 'border-t border-[#ECE6DA] pt-10 sm:pt-12 lg:pt-16 mt-10 sm:mt-12 lg:mt-16 min-w-0'
    }
  >
    <h2
      className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.12] text-[#181816] ${
        split ? 'lg:col-span-4' : 'mb-5 sm:mb-8'
      }`}
    >
      {heading}
    </h2>
    <div className={split ? 'lg:col-span-8 min-w-0' : 'min-w-0'}>{children}</div>
  </section>
);

export const ExternalTextLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#A04E32] underline underline-offset-4 hover:text-[#181816] break-all sm:break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E32]"
  >
    {children}
  </a>
);
