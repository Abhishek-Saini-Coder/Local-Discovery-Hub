import React, { useState, useCallback } from 'react';
import { User, PostFormData } from '../types';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { UserCircleIcon } from './icons/UserCircleIcon'; // For user avatar display

interface PostFormProps {
  onSubmit: (formData: PostFormData) => void;
  currentUser: User;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit, currentUser }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') {
      setError('Post content cannot be empty.');
      return;
    }
    setError('');
    onSubmit({ content });
    setContent(''); // Reset form
  }, [content, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-3">
        <UserCircleIcon className="h-10 w-10 text-gray-400 rounded-full flex-shrink-0 mt-1" />
        <div className="flex-1">
           <p className="text-sm font-medium text-gray-700 mb-1">Posting as: {currentUser.name} ({currentUser.role})</p>
          <Textarea
            label="What's on your mind?"
            name="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
            placeholder={`Share something with the community, ${currentUser.name}...`}
            className="text-base"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-600 ml-13">{error}</p>} {/* Aligned with textarea */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={!content.trim()}>
          Post
        </Button>
      </div>
    </form>
  );
};