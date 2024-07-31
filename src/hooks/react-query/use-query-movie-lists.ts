import movieListsRequest from '@api/movie-lists/movie-lists-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useNowPlayingMovieListsQuery = () => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.nowPlayingMovieLists],
    queryFn: async () => await movieListsRequest.fetchNowPlayingMovieLists(),
  });
  return query;
};

export const usePopularMovieListsQuery = () => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.popularMovieLists],
    queryFn: async () => await movieListsRequest.fetchPopularMovieLists(),
  });
  return query;
};

export const useTopRatedMovieListsQuery = () => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.topRatedMovieLists],
    queryFn: async () => await movieListsRequest.fetchTopRatedMovieLists(),
  });
  return query;
};
