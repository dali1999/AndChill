import { TProductionCompany } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieProductionCompanyItemProps {
  companyData: TProductionCompany;
}

const MovieProductionCompanyItem = ({ companyData }: TMovieProductionCompanyItemProps) => {
  const handleCompanyClick = (companyId: number) => {
    console.log(companyId);
  };

  return (
    <S.Container onClick={() => handleCompanyClick(companyData.id)}>
      <S.CompanyLogoImageWrapper>
        <S.CompanyLogoImage
          src={getImage(IMAGE_SIZE.logo_sizes.size04, companyData.logo_path)}
          className="scale-on-hover"
          alt="제작사 로고 이미지"
        />
      </S.CompanyLogoImageWrapper>
      <S.CompanyName>{companyData.name}</S.CompanyName>
    </S.Container>
  );
};

export default MovieProductionCompanyItem;

const S = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 30px;
    gap: 8px;
    cursor: pointer;
    width: 140px;
    &:hover .scale-on-hover {
      transform: scale(1.2);
    }
    @media ${device.mobile} {
      margin: 10px 0 0 0;
    }
  `,

  CompanyLogoImageWrapper: styled.div`
    width: 100px;
    height: 80px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--lightWhite);
    overflow: hidden;
    @media ${device.mobile} {
      width: 90px;
      height: 70px;
      padding: 20px;
    }
  `,

  CompanyLogoImage: styled.img`
    object-fit: contain;
    width: 80px;
    /* transition: transform 0.2s ease-out; */
    @media ${device.mobile} {
      width: 68px;
    }
  `,

  CompanyName: styled.p`
    font-size: 14px;
    color: var(--gray02);
    text-align: center;
    @media ${device.mobile} {
      font-size: 13px;
    }
  `,
};
