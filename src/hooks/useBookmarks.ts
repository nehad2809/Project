import { useLocalStorage } from './useLocalStorage';
import { Article, BookmarkedArticle } from '../types/news';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkedArticle[]>('bookmarkedArticles', []);

  const addBookmark = (article: Article) => {
    const bookmarkedArticle: BookmarkedArticle = {
      ...article,
      bookmarkedAt: new Date().toISOString(),
    };
    setBookmarks(prev => [bookmarkedArticle, ...prev]);
  };

  const removeBookmark = (url: string) => {
    setBookmarks(prev => prev.filter(article => article.url !== url));
  };

  const isBookmarked = (url: string): boolean => {
    return bookmarks.some(article => article.url === url);
  };

  const toggleBookmark = (article: Article) => {
    if (isBookmarked(article.url)) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
}