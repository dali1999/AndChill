import { TMovieImagesFetchRes } from '@api/movie/movie-request.type';
import movieCollectionRequest from '@api/movie-collection/movie-collection-request';
import { TMovieCollectionFetchRes } from '@api/movie-collection/movie-collection-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMovieCollectionQuery = (collectionId: number, language: string) => {
  const query = useQuery<TMovieCollectionFetchRes, Error>({
    queryKey: [QUERY_KEY.movieCollection, collectionId, language],
    queryFn: async () => await movieCollectionRequest.fetchMovieCollection(collectionId, language),
  });
  return query;
};

export const useMovieCollectionImagesQuery = (collectionId: number, language: string) => {
  const query = useQuery<TMovieImagesFetchRes, Error>({
    queryKey: [QUERY_KEY.movieCollectionImages, collectionId, language],
    queryFn: async () => await movieCollectionRequest.fetchMovieCollectionImages(collectionId, language),
  });
  return query;
};
