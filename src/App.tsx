import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BrowserProvider } from "ethers";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { 
  Wallet, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Users, 
  DollarSign, 
  Globe, 
  Gamepad2, 
  Zap, 
  Star,
  Shield,
  Target,
  Activity,
  Coins
} from "lucide-react";
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';
import Rankings from './components/Rankings';
import LandingPage from './components/LandingPage';
import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Types
interface Web3ContextType {
  account: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  provider: BrowserProvider | null;
  token: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

interface Web3ProviderProps {
  children: ReactNode;
}

interface SportEvent {
  id: number;
  team1: string;
  team2: string;
  league: string;
  sport: string;
  description: string;
  startTime: string;
  deadline: number;
  odds: {
    team1: number;
    team2: number;
    draw?: number;
  };
  status: string;
}

interface Bet {
  id: number;
  eventId: number;
  event_id: number;
  team: string;
  amount: string;
  odds: number;
  outcome: number;
  status: string;
  timestamp: string;
}

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }}
    />
  ));

  return <div className="particles-bg">{particles}</div>;
};

// Web3 Context
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const { t } = useLanguage();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const ethersProvider = new BrowserProvider(window.ethereum);
        const accounts = await ethersProvider.listAccounts();
        if (accounts.length > 0 && token) {
          setAccount(accounts[0].address);
          setProvider(ethersProvider);
          setIsConnected(true);
          await updateBalance(accounts[0].address);
        }
      } catch (error) {
        console.log('No wallet connected');
      }
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const response = await axios.get(`${API}/balance/ethereum/${address}`);
      setBalance(response.data.formatted_balance);
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error(t('toasts.walletRequired'), {
        className: 'error-toast'
      });
      return;
    }

    setIsConnecting(true);

    try {
      const ethersProvider = new BrowserProvider(window.ethereum);
      const accounts = await ethersProvider.send('eth_requestAccounts', []);
      const address = accounts[0];

      setProvider(ethersProvider);
      setAccount(address);

      // Get authentication challenge
      const challengeResponse = await axios.post(`${API}/auth/challenge`, { address });
      const { message, nonce } = challengeResponse.data;

      // Sign message with MetaMask
      const signer = await ethersProvider.getSigner();
      const signature = await signer.signMessage(message);

      // Verify signature and get token
      const verifyResponse = await axios.post(`${API}/auth/verify`, {
        address,
        signature,
        nonce
      });

      const { access_token } = verifyResponse.data;
      localStorage.setItem('auth_token', access_token);
      setToken(access_token);
      setIsConnected(true);

      await updateBalance(address);
      toast.success(t('toasts.walletConnected'), {
        className: 'success-toast'
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error(t('toasts.walletConnectionFailed'), {
        className: 'error-toast'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setIsConnected(false);
    setProvider(null);
    localStorage.removeItem('auth_token');
    setToken(null);
    toast.success(t('toasts.walletDisconnected'), {
      className: 'success-toast'
    });
  };

  const value = {
    account,
    balance,
    isConnected,
    isConnecting,
    provider,
    token,
    connectWallet,
    disconnectWallet
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

// Navigation Component
const Navigation: React.FC = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const { t, changeLanguage, getAvailableLanguages, getCurrentLanguageInfo } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const loginDropdownRef = React.useRef<HTMLDivElement>(null);

  const currentLang = getCurrentLanguageInfo();
  const availableLanguages = getAvailableLanguages();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };

    if (loginDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loginDropdownOpen]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.error(t('login.errors.loginNotFound'), {
        className: 'error-toast'
      });
      setIsLoggingIn(false);
      setLoginForm({ email: '', password: '' });
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoggingIn(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.error(t('login.errors.accessDenied'), {
        className: 'error-toast'
      });
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <>
      <nav className="cyber-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="nav-logo">
                <Zap className="h-8 w-8 text-white" />
              </div>
              {isLandingPage ? (
                <div>
                  <span className="text-2xl font-bold gradient-text">Znit.io</span>
                  <div className="text-xs text-purple-400 font-mono">{t('landing.tagline')}</div>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold gradient-text">{t('nav.brand')}</span>
                  <div className="text-xs text-purple-400 font-mono">{t('nav.subtitle')}</div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            {!isLandingPage && (
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="nav-link">
                  <Zap className="h-4 w-4 mr-2 inline" />
                  {t('nav.home')}
                </Link>
                <Link to="/betting" className="nav-link">
                  <Target className="h-4 w-4 mr-2 inline" />
                  {t('nav.bets')}
                </Link>
                <Link to="/portfolio" className="nav-link">
                  <Activity className="h-4 w-4 mr-2 inline" />
                  {t('nav.portfolio')}
                </Link>
                <Link to="/rankings" className="nav-link">
                  <Trophy className="h-4 w-4 mr-2 inline" />
                  {t('nav.rankings')}
                </Link>
              </div>
            )}

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              
              {isLandingPage ? (
                // Login button for landing page
                <div className="relative" ref={loginDropdownRef}>
                  <button
                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                    className="cyber-button"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {t('nav.login')}
                  </button>

                  {/* Login Dropdown */}
                  {loginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl p-6 z-50 backdrop-blur-xl login-dropdown">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold gradient-text">{t('login.title')}</h3>
                        <button
                          onClick={() => setLoginDropdownOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="email" className="text-gray-300 text-sm mb-2 block">
                            {t('login.email')}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('login.emailPlaceholder')}
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            required
                            className="cyber-input w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-gray-300 text-sm mb-2 block">
                            {t('login.password')}
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder={t('login.passwordPlaceholder')}
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            required
                            className="cyber-input w-full"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="cyber-button w-full justify-center"
                        >
                          {isLoggingIn ? (
                            <>
                              <div className="spinner mr-2"></div>
                              {t('login.signingIn')}
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              {t('login.signIn')}
                            </>
                          )}
                        </button>
                      </form>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-gray-900 text-gray-400">{t('login.orContinueWith')}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => handleSocialLogin('google')}
                          disabled={isLoggingIn}
                          className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all disabled:opacity-50"
                        >
                          <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          {t('login.continueWithGoogle')}
                        </button>

                        <button
                          onClick={() => handleSocialLogin('apple')}
                          disabled={isLoggingIn}
                          className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all disabled:opacity-50"
                        >
                          <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                          </svg>
                          {t('login.continueWithApple')}
                        </button>
                      </div>

                      <div className="mt-6 text-center text-xs text-gray-500">
                        {t('login.noAccount')} <a href="#" className="text-purple-400 hover:text-purple-300">{t('login.createAccount')}</a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {isConnected ? (
                    <div className="flex items-center space-x-4">
                      <div className="wallet-info">
                        <div className="wallet-balance text-sm font-semibold">{balance}</div>
                        <div className="wallet-address text-xs">
                          {account?.slice(0, 6)}...{account?.slice(-4)}
                        </div>
                      </div>
                      <Button
                        onClick={disconnectWallet}
                        variant="outline"
                        size="sm"
                        className="disconnect-button"
                      >
                        {t('nav.disconnect')}
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className="cyber-button"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      {isConnecting ? (
                        <>
                          <div className="spinner mr-2"></div>
                          {t('nav.connecting')}
                        </>
                      ) : t('nav.connectWallet')}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Mobile Right Side */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Language Flag */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-2xl"
                aria-label="Current Language"
              >
                {currentLang?.flag}
              </button>

              {/* Login or Wallet Mobile */}
              {isLandingPage ? (
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="cyber-button text-xs px-3 py-2"
                  aria-label={t('nav.login')}
                >
                  <Users className="h-3 w-3" />
                </button>
              ) : (
                <>
                  {isConnected ? (
                    <button
                      onClick={disconnectWallet}
                      className="cyber-button text-xs px-3 py-2"
                    >
                      {account?.slice(0, 4)}...{account?.slice(-2)}
                    </button>
                  ) : (
                    <button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className="cyber-button text-xs px-3 py-2"
                    >
                      <Wallet className="h-3 w-3" />
                    </button>
                  )}
                </>
              )}

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Login Dropdown */}
      {loginDropdownOpen && isLandingPage && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLoginDropdownOpen(false)}>
          <div 
            className="w-full max-w-md bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">{t('login.title')}</h3>
              <button
                onClick={() => setLoginDropdownOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="mobile-email" className="text-gray-300 text-sm mb-2 block">
                  {t('login.email')}
                </Label>
                <Input
                  id="mobile-email"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                  className="cyber-input w-full"
                />
              </div>

              <div>
                <Label htmlFor="mobile-password" className="text-gray-300 text-sm mb-2 block">
                  {t('login.password')}
                </Label>
                <Input
                  id="mobile-password"
                  type="password"
                  placeholder={t('login.passwordPlaceholder')}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                  className="cyber-input w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="cyber-button w-full justify-center"
              >
                {isLoggingIn ? (
                  <>
                    <div className="spinner mr-2"></div>
                    {t('login.signingIn')}
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    {t('login.signIn')}
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">{t('login.orContinueWith')}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('login.continueWithGoogle')}
              </button>

              <button
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {t('login.continueWithApple')}
              </button>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              {t('login.noAccount')} <a href="#" className="text-purple-400 hover:text-purple-300">{t('login.createAccount')}</a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay - Outside of nav */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-72 bg-gray-950 border-l border-purple-500/30 shadow-2xl mobile-menu-panel overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
              <span className="text-xl font-bold gradient-text">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-purple-400 hover:text-purple-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links - Only show if not landing page */}
            {!isLandingPage && (
              <div className="p-6 space-y-4">
                <Link
                  to="/"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors py-3 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Zap className="h-5 w-5" />
                  <span className="text-lg">{t('nav.home')}</span>
                </Link>
                <Link
                  to="/betting"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors py-3 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Target className="h-5 w-5" />
                  <span className="text-lg">{t('nav.bets')}</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors py-3 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Activity className="h-5 w-5" />
                  <span className="text-lg">{t('nav.portfolio')}</span>
                </Link>
                <Link
                  to="/rankings"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors py-3 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Trophy className="h-5 w-5" />
                  <span className="text-lg">{t('nav.rankings')}</span>
                </Link>
              </div>
            )}

            {/* Language Selector */}
            <div className="p-6 border-t border-purple-500/20">
              <div className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Language</div>
              <div className="space-y-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                      lang.code === currentLang?.code
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {lang.code === currentLang?.code && (
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet Info (if connected) - Only show if not landing page */}
            {!isLandingPage && isConnected && (
              <div className="p-6 border-t border-purple-500/20">
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Connected Wallet</div>
                  <div className="text-purple-400 font-mono text-sm mb-2">
                    {account?.slice(0, 10)}...{account?.slice(-8)}
                  </div>
                  <div className="text-cyan-400 font-semibold">{balance}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="hero-section">
      <div className="cyber-grid"></div>
      <div className="hero-bg-overlay"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        <div className="mb-6">
          <Badge variant="default" className="sport-badge mb-6">
            <Shield className="h-4 w-4" />
            {t('hero.badge')}
          </Badge>
        </div>

        <h1 className="hero-title gradient-text">
          {t('hero.title')}
          <br />
          <span className="glow-text">{t('hero.glowText')}</span>
        </h1>
        
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={() => navigate('/betting')}
            className="cyber-button flex items-center"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            {t('hero.startBetting')}
          </button>
          
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-3"
          >
            <Globe className="h-5 w-5 mr-2" />
            {t('hero.explorePlatform')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="cyber-card">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-3 text-lg">{t('features.cryptoPayments.title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('features.cryptoPayments.description')}
              </p>
            </div>
          </div>
          
          <div className="cyber-card">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-3 text-lg">{t('features.smartContracts.title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('features.smartContracts.description')}
              </p>
            </div>
          </div>
          
          <div className="cyber-card">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-3 text-lg">{t('features.peerToPeer.title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('features.peerToPeer.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sports Events Component
const SportsEvents: React.FC = () => {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error(t('toasts.loadEventsFailed'), { className: 'error-toast' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="cyber-card loading-pulse">
            <div className="h-4 bg-gray-700 rounded mb-4"></div>
            <div className="h-6 bg-gray-700 rounded mb-6"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: SportEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isConnected, token, account } = useWeb3();
  const { t } = useLanguage();
  const [betAmount, setBetAmount] = useState<string>('');
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);
  const [isPlacingBet, setIsPlacingBet] = useState<boolean>(false);

  const timeUntilDeadline = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = event.deadline - now;
    
    if (timeLeft <= 0) return t('events.bettingClosed');
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    if (days > 0) return `${days}${t('events.timeLeft.days')} ${hours}${t('events.timeLeft.hours')}`;
    if (hours > 0) return `${hours}${t('events.timeLeft.hours')} ${minutes}${t('events.timeLeft.minutes')}`;
    return `${minutes}${t('events.timeLeft.minutes')} ${t('events.timeLeft.remaining')}`;
  };

  const placeBet = async () => {
    if (!isConnected || !token) {
      toast.error(t('toasts.connectFirst'), { className: 'error-toast' });
      return;
    }

    if (!betAmount || !selectedOutcome) {
      toast.error(t('toasts.enterAmount'), { className: 'error-toast' });
      return;
    }

    setIsPlacingBet(true);

    try {
      // Prepare bet transaction
      const prepareResponse = await axios.post(
        `${API}/bet/prepare`,
        {
          network: 'ethereum',
          event_id: event.id,
          amount: betAmount,
          outcome: selectedOutcome
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Mock transaction hash for demonstration
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);

      // Submit bet
      await axios.post(
        `${API}/bet/submit`,
        {
          network: 'ethereum',
          event_id: event.id,
          amount: betAmount,
          outcome: selectedOutcome,
          tx_hash: mockTxHash
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success(`${t('toasts.betPlaced')} ${mockTxHash.slice(0, 10)}...`, {
        className: 'success-toast'
      });
      
      setBetAmount('');
      setSelectedOutcome(null);
    } catch (error) {
      console.error('Failed to place bet:', error);
      const axiosError = error as any;
      toast.error(axiosError.response?.data?.detail || t('toasts.betFailed'), {
        className: 'error-toast'
      });
    } finally {
      setIsPlacingBet(false);
    }
  };

  const getSportIcon = (sport: string): string => {
    switch (sport) {
      case 'football':
        return '⚽';
      case 'basketball':
        return '🏀';
      default:
        return '🏆';
    }
  };

  return (
    <div className="event-card" data-testid={`event-card-${event.id}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="sport-badge">
            <span className="sport-icon">{getSportIcon(event.sport)}</span>
            {t(`leagues.${event.league}`) || event.league}
          </div>
          <div className="flex items-center text-purple-400 text-sm font-mono">
            <Clock className="h-4 w-4 mr-1" />
            {timeUntilDeadline()}
          </div>
        </div>

        <h3 className="text-white text-lg font-semibold mb-6 leading-tight">
          {event.description}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`bet-option ${selectedOutcome === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedOutcome(1)}
              data-testid={`team1-btn-${event.id}`}
            >
              <div className="text-center">
                <div className="text-white font-medium mb-1">{t('events.team1')}</div>
                <div className="text-cyan-400 font-mono text-sm">2.1x</div>
              </div>
            </div>
            
            <div
              className={`bet-option ${selectedOutcome === 2 ? 'selected' : ''}`}
              onClick={() => setSelectedOutcome(2)}
              data-testid={`team2-btn-${event.id}`}
            >
              <div className="text-center">
                <div className="text-white font-medium mb-1">{t('events.team2')}</div>
                <div className="text-cyan-400 font-mono text-sm">1.8x</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor={`amount-${event.id}`} className="text-gray-300 font-medium">
              {t('events.betAmount')}
            </Label>
            <Input
              id={`amount-${event.id}`}
              type="number"
              placeholder={t('events.betAmountPlaceholder')}
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="cyber-input"
              data-testid={`bet-amount-${event.id}`}
            />
          </div>

          <button
            onClick={placeBet}
            disabled={!isConnected || !betAmount || !selectedOutcome || isPlacingBet || event.deadline <= Date.now() / 1000}
            className="cyber-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid={`place-bet-btn-${event.id}`}
          >
            {isPlacingBet ? (
              <>
                <div className="spinner mr-2"></div>
                {t('events.processing')}
              </>
            ) : t('events.placeBet')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Portfolio Component
const Portfolio: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isConnected, token } = useWeb3();
  const { t } = useLanguage();

  useEffect(() => {
    if (isConnected && token) {
      fetchUserBets();
    }
  }, [isConnected, token]);

  const fetchUserBets = async () => {
    try {
      const response = await axios.get(`${API}/user/bets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBets(response.data);
    } catch (error) {
      console.error('Failed to fetch bets:', error);
      toast.error(t('toasts.loadHistoryFailed'), { className: 'error-toast' });
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Wallet className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{t('portfolio.connectMessage')}</h2>
        <p className="text-gray-400 text-lg">{t('portfolio.connectDescription')}</p>
      </div>
    );
  }

  const totalWagered = bets.reduce((sum, bet) => sum + parseFloat(bet.amount), 0);
  const activeBets = bets.filter(bet => bet.status === 'confirmed').length;

  return (
    <div className="space-y-8" data-testid="portfolio-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="stat-card">
          <div className="stat-value gradient-text">{bets.length}</div>
          <div className="stat-label">{t('portfolio.stats.totalBets')}</div>
          <Gamepad2 className="h-8 w-8 text-purple-400 mt-4 mx-auto" />
        </div>
        
        <div className="stat-card">
          <div className="stat-value gradient-text">{totalWagered.toFixed(2)}</div>
          <div className="stat-label">{t('portfolio.stats.totalWagered')}</div>
          <DollarSign className="h-8 w-8 text-pink-400 mt-4 mx-auto" />
        </div>
        
        <div className="stat-card">
          <div className="stat-value gradient-text">{activeBets}</div>
          <div className="stat-label">{t('portfolio.stats.activeBets')}</div>
          <Activity className="h-8 w-8 text-cyan-400 mt-4 mx-auto" />
        </div>
      </div>

      <div className="cyber-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{t('portfolio.history.title')}</h2>
            <p className="text-gray-400 mt-1">{t('portfolio.history.description')}</p>
          </div>
          <Star className="h-8 w-8 text-yellow-400" />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="history-item loading-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : bets.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-6" />
            <p className="text-gray-400 text-lg">
              {t('portfolio.history.noHistory')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bets.map((bet) => (
              <div key={bet.id} className="history-item">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-white font-semibold">{t('portfolio.history.event')} #{bet.event_id}</h3>
                      <span className={bet.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}>
                        {bet.status === 'confirmed' ? t('portfolio.history.confirmed') : t('portfolio.history.pending')}
                      </span>
                    </div>
                    <p className="text-gray-400">
                      <span className="text-cyan-400 font-mono">{bet.amount} USDT</span> {t('events.team1')} {bet.outcome}
                    </p>
                    <p className="text-gray-500 text-sm mt-1 font-mono">
                      {new Date(bet.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// Main App Component with Language Provider
function AppContent() {
  const { t } = useLanguage();

  return (
    <Web3Provider>
      <div className="App">
        <FloatingParticles />
        
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/betting" element={
                <div>
                  <HeroSection />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold gradient-text mb-6">
                        {t('events.title')}
                      </h2>
                      <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        {t('events.subtitle')}
                      </p>
                    </div>
                    <SportsEvents />
                  </div>
                </div>
              } />
              <Route path="/portfolio" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold gradient-text mb-6">{t('portfolio.title')}</h2>
                    <p className="text-gray-400 text-xl">
                      {t('portfolio.subtitle')}
                    </p>
                  </div>
                  <Portfolio />
                </div>
              } />
              <Route path="/rankings" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                  <Rankings />
                </div>
              } />
            </Routes>
          </main>
          
          <Footer />
        </BrowserRouter>
        
        <Toaster 
          theme="dark" 
          position="bottom-right"
          className="toaster"
          toastOptions={{
            style: {
              background: 'var(--normal-bg)',
              border: '1px solid var(--normal-border)',
              color: 'var(--normal-text)',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
    </Web3Provider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;