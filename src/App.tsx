import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { Users, Zap, Activity, LogOut } from "lucide-react";
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import DashboardSelector from './components/DashboardSelector';
import CyberBackground from './components/CyberBackground';
import "./App.css";
import './amplifyConfig';
import { signInWithRedirect, signIn } from 'aws-amplify/auth';

// Navigation Component
const Navigation: React.FC = () => {
  const { t, changeLanguage, getAvailableLanguages, getCurrentLanguageInfo } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const loginDropdownRef = React.useRef<HTMLDivElement>(null);
  const userDropdownRef = React.useRef<HTMLDivElement>(null);

  const currentLang = getCurrentLanguageInfo();
  const availableLanguages = getAvailableLanguages();

  // Check Cognito authentication
  React.useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('idToken');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationTime = payload.exp * 1000;

          if (Date.now() < expirationTime) {
            setIsAuthenticated(true);
            setUserEmail(payload.email || '');
          } else {
            setIsAuthenticated(false);
            setUserEmail('');
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUserEmail('');
        }
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
    };

    checkAuth();
    // Check periodically
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    if (loginDropdownOpen || userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loginDropdownOpen, userDropdownOpen]);

  const handleSignOut = async () => {
    try {
      const { signOut } = await import('aws-amplify/auth');
      await signOut();
      localStorage.clear();
      setIsAuthenticated(false);
      setUserEmail('');
      setUserDropdownOpen(false);
      toast.success('Signed out successfully', {
        className: 'success-toast'
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out', {
        className: 'error-toast'
      });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const { isSignedIn } = await signIn({
        username: loginForm.email,
        password: loginForm.password,
      });

      if (isSignedIn) {
        // Get tokens and save to localStorage
        const { fetchAuthSession } = await import('aws-amplify/auth');
        const session = await fetchAuthSession();

        if (session.tokens) {
          localStorage.setItem('idToken', session.tokens.idToken?.toString() || '');
          localStorage.setItem('accessToken', session.tokens.accessToken?.toString() || '');
        }

        toast.success('Login successful!', {
          className: 'success-toast'
        });

        // Close dropdown and redirect to dashboard selector
        setLoginDropdownOpen(false);
        setLoginForm({ email: '', password: '' });
        window.location.href = '/dashboard-selector';
      }
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = t('login.errors.loginNotFound');

      if (error.name === 'UserNotFoundException' || error.name === 'NotAuthorizedException') {
        errorMessage = 'Incorrect email or password';
      } else if (error.name === 'UserNotConfirmedException') {
        errorMessage = 'User not confirmed. Please check your email.';
      }

      toast.error(errorMessage, {
        className: 'error-toast'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === 'google') {
      try {
        setIsLoggingIn(true);
        await signInWithRedirect({ provider: 'Google' });
      } catch (error) {
        console.error('Google login error:', error);
        toast.error(t('login.errors.accessDenied'), {
          className: 'error-toast'
        });
        setIsLoggingIn(false);
      }
    } else {
      // Other providers not implemented yet
      setIsLoggingIn(true);
      setTimeout(() => {
        toast.error(t('login.errors.accessDenied'), {
          className: 'error-toast'
        });
        setIsLoggingIn(false);
      }, 1000);
    }
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


            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />

              {isAuthenticated ? (
                // Authenticated user menu (show on all pages)
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="cyber-button flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden lg:inline">{userEmail.split('@')[0]}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-xl">
                      <div className="mb-3 pb-3 border-b border-gray-700">
                        <p className="text-xs text-gray-400 mb-1">Signed in as</p>
                        <p className="text-sm text-white font-semibold truncate">{userEmail}</p>
                      </div>

                      <div className="space-y-2">
                        <Link
                          to="/dashboard-selector"
                          className="w-full flex items-center justify-center px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-purple-300 transition-all"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : isLandingPage ? (
                // Login button for landing page (only when NOT authenticated)
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
              ) : null}
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
              {isAuthenticated ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="cyber-button text-xs px-3 py-2"
                  aria-label="User Menu"
                >
                  <Users className="h-3 w-3" />
                </button>
              ) : isLandingPage ? (
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="cyber-button text-xs px-3 py-2"
                  aria-label={t('nav.login')}
                >
                  <Users className="h-3 w-3" />
                </button>
              ) : null}

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

            {/* User Info (if authenticated) */}
            {isAuthenticated && (
              <div className="p-6 border-b border-purple-500/20">
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20 mb-4">
                  <div className="text-xs text-gray-400 mb-1">Signed in as</div>
                  <div className="text-purple-400 font-semibold text-sm truncate">{userEmail}</div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/dashboard-selector"
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-purple-300 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Activity className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
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

          </div>
        </div>
      )}
    </>
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
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);

  // Handle OAuth callback
  React.useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { getCurrentUser, fetchAuthSession } = await import('aws-amplify/auth');

        // Check if user is authenticated
        const user = await getCurrentUser();
        const session = await fetchAuthSession();

        if (user && session.tokens) {
          // Save tokens to localStorage
          localStorage.setItem('idToken', session.tokens.idToken?.toString() || '');
          localStorage.setItem('accessToken', session.tokens.accessToken?.toString() || '');

          // Redirect to dashboard selector if on landing/callback page
          if (window.location.pathname === '/' || window.location.pathname === '/callback') {
            window.location.href = '/dashboard-selector';
          }
        }
      } catch (error) {
        // User not authenticated, continue normally
        console.log('No authenticated user');
      } finally {
        setIsAuthChecking(false);
      }
    };

    handleOAuthCallback();
  }, []);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="App">
        <CyberBackground />
        
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard-selector" element={<DashboardSelector />} />
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