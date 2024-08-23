import { useEffect, useState } from 'react';

import {
  useCollectionSearchResultsQuery,
  useMovieSearchResultsQuery,
  usePeopleSearchResultsQuery,
} from '@hooks/react-query/use-query-movie-search';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CategoryNavigationButton from './components/category-navigation-button';
import CollectionItem from './components/collection-item';
import PeopleItem from './components/people-item';
import SearchResultsSection from './components/search-results-section';

const SearchResults = () => {
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);
  const [moviePage, setMoviePage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [peoplePage, setPeoplePage] = useState(1);
  const [activeSection, setActiveSection] = useState<'Movies' | 'Collections' | 'People'>('Movies');

  const {
    data: movieData,
    isFetching: isMovieLoading,
    refetch: movieResultsRefetch,
  } = useMovieSearchResultsQuery(searchQuery, lang, moviePage);

  const {
    data: collectionData,
    isFetching: isCollectionLoading,
    refetch: collectionResultsRefetch,
  } = useCollectionSearchResultsQuery(searchQuery, lang, collectionPage);

  const {
    data: peopleData,
    isFetching: isPeopleLoading,
    refetch: peopleResultsRefetch,
  } = usePeopleSearchResultsQuery(searchQuery, lang, peoplePage);

  const isFetching = isMovieLoading || isCollectionLoading || isPeopleLoading;

  useEffect(() => {
    setMoviePage(1);
    setCollectionPage(1);
    setPeoplePage(1);
  }, []);

  useEffect(() => {
    movieResultsRefetch();
    collectionResultsRefetch();
    peopleResultsRefetch();
  }, [lang, movieResultsRefetch, collectionResultsRefetch, peopleResultsRefetch]);

  useEffect(() => {
    if (!isFetching) {
      // Check the data in order and update activeSection only if there's data and it's not already set
      if (movieData?.total_results !== 0 && activeSection !== 'Movies') {
        setActiveSection('Movies');
      } else if (collectionData?.total_results !== 0 && activeSection !== 'Collections') {
        setActiveSection('Collections');
      } else if (peopleData?.total_results !== 0 && activeSection !== 'People') {
        setActiveSection('People');
      }
    }
  }, [movieData, collectionData, peopleData, isFetching]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> 검색 결과</S.TitleText>
      </S.Title>

      <CategoryNavigationButton activeSection={activeSection} setActiveSection={setActiveSection} />

      <S.SearchResultsWrapper>
        {activeSection === 'Movies' && (
          <SearchResultsSection
            title={activeSection}
            isLoading={isMovieLoading}
            data={movieData}
            setPage={setMoviePage}
            itemWidth={200}
          >
            {movieData?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
          </SearchResultsSection>
        )}
        {activeSection === 'Collections' && (
          <SearchResultsSection
            title={activeSection}
            isLoading={isCollectionLoading}
            data={collectionData}
            setPage={setCollectionPage}
            itemWidth={350}
          >
            {collectionData?.results.map((collection) => <CollectionItem key={collection.id} data={collection} />)}
          </SearchResultsSection>
        )}
        {activeSection === 'People' && (
          <SearchResultsSection
            title={activeSection}
            isLoading={isPeopleLoading}
            data={peopleData}
            setPage={setPeoplePage}
            itemWidth={230}
          >
            {peopleData?.results.map((people) => <PeopleItem key={people.id} data={people} />)}
          </SearchResultsSection>
        )}
      </S.SearchResultsWrapper>
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

  SearchResultsWrapper: styled.section`
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
};
