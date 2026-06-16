import { useEffect } from 'react';
import i18n, { STORAGE_KEY, SUPPORTED_LANGUAGES } from '@/lib/i18n';

const validCodes = new Set<string>(SUPPORTED_LANGUAGES.map((l) => l.code));

function detectLanguage(): string {
  // Only runs client-side (inside useEffect), so these APIs are always available.
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && validCodes.has(stored)) return stored;
  } catch { /* localStorage unavailable */ }

  const langs: readonly string[] =
    typeof navigator !== 'undefined' && navigator.languages?.length
      ? navigator.languages
      : typeof navigator !== 'undefined'
        ? [navigator.language ?? 'en']
        : ['en'];

  for (const tag of langs) {
    const code = tag.split('-')[0].toLowerCase();
    if (validCodes.has(code)) return code;
  }

  return 'en';
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = detectLanguage();
    if (lang !== i18n.language) i18n.changeLanguage(lang);
  }, []);

  return <>{children}</>;
}
