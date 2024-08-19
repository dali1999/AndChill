import { useEffect, useState } from 'react';
import collectionIcon from '@assets/icons/search-results-button/button-collection.svg';
import movieIcon from '@assets/icons/search-results-button/button-movies.svg';
import peopleIcon from '@assets/icons/search-results-button/button-people.svg';

import collectionColorIcon from '@assets/icons/search-results-button/button-yellow-collection.svg';
import movieColorIcon from '@assets/icons/search-results-button/button-yellow-movies.svg';
import peopleColorIcon from '@assets/icons/search-results-button/button-yellow-people.svg';

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
  const [activeSection, setActiveSection] = useState<'Movies' | 'Collections' | 'People'>('Movies');

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

  const isFetching = isMovieResultsLoading || isCollectionResultsLoading || isPeopleResultsLoading;

  useEffect(() => {
    movieResultsRefetch();
    collectionResultsRefetch();
    peopleResultsRefetch();
  }, [lang, movieResultsRefetch, collectionResultsRefetch, peopleResultsRefetch]);

  useEffect(() => {
    if (!isFetching) {
      if (movieResultsData?.total_results) {
        setActiveSection('Movies');
      } else if (collectionResultsData?.total_results) {
        setActiveSection('Collections');
      } else if (peopleResultsData?.total_results) {
        setActiveSection('People');
      }
    }
  }, [movieResultsData, collectionResultsData, peopleResultsData, isFetching]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> 검색 결과</S.TitleText>
      </S.Title>

      <S.ButtonsWrapper $activate={activeSection}>
        <button onClick={() => setActiveSection('Movies')} className="movies">
          {activeSection === 'Movies' ? (
            <img src={movieColorIcon} alt="노랑 영화 아이콘" />
          ) : (
            <img src={movieIcon} alt="영화 아이콘" />
          )}
        </button>
        <button onClick={() => setActiveSection('Collections')} className="collections">
          {activeSection === 'Collections' ? (
            <img src={collectionColorIcon} alt="노랑 컬렉션 아이콘" />
          ) : (
            <img src={collectionIcon} alt="컬렉션 아이콘" />
          )}
        </button>
        <button onClick={() => setActiveSection('People')} className="people">
          {activeSection === 'People' ? (
            <img src={peopleColorIcon} alt="노랑 사람 아이콘" />
          ) : (
            <img src={peopleIcon} alt="사람 아이콘" />
          )}
        </button>
      </S.ButtonsWrapper>

      <S.ResultsSection>
        {activeSection === 'Movies' && (
          <>
            <S.ResultsSectionTitle>
              <S.SectionTitle>영화 </S.SectionTitle>
              {movieResultsData && <S.ResultsCount>({movieResultsData.total_results})</S.ResultsCount>}
            </S.ResultsSectionTitle>
            <MovieSearchResults isLoading={isMovieResultsLoading} data={movieResultsData}></MovieSearchResults>
          </>
        )}
        {activeSection === 'Collections' && (
          <>
            <S.ResultsSectionTitle>
              <S.SectionTitle>컬렉션 </S.SectionTitle>
              {collectionResultsData && <S.ResultsCount>({collectionResultsData.total_results})</S.ResultsCount>}
            </S.ResultsSectionTitle>
            <CollectionSearchResults
              isLoading={isCollectionResultsLoading}
              data={collectionResultsData}
            ></CollectionSearchResults>
          </>
        )}
        {activeSection === 'People' && (
          <>
            <S.ResultsSectionTitle>
              <S.SectionTitle>인물 </S.SectionTitle>
              {peopleResultsData && <S.ResultsCount>({peopleResultsData.total_results})</S.ResultsCount>}
            </S.ResultsSectionTitle>
            <PeopleSearchResults isLoading={isPeopleResultsLoading} data={peopleResultsData}></PeopleSearchResults>
          </>
        )}
      </S.ResultsSection>
    </S.Container>
  );
};

export default SearchResults;

const S = {
  Container: styled.div`
    position: relative;
    padding: 40px 5%;
    background-color: var(--dark09);
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
      padding: 8px 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.05s ease-in;
      img {
        width: 20px;
      }

      &:hover {
        background-color: var(--indigo05);
      }

      ${({ $activate }) =>
        $activate === 'Movies' &&
        `
        &.movies {
          background-color: var(--indigo03);
        }
      `}

      ${({ $activate }) =>
        $activate === 'Collections' &&
        `
        &.collections {
          background-color: var(--indigo03);
        }
      `}

      ${({ $activate }) =>
        $activate === 'People' &&
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
  `,

  SectionTitle: styled.span`
    font-size: 20px;
  `,
  ResultsCount: styled.span`
    font-size: 16px;
    color: var(--gray01);
  `,
};
