import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, MessageCircle, Twitter } from 'lucide-react';
import ZMark from './brand/ZMark';
import { useLanguage } from '../i18n/LanguageContext';

const social = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Discord', href: '#', icon: MessageCircle },
  { name: 'Telegram', href: '#', icon: Mail },
];

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="zn-foot">
      <div className="zn-foot-top">
        <Link to="/" className="zn-foot-brand">
          <ZMark className="zn-foot-z" color="#22e6ff" />
          <span>{t('landing.tagline')}</span>
        </Link>
        <div className="zn-foot-links">
          <button type="button" onClick={() => window.dispatchEvent(new Event('znit:login'))}>{t('ui.dashboard')}</button>
          {social.map((s) => (
            <a key={s.name} href={s.href} aria-label={s.name}>
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="zn-foot-word" aria-hidden="true">ZNIT.IO</div>
      <div className="zn-foot-bot">© {new Date().getFullYear()} Znit.io</div>
    </footer>
  );
};

export default Footer;
