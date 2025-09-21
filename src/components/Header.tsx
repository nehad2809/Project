import React from 'react';
import { Moon, Sun, Bookmark, Search, Menu, X, Calendar, Bell, Globe } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
  currentView: 'news' | 'bookmarks';
  setCurrentView: (view: 'news' | 'bookmarks') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  bookmarkCount: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', name: 'World' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'entertainment', name: 'Arts' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
];

export function Header({
  isDark,
  toggleDarkMode,
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  onSearch,
  bookmarkCount,
  selectedCategory,
  onCategoryChange,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
    setIsMenuOpen(false);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <>
      {/* Breaking News Banner - Smaller */}
      <div className="breaking-banner py-0.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="breaking-ticker">
            <span className="text-white text-[10px] font-medium">
              🔴 LIVE: Global markets surge • Climate summit reaches agreement • Tech breakthrough announced
            </span>
          </div>
        </div>
      </div>

      {/* Compact Header */}
      <header className="sticky top-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Single row with all elements */}
          <div className="flex items-center justify-between py-2">
            {/* Left: NewsHub Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="nyt-masthead text-lg md:text-xl text-gray-900 dark:text-white tracking-tight">
                  The NewsHub
                </h1>
              </div>
              
              {/* Date and utilities - Desktop only */}
              <div className="hidden md:flex items-center space-x-3 text-[10px] text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>{currentDate}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Bell className="w-2.5 h-2.5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">Breaking</span>
                </div>
              </div>
            </div>

            {/* Center: Categories - Desktop only */}
            <nav className="hidden lg:flex items-center space-x-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`text-[10px] py-1 px-2 border-b-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-black dark:border-white text-black dark:text-white font-bold'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/* Right: Navigation, Search, and Controls */}
            <div className="flex items-center space-x-3">
              {/* View Toggle - Desktop */}
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => setCurrentView('news')}
                  className={`text-[10px] py-1 px-2 transition-all duration-200 ${
                    currentView === 'news'
                      ? 'text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setCurrentView('bookmarks')}
                  className={`text-[10px] py-1 px-2 transition-all duration-200 flex items-center space-x-1 ${
                    currentView === 'bookmarks'
                      ? 'text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Bookmark className="w-2.5 h-2.5" />
                  <span>Saved</span>
                  {bookmarkCount > 0 && (
                    <span className="bg-red-600 text-white text-[8px] rounded-full px-1 py-0.5 min-w-[12px] text-center font-bold">
                      {bookmarkCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Search - Desktop */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-7 pr-2 py-1 w-32 text-[10px] focus:border-black dark:focus:border-white focus:ring-0 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-1 bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-[10px] transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Go
                </button>
              </form>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-3 border-t border-gray-200 dark:border-gray-700">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-2 mb-3">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-7 pr-2 py-1.5 w-full text-xs focus:border-black dark:focus:border-white focus:ring-0 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="ml-2 bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 text-xs transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-1 mb-3">
                <button
                  onClick={() => {
                    setCurrentView('news');
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-1.5 px-2 border-l-4 transition-all duration-200 text-xs ${
                    currentView === 'news'
                      ? 'border-black dark:border-white text-black dark:text-white bg-gray-50 dark:bg-gray-800 font-bold'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Latest News
                </button>
                <button
                  onClick={() => {
                    setCurrentView('bookmarks');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full py-1.5 px-2 border-l-4 transition-all duration-200 text-xs ${
                    currentView === 'bookmarks'
                      ? 'border-black dark:border-white text-black dark:text-white bg-gray-50 dark:bg-gray-800 font-bold'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Bookmark className="w-3 h-3" />
                    <span>Saved Articles</span>
                  </div>
                  {bookmarkCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] rounded-full px-1 py-0.5 min-w-[14px] text-center font-bold">
                      {bookmarkCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left py-1 px-2 transition-colors text-xs ${
                        selectedCategory === category.id
                          ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
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
      </header>
    </>
  );
}