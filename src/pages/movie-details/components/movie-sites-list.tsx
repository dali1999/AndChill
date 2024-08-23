import { TProvider } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieSitesListProps {
  data: TProvider[];
  title: string;
}

const MovieSitesList = ({ data, title }: TMovieSitesListProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.MovieSitesList>
        {data.map((item) => (
          <S.MovieSitesItem key={item.provider_id}>
            <S.ProviderLogo src={getImage(IMAGE_SIZE.logo_sizes.original, item.logo_path)} />
          </S.MovieSitesItem>
        ))}
      </S.MovieSitesList>
    </S.Container>
  );
};

export default MovieSitesList;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid var(--indigo06);
    padding: 20px 0;
  `,

  Title: styled.h4`
    width: 38px;
  `,

  MovieSitesList: styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  MovieSitesItem: styled.li`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  ProviderLogo: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 6px;
  `,

  ProviderName: styled.p`
    font-size: 13px;
  `,
};
