import { TPeopleSearchResultsFetchRes } from '@api/movie-search/movie-search-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import styled from 'styled-components';
import PeopleItem from './people-item';

interface TPeopleSearchResultsProps {
  isLoading: boolean;
  data: TPeopleSearchResultsFetchRes | undefined;
}

const PeopleSearchResults = ({ isLoading, data }: TPeopleSearchResultsProps) => {
  const length = data?.results.length;

  return (
    <>
      {isLoading ? (
        <MovieListSkeleton height={220} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={220} />
      ) : (
        <S.SearchResultList>
          {data?.results.map((people) => <PeopleItem key={people.id} data={people} />)}
        </S.SearchResultList>
      )}
    </>
  );
};

export default PeopleSearchResults;
const S = {
  SearchResultList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 40px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,
};
