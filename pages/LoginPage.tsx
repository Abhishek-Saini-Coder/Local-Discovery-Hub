
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { User } from '../types'; // Not needed here
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { BuildingIcon } from '../components/icons/BuildingIcon'; 
import { APP_NAME } from '../constants';

interface LoginPageProps {
  onLogin: (email: string, password_param: string) => boolean; 
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const loginSuccess = onLogin(email, password);
    
    if (!loginSuccess) {
      setError('Invalid email or password. Please try again or create an account.');
    }
    // Navigation is handled by App.tsx's route definitions upon currentUser state change
  }, [email, password, onLogin]);

  return (
    // Page background is bg-page-bg from body tag
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card-bg p-10 rounded-xl shadow-2xl"> {/* card-bg */}
        <div>
          <Link to="/" className="flex items-center justify-center space-x-2 text-brand-primary hover:text-brand-accent transition-colors mb-6">
            <BuildingIcon className="h-12 w-12 text-brand-primary" /> 
            <h1 className="text-3xl font-bold text-brand-primary">{APP_NAME}</h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-header"> {/* text-header */}
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-body"> {/* text-body */}
            Or{' '}
            <Link to="/signup" className="font-medium text-brand-primary hover:text-brand-accent">
              create an account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div>
            {/* Button uses brand-primary by default */}
            <Button type="submit" className="w-full group text-lg py-3">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
