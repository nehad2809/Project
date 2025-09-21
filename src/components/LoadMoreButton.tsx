import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({ onLoadMore, isLoading, hasMore }: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-12">
        <div className="nyt-divider"></div>
        <p className="nyt-body text-gray-500 dark:text-gray-400 mt-4">
          End of today's edition
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12">
      <div className="text-center">
        <div className="nyt-divider mb-6"></div>
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="nyt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading More Stories...</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              <span>Load More Articles</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}