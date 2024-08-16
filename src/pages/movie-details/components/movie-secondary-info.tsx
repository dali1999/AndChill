import { TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import styled from 'styled-components';
import { formatCurrency } from '../utils/calculate-currency';

interface TMovieSecondaryProps {
  data: TMovieDetailsFetchRes;
}

const MovieSecondaryInfo = ({ data }: TMovieSecondaryProps) => {
  const { budget, revenue, original_language, status } = data;
  const movieBudget = budget === 0 ? '-' : formatCurrency(budget);
  const movieRevenue = revenue === 0 ? '-' : formatCurrency(revenue);

  return (
    <S.Container>
      <S.InfoItem>
        <p>제작비</p>
        <p>{movieBudget}</p>
      </S.InfoItem>

      <S.InfoItem>
        <p>수익</p>
        <p>{movieRevenue}</p>
      </S.InfoItem>

      <S.InfoItem>
        <p>원어</p>
        <p>{original_language}</p>
      </S.InfoItem>

      <S.InfoItem>
        <p>상태</p>
        <p>{status}</p>
      </S.InfoItem>
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
    width: 200px;
  `,

  InfoItem: styled.li`
    border-bottom: 1px solid var(--indigo06);
    padding: 20px 0;
    p {
    }
    & p:nth-child(1) {
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: 600;
      color: var(--gray03);
    }
    & p:nth-child(2) {
      font-size: 14px;
      font-weight: 100;
      color: var(--gray01);
    }
  `,
};
