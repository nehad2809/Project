import React, { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InfiniteScrollTriggerProps {
  isLoading: boolean;
}

export const InfiniteScrollTrigger = forwardRef<HTMLDivElement, InfiniteScrollTriggerProps>(
  ({ isLoading }, ref) => {
    return (
      <div ref={ref} className="flex justify-center py-8">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Loading more articles...
            </p>
          </div>
        ) : (
          <div className="h-4" /> // Invisible trigger area
        )}
      </div>
    );
  }
);

InfiniteScrollTrigger.displayName = 'InfiniteScrollTrigger';