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
      "badge": "Revolutionary DeFi Solutions",
      "hero": {
        "title": "Bots that trade",
        "subtitle": "the spread.",
        "description": "Market making, simple arbitrage and triangular arbitrage on crypto venues, running around the clock.",
        "ctaDashboard": "Access Dashboard",
        "ctaExplore": "Explore strategies"
      },
      "stats": {
        "bots": "Active Bots",
        "users": "Active Users",
        "volume": "Trading Volume",
        "uptime": "Uptime"
      },
      "services": {
        "title": "Our Service",
        "subtitle": "Advanced trading bots with cutting-edge algorithms and strategies",
        "bots": {
          "title": "Trading Bots",
          "description": "Highly scalable bots for crypto and traditional markets with advanced strategies including liquidity pool, mean reversion, trending flow, machine learning, high-frequency trading and arbitrage.",
          "detailTitle": "Advanced Algorithmic Trading",
          "detailDescription": "Our sophisticated trading bots leverage cutting-edge algorithms and machine learning to maximize returns across multiple markets. From high-frequency trading to complex arbitrage strategies, we provide institutional-grade tools for everyone.",
          "cta": "Explore Bots",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "High Frequency",
            "arbitrage": "Arbitrage"
          }
        }
      },
      "showcase": {
        "label": "Live Metrics",
        "bots": {
          "metric1": {
            "label": "Success Rate",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Active Strategies",
            "value": "156"
          },
          "metric3": {
            "label": "Total Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "Why Choose Znit.io?",
        "subtitle": "The most advanced DeFi ecosystem powered by cutting-edge technology",
        "reasons": {
          "security": {
            "title": "Bank-Grade Security",
            "description": "Military-grade encryption and multi-signature wallets protect your assets 24/7"
          },
          "technology": {
            "title": "Cutting-Edge Tech",
            "description": "Built with the latest blockchain technology and AI-powered algorithms"
          },
          "performance": {
            "title": "High Performance",
            "description": "Lightning-fast execution and 99.9% uptime guarantee for all services"
          },
          "community": {
            "title": "Strong Community",
            "description": "Join thousands of users in our growing ecosystem and governance"
          },
          "transparency": {
            "title": "Full Transparency",
            "description": "All operations are on-chain and verifiable with complete audit trails"
          },
          "speed": {
            "title": "Instant Execution",
            "description": "Sub-second transaction processing and real-time settlement"
          }
        }
      },
      "cta": {
        "title": "Ready to put a bot to work?",
        "description": "Open the dashboard to create, monitor and manage your trading bots."
      },
      "learnMore": "Learn More",
      "hud": "LIVE LOOP",
      "tape": "Simulated spread feed",
      "boot": [
        "znit.core online",
        "venues linked",
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
            "description": "Buy an asset where it is cheap and sell it where it is dear, across venues, before the gap closes.",
            "tags": [
              "Cross-venue",
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
            "description": "Define the market, the venues and the edge worth chasing."
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
      "tagline": "Next-Gen DeFi Ecosystem",
      "badge": "Revolutionary DeFi Solutions",
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
      "services": {
        "title": "Our Service",
        "subtitle": "Advanced trading bots with cutting-edge algorithms and strategies",
        "bots": {
          "title": "Trading Bots",
          "description": "Highly scalable bots for crypto and traditional markets with advanced strategies including liquidity pool, mean reversion, trending flow, machine learning, high-frequency trading and arbitrage.",
          "detailTitle": "Advanced Algorithmic Trading",
          "detailDescription": "Our sophisticated trading bots leverage cutting-edge algorithms and machine learning to maximise returns across multiple markets. From high-frequency trading to complex arbitrage strategies, we provide institutional-grade tools for everyone.",
          "cta": "Explore Bots",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "High Frequency",
            "arbitrage": "Arbitrage"
          }
        }
      },
      "showcase": {
        "label": "Live Metrics",
        "bots": {
          "metric1": {
            "label": "Success Rate",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Active Strategies",
            "value": "156"
          },
          "metric3": {
            "label": "Total Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "Why Choose Znit.io?",
        "subtitle": "The most advanced DeFi ecosystem powered by cutting-edge technology",
        "reasons": {
          "security": {
            "title": "Bank-Grade Security",
            "description": "Military-grade encryption and multi-signature wallets protect your assets 24/7"
          },
          "technology": {
            "title": "Cutting-Edge Tech",
            "description": "Built with the latest blockchain technology and AI-powered algorithms"
          },
          "performance": {
            "title": "High Performance",
            "description": "Lightning-fast execution and 99.9% uptime guarantee for all services"
          },
          "community": {
            "title": "Strong Community",
            "description": "Join thousands of users in our growing ecosystem and governance"
          },
          "transparency": {
            "title": "Full Transparency",
            "description": "All operations are on-chain and verifiable with complete audit trails"
          },
          "speed": {
            "title": "Instant Execution",
            "description": "Sub-second transaction processing and real-time settlement"
          }
        }
      },
      "cta": {
        "title": "Ready to Get Started?",
        "description": "Join thousands of users already benefiting from our revolutionary DeFi ecosystem"
      },
      "learnMore": "Learn More"
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
      "badge": "Soluções DeFi Revolucionárias",
      "hero": {
        "title": "Bots que operam",
        "subtitle": "o spread.",
        "description": "Market making, arbitragem simples e arbitragem triangular em exchanges de cripto, operando 24 horas por dia.",
        "ctaDashboard": "Acessar Dashboard",
        "ctaExplore": "Explorar estratégias"
      },
      "stats": {
        "bots": "Bots Ativos",
        "users": "Usuários Ativos",
        "volume": "Volume de Trading",
        "uptime": "Uptime"
      },
      "services": {
        "title": "Nosso Serviço",
        "subtitle": "Bots de trading avançados com algoritmos e estratégias de ponta",
        "bots": {
          "title": "Bots de Trading",
          "description": "Bots altamente escaláveis para mercados de cripto e tradicionais com estratégias avançadas incluindo liquidity pool, mean reversion, trending flow, machine learning, trading de alta frequência e arbitragem.",
          "detailTitle": "Trading Algorítmico Avançado",
          "detailDescription": "Nossos sofisticados bots de trading aproveitam algoritmos de ponta e machine learning para maximizar retornos em múltiplos mercados. De trading de alta frequência a estratégias complexas de arbitragem, fornecemos ferramentas de nível institucional para todos.",
          "cta": "Explorar Bots",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "Alta Frequência",
            "arbitrage": "Arbitragem"
          }
        }
      },
      "showcase": {
        "label": "Métricas Ao Vivo",
        "bots": {
          "metric1": {
            "label": "Taxa de Sucesso",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Estratégias Ativas",
            "value": "156"
          },
          "metric3": {
            "label": "Total de Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "Por Que Escolher a Znit.io?",
        "subtitle": "O ecossistema DeFi mais avançado alimentado por tecnologia de ponta",
        "reasons": {
          "security": {
            "title": "Segurança Bancária",
            "description": "Criptografia de nível militar e carteiras multi-assinatura protegem seus ativos 24/7"
          },
          "technology": {
            "title": "Tecnologia de Ponta",
            "description": "Construído com a mais recente tecnologia blockchain e algoritmos alimentados por IA"
          },
          "performance": {
            "title": "Alto Desempenho",
            "description": "Execução ultra-rápida e garantia de 99.9% de uptime para todos os serviços"
          },
          "community": {
            "title": "Comunidade Forte",
            "description": "Junte-se a milhares de usuários em nosso ecossistema crescente e governança"
          },
          "transparency": {
            "title": "Transparência Total",
            "description": "Todas as operações estão on-chain e verificáveis com trilhas de auditoria completas"
          },
          "speed": {
            "title": "Execução Instantânea",
            "description": "Processamento de transações em subsegundos e liquidação em tempo real"
          }
        }
      },
      "cta": {
        "title": "Pronto para colocar um bot para trabalhar?",
        "description": "Abra o dashboard para criar, monitorar e gerenciar seus bots de trading."
      },
      "learnMore": "Saiba Mais",
      "hud": "LOOP AO VIVO",
      "tape": "Feed de spreads simulado",
      "boot": [
        "znit.core online",
        "exchanges conectadas",
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
      "tagline": "Ecosistema DeFi de Nueva Generación",
      "badge": "Soluciones DeFi Revolucionarias",
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
      "services": {
        "title": "Nuestro Servicio",
        "subtitle": "Bots de trading avanzados con algoritmos y estrategias de vanguardia",
        "bots": {
          "title": "Bots de Trading",
          "description": "Bots altamente escalables para mercados cripto y tradicionales con estrategias avanzadas incluyendo liquidity pool, mean reversion, trending flow, machine learning, trading de alta frecuencia y arbitraje.",
          "detailTitle": "Trading Algorítmico Avanzado",
          "detailDescription": "Nuestros sofisticados bots de trading aprovechan algoritmos de vanguardia y machine learning para maximizar retornos en múltiples mercados. Desde trading de alta frecuencia hasta estrategias complejas de arbitraje, proporcionamos herramientas de nivel institucional para todos.",
          "cta": "Explorar Bots",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "Alta Frecuencia",
            "arbitrage": "Arbitraje"
          }
        }
      },
      "showcase": {
        "label": "Métricas en Vivo",
        "bots": {
          "metric1": {
            "label": "Tasa de Éxito",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Estrategias Activas",
            "value": "156"
          },
          "metric3": {
            "label": "Total de Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "¿Por Qué Elegir Znit.io?",
        "subtitle": "El ecosistema DeFi más avanzado impulsado por tecnología de vanguardia",
        "reasons": {
          "security": {
            "title": "Seguridad Bancaria",
            "description": "Encriptación de nivel militar y billeteras multi-firma protegen tus activos 24/7"
          },
          "technology": {
            "title": "Tecnología de Vanguardia",
            "description": "Construido con la última tecnología blockchain y algoritmos impulsados por IA"
          },
          "performance": {
            "title": "Alto Rendimiento",
            "description": "Ejecución ultrarrápida y garantía de 99.9% de uptime para todos los servicios"
          },
          "community": {
            "title": "Comunidad Fuerte",
            "description": "Únete a miles de usuarios en nuestro ecosistema creciente y gobernanza"
          },
          "transparency": {
            "title": "Transparencia Total",
            "description": "Todas las operaciones están on-chain y verificables con auditorías completas"
          },
          "speed": {
            "title": "Ejecución Instantánea",
            "description": "Procesamiento de transacciones en subsegundos y liquidación en tiempo real"
          }
        }
      },
      "cta": {
        "title": "¿Listo Para Comenzar?",
        "description": "Únete a miles de usuarios ya beneficiándose de nuestro ecosistema DeFi revolucionario"
      },
      "learnMore": "Saber Más"
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
      "tagline": "Écosystème DeFi de Nouvelle Génération",
      "badge": "Solutions DeFi Révolutionnaires",
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
      "services": {
        "title": "Notre Service",
        "subtitle": "Bots de trading avancés avec des algorithmes et stratégies de pointe",
        "bots": {
          "title": "Bots de Trading",
          "description": "Bots hautement évolutifs pour les marchés crypto et traditionnels avec des stratégies avancées.",
          "detailTitle": "Trading Algorithmique Avancé",
          "detailDescription": "Nos bots de trading sophistiqués exploitent des algorithmes de pointe et le machine learning pour maximiser les rendements.",
          "cta": "Explorer les Bots",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "Haute Fréquence",
            "arbitrage": "Arbitrage"
          }
        }
      },
      "showcase": {
        "label": "Métriques en Direct",
        "bots": {
          "metric1": {
            "label": "Taux de Réussite",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Stratégies Actives",
            "value": "156"
          },
          "metric3": {
            "label": "Total Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "Pourquoi Choisir Znit.io?",
        "subtitle": "L'écosystème DeFi le plus avancé alimenté par une technologie de pointe",
        "reasons": {
          "security": {
            "title": "Sécurité Bancaire",
            "description": "Cryptage de niveau militaire et portefeuilles multi-signatures protègent vos actifs 24/7"
          },
          "technology": {
            "title": "Technologie de Pointe",
            "description": "Construit avec la dernière technologie blockchain et algorithmes IA"
          },
          "performance": {
            "title": "Haute Performance",
            "description": "Exécution ultra-rapide et garantie de disponibilité de 99.9%"
          },
          "community": {
            "title": "Communauté Forte",
            "description": "Rejoignez des milliers d'utilisateurs dans notre écosystème croissant"
          },
          "transparency": {
            "title": "Transparence Totale",
            "description": "Toutes les opérations sont on-chain et vérifiables"
          },
          "speed": {
            "title": "Exécution Instantanée",
            "description": "Traitement des transactions en sous-seconde"
          }
        }
      },
      "cta": {
        "title": "Prêt à Commencer?",
        "description": "Rejoignez des milliers d'utilisateurs qui bénéficient déjà de notre écosystème DeFi révolutionnaire"
      },
      "learnMore": "En Savoir Plus"
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
      "tagline": "Next-Gen DeFi Ökosystem",
      "badge": "Revolutionäre DeFi Lösungen",
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
      "services": {
        "title": "Unser Dienst",
        "subtitle": "Fortschrittliche Trading-Bots mit modernsten Algorithmen und Strategien",
        "bots": {
          "title": "Trading Bots",
          "description": "Hochskalierbare Bots für Krypto- und traditionelle Märkte mit fortgeschrittenen Strategien.",
          "detailTitle": "Fortgeschrittener Algorithmischer Handel",
          "detailDescription": "Unsere ausgefeilten Trading-Bots nutzen modernste Algorithmen und maschinelles Lernen.",
          "cta": "Bots Erkunden",
          "strategies": {
            "liquidityPool": "Liquidity Pool",
            "meanReversion": "Mean Reversion",
            "trendingFlow": "Trending Flow",
            "machineLearning": "Machine Learning",
            "highFrequency": "Hochfrequenz",
            "arbitrage": "Arbitrage"
          }
        }
      },
      "showcase": {
        "label": "Live-Metriken",
        "bots": {
          "metric1": {
            "label": "Erfolgsquote",
            "value": "94.2%"
          },
          "metric2": {
            "label": "Aktive Strategien",
            "value": "156"
          },
          "metric3": {
            "label": "Gesamt Trades",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "Warum Znit.io Wählen?",
        "subtitle": "Das fortschrittlichste DeFi-Ökosystem mit modernster Technologie",
        "reasons": {
          "security": {
            "title": "Bank-Sicherheit",
            "description": "Militärische Verschlüsselung und Multi-Signatur-Wallets schützen Ihre Vermögenswerte 24/7"
          },
          "technology": {
            "title": "Modernste Technologie",
            "description": "Gebaut mit der neuesten Blockchain-Technologie und KI-Algorithmen"
          },
          "performance": {
            "title": "Hohe Leistung",
            "description": "Blitzschnelle Ausführung und 99.9% Verfügbarkeitsgarantie"
          },
          "community": {
            "title": "Starke Community",
            "description": "Treten Sie Tausenden von Benutzern in unserem wachsenden Ökosystem bei"
          },
          "transparency": {
            "title": "Volle Transparenz",
            "description": "Alle Operationen sind on-chain und verifizierbar"
          },
          "speed": {
            "title": "Sofortige Ausführung",
            "description": "Sekundenbruchteil-Transaktionsverarbeitung"
          }
        }
      },
      "cta": {
        "title": "Bereit Loszulegen?",
        "description": "Treten Sie Tausenden von Benutzern bei, die bereits von unserem revolutionären DeFi-Ökosystem profitieren"
      },
      "learnMore": "Mehr Erfahren"
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
      "tagline": "下一代DeFi生态系统",
      "badge": "革命性DeFi解决方案",
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
      "services": {
        "title": "我们的服务",
        "subtitle": "具有尖端算法和策略的高级交易机器人",
        "bots": {
          "title": "交易机器人",
          "description": "针对加密和传统市场的高度可扩展机器人，具有先进策略。",
          "detailTitle": "高级算法交易",
          "detailDescription": "我们的复杂交易机器人利用尖端算法和机器学习来最大化回报。",
          "cta": "探索机器人",
          "strategies": {
            "liquidityPool": "流动性池",
            "meanReversion": "均值回归",
            "trendingFlow": "趋势流",
            "machineLearning": "机器学习",
            "highFrequency": "高频",
            "arbitrage": "套利"
          }
        }
      },
      "showcase": {
        "label": "实时指标",
        "bots": {
          "metric1": {
            "label": "成功率",
            "value": "94.2%"
          },
          "metric2": {
            "label": "活跃策略",
            "value": "156"
          },
          "metric3": {
            "label": "总交易",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "为什么选择Znit.io？",
        "subtitle": "由尖端技术驱动的最先进DeFi生态系统",
        "reasons": {
          "security": {
            "title": "银行级安全",
            "description": "军事级加密和多重签名钱包全天候保护您的资产"
          },
          "technology": {
            "title": "尖端技术",
            "description": "采用最新区块链技术和AI算法构建"
          },
          "performance": {
            "title": "高性能",
            "description": "闪电般的执行速度和99.9%的正常运行时间保证"
          },
          "community": {
            "title": "强大社区",
            "description": "加入我们不断增长的生态系统中的数千名用户"
          },
          "transparency": {
            "title": "完全透明",
            "description": "所有操作都在链上且可验证"
          },
          "speed": {
            "title": "即时执行",
            "description": "亚秒级交易处理和实时结算"
          }
        }
      },
      "cta": {
        "title": "准备开始了吗？",
        "description": "加入数千名已从我们革命性DeFi生态系统中受益的用户"
      },
      "learnMore": "了解更多"
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
      "tagline": "次世代DeFiエコシステム",
      "badge": "革新的なDeFiソリューション",
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
      "services": {
        "title": "私たちのサービス",
        "subtitle": "最先端のアルゴリズムと戦略を備えた高度なトレーディングボット",
        "bots": {
          "title": "トレーディングボット",
          "description": "高度な戦略を持つ暗号通貨と従来市場向けの高度にスケーラブルなボット。",
          "detailTitle": "高度なアルゴリズム取引",
          "detailDescription": "当社の洗練されたトレーディングボットは、最先端のアルゴリズムと機械学習を活用してリターンを最大化します。",
          "cta": "ボットを探索",
          "strategies": {
            "liquidityPool": "流動性プール",
            "meanReversion": "平均回帰",
            "trendingFlow": "トレンドフロー",
            "machineLearning": "機械学習",
            "highFrequency": "高頻度",
            "arbitrage": "アービトラージ"
          }
        }
      },
      "showcase": {
        "label": "ライブメトリクス",
        "bots": {
          "metric1": {
            "label": "成功率",
            "value": "94.2%"
          },
          "metric2": {
            "label": "アクティブ戦略",
            "value": "156"
          },
          "metric3": {
            "label": "総取引",
            "value": "1.2M+"
          }
        }
      },
      "why": {
        "title": "なぜZnit.ioを選ぶのか？",
        "subtitle": "最先端技術によって支えられた最も先進的なDeFiエコシステム",
        "reasons": {
          "security": {
            "title": "銀行グレードのセキュリティ",
            "description": "軍事グレードの暗号化とマルチシグネチャウォレットが24/7であなたの資産を保護します"
          },
          "technology": {
            "title": "最先端テクノロジー",
            "description": "最新のブロックチェーン技術とAIアルゴリズムで構築"
          },
          "performance": {
            "title": "高性能",
            "description": "超高速実行と99.9%の稼働時間保証"
          },
          "community": {
            "title": "強力なコミュニティ",
            "description": "成長するエコシステムで数千人のユーザーに参加"
          },
          "transparency": {
            "title": "完全な透明性",
            "description": "すべての操作はオンチェーンで検証可能"
          },
          "speed": {
            "title": "即座の実行",
            "description": "サブセカンドトランザクション処理とリアルタイム決済"
          }
        }
      },
      "cta": {
        "title": "始める準備はできましたか？",
        "description": "すでに革新的なDeFiエコシステムから恩恵を受けている数千人のユーザーに参加しましょう"
      },
      "learnMore": "詳細を見る"
    },
    "toasts": {
      "signedOut": "サインアウトしました",
      "signOutError": "サインアウトエラー"
    }
  }
};
