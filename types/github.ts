export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    created_at: string;
  }
  
  export interface SearchParams {
    languages: string[];
    startDate: string;
    endDate: string;
    minStars: number;
  }
  
  export interface GithubState {
    repositories: Record<string, Repository[]>;
    searchedLanguages: string[];
    loading: boolean;
    error: string | null;
    currentPage: Record<string, number | null>;
    lastSearchParams: SearchParams;
  }