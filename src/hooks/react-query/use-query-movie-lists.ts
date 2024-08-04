import movieListsRequest from '@api/movie-lists/movie-lists-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useNowPlayingMovieListQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.nowPlayingMovieList],
    queryFn: async () => await movieListsRequest.fetchNowPlayingMovieList(region, language),
  });
  return query;
};

export const usePopularMovieListQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.popularMovieList],
    queryFn: async () => await movieListsRequest.fetchPopularMovieList(region, language),
  });
  return query;
};

export const useTopRatedMovieListQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.topRatedMovieList],
    queryFn: async () => await movieListsRequest.fetchTopRatedMovieList(region, language),
  });
  return query;
};

export const useUpcomingMovieListQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.topRatedMovieList],
    queryFn: async () => await movieListsRequest.fetchUpcomingMovieList(region, language),
  });
  return query;
};
