
import React from 'react';
import { BusinessForm } from '../components/BusinessForm';
import { Business } from '../types';
import { useNavigate } from 'react-router-dom';

interface AddListingPageProps {
  addBusiness: (business: Business) => void;
}

export const AddListingPage: React.FC<AddListingPageProps> = ({ addBusiness }) => {
  const navigate = useNavigate();

  const handleSubmit = (businessData: Business) => { 
    addBusiness(businessData);
    // Consider replacing alert with a more modern notification/toast system for better UX
    alert('Business listing added successfully!');
    navigate('/'); 
  };

  return (
    <div className="max-w-3xl mx-auto bg-card-bg p-8 sm:p-10 rounded-xl shadow-2xl"> {/* Updated to card-bg */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-brand-primary mb-3">List Your Business</h2> {/* Updated to brand-primary */}
        <p className="text-lg text-text-body"> {/* Updated to text-body */}
          Join our vibrant local directory! Fill out the form below to reach new customers and grow your presence.
        </p>
      </div>
      <BusinessForm onSubmit={handleSubmit} />
    </div>
  );
};
