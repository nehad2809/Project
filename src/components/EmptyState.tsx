import React from 'react';
import { Bookmark, Search, Newspaper, FileX } from 'lucide-react';

interface EmptyStateProps {
  type: 'bookmarks' | 'search' | 'news';
  message?: string;
}

export function EmptyState({ type, message }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'bookmarks':
        return <Bookmark className="w-16 h-16 text-gray-400" />;
      case 'search':
        return <Search className="w-16 h-16 text-gray-400" />;
      default:
        return <FileX className="w-16 h-16 text-gray-400" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'bookmarks':
        return 'No Saved Articles';
      case 'search':
        return 'No Results Found';
      default:
        return 'No News Available';
    }
  };

  const getDescription = () => {
    if (message) return message;
    
    switch (type) {
      case 'bookmarks':
        return 'Start building your reading list by bookmarking articles that interest you. Click the bookmark icon on any article to save it for later.';
      case 'search':
        return 'Try adjusting your search terms or browse our categories for the latest news stories.';
      default:
        return 'Unable to load news at the moment. Please check your connection and try refreshing the page.';
    }
  };

  const getActionButton = () => {
    switch (type) {
      case 'bookmarks':
        return (
          <button className="nyt-btn-primary">
            Browse Latest News
          </button>
        );
      case 'search':
        return (
          <button className="nyt-btn-secondary">
            Clear Search
          </button>
        );
      default:
        return (
          <button className="nyt-btn-primary">
            Retry Loading
          </button>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="text-center max-w-md">
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 w-fit mx-auto">
          {getIcon()}
        </div>
        
        <h3 className="nyt-subheading text-2xl text-gray-900 dark:text-white mb-4">
          {getTitle()}
        </h3>
        
        <p className="nyt-body text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {getDescription()}
        </p>
        
        {getActionButton()}
      </div>
    </div>
  );
}