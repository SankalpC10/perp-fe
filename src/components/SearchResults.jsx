import React, { useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';

function SearchResults({ answer, contexts, questions, onSearch }) {
  const [showAllSources, setShowAllSources] = useState(false);

  // Take first 3 sources for preview cards
  const previewSources = contexts.slice(0, 3);
  const remainingSources = contexts.slice(3);

  const handleCitationClick = (citationNumber) => {
    const index = citationNumber - 1;
    if (contexts[index]?.url) {
      window.open(contexts[index].url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderAnswerWithCitations = (text) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const citationMatch = part.match(/\[(\d+)\]/);
      if (citationMatch) {
        const citationNumber = parseInt(citationMatch[1]);
        return (
          <button
            key={index}
            onClick={() => handleCitationClick(citationNumber)}
            className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 mx-1"
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

  return (
    <div className="space-y-6">
      {/* Sources Preview Row */}
      <div className="grid grid-cols-4 gap-4">
        {previewSources.map((source, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-100">
              {/* Image preview placeholder */}
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
                <span className="truncate">{new URL(source.url).hostname}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Sources Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
          <div className="absolute inset-y-0 right-0 w-96 bg-white shadow-xl">
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