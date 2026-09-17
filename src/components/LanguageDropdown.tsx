import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface LanguageDropdownProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isScrolled?: boolean;
  theme?: 'header' | 'footer';
  id?: string;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ET', label: 'Eesti' },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
];

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLang,
  onSelectLang,
  isScrolled = false,
  theme = 'header',
  id = 'language-dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isFooter = theme === 'footer';

  // Trigger button styles based on context
  const getButtonStyles = () => {
    if (isFooter) {
      return 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/15';
    }
    if (isScrolled) {
      return 'bg-[#ECE6DA]/70 hover:bg-[#ECE6DA] text-[#181816] border border-[#DDD5C7]/70';
    }
    return 'bg-black/30 hover:bg-black/45 text-white/95 border border-white/20 backdrop-blur-xs';
  };

  // Menu popover placement and color scheme
  const getMenuStyles = () => {
    if (isFooter) {
      return 'bottom-full mb-2 left-0 bg-[#181816] text-[#FAF8F5] border border-white/15 shadow-2xl';
    }
    return 'top-full mt-2 right-0 bg-[#FAF8F5] text-[#181816] border border-[#DDD5C7] shadow-xl';
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer ${getButtonStyles()}`}
      >
        <span>{currentLang}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 w-36 rounded-xl py-1.5 focus:outline-none transition-all duration-150 animate-fadeIn ${getMenuStyles()}`}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                role="menuitem"
                type="button"
                onClick={() => {
                  onSelectLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  isFooter
                    ? isSelected
                      ? 'bg-white/10 text-[#E09074] font-medium'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                    : isSelected
                    ? 'bg-[#F0ECE3] text-[#A04E32] font-medium'
                    : 'text-[#484641] hover:bg-[#F5F2EB] hover:text-[#181816]'
                }`}
              >
                <span>{lang.label}</span>
                <span
                  className={`text-[10px] font-mono ${
                    isSelected
                      ? isFooter
                        ? 'text-[#E09074]'
                        : 'text-[#A04E32]'
                      : isFooter
                        ? 'text-white/70'
                        : 'text-[#67635A]'
                  }`}
                >
                  {lang.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
