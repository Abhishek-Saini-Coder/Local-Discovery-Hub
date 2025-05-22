
import React from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { TagIcon } from './icons/TagIcon';
import { StarIcon } from './icons/StarIcon'; 

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const defaultImageUrl = `https://picsum.photos/seed/${business.id}/600/400`; 
  const imageUrl = business.imageUrl || defaultImageUrl;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Simplified: any decimal part means a "half" star shown as full
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="h-5 w-5 text-amber-400 fill-amber-400" />);
    }
    if (halfStar && fullStars < 5) { 
      stars.push(<StarIcon key="half" className="h-5 w-5 text-amber-400 fill-amber-400" />); 
    }
    const emptyStars = 5 - stars.length; // Calculate remaining stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-5 w-5 text-slate-300" />); // Use slate for empty
    }
    return stars;
  };


  return (
    <Link to={`/business/${business.id}`} className="group block">
      <div className="bg-card-bg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden transform group-hover:scale-105">
        <div className="relative">
          <img 
            className="w-full h-56 object-cover" 
            src={imageUrl} 
            alt={business.name} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = defaultImageUrl;
            }}
          />
          <div className="absolute top-3 right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1"> {/* brand-primary */}
            <TagIcon className="h-3 w-3" />
            <span>{business.category}</span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors">{business.name}</h3> {/* Darker slate for name */}
          
          {business.averageRating && business.averageRating > 0 && (
            <div className="flex items-center mb-3">
              {renderStars(business.averageRating)}
              <span className="ml-2 text-sm text-text-muted">({business.averageRating.toFixed(1)} stars)</span> {/* text-muted */}
            </div>
          )}

          <p className="text-text-body text-sm mb-4 flex-grow leading-relaxed line-clamp-3">{business.description}</p> {/* text-body */}
          
          <div className="mt-auto space-y-2 text-sm">
            {business.location && (
              <div className="flex items-center text-text-body"> {/* text-body */}
                <LocationMarkerIcon className="h-5 w-5 mr-2 text-brand-primary flex-shrink-0" /> {/* brand-primary for icon */}
                <span className="truncate">{business.location}</span>
              </div>
            )}
            {business.contactEmail && (
              <div className="flex items-center text-text-body"> {/* text-body */}
                <MailIcon className="h-5 w-5 mr-2 text-brand-primary flex-shrink-0" /> {/* brand-primary for icon */}
                <a href={`mailto:${business.contactEmail}`} className="hover:text-brand-accent transition-colors truncate block" onClick={(e) => e.stopPropagation()}>{business.contactEmail}</a>
              </div>
            )}
            {business.contactPhone && (
              <div className="flex items-center text-text-body"> {/* text-body */}
                <PhoneIcon className="h-5 w-5 mr-2 text-brand-primary flex-shrink-0" /> {/* brand-primary for icon */}
                <span className="truncate">{business.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
