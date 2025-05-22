
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { User, UserRole } from '../types';
import { BuildingIcon } from './icons/BuildingIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { LoginIcon } from './icons/LoginIcon';
import { LogoutIcon } from './icons/LogoutIcon';
// import { UserCircleIcon } from './icons/UserCircleIcon'; // Not used for now
import { DashboardIcon } from './icons/DashboardIcon';
import { MenuIcon } from './icons/MenuIcon'; 
import { XIcon } from './icons/XIcon'; 
import { ChatBubbleLeftEllipsisIcon } from './icons/ChatBubbleLeftEllipsisIcon';


interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Navigate after state update has a chance to propagate
    setIsMobileMenuOpen(false);
  };

  const commonLinkClass = "text-brand-primary hover:text-brand-accent transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2";
  const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-brand-primary hover:bg-slate-100 hover:text-brand-accent"; // Updated hover for mobile


  const NavLinks: React.FC<{isMobile?: boolean}> = ({isMobile}) => (
    <>
      <Link to="/" className={isMobile ? mobileLinkClass : commonLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
        <BuildingIcon className="h-5 w-5" /> <span>Home</span>
      </Link>
      {currentUser && (
         <Link to="/community" className={isMobile ? mobileLinkClass : commonLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5" /> <span>Community</span>
        </Link>
      )}
      {currentUser?.role === UserRole.BUSINESS_OWNER && (
        <Link to="/dashboard" className={isMobile ? mobileLinkClass : commonLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
          <DashboardIcon className="h-5 w-5" /> <span>Dashboard</span>
        </Link>
      )}
      {currentUser?.role === UserRole.BUSINESS_OWNER && (
        <Link
          to="/add-listing"
          className={`${isMobile ? mobileLinkClass + ' text-brand-accent' : commonLinkClass} ${isMobile ? '' : 'bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add Listing</span>
        </Link>
      )}
      {currentUser ? (
        <>
          {/* Display user name, maybe in a dropdown later */}
          {/* <span className={`${isMobile ? mobileLinkClass : commonLinkClass} text-text-body`}>Hi, {currentUser.name}</span> */}
          <button onClick={handleLogoutClick} className={isMobile ? mobileLinkClass : commonLinkClass}>
            <LogoutIcon className="h-5 w-5" /> <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={isMobile ? mobileLinkClass : commonLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
            <LoginIcon className="h-5 w-5" /> <span>Login</span>
          </Link>
          <Link 
            to="/signup" 
            className={`${isMobile ? mobileLinkClass : ''} ${isMobile ? '' : 'bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-150 flex items-center space-x-2'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </>
  );


  return (
    <header className="bg-card-bg shadow-md sticky top-0 z-50 border-b border-border-color"> {/* Updated colors */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <BuildingIcon className="h-10 w-10 text-brand-primary" /> 
            <h1 className="text-3xl font-bold tracking-tight text-text-header">{APP_NAME}</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <NavLinks />
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-primary hover:text-brand-accent hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-card-bg bg-opacity-95 backdrop-blur-sm p-4 space-y-1 z-40 border-t border-border-color shadow-lg" id="mobile-menu"> {/* Updated colors */}
          <NavLinks isMobile={true} />
        </div>
      )}
    </header>
  );
};
