import { useEffect } from 'react';
import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import MovieListSection from '@pages/home/components/movie-list/movie-list-section';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import MetaTag from '@pages/SEOMetaTag';
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
    <>
      <MetaTag title="AndChill" description="전세계 트렌드, 개봉 예정인 영화들과 다양한 장르의 영화들을 접해보세요." />
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
    </>
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
