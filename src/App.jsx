import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`, {
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Perplexity Clone</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 py-8">
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
    </div>
  );
}

export default App;