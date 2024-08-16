import { TGenre } from '@api/genre/genre-request.type';

export interface TMovieDetailsFetchRes {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: TCollection;
  budget: number;
  genres: TGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TProductionCompany[];
  production_countries: TProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface TProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface TProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMovieSitesFetchRes {
  id: number;
  results: { [countryCode: string]: TCountryResult };
}

export interface TProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface TCountryResult {
  // link: string;
  buy?: TProvider[];
  free?: TProvider[];
  rent?: TProvider[];
  flatrate?: TProvider[];
}

export interface TMovieVideosFetchRes {
  id: number;
  results: TMovieVideo[];
}

interface TMovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
  official: boolean;
  published_at: string;
  id: string;
}

export interface TMovieImagesFetchRes {
  id: number;
  backdrops: TMovieImage[];
  logos: TMovieImage[];
  posters: TMovieImage[];
}

interface TMovieImage {
  aspect_ratio: number;
  height: number;
  width: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TMovieCreditsFetchRes {
  id: number;
  cast: TMovieCredit[];
  crew: TMovieCredit[];
}

export interface TMovieCredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
