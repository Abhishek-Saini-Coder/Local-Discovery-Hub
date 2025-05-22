import React from 'react';
import { CatalogueItem } from '../types';
import { TagIcon } from './icons/TagIcon'; // Using TagIcon for price or general category

interface CatalogueItemCardProps {
  item: CatalogueItem;
}

export const CatalogueItemCard: React.FC<CatalogueItemCardProps> = ({ item }) => {
  const defaultImageUrl = `https://picsum.photos/seed/${item.id}/400/300`;
  const imageUrl = item.imageUrl || defaultImageUrl;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <img 
        className="w-full h-48 object-cover" 
        src={imageUrl} 
        alt={item.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = defaultImageUrl;
         }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-3">{item.description}</p>
        {item.price && (
          <div className="mt-auto pt-2 border-t border-gray-100">
            <p className="text-md font-bold text-primary flex items-center">
              <TagIcon className="h-4 w-4 mr-2 text-gray-500"/> 
              {item.price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};