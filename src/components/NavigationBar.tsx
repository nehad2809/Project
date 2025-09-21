import React from 'react';
import { Moon, Sun, Search, Menu, X, Newspaper } from 'lucide-react';

interface NavigationBarProps {
  isDark: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', name: 'World News' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'entertainment', name: 'Arts & Culture' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
];

export function NavigationBar({
  isDark,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  onSearch,
  selectedCategory,
  onCategoryChange,
}: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
    setIsMenuOpen(false);
  };

  const handleNewsHubClick = () => {
    // Reset to general category (home page)
    onCategoryChange('general');
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary Navigation Row */}
        <div className="flex items-center justify-between py-3">
          {/* Left: Logo/Brand with Icon - Now clickable */}
          <div className="flex items-center">
            <button
              onClick={handleNewsHubClick}
              className="flex items-center space-x-2 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 group"
            >
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-1.5 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="nyt-masthead text-xl text-gray-900 dark:text-white">
                The NewsHub
              </span>
            </button>
          </div>

          {/* Center: Categories - Desktop only */}
          <div className="hidden lg:flex items-center space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`text-sm py-2 px-3 border-b-2 transition-all duration-200 font-medium ${
                  selectedCategory === category.id
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Right: Search and Controls */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 pl-10 pr-3 py-2 w-40 text-sm focus:border-black dark:focus:border-white focus:ring-0 transition-all duration-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="ml-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 rounded"
              >
                Go
              </button>
            </form>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mt-4 mb-4">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 pl-10 pr-3 py-2.5 w-full text-sm focus:border-black dark:focus:border-white focus:ring-0 transition-all duration-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-3 bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 text-sm transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 rounded"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 px-3 transition-colors text-sm font-medium rounded ${
                      selectedCategory === category.id
                        ? 'bg-white dark:bg-gray-900 text-red-600 font-bold shadow-sm'
                        : 'hover:bg-white dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600 hover:shadow-sm'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}