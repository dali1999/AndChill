import discoverRequest from '@api/discover/discover-request';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

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

export const useMovieDiscoverResultsInfiniteQuery = (
  language: string,
  sortBy: string,
  genres?: string,
  withOriginalLanguage?: string,
) => {
  const query = useInfiniteQuery<TMovieListsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieDiscoveredResults, language, sortBy, genres, withOriginalLanguage],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      await discoverRequest.fetchMovieDiscoverResults(
        language,
        sortBy,
        genres,
        pageParam as number | undefined,
        withOriginalLanguage,
      ),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.total_pages > pages.length ? pages.length + 1 : undefined;
    },
  });
  return query;
};
