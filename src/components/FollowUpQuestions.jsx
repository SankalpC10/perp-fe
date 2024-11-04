import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';

function FollowUpQuestions({ questions }) {
  if (!questions) return null;

  const questionList = Array.isArray(questions) 
    ? questions 
    : questions.split('\n').filter(q => q.trim());

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-white-900 mb-4 flex items-center">
        <FiHelpCircle className="mr-2" />
        Follow-up Questions
      </h2>
      <div className="space-y-3">
        {questionList.map((question, index) => (
          <button
            key={index}
            className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FollowUpQuestions; 