import movieListsRequest from '@api/movie-lists/movie-lists-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useNowPlayingMovieListsQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.nowPlayingMovieLists],
    queryFn: async () => await movieListsRequest.fetchNowPlayingMovieLists(region, language),
  });
  return query;
};

export const usePopularMovieListsQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.popularMovieLists],
    queryFn: async () => await movieListsRequest.fetchPopularMovieLists(region, language),
  });
  return query;
};

export const useTopRatedMovieListsQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.topRatedMovieLists],
    queryFn: async () => await movieListsRequest.fetchTopRatedMovieLists(region, language),
  });
  return query;
};

export const useUpcomingMovieListsQuery = (region: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.topRatedMovieLists],
    queryFn: async () => await movieListsRequest.fetchUpcomingMovieLists(region, language),
  });
  return query;
};
