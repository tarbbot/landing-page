export interface Translation {
  nav: {
    brand: string;
    subtitle: string;
    home: string;
    bets: string;
    portfolio: string;
    rankings: string;
    connectWallet: string;
    disconnect: string;
    connecting: string;
    login: string;
  };
  login: {
    title: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
    orContinueWith: string;
    continueWithGoogle: string;
    continueWithApple: string;
    noAccount: string;
    createAccount: string;
    errors: {
      loginNotFound: string;
      accessDenied: string;
    };
  };
  landing: {
    tagline: string;
    badge: string;
    hero: {
      title: string;
      subtitle: string;
      description: string;
      ctaBetting?: string;
      ctaDashboard?: string;
      ctaExplore: string;
    };
    stats: {
      bots: string;
      users: string;
      volume: string;
      uptime: string;
    };
    services: {
      title: string;
      subtitle: string;
      bots: {
        title: string;
        description: string;
        detailTitle?: string;
        detailDescription?: string;
        features?: string[] | Record<string, string>;
        cta: string;
        strategies?: Record<string, string>;
      };
      betting: {
        title: string;
        description: string;
        detailTitle?: string;
        detailDescription?: string;
        features?: string[] | Record<string, string>;
        cta: string;
      };
      launch: {
        title: string;
        description: string;
        detailTitle?: string;
        detailDescription?: string;
        features?: string[] | Record<string, string>;
        cta?: string;
      };
    };
    showcase: {
      label?: string;
      title?: string;
      subtitle?: string;
      bots?: any;
      betting?: any;
      launch?: any;
    };
    why?: {
      title: string;
      subtitle: string;
      reasons: Record<string, { title: string; description: string }>;
    };
    features?: {
      title: string;
      subtitle: string;
      security: {
        title: string;
        description: string;
      };
      scalability: {
        title: string;
        description: string;
      };
      innovation: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      description: string;
      subtitle?: string;
      primary: string;
      secondary: string;
    };
    learnMore: string;
  };
  features: {
    cryptoPayments: {
      title: string;
      description: string;
    };
    smartContracts: {
      title: string;
      description: string;
    };
    peerToPeer: {
      title: string;
      description: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    glowText: string;
    subtitle: string;
    cta?: string;
    startBetting: string;
    explorePlatform: string;
  };
  events: {
    title: string;
    subtitle: string;
    team1: string;
    team2: string;
    betAmount: string;
    betAmountPlaceholder: string;
    placeBet: string;
    processing: string;
    bettingClosed: string;
    live?: string;
    upcoming?: string;
    odds?: string;
    markets?: string;
    timeLeft: {
      days: string;
      hours: string;
      minutes: string;
      remaining: string;
    };
  };
  portfolio: {
    title: string;
    subtitle: string;
    connectMessage: string;
    connectDescription: string;
    balance?: string;
    earnings?: string;
    totalBets?: string;
    activeBets?: string;
    winRate?: string;
    stats: {
      totalBets: string;
      totalWagered: string;
      activeBets: string;
    };
    history: {
      title: string;
      description: string;
      noHistory: string;
      event: string;
      confirmed: string;
      pending: string;
    };
  };
  rankings?: {
    title: string;
    subtitle: string;
    rank: string;
    user: string;
    bets: string;
    winRate: string;
    profit: string;
    tier: string;
    tiers: {
      bronze: string;
      silver: string;
      gold: string;
      platinum: string;
      diamond: string;
    };
  };
  footer?: {
    description: string;
    platform: string;
    bets: string;
    portfolio: string;
    rankings: string;
    resources: string;
    docs: string;
    support: string;
    github: string;
    whitepaper: string;
    legal: string;
    terms: string;
    privacy: string;
    cookies: string;
    licenses: string;
  };
  toasts: {
    walletConnected: string;
    walletDisconnected: string;
    walletRequired: string;
    walletConnectionFailed: string;
    betPlaced: string;
    betFailed: string;
    loadEventsFailed: string;
    loadHistoryFailed: string;
    connectFirst: string;
    enterAmount: string;
  };
  leagues: Record<string, string>;
  sports?: Record<string, string>;
}

export type Translations = Record<string, Translation>;

export type LanguageCode = 'en-US' | 'en-GB' | 'pt-BR' | 'es-ES' | 'fr-FR' | 'de-DE' | 'zh-CN' | 'ja-JP';

