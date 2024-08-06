import discoverRequest from '@api/discover/discover-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDiscoverResultsQuery = (genres: string) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDiscoveredResults, genres],
    queryFn: async () => await discoverRequest.fetchMovieDiscoverResults(genres),
  });
  return query;
};
