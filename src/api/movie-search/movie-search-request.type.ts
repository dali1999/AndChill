export interface TMovieSearchResultsFetchRes {
  page: number;
  results: TMovieSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface TCollectionSearchResultsFetchRes {
  page: number;
  results: TCollectionSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface TMovieSearchItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TCollectionSearchItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
}
