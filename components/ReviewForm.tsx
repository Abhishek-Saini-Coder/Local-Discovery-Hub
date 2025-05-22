import React, { useState, useCallback } from 'react';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { StarIcon } from './icons/StarIcon';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (comment.trim() === '') {
      setError('Please enter a comment for your review.');
      return;
    }
    setError('');
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  }, [rating, comment, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating <span className="text-red-500">*</span></label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <StarIcon
                className={`h-7 w-7 transition-colors cursor-pointer 
                  ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Your Review"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        required
        placeholder="Share your experience..."
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Submit Review
      </Button>
    </form>
  );
};