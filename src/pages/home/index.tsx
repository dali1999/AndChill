import { useEffect } from 'react';
import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import MovieListSection from '@pages/home/components/movie-list/movie-list-section';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Home = () => {
  const lang = useRegionStore((state) => state.language);
  const { data: trendingMovieData, isLoading: isTrendingLoading, refetch } = useTrendingMovieListQuery(lang);
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [lang, refetch]);
  return (
    <S.Container>
      <UpcomingMovieList />
      <MovieListSection
        title={t('home.week_trend')}
        trendingMovieData={trendingMovieData}
        isTrendingMovieLoading={isTrendingLoading}
      />
      <MovieListSection />
      <MovieListSection />
      <MovieListSection />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    padding: 0 5%;
    background-color: var(--dark09);
    @media ${device.mobile} {
      padding: 0 3%;
    }
  `,
};
