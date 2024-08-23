import { TCountryResult, TMovieSitesFetchRes } from '@api/movie/movie-request.type';
import { useRegionStore } from '@stores/region';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';
import MovieSitesList from './movie-sites-list';

interface TMovieSitesProps {
  data: TMovieSitesFetchRes;
}

const RENDER_DATA: { key: keyof TCountryResult; title: string }[] = [
  { key: 'buy', title: 'Buy' },
  { key: 'free', title: 'Free' },
  { key: 'flatrate', title: 'Sub' },
  { key: 'rent', title: 'Rent' },
];

const MovieSites = ({ data }: TMovieSitesProps) => {
  const { t } = useTranslation();
  const region = useRegionStore((state) => state.region);
  const sitesRegionData = data?.results[region];
  
  return (
    <MovieDetailsSectionTemplate title={t('movie_details.sites.title')}>
      <>
        {sitesRegionData ? (
          RENDER_DATA.map(({ key, title }) =>
            sitesRegionData?.[key] ? (
              <MovieSitesList key={key} data={sitesRegionData[key]} title={t(`movie_details.sites.${title}`)} />
            ) : null,
          )
        ) : (
          <S.NoSitesText>{t('movie_details.sites.nodata', { region })}</S.NoSitesText>
        )}
      </>
    </MovieDetailsSectionTemplate>
  );
};

export default MovieSites;

const S = {
  Container: styled.div`
    padding: 0 0 60px;
  `,

  Title: styled.h2``,

  NoSitesText: styled.p`
    font-size: 14px;
    color: var(--indigo08);
  `,
};
