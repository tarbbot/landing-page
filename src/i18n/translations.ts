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
        "accessDenied": "Access not allowed",
        "invalid": "Incorrect email or password",
        "notConfirmed": "User not confirmed. Please check your email."
      },
      "success": "Login successful!"
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
      "tagline": "Trading Bot Ecosystem",
      "hero": {
        "title": "Bots that trade",
        "subtitle": "the spread.",
        "description": "Market making, simple arbitrage and triangular arbitrage on centralized exchanges like Binance, OKX, Bybit, Coinbase and Bitfinex, running around the clock.",
        "ctaDashboard": "Access Dashboard",
        "ctaExplore": "Explore strategies"
      },
      "stats": {
        "bots": "Active Bots",
        "strategies": "Different Strategies",
        "volume": "Trading Volume per Month",
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
      "hud": "BOT ONLINE",
      "chart": "BTC/USDT  BOT ACTIVITY",
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
        "Exchanges",
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
      },
      "venues": {
        "title": "Where our bots trade",
        "subtitle": "Connected to the largest centralized exchanges, all managed from one dashboard.",
        "status": "Supported",
        "alt": "Znit bot core connected to Binance, OKX, Bybit, Coinbase and Bitfinex",
        "note": "Exchange names are trademarks of their respective owners. Listing an exchange does not imply a partnership or endorsement."
      },
      "manifesto": "The market never closes. Spreads open and shut in milliseconds, on every pair, on every exchange. Znit bots watch them all, so you do not have to.",
      "diagrams": {
        "spreadCaptured": "SPREAD CAPTURED",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "VENUE A  SELL",
        "venueBBuy": "VENUE B  BUY",
        "gap": "GAP",
        "loop": "1 LOOP, 3 TRADES",
        "marketData": "MARKET DATA",
        "signal": "SIGNAL",
        "altMarketMaker": "Order book with the market maker quoting both sides of the spread",
        "altArbitrage": "Two exchanges quote different prices for the same asset; the bot trades the gap",
        "altTriangle": "Triangular arbitrage loop through USDT, BTC and ETH",
        "altNeural": "Neural network layers adapting to market data"
      },
      "chartUi": {
        "simulated": "SIMULATED",
        "last": "LAST",
        "equity": "EQUITY",
        "buy": "> BUY  order filled",
        "sell": "> SELL order filled",
        "scanning": "> scanning spreads"
      }
    },
    "toasts": {
      "signedOut": "Signed out successfully",
      "signOutError": "Error signing out"
    },
    "ui": {
      "skip": "Skip to content",
      "mainNav": "Main",
      "close": "Close",
      "language": "Language",
      "userMenu": "User menu",
      "openMenu": "Open menu",
      "closeMenu": "Close menu",
      "menu": "Menu",
      "signedInAs": "Signed in as",
      "dashboard": "Dashboard",
      "signOut": "Sign Out",
      "sections": "Sections"
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
        "accessDenied": "Access not allowed",
        "invalid": "Incorrect email or password",
        "notConfirmed": "User not confirmed. Please check your email."
      },
      "success": "Login successful!"
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
      "tagline": "Trading Bot Ecosystem",
      "hero": {
        "title": "Bots that trade",
        "subtitle": "the spread.",
        "description": "Market making, simple arbitrage and triangular arbitrage on centralized exchanges like Binance, OKX, Bybit, Coinbase and Bitfinex, running around the clock.",
        "ctaDashboard": "Access Dashboard",
        "ctaExplore": "Explore strategies"
      },
      "stats": {
        "bots": "Active Bots",
        "strategies": "Different Strategies",
        "volume": "Trading Volume per Month",
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
      },
      "hud": "BOT ONLINE",
      "chart": "BTC/USDT  BOT ACTIVITY",
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
        "Exchanges",
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
      },
      "venues": {
        "title": "Where our bots trade",
        "subtitle": "Connected to the largest centralized exchanges, all managed from one dashboard.",
        "status": "Supported",
        "alt": "Znit bot core connected to Binance, OKX, Bybit, Coinbase and Bitfinex",
        "note": "Exchange names are trademarks of their respective owners. Listing an exchange does not imply a partnership or endorsement."
      },
      "manifesto": "The market never closes. Spreads open and shut in milliseconds, on every pair, on every exchange. Znit bots watch them all, so you do not have to.",
      "diagrams": {
        "spreadCaptured": "SPREAD CAPTURED",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "VENUE A  SELL",
        "venueBBuy": "VENUE B  BUY",
        "gap": "GAP",
        "loop": "1 LOOP, 3 TRADES",
        "marketData": "MARKET DATA",
        "signal": "SIGNAL",
        "altMarketMaker": "Order book with the market maker quoting both sides of the spread",
        "altArbitrage": "Two exchanges quote different prices for the same asset; the bot trades the gap",
        "altTriangle": "Triangular arbitrage loop through USDT, BTC and ETH",
        "altNeural": "Neural network layers adapting to market data"
      },
      "chartUi": {
        "simulated": "SIMULATED",
        "last": "LAST",
        "equity": "EQUITY",
        "buy": "> BUY  order filled",
        "sell": "> SELL order filled",
        "scanning": "> scanning spreads"
      }
    },
    "toasts": {
      "signedOut": "Signed out successfully",
      "signOutError": "Error signing out"
    },
    "ui": {
      "skip": "Skip to content",
      "mainNav": "Main",
      "close": "Close",
      "language": "Language",
      "userMenu": "User menu",
      "openMenu": "Open menu",
      "closeMenu": "Close menu",
      "menu": "Menu",
      "signedInAs": "Signed in as",
      "dashboard": "Dashboard",
      "signOut": "Sign Out",
      "sections": "Sections"
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
        "accessDenied": "Acesso não permitido",
        "invalid": "E-mail ou senha incorretos",
        "notConfirmed": "Usuário não confirmado. Verifique seu e-mail."
      },
      "success": "Login realizado com sucesso!"
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
      "tagline": "Estratégias de Trading Bot",
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
        "volume": "Volume de Trading por Mês",
        "uptime": "Uptime",
        "strategies": "Estratégias Diferentes"
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
      "hud": "BOT ONLINE",
      "chart": "BTC/USDT  ATIVIDADE DO BOT",
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
        "Exchanges",
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
      },
      "venues": {
        "title": "Onde nossos bots operam",
        "subtitle": "Conectados às maiores exchanges centralizadas, tudo gerenciado em um só dashboard.",
        "status": "Suportada",
        "alt": "Núcleo do bot Znit conectado a Binance, OKX, Bybit, Coinbase e Bitfinex",
        "note": "Os nomes das exchanges são marcas registradas de seus respectivos donos. Listar uma exchange não implica parceria ou endosso."
      },
      "manifesto": "O mercado nunca fecha. Os spreads abrem e fecham em milissegundos, em cada par, em cada exchange. Os bots da Znit acompanham todos, para que você não precise.",
      "diagrams": {
        "spreadCaptured": "SPREAD CAPTURADO",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "EXCHANGE A  VENDA",
        "venueBBuy": "EXCHANGE B  COMPRA",
        "gap": "DIFERENÇA",
        "loop": "1 CICLO, 3 OPERAÇÕES",
        "marketData": "DADOS DE MERCADO",
        "signal": "SINAL",
        "altMarketMaker": "Livro de ofertas com o market maker cotando os dois lados do spread",
        "altArbitrage": "Duas exchanges cotam preços diferentes para o mesmo ativo; o bot opera a diferença",
        "altTriangle": "Ciclo de arbitragem triangular passando por USDT, BTC e ETH",
        "altNeural": "Camadas de uma rede neural se adaptando aos dados de mercado"
      },
      "chartUi": {
        "simulated": "SIMULADO",
        "last": "ÚLTIMO",
        "equity": "RESULTADO",
        "buy": "> COMPRA executada",
        "sell": "> VENDA executada",
        "scanning": "> escaneando spreads"
      }
    },
    "toasts": {
      "signedOut": "Desconectado com sucesso",
      "signOutError": "Erro ao desconectar"
    },
    "ui": {
      "skip": "Pular para o conteúdo",
      "mainNav": "Principal",
      "close": "Fechar",
      "language": "Idioma",
      "userMenu": "Menu do usuário",
      "openMenu": "Abrir menu",
      "closeMenu": "Fechar menu",
      "menu": "Menu",
      "signedInAs": "Conectado como",
      "dashboard": "Dashboard",
      "signOut": "Sair",
      "sections": "Seções"
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
        "accessDenied": "Acceso no permitido",
        "invalid": "Correo o contraseña incorrectos",
        "notConfirmed": "Usuario no confirmado. Revisa tu correo."
      },
      "success": "¡Inicio de sesión correcto!"
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
      "tagline": "Estrategias de Trading Bot",
      "hero": {
        "title": "Bots que operan",
        "subtitle": "el spread.",
        "description": "Market making, arbitraje simple y arbitraje triangular en exchanges centralizados como Binance, OKX, Bybit, Coinbase y Bitfinex, operando las 24 horas.",
        "ctaDashboard": "Acceder al panel",
        "ctaExplore": "Explorar estrategias"
      },
      "stats": {
        "bots": "Bots activos",
        "strategies": "Estrategias distintas",
        "volume": "Volumen de trading al mes",
        "uptime": "Disponibilidad"
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
      },
      "hud": "BOT EN LÍNEA",
      "chart": "BTC/USDT  ACTIVIDAD DEL BOT",
      "tape": "Feed de spreads simulado",
      "boot": [
        "znit.core en línea",
        "APIs de exchanges conectadas",
        "escáneres de spread armados"
      ],
      "rail": [
        "Inicio",
        "Estrategias",
        "Simulador",
        "Exchanges",
        "Proceso",
        "Por qué Znit",
        "Acceso"
      ],
      "strategies": {
        "title": "Cuatro formas de capturar el spread",
        "subtitle": "Desplázate por las estrategias que ejecutan nuestros bots.",
        "items": [
          {
            "title": "Market making",
            "description": "Cotiza ambos lados del libro, captura el spread entre compra y venta y mantiene el inventario equilibrado a medida que se mueve el mercado.",
            "tags": [
              "Cotización bid y ask",
              "Control de inventario",
              "Captura de spread"
            ]
          },
          {
            "title": "Arbitraje simple",
            "description": "Compra un activo donde está barato y véndelo donde está caro, entre exchanges, antes de que la diferencia se cierre.",
            "tags": [
              "Entre exchanges",
              "Ejecución en milisegundos",
              "Neto de comisiones"
            ]
          },
          {
            "title": "Arbitraje triangular",
            "description": "Encadena tres pares en un mismo exchange, de USDT a BTC, a ETH y de vuelta, y quédate con lo que deja el ciclo.",
            "tags": [
              "Un solo exchange",
              "Tres operaciones",
              "Distorsiones de precio"
            ]
          },
          {
            "title": "Modelos adaptativos",
            "description": "Modelos de machine learning leen el flujo de órdenes y reajustan los parámetros de la estrategia a medida que cambian las condiciones.",
            "tags": [
              "Señales de flujo de órdenes",
              "Reajuste automático",
              "Backtesteado"
            ]
          }
        ]
      },
      "sim": {
        "title": "Ejecuta un ciclo triangular",
        "subtitle": "Mueve los controles y mira cuánto devuelve un ciclo USDT, BTC, ETH después de comisiones.",
        "notional": "Capital por ciclo",
        "gap": "Diferencia de precio en la última operación",
        "fee": "Comisión por operación",
        "breakeven": "Diferencia de equilibrio",
        "result": "Resultado del ciclo",
        "note": "Precios ilustrativos y un único ciclo. El resultado real depende de la liquidez, la latencia y el slippage."
      },
      "process": {
        "title": "De la idea al bot en producción",
        "subtitle": "Toda estrategia pasa por los mismos cuatro pasos.",
        "steps": [
          {
            "title": "Alcance",
            "description": "Definir el mercado, los exchanges y la ventaja que vale la pena perseguir."
          },
          {
            "title": "Backtest",
            "description": "Reproducir datos históricos y ajustar parámetros antes de mover capital."
          },
          {
            "title": "Límites",
            "description": "Fijar límites de posición, pérdida y exposición que el bot no puede superar."
          },
          {
            "title": "Monitorización",
            "description": "Entrar en producción con monitorización y ajuste continuos."
          }
        ]
      },
      "venues": {
        "title": "Dónde operan nuestros bots",
        "subtitle": "Conectados a los mayores exchanges centralizados, todo gestionado desde un solo panel.",
        "status": "Compatible",
        "alt": "Núcleo del bot Znit conectado a Binance, OKX, Bybit, Coinbase y Bitfinex",
        "note": "Los nombres de los exchanges son marcas registradas de sus respectivos propietarios. Mencionar un exchange no implica una alianza ni un respaldo."
      },
      "manifesto": "El mercado nunca cierra. Los spreads se abren y se cierran en milisegundos, en cada par, en cada exchange. Los bots de Znit los vigilan todos, para que tú no tengas que hacerlo.",
      "diagrams": {
        "spreadCaptured": "SPREAD CAPTURADO",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "EXCHANGE A  VENTA",
        "venueBBuy": "EXCHANGE B  COMPRA",
        "gap": "DIFERENCIA",
        "loop": "1 CICLO, 3 OPERACIONES",
        "marketData": "DATOS DE MERCADO",
        "signal": "SEÑAL",
        "altMarketMaker": "Libro de órdenes con el market maker cotizando ambos lados del spread",
        "altArbitrage": "Dos exchanges cotizan precios distintos para el mismo activo; el bot opera la diferencia",
        "altTriangle": "Ciclo de arbitraje triangular a través de USDT, BTC y ETH",
        "altNeural": "Capas de una red neuronal adaptándose a los datos de mercado"
      },
      "chartUi": {
        "simulated": "SIMULADO",
        "last": "ÚLTIMO",
        "equity": "RESULTADO",
        "buy": "> COMPRA ejecutada",
        "sell": "> VENTA ejecutada",
        "scanning": "> escaneando spreads"
      }
    },
    "toasts": {
      "signedOut": "Sesión cerrada exitosamente",
      "signOutError": "Error al cerrar sesión"
    },
    "ui": {
      "skip": "Saltar al contenido",
      "mainNav": "Principal",
      "close": "Cerrar",
      "language": "Idioma",
      "userMenu": "Menú de usuario",
      "openMenu": "Abrir menú",
      "closeMenu": "Cerrar menú",
      "menu": "Menú",
      "signedInAs": "Sesión iniciada como",
      "dashboard": "Panel",
      "signOut": "Cerrar sesión",
      "sections": "Secciones"
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
        "accessDenied": "Accès non autorisé",
        "invalid": "E-mail ou mot de passe incorrect",
        "notConfirmed": "Utilisateur non confirmé. Vérifiez votre e-mail."
      },
      "success": "Connexion réussie !"
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
      "tagline": "Stratégies de Trading Bot",
      "hero": {
        "title": "Des bots qui tradent",
        "subtitle": "le spread.",
        "description": "Market making, arbitrage simple et arbitrage triangulaire sur des plateformes d'échange centralisées comme Binance, OKX, Bybit, Coinbase et Bitfinex, en continu, 24 h/24.",
        "ctaDashboard": "Accéder au tableau de bord",
        "ctaExplore": "Explorer les stratégies"
      },
      "stats": {
        "bots": "Bots actifs",
        "strategies": "Stratégies différentes",
        "volume": "Volume de trading par mois",
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
      },
      "hud": "BOT EN LIGNE",
      "chart": "BTC/USDT  ACTIVITÉ DU BOT",
      "tape": "Flux de spreads simulé",
      "boot": [
        "znit.core en ligne",
        "API des plateformes connectées",
        "scanners de spread armés"
      ],
      "rail": [
        "Accueil",
        "Stratégies",
        "Simulateur",
        "Plateformes",
        "Processus",
        "Pourquoi Znit",
        "Accès"
      ],
      "strategies": {
        "title": "Quatre façons de capter le spread",
        "subtitle": "Faites défiler les stratégies exécutées par nos bots.",
        "items": [
          {
            "title": "Market making",
            "description": "Cote les deux côtés du carnet d'ordres, capte l'écart entre achat et vente et garde l'inventaire équilibré au gré du marché.",
            "tags": [
              "Cotation bid et ask",
              "Contrôle d'inventaire",
              "Capture du spread"
            ]
          },
          {
            "title": "Arbitrage simple",
            "description": "Achète un actif là où il est bon marché et le vend là où il est cher, entre plateformes, avant que l'écart ne se referme.",
            "tags": [
              "Entre plateformes",
              "Exécution en millisecondes",
              "Net de frais"
            ]
          },
          {
            "title": "Arbitrage triangulaire",
            "description": "Enchaîne trois paires sur une même plateforme, de l'USDT au BTC, à l'ETH et retour, et garde ce que la boucle laisse.",
            "tags": [
              "Une seule plateforme",
              "Trois ordres",
              "Écarts de prix"
            ]
          },
          {
            "title": "Modèles adaptatifs",
            "description": "Des modèles de machine learning lisent le flux d'ordres et réajustent les paramètres de la stratégie au fil des conditions.",
            "tags": [
              "Signaux de flux d'ordres",
              "Réajustement automatique",
              "Backtesté"
            ]
          }
        ]
      },
      "sim": {
        "title": "Lancez une boucle triangulaire",
        "subtitle": "Déplacez les curseurs et voyez ce que rapporte une boucle USDT, BTC, ETH après frais.",
        "notional": "Capital par boucle",
        "gap": "Écart de prix sur le dernier ordre",
        "fee": "Frais par ordre",
        "breakeven": "Écart d'équilibre",
        "result": "Résultat de la boucle",
        "note": "Prix illustratifs et une seule boucle. Le résultat réel dépend de la liquidité, de la latence et du slippage."
      },
      "process": {
        "title": "De l'idée au bot en production",
        "subtitle": "Chaque stratégie passe par les mêmes quatre étapes.",
        "steps": [
          {
            "title": "Cadrage",
            "description": "Définir le marché, les plateformes et l'avantage qui vaut la peine d'être poursuivi."
          },
          {
            "title": "Backtest",
            "description": "Rejouer les données historiques et ajuster les paramètres avant de déplacer du capital."
          },
          {
            "title": "Limites",
            "description": "Fixer des limites de position, de perte et d'exposition que le bot ne peut pas franchir."
          },
          {
            "title": "Surveillance",
            "description": "Passer en production avec une surveillance et des ajustements continus."
          }
        ]
      },
      "venues": {
        "title": "Où nos bots tradent",
        "subtitle": "Connectés aux plus grandes plateformes d'échange centralisées, le tout géré depuis un seul tableau de bord.",
        "status": "Compatible",
        "alt": "Cœur du bot Znit connecté à Binance, OKX, Bybit, Coinbase et Bitfinex",
        "note": "Les noms des plateformes sont des marques déposées de leurs propriétaires respectifs. Citer une plateforme n'implique ni partenariat ni parrainage."
      },
      "manifesto": "Le marché ne ferme jamais. Les spreads s'ouvrent et se referment en quelques millisecondes, sur chaque paire, sur chaque plateforme. Les bots Znit les surveillent tous, pour que vous n'ayez pas à le faire.",
      "diagrams": {
        "spreadCaptured": "SPREAD CAPTÉ",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "PLATEFORME A  VENTE",
        "venueBBuy": "PLATEFORME B  ACHAT",
        "gap": "ÉCART",
        "loop": "1 BOUCLE, 3 ORDRES",
        "marketData": "DONNÉES DE MARCHÉ",
        "signal": "SIGNAL",
        "altMarketMaker": "Carnet d'ordres avec le market maker cotant les deux côtés du spread",
        "altArbitrage": "Deux plateformes cotent des prix différents pour le même actif ; le bot exploite l'écart",
        "altTriangle": "Boucle d'arbitrage triangulaire via USDT, BTC et ETH",
        "altNeural": "Couches d'un réseau de neurones s'adaptant aux données de marché"
      },
      "chartUi": {
        "simulated": "SIMULÉ",
        "last": "DERNIER",
        "equity": "RÉSULTAT",
        "buy": "> ACHAT exécuté",
        "sell": "> VENTE exécutée",
        "scanning": "> analyse des spreads"
      }
    },
    "toasts": {
      "signedOut": "Déconnecté avec succès",
      "signOutError": "Erreur lors de la déconnexion"
    },
    "ui": {
      "skip": "Aller au contenu",
      "mainNav": "Principal",
      "close": "Fermer",
      "language": "Langue",
      "userMenu": "Menu utilisateur",
      "openMenu": "Ouvrir le menu",
      "closeMenu": "Fermer le menu",
      "menu": "Menu",
      "signedInAs": "Connecté en tant que",
      "dashboard": "Tableau de bord",
      "signOut": "Se déconnecter",
      "sections": "Sections"
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
        "accessDenied": "Zugriff nicht erlaubt",
        "invalid": "E-Mail oder Passwort falsch",
        "notConfirmed": "Benutzer nicht bestätigt. Bitte prüfen Sie Ihre E-Mails."
      },
      "success": "Anmeldung erfolgreich!"
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
      "tagline": "Trading-Bot-Strategien",
      "hero": {
        "title": "Bots, die den",
        "subtitle": "Spread handeln.",
        "description": "Market Making, einfache Arbitrage und Dreiecksarbitrage an zentralisierten Börsen wie Binance, OKX, Bybit, Coinbase und Bitfinex, rund um die Uhr.",
        "ctaDashboard": "Zum Dashboard",
        "ctaExplore": "Strategien entdecken"
      },
      "stats": {
        "bots": "Aktive Bots",
        "strategies": "Verschiedene Strategien",
        "volume": "Handelsvolumen pro Monat",
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
      },
      "hud": "BOT ONLINE",
      "chart": "BTC/USDT  BOT-AKTIVITÄT",
      "tape": "Simulierter Spread-Feed",
      "boot": [
        "znit.core online",
        "Börsen-APIs verbunden",
        "Spread-Scanner scharf"
      ],
      "rail": [
        "Start",
        "Strategien",
        "Simulator",
        "Börsen",
        "Ablauf",
        "Warum Znit",
        "Zugang"
      ],
      "strategies": {
        "title": "Vier Wege, den Spread zu verdienen",
        "subtitle": "Scrollen Sie durch die Strategien, die unsere Bots ausführen.",
        "items": [
          {
            "title": "Market Making",
            "description": "Stellt beide Seiten des Orderbuchs, vereinnahmt den Spread zwischen Kauf und Verkauf und hält das Inventar im Gleichgewicht, während sich der Markt bewegt.",
            "tags": [
              "Bid- und Ask-Quotierung",
              "Bestandskontrolle",
              "Spread-Erfassung"
            ]
          },
          {
            "title": "Einfache Arbitrage",
            "description": "Kauft einen Vermögenswert dort, wo er günstig ist, und verkauft ihn dort, wo er teuer ist, über Börsen hinweg, bevor sich die Lücke schließt.",
            "tags": [
              "Börsenübergreifend",
              "Ausführung in Millisekunden",
              "Netto nach Gebühren"
            ]
          },
          {
            "title": "Dreiecksarbitrage",
            "description": "Verkettet drei Paare an einer Börse, von USDT zu BTC zu ETH und zurück, und behält, was der Kreislauf übrig lässt.",
            "tags": [
              "Eine Börse",
              "Drei Trades",
              "Preisabweichungen"
            ]
          },
          {
            "title": "Adaptive Modelle",
            "description": "Machine-Learning-Modelle lesen den Orderfluss und passen die Strategieparameter an, sobald sich die Bedingungen ändern.",
            "tags": [
              "Orderfluss-Signale",
              "Automatische Nachjustierung",
              "Backtested"
            ]
          }
        ]
      },
      "sim": {
        "title": "Starten Sie einen Dreieckskreislauf",
        "subtitle": "Bewegen Sie die Regler und sehen Sie, was ein USDT-BTC-ETH-Kreislauf nach Gebühren bringt.",
        "notional": "Kapital pro Kreislauf",
        "gap": "Preisabweichung beim letzten Trade",
        "fee": "Gebühr pro Trade",
        "breakeven": "Break-even-Abweichung",
        "result": "Ergebnis des Kreislaufs",
        "note": "Beispielpreise und ein einzelner Kreislauf. Das reale Ergebnis hängt von Liquidität, Latenz und Slippage ab."
      },
      "process": {
        "title": "Von der Idee zum laufenden Bot",
        "subtitle": "Jede Strategie durchläuft dieselben vier Schritte.",
        "steps": [
          {
            "title": "Umfang",
            "description": "Markt, Börsen und den lohnenden Vorteil festlegen."
          },
          {
            "title": "Backtest",
            "description": "Historische Daten abspielen und Parameter abstimmen, bevor Kapital bewegt wird."
          },
          {
            "title": "Limits",
            "description": "Positions-, Verlust- und Exposure-Limits setzen, die der Bot nicht überschreiten kann."
          },
          {
            "title": "Überwachung",
            "description": "Live gehen mit kontinuierlicher Überwachung und Anpassung."
          }
        ]
      },
      "venues": {
        "title": "Wo unsere Bots handeln",
        "subtitle": "Verbunden mit den größten zentralisierten Börsen, alles verwaltet in einem Dashboard.",
        "status": "Unterstützt",
        "alt": "Znit-Bot-Kern verbunden mit Binance, OKX, Bybit, Coinbase und Bitfinex",
        "note": "Börsennamen sind Marken ihrer jeweiligen Inhaber. Die Nennung einer Börse bedeutet keine Partnerschaft oder Empfehlung."
      },
      "manifesto": "Der Markt schließt nie. Spreads öffnen und schließen sich in Millisekunden, bei jedem Paar, an jeder Börse. Znit-Bots behalten alle im Blick, damit Sie es nicht müssen.",
      "diagrams": {
        "spreadCaptured": "SPREAD ERFASST",
        "ask": "ASK",
        "bid": "BID",
        "venueASell": "BÖRSE A  VERKAUF",
        "venueBBuy": "BÖRSE B  KAUF",
        "gap": "LÜCKE",
        "loop": "1 KREISLAUF, 3 TRADES",
        "marketData": "MARKTDATEN",
        "signal": "SIGNAL",
        "altMarketMaker": "Orderbuch, in dem der Market Maker beide Seiten des Spreads stellt",
        "altArbitrage": "Zwei Börsen notieren unterschiedliche Preise für denselben Vermögenswert; der Bot handelt die Lücke",
        "altTriangle": "Dreiecksarbitrage-Kreislauf über USDT, BTC und ETH",
        "altNeural": "Schichten eines neuronalen Netzes, das sich an Marktdaten anpasst"
      },
      "chartUi": {
        "simulated": "SIMULIERT",
        "last": "LETZTER",
        "equity": "ERGEBNIS",
        "buy": "> KAUF ausgeführt",
        "sell": "> VERKAUF ausgeführt",
        "scanning": "> Spreads werden gescannt"
      }
    },
    "toasts": {
      "signedOut": "Erfolgreich abgemeldet",
      "signOutError": "Fehler beim Abmelden"
    },
    "ui": {
      "skip": "Zum Inhalt springen",
      "mainNav": "Hauptnavigation",
      "close": "Schließen",
      "language": "Sprache",
      "userMenu": "Benutzermenü",
      "openMenu": "Menü öffnen",
      "closeMenu": "Menü schließen",
      "menu": "Menü",
      "signedInAs": "Angemeldet als",
      "dashboard": "Dashboard",
      "signOut": "Abmelden",
      "sections": "Abschnitte"
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
        "accessDenied": "访问被拒绝",
        "invalid": "邮箱或密码不正确",
        "notConfirmed": "用户未确认，请检查您的邮箱。"
      },
      "success": "登录成功！"
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
      "tagline": "交易机器人策略",
      "hero": {
        "title": "让机器人",
        "subtitle": "交易价差。",
        "description": "在 Binance、OKX、Bybit、Coinbase 和 Bitfinex 等中心化交易所进行做市、简单套利和三角套利，全天候运行。",
        "ctaDashboard": "进入仪表板",
        "ctaExplore": "探索策略"
      },
      "stats": {
        "bots": "活跃机器人",
        "strategies": "不同策略",
        "volume": "每月交易量",
        "uptime": "可用性"
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
      },
      "hud": "机器人在线",
      "chart": "BTC/USDT  机器人活动",
      "tape": "模拟价差数据流",
      "boot": [
        "znit.core 已上线",
        "交易所 API 已连接",
        "价差扫描器已就绪"
      ],
      "rail": [
        "首页",
        "策略",
        "模拟器",
        "交易所",
        "流程",
        "为何选择 Znit",
        "入口"
      ],
      "strategies": {
        "title": "赚取价差的四种方式",
        "subtitle": "向下滚动，查看我们的机器人运行的策略。",
        "items": [
          {
            "title": "做市",
            "description": "同时在订单簿两侧报价，赚取买卖价差，并在市场波动时保持库存平衡。",
            "tags": [
              "买卖双向报价",
              "库存控制",
              "价差捕获"
            ]
          },
          {
            "title": "简单套利",
            "description": "在价格低的地方买入，在价格高的地方卖出，跨交易所操作，抢在价差收敛之前。",
            "tags": [
              "跨交易所",
              "毫秒级执行",
              "扣除费用后"
            ]
          },
          {
            "title": "三角套利",
            "description": "在同一交易所串联三个交易对，从 USDT 到 BTC 到 ETH 再回到 USDT，留下循环剩下的收益。",
            "tags": [
              "单一交易所",
              "三笔交易",
              "价格偏差"
            ]
          },
          {
            "title": "自适应模型",
            "description": "机器学习模型读取订单流，并随市场条件变化重新调整策略参数。",
            "tags": [
              "订单流信号",
              "自动重新调参",
              "已回测"
            ]
          }
        ]
      },
      "sim": {
        "title": "运行一次三角循环",
        "subtitle": "拖动滑块，查看一次 USDT、BTC、ETH 循环在扣除费用后的收益。",
        "notional": "每次循环资金",
        "gap": "最后一笔的价格偏差",
        "fee": "每笔手续费",
        "breakeven": "盈亏平衡偏差",
        "result": "循环结果",
        "note": "价格仅为示例，且只模拟一次循环。实际结果取决于流动性、延迟和滑点。"
      },
      "process": {
        "title": "从想法到上线机器人",
        "subtitle": "每个策略都经过相同的四个步骤。",
        "steps": [
          {
            "title": "范围",
            "description": "确定市场、交易所，以及值得追逐的优势。"
          },
          {
            "title": "回测",
            "description": "回放历史数据并调整参数，之后才动用资金。"
          },
          {
            "title": "限制",
            "description": "设定机器人无法突破的仓位、亏损和敞口上限。"
          },
          {
            "title": "监控",
            "description": "上线后持续监控并调整。"
          }
        ]
      },
      "venues": {
        "title": "我们的机器人在哪里交易",
        "subtitle": "已连接各大中心化交易所，全部在一个仪表板中管理。",
        "status": "已支持",
        "alt": "Znit 机器人核心连接 Binance、OKX、Bybit、Coinbase 和 Bitfinex",
        "note": "交易所名称为其各自所有者的商标。列出某个交易所并不代表合作或背书。"
      },
      "manifesto": "市场从不收盘。价差在毫秒间开合，覆盖每个交易对、每家交易所。Znit 机器人全程盯盘，让你不必亲自盯着。",
      "diagrams": {
        "spreadCaptured": "已捕获价差",
        "ask": "卖盘",
        "bid": "买盘",
        "venueASell": "交易所 A  卖出",
        "venueBBuy": "交易所 B  买入",
        "gap": "价差",
        "loop": "1 次循环，3 笔交易",
        "marketData": "市场数据",
        "signal": "信号",
        "altMarketMaker": "做市商在价差两侧报价的订单簿",
        "altArbitrage": "两家交易所对同一资产报出不同价格；机器人交易这一价差",
        "altTriangle": "经由 USDT、BTC 和 ETH 的三角套利循环",
        "altNeural": "适应市场数据的神经网络层"
      },
      "chartUi": {
        "simulated": "模拟",
        "last": "最新价",
        "equity": "收益",
        "buy": "> 买入已成交",
        "sell": "> 卖出已成交",
        "scanning": "> 正在扫描价差"
      }
    },
    "toasts": {
      "signedOut": "退出成功",
      "signOutError": "退出时出错"
    },
    "ui": {
      "skip": "跳到内容",
      "mainNav": "主导航",
      "close": "关闭",
      "language": "语言",
      "userMenu": "用户菜单",
      "openMenu": "打开菜单",
      "closeMenu": "关闭菜单",
      "menu": "菜单",
      "signedInAs": "已登录为",
      "dashboard": "仪表板",
      "signOut": "退出登录",
      "sections": "栏目"
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
        "accessDenied": "アクセスが許可されていません",
        "invalid": "メールアドレスまたはパスワードが正しくありません",
        "notConfirmed": "ユーザーが未確認です。メールをご確認ください。"
      },
      "success": "ログインしました！"
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
      "tagline": "トレーディングボット戦略",
      "hero": {
        "title": "スプレッドを取引する",
        "subtitle": "ボット。",
        "description": "Binance、OKX、Bybit、Coinbase、Bitfinexなどの中央集権型取引所で、マーケットメイク、単純裁定、三角裁定を24時間実行します。",
        "ctaDashboard": "ダッシュボードへ",
        "ctaExplore": "戦略を見る"
      },
      "stats": {
        "bots": "アクティブボット",
        "strategies": "異なる戦略",
        "volume": "月間取引量",
        "uptime": "稼働率"
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
      },
      "hud": "ボット稼働中",
      "chart": "BTC/USDT  ボットの動き",
      "tape": "シミュレーションのスプレッドフィード",
      "boot": [
        "znit.core オンライン",
        "取引所APIに接続済み",
        "スプレッドスキャナー起動"
      ],
      "rail": [
        "スタート",
        "戦略",
        "シミュレーター",
        "取引所",
        "プロセス",
        "Znitを選ぶ理由",
        "アクセス"
      ],
      "strategies": {
        "title": "スプレッドを稼ぐ4つの方法",
        "subtitle": "スクロールして、ボットが実行する戦略をご覧ください。",
        "items": [
          {
            "title": "マーケットメイク",
            "description": "板の両側に気配を出し、売買スプレッドを獲得しながら、相場の動きに合わせて在庫のバランスを保ちます。",
            "tags": [
              "売り買い両方の気配",
              "在庫管理",
              "スプレッド獲得"
            ]
          },
          {
            "title": "単純裁定",
            "description": "安い取引所で買い、高い取引所で売ります。価格差が縮まる前に、取引所をまたいで実行します。",
            "tags": [
              "取引所間",
              "ミリ秒の執行",
              "手数料控除後"
            ]
          },
          {
            "title": "三角裁定",
            "description": "1つの取引所で3つの通貨ペアをつなぎ、USDTからBTC、ETH、そしてUSDTへ戻り、ループで残った差益を得ます。",
            "tags": [
              "単一の取引所",
              "3回の取引",
              "価格のゆがみ"
            ]
          },
          {
            "title": "適応型モデル",
            "description": "機械学習モデルが注文フローを読み取り、市場環境の変化に合わせて戦略パラメータを再調整します。",
            "tags": [
              "注文フローのシグナル",
              "自動再調整",
              "バックテスト済み"
            ]
          }
        ]
      },
      "sim": {
        "title": "三角ループを試す",
        "subtitle": "スライダーを動かして、USDT、BTC、ETHの1ループが手数料後にいくら返すかを確認できます。",
        "notional": "1ループあたりの資金",
        "gap": "最後の取引の価格差",
        "fee": "1取引あたりの手数料",
        "breakeven": "損益分岐の価格差",
        "result": "ループの結果",
        "note": "価格は例示で、1回のループのみです。実際の結果は流動性、遅延、スリッページによって変わります。"
      },
      "process": {
        "title": "アイデアから稼働ボットまで",
        "subtitle": "すべての戦略は同じ4つのステップを通ります。",
        "steps": [
          {
            "title": "スコープ",
            "description": "市場、取引所、追う価値のある優位性を定義します。"
          },
          {
            "title": "バックテスト",
            "description": "資金を動かす前に、過去データを再生してパラメータを調整します。"
          },
          {
            "title": "上限",
            "description": "ボットが超えられないポジション、損失、エクスポージャーの上限を設定します。"
          },
          {
            "title": "モニタリング",
            "description": "常時モニタリングと調整をしながら本番運用を開始します。"
          }
        ]
      },
      "venues": {
        "title": "ボットが取引する場所",
        "subtitle": "主要な中央集権型取引所に接続し、すべて1つのダッシュボードで管理できます。",
        "status": "対応",
        "alt": "Znitのボットコアが Binance、OKX、Bybit、Coinbase、Bitfinex に接続されている様子",
        "note": "取引所の名称は各所有者の商標です。取引所の掲載は、提携や推奨を意味するものではありません。"
      },
      "manifesto": "市場は閉まりません。スプレッドはミリ秒で開いては閉じ、あらゆる通貨ペア、あらゆる取引所で動いています。Znitのボットがすべてを見守るので、あなたが張り付く必要はありません。",
      "diagrams": {
        "spreadCaptured": "スプレッド獲得",
        "ask": "売り板",
        "bid": "買い板",
        "venueASell": "取引所A  売り",
        "venueBBuy": "取引所B  買い",
        "gap": "価格差",
        "loop": "1ループ、3取引",
        "marketData": "市場データ",
        "signal": "シグナル",
        "altMarketMaker": "マーケットメイカーがスプレッドの両側に気配を出している板",
        "altArbitrage": "2つの取引所が同じ資産に異なる価格を提示し、ボットがその差を取引する様子",
        "altTriangle": "USDT、BTC、ETHを通る三角裁定ループ",
        "altNeural": "市場データに適応するニューラルネットワークの層"
      },
      "chartUi": {
        "simulated": "シミュレーション",
        "last": "直近",
        "equity": "損益",
        "buy": "> 買い約定",
        "sell": "> 売り約定",
        "scanning": "> スプレッドをスキャン中"
      }
    },
    "toasts": {
      "signedOut": "サインアウトしました",
      "signOutError": "サインアウトエラー"
    },
    "ui": {
      "skip": "コンテンツへスキップ",
      "mainNav": "メインナビゲーション",
      "close": "閉じる",
      "language": "言語",
      "userMenu": "ユーザーメニュー",
      "openMenu": "メニューを開く",
      "closeMenu": "メニューを閉じる",
      "menu": "メニュー",
      "signedInAs": "ログイン中",
      "dashboard": "ダッシュボード",
      "signOut": "ログアウト",
      "sections": "セクション"
    }
  }
};
