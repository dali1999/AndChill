import movieRequest from '@api/movie/movie-request';
import {
  TMovieDetailsFetchRes,
  TMovieImagesFetchRes,
  TMovieSitesFetchRes,
  TMovieVideosFetchRes,
} from '@api/movie/movie-request.type';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDetailsQuery = (movieId: number) => {
  const query = useQuery<TMovieDetailsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDetails, movieId],
    queryFn: async () => await movieRequest.fetchMovieDetails(movieId),
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

export const useMovieVideosQuery = (movieId: number) => {
  const query = useQuery<TMovieVideosFetchRes, Error>({
    queryKey: [QUERY_KEY.movieVideos, movieId],
    queryFn: async () => await movieRequest.fetchMovieVideos(movieId),
  });
  return query;
};

export const useMovieRecommendationsQuery = (movieId: number) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieRecommendations, movieId],
    queryFn: async () => await movieRequest.fetchMovieRecommendations(movieId),
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

export const useSimilarMoviesQuery = (movieId: number) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.similarMovies, movieId],
    queryFn: async () => await movieRequest.fetchSimilarMovies(movieId),
  });
  return query;
};

export const useMovieSitesQuery = (movieId: number) => {
  const query = useQuery<TMovieSitesFetchRes, Error>({
    queryKey: [QUERY_KEY.movieSites, movieId],
    queryFn: async () => await movieRequest.fetchMovieSites(movieId),
  });
  return query;
};
