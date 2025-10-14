import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Zap, 
  Twitter, 
  Github, 
  MessageCircle,
  Mail,
  Globe,
  Shield,
  Users,
  HelpCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
  icon: LucideIcon | null;
}

interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const footerLinks: Record<string, FooterLink[]> = {
    platform: [
      { name: t('nav.bets'), href: '/', icon: null },
      { name: t('nav.portfolio'), href: '/portfolio', icon: null },
      { name: t('nav.rankings'), href: '/rankings', icon: null },
      { name: 'API Docs', href: '#', icon: null }
    ],
    legal: [
      { name: 'Terms of Service', href: '#', icon: null },
      { name: 'Privacy Policy', href: '#', icon: null },
      { name: 'Cookie Policy', href: '#', icon: null },
      { name: 'Responsible Gaming', href: '#', icon: null }
    ],
    support: [
      { name: 'Help Center', href: '#', icon: HelpCircle },
      { name: 'Contact Us', href: '#', icon: Mail },
      { name: 'Community', href: '#', icon: Users },
      { name: 'Bug Reports', href: '#', icon: Github }
    ]
  };

  const socialLinks: SocialLink[] = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Discord', href: '#', icon: MessageCircle },
    { name: 'Telegram', href: '#', icon: Mail }
  ];

  return (
    <footer className="cyber-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="footer-brand">
              <div className="footer-logo">
                <Zap className="h-8 w-8 text-white" />
              </div>
              {isLandingPage ? (
                <div>
                  <span className="text-2xl font-bold gradient-text">Znit.io</span>
                  <div className="text-sm text-purple-400 font-mono">{t('landing.tagline')}</div>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold gradient-text">{t('nav.brand')}</span>
                  <div className="text-sm text-purple-400 font-mono">{t('nav.subtitle')}</div>
                </div>
              )}
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
              {isLandingPage ? t('landing.hero.description') : t('hero.subtitle')}
            </p>

            <div className="flex items-center space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                All Systems Operational
              </div>
              <div className="text-gray-500">•</div>
              <div className="text-gray-400">
                Uptime: 99.9%
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors duration-300 py-2 flex items-center">
                    {link.icon && <link.icon className="h-4 w-4 mr-2 flex-shrink-0" />}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500/20 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-400" />
                Secured by Blockchain
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                Decentralized
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-400" />
                Community Driven
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {isLandingPage ? '© 2025 Built by ⚡ Znit.io' : '© 2025 CryptoBet. Built by ⚡ Znit.io'}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-purple-500/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500">
              <div>
                <strong className="text-purple-400">Supported Networks:</strong><br />
                Ethereum, Polygon, BSC
              </div>
              <div>
                <strong className="text-purple-400">Supported Tokens:</strong><br />
                USDT, USDC, DAI, ETH
              </div>
              <div>
                <strong className="text-purple-400">Smart Contract:</strong><br />
                <span className="font-mono">0x1234...5678</span> 
                <a href="#" className="text-purple-400 hover:text-purple-300 ml-1">(Verify)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

