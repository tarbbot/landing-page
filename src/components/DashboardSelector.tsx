import React from 'react';
import { Activity, BarChart3, LogOut } from 'lucide-react';
import { signOut } from 'aws-amplify/auth';
import { toast } from 'sonner';
import { useLanguage } from '../i18n/LanguageContext';

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

const DashboardSelector: React.FC = () => {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = React.useState<string>('');

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { fetchAuthSession } = await import('aws-amplify/auth');
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;

        if (idToken) {
          const payload = JSON.parse(atob(idToken.toString().split('.')[1]));
          setUserEmail(payload.email || '');
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      toast.success(t('toasts.signedOut'));
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(t('toasts.signOutError'));
    }
  };

  const openDashboard = (url: string) => {
    // Get tokens from localStorage to pass to other apps
    const idToken = localStorage.getItem('idToken');
    const accessToken = localStorage.getItem('accessToken');

    if (idToken) {
      // Pass tokens via URL for cross-origin localStorage sharing
      const tokenParams = new URLSearchParams({
        idToken: idToken,
        accessToken: accessToken || '',
      });
      window.open(`${url}?${tokenParams.toString()}`, '_blank');
    } else {
      // No token available, just open the URL (will redirect to login)
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <FloatingParticles />
      <div className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {t('dashboard.welcome')}{userEmail && `, ${userEmail.split('@')[0]}`}
          </h1>
          <p className="text-gray-400 text-lg">{t('dashboard.chooseDashboard')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="cyber-card p-8 hover:border-purple-400 transition-all cursor-pointer" onClick={() => openDashboard('http://localhost:3000')}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Activity className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('dashboard.manageBots.title')}</h3>
              <p className="text-gray-400 mb-6">
                {t('dashboard.manageBots.description')}
              </p>
              <button className="cyber-button w-full justify-center">
                {t('dashboard.manageBots.button')}
              </button>
            </div>
          </div>

          <div className="cyber-card p-8 hover:border-cyan-400 transition-all cursor-pointer" onClick={() => openDashboard('http://localhost:3001')}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('dashboard.metrics.title')}</h3>
              <p className="text-gray-400 mb-6">
                {t('dashboard.metrics.description')}
              </p>
              <button className="cyber-button w-full justify-center">
                {t('dashboard.metrics.button')}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
