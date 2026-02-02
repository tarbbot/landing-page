import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard-selector');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Znit.io</h1>
          <p className="text-gray-400">Acesso restrito a emails @znit.io</p>
        </div>

        <Authenticator loginMechanisms={['email']} signUpAttributes={['name']} />
      </div>
    </div>
  );
};

export default Login;
