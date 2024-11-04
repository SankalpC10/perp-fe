export interface Thread {
  id: string;
  query: string;
  answer?: string;
  citations?: any[];
  timestamp: number;
  isActive: boolean;
} 