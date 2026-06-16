import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { SUPPORTED_LANGUAGES, STORAGE_KEY } from '@/lib/i18n';
import '@/components/css/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language?.split('-')[0]) ||
    SUPPORTED_LANGUAGES.find((l) => l.code === 'en')!;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* unavailable */ }
    setIsOpen(false);
  };

  return (
    <div className="lang-selector" ref={dropdownRef}>
      <button
        className="lang-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <ReactCountryFlag countryCode={currentLang.countryCode} svg className="lang-flag" />
        <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        <span className={`lang-arrow ${isOpen ? 'open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <ul className="lang-dropdown" role="listbox">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              className={`lang-option ${lang.code === currentLang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang.code)}
              role="option"
              aria-selected={lang.code === currentLang.code}
            >
              <ReactCountryFlag countryCode={lang.countryCode} svg className="lang-flag" />
              <span className="lang-code">{lang.code.toUpperCase()}</span>
              <span className="lang-name">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
