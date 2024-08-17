import { useEffect } from 'react';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieSearchResultsQuery } from '@hooks/react-query/use-query-movie-search';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const SearchResults = () => {
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);

  const {
    data: searchResultsData,
    isFetching: isSearchResultsLoading,
    refetch,
  } = useMovieSearchResultsQuery(searchQuery, lang);
  const length = searchResultsData?.results.length;

  useEffect(() => {
    refetch();
  }, [lang, refetch]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> 검색 결과</S.TitleText>
      </S.Title>
      {isSearchResultsLoading ? (
        <MovieListSkeleton height={220} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={220} />
      ) : (
        <S.SearchResultList>
          {searchResultsData?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
        </S.SearchResultList>
      )}
    </S.Container>
  );
};

export default SearchResults;

const S = {
  Container: styled.div`
    padding: 0 5%;
    margin-top: 100px;
  `,

  Title: styled.h1``,

  SearchQuery: styled.span`
    font-size: 44px;
    font-weight: 600;
    color: var(--gray03);
  `,

  TitleText: styled.span`
    margin-left: 8px;
    font-size: 30px;
    font-weight: 400;
    color: var(--gray02);
  `,

  SearchResultList: styled.ul`
    margin-top: 30px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 40px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,
};
