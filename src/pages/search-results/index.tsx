import { useEffect } from 'react';
import { useCollectionSearchResultsQuery, useMovieSearchResultsQuery } from '@hooks/react-query/use-query-movie-search';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSearchResults from './components/collection-search-results';
import MovieSearchResults from './components/movie-search-results';

const SearchResults = () => {
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);

  const {
    data: movieResultsData,
    isFetching: isMovieResultsLoading,
    refetch: movieResultsRefetch,
  } = useMovieSearchResultsQuery(searchQuery, lang);

  const {
    data: collectionResultsData,
    isFetching: isCollectionResultsLoading,
    refetch: collectionResultsRefetch,
  } = useCollectionSearchResultsQuery(searchQuery, lang);

  useEffect(() => {
    movieResultsRefetch();
    collectionResultsRefetch();
  }, [lang]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> 검색 결과</S.TitleText>
      </S.Title>

      <S.ResultsSection>
        <S.ResultsSectionTitle>Collections</S.ResultsSectionTitle>
        <CollectionSearchResults
          isLoading={isCollectionResultsLoading}
          data={collectionResultsData}
        ></CollectionSearchResults>
      </S.ResultsSection>

      <S.ResultsSection>
        <S.ResultsSectionTitle>Movies</S.ResultsSectionTitle>
        <MovieSearchResults isLoading={isMovieResultsLoading} data={movieResultsData}></MovieSearchResults>
      </S.ResultsSection>
    </S.Container>
  );
};

export default SearchResults;

const S = {
  Container: styled.div`
    padding: 0 5%;
    margin-top: 100px;

    section {
      border-bottom: 2px solid var(--indigo03);
    }
    & section:last-child {
      border: none;
    }
  `,

  Title: styled.h1`
    margin-bottom: 46px;
  `,

  SearchQuery: styled.span`
    font-size: 40px;
    font-weight: 600;
    color: var(--gray03);
  `,

  TitleText: styled.span`
    margin-left: 5px;
    font-size: 26px;
    font-weight: 400;
    color: var(--gray02);
  `,

  ResultsSection: styled.section`
    margin-top: 24px;
    padding-bottom: 40px;
    ul {
      animation: ${fadeIn} 0.5s ease-in;
    }
  `,

  ResultsSectionTitle: styled.h2`
    margin-bottom: 26px;
    font-weight: 400;
    font-size: 20px;
  `,
};
