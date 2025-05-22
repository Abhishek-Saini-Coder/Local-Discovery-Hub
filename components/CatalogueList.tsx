import React from 'react';
import { CatalogueItem } from '../types';
import { CatalogueItemCard } from './CatalogueItemCard';

interface CatalogueListProps {
  items: CatalogueItem[];
}

export const CatalogueList: React.FC<CatalogueListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-600">No catalogue items available for this business yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <CatalogueItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};