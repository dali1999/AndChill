import { useMovieSitesQuery } from '@hooks/react-query/use-query-movie';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import MovieSitesList from './movie-sites-list';

interface TMovieSitesProps {
  movieId: number;
}

const MovieSites = ({ movieId }: TMovieSitesProps) => {
  const region = useRegionStore((state) => state.region);
  const { data: movieSitesData, isLoading, isError } = useMovieSitesQuery(movieId);

  const krData = movieSitesData?.results[region];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <S.Container>
      <MovieSitesList data={krData?.buy} title="구매" />
      <MovieSitesList data={krData?.flatrate} title="구독" />
      <MovieSitesList data={krData?.rent} title="대여" />
    </S.Container>
  );
};

export default MovieSites;

const S = {
  Container: styled.div`
    padding: 0 40px;
  `,

  MovieSitesList: styled.ul`
    display: flex;
    gap: 30px;
    margin: 10px 0 20px;
  `,

  MovieSitesItem: styled.li`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  ProviderLogo: styled.img`
    width: 35px;
    height: 35px;
    border-radius: 3px;
  `,

  ProviderName: styled.p`
    font-size: 13px;
  `,
};
