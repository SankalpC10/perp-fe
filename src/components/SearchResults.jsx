import React, { useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';

function SearchResults({ answer, contexts, questions, onSearch, isLatest }) {
  const [showAllSources, setShowAllSources] = useState(false);

  // Take first 3 sources for preview cards
  const previewSources = contexts.slice(0, 3);
  const remainingSources = contexts.slice(3);

  const handleCitationClick = (citationNumber) => {
    const source = contexts.find((source, index) => index + 1 === citationNumber);
    if (source?.url) {
      window.open(source.url, '_blank');
    }
  };

  const renderAnswerWithCitations = (text) => {
    // Split by citation pattern including the brackets
    const parts = text.split(/(\[citation:\d+\])/);
    
    return parts.map((part, index) => {
      // Match citation number including brackets
      const citationMatch = part.match(/\[citation:(\d+)\]/);
      if (citationMatch) {
        const citationNumber = parseInt(citationMatch[1]);
        return (
          <button
            key={index}
            onClick={() => handleCitationClick(citationNumber)}
            className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium 
              bg-blue-50 text-blue-600 hover:bg-blue-100 
              dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 
              transition-colors mx-1"
          >
            {citationNumber}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Helper function to render questions
  const renderQuestions = () => {
    if (!questions) return null;
    
    const questionList = typeof questions === 'string' 
      ? questions.split('\n').filter(q => q.trim())
      : questions;

    return questionList.map((question, index) => (
      <button
        key={index}
        onClick={() => onSearch(question)}
        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
      >
        {question}
      </button>
    ));
  };

  // Function to extract image URL from snippet or metadata
  const getImagePreview = (source) => {
    // Try to find an image URL in the snippet using regex
    const imageMatch = source.snippet.match(/(https?:\/\/[^/]+\/[^/\s]+\.(jpg|jpeg|png|gif))/i);
    if (imageMatch) return imageMatch[0];

    // If no image found, generate a preview using a service like OpenGraph.io or similar
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(source.url)}&size=128`;
  };

  // Function to get favicon
  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sources Preview Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {previewSources.map((source, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img
                src={getImagePreview(source)}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x225?text=No+Preview';
                }}
              />
            </div>
            <div className="p-4">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
              >
                {source.name}
              </a>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <img
                  src={getFavicon(source.url)}
                  alt=""
                  className="w-4 h-4 mr-2"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <span className="truncate">{new URL(source.url).hostname}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Sources Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hidden lg:block">
          <div className="p-4 space-y-4">
            {remainingSources.slice(0, 2).map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-900 hover:text-blue-600 truncate"
              >
                {source.name}
              </a>
            ))}
            <button
              onClick={() => setShowAllSources(true)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all sources
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {renderAnswerWithCitations(answer)}
          </p>
        </div>
      </div>

      {/* Related Questions */}
      {questions && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Questions</h2>
          <div className="space-y-3">
            {renderQuestions()}
          </div>
        </div>
      )}

      {/* All Sources Sidebar */}
      {showAllSources && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">All Sources</h2>
                <button
                  onClick={() => setShowAllSources(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {contexts.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg hover:bg-gray-50"
                  >
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {source.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {source.snippet}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;