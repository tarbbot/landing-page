import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';
import type { LanguageCode } from './types';
import { langFromPath, LANG_PATH } from './locales';

const SITE = (process.env.REACT_APP_SITE_URL || 'https://znit.io').replace(/\/$/, '');

interface LanguageInfo {
  code: LanguageCode;
  name: string;
  flag: string;
}

interface LanguageContextType {
  language: LanguageCode;
  t: (path: string) => any;
  changeLanguage: (newLanguage: LanguageCode) => void;
  getAvailableLanguages: () => LanguageInfo[];
  getCurrentLanguageInfo: () => LanguageInfo | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [preferred, setPreferred] = useState<LanguageCode>(() => {
    // Get language from localStorage or detect browser language
    const savedLanguage = localStorage.getItem('preferred-language') as LanguageCode;
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    // Detect browser language
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
    
    // Map browser language to supported languages
    const langMap: Record<string, LanguageCode> = {
      'en': 'en-US',
      'en-US': 'en-US',
      'en-GB': 'en-GB',
      'pt': 'pt-BR',
      'pt-BR': 'pt-BR',
      'es': 'es-ES',
      'es-ES': 'es-ES',
      'fr': 'fr-FR',
      'fr-FR': 'fr-FR',
      'de': 'de-DE',
      'de-DE': 'de-DE',
      'zh': 'zh-CN',
      'zh-CN': 'zh-CN',
      'ja': 'ja-JP',
      'ja-JP': 'ja-JP'
    };
    
    return langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'en-US';
  });

  // The URL decides the language on landing pages; any other route uses the visitor's preference.
  const pathLang = langFromPath(location.pathname) as LanguageCode | null;
  const language: LanguageCode = pathLang || preferred;

  // Plain "/" is the English page. Visitors whose saved or browser language is another one are sent
  // to that language's URL; crawlers (English by default) stay on the page they requested.
  useEffect(() => {
    if (location.pathname === '/' && preferred !== 'en-US') {
      navigate(LANG_PATH[preferred] + location.hash, { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.split('-')[0];
  }, [language]);

  // Head tags follow the language and route when the page changes without a reload.
  useEffect(() => {
    const set = (sel: string, make: () => HTMLElement, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLElement>(sel);
      if (!el) {
        el = make();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });
    if (pathLang) {
      const seo = translations[language]?.seo || translations['en-US'].seo;
      document.title = seo.title;
      set('meta[name="description"]', meta('description'), 'content', seo.description);
      set('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', SITE + LANG_PATH[language]);
      document.head.querySelector('meta[name="robots"]')?.remove();
    } else {
      // account area: keep it out of search results
      set('meta[name="robots"]', meta('robots'), 'content', 'noindex, nofollow');
    }
  }, [language, pathLang]);

  const t = (path: string): any => {
    const keys = path.split('.');
    let value: any = translations[language];
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    // Fallback to English if translation not found
    if (value === undefined) {
      value = translations['en-US'];
      for (const key of keys) {
        value = value?.[key];
      }
    }
    
    return value || path;
  };

  const changeLanguage = (newLanguage: LanguageCode): void => {
    if (!translations[newLanguage]) return;
    localStorage.setItem('preferred-language', newLanguage);
    setPreferred(newLanguage);
    if (pathLang) navigate(LANG_PATH[newLanguage] + location.hash);
  };

  const getAvailableLanguages = (): LanguageInfo[] => {
    return [
      { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
      { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
      { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
      { code: 'es-ES', name: 'Español (ES)', flag: '🇪🇸' },
      { code: 'fr-FR', name: 'Français (FR)', flag: '🇫🇷' },
      { code: 'de-DE', name: 'Deutsch (DE)', flag: '🇩🇪' },
      { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
      { code: 'ja-JP', name: '日本語 (JP)', flag: '🇯🇵' }
    ];
  };

  const getCurrentLanguageInfo = (): LanguageInfo | undefined => {
    return getAvailableLanguages().find(lang => lang.code === language);
  };

  const value: LanguageContextType = {
    language,
    t,
    changeLanguage,
    getAvailableLanguages,
    getCurrentLanguageInfo
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

