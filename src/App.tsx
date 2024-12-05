import React from 'react';
import { CrawlerInput } from './components/CrawlerInput';
import { CrawlResults } from './components/CrawlResults';
import { useCrawler } from './hooks/useCrawler';

function App() {
  const { jobs, startCrawl, deleteJob } = useCrawler();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Domain Expiry Crawler</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-center">
            <CrawlerInput
              onSubmit={startCrawl}
              isLoading={jobs.some(job => job.status === 'running')}
            />
          </div>

          <div className="space-y-6">
            {jobs.map(job => (
              <CrawlResults
                key={job.id}
                job={job}
                onDelete={deleteJob}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;