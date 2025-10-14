import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Rocket,
  Brain,
  Activity,
  ChevronRight,
  Star,
  Bot,
  Network,
  Lock,
  Coins,
  BarChart3,
  Cpu,
  Target,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Layers,
  Code2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<number>(0);

  // Auto-rotate active service showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services: Service[] = [
    {
      id: 'bots',
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      glowColor: 'rgba(139, 92, 246, 0.5)',
    },
    {
      id: 'betting',
      icon: Target,
      color: 'from-pink-500 to-cyan-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      id: 'launch',
      icon: Rocket,
      color: 'from-cyan-500 to-purple-500',
      glowColor: 'rgba(6, 182, 212, 0.5)',
    }
  ];

  const botStrategies = [
    { icon: Activity, key: 'liquidityPool' },
    { icon: TrendingUp, key: 'meanReversion' },
    { icon: BarChart3, key: 'trendingFlow' },
    { icon: Brain, key: 'machineLearning' },
    { icon: Zap, key: 'highFrequency' },
    { icon: Network, key: 'arbitrage' }
  ];

  const bettingFeatures = [
    { icon: Shield, key: 'anonymity' },
    { icon: Lock, key: 'privacy' },
    { icon: Coins, key: 'crypto' },
    { icon: Users, key: 'decentralized' }
  ];

  const launchFeatures = [
    { icon: Code2, key: 'smartContracts' },
    { icon: Layers, key: 'tokenomics' },
    { icon: Globe, key: 'multichain' },
    { icon: Sparkles, key: 'innovation' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center">
        <div className="cyber-grid"></div>
        <div className="hero-bg-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Logo/Brand */}
          <div className="mb-8 inline-block">
            <div className="flex items-center justify-center space-x-4">
              <div className="nav-logo p-4">
                <Zap className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-6xl font-bold gradient-text mb-2">Znit.io</h1>
                <p className="text-purple-400 font-mono text-sm">{t('landing.tagline')}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Badge variant="default" className="sport-badge mb-6 text-base px-6 py-2">
              <Sparkles className="h-5 w-5" />
              {t('landing.badge')}
            </Badge>
          </div>

          <h2 className="hero-title gradient-text text-5xl md:text-6xl mb-6">
            {t('landing.hero.title')}
            <br />
            <span className="glow-text">{t('landing.hero.subtitle')}</span>
          </h2>
          
          <p className="hero-subtitle text-xl max-w-3xl mx-auto mb-12">
            {t('landing.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button
              onClick={() => {
                navigate('/betting');
                window.scrollTo(0, 0);
              }}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 py-6 h-auto"
            >
              <Target className="h-5 w-5 mr-2" />
              {t('landing.hero.ctaBetting')}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-6 h-auto"
            >
              <Layers className="h-5 w-5 mr-2" />
              {t('landing.hero.ctaExplore')}
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Bot, label: t('landing.stats.bots'), value: '50+' },
              { icon: Users, label: t('landing.stats.users'), value: '10K+' },
              { icon: TrendingUp, label: t('landing.stats.volume'), value: '$5M+' },
              { icon: Star, label: t('landing.stats.uptime'), value: '99.9%' }
            ].map((stat, idx) => (
              <div key={idx} className="cyber-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">
              {t('landing.services.title')}
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {t('landing.services.subtitle')}
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className={`cyber-card cursor-pointer transition-all duration-500 ${
                  activeService === idx ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setActiveService(idx)}
                style={{
                  boxShadow: activeService === idx ? `0 0 50px ${service.glowColor}` : undefined
                }}
              >
                <div className="text-center p-8">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`landing.services.${service.id}.title`)}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {t(`landing.services.${service.id}.description`)}
                  </p>
                  <Button
                    variant="outline"
                    className={`w-full ${
                      service.id === 'betting'
                        ? 'bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                        : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={service.id !== 'betting'}
                    onClick={() => {
                      if (service.id === 'betting') {
                        navigate('/betting');
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    {service.id === 'betting' ? t('landing.services.betting.cta') : t('landing.learnMore')}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Service Showcase */}
          <div className="cyber-card p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${services[activeService].color} text-white mb-6`}>
                  {React.createElement(services[activeService].icon, { className: "h-5 w-5 mr-2" })}
                  {t(`landing.services.${services[activeService].id}.title`)}
                </div>
                <h3 className="text-4xl font-bold text-white mb-6">
                  {t(`landing.services.${services[activeService].id}.detailTitle`)}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {t(`landing.services.${services[activeService].id}.detailDescription`)}
                </p>

                {/* Features List */}
                {activeService === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {botStrategies.map((strategy, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-3">
                        <strategy.icon className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-300 text-sm">
                          {t(`landing.services.bots.strategies.${strategy.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeService === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {bettingFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-3">
                        <feature.icon className="h-5 w-5 text-pink-400" />
                        <span className="text-gray-300 text-sm">
                          {t(`landing.services.betting.features.${feature.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeService === 2 && (
                  <div className="grid grid-cols-2 gap-4">
                    {launchFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-3">
                        <feature.icon className="h-5 w-5 text-cyan-400" />
                        <span className="text-gray-300 text-sm">
                          {t(`landing.services.launch.features.${feature.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="cyber-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 border-2 border-purple-500/50">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-gray-400 font-mono text-sm">{t('landing.showcase.label')}</span>
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveService(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              activeService === idx 
                                ? 'bg-purple-500 w-8' 
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">
                            {t(`landing.showcase.${services[activeService].id}.metric1.label`)}
                          </span>
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold gradient-text">
                          {t(`landing.showcase.${services[activeService].id}.metric1.value`)}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">
                            {t(`landing.showcase.${services[activeService].id}.metric2.label`)}
                          </span>
                          <Activity className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="text-3xl font-bold gradient-text">
                          {t(`landing.showcase.${services[activeService].id}.metric2.value`)}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold">
                            {t(`landing.showcase.${services[activeService].id}.metric3.label`)}
                          </span>
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold gradient-text">
                          {t(`landing.showcase.${services[activeService].id}.metric3.value`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">
              {t('landing.why.title')}
            </h2>
            <p className="text-gray-400 text-xl">
              {t('landing.why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, key: 'security', color: 'purple' },
              { icon: Cpu, key: 'technology', color: 'pink' },
              { icon: TrendingUp, key: 'performance', color: 'cyan' },
              { icon: Users, key: 'community', color: 'purple' },
              { icon: Lock, key: 'transparency', color: 'pink' },
              { icon: Zap, key: 'speed', color: 'cyan' }
            ].map((item, idx) => (
              <div key={idx} className="cyber-card p-8 hover:scale-105 transition-transform">
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br from-${item.color}-500 to-pink-500 rounded-2xl flex items-center justify-center`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {t(`landing.why.reasons.${item.key}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`landing.why.reasons.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="cyber-card p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20"></div>
            <div className="relative z-10">
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-5xl font-bold gradient-text mb-6">
                {t('landing.cta.title')}
              </h2>
              <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
                {t('landing.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  className="bg-gray-800/50 border-2 border-gray-600 text-gray-500 text-lg px-10 py-7 h-auto cursor-not-allowed"
                >
                  <Target className="h-6 w-6 mr-2" />
                  {t('landing.cta.primary')}
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  className="bg-gray-800/50 border-2 border-gray-600 text-gray-500 text-lg px-10 py-7 h-auto cursor-not-allowed"
                >
                  <Rocket className="h-6 w-6 mr-2" />
                  {t('landing.cta.secondary')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

