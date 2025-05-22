import React from 'react';
import { Review } from '../types';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-600 py-4">No reviews yet. Be the first to share your experience!</p>;
  }

  const sortedReviews = [...reviews].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {sortedReviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};