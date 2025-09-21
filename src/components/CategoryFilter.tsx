import React from 'react';
import { TrendingUp, Building2, Laptop, Palette, Heart, Atom, Trophy } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', name: 'World', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'business', name: 'Business', icon: <Building2 className="w-4 h-4" /> },
  { id: 'technology', name: 'Technology', icon: <Laptop className="w-4 h-4" /> },
  { id: 'entertainment', name: 'Arts', icon: <Palette className="w-4 h-4" /> },
  { id: 'health', name: 'Health', icon: <Heart className="w-4 h-4" /> },
  { id: 'science', name: 'Science', icon: <Atom className="w-4 h-4" /> },
  { id: 'sports', name: 'Sports', icon: <Trophy className="w-4 h-4" /> },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-[73px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`nyt-category ${
                  selectedCategory === category.id ? 'active' : 'inactive'
                } flex items-center space-x-2`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}