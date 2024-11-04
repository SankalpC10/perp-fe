import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

function SearchResults({ answer, contexts }) {
  const [activeSource, setActiveSource] = useState(null);

  // Function to handle citation click
  const handleCitationClick = (citationNumber) => {
    const index = citationNumber - 1;
    setActiveSource(index);
    // Open the URL in a new tab
    if (contexts[index]?.url) {
      window.open(contexts[index].url, '_blank', 'noopener,noreferrer');
    }
  };

  // Function to parse and format answer with citation buttons
  const renderAnswerWithCitations = (text) => {
    // Split by numbers that are citations
    const parts = text.split(/(\[\d+\])/g);
    
    return parts.map((part, index) => {
      // Updated regex to match numbers without brackets
      const citationMatch = part.match(/\[(\d+)\]/);
      
      if (citationMatch) {
        const citationNumber = parseInt(citationMatch[1]);
        return (
          <button
            key={index}
            onClick={() => handleCitationClick(citationNumber)}
            className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 mx-1 cursor-pointer transition-colors duration-200"
            title={contexts[citationNumber - 1]?.name || 'View source'}
          >
            {citationNumber}
          </button>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      {/* Answer Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Answer</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {renderAnswerWithCitations(answer)}
          </p>
        </div>
      </div>

      {/* Sources Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sources</h2>
        <div className="divide-y divide-gray-100">
          {contexts.map((context, index) => (
            <div 
              key={index} 
              className={`py-4 first:pt-0 last:pb-0 transition-colors duration-200 ${
                activeSource === index ? 'bg-blue-50 -mx-6 px-6' : ''
              }`}
            >
              <a
                href={context.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onClick={() => setActiveSource(index)}
              >
                <h3 className="text-blue-600 group-hover:text-blue-800 font-medium mb-1 flex items-center">
                  {context.name}
                  <FiExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-600">{context.snippet}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults; 