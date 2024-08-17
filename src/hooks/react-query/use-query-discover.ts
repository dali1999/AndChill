import discoverRequest from '@api/discover/discover-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDiscoverResultsQuery = (language: string, sortBy: string, genres?: string, page?: number) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDiscoveredResults, genres, language],
    queryFn: async () => await discoverRequest.fetchMovieDiscoverResults(language, sortBy, genres, page),
  });
  return query;
};
