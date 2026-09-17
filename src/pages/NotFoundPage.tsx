import React from 'react';
import { Language } from '../types';
import { translations, getTranslation } from '../data/translations';
import { AppLink } from '../components/AppLink';
import { LegalDocumentLayout } from '../components/LegalDocumentLayout';

interface NotFoundPageProps {
  currentLang: Language;
  onNavigate: (href: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ currentLang, onNavigate }) => {
  const copy = translations.legal;
  const linkClass =
    'text-[#B85A38] underline underline-offset-4 hover:text-[#181816] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85A38]';

  return (
    <LegalDocumentLayout
      currentLang={currentLang}
      title={getTranslation(copy.notFoundTitle, currentLang)}
      onNavigate={onNavigate}
    >
      <p className="mb-6">{getTranslation(copy.notFoundBody, currentLang)}</p>
      <ul className="space-y-3">
        <li>
          <AppLink href="/" onNavigate={onNavigate} className={linkClass}>
            {getTranslation(copy.backHome, currentLang)}
          </AppLink>
        </li>
        <li>
          <AppLink href="/terms" onNavigate={onNavigate} className={linkClass}>
            {getTranslation(copy.termsTitle, currentLang)}
          </AppLink>
        </li>
        <li>
          <AppLink href="/privacy" onNavigate={onNavigate} className={linkClass}>
            {getTranslation(copy.privacyTitle, currentLang)}
          </AppLink>
        </li>
      </ul>
    </LegalDocumentLayout>
  );
};
