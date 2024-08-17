import { TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import styled from 'styled-components';
import MovieProductionCompanyItem from './movie-production-company-item';
import { formatCurrency } from '../utils/calculate-currency';

interface TMovieSecondaryProps {
  data: TMovieDetailsFetchRes;
}

const MovieSecondaryInfo = ({ data }: TMovieSecondaryProps) => {
  const { budget, revenue, original_language, status } = data;
  const movieBudget = budget === 0 ? '—' : formatCurrency(budget);
  const movieRevenue = revenue === 0 ? '—' : formatCurrency(revenue);
  // 로고 있는 제작사들만 필터링
  const productionCompaniesData = data.production_companies.filter((company) => company.logo_path !== null);

  return (
    <S.Container>
      <S.InfoItem>
        <S.InfoTitle>제작비</S.InfoTitle>
        <S.InfoContent>{movieBudget}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>수익</S.InfoTitle>
        <S.InfoContent>{movieRevenue}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>원어</S.InfoTitle>
        <S.InfoContent>{original_language}</S.InfoContent>
      </S.InfoItem>

      <S.InfoItem>
        <S.InfoTitle>상태</S.InfoTitle>
        <S.InfoContent>{status}</S.InfoContent>
      </S.InfoItem>

      <S.ProductionCompanyList>
        <S.InfoTitle>제작사</S.InfoTitle>
        {productionCompaniesData.length === 0 ? (
          <S.InfoContent>—</S.InfoContent>
        ) : (
          productionCompaniesData.map((comnpany) => (
            <MovieProductionCompanyItem key={comnpany.id} companyData={comnpany} />
          ))
        )}
      </S.ProductionCompanyList>
    </S.Container>
  );
};

export default MovieSecondaryInfo;
const S = {
  Container: styled.ul`
    margin-left: 20px;
    padding: 20px;
    background-color: var(--indigo01);
    border-radius: 0px 0 0 0;
    width: 220px;
  `,

  InfoItem: styled.li`
    border-bottom: 1px solid var(--indigo06);
    padding: 20px 0;
  `,

  InfoTitle: styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--gray03);
  `,

  InfoContent: styled.p`
    font-size: 14px;
    font-weight: 100;
    color: var(--gray02);
  `,

  ProductionCompanyList: styled.ul`
    padding: 20px 0;
  `,
};
