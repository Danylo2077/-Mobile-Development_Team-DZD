// src/services/api/types.ts

export type NewsItem = {
    author: string | null;
    title: string;
    description: string;
    url: string;
    source: string;
    image: string;
    category: string;
    language: string;
    country: string;
    published_at: string;
  }
  
  type Pagination = {
    limit: number;
    offset: number;
    count: number;
    total: number;
  }
  
  export type NewsApiResponse = {
    pagination: Pagination;
    data: NewsItem[];
  }
  