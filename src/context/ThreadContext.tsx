import React, { createContext, useContext, useState } from 'react';
import { Thread } from '../types/Thread';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install uuid package

interface ThreadContextType {
  threads: Thread[];
  activeThread: Thread | null;
  createThread: (query: string) => void;
  switchThread: (threadId: string) => void;
  clearThreads: () => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);

  const createThread = (query: string) => {
    const newThread: Thread = {
      id: uuidv4(),
      query,
      timestamp: Date.now(),
      isActive: true,
    };
    
    setThreads(prevThreads => 
      prevThreads.map(t => ({ ...t, isActive: false })).concat(newThread)
    );
    setActiveThread(newThread);
  };

  const switchThread = (threadId: string) => {
    setThreads(prevThreads =>
      prevThreads.map(thread => ({
        ...thread,
        isActive: thread.id === threadId,
      }))
    );
    setActiveThread(threads.find(t => t.id === threadId) || null);
  };

  const clearThreads = () => {
    setThreads([]);
    setActiveThread(null);
  };

  return (
    <ThreadContext.Provider value={{ 
      threads, 
      activeThread, 
      createThread, 
      switchThread, 
      clearThreads 
    }}>
      {children}
    </ThreadContext.Provider>
  );
}

export const useThreads = () => {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThreads must be used within a ThreadProvider');
  }
  return context;
}; 