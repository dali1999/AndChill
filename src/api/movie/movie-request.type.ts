import { TGenre } from "@api/genre/genre-request.type";

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



interface TProductionCompany {
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
  results: TMovieSitesItem[];
}

interface TProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface TCountryResult {
  link: string;
  buy?: TProvider[];
  rent?: TProvider[];
  flatrate?: TProvider[];
}

interface TMovieSitesItem {
  [countryCode: string]: TCountryResult;
}
