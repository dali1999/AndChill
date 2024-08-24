import { TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MovieProductionCompanyItem from './movie-production-company-item';
import { formatCurrency } from '../utils/calculate-currency';

interface TMovieSecondaryProps {
  data: TMovieDetailsFetchRes;
}

const MovieSecondaryInfo = ({ data }: TMovieSecondaryProps) => {
  const { t } = useTranslation();
  const { budget, revenue, original_language, status } = data;
  const movieBudget = budget === 0 ? '—' : formatCurrency(budget);
  const movieRevenue = revenue === 0 ? '—' : formatCurrency(revenue);
  // 로고 있는 제작사들만 필터링
  const productionCompaniesData = data.production_companies.filter((company) => company.logo_path !== null);

  return (
    <S.Container>
      <S.InfoItem>
        <S.InfoTitle>{t('movie_details.secondary.budget')}</S.InfoTitle>
        <S.InfoContent>{movieBudget}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>{t('movie_details.secondary.revenue')}</S.InfoTitle>
        <S.InfoContent>{movieRevenue}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>{t('movie_details.secondary.lang')}</S.InfoTitle>
        <S.InfoContent>{original_language}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>{t('movie_details.secondary.status')}</S.InfoTitle>
        <S.InfoContent>{status}</S.InfoContent>
      </S.InfoItem>

      <S.ProductionCompanyListWrapper>
        <S.InfoTitle>{t('movie_details.secondary.company')}</S.InfoTitle>
        {productionCompaniesData.length === 0 ? (
          <S.InfoContent>—</S.InfoContent>
        ) : (
          <S.ProductionCompanyList>
            {productionCompaniesData.map((comnpany) => (
              <MovieProductionCompanyItem key={comnpany.id} companyData={comnpany} />
            ))}
          </S.ProductionCompanyList>
        )}
      </S.ProductionCompanyListWrapper>
    </S.Container>
  );
};

export default MovieSecondaryInfo;
const S = {
  Container: styled.ul`
    margin-left: 20px;
    padding: 20px 4% 20px;
    background-color: var(--indigo01);
    width: 220px;
    @media ${device.mobile} {
      margin-left: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
    }
  `,

  InfoItem: styled.li`
    animation: ${fadeIn} 0.5s ease-in;
    border-bottom: 1px solid var(--indigo06);
    padding: 20px 0;
    @media ${device.mobile} {
      border-bottom: 0;
      padding: 0 0 10px;
    }
  `,

  InfoTitle: styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--gray03);
    @media ${device.mobile} {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 6px;
    }
  `,

  InfoContent: styled.p`
    font-size: 14px;
    font-weight: 100;
    color: var(--gray02);
    @media ${device.mobile} {
      font-size: 13px;
    }
  `,

  ProductionCompanyListWrapper: styled.div`
    animation: ${fadeIn} 0.5s ease-in;
    padding: 20px 0;
    @media ${device.mobile} {
      grid-column: span 2;
      padding: 0;
    }
  `,

  ProductionCompanyList: styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${device.mobile} {
      flex-direction: row;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  `,
};
