import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
    
    // Optional: Listen for changes in system dark mode preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  }, [])

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://s3rppyxoknlyirwlqflmjepnfi0hhmbr.lambda-url.ap-south-1.on.aws/search?query=${encodeURIComponent(query)}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      setSearchHistory(prev => [...prev, { query, ...data }]);
    } catch (error) {
      console.error('Search error:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-base text-gray-900 dark:text-gray-100 flex flex-col">
      <nav className="bg-gray border-b border-gray-200 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-white-900">Perp AI Search</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 py-4 md:py-8">
        <SearchBar onSearch={handleSearch} />
        
        <div className="space-y-8 mt-8">
          {searchHistory.map((result, index) => (
            <div
              key={index}
              className="transition-all duration-500 ease-in-out"
              style={{
                animation: index === searchHistory.length - 1 ? 'slideIn 0.5s ease-out' : undefined
              }}
            >
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-600">{result.query}</h2>
              </div>
              <SearchResults 
                answer={result.answer} 
                contexts={result.contexts}
                questions={result.more_questions}
                onSearch={handleSearch}
                isLatest={index === searchHistory.length - 1}
              />
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1">
            Site made by{' '}
            <a 
              href="https://www.linkedin.com/in/sankalp-chavhan-ba9895194" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Sankalp Chavhan
              <svg 
                className="w-4 h-4 fill-current" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;