import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';

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
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: TMovieListsItem[];
}
