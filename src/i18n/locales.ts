// One URL per language: crawlers get a distinct, linkable page for each. Dependency free on purpose,
// the build script (scripts/seo.cjs) reads this same file.
export type LangCode = 'en-US' | 'en-GB' | 'pt-BR' | 'es-ES' | 'fr-FR' | 'de-DE' | 'zh-CN' | 'ja-JP';

export const LANG_PATH: Record<LangCode, string> = {
  'en-US': '/',
  'en-GB': '/en-gb/',
  'pt-BR': '/pt-br/',
  'es-ES': '/es/',
  'fr-FR': '/fr/',
  'de-DE': '/de/',
  'zh-CN': '/zh/',
  'ja-JP': '/ja/',
};

// value of the hreflang attribute
export const HREFLANG: Record<LangCode, string> = {
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'pt-BR': 'pt-BR',
  'es-ES': 'es-ES',
  'fr-FR': 'fr-FR',
  'de-DE': 'de-DE',
  'zh-CN': 'zh-CN',
  'ja-JP': 'ja-JP',
};

export const LANG_CODES = Object.keys(LANG_PATH) as LangCode[];

const norm = (p: string) => (p.endsWith('/') ? p : p + '/');

/** Language whose page this path is (the landing at its own URL), or null for any other route. */
export const langFromPath = (pathname: string): LangCode | null => {
  const p = norm(pathname.toLowerCase());
  return LANG_CODES.find((c) => LANG_PATH[c] === p) || null;
};

export const isLandingPath = (pathname: string): boolean => langFromPath(pathname) !== null;
