import { TCollectionSearchResultsFetchRes } from '@api/movie-search/movie-search-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import styled from 'styled-components';
import CollectionItem from './collection-item';

interface TCollectionSearchResultsProps {
  isLoading: boolean;
  data: TCollectionSearchResultsFetchRes | undefined;
}

const CollectionSearchResults = ({ isLoading, data }: TCollectionSearchResultsProps) => {
  const length = data?.results.length;

  return (
    <>
      {isLoading ? (
        <MovieListSkeleton height={180} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={180} />
      ) : (
        <S.SearchResultList>
          {data?.results.map((collection) => <CollectionItem key={collection.id} data={collection} />)}
        </S.SearchResultList>
      )}
    </>
  );
};

export default CollectionSearchResults;
const S = {
  SearchResultList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); // 아이템의 width에 맞게
    gap: 40px 50px;
    flex-wrap: wrap;
    width: 100%;
  `,
};
