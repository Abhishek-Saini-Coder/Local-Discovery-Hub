import React from 'react';
import { CommunityPost } from '../types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: CommunityPost[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-600 text-center py-8">No posts in the community yet. Start the conversation!</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};