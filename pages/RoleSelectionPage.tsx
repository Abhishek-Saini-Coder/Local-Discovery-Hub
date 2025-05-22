
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
// import { Button } from '../components/common/Button'; // Not directly used for role cards
import { BuildingIcon } from '../components/icons/BuildingIcon';
import { UserGroupIcon } from '../components/icons/UserGroupIcon'; 


interface RoleSelectionPageProps {
  onSetRole: (role: UserRole) => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSetRole }) => {
  const navigate = useNavigate();

  const handleSelectRole = (role: UserRole) => {
    onSetRole(role);
    // Navigation logic is handled by App.tsx after role is set and currentUser updates
    // However, for immediate feedback, can navigate, App.tsx's logic will then confirm/redirect if needed
    if (role === UserRole.BUSINESS_OWNER) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    // Page background is bg-page-bg from body tag
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-10 bg-card-bg p-10 rounded-xl shadow-2xl text-center"> {/* card-bg */}
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-text-header"> {/* text-header */}
            Welcome! How will you use Local Discovery?
          </h2>
          <p className="mt-4 text-lg text-text-body"> {/* text-body */}
            Help us personalize your experience. Choose the role that best describes you:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelectRole(UserRole.BUSINESS_OWNER)}
            className="group relative w-full flex flex-col items-center justify-center p-8 border-2 border-transparent rounded-lg bg-slate-100 hover:bg-sky-100 hover:border-brand-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary" // Updated background and hover states
          >
            <BuildingIcon className="h-16 w-16 text-brand-primary mb-4 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">I'm a Business Owner</h3> {/* Darker text */}
            <p className="text-sm text-text-body">List your business, manage your catalogue, and connect with customers.</p>
          </button>

          <button
            onClick={() => handleSelectRole(UserRole.GENERAL_USER)}
            className="group relative w-full flex flex-col items-center justify-center p-8 border-2 border-transparent rounded-lg bg-slate-100 hover:bg-sky-100 hover:border-brand-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary" // Updated background and hover states
          >
            <UserGroupIcon className="h-16 w-16 text-brand-primary mb-4 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">I'm Exploring</h3> {/* Darker text */}
            <p className="text-sm text-text-body">Discover local businesses, read reviews, and engage with the community.</p>
          </button>
        </div>
         <p className="mt-6 text-xs text-text-muted"> {/* text-muted */}
            You can change this preference later in your profile settings (feature coming soon).
          </p>
      </div>
    </div>
  );
};
