import React from 'react';
import { CommunityPost, User, PostFormData } from '../types';
import { PostForm } from '../components/PostForm';
import { PostList } from '../components/PostList';
import { ChatBubbleLeftRightIcon } from '../components/icons/ChatBubbleLeftRightIcon';


interface CommunityPageProps {
  posts: CommunityPost[];
  currentUser: User;
  addPost: (post: CommunityPost) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ posts, currentUser, addPost }) => {
  
  const handleAddPost = (formData: PostFormData) => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      content: formData.content,
      timestamp: new Date().toISOString(),
    };
    addPost(newPost);
  };

  // Sort posts by timestamp, newest first
  const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="text-center py-8 bg-white rounded-lg shadow-lg">
        <ChatBubbleLeftRightIcon className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-3">Community Hub</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, ask questions, and connect with local businesses and residents.
        </p>
      </header>

      <section className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create a New Post</h2>
        <PostForm onSubmit={handleAddPost} currentUser={currentUser} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Recent Activity</h2>
        {sortedPosts.length > 0 ? (
          <PostList posts={sortedPosts} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-500">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </section>
    </div>
  );
};