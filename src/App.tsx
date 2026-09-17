import React, { useEffect, useState } from 'react';
import { Language, Destination } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { CuratedDestinations } from './components/CuratedDestinations';
import { HowItWorks } from './components/HowItWorks';
import { WhyTravelAtelier } from './components/WhyTravelAtelier';
import { Partners } from './components/Partners';
import { PracticalServices } from './components/PracticalServices';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TripPlannerModal } from './components/TripPlannerModal';
import { DestinationModal } from './components/DestinationModal';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { translations, getTranslation } from './data/translations';
import { navigate, scrollToHashOrTop, usePathname } from './lib/routing';

export default function App() {
  const path = usePathname();
  const isHome = path === '/';
  const [currentLang, setCurrentLang] = useState<Language>('ET');
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [prefilledDestinationName, setPrefilledDestinationName] = useState<string>('');

  const handleOpenTripModal = (destName?: string) => {
    if (destName) {
      setPrefilledDestinationName(destName);
    } else {
      setPrefilledDestinationName('');
    }
    setIsTripModalOpen(true);
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  useEffect(() => {
    document.documentElement.lang = currentLang.toLowerCase();
  }, [currentLang]);

  useEffect(() => {
    if (path === '/terms') {
      document.title = getTranslation(translations.legal.termsDocumentTitle, currentLang);
    } else if (path === '/privacy') {
      document.title = getTranslation(translations.legal.privacyDocumentTitle, currentLang);
    } else if (path === '/') {
      document.title = 'Travel Atelier';
    } else {
      document.title = getTranslation(translations.legal.notFoundDocumentTitle, currentLang);
    }
  }, [path, currentLang]);

  useEffect(() => {
    if (path !== '/') {
      setSelectedDestination(null);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      const timer = window.setTimeout(() => scrollToHashOrTop(hash), 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181816] flex flex-col font-sans selection:bg-[#B85A38]/20 selection:text-[#181816]">
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenTripModal={() => handleOpenTripModal()}
        variant={isHome ? 'home' : 'page'}
        onNavigate={handleNavigate}
      />

      {isHome ? (
        <main className="flex-1">
          <Hero
            currentLang={currentLang}
            onOpenTripModal={() => handleOpenTripModal()}
            onExploreClick={handleExploreScroll}
          />

          <BrandStatement currentLang={currentLang} />

          <CuratedDestinations
            currentLang={currentLang}
            onSelectDestination={handleSelectDestination}
          />

          <HowItWorks
            currentLang={currentLang}
            onOpenTripModal={() => handleOpenTripModal()}
          />

          <WhyTravelAtelier currentLang={currentLang} />

          <Partners currentLang={currentLang} />

          <PracticalServices currentLang={currentLang} />

          {/* TrustEcosystem omitted: logos, IATA and underwriters are not owner-confirmed. */}
          <FinalCTA
            currentLang={currentLang}
            onOpenTripModal={() => handleOpenTripModal()}
          />
        </main>
      ) : path === '/terms' ? (
        <TermsPage currentLang={currentLang} onNavigate={handleNavigate} />
      ) : path === '/privacy' ? (
        <PrivacyPage currentLang={currentLang} onNavigate={handleNavigate} />
      ) : (
        <NotFoundPage currentLang={currentLang} onNavigate={handleNavigate} />
      )}

      <Footer
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenTripModal={() => handleOpenTripModal()}
        variant={isHome ? 'home' : 'page'}
        currentPath={path}
        onNavigate={handleNavigate}
      />

      <TripPlannerModal
        isOpen={isTripModalOpen}
        onClose={() => setIsTripModalOpen(false)}
        currentLang={currentLang}
        initialDestination={prefilledDestinationName}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        currentLang={currentLang}
        onPlanTripForDestination={(destName) => {
          setSelectedDestination(null);
          handleOpenTripModal(destName);
        }}
      />
    </div>
  );
}
