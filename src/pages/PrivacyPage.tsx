import React from 'react';
import { Language } from '../types';
import { company } from '../data/company';
import { privacyInspectorate } from '../data/legal';
import { translations, getTranslation } from '../data/translations';
import { ExternalTextLink, LegalDocumentLayout, LegalSection } from '../components/LegalDocumentLayout';

interface PrivacyPageProps {
  currentLang: Language;
  onNavigate: (href: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ currentLang, onNavigate }) => {
  const copy = translations.legal;

  return (
    <LegalDocumentLayout
      currentLang={currentLang}
      title={getTranslation(copy.privacyTitle, currentLang)}
      onNavigate={onNavigate}
      intro={<p>{getTranslation(copy.privacySnapshot, currentLang)}</p>}
    >
      <LegalSection heading={getTranslation(copy.privacyGeneralHeading, currentLang)} split>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.privacyGeneralBody, currentLang)}
        </p>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyDataHeading, currentLang)} split>
        <div className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B] space-y-4">
          <p>{getTranslation(copy.privacyDataBody, currentLang)}</p>
          <p>{getTranslation(copy.privacyThirdParties, currentLang)}</p>
        </div>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyUseHeading, currentLang)} split>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.privacyUseBody, currentLang)}
        </p>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyRetentionHeading, currentLang)} split>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.privacyRetentionBody, currentLang)}
        </p>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyRightsHeading, currentLang)} split>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.privacyRightsBody, currentLang)}{' '}
          <ExternalTextLink href={privacyInspectorate.href}>
            {getTranslation(privacyInspectorate.label, currentLang)}
          </ExternalTextLink>
          .
        </p>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyCookiesHeading, currentLang)} split>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          {getTranslation(copy.privacyCookiesBody, currentLang)}
        </p>
      </LegalSection>

      <LegalSection heading={getTranslation(copy.privacyContactHeading, currentLang)} split>
        <div className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-[#54514B]">
          <p className="mb-4">{getTranslation(copy.privacyContactBody, currentLang)}</p>
          <p>
            {company.legalName}
            <br />
            {getTranslation(translations.footer.license, currentLang)}
            <br />
            {company.legalAddress}
            <br />
            <a
              href={company.phoneHref}
              className="text-[#A04E32] underline underline-offset-4 hover:text-[#181816]"
            >
              {company.phoneDisplay}
            </a>
            {' · '}
            <a
              href={company.emailHref}
              className="text-[#A04E32] underline underline-offset-4 hover:text-[#181816]"
            >
              {company.email}
            </a>
          </p>
        </div>
      </LegalSection>
    </LegalDocumentLayout>
  );
};
