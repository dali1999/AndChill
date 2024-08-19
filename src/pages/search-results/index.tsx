import { useEffect, useState } from 'react';
import {
  useCollectionSearchResultsQuery,
  useMovieSearchResultsQuery,
  usePeopleSearchResultsQuery,
} from '@hooks/react-query/use-query-movie-search';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSearchResults from './components/collection-search-results';
import MovieSearchResults from './components/movie-search-results';
import PeopleSearchResults from './components/people-search-results';

const SearchResults = () => {
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);
  const [activeSection, setActiveSection] = useState<'movies' | 'collections' | 'people'>('movies');

  useEffect(() => {
    
  }, []);

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

  const {
    data: peopleResultsData,
    isFetching: isPeopleResultsLoading,
    refetch: peopleResultsRefetch,
  } = usePeopleSearchResultsQuery(searchQuery, lang);

  useEffect(() => {
    movieResultsRefetch();
    collectionResultsRefetch();
    peopleResultsRefetch();
  }, [lang, movieResultsRefetch, collectionResultsRefetch, peopleResultsRefetch]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> 검색 결과</S.TitleText>
      </S.Title>

      <S.ButtonsWrapper $activate={activeSection}>
        <button onClick={() => setActiveSection('movies')} className="movies">
          Movie
        </button>
        <button onClick={() => setActiveSection('collections')} className="collections">
          Collection
        </button>
        <button onClick={() => setActiveSection('people')} className="people">
          People
        </button>
      </S.ButtonsWrapper>

      {activeSection === 'movies' && (
        <S.ResultsSection>
          <S.ResultsSectionTitle>
            <span>Movies </span>
            {movieResultsData && <span>({movieResultsData.total_results})</span>}
          </S.ResultsSectionTitle>
          <MovieSearchResults isLoading={isMovieResultsLoading} data={movieResultsData}></MovieSearchResults>
        </S.ResultsSection>
      )}

      {activeSection === 'collections' && (
        <S.ResultsSection>
          <S.ResultsSectionTitle>
            <span>Collections </span>
            {collectionResultsData && <span>({collectionResultsData?.total_results})</span>}
          </S.ResultsSectionTitle>
          <CollectionSearchResults
            isLoading={isCollectionResultsLoading}
            data={collectionResultsData}
          ></CollectionSearchResults>
        </S.ResultsSection>
      )}

      {activeSection === 'people' && (
        <S.ResultsSection>
          <S.ResultsSectionTitle>
            <span>People </span>
            {peopleResultsData && <span>({peopleResultsData.total_results})</span>}
          </S.ResultsSectionTitle>
          <PeopleSearchResults isLoading={isPeopleResultsLoading} data={peopleResultsData}></PeopleSearchResults>
        </S.ResultsSection>
      )}
    </S.Container>
  );
};

export default SearchResults;

const S = {
  Container: styled.div`
    position: relative;
    padding: 40px 5%;
    background-color: var(--dark09);
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

  ButtonsWrapper: styled.div<{ $activate: string }>`
    position: absolute;
    right: 5%;
    top: 122px;
    display: flex;
    gap: 10px;
    button {
      background-color: var(--indigo06);
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.05s ease-in;

      &:hover {
        background-color: var(--indigo05);
      }

      ${({ $activate }) =>
        $activate === 'movies' &&
        `
        &.movies {
          background-color: var(--indigo03);
        }
      `}

      ${({ $activate }) =>
        $activate === 'collections' &&
        `
        &.collections {
          background-color: var(--indigo03);
        }
      `}

      ${({ $activate }) =>
        $activate === 'people' &&
        `
        &.people {
          background-color: var(--indigo03);
        }
      `}
    }
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

  ResultsSectionTitle: styled.div`
    margin-bottom: 26px;
    font-weight: 400;

    & span:first-child {
      font-size: 20px;
    }
    & span:last-child {
      font-size: 16px;
      color: var(--gray01);
    }
  `,
};
