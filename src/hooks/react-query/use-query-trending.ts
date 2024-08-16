import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import trendingRequest from '@api/trending/trending-request';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useTrendingMovieListQuery = (language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.trendingMovieList],
    queryFn: async () => await trendingRequest.fetchTrendingMovieList(language),
  });
  return query;
};
