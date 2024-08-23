import movieSearchRequest from '@api/movie-search/movie-search-request';
import {
  TCollectionSearchResultsFetchRes,
  TMovieSearchResultsFetchRes,
  TPeopleSearchResultsFetchRes,
} from '@api/movie-search/movie-search-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieSearchResultsQuery = (searchQuery: string | number, language: string, page: number) => {
  const query = useQuery<TMovieSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.movieSearchResults, searchQuery, language, page],
    queryFn: async () => await movieSearchRequest.fetchMovieSearchResults(searchQuery, language, page),
  });
  return query;
};

export const useCollectionSearchResultsQuery = (searchQuery: string | number, language: string, page: number) => {
  const query = useQuery<TCollectionSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.collectionSearchResults, searchQuery, language, page],
    queryFn: async () => await movieSearchRequest.fetchCollectionSearchResults(searchQuery, language, page),
  });
  return query;
};

export const usePeopleSearchResultsQuery = (searchQuery: string | number, language: string, page: number) => {
  const query = useQuery<TPeopleSearchResultsFetchRes, Error>({
    queryKey: [QUERY_KEY.peopleSearchResults, searchQuery, language, page],
    queryFn: async () => await movieSearchRequest.fetchPeopleSearchResults(searchQuery, language, page),
  });
  return query;
};
