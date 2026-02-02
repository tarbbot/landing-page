import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession, signOut as amplifySignOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  const checkAuth = async () => {
    try {
      const session = await fetchAuthSession();
      const currentUser = await getCurrentUser();

      if (session.tokens) {
        setIsAuthenticated(true);
        setUser(currentUser);

        // Salvar tokens para os dashboards
        localStorage.setItem('idToken', session.tokens.idToken?.toString() || '');
        localStorage.setItem('accessToken', session.tokens.accessToken?.toString() || '');
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn' || payload.event === 'tokenRefresh') {
        checkAuth();
      } else if (payload.event === 'signedOut') {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.clear();
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await amplifySignOut();
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
