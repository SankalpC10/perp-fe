import { useState } from 'react';
import { useThreads } from '../context/ThreadContext';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { createThread } = useThreads();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      createThread(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* ... existing search bar JSX ... */}
    </form>
  );
} 