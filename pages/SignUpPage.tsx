
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { BuildingIcon } from '../components/icons/BuildingIcon'; 
import { APP_NAME } from '../constants';

interface SignUpPageProps {
  onSignUp: (name: string, email: string, password_param: string) => { success: boolean; message?: string };
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const result = onSignUp(name, email, password);

    if (!result.success) {
      setError(result.message || 'Failed to create account. Please try again.');
    }
    // Navigation is handled by App.tsx's route definitions upon currentUser state change
  }, [name, email, password, confirmPassword, onSignUp]);

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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-body"> {/* text-body */}
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-primary hover:text-brand-accent">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
          <Input
            label="Full Name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••• (min. 6 characters)"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div>
            {/* Button uses brand-primary by default */}
            <Button type="submit" className="w-full group text-lg py-3">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

