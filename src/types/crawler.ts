export interface DomainStatus {
  url: string;
  status: 'checking' | 'alive' | 'dead' | 'expired';
  httpStatus?: number;
  hasDNS?: boolean;
  timestamp: number;
}

export interface CrawlJob {
  id: string;
  url: string;
  status: 'running' | 'completed' | 'error';
  crawledUrls: Set<string>;
  externalDomains: Map<string, DomainStatus>;
  expiredDomains: DomainStatus[];
  timestamp: number;
}