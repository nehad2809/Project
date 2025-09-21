import React from 'react';
import { Calendar, Clock, Bookmark, Radio, Zap, Newspaper } from 'lucide-react';

interface SimpleHeaderProps {
  currentView: 'news' | 'bookmarks';
  setCurrentView: (view: 'news' | 'bookmarks') => void;
  bookmarkCount: number;
}

export function SimpleHeader({ currentView, setCurrentView, bookmarkCount }: SimpleHeaderProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  // Enhanced live news items with more variety and urgency
  const liveNewsItems = [
    "🌍 Global markets surge 3.2% amid economic optimism and policy reforms",
    "🌱 Climate summit reaches historic agreement on carbon emissions reduction",
    "⚡ Quantum computing breakthrough promises revolutionary healthcare solutions",
    "📈 International trade agreements boost global economy by $2.4 trillion",
    "🔬 Major scientific discovery in renewable energy storage technology",
    "🤝 World leaders gather for emergency economic summit in Geneva",
    "🧬 Gene therapy shows 95% success rate for rare diseases in clinical trials",
    "🌊 Ocean cleanup project removes 50,000 tons of plastic ahead of schedule",
    "📡 6G networks begin testing phase with speeds 100x faster than 5G",
    "🚀 Space exploration mission discovers potential signs of life on Mars",
    "💡 AI breakthrough enables real-time language translation for 200+ languages",
    "🏥 Revolutionary cancer treatment shows 90% remission rate in trials",
    "🌿 Vertical farming technology could feed 2 billion more people sustainably",
    "⚡ Solar energy efficiency reaches record 47% in laboratory conditions",
    "🔋 New battery technology enables electric vehicles with 1000-mile range"
  ];

  // Create the complete news string with enhanced separators
  const newsString = liveNewsItems.join(' • ') + ' • ';

  return (
    <header className="bg-white dark:bg-gray-900">
      {/* Enhanced Live News Ticker - Fixed animation */}
      <div className="relative py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-600 dark:from-red-700 dark:via-red-800 dark:to-red-700 overflow-hidden live-news-container">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center">
            {/* Enhanced LIVE indicator */}
            <div className="flex items-center space-x-3 mr-6 flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping"></div>
                <div className="relative bg-white/90 rounded-full p-1">
                  <Radio className="w-3 h-3 text-red-600 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
                  LIVE
                </span>
                <Zap className="w-3 h-3 text-yellow-300 animate-bounce" />
              </div>
            </div>

            {/* Enhanced scrolling news content - Fixed to prevent interference */}
            <div className="flex-1 overflow-hidden relative">
              <div className="live-news-scroll whitespace-nowrap">
                <span className="text-sm font-medium tracking-wide text-white inline-block">
                  {newsString}{newsString}{newsString}
                </span>
              </div>
            </div>

            {/* Breaking news indicator */}
            <div className="hidden md:flex items-center space-x-2 ml-6 flex-shrink-0">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                Breaking News
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Date/Time and Navigation Row */}
          <div className="py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              {/* Left: Enhanced Date and Time */}
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{formatDate()}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-mono font-medium text-gray-900 dark:text-white">{formatTime()}</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-600 dark:text-green-400">Live Updates</span>
                </div>
              </div>

              {/* Right: Enhanced Navigation Buttons */}
              <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('news')}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md ${
                    currentView === 'news'
                      ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-md transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Latest News
                </button>
                <button
                  onClick={() => setCurrentView('bookmarks')}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md flex items-center space-x-2 ${
                    currentView === 'bookmarks'
                      ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-md transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Saved</span>
                  {bookmarkCount > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-bold shadow-lg animate-pulse">
                      {bookmarkCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Masthead with Icon */}
          <div className="py-8 text-center">
            <div className="relative">
              <div className="flex items-center justify-center space-x-4 mb-3">
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-full shadow-lg">
                  <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h1 className="nyt-masthead text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white tracking-tight relative">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                    The NewsHub
                  </span>
                </h1>
              </div>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="italic font-medium">"All the News That's Fit to Print"</span>
                
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="font-medium">Global Digital Edition</span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}