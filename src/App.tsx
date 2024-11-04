import { ThreadProvider } from './context/ThreadContext';
import { ThreadList } from './components/ThreadList';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThreadProvider>
      <div className="min-h-screen bg-white dark:bg-dark-base">
        <div className="flex h-screen">
          <ThreadList />
          <div className="flex-1 flex flex-col">
            <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Chat</h1>
              <ThemeToggle />
            </header>
            <main className="flex-1 overflow-auto p-4">
              <SearchResults />
            </main>
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
              <SearchBar />
            </footer>
          </div>
        </div>
      </div>
    </ThreadProvider>
  );
}

export default App; 