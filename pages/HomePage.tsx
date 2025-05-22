
import React from 'react';
import { BusinessList } from '../components/BusinessList';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { Business, BusinessCategory } from '../types';
import { Link } from 'react-router-dom';

interface HomePageProps {
  businesses: Business[];
  trendingBusinesses: Business[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: BusinessCategory | 'All';
  setSelectedCategory: (category: BusinessCategory | 'All') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  businesses, 
  trendingBusinesses,
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-brand-primary to-sky-700 rounded-xl shadow-2xl text-white"> {/* Updated gradient */}
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-md">Explore Your Local Scene</h2>
          <p className="text-xl text-slate-100 max-w-3xl mx-auto mb-8 drop-shadow-sm"> {/* Updated text color for better contrast with new gradient */}
            Discover hidden gems, support local businesses, and connect with your community.
            From cozy cafes to essential services, find everything your neighborhood has to offer.
          </p>
          <Link 
            to="/add-listing" 
            className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 text-lg"
          >
            List Your Business
          </Link>
        </div>
      </section>

      {trendingBusinesses.length > 0 && (
        <section className="py-8">
          <h3 className="text-3xl font-semibold text-text-header mb-8 text-center">Trending Now 🔥</h3> {/* Updated text color */}
          <BusinessList businesses={trendingBusinesses} />
           <hr className="my-12 border-border-color"/> {/* Updated border color */}
        </section>
      )}

      {/* Sticky search/filter bar - using slate-100 for subtle background */}
      <div className="sticky top-20 bg-slate-100 bg-opacity-95 backdrop-blur-md py-6 z-40 shadow-lg rounded-xl -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="container mx-auto space-y-4 md:flex md:items-center md:space-y-0 md:space-x-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
      </div>
      
      {businesses.length > 0 ? (
        <BusinessList businesses={businesses} />
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-text-muted mb-4">No businesses found matching your criteria.</p> {/* Updated text color */}
          <p className="text-slate-400">Try adjusting your search terms or category filters.</p> {/* Updated text color */}
        </div>
      )}
    </div>
  );
};
