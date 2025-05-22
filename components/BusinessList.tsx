import React from 'react';
import { BusinessCard } from './BusinessCard';
import { Business } from '../types';

interface BusinessListProps {
  businesses: Business[];
}

export const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  if (businesses.length === 0) {
    // This specific message might be better handled by the parent component (HomePage)
    // but keeping a local fallback.
    return <p className="text-center text-gray-500 py-12 text-lg">No businesses to display in this section.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {businesses.map(business => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};