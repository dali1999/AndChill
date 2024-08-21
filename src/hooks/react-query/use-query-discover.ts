import discoverRequest from '@api/discover/discover-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieDiscoverResultsQuery = (
  language: string,
  sortBy: string,
  genres?: string,
  page?: number,
  withOriginalLanguage?: string,
) => {
  const query = useQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDiscoveredResults, language, sortBy, genres, page, withOriginalLanguage],
    queryFn: async () =>
      await discoverRequest.fetchMovieDiscoverResults(language, sortBy, genres, page, withOriginalLanguage),
  });
  return query;
};
