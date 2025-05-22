import React from 'react';
import { CommunityPost, UserRole } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon'; // For business owner distinct icon
import { UserIcon } from './icons/UserIcon'; // For general user distinct icon


interface PostCardProps {
  post: CommunityPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getRoleStyles = (role: UserRole) => {
    switch (role) {
      case UserRole.BUSINESS_OWNER:
        return {
          icon: <BuildingOfficeIcon className="h-10 w-10 text-primary rounded-full flex-shrink-0 mt-1" />,
          bgColor: 'bg-teal-50',
          borderColor: 'border-teal-500',
          textColor: 'text-teal-700',
          roleName: 'Business'
        };
      case UserRole.GENERAL_USER:
        return {
          icon: <UserIcon className="h-10 w-10 text-sky-600 rounded-full flex-shrink-0 mt-1" />,
          bgColor: 'bg-sky-50',
          borderColor: 'border-sky-500',
          textColor: 'text-sky-700',
          roleName: 'Community Member'
        };
      default:
        return {
          icon: <UserCircleIcon className="h-10 w-10 text-gray-400 rounded-full flex-shrink-0 mt-1" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-300',
          textColor: 'text-gray-700',
          roleName: 'User'
        };
    }
  };

  const roleStyle = getRoleStyles(post.userRole);

  return (
    <article className={`p-5 rounded-lg shadow-lg border-l-4 ${roleStyle.borderColor} ${roleStyle.bgColor} animate-fade-in`}>
      <div className="flex items-start space-x-4">
        {roleStyle.icon}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
            <div>
              <h4 className={`text-md font-semibold ${roleStyle.textColor}`}>{post.userName}</h4>
              <p className={`text-xs font-medium ${roleStyle.textColor} opacity-80`}>{roleStyle.roleName}</p>
            </div>
            <time dateTime={post.timestamp} className="text-xs text-gray-500 mt-1 sm:mt-0">
              {new Date(post.timestamp).toLocaleString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </time>
          </div>
          <p className="text-gray-800 leading-relaxed mt-2 whitespace-pre-line">{post.content}</p>
          {/* Future: Add reply button/count here */}
        </div>
      </div>
    </article>
  );
};