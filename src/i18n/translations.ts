import type { Translations } from './types';

export const translations: Translations = {
  'en-US': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "DeFi Platform",
      home: "Home",
      bets: "Betting",
      portfolio: "Portfolio",
      rankings: "Rankings",
      connectWallet: "Connect Wallet",
      disconnect: "Disconnect",
      connecting: "Connecting...",
      login: "Login"
    },

    // Login
    login: {
      title: "Login",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      signIn: "Sign In",
      signingIn: "Signing in...",
      orContinueWith: "or continue with",
      continueWithGoogle: "Continue with Google",
      continueWithApple: "Continue with Apple",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      errors: {
        loginNotFound: "Login not found",
        accessDenied: "Access not allowed"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Welcome",
      chooseDashboard: "Choose a dashboard",
      manageBots: {
        title: "Manage Bots",
        description: "Create, monitor and manage your trading bots",
        button: "Open Manager"
      },
      metrics: {
        title: "Metrics",
        description: "View real-time performance and statistics",
        button: "Open Dashboard"
      }
    },

    // Landing Page
    landing: {
      tagline: "Next-Gen DeFi Ecosystem",
      badge: "Revolutionary DeFi Solutions",
      hero: {
        title: "Building the Future of",
        subtitle: "Algorithmic Trading",
        description: "Znit.io is pioneering the next generation of automated trading with cutting-edge trading bots and advanced algorithms for crypto and traditional markets.",
        ctaDashboard: "Access Dashboard",
        ctaExplore: "Explore Services"
      },
      stats: {
        bots: "Active Bots",
        users: "Active Users",
        volume: "Trading Volume",
        uptime: "Uptime"
      },
      services: {
        title: "Our Service",
        subtitle: "Advanced trading bots with cutting-edge algorithms and strategies",
        bots: {
          title: "Trading Bots",
          description: "Highly scalable bots for crypto and traditional markets with advanced strategies including liquidity pool, mean reversion, trending flow, machine learning, high-frequency trading and arbitrage.",
          detailTitle: "Advanced Algorithmic Trading",
          detailDescription: "Our sophisticated trading bots leverage cutting-edge algorithms and machine learning to maximize returns across multiple markets. From high-frequency trading to complex arbitrage strategies, we provide institutional-grade tools for everyone.",
          cta: "Explore Bots",
          strategies: {
            liquidityPool: "Liquidity Pool",
            meanReversion: "Mean Reversion",
            trendingFlow: "Trending Flow",
            machineLearning: "Machine Learning",
            highFrequency: "High Frequency",
            arbitrage: "Arbitrage"
          }
        },
        betting: {
          title: "Sports Betting",
          description: "Decentralized sports betting platform offering complete anonymity and privacy to bettors, powered by smart contracts and blockchain technology.",
          detailTitle: "Anonymous Sports Betting",
          detailDescription: "Experience truly decentralized sports betting with complete privacy and anonymity. Our platform uses smart contracts to ensure transparent, trustless betting with instant payouts and no middlemen.",
          cta: "Start Betting Now",
          features: {
            anonymity: "Full Anonymity",
            privacy: "Privacy First",
            crypto: "Crypto Payments",
            decentralized: "Decentralized"
          }
        },
        launch: {
          title: "Crypto Launch",
          description: "Dynamic smart contract solutions for launching crypto projects with innovative tokenomics and automated distribution mechanisms.",
          detailTitle: "Launch Your Project",
          detailDescription: "Deploy your crypto project with confidence using our battle-tested smart contracts and launch infrastructure. We provide everything from tokenomics design to automated vesting and multi-chain deployment.",
          cta: "Launch Project",
          features: {
            smartContracts: "Smart Contracts",
            tokenomics: "Tokenomics Design",
            multichain: "Multi-Chain",
            innovation: "Innovation"
          }
        }
      },
      showcase: {
        label: "Live Metrics",
        bots: {
          metric1: { label: "Success Rate", value: "94.2%" },
          metric2: { label: "Active Strategies", value: "156" },
          metric3: { label: "Total Trades", value: "1.2M+" }
        },
        betting: {
          metric1: { label: "Total Bets", value: "50K+" },
          metric2: { label: "Active Users", value: "10K+" },
          metric3: { label: "Payout Rate", value: "99.8%" }
        },
        launch: {
          metric1: { label: "Projects Launched", value: "25+" },
          metric2: { label: "Total Raised", value: "$10M+" },
          metric3: { label: "Success Rate", value: "92%" }
        }
      },
      why: {
        title: "Why Choose Znit.io?",
        subtitle: "The most advanced DeFi ecosystem powered by cutting-edge technology",
        reasons: {
          security: {
            title: "Bank-Grade Security",
            description: "Military-grade encryption and multi-signature wallets protect your assets 24/7"
          },
          technology: {
            title: "Cutting-Edge Tech",
            description: "Built with the latest blockchain technology and AI-powered algorithms"
          },
          performance: {
            title: "High Performance",
            description: "Lightning-fast execution and 99.9% uptime guarantee for all services"
          },
          community: {
            title: "Strong Community",
            description: "Join thousands of users in our growing ecosystem and governance"
          },
          transparency: {
            title: "Full Transparency",
            description: "All operations are on-chain and verifiable with complete audit trails"
          },
          speed: {
            title: "Instant Execution",
            description: "Sub-second transaction processing and real-time settlement"
          }
        }
      },
      cta: {
        title: "Ready to Get Started?",
        description: "Join thousands of users already benefiting from our revolutionary DeFi ecosystem",
        primary: "Launch Betting App",
        secondary: "Contact Sales"
      },
      learnMore: "Learn More"
    },
    
    // Hero Section
    hero: {
      badge: "Decentralized Platform",
      title: "The Future of Sports Betting",
      glowText: "Sports Betting",
      subtitle: "Experience decentralized sports betting with cryptocurrency payments, smart contracts and transparent payouts. No intermediaries, just pure peer-to-peer action.",
      startBetting: "Start Betting",
      explorePlatform: "Explore Platform"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Crypto Payments",
        description: "Bet with USDT on Ethereum & Polygon networks with low fees and fast transactions"
      },
      smartContracts: {
        title: "Smart Contracts", 
        description: "Transparent and automated prize distribution via smart contracts"
      },
      peerToPeer: {
        title: "Peer-to-Peer",
        description: "Direct betting without intermediaries, minimal fees and total fund control"
      }
    },
    
    // Events Section
    events: {
      title: "Live Sports Events",
      subtitle: "Place your bets on live sporting events with cryptocurrency",
      team1: "Team 1",
      team2: "Team 2", 
      betAmount: "Bet Amount (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "Bet Now",
      processing: "Processing...",
      bettingClosed: "Betting Closed",
      timeLeft: {
        days: "d",
        hours: "h", 
        minutes: "m",
        remaining: "remaining"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Your Portfolio",
      subtitle: "Track your betting performance and history",
      connectMessage: "Connect Your Wallet",
      connectDescription: "Connect your wallet to view your betting portfolio",
      stats: {
        totalBets: "Total Bets",
        totalWagered: "Total Wagered (USDT)",
        activeBets: "Active Bets"
      },
      history: {
        title: "Betting History", 
        description: "Your recent betting activity",
        noHistory: "No bets placed yet. Start betting to see your history!",
        event: "Event",
        confirmed: "Confirmed",
        pending: "Pending"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 Wallet connected successfully!",
      walletDisconnected: "Wallet disconnected",
      walletRequired: "MetaMask is required. Please install MetaMask to continue.",
      walletConnectionFailed: "Failed to connect wallet. Please try again.",
      betPlaced: "🎉 Bet placed successfully! TX:",
      betFailed: "Failed to place bet",
      loadEventsFailed: "Failed to load events",
      loadHistoryFailed: "Failed to load betting history",
      connectFirst: "Please connect your wallet first",
      enterAmount: "Enter amount and select outcome",
      signedOut: "Signed out successfully",
      signOutError: "Error signing out"
    },
    
    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA", 
      "La Liga": "La Liga",
      "Champions League": "Champions League",
      "NFL": "NFL"
    }
  },
  
  'en-GB': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "DeFi Platform",
      home: "Home",
      bets: "Betting",
      portfolio: "Portfolio",
      rankings: "Rankings",
      connectWallet: "Connect Wallet",
      disconnect: "Disconnect",
      connecting: "Connecting...",
      login: "Login"
    },

    // Login
    login: {
      title: "Login",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      signIn: "Sign In",
      signingIn: "Signing in...",
      orContinueWith: "or continue with",
      continueWithGoogle: "Continue with Google",
      continueWithApple: "Continue with Apple",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      errors: {
        loginNotFound: "Login not found",
        accessDenied: "Access not allowed"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Welcome",
      chooseDashboard: "Choose a dashboard",
      manageBots: {
        title: "Manage Bots",
        description: "Create, monitor and manage your trading bots",
        button: "Open Manager"
      },
      metrics: {
        title: "Metrics",
        description: "View real-time performance and statistics",
        button: "Open Dashboard"
      }
    },

    // Landing Page (Same as en-US for British English)
    landing: {
      tagline: "Next-Gen DeFi Ecosystem",
      badge: "Revolutionary DeFi Solutions",
      hero: {
        title: "Building the Future of",
        subtitle: "Algorithmic Trading",
        description: "Znit.io is pioneering the next generation of automated trading with cutting-edge trading bots and advanced algorithms for crypto and traditional markets.",
        ctaDashboard: "Access Dashboard",
        ctaExplore: "Explore Services"
      },
      stats: {
        bots: "Active Bots",
        users: "Active Users",
        volume: "Trading Volume",
        uptime: "Uptime"
      },
      services: {
        title: "Our Service",
        subtitle: "Advanced trading bots with cutting-edge algorithms and strategies",
        bots: {
          title: "Trading Bots",
          description: "Highly scalable bots for crypto and traditional markets with advanced strategies including liquidity pool, mean reversion, trending flow, machine learning, high-frequency trading and arbitrage.",
          detailTitle: "Advanced Algorithmic Trading",
          detailDescription: "Our sophisticated trading bots leverage cutting-edge algorithms and machine learning to maximise returns across multiple markets. From high-frequency trading to complex arbitrage strategies, we provide institutional-grade tools for everyone.",
          cta: "Explore Bots",
          strategies: {
            liquidityPool: "Liquidity Pool",
            meanReversion: "Mean Reversion",
            trendingFlow: "Trending Flow",
            machineLearning: "Machine Learning",
            highFrequency: "High Frequency",
            arbitrage: "Arbitrage"
          }
        },
        betting: {
          title: "Sports Betting",
          description: "Decentralised sports betting platform offering complete anonymity and privacy to bettors, powered by smart contracts and blockchain technology.",
          detailTitle: "Anonymous Sports Betting",
          detailDescription: "Experience truly decentralised sports betting with complete privacy and anonymity. Our platform uses smart contracts to ensure transparent, trustless betting with instant payouts and no middlemen.",
          cta: "Start Betting Now",
          features: {
            anonymity: "Full Anonymity",
            privacy: "Privacy First",
            crypto: "Crypto Payments",
            decentralized: "Decentralised"
          }
        },
        launch: {
          title: "Crypto Launch",
          description: "Dynamic smart contract solutions for launching crypto projects with innovative tokenomics and automated distribution mechanisms.",
          detailTitle: "Launch Your Project",
          detailDescription: "Deploy your crypto project with confidence using our battle-tested smart contracts and launch infrastructure. We provide everything from tokenomics design to automated vesting and multi-chain deployment.",
          cta: "Launch Project",
          features: {
            smartContracts: "Smart Contracts",
            tokenomics: "Tokenomics Design",
            multichain: "Multi-Chain",
            innovation: "Innovation"
          }
        }
      },
      showcase: {
        label: "Live Metrics",
        bots: {
          metric1: { label: "Success Rate", value: "94.2%" },
          metric2: { label: "Active Strategies", value: "156" },
          metric3: { label: "Total Trades", value: "1.2M+" }
        },
        betting: {
          metric1: { label: "Total Bets", value: "50K+" },
          metric2: { label: "Active Users", value: "10K+" },
          metric3: { label: "Payout Rate", value: "99.8%" }
        },
        launch: {
          metric1: { label: "Projects Launched", value: "25+" },
          metric2: { label: "Total Raised", value: "£8M+" },
          metric3: { label: "Success Rate", value: "92%" }
        }
      },
      why: {
        title: "Why Choose Znit.io?",
        subtitle: "The most advanced DeFi ecosystem powered by cutting-edge technology",
        reasons: {
          security: {
            title: "Bank-Grade Security",
            description: "Military-grade encryption and multi-signature wallets protect your assets 24/7"
          },
          technology: {
            title: "Cutting-Edge Tech",
            description: "Built with the latest blockchain technology and AI-powered algorithms"
          },
          performance: {
            title: "High Performance",
            description: "Lightning-fast execution and 99.9% uptime guarantee for all services"
          },
          community: {
            title: "Strong Community",
            description: "Join thousands of users in our growing ecosystem and governance"
          },
          transparency: {
            title: "Full Transparency",
            description: "All operations are on-chain and verifiable with complete audit trails"
          },
          speed: {
            title: "Instant Execution",
            description: "Sub-second transaction processing and real-time settlement"
          }
        }
      },
      cta: {
        title: "Ready to Get Started?",
        description: "Join thousands of users already benefiting from our revolutionary DeFi ecosystem",
        primary: "Launch Betting App",
        secondary: "Contact Sales"
      },
      learnMore: "Learn More"
    },
    
    // Hero Section
    hero: {
      badge: "Decentralised Platform",
      title: "The Future of Sports Betting",
      glowText: "Sports Betting",
      subtitle: "Experience decentralised sports betting with cryptocurrency payments, smart contracts and transparent payouts. No intermediaries, just pure peer-to-peer action.",
      startBetting: "Start Betting",
      explorePlatform: "Explore Platform"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Crypto Payments",
        description: "Bet with USDT on Ethereum & Polygon networks with low fees and fast transactions"
      },
      smartContracts: {
        title: "Smart Contracts",
        description: "Transparent and automated prize distribution via smart contracts"
      },
      peerToPeer: {
        title: "Peer-to-Peer", 
        description: "Direct betting without intermediaries, minimal fees and total fund control"
      }
    },
    
    // Events Section
    events: {
      title: "Live Sports Events",
      subtitle: "Place your bets on live sporting events with cryptocurrency",
      team1: "Team 1",
      team2: "Team 2",
      betAmount: "Bet Amount (USDT)",
      betAmountPlaceholder: "0.00", 
      placeBet: "Place Bet",
      processing: "Processing...",
      bettingClosed: "Betting Closed",
      timeLeft: {
        days: "d",
        hours: "h",
        minutes: "m", 
        remaining: "remaining"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Your Portfolio",
      subtitle: "Track your betting performance and history",
      connectMessage: "Connect Your Wallet",
      connectDescription: "Connect your wallet to view your betting portfolio",
      stats: {
        totalBets: "Total Bets",
        totalWagered: "Total Wagered (USDT)",
        activeBets: "Active Bets"
      },
      history: {
        title: "Betting History",
        description: "Your recent betting activity", 
        noHistory: "No bets placed yet. Start betting to see your history!",
        event: "Event",
        confirmed: "Confirmed",
        pending: "Pending"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 Wallet connected successfully!",
      walletDisconnected: "Wallet disconnected",
      walletRequired: "MetaMask is required. Please install MetaMask to continue.",
      walletConnectionFailed: "Failed to connect wallet. Please try again.",
      betPlaced: "🎉 Bet placed successfully! TX:",
      betFailed: "Failed to place bet",
      loadEventsFailed: "Failed to load events",
      loadHistoryFailed: "Failed to load betting history",
      connectFirst: "Please connect your wallet first",
      enterAmount: "Enter amount and select outcome",
      signedOut: "Signed out successfully",
      signOutError: "Error signing out"
    },
    
    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA",
      "La Liga": "La Liga", 
      "Champions League": "Champions League",
      "NFL": "NFL"
    }
  },
  
  'pt-BR': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "Plataforma DeFi",
      home: "Início",
      bets: "Apostas",
      portfolio: "Portfolio",
      rankings: "Rankings",
      connectWallet: "Conectar Carteira",
      disconnect: "Desconectar",
      connecting: "Conectando...",
      login: "Login"
    },

    // Login
    login: {
      title: "Login",
      email: "Email",
      emailPlaceholder: "seu@email.com",
      password: "Senha",
      passwordPlaceholder: "••••••••",
      signIn: "Entrar",
      signingIn: "Entrando...",
      orContinueWith: "ou continue com",
      continueWithGoogle: "Continue com Google",
      continueWithApple: "Continue com Apple",
      noAccount: "Não tem uma conta?",
      createAccount: "Criar conta",
      errors: {
        loginNotFound: "Login não existente",
        accessDenied: "Acesso não permitido"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Bem-vindo",
      chooseDashboard: "Escolha um dashboard",
      manageBots: {
        title: "Gerenciar Bots",
        description: "Crie, monitore e gerencie seus bots de trading",
        button: "Abrir Gerenciador"
      },
      metrics: {
        title: "Métricas",
        description: "Visualize performance e estatísticas em tempo real",
        button: "Abrir Dashboard"
      }
    },

    // Landing Page
    landing: {
      tagline: "Ecossistema DeFi de Próxima Geração",
      badge: "Soluções DeFi Revolucionárias",
      hero: {
        title: "Construindo o Futuro do",
        subtitle: "Trading Algorítmico",
        description: "A Znit.io está pioneirando a próxima geração de trading automatizado com bots de trading avançados e algoritmos de ponta para mercados cripto e tradicionais.",
        ctaDashboard: "Acessar Dashboard",
        ctaExplore: "Explorar Serviços"
      },
      stats: {
        bots: "Bots Ativos",
        users: "Usuários Ativos",
        volume: "Volume de Trading",
        uptime: "Uptime"
      },
      services: {
        title: "Nosso Serviço",
        subtitle: "Bots de trading avançados com algoritmos e estratégias de ponta",
        bots: {
          title: "Bots de Trading",
          description: "Bots altamente escaláveis para mercados de cripto e tradicionais com estratégias avançadas incluindo liquidity pool, mean reversion, trending flow, machine learning, trading de alta frequência e arbitragem.",
          detailTitle: "Trading Algorítmico Avançado",
          detailDescription: "Nossos sofisticados bots de trading aproveitam algoritmos de ponta e machine learning para maximizar retornos em múltiplos mercados. De trading de alta frequência a estratégias complexas de arbitragem, fornecemos ferramentas de nível institucional para todos.",
          cta: "Explorar Bots",
          strategies: {
            liquidityPool: "Liquidity Pool",
            meanReversion: "Mean Reversion",
            trendingFlow: "Trending Flow",
            machineLearning: "Machine Learning",
            highFrequency: "Alta Frequência",
            arbitrage: "Arbitragem"
          }
        },
        betting: {
          title: "Apostas Esportivas",
          description: "Plataforma de apostas esportivas descentralizada oferecendo completo anonimato e privacidade aos apostadores, alimentada por smart contracts e tecnologia blockchain.",
          detailTitle: "Apostas Esportivas Anônimas",
          detailDescription: "Experimente apostas esportivas verdadeiramente descentralizadas com completa privacidade e anonimato. Nossa plataforma usa smart contracts para garantir apostas transparentes e sem confiança, com pagamentos instantâneos e sem intermediários.",
          cta: "Começar a Apostar Agora",
          features: {
            anonymity: "Anonimato Total",
            privacy: "Privacidade em Primeiro Lugar",
            crypto: "Pagamentos Cripto",
            decentralized: "Descentralizado"
          }
        },
        launch: {
          title: "Lançamento Cripto",
          description: "Soluções dinâmicas de smart contracts para lançamento de projetos cripto com tokenomics inovadoras e mecanismos automatizados de distribuição.",
          detailTitle: "Lance Seu Projeto",
          detailDescription: "Implante seu projeto cripto com confiança usando nossos smart contracts testados em batalha e infraestrutura de lançamento. Fornecemos tudo, desde design de tokenomics até vesting automatizado e implantação multi-chain.",
          cta: "Lançar Projeto",
          features: {
            smartContracts: "Smart Contracts",
            tokenomics: "Design de Tokenomics",
            multichain: "Multi-Chain",
            innovation: "Inovação"
          }
        }
      },
      showcase: {
        label: "Métricas Ao Vivo",
        bots: {
          metric1: { label: "Taxa de Sucesso", value: "94.2%" },
          metric2: { label: "Estratégias Ativas", value: "156" },
          metric3: { label: "Total de Trades", value: "1.2M+" }
        },
        betting: {
          metric1: { label: "Total de Apostas", value: "50K+" },
          metric2: { label: "Usuários Ativos", value: "10K+" },
          metric3: { label: "Taxa de Pagamento", value: "99.8%" }
        },
        launch: {
          metric1: { label: "Projetos Lançados", value: "25+" },
          metric2: { label: "Total Arrecadado", value: "$10M+" },
          metric3: { label: "Taxa de Sucesso", value: "92%" }
        }
      },
      why: {
        title: "Por Que Escolher a Znit.io?",
        subtitle: "O ecossistema DeFi mais avançado alimentado por tecnologia de ponta",
        reasons: {
          security: {
            title: "Segurança Bancária",
            description: "Criptografia de nível militar e carteiras multi-assinatura protegem seus ativos 24/7"
          },
          technology: {
            title: "Tecnologia de Ponta",
            description: "Construído com a mais recente tecnologia blockchain e algoritmos alimentados por IA"
          },
          performance: {
            title: "Alto Desempenho",
            description: "Execução ultra-rápida e garantia de 99.9% de uptime para todos os serviços"
          },
          community: {
            title: "Comunidade Forte",
            description: "Junte-se a milhares de usuários em nosso ecossistema crescente e governança"
          },
          transparency: {
            title: "Transparência Total",
            description: "Todas as operações estão on-chain e verificáveis com trilhas de auditoria completas"
          },
          speed: {
            title: "Execução Instantânea",
            description: "Processamento de transações em subsegundos e liquidação em tempo real"
          }
        }
      },
      cta: {
        title: "Pronto Para Começar?",
        description: "Junte-se a milhares de usuários já se beneficiando de nosso ecossistema DeFi revolucionário",
        primary: "Acessar App de Apostas",
        secondary: "Contatar Vendas"
      },
      learnMore: "Saiba Mais"
    },
    
    // Hero Section
    hero: {
      badge: "Plataforma Descentralizada",
      title: "O Futuro das Apostas Esportivas",
      glowText: "Apostas Esportivas", 
      subtitle: "Experimente apostas esportivas descentralizadas com pagamentos em criptomoedas, contratos inteligentes e pagamentos transparentes. Sem intermediários, apenas ação pura peer-to-peer.",
      startBetting: "Começar a Apostar",
      explorePlatform: "Explorar Plataforma"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Pagamentos Crypto",
        description: "Aposte com USDT nas redes Ethereum & Polygon com taxas baixas e transações rápidas"
      },
      smartContracts: {
        title: "Smart Contracts",
        description: "Distribuição transparente e automatizada de prêmios via contratos inteligentes"
      },
      peerToPeer: {
        title: "Peer-to-Peer",
        description: "Apostas diretas sem intermediários, taxas mínimas e controle total dos fundos"
      }
    },
    
    // Events Section
    events: {
      title: "Eventos Esportivos Ao Vivo",
      subtitle: "Realize suas apostas em eventos esportivos ao vivo com criptomoedas",
      team1: "Time 1",
      team2: "Time 2",
      betAmount: "Valor da Aposta (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "Apostar Agora",
      processing: "Processando...",
      bettingClosed: "Apostas Encerradas", 
      timeLeft: {
        days: "d",
        hours: "h",
        minutes: "m",
        remaining: "restantes"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Seu Portfolio",
      subtitle: "Acompanhe seu desempenho e histórico de apostas",
      connectMessage: "Conecte sua Carteira", 
      connectDescription: "Conecte sua carteira para visualizar seu portfolio de apostas",
      stats: {
        totalBets: "Total de Apostas",
        totalWagered: "Total Apostado (USDT)",
        activeBets: "Apostas Ativas"
      },
      history: {
        title: "Histórico de Apostas",
        description: "Sua atividade recente de apostas",
        noHistory: "Nenhuma aposta realizada ainda. Comece apostando para ver seu histórico!",
        event: "Evento",
        confirmed: "Confirmada", 
        pending: "Pendente"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 Carteira conectada com sucesso!",
      walletDisconnected: "Carteira desconectada",
      walletRequired: "MetaMask é necessário. Por favor, instale a MetaMask para continuar.",
      walletConnectionFailed: "Falha ao conectar carteira. Tente novamente.",
      betPlaced: "🎉 Aposta realizada com sucesso! TX:",
      betFailed: "Falha ao realizar aposta",
      loadEventsFailed: "Falha ao carregar eventos",
      loadHistoryFailed: "Falha ao carregar histórico de apostas",
      connectFirst: "Por favor, conecte sua carteira primeiro",
      enterAmount: "Insira o valor e selecione o resultado",
      signedOut: "Desconectado com sucesso",
      signOutError: "Erro ao desconectar"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA",
      "La Liga": "La Liga",
      "Champions League": "Liga dos Campeões",
      "NFL": "NFL"
    }
  },
  
  'es-ES': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "Plataforma DeFi",
      home: "Inicio",
      bets: "Apuestas",
      portfolio: "Portafolio",
      rankings: "Rankings",
      connectWallet: "Conectar Billetera",
      disconnect: "Desconectar",
      connecting: "Conectando...",
      login: "Iniciar sesión"
    },

    // Login
    login: {
      title: "Iniciar sesión",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      password: "Contraseña",
      passwordPlaceholder: "••••••••",
      signIn: "Entrar",
      signingIn: "Entrando...",
      orContinueWith: "o continúa con",
      continueWithGoogle: "Continuar con Google",
      continueWithApple: "Continuar con Apple",
      noAccount: "¿No tienes una cuenta?",
      createAccount: "Crear cuenta",
      errors: {
        loginNotFound: "Login no encontrado",
        accessDenied: "Acceso no permitido"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Bienvenido",
      chooseDashboard: "Elige un dashboard",
      manageBots: {
        title: "Gestionar Bots",
        description: "Crea, monitorea y gestiona tus bots de trading",
        button: "Abrir Gestor"
      },
      metrics: {
        title: "Métricas",
        description: "Visualiza rendimiento y estadísticas en tiempo real",
        button: "Abrir Dashboard"
      }
    },

    // Landing Page
    landing: {
      tagline: "Ecosistema DeFi de Nueva Generación",
      badge: "Soluciones DeFi Revolucionarias",
      hero: {
        title: "Construyendo el Futuro del",
        subtitle: "Trading Algorítmico",
        description: "Znit.io está pioneriando la próxima generación de trading automatizado con bots de trading avanzados y algoritmos de vanguardia para mercados cripto y tradicionales.",
        ctaDashboard: "Acceder al Dashboard",
        ctaExplore: "Explorar Servicios"
      },
      stats: {
        bots: "Bots Activos",
        users: "Usuarios Activos",
        volume: "Volumen de Trading",
        uptime: "Uptime"
      },
      services: {
        title: "Nuestro Servicio",
        subtitle: "Bots de trading avanzados con algoritmos y estrategias de vanguardia",
        bots: {
          title: "Bots de Trading",
          description: "Bots altamente escalables para mercados cripto y tradicionales con estrategias avanzadas incluyendo liquidity pool, mean reversion, trending flow, machine learning, trading de alta frecuencia y arbitraje.",
          detailTitle: "Trading Algorítmico Avanzado",
          detailDescription: "Nuestros sofisticados bots de trading aprovechan algoritmos de vanguardia y machine learning para maximizar retornos en múltiples mercados. Desde trading de alta frecuencia hasta estrategias complejas de arbitraje, proporcionamos herramientas de nivel institucional para todos.",
          cta: "Explorar Bots",
          strategies: {
            liquidityPool: "Liquidity Pool",
            meanReversion: "Mean Reversion",
            trendingFlow: "Trending Flow",
            machineLearning: "Machine Learning",
            highFrequency: "Alta Frecuencia",
            arbitrage: "Arbitraje"
          }
        },
        betting: {
          title: "Apuestas Deportivas",
          description: "Plataforma de apuestas deportivas descentralizada ofreciendo completo anonimato y privacidad a los apostadores, impulsada por smart contracts y tecnología blockchain.",
          detailTitle: "Apuestas Deportivas Anónimas",
          detailDescription: "Experimenta apuestas deportivas verdaderamente descentralizadas con completa privacidad y anonimato. Nuestra plataforma usa smart contracts para garantizar apuestas transparentes y sin confianza, con pagos instantáneos y sin intermediarios.",
          cta: "Comenzar a Apostar Ahora",
          features: {
            anonymity: "Anonimato Total",
            privacy: "Privacidad Primero",
            crypto: "Pagos Cripto",
            decentralized: "Descentralizado"
          }
        },
        launch: {
          title: "Lanzamiento Cripto",
          description: "Soluciones dinámicas de smart contracts para lanzamiento de proyectos cripto con tokenomics innovadoras y mecanismos automatizados de distribución.",
          detailTitle: "Lanza Tu Proyecto",
          detailDescription: "Despliega tu proyecto cripto con confianza usando nuestros smart contracts probados en batalla e infraestructura de lanzamiento. Proporcionamos todo desde diseño de tokenomics hasta vesting automatizado e implementación multi-chain.",
          cta: "Lanzar Proyecto",
          features: {
            smartContracts: "Smart Contracts",
            tokenomics: "Diseño de Tokenomics",
            multichain: "Multi-Chain",
            innovation: "Innovación"
          }
        }
      },
      showcase: {
        label: "Métricas en Vivo",
        bots: {
          metric1: { label: "Tasa de Éxito", value: "94.2%" },
          metric2: { label: "Estrategias Activas", value: "156" },
          metric3: { label: "Total de Trades", value: "1.2M+" }
        },
        betting: {
          metric1: { label: "Total de Apuestas", value: "50K+" },
          metric2: { label: "Usuarios Activos", value: "10K+" },
          metric3: { label: "Tasa de Pago", value: "99.8%" }
        },
        launch: {
          metric1: { label: "Proyectos Lanzados", value: "25+" },
          metric2: { label: "Total Recaudado", value: "$10M+" },
          metric3: { label: "Tasa de Éxito", value: "92%" }
        }
      },
      why: {
        title: "¿Por Qué Elegir Znit.io?",
        subtitle: "El ecosistema DeFi más avanzado impulsado por tecnología de vanguardia",
        reasons: {
          security: {
            title: "Seguridad Bancaria",
            description: "Encriptación de nivel militar y billeteras multi-firma protegen tus activos 24/7"
          },
          technology: {
            title: "Tecnología de Vanguardia",
            description: "Construido con la última tecnología blockchain y algoritmos impulsados por IA"
          },
          performance: {
            title: "Alto Rendimiento",
            description: "Ejecución ultrarrápida y garantía de 99.9% de uptime para todos los servicios"
          },
          community: {
            title: "Comunidad Fuerte",
            description: "Únete a miles de usuarios en nuestro ecosistema creciente y gobernanza"
          },
          transparency: {
            title: "Transparencia Total",
            description: "Todas las operaciones están on-chain y verificables con auditorías completas"
          },
          speed: {
            title: "Ejecución Instantánea",
            description: "Procesamiento de transacciones en subsegundos y liquidación en tiempo real"
          }
        }
      },
      cta: {
        title: "¿Listo Para Comenzar?",
        description: "Únete a miles de usuarios ya beneficiándose de nuestro ecosistema DeFi revolucionario",
        primary: "Acceder a App de Apuestas",
        secondary: "Contactar Ventas"
      },
      learnMore: "Saber Más"
    },
    
    // Hero Section
    hero: {
      badge: "Plataforma Descentralizada", 
      title: "El Futuro de las Apuestas Deportivas",
      glowText: "Apuestas Deportivas",
      subtitle: "Experimenta apuestas deportivas descentralizadas con pagos en criptomonedas, contratos inteligentes y pagos transparentes. Sin intermediarios, solo acción pura peer-to-peer.",
      startBetting: "Comenzar a Apostar",
      explorePlatform: "Explorar Plataforma"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Pagos Cripto",
        description: "Apuesta con USDT en las redes Ethereum y Polygon con tarifas bajas y transacciones rápidas"
      },
      smartContracts: {
        title: "Contratos Inteligentes",
        description: "Distribución transparente y automatizada de premios mediante contratos inteligentes"
      },
      peerToPeer: {
        title: "Peer-to-Peer",
        description: "Apuestas directas sin intermediarios, tarifas mínimas y control total de fondos"
      }
    },
    
    // Events Section
    events: {
      title: "Eventos Deportivos en Vivo",
      subtitle: "Realiza tus apuestas en eventos deportivos en vivo con criptomonedas",
      team1: "Equipo 1",
      team2: "Equipo 2",
      betAmount: "Monto de Apuesta (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "Apostar Ahora",
      processing: "Procesando...",
      bettingClosed: "Apuestas Cerradas",
      timeLeft: {
        days: "d",
        hours: "h",
        minutes: "m",
        remaining: "restantes"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Tu Portafolio",
      subtitle: "Rastrea tu rendimiento e historial de apuestas",
      connectMessage: "Conecta tu Billetera",
      connectDescription: "Conecta tu billetera para ver tu portafolio de apuestas",
      stats: {
        totalBets: "Total de Apuestas",
        totalWagered: "Total Apostado (USDT)",
        activeBets: "Apuestas Activas"
      },
      history: {
        title: "Historial de Apuestas",
        description: "Tu actividad reciente de apuestas",
        noHistory: "¡Aún no has realizado apuestas. Comienza a apostar para ver tu historial!",
        event: "Evento",
        confirmed: "Confirmada",
        pending: "Pendiente"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 ¡Billetera conectada exitosamente!",
      walletDisconnected: "Billetera desconectada",
      walletRequired: "Se requiere MetaMask. Por favor instala MetaMask para continuar.",
      walletConnectionFailed: "Error al conectar billetera. Inténtalo de nuevo.",
      betPlaced: "🎉 ¡Apuesta realizada exitosamente! TX:",
      betFailed: "Error al realizar apuesta",
      loadEventsFailed: "Error al cargar eventos",
      loadHistoryFailed: "Error al cargar historial de apuestas",
      connectFirst: "Por favor conecta tu billetera primero",
      enterAmount: "Ingresa el monto y selecciona el resultado",
      signedOut: "Sesión cerrada exitosamente",
      signOutError: "Error al cerrar sesión"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA",
      "La Liga": "La Liga",
      "Champions League": "Liga de Campeones",
      "NFL": "NFL"
    }
  },
  
  'fr-FR': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "Plateforme DeFi",
      home: "Accueil",
      bets: "Paris",
      portfolio: "Portefeuille",
      rankings: "Classements",
      connectWallet: "Connecter Portefeuille",
      disconnect: "Déconnecter",
      connecting: "Connexion...",
      login: "Connexion"
    },

    // Login
    login: {
      title: "Connexion",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      password: "Mot de passe",
      passwordPlaceholder: "••••••••",
      signIn: "Se connecter",
      signingIn: "Connexion...",
      orContinueWith: "ou continuez avec",
      continueWithGoogle: "Continuer avec Google",
      continueWithApple: "Continuer avec Apple",
      noAccount: "Vous n'avez pas de compte?",
      createAccount: "Créer un compte",
      errors: {
        loginNotFound: "Login non trouvé",
        accessDenied: "Accès non autorisé"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Bienvenue",
      chooseDashboard: "Choisissez un tableau de bord",
      manageBots: {
        title: "Gérer les Bots",
        description: "Créez, surveillez et gérez vos bots de trading",
        button: "Ouvrir le Gestionnaire"
      },
      metrics: {
        title: "Métriques",
        description: "Visualisez les performances et statistiques en temps réel",
        button: "Ouvrir le Tableau de Bord"
      }
    },

    // Landing Page (using en-US as base, specific French translations)
    landing: {
      tagline: "Écosystème DeFi de Nouvelle Génération",
      badge: "Solutions DeFi Révolutionnaires",
      hero: {
        title: "Construire l'Avenir du",
        subtitle: "Trading Algorithmique",
        description: "Znit.io est pionnier de la prochaine génération de trading automatisé avec des bots de trading de pointe et des algorithmes avancés pour les marchés crypto et traditionnels.",
        ctaDashboard: "Accéder au Tableau de Bord",
        ctaExplore: "Explorer les Services"
      },
      stats: { bots: "Bots Actifs", users: "Utilisateurs Actifs", volume: "Volume de Trading", uptime: "Disponibilité" },
      services: {
        title: "Notre Service",
        subtitle: "Bots de trading avancés avec des algorithmes et stratégies de pointe",
        bots: {
          title: "Bots de Trading", description: "Bots hautement évolutifs pour les marchés crypto et traditionnels avec des stratégies avancées.", detailTitle: "Trading Algorithmique Avancé", detailDescription: "Nos bots de trading sophistiqués exploitent des algorithmes de pointe et le machine learning pour maximiser les rendements.", cta: "Explorer les Bots",
          strategies: { liquidityPool: "Liquidity Pool", meanReversion: "Mean Reversion", trendingFlow: "Trending Flow", machineLearning: "Machine Learning", highFrequency: "Haute Fréquence", arbitrage: "Arbitrage" }
        },
        betting: {
          title: "Paris Sportifs", description: "Plateforme de paris sportifs décentralisée offrant anonymat et confidentialité complets.", detailTitle: "Paris Sportifs Anonymes", detailDescription: "Découvrez des paris sportifs vraiment décentralisés avec une confidentialité et un anonymat complets.", cta: "Commencer à Parier",
          features: { anonymity: "Anonymat Complet", privacy: "Confidentialité d'Abord", crypto: "Paiements Crypto", decentralized: "Décentralisé" }
        },
        launch: {
          title: "Lancement Crypto", description: "Solutions de smart contracts dynamiques pour le lancement de projets crypto.", detailTitle: "Lancez Votre Projet", detailDescription: "Déployez votre projet crypto en toute confiance avec nos smart contracts éprouvés.", cta: "Lancer un Projet",
          features: { smartContracts: "Smart Contracts", tokenomics: "Conception Tokenomics", multichain: "Multi-Chain", innovation: "Innovation" }
        }
      },
      showcase: {
        label: "Métriques en Direct",
        bots: { metric1: { label: "Taux de Réussite", value: "94.2%" }, metric2: { label: "Stratégies Actives", value: "156" }, metric3: { label: "Total Trades", value: "1.2M+" } },
        betting: { metric1: { label: "Total Paris", value: "50K+" }, metric2: { label: "Utilisateurs Actifs", value: "10K+" }, metric3: { label: "Taux de Paiement", value: "99.8%" } },
        launch: { metric1: { label: "Projets Lancés", value: "25+" }, metric2: { label: "Total Collecté", value: "€8M+" }, metric3: { label: "Taux de Réussite", value: "92%" } }
      },
      why: {
        title: "Pourquoi Choisir Znit.io?",
        subtitle: "L'écosystème DeFi le plus avancé alimenté par une technologie de pointe",
        reasons: {
          security: { title: "Sécurité Bancaire", description: "Cryptage de niveau militaire et portefeuilles multi-signatures protègent vos actifs 24/7" },
          technology: { title: "Technologie de Pointe", description: "Construit avec la dernière technologie blockchain et algorithmes IA" },
          performance: { title: "Haute Performance", description: "Exécution ultra-rapide et garantie de disponibilité de 99.9%" },
          community: { title: "Communauté Forte", description: "Rejoignez des milliers d'utilisateurs dans notre écosystème croissant" },
          transparency: { title: "Transparence Totale", description: "Toutes les opérations sont on-chain et vérifiables" },
          speed: { title: "Exécution Instantanée", description: "Traitement des transactions en sous-seconde" }
        }
      },
      cta: { title: "Prêt à Commencer?", description: "Rejoignez des milliers d'utilisateurs qui bénéficient déjà de notre écosystème DeFi révolutionnaire", primary: "Lancer l'App de Paris", secondary: "Contacter les Ventes" },
      learnMore: "En Savoir Plus"
    },
    
    // Hero Section
    hero: {
      badge: "Plateforme Décentralisée",
      title: "L'Avenir des Paris Sportifs",
      glowText: "Paris Sportifs",
      subtitle: "Découvrez les paris sportifs décentralisés avec des paiements en cryptomonnaies, des contrats intelligents et des paiements transparents. Aucun intermédiaire, juste de l'action pure peer-to-peer.",
      startBetting: "Commencer à Parier",
      explorePlatform: "Explorer la Plateforme"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Paiements Crypto",
        description: "Pariez avec USDT sur les réseaux Ethereum et Polygon avec des frais faibles et des transactions rapides"
      },
      smartContracts: {
        title: "Contrats Intelligents",
        description: "Distribution transparente et automatisée des prix via des contrats intelligents"
      },
      peerToPeer: {
        title: "Peer-to-Peer",
        description: "Paris directs sans intermédiaires, frais minimaux et contrôle total des fonds"
      }
    },
    
    // Events Section
    events: {
      title: "Événements Sportifs en Direct",
      subtitle: "Placez vos paris sur des événements sportifs en direct avec de la cryptomonnaie",
      team1: "Équipe 1",
      team2: "Équipe 2",
      betAmount: "Montant du Pari (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "Parier Maintenant",
      processing: "Traitement...",
      bettingClosed: "Paris Fermés",
      timeLeft: {
        days: "j",
        hours: "h",
        minutes: "m",
        remaining: "restantes"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Votre Portefeuille",
      subtitle: "Suivez vos performances et votre historique de paris",
      connectMessage: "Connectez Votre Portefeuille",
      connectDescription: "Connectez votre portefeuille pour voir votre portefeuille de paris",
      stats: {
        totalBets: "Total des Paris",
        totalWagered: "Total Misé (USDT)",
        activeBets: "Paris Actifs"
      },
      history: {
        title: "Historique des Paris",
        description: "Votre activité de paris récente",
        noHistory: "Aucun pari placé encore. Commencez à parier pour voir votre historique !",
        event: "Événement",
        confirmed: "Confirmé",
        pending: "En Attente"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 Portefeuille connecté avec succès !",
      walletDisconnected: "Portefeuille déconnecté",
      walletRequired: "MetaMask est requis. Veuillez installer MetaMask pour continuer.",
      walletConnectionFailed: "Échec de la connexion du portefeuille. Veuillez réessayer.",
      betPlaced: "🎉 Pari placé avec succès ! TX:",
      betFailed: "Échec du placement du pari",
      loadEventsFailed: "Échec du chargement des événements",
      loadHistoryFailed: "Échec du chargement de l'historique des paris",
      connectFirst: "Veuillez d'abord connecter votre portefeuille",
      enterAmount: "Entrez le montant et sélectionnez le résultat",
      signedOut: "Déconnecté avec succès",
      signOutError: "Erreur lors de la déconnexion"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA",
      "La Liga": "La Liga",
      "Champions League": "Ligue des Champions",
      "NFL": "NFL"
    }
  },
  
  'de-DE': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "DeFi Plattform",
      home: "Startseite",
      bets: "Wetten",
      portfolio: "Portfolio",
      rankings: "Ranglisten",
      connectWallet: "Wallet Verbinden",
      disconnect: "Trennen",
      connecting: "Verbinden...",
      login: "Anmelden"
    },

    // Login
    login: {
      title: "Anmelden",
      email: "Email",
      emailPlaceholder: "deine@email.com",
      password: "Passwort",
      passwordPlaceholder: "••••••••",
      signIn: "Einloggen",
      signingIn: "Anmeldung...",
      orContinueWith: "oder fortfahren mit",
      continueWithGoogle: "Mit Google fortfahren",
      continueWithApple: "Mit Apple fortfahren",
      noAccount: "Noch kein Konto?",
      createAccount: "Konto erstellen",
      errors: {
        loginNotFound: "Login nicht gefunden",
        accessDenied: "Zugriff nicht erlaubt"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "Willkommen",
      chooseDashboard: "Wählen Sie ein Dashboard",
      manageBots: {
        title: "Bots Verwalten",
        description: "Erstellen, überwachen und verwalten Sie Ihre Trading-Bots",
        button: "Manager Öffnen"
      },
      metrics: {
        title: "Metriken",
        description: "Sehen Sie Echtzeit-Performance und Statistiken",
        button: "Dashboard Öffnen"
      }
    },

    // Landing Page
    landing: {
      tagline: "Next-Gen DeFi Ökosystem",
      badge: "Revolutionäre DeFi Lösungen",
      hero: {
        title: "Die Zukunft des",
        subtitle: "Algorithmischen Handels Bauen",
        description: "Znit.io ist Vorreiter der nächsten Generation des automatisierten Handels mit hochmodernen Trading-Bots und fortschrittlichen Algorithmen für Krypto- und traditionelle Märkte.",
        ctaDashboard: "Zum Dashboard",
        ctaExplore: "Dienste Erkunden"
      },
      stats: { bots: "Aktive Bots", users: "Aktive Benutzer", volume: "Handelsvolumen", uptime: "Verfügbarkeit" },
      services: {
        title: "Unser Dienst",
        subtitle: "Fortschrittliche Trading-Bots mit modernsten Algorithmen und Strategien",
        bots: {
          title: "Trading Bots", description: "Hochskalierbare Bots für Krypto- und traditionelle Märkte mit fortgeschrittenen Strategien.", detailTitle: "Fortgeschrittener Algorithmischer Handel", detailDescription: "Unsere ausgefeilten Trading-Bots nutzen modernste Algorithmen und maschinelles Lernen.", cta: "Bots Erkunden",
          strategies: { liquidityPool: "Liquidity Pool", meanReversion: "Mean Reversion", trendingFlow: "Trending Flow", machineLearning: "Machine Learning", highFrequency: "Hochfrequenz", arbitrage: "Arbitrage" }
        },
        betting: {
          title: "Sportwetten", description: "Dezentrale Sportwettenplattform mit vollständiger Anonymität und Privatsphäre.", detailTitle: "Anonyme Sportwetten", detailDescription: "Erleben Sie wirklich dezentrale Sportwetten mit vollständiger Privatsphäre und Anonymität.", cta: "Jetzt Wetten",
          features: { anonymity: "Vollständige Anonymität", privacy: "Privatsphäre Zuerst", crypto: "Krypto-Zahlungen", decentralized: "Dezentralisiert" }
        },
        launch: {
          title: "Krypto Launch", description: "Dynamische Smart-Contract-Lösungen für den Start von Krypto-Projekten.", detailTitle: "Starten Sie Ihr Projekt", detailDescription: "Stellen Sie Ihr Krypto-Projekt mit Vertrauen unter Verwendung unserer bewährten Smart Contracts bereit.", cta: "Projekt Starten",
          features: { smartContracts: "Smart Contracts", tokenomics: "Tokenomics Design", multichain: "Multi-Chain", innovation: "Innovation" }
        }
      },
      showcase: {
        label: "Live-Metriken",
        bots: { metric1: { label: "Erfolgsquote", value: "94.2%" }, metric2: { label: "Aktive Strategien", value: "156" }, metric3: { label: "Gesamt Trades", value: "1.2M+" } },
        betting: { metric1: { label: "Gesamt Wetten", value: "50K+" }, metric2: { label: "Aktive Benutzer", value: "10K+" }, metric3: { label: "Auszahlungsrate", value: "99.8%" } },
        launch: { metric1: { label: "Gestartete Projekte", value: "25+" }, metric2: { label: "Gesamt Gesammelt", value: "€8M+" }, metric3: { label: "Erfolgsquote", value: "92%" } }
      },
      why: {
        title: "Warum Znit.io Wählen?",
        subtitle: "Das fortschrittlichste DeFi-Ökosystem mit modernster Technologie",
        reasons: {
          security: { title: "Bank-Sicherheit", description: "Militärische Verschlüsselung und Multi-Signatur-Wallets schützen Ihre Vermögenswerte 24/7" },
          technology: { title: "Modernste Technologie", description: "Gebaut mit der neuesten Blockchain-Technologie und KI-Algorithmen" },
          performance: { title: "Hohe Leistung", description: "Blitzschnelle Ausführung und 99.9% Verfügbarkeitsgarantie" },
          community: { title: "Starke Community", description: "Treten Sie Tausenden von Benutzern in unserem wachsenden Ökosystem bei" },
          transparency: { title: "Volle Transparenz", description: "Alle Operationen sind on-chain und verifizierbar" },
          speed: { title: "Sofortige Ausführung", description: "Sekundenbruchteil-Transaktionsverarbeitung" }
        }
      },
      cta: { title: "Bereit Loszulegen?", description: "Treten Sie Tausenden von Benutzern bei, die bereits von unserem revolutionären DeFi-Ökosystem profitieren", primary: "Wett-App Starten", secondary: "Vertrieb Kontaktieren" },
      learnMore: "Mehr Erfahren"
    },
    
    // Hero Section
    hero: {
      badge: "Dezentrale Plattform",
      title: "Die Zukunft der Sportwetten",
      glowText: "Sportwetten",
      subtitle: "Erleben Sie dezentrale Sportwetten mit Kryptowährungszahlungen, Smart Contracts und transparenten Auszahlungen. Keine Zwischenhändler, nur reine Peer-to-Peer-Aktion.",
      startBetting: "Wetten Beginnen",
      explorePlatform: "Plattform Erkunden"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "Krypto-Zahlungen",
        description: "Wetten Sie mit USDT auf Ethereum & Polygon-Netzwerken mit niedrigen Gebühren und schnellen Transaktionen"
      },
      smartContracts: {
        title: "Smart Contracts",
        description: "Transparente und automatisierte Preisverteilung über Smart Contracts"
      },
      peerToPeer: {
        title: "Peer-to-Peer",
        description: "Direktes Wetten ohne Zwischenhändler, minimale Gebühren und volle Fondskontrolle"
      }
    },
    
    // Events Section
    events: {
      title: "Live-Sportereignisse",
      subtitle: "Platzieren Sie Ihre Wetten auf Live-Sportereignisse mit Kryptowährung",
      team1: "Team 1",
      team2: "Team 2",
      betAmount: "Wetteinsatz (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "Jetzt Wetten",
      processing: "Verarbeitung...",
      bettingClosed: "Wetten Geschlossen",
      timeLeft: {
        days: "T",
        hours: "h",
        minutes: "m",
        remaining: "verbleibend"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "Ihr Portfolio",
      subtitle: "Verfolgen Sie Ihre Wettleistung und Geschichte",
      connectMessage: "Verbinden Sie Ihr Wallet",
      connectDescription: "Verbinden Sie Ihr Wallet, um Ihr Wett-Portfolio zu sehen",
      stats: {
        totalBets: "Gesamte Wetten",
        totalWagered: "Gesamt Gewettet (USDT)",
        activeBets: "Aktive Wetten"
      },
      history: {
        title: "Wetthistorie",
        description: "Ihre kürzliche Wettaktivität",
        noHistory: "Noch keine Wetten platziert. Beginnen Sie zu wetten, um Ihre Geschichte zu sehen!",
        event: "Ereignis",
        confirmed: "Bestätigt",
        pending: "Ausstehend"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 Wallet erfolgreich verbunden!",
      walletDisconnected: "Wallet getrennt",
      walletRequired: "MetaMask ist erforderlich. Bitte installieren Sie MetaMask, um fortzufahren.",
      walletConnectionFailed: "Wallet-Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      betPlaced: "🎉 Wette erfolgreich platziert! TX:",
      betFailed: "Wette fehlgeschlagen",
      loadEventsFailed: "Laden der Ereignisse fehlgeschlagen",
      loadHistoryFailed: "Laden der Wetthistorie fehlgeschlagen",
      connectFirst: "Bitte verbinden Sie zuerst Ihr Wallet",
      enterAmount: "Betrag eingeben und Ergebnis auswählen",
      signedOut: "Erfolgreich abgemeldet",
      signOutError: "Fehler beim Abmelden"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "Premier League",
      "NBA": "NBA",
      "La Liga": "La Liga",
      "Champions League": "Champions League",
      "NFL": "NFL"
    }
  },
  
  'zh-CN': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "DeFi 平台",
      home: "首页",
      bets: "投注",
      portfolio: "投资组合",
      rankings: "排行榜",
      connectWallet: "连接钱包",
      disconnect: "断开连接",
      connecting: "连接中...",
      login: "登录"
    },

    // Login
    login: {
      title: "登录",
      email: "邮箱",
      emailPlaceholder: "your@email.com",
      password: "密码",
      passwordPlaceholder: "••••••••",
      signIn: "登录",
      signingIn: "登录中...",
      orContinueWith: "或继续使用",
      continueWithGoogle: "使用Google继续",
      continueWithApple: "使用Apple继续",
      noAccount: "还没有账户？",
      createAccount: "创建账户",
      errors: {
        loginNotFound: "登录不存在",
        accessDenied: "访问被拒绝"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "欢迎",
      chooseDashboard: "选择一个仪表板",
      manageBots: {
        title: "管理机器人",
        description: "创建、监控和管理您的交易机器人",
        button: "打开管理器"
      },
      metrics: {
        title: "指标",
        description: "查看实时性能和统计数据",
        button: "打开仪表板"
      }
    },

    // Landing Page
    landing: {
      tagline: "下一代DeFi生态系统",
      badge: "革命性DeFi解决方案",
      hero: {
        title: "构建未来的",
        subtitle: "算法交易",
        description: "Znit.io正在开创下一代自动化交易，拥有尖端交易机器人和先进算法，适用于加密货币和传统市场。",
        ctaDashboard: "访问仪表板",
        ctaExplore: "探索服务"
      },
      stats: { bots: "活跃机器人", users: "活跃用户", volume: "交易量", uptime: "运行时间" },
      services: {
        title: "我们的服务",
        subtitle: "具有尖端算法和策略的高级交易机器人",
        bots: {
          title: "交易机器人", description: "针对加密和传统市场的高度可扩展机器人，具有先进策略。", detailTitle: "高级算法交易", detailDescription: "我们的复杂交易机器人利用尖端算法和机器学习来最大化回报。", cta: "探索机器人",
          strategies: { liquidityPool: "流动性池", meanReversion: "均值回归", trendingFlow: "趋势流", machineLearning: "机器学习", highFrequency: "高频", arbitrage: "套利" }
        },
        betting: {
          title: "体育博彩", description: "去中心化体育博彩平台，为投注者提供完全匿名和隐私。", detailTitle: "匿名体育博彩", detailDescription: "体验真正去中心化的体育博彩，拥有完全隐私和匿名性。", cta: "立即开始投注",
          features: { anonymity: "完全匿名", privacy: "隐私优先", crypto: "加密支付", decentralized: "去中心化" }
        },
        launch: {
          title: "加密启动", description: "用于启动加密项目的动态智能合约解决方案。", detailTitle: "启动您的项目", detailDescription: "使用我们经过实战检验的智能合约和启动基础设施，自信地部署您的加密项目。", cta: "启动项目",
          features: { smartContracts: "智能合约", tokenomics: "代币经济学设计", multichain: "多链", innovation: "创新" }
        }
      },
      showcase: {
        label: "实时指标",
        bots: { metric1: { label: "成功率", value: "94.2%" }, metric2: { label: "活跃策略", value: "156" }, metric3: { label: "总交易", value: "1.2M+" } },
        betting: { metric1: { label: "总投注", value: "50K+" }, metric2: { label: "活跃用户", value: "10K+" }, metric3: { label: "支付率", value: "99.8%" } },
        launch: { metric1: { label: "已启动项目", value: "25+" }, metric2: { label: "总募集", value: "$10M+" }, metric3: { label: "成功率", value: "92%" } }
      },
      why: {
        title: "为什么选择Znit.io？",
        subtitle: "由尖端技术驱动的最先进DeFi生态系统",
        reasons: {
          security: { title: "银行级安全", description: "军事级加密和多重签名钱包全天候保护您的资产" },
          technology: { title: "尖端技术", description: "采用最新区块链技术和AI算法构建" },
          performance: { title: "高性能", description: "闪电般的执行速度和99.9%的正常运行时间保证" },
          community: { title: "强大社区", description: "加入我们不断增长的生态系统中的数千名用户" },
          transparency: { title: "完全透明", description: "所有操作都在链上且可验证" },
          speed: { title: "即时执行", description: "亚秒级交易处理和实时结算" }
        }
      },
      cta: { title: "准备开始了吗？", description: "加入数千名已从我们革命性DeFi生态系统中受益的用户", primary: "启动投注应用", secondary: "联系销售" },
      learnMore: "了解更多"
    },
    
    // Hero Section
    hero: {
      badge: "去中心化平台",
      title: "体育博彩的未来",
      glowText: "体育博彩",
      subtitle: "体验去中心化体育博彩，使用加密货币支付、智能合约和透明支付。没有中介，只有纯粹的点对点行动。",
      startBetting: "开始投注",
      explorePlatform: "探索平台"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "加密支付",
        description: "在以太坊和Polygon网络上使用USDT投注，费用低廉，交易快速"
      },
      smartContracts: {
        title: "智能合约",
        description: "通过智能合约实现透明和自动化的奖品分配"
      },
      peerToPeer: {
        title: "点对点",
        description: "无中介直接投注，最低费用和完全资金控制"
      }
    },
    
    // Events Section
    events: {
      title: "实时体育赛事",
      subtitle: "使用加密货币对实时体育赛事进行投注",
      team1: "队伍 1",
      team2: "队伍 2",
      betAmount: "投注金额 (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "立即投注",
      processing: "处理中...",
      bettingClosed: "投注已关闭",
      timeLeft: {
        days: "天",
        hours: "小时",
        minutes: "分钟",
        remaining: "剩余"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "您的投资组合",
      subtitle: "追踪您的投注表现和历史",
      connectMessage: "连接您的钱包",
      connectDescription: "连接您的钱包以查看您的投注投资组合",
      stats: {
        totalBets: "总投注数",
        totalWagered: "总投注额 (USDT)",
        activeBets: "活跃投注"
      },
      history: {
        title: "投注历史",
        description: "您最近的投注活动",
        noHistory: "还没有投注记录。开始投注以查看您的历史！",
        event: "赛事",
        confirmed: "已确认",
        pending: "待定"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 钱包连接成功！",
      walletDisconnected: "钱包已断开连接",
      walletRequired: "需要MetaMask。请安装MetaMask以继续。",
      walletConnectionFailed: "钱包连接失败。请重试。",
      betPlaced: "🎉 投注成功！交易：",
      betFailed: "投注失败",
      loadEventsFailed: "加载赛事失败",
      loadHistoryFailed: "加载投注历史失败",
      connectFirst: "请先连接您的钱包",
      enterAmount: "输入金额并选择结果",
      signedOut: "退出成功",
      signOutError: "退出时出错"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "英超联赛",
      "NBA": "NBA",
      "La Liga": "西甲",
      "Champions League": "欧冠",
      "NFL": "NFL"
    }
  },
  
  'ja-JP': {
    // Navigation
    nav: {
      brand: "CryptoBet",
      subtitle: "DeFiプラットフォーム",
      home: "ホーム",
      bets: "ベッティング",
      portfolio: "ポートフォリオ",
      rankings: "ランキング",
      connectWallet: "ウォレット接続",
      disconnect: "切断",
      connecting: "接続中...",
      login: "ログイン"
    },

    // Login
    login: {
      title: "ログイン",
      email: "メール",
      emailPlaceholder: "your@email.com",
      password: "パスワード",
      passwordPlaceholder: "••••••••",
      signIn: "サインイン",
      signingIn: "サインイン中...",
      orContinueWith: "または続行",
      continueWithGoogle: "Googleで続行",
      continueWithApple: "Appleで続行",
      noAccount: "アカウントをお持ちでない方",
      createAccount: "アカウント作成",
      errors: {
        loginNotFound: "ログインが見つかりません",
        accessDenied: "アクセスが許可されていません"
      }
    },

    // Dashboard Selector
    dashboard: {
      welcome: "ようこそ",
      chooseDashboard: "ダッシュボードを選択",
      manageBots: {
        title: "ボット管理",
        description: "トレーディングボットの作成、監視、管理",
        button: "マネージャーを開く"
      },
      metrics: {
        title: "メトリクス",
        description: "リアルタイムのパフォーマンスと統計を表示",
        button: "ダッシュボードを開く"
      }
    },

    // Landing Page
    landing: {
      tagline: "次世代DeFiエコシステム",
      badge: "革新的なDeFiソリューション",
      hero: {
        title: "未来を構築する",
        subtitle: "アルゴリズム取引",
        description: "Znit.ioは、最先端のトレーディングボットと先進的なアルゴリズムで、暗号通貨と従来市場向けの次世代自動取引を開拓しています。",
        ctaDashboard: "ダッシュボードにアクセス",
        ctaExplore: "サービスを探索"
      },
      stats: { bots: "アクティブボット", users: "アクティブユーザー", volume: "取引量", uptime: "稼働時間" },
      services: {
        title: "私たちのサービス",
        subtitle: "最先端のアルゴリズムと戦略を備えた高度なトレーディングボット",
        bots: {
          title: "トレーディングボット", description: "高度な戦略を持つ暗号通貨と従来市場向けの高度にスケーラブルなボット。", detailTitle: "高度なアルゴリズム取引", detailDescription: "当社の洗練されたトレーディングボットは、最先端のアルゴリズムと機械学習を活用してリターンを最大化します。", cta: "ボットを探索",
          strategies: { liquidityPool: "流動性プール", meanReversion: "平均回帰", trendingFlow: "トレンドフロー", machineLearning: "機械学習", highFrequency: "高頻度", arbitrage: "アービトラージ" }
        },
        betting: {
          title: "スポーツベッティング", description: "ベッターに完全な匿名性とプライバシーを提供する分散型スポーツベッティングプラットフォーム。", detailTitle: "匿名スポーツベッティング", detailDescription: "完全なプライバシーと匿名性を備えた真に分散型のスポーツベッティングを体験してください。", cta: "今すぐベッティングを開始",
          features: { anonymity: "完全な匿名性", privacy: "プライバシー優先", crypto: "暗号通貨決済", decentralized: "分散型" }
        },
        launch: {
          title: "暗号ローンチ", description: "革新的なトークノミクスを持つ暗号プロジェクトを立ち上げるための動的なスマートコントラクトソリューション。", detailTitle: "プロジェクトを立ち上げる", detailDescription: "実証済みのスマートコントラクトとローンチインフラストラクチャを使用して、自信を持って暗号プロジェクトをデプロイします。", cta: "プロジェクトを立ち上げる",
          features: { smartContracts: "スマートコントラクト", tokenomics: "トークノミクス設計", multichain: "マルチチェーン", innovation: "イノベーション" }
        }
      },
      showcase: {
        label: "ライブメトリクス",
        bots: { metric1: { label: "成功率", value: "94.2%" }, metric2: { label: "アクティブ戦略", value: "156" }, metric3: { label: "総取引", value: "1.2M+" } },
        betting: { metric1: { label: "総ベット", value: "50K+" }, metric2: { label: "アクティブユーザー", value: "10K+" }, metric3: { label: "ペイアウト率", value: "99.8%" } },
        launch: { metric1: { label: "立ち上げプロジェクト", value: "25+" }, metric2: { label: "総調達額", value: "$10M+" }, metric3: { label: "成功率", value: "92%" } }
      },
      why: {
        title: "なぜZnit.ioを選ぶのか？",
        subtitle: "最先端技術によって支えられた最も先進的なDeFiエコシステム",
        reasons: {
          security: { title: "銀行グレードのセキュリティ", description: "軍事グレードの暗号化とマルチシグネチャウォレットが24/7であなたの資産を保護します" },
          technology: { title: "最先端テクノロジー", description: "最新のブロックチェーン技術とAIアルゴリズムで構築" },
          performance: { title: "高性能", description: "超高速実行と99.9%の稼働時間保証" },
          community: { title: "強力なコミュニティ", description: "成長するエコシステムで数千人のユーザーに参加" },
          transparency: { title: "完全な透明性", description: "すべての操作はオンチェーンで検証可能" },
          speed: { title: "即座の実行", description: "サブセカンドトランザクション処理とリアルタイム決済" }
        }
      },
      cta: { title: "始める準備はできましたか？", description: "すでに革新的なDeFiエコシステムから恩恵を受けている数千人のユーザーに参加しましょう", primary: "ベッティングアプリを起動", secondary: "セールスに連絡" },
      learnMore: "詳細を見る"
    },
    
    // Hero Section
    hero: {
      badge: "分散型プラットフォーム",
      title: "スポーツベッティングの未来",
      glowText: "スポーツベッティング",
      subtitle: "暗号通貨決済、スマートコントラクト、透明な支払いによる分散型スポーツベッティングを体験してください。仲介者なし、純粋なピアツーピアアクションのみ。",
      startBetting: "ベッティング開始",
      explorePlatform: "プラットフォーム探索"
    },
    
    // Feature Cards
    features: {
      cryptoPayments: {
        title: "暗号通貨決済",
        description: "イーサリアムとPolygonネットワークでUSDTを使用してベット、低手数料と高速取引"
      },
      smartContracts: {
        title: "スマートコントラクト",
        description: "スマートコントラクトによる透明で自動化された賞品配布"
      },
      peerToPeer: {
        title: "ピアツーピア",
        description: "仲介者なしの直接ベッティング、最小手数料と完全な資金管理"
      }
    },
    
    // Events Section
    events: {
      title: "ライブスポーツイベント",
      subtitle: "暗号通貨でライブスポーツイベントにベットを配置",
      team1: "チーム1",
      team2: "チーム2",
      betAmount: "ベット額 (USDT)",
      betAmountPlaceholder: "0.00",
      placeBet: "今すぐベット",
      processing: "処理中...",
      bettingClosed: "ベッティング終了",
      timeLeft: {
        days: "日",
        hours: "時間",
        minutes: "分",
        remaining: "残り"
      }
    },
    
    // Portfolio
    portfolio: {
      title: "あなたのポートフォリオ",
      subtitle: "ベッティングパフォーマンスと履歴を追跡",
      connectMessage: "ウォレットを接続",
      connectDescription: "ベッティングポートフォリオを表示するためにウォレットを接続してください",
      stats: {
        totalBets: "総ベット数",
        totalWagered: "総賭け金 (USDT)",
        activeBets: "アクティブベット"
      },
      history: {
        title: "ベッティング履歴",
        description: "最近のベッティング活動",
        noHistory: "まだベットが配置されていません。履歴を見るためにベッティングを開始してください！",
        event: "イベント",
        confirmed: "確認済み",
        pending: "保留中"
      }
    },
    
    // Toast Messages
    toasts: {
      walletConnected: "🚀 ウォレット接続成功！",
      walletDisconnected: "ウォレット切断",
      walletRequired: "MetaMaskが必要です。続行するにはMetaMaskをインストールしてください。",
      walletConnectionFailed: "ウォレット接続に失敗しました。再試行してください。",
      betPlaced: "🎉 ベット配置成功！TX：",
      betFailed: "ベット失敗",
      loadEventsFailed: "イベント読み込み失敗",
      loadHistoryFailed: "ベッティング履歴読み込み失敗",
      connectFirst: "まずウォレットを接続してください",
      enterAmount: "金額を入力し結果を選択してください",
      signedOut: "サインアウトしました",
      signOutError: "サインアウトエラー"
    },

    // Sports Leagues
    leagues: {
      "Premier League": "プレミアリーグ",
      "NBA": "NBA",
      "La Liga": "ラ・リーガ",
      "Champions League": "チャンピオンズリーグ",
      "NFL": "NFL"
    }
  }
};