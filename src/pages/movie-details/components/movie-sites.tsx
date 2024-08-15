import { TCountryResult, TMovieSitesFetchRes } from '@api/movie/movie-request.type';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import MovieSitesList from './movie-sites-list';

interface TMovieSitesProps {
  data: TMovieSitesFetchRes;
}

const RENDER_DATA: { key: keyof TCountryResult; title: string }[] = [
  { key: 'buy', title: '구매' },
  { key: 'free', title: '무료' },
  { key: 'flatrate', title: '구독' },
  { key: 'rent', title: '대여' },
];

const MovieSites = ({ data }: TMovieSitesProps) => {
  const region = useRegionStore((state) => state.region);
  const sitesRegionData = data?.results[region];

  return (
    <S.Container>
      <S.Title>지금 보러 가기</S.Title>
      {RENDER_DATA.map(({ key, title }) =>
        sitesRegionData?.[key] ? <MovieSitesList key={key} data={sitesRegionData[key]} title={title} /> : null,
      )}
    </S.Container>
  );
};

export default MovieSites;

const S = {
  Container: styled.div`
    padding: 20px;
  `,

  Title: styled.h2``,
};
