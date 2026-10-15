export type LanguageCode = 'en-US' | 'en-GB' | 'pt-BR' | 'es-ES' | 'fr-FR' | 'de-DE' | 'zh-CN' | 'ja-JP';

// Locales are partial on purpose: missing keys fall back to en-US in LanguageContext.t().
export type Translation = Record<string, any>;
export type Translations = Record<string, Translation>;
