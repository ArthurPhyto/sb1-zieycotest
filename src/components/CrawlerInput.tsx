import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const CrawlerInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL to crawl..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Plus size={20} />
        <span>Add URL</span>
      </button>
    </form>
  );
};