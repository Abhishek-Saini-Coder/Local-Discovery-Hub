import React from 'react';
import { Review, UserRole } from '../types';
import { StarIcon } from './icons/StarIcon';
import { UserCircleIcon } from './icons/UserCircleIcon'; // Placeholder for user avatar

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <article className="bg-white p-5 rounded-lg shadow-md border border-gray-200 animate-fade-in">
      <div className="flex items-start space-x-4">
        <UserCircleIcon className="h-10 w-10 text-gray-400 rounded-full flex-shrink-0 mt-1" /> {/* Replace with actual avatar if available */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
            <div>
              <h4 className="text-md font-semibold text-gray-800">{review.userName}</h4>
              <p className="text-xs text-gray-500">
                {review.userRole === UserRole.BUSINESS_OWNER ? 'Business Rep' : 'Customer'}
              </p>
            </div>
            <time dateTime={review.date} className="text-xs text-gray-500 mt-1 sm:mt-0">
              {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <div className="flex items-center my-2" aria-label={`Rated ${review.rating} out of 5 stars`}>
            {renderStars(review.rating)}
          </div>
          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{review.comment}</p>
        </div>
      </div>
    </article>
  );
};