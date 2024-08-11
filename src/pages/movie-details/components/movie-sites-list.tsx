import { TProvider } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieSitesListProps {
  data: TProvider[] | undefined;
  title: string;
}

const MovieSitesList = ({ data, title }: TMovieSitesListProps) => {
  return (
    <S.Container>
      <h3>{title}</h3>
      <S.MovieSitesList>
        {data?.map((item) => (
          <S.MovieSitesItem key={item.provider_id}>
            <S.ProviderLogo src={getImage(IMAGE_SIZE.logo_sizes.original, item.logo_path)} />
            <S.ProviderName>{item.provider_name}</S.ProviderName>
          </S.MovieSitesItem>
        ))}
      </S.MovieSitesList>
    </S.Container>
  );
};

export default MovieSitesList;

const S = {
  Container: styled.div``,

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
