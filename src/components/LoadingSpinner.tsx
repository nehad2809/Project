import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="text-center">
        {/* Simple loading text */}
        <h3 className="nyt-subheading text-xl text-gray-900 dark:text-white mb-3">
          Loading News
        </h3>
        <p className="nyt-body text-gray-600 dark:text-gray-400 text-sm mb-6">
          Fetching the latest stories...
        </p>
        
        {/* Simple loading dots */}
        <div className="flex justify-center items-center space-x-1">
          <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}