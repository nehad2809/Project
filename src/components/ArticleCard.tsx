import React from 'react';
import { Calendar, ExternalLink, Clock, User, Bookmark, BookmarkCheck } from 'lucide-react';
import { Article } from '../types/news';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onArticleClick: () => void;
  lazy?: boolean;
  featured?: boolean;
}

export function ArticleCard({ 
  article, 
  isBookmarked, 
  onToggleBookmark, 
  onArticleClick,
  lazy = false, 
  featured = false 
}: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const readingTime = Math.ceil(Math.random() * 5) + 2;

  if (featured) {
    return (
      <article className="nyt-card cursor-pointer fade-in-up mb-8 overflow-hidden">
        <div className="grid lg:grid-cols-5 gap-6 h-full">
          {/* Image takes up 2 columns */}
          <div className="lg:col-span-2 relative overflow-hidden">
            <img
              src={article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200'}
              alt={article.title}
              onError={handleImageError}
              className="w-full h-64 lg:h-80 object-cover object-center transition-transform duration-300 hover:scale-105"
              loading={lazy ? 'lazy' : 'eager'}
              onClick={onArticleClick}
            />
          </div>

          {/* Content takes up 3 columns */}
          <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between" onClick={onArticleClick}>
            <div className="flex-1">
              {/* Source and date on one line */}
              <div className="mb-4">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {article.source.name} • {formatDate(article.publishedAt)}
                </span>
              </div>

              {/* Title */}
              <h1 className="nyt-headline text-2xl lg:text-3xl text-gray-900 dark:text-white mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Description */}
              {article.description && (
                <p className="nyt-body text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                  {article.description}
                </p>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-4 nyt-meta">
                {article.author && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{truncateText(article.author, 20)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArticleClick();
                  }}
                  className="nyt-btn-primary"
                >
                  Read Article
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark();
                  }}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    isBookmarked
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="nyt-card cursor-pointer fade-in-up flex flex-col h-full overflow-hidden">
      <div className="relative flex-shrink-0 overflow-hidden">
        <img
          src={article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={article.title}
          onError={handleImageError}
          className="h-56 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading={lazy ? 'lazy' : 'eager'}
          onClick={onArticleClick}
        />
      </div>

      <div className="p-6 flex flex-col flex-1" onClick={onArticleClick}>
        {/* Source and date on one line */}
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {article.source.name} • {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h2 className="nyt-subheading text-xl text-gray-900 dark:text-white mb-3 line-clamp-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
          {article.title}
        </h2>

        {/* Description - Takes up remaining space */}
        {article.description && (
          <p className="nyt-body text-gray-600 dark:text-gray-400 mb-4 text-sm flex-1 leading-relaxed line-clamp-3">
            {article.description}
          </p>
        )}

        {/* Footer - Always at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex items-center space-x-3">
            {article.author && (
              <div className="flex items-center space-x-1 nyt-meta">
                <User className="w-3 h-3" />
                <span>{truncateText(article.author, 15)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1 nyt-meta">
              <Clock className="w-3 h-3" />
              <span>{readingTime}m</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArticleClick();
              }}
              className="nyt-label text-black dark:text-white hover:underline text-xs"
            >
              Read More
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark();
              }}
              className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 ${
                isBookmarked
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3 h-3" />
              ) : (
                <Bookmark className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}