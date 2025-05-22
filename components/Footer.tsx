
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-text-header text-slate-300 py-12"> {/* Updated colors */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">{APP_NAME}</h3>
            <p className="text-sm text-slate-400">Helping you discover and connect with your local community.</p> {/* Lighter text for readability */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/community" className="hover:text-brand-primary transition-colors">Community</Link></li>
              {/* <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li> */}
              {/* <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
            <p className="text-sm text-slate-400">Follow us on social media!</p> {/* Lighter text */}
            <div className="flex justify-center space-x-4 mt-2">
              {/* Example: <a href="#" className="hover:text-brand-primary transition-colors">Facebook</a> */}
            </div>
          </div>
        </div>
        <hr className="border-slate-700 my-8" /> {/* Darker border for contrast */}
        <p className="text-sm">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="text-xs text-slate-500 mt-1">Designed with <span role="img" aria-label="love">❤️</span> for local exploration.</p>
      </div>
    </footer>
  );
};
