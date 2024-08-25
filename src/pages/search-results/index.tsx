import { useEffect, useState } from 'react';

import {
  useCollectionSearchResultsQuery,
  useMovieSearchResultsQuery,
  usePeopleSearchResultsQuery,
} from '@hooks/react-query/use-query-movie-search';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { device, size } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CategoryNavigationButton from './components/category-navigation-button';
import CollectionItem from './components/collection-item';
import PeopleItem from './components/people-item';
import SearchResultsSection from './components/search-results-section';

const SearchResults = () => {
  const { t } = useTranslation();
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);
  const [moviePage, setMoviePage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [peoplePage, setPeoplePage] = useState(1);
  const [activeSection, setActiveSection] = useState<'movies' | 'collections' | 'people'>('movies');
  const [movieItemWidth, setMovieItemWidth] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= size.mobile) {
        setMovieItemWidth(140);
      } else {
        setMovieItemWidth(200);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
  }, [searchQuery]);

  useEffect(() => {
    movieResultsRefetch();
    collectionResultsRefetch();
    peopleResultsRefetch();
  }, [lang, movieResultsRefetch, collectionResultsRefetch, peopleResultsRefetch]);

  useEffect(() => {
    if (!isFetching) {
      // Only set section if it matches the user’s current choice or if no choice has been made
      if (activeSection === 'movies' && movieData?.total_results === 0) {
        if (collectionData?.total_results !== 0) {
          setActiveSection('collections');
        } else if (peopleData?.total_results !== 0) {
          setActiveSection('people');
        } else {
          setActiveSection('movies'); // Default to Movies if no results are found
        }
      } else if (activeSection === 'collections' && collectionData?.total_results === 0) {
        if (peopleData?.total_results !== 0) {
          setActiveSection('people');
        } else {
          setActiveSection('movies'); // Default to Movies if no results are found
        }
      } else if (activeSection === 'people' && peopleData?.total_results === 0) {
        setActiveSection('movies'); // Default to Movies if no results are found
      }
    }
  }, [movieData, collectionData, peopleData, isFetching]);

  return (
    <S.Container>
      <S.Title>
        <S.SearchQuery>{searchQuery}</S.SearchQuery>
        <S.TitleText> {t('search.search_results')}</S.TitleText>
      </S.Title>

      <CategoryNavigationButton activeSection={activeSection} setActiveSection={setActiveSection} />

      <S.SearchResultsWrapper>
        {activeSection === 'movies' && (
          <SearchResultsSection
            title={t(`search.${activeSection}`)}
            isLoading={isMovieLoading}
            data={movieData}
            setPage={setMoviePage}
            itemWidth={movieItemWidth}
          >
            {movieData?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
          </SearchResultsSection>
        )}
        {activeSection === 'collections' && (
          <SearchResultsSection
            title={t(`search.${activeSection}`)}
            isLoading={isCollectionLoading}
            data={collectionData}
            setPage={setCollectionPage}
            itemWidth={350}
          >
            {collectionData?.results.map((collection) => <CollectionItem key={collection.id} data={collection} />)}
          </SearchResultsSection>
        )}
        {activeSection === 'people' && (
          <SearchResultsSection
            title={t(`search.${activeSection}`)}
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
    @media ${device.mobile} {
      margin-top: 100px;
      padding: 20px 4%;
    }
  `,

  Title: styled.div`
    margin-bottom: 46px;
    @media ${device.mobile} {
      margin-bottom: 34px;
    }
  `,

  SearchQuery: styled.span`
    font-size: 40px;
    font-weight: 600;
    color: var(--gray03);
    @media ${device.mobile} {
      font-size: 30px;
    }
  `,

  TitleText: styled.span`
    margin-left: 5px;
    font-size: 26px;
    font-weight: 400;
    color: var(--gray02);
    @media ${device.mobile} {
      font-size: 22px;
    }
  `,

  SearchResultsWrapper: styled.section`
    margin-top: 24px;
    padding-bottom: 40px;
    > div {
      animation: ${fadeIn} 0.3s ease-in;
    }
  `,

  ResultsSectionTitle: styled.div`
    margin-bottom: 26px;
    font-weight: 400;
  `,
};
