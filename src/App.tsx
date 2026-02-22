import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { SimpleHeader } from './components/SimpleHeader';
import { NavigationBar } from './components/NavigationBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { InfiniteScrollTrigger } from './components/InfiniteScrollTrigger';
import { LoadMoreButton } from './components/LoadMoreButton';
import { SortingControls } from './components/SortingControls';
import { useDarkMode } from './hooks/useDarkMode';
import { useBookmarks } from './hooks/useBookmarks';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { newsApi } from './services/newsApi';
import { Article } from './types/news';

export type SortOption = 'publishedAt' | 'relevancy' | 'popularity';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'news' | 'bookmarks'>('news');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [loadMethod, setLoadMethod] = useState<'infinite' | 'button'>('button');
  const [sortBy, setSortBy] = useState<SortOption>('publishedAt');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = async (category: string = 'general', page: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
        setArticles([]);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const response = await newsApi.getTopHeadlines('us', category, page);
      
      if (append) {
        setArticles(prev => [...prev, ...response.articles]);
      } else {
        setArticles(response.articles);
      }
      
      setHasMoreArticles(response.articles.length === 10);
      setIsSearching(false);
    } catch (err) {
      setError('Failed to fetch news. Please check your internet connection and try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const searchNews = async (page: number = 1, append: boolean = false, sortOption: SortOption = sortBy) => {
    if (!searchQuery.trim()) return;
    
    try {
      if (!append) {
        setLoading(true);
        setArticles([]);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const response = await newsApi.searchNews(searchQuery, page, sortOption);
      
      if (append) {
        setArticles(prev => [...prev, ...response.articles]);
      } else {
        setArticles(response.articles);
      }
      
      setHasMoreArticles(response.articles.length === 10);
      setIsSearching(true);
      setCurrentView('news');
    } catch (err) {
      setError('Failed to search news. Please check your internet connection and try again.');
      console.error('Error searching news:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreArticles = useCallback(() => {
    if (loadingMore || !hasMoreArticles || currentView === 'bookmarks') return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    if (isSearching && searchQuery) {
      searchNews(nextPage, true, sortBy);
    } else {
      fetchNews(selectedCategory, nextPage, true);
    }
  }, [loadingMore, hasMoreArticles, currentPage, isSearching, searchQuery, selectedCategory, currentView, sortBy]);

  const { observer, resetFetching } = useInfiniteScroll(loadMoreArticles);

  useEffect(() => {
    if (!loadingMore) {
      resetFetching();
    }
  }, [loadingMore, resetFetching]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setCurrentPage(1);
    setHasMoreArticles(true);
    setSortBy('publishedAt');
    fetchNews(category, 1, false);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setHasMoreArticles(true);
    searchNews(1, false, sortBy);
  };

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setHasMoreArticles(true);
    
    if (isSearching && searchQuery) {
      searchNews(1, false, newSortBy);
    }
  };

  const handleRetry = () => {
    setCurrentPage(1);
    setHasMoreArticles(true);
    if (isSearching && searchQuery) {
      searchNews(1, false, sortBy);
    } else {
      fetchNews(selectedCategory, 1, false);
    }
  };

  const handleViewChange = (view: 'news' | 'bookmarks') => {
    setCurrentView(view);
    if (view === 'news' && articles.length === 0) {
      setCurrentPage(1);
      setHasMoreArticles(true);
      if (isSearching && searchQuery) {
        searchNews(1, false, sortBy);
      } else {
        fetchNews(selectedCategory, 1, false);
      }
    }
  };

  const toggleLoadMethod = () => {
    setLoadMethod(prev => prev === 'infinite' ? 'button' : 'infinite');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const displayedArticles = currentView === 'news' ? articles : bookmarks;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SimpleHeader 
        currentView={currentView}
        setCurrentView={handleViewChange}
        bookmarkCount={bookmarks.length}
      />
      
      <NavigationBar
        isDark={isDark}
        toggleDarkMode={() => setIsDark(!isDark)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Sorting controls for search results - Sticky */}
      {currentView === 'news' && isSearching && (
        <SortingControls
          sortBy={sortBy}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          resultCount={displayedArticles.length}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : displayedArticles.length === 0 ? (
          <EmptyState
            type={currentView === 'bookmarks' ? 'bookmarks' : isSearching ? 'search' : 'news'}
            message={isSearching ? `No articles found for "${searchQuery}"` : undefined}
          />
        ) : (
          <>
            {/* Page header */}
            <div className="nyt-section">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="nyt-headline text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
                    {currentView === 'bookmarks' 
                      ? 'Saved Articles' 
                      : isSearching 
                        ? 'Search Results' 
                        : selectedCategory === 'general' 
                          ? 'Today\'s Headlines'
                          : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                    }
                  </h1>
                  <p className="nyt-body text-gray-600 dark:text-gray-400 text-sm">
                    {currentView === 'bookmarks' 
                      ? `${bookmarks.length} saved ${bookmarks.length === 1 ? 'article' : 'articles'}`
                      : isSearching 
                        ? `${displayedArticles.length} results for "${searchQuery}"`
                        : 'The latest news from around the world'
                    }
                  </p>
                </div>

                {currentView === 'news' && articles.length > 0 && (
                  <div className="hidden md:flex items-center space-x-3">
                    <span className="nyt-meta text-xs">
                      View:
                    </span>
                    <button
                      onClick={toggleLoadMethod}
                      className={`nyt-label px-3 py-1 text-xs transition-all duration-200 ${
                        loadMethod === 'infinite'
                          ? 'nyt-btn-primary'
                          : 'nyt-btn-secondary'
                      }`}
                    >
                      {loadMethod === 'infinite' ? 'Auto Load' : 'Manual'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured article for non-search views */}
            {displayedArticles.length > 0 && currentView === 'news' && !isSearching && (
              <div className="nyt-section">
                <ArticleCard
                  article={displayedArticles[0]}
                  isBookmarked={isBookmarked(displayedArticles[0].url)}
                  onToggleBookmark={() => toggleBookmark(displayedArticles[0])}
                  onArticleClick={() => handleArticleClick(displayedArticles[0])}
                  featured={true}
                />
              </div>
            )}

            {/* Articles grid */}
            <div className="nyt-grid">
              {displayedArticles.slice(currentView === 'news' && !isSearching ? 1 : 0).map((article, index) => (
                <ArticleCard
                  key={`${article.url}-${index}`}
                  article={article}
                  isBookmarked={isBookmarked(article.url)}
                  onToggleBookmark={() => toggleBookmark(article)}
                  onArticleClick={() => handleArticleClick(article)}
                  lazy={index > 5}
                />
              ))}
            </div>

            {/* Load more controls */}
            {currentView === 'news' && (
              <>
                {loadMethod === 'button' ? (
                  <LoadMoreButton
                    onLoadMore={loadMoreArticles}
                    isLoading={loadingMore}
                    hasMore={hasMoreArticles}
                  />
                ) : (
                  <>
                    {hasMoreArticles && !loading && (
                      <InfiniteScrollTrigger
                        ref={observer}
                        isLoading={loadingMore}
                      />
                    )}

                    {!hasMoreArticles && articles.length > 0 && (
                      <div className="text-center py-12">
                        <div className="nyt-card max-w-md mx-auto p-8">
                          <h3 className="nyt-subheading text-lg text-gray-900 dark:text-white mb-2">
                            End of Articles
                          </h3>
                          <p className="nyt-body text-gray-600 dark:text-gray-400">
                            You've reached the end of today's news
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Enhanced Footer with Larger Font Sizes */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-8">
            {/* Top Section - Grid with Larger Fonts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* News Sections - Including Navigation Categories */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 nyt-subheading">
                  News Categories
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { name: 'World News', id: 'general' },
                    { name: 'Business', id: 'business' },
                    { name: 'Technology', id: 'technology' },
                    { name: 'Arts & Culture', id: 'entertainment' },
                    { name: 'Health', id: 'health' },
                    { name: 'Science', id: 'science' },
                    { name: 'Sports', id: 'sports' }
                  ].map((section) => (
                    <li key={section.id}>
                      <button 
                        onClick={() => handleCategoryChange(section.id)}
                        className="nyt-body text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors hover:underline"
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 nyt-subheading">
                  Services
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {[
                    'Digital Subscription',
                    'Newsletter',
                    'Mobile App',
                    'Breaking Alerts',
                    'Archive Access',
                    'RSS Feeds',
                    'Developer API'
                  ].map((service) => (
                    <li key={service}>
                      <button className="nyt-body text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors hover:underline">
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 nyt-subheading">
                  About
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {[
                    'About NewsHub',
                    'Editorial Standards',
                    'Newsroom',
                    'Careers',
                    'Contact Us',
                    'Advertise',
                    'Press Releases'
                  ].map((item) => (
                    <li key={item}>
                      <button className="nyt-body text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors hover:underline">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal & Community */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 nyt-subheading">
                  Legal & Community
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {[
                    'Terms of Service',
                    'Privacy Policy',
                    'Cookie Policy',
                    'Community Guidelines',
                    'Reader Comments',
                    'Feedback',
                    'Help & Support'
                  ].map((item) => (
                    <li key={item}>
                      <button className="nyt-body text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors hover:underline">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Larger Fonts */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              {/* Copyright and Links */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white nyt-body">
                  © 2024 The NewsHub
                </span>
                <div className="flex items-center space-x-3">
                  {['Terms', 'Privacy', 'Contact'].map((link, index) => (
                    <React.Fragment key={link}>
                      <button className="nyt-body hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        {link}
                      </button>
                      {index < 2 && <span className="text-gray-300 dark:text-gray-600">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="italic font-medium text-gray-700 dark:text-gray-300 nyt-body">
                  "All the News That's Fit to Print"
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;