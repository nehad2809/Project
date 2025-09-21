import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="nyt-card p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        
        <h3 className="nyt-subheading text-xl text-red-800 dark:text-red-400 mb-4">
          News Service Unavailable
        </h3>
        
        <p className="nyt-body text-red-700 dark:text-red-300 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="nyt-btn-primary bg-red-600 hover:bg-red-700 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
}