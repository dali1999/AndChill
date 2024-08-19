import movieSearchRequest from '@api/movie-search/movie-search-request';
import {
  TCollectionSearchResultsFetchRes,
  TMovieSearchResultsFetchRes,
} from '@api/movie-search/movie-search-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieSearchResultsQuery = (searchQuery: string | number, language: string) => {
  const query = useQuery<TMovieSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieSearchResults, searchQuery],
    queryFn: async () => await movieSearchRequest.fetchMovieSearchResults(searchQuery, language),
  });
  return query;
};

export const useCollectionSearchResultsQuery = (searchQuery: string | number, language: string) => {
  const query = useQuery<TCollectionSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.collectionSearchResults, searchQuery],
    queryFn: async () => await movieSearchRequest.fetchCollectionSearchResults(searchQuery, language),
  });
  return query;
};

export const usePeopleSearchResultsQuery = (searchQuery: string | number, language: string) => {
  const query = useQuery<TCollectionSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.peopleSearchResults, searchQuery],
    queryFn: async () => await movieSearchRequest.fetchPeopleSearchResults(searchQuery, language),
  });
  return query;
};
