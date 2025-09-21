import React from 'react';
import { X, ExternalLink, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Article } from '../types/news';

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const readingTime = Math.ceil(Math.random() * 5) + 2;

  // Generate full article content for demo
  const generateFullContent = () => {
    const paragraphs = [
      "In a significant development that has captured global attention, experts and stakeholders are closely monitoring the evolving situation. The implications of this breakthrough extend far beyond initial expectations and could influence future research and policy decisions across multiple sectors.",
      
      "According to leading researchers in the field, this advancement represents a culmination of years of dedicated work and international collaboration. The findings have been peer-reviewed and published in prestigious journals, lending credibility to the groundbreaking claims made by the research team.",
      
      "Industry analysts predict that this development will have far-reaching consequences across multiple sectors. Companies and organizations worldwide are already beginning to adapt their strategies to accommodate these new realities and opportunities that have emerged from this discovery.",
      
      "The research team, comprising experts from various disciplines, utilized cutting-edge methodologies and state-of-the-art equipment to achieve these remarkable results. Their interdisciplinary approach has been praised by the scientific community and serves as a model for future collaborative efforts.",
      
      "Early adopters and pilot programs have shown promising results, with initial data suggesting significant improvements in efficiency and effectiveness. These preliminary findings have generated considerable excitement among stakeholders and have attracted substantial investment interest.",
      
      "Looking ahead, researchers are planning expanded studies and real-world implementations to further validate these findings. The next phase of development is expected to begin within the coming months, with comprehensive results anticipated by the end of the year.",
      
      "This breakthrough also highlights the importance of continued investment in research and development. Funding agencies and private investors are taking note of the potential returns and societal benefits that such innovations can provide to communities worldwide.",
      
      "As the global community grapples with various challenges, developments like these offer hope and demonstrate the power of human ingenuity and collaboration. The full impact of this advancement will likely unfold over the coming years, reshaping our understanding of what's possible."
    ];
    
    return paragraphs.join('\n\n');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 nyt-modal"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 max-w-4xl w-full max-h-[90vh] overflow-hidden nyt-shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="nyt-label text-red-600 dark:text-red-400">
              {article.source.name}
            </span>
            <div className="flex items-center space-x-3 nyt-meta">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="nyt-modal-content">
          {/* Hero Image */}
          {article.urlToImage && (
            <div className="relative">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="nyt-headline text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Subtitle/Description */}
            {article.description && (
              <div className="mb-8">
                <p className="nyt-subheading text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {article.description}
                </p>
              </div>
            )}

            {/* Author and Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                {article.author && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="nyt-body text-gray-700 dark:text-gray-300 font-medium">
                      By {article.author}
                    </span>
                  </div>
                )}
              </div>
              <a
                href={article.url.startsWith('#') ? '#' : article.url}
                target={article.url.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="nyt-btn-secondary flex items-center space-x-2"
                onClick={(e) => {
                  if (article.url.startsWith('#')) {
                    e.preventDefault();
                    alert('This is a demo article. In a real application, this would link to the original source.');
                  }
                }}
              >
                <span>View Original</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Full Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="nyt-body text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
                {generateFullContent().split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-600">
              <h3 className="nyt-subheading text-lg text-gray-900 dark:text-white mb-2">
                About This Article
              </h3>
              <p className="nyt-body text-gray-700 dark:text-gray-300 text-sm">
                This is demonstration content created for the NewsHub application. 
                In a production environment, this would display the complete article content from the original news source.
              </p>
            </div>

            {/* Related Articles Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="nyt-subheading text-xl text-gray-900 dark:text-white mb-4">
                More in {article.source.name}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-20 h-16 bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <h4 className="nyt-body font-medium text-gray-900 dark:text-white text-sm mb-1">
                        Related Article Title {i}
                      </h4>
                      <p className="nyt-meta text-xs">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}