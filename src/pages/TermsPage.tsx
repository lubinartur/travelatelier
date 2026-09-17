import React from 'react';
import { Language } from '../types';
import { company } from '../data/company';
import {
  destinationGuides,
  mfaTravelInfoHref,
  officialResources,
  operatorReferences,
} from '../data/legal';
import { translations, getTranslation } from '../data/translations';
import { ExternalTextLink, LegalDocumentLayout, LegalSection } from '../components/LegalDocumentLayout';

interface TermsPageProps {
  currentLang: Language;
  onNavigate: (href: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ currentLang, onNavigate }) => {
  const copy = translations.legal;

  return (
    <LegalDocumentLayout
      currentLang={currentLang}
      title={getTranslation(copy.termsTitle, currentLang)}
      onNavigate={onNavigate}
      intro={<p>{getTranslation(copy.termsIntro, currentLang)}</p>}
    >
      <LegalSection heading={getTranslation(copy.operatorsHeading, currentLang)}>
        <p className="max-w-2xl mb-8 text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.operatorsNote, currentLang)}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8 lg:gap-y-10">
          {operatorReferences.map((operator) => (
            <li key={operator.id} className="min-w-0">
              <h3 className="font-serif text-xl font-medium text-[#181816] mb-2">{operator.name}</h3>
              <ul className="space-y-2">
                {operator.links.map((link) => (
                  <li key={link.href}>
                    <ExternalTextLink href={link.href}>
                      {getTranslation(link.label, currentLang)}
                    </ExternalTextLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.travellerHeading, currentLang)} split>
        <div className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B] space-y-4">
          <p>{getTranslation(copy.travellerBody, currentLang)}</p>
          <p>
            <ExternalTextLink href={mfaTravelInfoHref}>
              {getTranslation(copy.mfaLink, currentLang)}
            </ExternalTextLink>
          </p>
        </div>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.usefulHeading, currentLang)}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 lg:gap-y-10">
          {officialResources.map((resource) => (
            <li key={resource.id} className="min-w-0">
              <h3 className="text-sm font-medium tracking-wide uppercase text-[#181816] mb-1">
                {getTranslation(resource.title, currentLang)}
              </h3>
              <p className="text-sm text-[#54514B] mb-2">
                {getTranslation(copy.sourceLabel, currentLang)}: {getTranslation(resource.source, currentLang)}
              </p>
              <ExternalTextLink href={resource.href}>{resource.href}</ExternalTextLink>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.destinationsHeading, currentLang)}>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8 lg:gap-y-10">
          {destinationGuides.map((guide) => (
            <li key={guide.id} className="min-w-0">
              <h3 className="text-sm font-medium tracking-wide uppercase text-[#181816] mb-1">
                {getTranslation(guide.title, currentLang)}
              </h3>
              <p className="text-sm text-[#54514B] mb-2">
                {getTranslation(copy.sourceLabel, currentLang)}: {getTranslation(copy.destinationSource, currentLang)}
              </p>
              <ExternalTextLink href={guide.href}>{guide.href}</ExternalTextLink>
            </li>
          ))}
        </ul>
      </LegalSection>

      <section className="border-t border-[#ECE6DA] pt-8 mt-10 sm:mt-12 lg:mt-16 text-sm text-[#54514B] max-w-2xl">
        <p>
          {company.legalName}. {getTranslation(translations.footer.license, currentLang)}. {company.legalAddress}.
        </p>
      </section>
    </LegalDocumentLayout>
  );
};
