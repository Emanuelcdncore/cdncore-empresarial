import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  translationBg, translationCs, translationDa, translationDe, translationEl,
  translationEn, translationEs, translationEt, translationFi, translationFr,
  translationGa, translationHr, translationHu, translationIt, translationLt,
  translationLv, translationMt, translationNl, translationPl, translationPt,
  translationRo, translationRu, translationSk, translationSl, translationSv,
  translationZh,
} from './translations';

const resources = {
  bg: { translation: translationBg },
  cs: { translation: translationCs },
  da: { translation: translationDa },
  de: { translation: translationDe },
  el: { translation: translationEl },
  en: { translation: translationEn },
  es: { translation: translationEs },
  et: { translation: translationEt },
  fi: { translation: translationFi },
  fr: { translation: translationFr },
  ga: { translation: translationGa },
  hr: { translation: translationHr },
  hu: { translation: translationHu },
  it: { translation: translationIt },
  lt: { translation: translationLt },
  lv: { translation: translationLv },
  mt: { translation: translationMt },
  nl: { translation: translationNl },
  pl: { translation: translationPl },
  pt: { translation: translationPt },
  ro: { translation: translationRo },
  ru: { translation: translationRu },
  sk: { translation: translationSk },
  sl: { translation: translationSl },
  sv: { translation: translationSv },
  zh: { translation: translationZh },
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', countryCode: 'GB' },
  { code: 'pt', name: 'Português', countryCode: 'PT' },
  { code: 'de', name: 'Deutsch', countryCode: 'DE' },
  { code: 'fr', name: 'Français', countryCode: 'FR' },
  { code: 'es', name: 'Español', countryCode: 'ES' },
  { code: 'it', name: 'Italiano', countryCode: 'IT' },
  { code: 'ru', name: 'Русский', countryCode: 'RU' },
  { code: 'bg', name: 'Български', countryCode: 'BG' },
  { code: 'hr', name: 'Hrvatski', countryCode: 'HR' },
  { code: 'cs', name: 'Čeština', countryCode: 'CZ' },
  { code: 'da', name: 'Dansk', countryCode: 'DK' },
  { code: 'nl', name: 'Nederlands', countryCode: 'NL' },
  { code: 'et', name: 'Eesti', countryCode: 'EE' },
  { code: 'fi', name: 'Suomi', countryCode: 'FI' },
  { code: 'el', name: 'Ελληνικά', countryCode: 'GR' },
  { code: 'hu', name: 'Magyar', countryCode: 'HU' },
  { code: 'ga', name: 'Gaeilge', countryCode: 'IE' },
  { code: 'lv', name: 'Latviešu', countryCode: 'LV' },
  { code: 'lt', name: 'Lietuvių', countryCode: 'LT' },
  { code: 'mt', name: 'Malti', countryCode: 'MT' },
  { code: 'pl', name: 'Polski', countryCode: 'PL' },
  { code: 'ro', name: 'Română', countryCode: 'RO' },
  { code: 'sk', name: 'Slovenčina', countryCode: 'SK' },
  { code: 'sl', name: 'Slovenščina', countryCode: 'SI' },
  { code: 'sv', name: 'Svenska', countryCode: 'SE' },
  { code: 'zh', name: '中文', countryCode: 'CN' },
] as const;

export const STORAGE_KEY = 'cdncore-empresarial-language';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    supportedLngs: Object.keys(resources),
  });

export default i18n;
