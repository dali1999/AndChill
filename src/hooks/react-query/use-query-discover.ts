import discoverRequest from '@api/discover/discover-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDiscoverResultsQuery = (sortBy: string, genres?: string, language: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDiscoveredResults, genres, language],
    queryFn: async () => await discoverRequest.fetchMovieDiscoverResults(sortBy, genres, language),
  });
  return query;
};
