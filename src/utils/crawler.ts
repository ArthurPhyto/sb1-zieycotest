import { DomainStatus, CrawlJob } from '../types/crawler';

export const checkDomain = async (url: string): Promise<DomainStatus> => {
  try {
    const domain = new URL(url).hostname;
    
    // Try HTTP request first
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return {
          url: domain,
          status: 'alive',
          httpStatus: response.status,
          hasDNS: true,
          timestamp: Date.now()
        };
      }
    } catch (error) {
      // Continue to DNS check if HTTP fails
    }

    // Check DNS using public DNS API
    const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}`);
    const dnsData = await dnsResponse.json();
    
    if (dnsData.Answer && dnsData.Answer.length > 0) {
      return {
        url: domain,
        status: 'dead',
        hasDNS: true,
        timestamp: Date.now()
      };
    }

    return {
      url: domain,
      status: 'expired',
      hasDNS: false,
      timestamp: Date.now()
    };
  } catch (error) {
    return {
      url,
      status: 'expired',
      hasDNS: false,
      timestamp: Date.now()
    };
  }
};

export const extractDomains = (html: string, baseUrl: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = doc.querySelectorAll('a');
  const domains = new Set<string>();

  links.forEach(link => {
    try {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const url = new URL(href, baseUrl);
      if (url.hostname !== new URL(baseUrl).hostname) {
        domains.add(url.origin);
      }
    } catch (error) {
      // Skip invalid URLs
    }
  });

  return Array.from(domains);
};