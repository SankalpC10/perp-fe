import { useThreads } from '../context/ThreadContext';
import { formatDistanceToNow } from 'date-fns'; // You'll need to install date-fns

export function ThreadList() {
  const { threads, switchThread, activeThread } = useThreads();

  if (threads.length === 0) {
    return null;
  }

  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-dark-200 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Threads
        </h2>
        <div className="space-y-2">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => switchThread(thread.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                thread.isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="text-sm font-medium truncate">{thread.query}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDistanceToNow(thread.timestamp, { addSuffix: true })}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 