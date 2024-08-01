import genreRequest from '@api/genre/genre-request';
import { TGenreFetchRes } from '@api/genre/genre-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useGenreListQuery = () => {
  const query = useQuery<TGenreFetchRes, Error>({
    queryKey: [QUERY_KEY.genreList],
    queryFn: async () => await genreRequest.fetchGenreList(),
  });
  return query;
};
