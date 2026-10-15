import type { Translations } from './types';

export const translations: Translations = {
  "en-US": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Home",
      "login": "Login"
    },
    "login": {
      "title": "Login",
      "email": "Email",
      "emailPlaceholder": "your@email.com",
      "password": "Password",
      "passwordPlaceholder": "••••••••",
      "signIn": "Sign In",
      "signingIn": "Signing in...",
      "orContinueWith": "or continue with",
      "continueWithGoogle": "Continue with Google",
      "continueWithApple": "Continue with Apple",
      "noAccount": "Don't have an account?",
      "createAccount": "Create account",
      "errors": {
        "loginNotFound": "Login not found",
        "accessDenied": "Access not allowed"
      }
    },
    "dashboard": {
      "welcome": "Welcome",
      "chooseDashboard": "Choose a dashboard",
      "manageBots": {
        "title": "Manage Bots",
        "description": "Create, monitor and manage your trading bots",
        "button": "Open Manager"
      },
      "metrics": {
        "title": "Metrics",
        "description": "View real-time performance and statistics",
        "button": "Open Dashboard"
      }
    },
    "landing": {
      "tagline": "Market maker and arbitrage bots",
      "hero": {
        "title": "Bots that trade",
        "subtitle": "the spread.",
        "description": "Market making, simple arbitrage and triangular arbitrage on centralized exchanges like Binance, OKX, Bybit, Coinbase and Bitfinex, running around the clock.",
        "ctaDashboard": "Access Dashboard",
        "ctaExplore": "Explore strategies"
      },
      "stats": {
        "bots": "Active Bots",
        "users": "Active Users",
        "volume": "Trading Volume",
        "uptime": "Uptime"
      },
      "why": {
        "title": "Why Choose Znit.io?",
        "subtitle": "Automated strategies built for centralized exchanges.",
        "reasons": {
          "security": {
            "title": "Funds stay on the exchange",
            "description": "Bots trade through exchange API keys. Your assets remain in your own exchange account."
          },
          "technology": {
            "title": "Quant-grade strategies",
            "description": "Market making, arbitrage and adaptive models running on low-latency execution engines."
          },
          "performance": {
            "title": "Always on",
            "description": "Bots run around the clock with 99.9% uptime."
          },
          "community": {
            "title": "Many exchanges, one dashboard",
            "description": "Connect Binance, OKX, Bybit, Coinbase, Bitfinex and more, and manage every bot in one place."
          },
          "transparency": {
            "title": "Full visibility",
            "description": "Every order and fill is logged, so you can audit what each bot did."
          },
          "speed": {
            "title": "Fast execution",
            "description": "Orders go out through exchange APIs with latency in mind, where spreads close in milliseconds."
          }
        }
      },
      "cta": {
        "title": "Ready to put a bot to work?",
        "description": "Open the dashboard to create, monitor and manage your trading bots."
      },
      "hud": "LIVE LOOP",
      "tape": "Simulated spread feed",
      "boot": [
        "znit.core online",
        "exchange APIs linked",
        "spread scanners armed"
      ],
      "rail": [
        "Start",
        "Strategies",
        "Simulator",
        "Process",
        "Why Znit",
        "Access"
      ],
      "strategies": {
        "title": "Four ways to earn the spread",
        "subtitle": "Scroll through the strategies our bots run.",
        "items": [
          {
            "title": "Market making",
            "description": "Quote both sides of the book, collect the bid-ask spread and keep inventory balanced as the market moves.",
            "tags": [
              "Bid and ask quoting",
              "Inventory control",
              "Spread capture"
            ]
          },
          {
            "title": "Simple arbitrage",
            "description": "Buy an asset where it is cheap and sell it where it is dear, across exchanges, before the gap closes.",
            "tags": [
              "Cross-exchange",
              "Millisecond execution",
              "Net of fees"
            ]
          },
          {
            "title": "Triangular arbitrage",
            "description": "Chain three pairs on one exchange, USDT to BTC to ETH and back, and keep what the loop leaves over.",
            "tags": [
              "Single venue",
              "Three legs",
              "Pricing gaps"
            ]
          },
          {
            "title": "Adaptive models",
            "description": "Machine learning models read order flow and retune strategy parameters as conditions change.",
            "tags": [
              "Order flow signals",
              "Auto retuning",
              "Backtested"
            ]
          }
        ]
      },
      "sim": {
        "title": "Run a triangular loop",
        "subtitle": "Move the sliders and see what one USDT, BTC, ETH loop returns after fees.",
        "notional": "Capital per loop",
        "gap": "Price gap on the last leg",
        "fee": "Fee per trade",
        "breakeven": "Break-even gap",
        "result": "Loop result",
        "note": "Illustrative prices and a single loop. Real results depend on liquidity, latency and slippage."
      },
      "process": {
        "title": "From idea to live bot",
        "subtitle": "Every strategy goes through the same four steps.",
        "steps": [
          {
            "title": "Scope",
            "description": "Define the market, the exchanges and the edge worth chasing."
          },
          {
            "title": "Backtest",
            "description": "Replay historical data and tune parameters before any capital moves."
          },
          {
            "title": "Limit",
            "description": "Set position, loss and exposure limits the bot cannot cross."
          },
          {
            "title": "Monitor",
            "description": "Go live with continuous monitoring and adjustment."
          }
        ]
      }
    },
    "toasts": {
      "signedOut": "Signed out successfully",
      "signOutError": "Error signing out"
    }
  },
  "en-GB": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Home",
      "login": "Login"
    },
    "login": {
      "title": "Login",
      "email": "Email",
      "emailPlaceholder": "your@email.com",
      "password": "Password",
      "passwordPlaceholder": "••••••••",
      "signIn": "Sign In",
      "signingIn": "Signing in...",
      "orContinueWith": "or continue with",
      "continueWithGoogle": "Continue with Google",
      "continueWithApple": "Continue with Apple",
      "noAccount": "Don't have an account?",
      "createAccount": "Create account",
      "errors": {
        "loginNotFound": "Login not found",
        "accessDenied": "Access not allowed"
      }
    },
    "dashboard": {
      "welcome": "Welcome",
      "chooseDashboard": "Choose a dashboard",
      "manageBots": {
        "title": "Manage Bots",
        "description": "Create, monitor and manage your trading bots",
        "button": "Open Manager"
      },
      "metrics": {
        "title": "Metrics",
        "description": "View real-time performance and statistics",
        "button": "Open Dashboard"
      }
    },
    "landing": {
      "tagline": "Market maker and arbitrage bots",
      "hero": {
        "title": "Building the Future of",
        "subtitle": "Algorithmic Trading",
        "description": "Znit.io is pioneering the next generation of automated trading with cutting-edge trading bots and advanced algorithms for crypto and traditional markets.",
        "ctaDashboard": "Access Dashboard",
        "ctaExplore": "Explore strategies"
      },
      "stats": {
        "bots": "Active Bots",
        "users": "Active Users",
        "volume": "Trading Volume",
        "uptime": "Uptime"
      },
      "why": {
        "title": "Why Choose Znit.io?",
        "subtitle": "Automated strategies built for centralized exchanges.",
        "reasons": {
          "security": {
            "title": "Funds stay on the exchange",
            "description": "Bots trade through exchange API keys. Your assets remain in your own exchange account."
          },
          "technology": {
            "title": "Quant-grade strategies",
            "description": "Market making, arbitrage and adaptive models running on low-latency execution engines."
          },
          "performance": {
            "title": "Always on",
            "description": "Bots run around the clock with 99.9% uptime."
          },
          "community": {
            "title": "Many exchanges, one dashboard",
            "description": "Connect Binance, OKX, Bybit, Coinbase, Bitfinex and more, and manage every bot in one place."
          },
          "transparency": {
            "title": "Full visibility",
            "description": "Every order and fill is logged, so you can audit what each bot did."
          },
          "speed": {
            "title": "Fast execution",
            "description": "Orders go out through exchange APIs with latency in mind, where spreads close in milliseconds."
          }
        }
      },
      "cta": {
        "title": "Ready to Get Started?",
        "description": "Open the dashboard to create, monitor and manage your trading bots."
      }
    },
    "toasts": {
      "signedOut": "Signed out successfully",
      "signOutError": "Error signing out"
    }
  },
  "pt-BR": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Início",
      "login": "Login"
    },
    "login": {
      "title": "Login",
      "email": "Email",
      "emailPlaceholder": "seu@email.com",
      "password": "Senha",
      "passwordPlaceholder": "••••••••",
      "signIn": "Entrar",
      "signingIn": "Entrando...",
      "orContinueWith": "ou continue com",
      "continueWithGoogle": "Continue com Google",
      "continueWithApple": "Continue com Apple",
      "noAccount": "Não tem uma conta?",
      "createAccount": "Criar conta",
      "errors": {
        "loginNotFound": "Login não existente",
        "accessDenied": "Acesso não permitido"
      }
    },
    "dashboard": {
      "welcome": "Bem-vindo",
      "chooseDashboard": "Escolha um dashboard",
      "manageBots": {
        "title": "Gerenciar Bots",
        "description": "Crie, monitore e gerencie seus bots de trading",
        "button": "Abrir Gerenciador"
      },
      "metrics": {
        "title": "Métricas",
        "description": "Visualize performance e estatísticas em tempo real",
        "button": "Abrir Dashboard"
      }
    },
    "landing": {
      "tagline": "Bots de market maker e arbitragem",
      "hero": {
        "title": "Bots que operam",
        "subtitle": "o spread.",
        "description": "Market making, arbitragem simples e arbitragem triangular em exchanges centralizadas como Binance, OKX, Bybit, Coinbase e Bitfinex, operando 24 horas por dia.",
        "ctaDashboard": "Acessar Dashboard",
        "ctaExplore": "Explorar estratégias"
      },
      "stats": {
        "bots": "Bots Ativos",
        "users": "Usuários Ativos",
        "volume": "Volume de Trading",
        "uptime": "Uptime"
      },
      "why": {
        "title": "Por Que Escolher a Znit.io?",
        "subtitle": "Estratégias automatizadas feitas para exchanges centralizadas.",
        "reasons": {
          "security": {
            "title": "Os fundos ficam na exchange",
            "description": "Os bots operam por chaves de API da exchange. Seus ativos continuam na sua própria conta."
          },
          "technology": {
            "title": "Estratégias de nível quant",
            "description": "Market making, arbitragem e modelos adaptativos rodando em motores de execução de baixa latência."
          },
          "performance": {
            "title": "Sempre ligado",
            "description": "Os bots operam 24 horas por dia com 99,9% de uptime."
          },
          "community": {
            "title": "Várias exchanges, um dashboard",
            "description": "Conecte Binance, OKX, Bybit, Coinbase, Bitfinex e outras, e gerencie todos os bots em um só lugar."
          },
          "transparency": {
            "title": "Visibilidade total",
            "description": "Cada ordem e execução fica registrada, para você auditar o que cada bot fez."
          },
          "speed": {
            "title": "Execução rápida",
            "description": "As ordens saem pelas APIs das exchanges pensando em latência, onde os spreads fecham em milissegundos."
          }
        }
      },
      "cta": {
        "title": "Pronto para colocar um bot para trabalhar?",
        "description": "Abra o dashboard para criar, monitorar e gerenciar seus bots de trading."
      },
      "hud": "LOOP AO VIVO",
      "tape": "Feed de spreads simulado",
      "boot": [
        "znit.core online",
        "APIs das exchanges conectadas",
        "scanners de spread armados"
      ],
      "rail": [
        "Início",
        "Estratégias",
        "Simulador",
        "Processo",
        "Por que Znit",
        "Acesso"
      ],
      "strategies": {
        "title": "Quatro formas de capturar o spread",
        "subtitle": "Role pelas estratégias que nossos bots executam.",
        "items": [
          {
            "title": "Market making",
            "description": "Cota os dois lados do book, captura o spread entre compra e venda e mantém o estoque equilibrado conforme o mercado se move.",
            "tags": [
              "Cotação bid e ask",
              "Controle de estoque",
              "Captura de spread"
            ]
          },
          {
            "title": "Arbitragem simples",
            "description": "Compra o ativo onde está barato e vende onde está caro, entre exchanges, antes que a diferença feche.",
            "tags": [
              "Entre exchanges",
              "Execução em milissegundos",
              "Líquido de taxas"
            ]
          },
          {
            "title": "Arbitragem triangular",
            "description": "Encadeia três pares na mesma exchange, de USDT para BTC, ETH e de volta, e fica com o que o ciclo deixa.",
            "tags": [
              "Uma exchange",
              "Três operações",
              "Distorções de preço"
            ]
          },
          {
            "title": "Modelos adaptativos",
            "description": "Modelos de machine learning leem o fluxo de ordens e reajustam os parâmetros conforme as condições mudam.",
            "tags": [
              "Sinais de fluxo",
              "Reajuste automático",
              "Backtestado"
            ]
          }
        ]
      },
      "sim": {
        "title": "Rode um ciclo triangular",
        "subtitle": "Mexa nos controles e veja quanto um ciclo USDT, BTC, ETH retorna depois das taxas.",
        "notional": "Capital por ciclo",
        "gap": "Diferença de preço na última perna",
        "fee": "Taxa por operação",
        "breakeven": "Diferença de equilíbrio",
        "result": "Resultado do ciclo",
        "note": "Preços ilustrativos e um único ciclo. O resultado real depende de liquidez, latência e slippage."
      },
      "process": {
        "title": "Da ideia ao bot em produção",
        "subtitle": "Toda estratégia passa pelas mesmas quatro etapas.",
        "steps": [
          {
            "title": "Escopo",
            "description": "Definir o mercado, as exchanges e a vantagem que vale perseguir."
          },
          {
            "title": "Backtest",
            "description": "Reproduzir dados históricos e ajustar parâmetros antes de mover capital."
          },
          {
            "title": "Limites",
            "description": "Definir limites de posição, perda e exposição que o bot não pode ultrapassar."
          },
          {
            "title": "Monitoramento",
            "description": "Entrar em produção com monitoramento e ajuste contínuos."
          }
        ]
      }
    },
    "toasts": {
      "signedOut": "Desconectado com sucesso",
      "signOutError": "Erro ao desconectar"
    }
  },
  "es-ES": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Inicio",
      "login": "Iniciar sesión"
    },
    "login": {
      "title": "Iniciar sesión",
      "email": "Email",
      "emailPlaceholder": "tu@email.com",
      "password": "Contraseña",
      "passwordPlaceholder": "••••••••",
      "signIn": "Entrar",
      "signingIn": "Entrando...",
      "orContinueWith": "o continúa con",
      "continueWithGoogle": "Continuar con Google",
      "continueWithApple": "Continuar con Apple",
      "noAccount": "¿No tienes una cuenta?",
      "createAccount": "Crear cuenta",
      "errors": {
        "loginNotFound": "Login no encontrado",
        "accessDenied": "Acceso no permitido"
      }
    },
    "dashboard": {
      "welcome": "Bienvenido",
      "chooseDashboard": "Elige un dashboard",
      "manageBots": {
        "title": "Gestionar Bots",
        "description": "Crea, monitorea y gestiona tus bots de trading",
        "button": "Abrir Gestor"
      },
      "metrics": {
        "title": "Métricas",
        "description": "Visualiza rendimiento y estadísticas en tiempo real",
        "button": "Abrir Dashboard"
      }
    },
    "landing": {
      "tagline": "Bots de market maker y arbitraje",
      "hero": {
        "title": "Construyendo el Futuro del",
        "subtitle": "Trading Algorítmico",
        "description": "Znit.io está pioneriando la próxima generación de trading automatizado con bots de trading avanzados y algoritmos de vanguardia para mercados cripto y tradicionales.",
        "ctaDashboard": "Acceder al Dashboard",
        "ctaExplore": "Explorar Servicios"
      },
      "stats": {
        "bots": "Bots Activos",
        "users": "Usuarios Activos",
        "volume": "Volumen de Trading",
        "uptime": "Uptime"
      },
      "why": {
        "title": "¿Por Qué Elegir Znit.io?",
        "subtitle": "Estrategias automatizadas para exchanges centralizados.",
        "reasons": {
          "security": {
            "title": "Los fondos se quedan en el exchange",
            "description": "Los bots operan mediante claves API del exchange. Tus activos siguen en tu propia cuenta."
          },
          "technology": {
            "title": "Estrategias de nivel quant",
            "description": "Market making, arbitraje y modelos adaptativos sobre motores de ejecución de baja latencia."
          },
          "performance": {
            "title": "Siempre activo",
            "description": "Los bots operan las 24 horas con 99,9 % de disponibilidad."
          },
          "community": {
            "title": "Varios exchanges, un panel",
            "description": "Conecta Binance, OKX, Bybit, Coinbase, Bitfinex y más, y gestiona todos los bots en un solo lugar."
          },
          "transparency": {
            "title": "Visibilidad total",
            "description": "Cada orden y ejecución queda registrada para que puedas auditar lo que hizo cada bot."
          },
          "speed": {
            "title": "Ejecución rápida",
            "description": "Las órdenes salen por las API de los exchanges pensando en la latencia, donde los spreads se cierran en milisegundos."
          }
        }
      },
      "cta": {
        "title": "¿Listo Para Comenzar?",
        "description": "Abre el panel para crear, monitorizar y gestionar tus bots de trading."
      }
    },
    "toasts": {
      "signedOut": "Sesión cerrada exitosamente",
      "signOutError": "Error al cerrar sesión"
    }
  },
  "fr-FR": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Accueil",
      "login": "Connexion"
    },
    "login": {
      "title": "Connexion",
      "email": "Email",
      "emailPlaceholder": "votre@email.com",
      "password": "Mot de passe",
      "passwordPlaceholder": "••••••••",
      "signIn": "Se connecter",
      "signingIn": "Connexion...",
      "orContinueWith": "ou continuez avec",
      "continueWithGoogle": "Continuer avec Google",
      "continueWithApple": "Continuer avec Apple",
      "noAccount": "Vous n'avez pas de compte?",
      "createAccount": "Créer un compte",
      "errors": {
        "loginNotFound": "Login non trouvé",
        "accessDenied": "Accès non autorisé"
      }
    },
    "dashboard": {
      "welcome": "Bienvenue",
      "chooseDashboard": "Choisissez un tableau de bord",
      "manageBots": {
        "title": "Gérer les Bots",
        "description": "Créez, surveillez et gérez vos bots de trading",
        "button": "Ouvrir le Gestionnaire"
      },
      "metrics": {
        "title": "Métriques",
        "description": "Visualisez les performances et statistiques en temps réel",
        "button": "Ouvrir le Tableau de Bord"
      }
    },
    "landing": {
      "tagline": "Bots de market making et d'arbitrage",
      "hero": {
        "title": "Construire l'Avenir du",
        "subtitle": "Trading Algorithmique",
        "description": "Znit.io est pionnier de la prochaine génération de trading automatisé avec des bots de trading de pointe et des algorithmes avancés pour les marchés crypto et traditionnels.",
        "ctaDashboard": "Accéder au Tableau de Bord",
        "ctaExplore": "Explorer les Services"
      },
      "stats": {
        "bots": "Bots Actifs",
        "users": "Utilisateurs Actifs",
        "volume": "Volume de Trading",
        "uptime": "Disponibilité"
      },
      "why": {
        "title": "Pourquoi Choisir Znit.io?",
        "subtitle": "Des stratégies automatisées pour les plateformes d'échange centralisées.",
        "reasons": {
          "security": {
            "title": "Les fonds restent sur la plateforme",
            "description": "Les bots opèrent via les clés API de la plateforme. Vos actifs restent sur votre propre compte."
          },
          "technology": {
            "title": "Stratégies de niveau quant",
            "description": "Market making, arbitrage et modèles adaptatifs sur des moteurs d'exécution à faible latence."
          },
          "performance": {
            "title": "Toujours actif",
            "description": "Les bots tournent 24 h/24 avec 99,9 % de disponibilité."
          },
          "community": {
            "title": "Plusieurs plateformes, un tableau de bord",
            "description": "Connectez Binance, OKX, Bybit, Coinbase, Bitfinex et d'autres, et gérez tous vos bots au même endroit."
          },
          "transparency": {
            "title": "Visibilité totale",
            "description": "Chaque ordre et chaque exécution est enregistré pour auditer l'activité de chaque bot."
          },
          "speed": {
            "title": "Exécution rapide",
            "description": "Les ordres partent par les API des plateformes en visant la latence, là où les spreads se referment en millisecondes."
          }
        }
      },
      "cta": {
        "title": "Prêt à Commencer?",
        "description": "Ouvrez le tableau de bord pour créer, surveiller et gérer vos bots de trading."
      }
    },
    "toasts": {
      "signedOut": "Déconnecté avec succès",
      "signOutError": "Erreur lors de la déconnexion"
    }
  },
  "de-DE": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "Startseite",
      "login": "Anmelden"
    },
    "login": {
      "title": "Anmelden",
      "email": "Email",
      "emailPlaceholder": "deine@email.com",
      "password": "Passwort",
      "passwordPlaceholder": "••••••••",
      "signIn": "Einloggen",
      "signingIn": "Anmeldung...",
      "orContinueWith": "oder fortfahren mit",
      "continueWithGoogle": "Mit Google fortfahren",
      "continueWithApple": "Mit Apple fortfahren",
      "noAccount": "Noch kein Konto?",
      "createAccount": "Konto erstellen",
      "errors": {
        "loginNotFound": "Login nicht gefunden",
        "accessDenied": "Zugriff nicht erlaubt"
      }
    },
    "dashboard": {
      "welcome": "Willkommen",
      "chooseDashboard": "Wählen Sie ein Dashboard",
      "manageBots": {
        "title": "Bots Verwalten",
        "description": "Erstellen, überwachen und verwalten Sie Ihre Trading-Bots",
        "button": "Manager Öffnen"
      },
      "metrics": {
        "title": "Metriken",
        "description": "Sehen Sie Echtzeit-Performance und Statistiken",
        "button": "Dashboard Öffnen"
      }
    },
    "landing": {
      "tagline": "Market-Maker- und Arbitrage-Bots",
      "hero": {
        "title": "Die Zukunft des",
        "subtitle": "Algorithmischen Handels Bauen",
        "description": "Znit.io ist Vorreiter der nächsten Generation des automatisierten Handels mit hochmodernen Trading-Bots und fortschrittlichen Algorithmen für Krypto- und traditionelle Märkte.",
        "ctaDashboard": "Zum Dashboard",
        "ctaExplore": "Dienste Erkunden"
      },
      "stats": {
        "bots": "Aktive Bots",
        "users": "Aktive Benutzer",
        "volume": "Handelsvolumen",
        "uptime": "Verfügbarkeit"
      },
      "why": {
        "title": "Warum Znit.io Wählen?",
        "subtitle": "Automatisierte Strategien für zentralisierte Börsen.",
        "reasons": {
          "security": {
            "title": "Gelder bleiben an der Börse",
            "description": "Die Bots handeln über API-Schlüssel der Börse. Ihre Assets bleiben auf Ihrem eigenen Konto."
          },
          "technology": {
            "title": "Quant-Strategien",
            "description": "Market Making, Arbitrage und adaptive Modelle auf Ausführungs-Engines mit niedriger Latenz."
          },
          "performance": {
            "title": "Immer aktiv",
            "description": "Die Bots laufen rund um die Uhr mit 99,9 % Verfügbarkeit."
          },
          "community": {
            "title": "Viele Börsen, ein Dashboard",
            "description": "Verbinden Sie Binance, OKX, Bybit, Coinbase, Bitfinex und mehr und verwalten Sie alle Bots an einem Ort."
          },
          "transparency": {
            "title": "Volle Transparenz",
            "description": "Jede Order und jede Ausführung wird protokolliert, damit Sie nachvollziehen können, was jeder Bot getan hat."
          },
          "speed": {
            "title": "Schnelle Ausführung",
            "description": "Orders gehen über die Börsen-APIs mit Blick auf Latenz hinaus, denn Spreads schließen sich in Millisekunden."
          }
        }
      },
      "cta": {
        "title": "Bereit Loszulegen?",
        "description": "Öffnen Sie das Dashboard, um Ihre Trading-Bots zu erstellen, zu überwachen und zu verwalten."
      }
    },
    "toasts": {
      "signedOut": "Erfolgreich abgemeldet",
      "signOutError": "Fehler beim Abmelden"
    }
  },
  "zh-CN": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "首页",
      "login": "登录"
    },
    "login": {
      "title": "登录",
      "email": "邮箱",
      "emailPlaceholder": "your@email.com",
      "password": "密码",
      "passwordPlaceholder": "••••••••",
      "signIn": "登录",
      "signingIn": "登录中...",
      "orContinueWith": "或继续使用",
      "continueWithGoogle": "使用Google继续",
      "continueWithApple": "使用Apple继续",
      "noAccount": "还没有账户？",
      "createAccount": "创建账户",
      "errors": {
        "loginNotFound": "登录不存在",
        "accessDenied": "访问被拒绝"
      }
    },
    "dashboard": {
      "welcome": "欢迎",
      "chooseDashboard": "选择一个仪表板",
      "manageBots": {
        "title": "管理机器人",
        "description": "创建、监控和管理您的交易机器人",
        "button": "打开管理器"
      },
      "metrics": {
        "title": "指标",
        "description": "查看实时性能和统计数据",
        "button": "打开仪表板"
      }
    },
    "landing": {
      "tagline": "做市与套利机器人",
      "hero": {
        "title": "构建未来的",
        "subtitle": "算法交易",
        "description": "Znit.io正在开创下一代自动化交易，拥有尖端交易机器人和先进算法，适用于加密货币和传统市场。",
        "ctaDashboard": "访问仪表板",
        "ctaExplore": "探索服务"
      },
      "stats": {
        "bots": "活跃机器人",
        "users": "活跃用户",
        "volume": "交易量",
        "uptime": "运行时间"
      },
      "why": {
        "title": "为什么选择Znit.io？",
        "subtitle": "为中心化交易所打造的自动化策略。",
        "reasons": {
          "security": {
            "title": "资金留在交易所",
            "description": "机器人通过交易所 API 密钥交易，您的资产始终保留在自己的账户中。"
          },
          "technology": {
            "title": "量化级策略",
            "description": "做市、套利和自适应模型运行在低延迟执行引擎上。"
          },
          "performance": {
            "title": "全天候运行",
            "description": "机器人 24 小时运行，可用性达 99.9%。"
          },
          "community": {
            "title": "多家交易所，一个仪表板",
            "description": "连接 Binance、Bybit、Coinbase、Bitfinex 等，在一处管理所有机器人。"
          },
          "transparency": {
            "title": "完全透明",
            "description": "每笔订单和成交都有记录，方便您审计每个机器人的操作。"
          },
          "speed": {
            "title": "快速执行",
            "description": "订单通过交易所 API 发出并兼顾延迟，因为价差会在毫秒内收敛。"
          }
        }
      },
      "cta": {
        "title": "准备开始了吗？",
        "description": "打开仪表板，创建、监控和管理您的交易机器人。"
      }
    },
    "toasts": {
      "signedOut": "退出成功",
      "signOutError": "退出时出错"
    }
  },
  "ja-JP": {
    "nav": {
      "brand": "Znit.io",
      "subtitle": "Trading Bots",
      "home": "ホーム",
      "login": "ログイン"
    },
    "login": {
      "title": "ログイン",
      "email": "メール",
      "emailPlaceholder": "your@email.com",
      "password": "パスワード",
      "passwordPlaceholder": "••••••••",
      "signIn": "サインイン",
      "signingIn": "サインイン中...",
      "orContinueWith": "または続行",
      "continueWithGoogle": "Googleで続行",
      "continueWithApple": "Appleで続行",
      "noAccount": "アカウントをお持ちでない方",
      "createAccount": "アカウント作成",
      "errors": {
        "loginNotFound": "ログインが見つかりません",
        "accessDenied": "アクセスが許可されていません"
      }
    },
    "dashboard": {
      "welcome": "ようこそ",
      "chooseDashboard": "ダッシュボードを選択",
      "manageBots": {
        "title": "ボット管理",
        "description": "トレーディングボットの作成、監視、管理",
        "button": "マネージャーを開く"
      },
      "metrics": {
        "title": "メトリクス",
        "description": "リアルタイムのパフォーマンスと統計を表示",
        "button": "ダッシュボードを開く"
      }
    },
    "landing": {
      "tagline": "マーケットメイクと裁定取引のボット",
      "hero": {
        "title": "未来を構築する",
        "subtitle": "アルゴリズム取引",
        "description": "Znit.ioは、最先端のトレーディングボットと先進的なアルゴリズムで、暗号通貨と従来市場向けの次世代自動取引を開拓しています。",
        "ctaDashboard": "ダッシュボードにアクセス",
        "ctaExplore": "サービスを探索"
      },
      "stats": {
        "bots": "アクティブボット",
        "users": "アクティブユーザー",
        "volume": "取引量",
        "uptime": "稼働時間"
      },
      "why": {
        "title": "なぜZnit.ioを選ぶのか？",
        "subtitle": "中央集権型取引所向けの自動化戦略。",
        "reasons": {
          "security": {
            "title": "資金は取引所に残ります",
            "description": "ボットは取引所のAPIキーを通じて取引します。資産はご自身の口座に残ります。"
          },
          "technology": {
            "title": "クオンツ水準の戦略",
            "description": "マーケットメイク、裁定取引、適応型モデルを低遅延の執行エンジンで実行します。"
          },
          "performance": {
            "title": "常時稼働",
            "description": "ボットは24時間稼働し、稼働率は99.9%です。"
          },
          "community": {
            "title": "複数の取引所を1つのダッシュボードで",
            "description": "Binance、Bybit、Coinbase、Bitfinexなどに接続し、すべてのボットを一か所で管理できます。"
          },
          "transparency": {
            "title": "完全な可視性",
            "description": "すべての注文と約定が記録され、各ボットの動作を監査できます。"
          },
          "speed": {
            "title": "高速な執行",
            "description": "スプレッドはミリ秒で縮まるため、レイテンシを意識して取引所APIから注文を送信します。"
          }
        }
      },
      "cta": {
        "title": "始める準備はできましたか？",
        "description": "ダッシュボードを開いて、トレーディングボットを作成、監視、管理しましょう。"
      }
    },
    "toasts": {
      "signedOut": "サインアウトしました",
      "signOutError": "サインアウトエラー"
    }
  }
};
