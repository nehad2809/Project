import React from 'react';
import { ArrowUpDown, Calendar, TrendingUp, Star, Filter } from 'lucide-react';
import { SortOption } from '../App';

interface SortingControlsProps {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  searchQuery: string;
  resultCount: number;
}

export function SortingControls({ sortBy, onSortChange, searchQuery, resultCount }: SortingControlsProps) {
  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: 'publishedAt',
      label: 'Latest',
      icon: <Calendar className="w-4 h-4" />,
      description: 'Most recent articles first'
    },
    {
      value: 'relevancy',
      label: 'Relevance',
      icon: <Star className="w-4 h-4" />,
      description: 'Best match for your search'
    },
    {
      value: 'popularity',
      label: 'Popular',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Most shared and discussed'
    }
  ];

  return (
    <div className="sticky top-[73px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="nyt-subheading text-lg text-gray-900 dark:text-white">
                  Search Results
                </h3>
              </div>
              <p className="nyt-body text-gray-600 dark:text-gray-400 text-sm">
                Found <span className="font-semibold text-black dark:text-white">{resultCount}</span> articles for 
                <span className="font-semibold"> "{searchQuery}"</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <ArrowUpDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="nyt-label text-gray-600 dark:text-gray-400">
                Sort by:
              </span>
              <div className="flex space-x-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`nyt-category ${
                      sortBy === option.value ? 'active' : 'inactive'
                    } flex items-center space-x-2`}
                    title={option.description}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}