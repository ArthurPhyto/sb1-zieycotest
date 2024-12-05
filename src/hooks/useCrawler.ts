import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CrawlJob, DomainStatus } from '../types/crawler';
import { checkDomain, extractDomains } from '../utils/crawler';

export const useCrawler = () => {
  const [jobs, setJobs] = useState<CrawlJob[]>([]);

  const startCrawl = useCallback(async (url: string) => {
    const jobId = uuidv4();
    const newJob: CrawlJob = {
      id: jobId,
      url,
      status: 'running',
      crawledUrls: new Set([url]),
      externalDomains: new Map(),
      expiredDomains: [],
      timestamp: Date.now(),
    };

    setJobs(prev => [...prev, newJob]);

    try {
      const queue = [url];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const currentUrl = queue.shift()!;
        
        if (visited.has(currentUrl)) continue;
        visited.add(currentUrl);

        try {
          const response = await fetch(currentUrl);
          const html = await response.text();
          const newDomains = extractDomains(html, currentUrl);

          setJobs(prev => {
            const job = prev.find(j => j.id === jobId)!;
            job.crawledUrls.add(currentUrl);
            return [...prev];
          });

          for (const domain of newDomains) {
            if (!newJob.externalDomains.has(domain)) {
              const status = await checkDomain(domain);
              
              setJobs(prev => {
                const job = prev.find(j => j.id === jobId)!;
                job.externalDomains.set(domain, status);
                if (status.status === 'expired') {
                  job.expiredDomains.push(status);
                }
                return [...prev];
              });
            }
          }

          const links = extractDomains(html, currentUrl)
            .filter(url => !visited.has(url));
          queue.push(...links);
        } catch (error) {
          console.error(`Error crawling ${currentUrl}:`, error);
        }
      }

      setJobs(prev => {
        const job = prev.find(j => j.id === jobId)!;
        job.status = 'completed';
        return [...prev];
      });
    } catch (error) {
      setJobs(prev => {
        const job = prev.find(j => j.id === jobId)!;
        job.status = 'error';
        return [...prev];
      });
    }
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  }, []);

  return {
    jobs,
    startCrawl,
    deleteJob,
  };
};