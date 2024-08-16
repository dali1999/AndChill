import movieRequest from '@api/movie/movie-request';
import {
  TMovieCreditsFetchRes,
  TMovieDetailsFetchRes,
  TMovieImagesFetchRes,
  TMovieSitesFetchRes,
  TMovieVideosFetchRes,
} from '@api/movie/movie-request.type';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDetailsQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieDetailsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDetails, movieId, language],
    queryFn: async () => await movieRequest.fetchMovieDetails(movieId, language),
  });
  return query;
};

export const useMovieImagesQuery = (movieId: number) => {
  const query = useQuery<TMovieImagesFetchRes, Error>({
    queryKey: [QUERY_KEY.movieImages, movieId],
    queryFn: async () => await movieRequest.fetchMovieImages(movieId),
  });
  return query;
};

export const useMovieVideosQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieVideosFetchRes, Error>({
    queryKey: [QUERY_KEY.movieVideos, movieId, language],
    queryFn: async () => await movieRequest.fetchMovieVideos(movieId, language),
  });
  return query;
};

export const useMovieRecommendationsQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieRecommendations, movieId, language],
    queryFn: async () => await movieRequest.fetchMovieRecommendations(movieId, language),
  });
  return query;
};

export const useMovieReviewsQuery = (movieId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.movieReview, movieId],
    queryFn: async () => await movieRequest.fetchMovieReviews(movieId),
  });
  return query;
};

export const useSimilarMoviesQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.similarMovies, movieId, language],
    queryFn: async () => await movieRequest.fetchSimilarMovies(movieId, language),
  });
  return query;
};

export const useMovieSitesQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieSitesFetchRes, Error>({
    queryKey: [QUERY_KEY.movieSites, movieId, language],
    queryFn: async () => await movieRequest.fetchMovieSites(movieId, language),
  });
  return query;
};

export const useMovieCreditsQuery = (movieId: number, language: string) => {
  const query = useQuery<TMovieCreditsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieCredits, movieId, language],
    queryFn: async () => await movieRequest.fetchMovieCredits(movieId, language),
  });
  return query;
};
