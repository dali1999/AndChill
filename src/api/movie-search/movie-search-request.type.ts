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

export interface TPeopleSearchResultsFetchRes {
  page: number;
  results: TPeopleSearchItem[];
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

export interface TPeopleSearchItem {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: false;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
}
