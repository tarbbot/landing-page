import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';
import type { LanguageCode } from './types';

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
  const [language, setLanguage] = useState<LanguageCode>(() => {
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

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language.split('-')[0];
  }, [language]);

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
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
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

