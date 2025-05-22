import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Business, Review, User, UserRole, CatalogueItem } from '../types';
import { LocationMarkerIcon } from '../components/icons/LocationMarkerIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { TagIcon } from '../components/icons/TagIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import { CatalogueList } from '../components/CatalogueList';
import { Button } from '../components/common/Button';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';

interface BusinessDetailPageProps {
  businesses: Business[];
  currentUser: User | null;
  addReview: (businessId: string, review: Review) => void;
}

export const BusinessDetailPage: React.FC<BusinessDetailPageProps> = ({ businesses, currentUser, addReview }) => {
  const { id } = useParams<{ id: string }>();
  const business = businesses.find(b => b.id === id);

  if (!business) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">Business not found.</h2>
        <Link to="/" className="text-primary hover:text-accent mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const defaultImageUrl = `https://picsum.photos/seed/${business.id}/1200/600`;
  const imageUrl = business.imageUrl || defaultImageUrl;

  const handleAddReview = (rating: number, comment: string) => {
    if (currentUser && currentUser.role === UserRole.GENERAL_USER && business) {
      const newReview: Review = {
        id: Date.now().toString(),
        businessId: business.id,
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        rating,
        comment,
        date: new Date().toISOString(),
      };
      addReview(business.id, newReview);
    }
  };
  
  const averageRating = business.reviews.length > 0 
    ? business.reviews.reduce((sum, rev) => sum + rev.rating, 0) / business.reviews.length
    : 0;

  const renderStars = (rating: number, starSize = "h-6 w-6") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // Consider .5 or more as a full star for display simplicity
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className={`${starSize} text-amber-400 fill-amber-400`} />);
    }
    if (halfStar && fullStars < 5) {
       stars.push(<StarIcon key="half" className={`${starSize} text-amber-400 fill-amber-400`} />); // Simple half, could use half icon
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className={`${starSize} text-gray-300`} />);
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl animate-fade-in">
      <Link to="/" className="inline-flex items-center text-primary hover:text-accent mb-6 group">
        <ChevronLeftIcon className="h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform"/>
        Back to Listings
      </Link>

      <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
        <img src={imageUrl} alt={business.name} className="w-full h-64 sm:h-80 md:h-96 object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = defaultImageUrl;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <span className="inline-flex items-center bg-primary bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                <TagIcon className="h-4 w-4 mr-2" />
                {business.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{business.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {business.name}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{business.description}</p>
          </section>

          {/* Catalogue Section */}
          {business.catalogueItems && business.catalogueItems.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Catalogue</h2>
              <CatalogueList items={business.catalogueItems} />
            </section>
          )}
        </div>

        {/* Contact & Location Sidebar */}
        <aside className="space-y-6 lg:mt-0">
          <div className="bg-sky-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact & Location</h3>
            <div className="space-y-3 text-gray-700">
              {business.location && (
                <div className="flex items-start">
                  <LocationMarkerIcon className="h-6 w-6 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>{business.location}</span>
                </div>
              )}
              {business.contactEmail && (
                <div className="flex items-center">
                  <MailIcon className="h-6 w-6 mr-3 text-primary flex-shrink-0" />
                  <a href={`mailto:${business.contactEmail}`} className="hover:text-accent transition-colors break-all">{business.contactEmail}</a>
                </div>
              )}
              {business.contactPhone && (
                <div className="flex items-center">
                  <PhoneIcon className="h-6 w-6 mr-3 text-primary flex-shrink-0" />
                  <span>{business.contactPhone}</span>
                </div>
              )}
            </div>
          </div>
           {/* Average Rating Display */}
           {business.reviews.length > 0 && (
            <div className="bg-sky-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Overall Rating</h3>
              <div className="flex items-center">
                {renderStars(averageRating)}
                <span className="ml-3 text-xl font-bold text-gray-700">{averageRating.toFixed(1)}</span>
                <span className="ml-1 text-sm text-gray-500">({business.reviews.length} reviews)</span>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Reviews Section */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>
        {currentUser && currentUser.role === UserRole.GENERAL_USER && (
            <div className="mb-8 p-6 bg-sky-50 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Leave a Review</h3>
                <ReviewForm onSubmit={handleAddReview} />
            </div>
        )}
        {(!currentUser || currentUser.role !== UserRole.GENERAL_USER) && !business.reviews.length && (
             <p className="text-gray-600">Login as a customer to leave the first review!</p>
        )}
        <ReviewList reviews={business.reviews} />
      </section>
    </div>
  );
};