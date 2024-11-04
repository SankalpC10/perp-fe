import { useThreads } from '../context/ThreadContext';

export function SearchResults() {
  const { activeThread } = useThreads();

  if (!activeThread) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Start a new conversation by typing a question
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-dark-200 rounded-lg p-4 shadow">
        <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
          {activeThread.query}
        </div>
        {activeThread.answer && (
          <div className="text-gray-700 dark:text-gray-300">
            {renderAnswerWithCitations(activeThread.answer)}
          </div>
        )}
      </div>
    </div>
  );
} 