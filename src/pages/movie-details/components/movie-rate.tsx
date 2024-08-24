import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
interface TMovieRateProps {
  rate: number;
  voteCounts: number;
}
const MovieRate = ({ rate, voteCounts }: TMovieRateProps) => {
  const { t } = useTranslation();
  const rotation = ((rate * 10) / 100) * 170 - 85;
  return (
    <S.Container>
      <S.MovieRateWrapper>
        <S.Dial>
          <S.Colors></S.Colors>
        </S.Dial>
        <S.Needle $rotation={rotation} />
        <S.CenterDot />
        <S.VoteCount>
          {voteCounts.toLocaleString()} {t('movie_details.people_rated')}
        </S.VoteCount>
      </S.MovieRateWrapper>
      <S.Value>{rate.toFixed(1)}</S.Value>
    </S.Container>
  );
};

export default MovieRate;

const animateRate = keyframes`
  from {
    transform: rotate(-80deg);
  }
  to {
    transform: rotate(var(--rotation));
  }
`;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 30px 0 30px;
    gap: 24px;
  `,

  MovieRateWrapper: styled.div`
    opacity: 0.9;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Dial: styled.div`
    overflow: hidden;
    position: relative;
    width: 70px;
    height: 35px;
    border-top-left-radius: 70px;
    border-top-right-radius: 70px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: var(--gray03);
    box-shadow: inset 0px 3px 10px rgba(0, 0, 0, 0.2);
  `,

  Colors: styled.div`
    z-index: 0;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: conic-gradient(from 4.71rad at 50% 50%, yellow, red, black);
    left: calc(0% + 5px);
    top: 5px;
  `,

  Needle: styled.div<{ $rotation: number }>`
    --rotation: ${({ $rotation }) => `${$rotation}deg`};
    position: absolute;
    bottom: 24px;
    left: calc(50% - 2px);
    width: 4px;
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
    height: 31px;
    background-color: var(--gray06);
    animation: ${animateRate} 1.6s cubic-bezier(0.2, 0, 0.2, 1);
    transform-origin: bottom center;
    transform: rotate(var(--rotation));
    transition: transform 0.5s ease;
  `,

  CenterDot: styled.div`
    position: absolute;
    bottom: 20px;
    left: calc(50%);
    width: 8px;
    height: 8px;
    background-color: var(--gray01);
    border-radius: 50%;
    transform: translateX(-50%);
  `,

  Value: styled.div`
    font-size: 54px;
    font-weight: bold;
    color: var(--yellow01);
    @media ${device.mobile} {
      font-size: 48px;
    }
  `,

  VoteCount: styled.div`
    font-size: 12px;
    font-weight: 100;
    margin-top: 10px;
  `,
};
