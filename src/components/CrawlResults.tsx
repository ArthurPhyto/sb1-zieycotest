import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { CrawlJob, DomainStatus } from '../types/crawler';
import { StatusBadge } from './StatusBadge';

interface Props {
  job: CrawlJob;
  onDelete: (id: string) => void;
}

export const CrawlResults: React.FC<Props> = ({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.url}</h3>
          <p className="text-sm text-gray-500">
            Started {new Date(job.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(job.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Crawled URLs</h4>
          <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto">
            {Array.from(job.crawledUrls).map((url) => (
              <div key={url} className="text-sm text-gray-600 py-1 flex items-center gap-2">
                <ExternalLink size={14} />
                {url}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">External Domains</h4>
          <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto">
            {Array.from(job.externalDomains.values()).map((domain) => (
              <div key={domain.url} className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-600">{domain.url}</span>
                <StatusBadge status={domain.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Expired Domains</h4>
          <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto">
            {job.expiredDomains.map((domain) => (
              <div key={domain.url} className="text-sm text-gray-600 py-1">
                {domain.url}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};