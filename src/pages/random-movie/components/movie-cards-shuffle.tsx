import { useEffect, useState } from 'react';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import styled, { keyframes } from 'styled-components';
import { shuffle1, shuffle2, shuffle3, shuffle4, shuffle5, shuffle6 } from './shuffle-animation';

const Shuffle = () => {
  const [animate, setAnimate] = useState(false);
  const [rowAnimation, setRowAnimation] = useState(false);
  const [stackAnimation, setStackAnimation] = useState(false);
  const [page, setPage] = useState(Math.floor(Math.random() * 500) + 1);

  const { lang } = useRegionStore((state) => ({ lang: state.language }));

  const {
    data: randomMovieData,
    isFetching: isRandomMovieLoading,
    refetch,
  } = useMovieDiscoverResultsQuery(lang, 'vote_count.desc', '', page);

  useEffect(() => {
    setTimeout(() => refetch(), 1700);
  }, [page, refetch, lang]);

  const movieDeck = randomMovieData?.results.slice(0, 6);

  const handleShuffle = () => {
    setAnimate(true);
    setRowAnimation(false);
    setStackAnimation(false);
    setPage(Math.floor(Math.random() * 500) + 1);
    setTimeout(() => setAnimate(false), 1380);
  };

  const handleRow = () => {
    setRowAnimation(true);
    setStackAnimation(false);
  };

  const handleStack = () => {
    setRowAnimation(false);
    setStackAnimation(true);
  };

  return (
    <S.Container>
      <S.ButtonWrapper>
        <S.Btn onClick={handleShuffle}>Shuffle</S.Btn>
        <S.Btn onClick={handleRow}>Spread</S.Btn>
        <S.Btn onClick={handleStack}>Gather</S.Btn>
      </S.ButtonWrapper>

      {page &&
        movieDeck?.map((movie, i) => (
          <S.Box
            key={movie.id}
            className={`box${i + 1} card${i + 1} ${animate ? 'animate' : ''} ${rowAnimation ? 'row' : ''} ${stackAnimation ? 'stack' : ''}`}
            $isRow={rowAnimation}
          >
            <div className="card-container">
              <div className="front">
                <MovieItem data={movie} />
              </div>
              <div className="back">
                <img src="/andchill-favicon.svg" />
              </div>
            </div>
          </S.Box>
        ))}
    </S.Container>
  );
};

export default Shuffle;

const rowAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(var(--row) * 320px - 140px)) translateX(calc(var(--col) * 220px - 220px));
  }
`;

const stackAnimation = keyframes`
  0% {
    transform: translateY(calc(var(--row) * 320px - 140px)) translateX(calc(var(--col) * 220px - 220px));
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;

const S = {
  Container: styled.div`
    width: 100%;
    height: 800px;
    position: relative;
    display: flex;
    align-items: end;
    justify-content: center;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
  `,

  Btn: styled.div`
    padding: 10px 20px;
    /* width: 100px; */
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--lightWhite);
    color: var(--dark02);
    cursor: pointer;
    font-weight: 900;
  `,

  Box: styled.div<{ $isRow: boolean }>`
    position: absolute;
    width: 200px;
    height: 300px;
    border-radius: 5px;
    font-size: 50px;
    transition: transform 2s ease;
    --row: 0;
    --col: 0;
    perspective: 1000px;

    ${(props) =>
      props.$isRow &&
      `
      &:hover .card-container {
        transform: rotateY(0deg);
      }
    `}

    .card-container {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.5s;
      transform-style: preserve-3d;
      cursor: pointer;
      cursor: pointer;
      transform: rotateY(180deg);
      box-shadow:
        rgba(0, 0, 0, 0.2) 0px 10px 18px,
        rgba(0, 0, 0, 0.2) 0px 15px 12px;
    }

    /* Front face */
    .front {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    /* Back face */
    .back {
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-color: var(--indigo06);
      border: 3px solid var(--indigo04);
      border-radius: 5px;
      transform: rotateY(180deg);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        opacity: 0.8;
        width: 100px;
        height: 76px;
      }
    }

    &.box1 {
      z-index: 6;
      top: 22.5%;
      left: calc(50% - 100px);
      --row: 0;
      --col: 0;
    }
    &.box2 {
      z-index: 5;
      top: 23%;
      left: calc(50% - 95px);
      --row: 0;
      --col: 1;
    }
    &.box3 {
      z-index: 4;
      top: 23.5%;
      left: calc(50% - 90px);
      --row: 0;
      --col: 2;
    }
    &.box4 {
      z-index: 3;
      top: 24%;
      left: calc(50% - 85px);
      --row: 1;
      --col: 0;
    }
    &.box5 {
      z-index: 2;
      top: 24.5%;
      left: calc(50% - 80px);
      --row: 1;
      --col: 1;
    }
    &.box6 {
      z-index: 1;
      top: 25%;
      left: calc(50% - 75px);
      --row: 1;
      --col: 2;
    }

    /* Shuffle animation */
    &.animate.box1 {
      transform-origin: 150% 0%;
      animation: ${shuffle1} 2s forwards;
    }
    &.animate.box2 {
      transform-origin: 150% 0%;
      animation: ${shuffle2} 2s forwards;
    }
    &.animate.box3 {
      transform-origin: 150% 0%;
      animation: ${shuffle3} 2s forwards;
    }
    &.animate.box4 {
      transform-origin: 150% 0%;
      animation: ${shuffle4} 2s forwards;
    }
    &.animate.box5 {
      transform-origin: 150% 0%;
      animation: ${shuffle5} 2s forwards;
    }
    &.animate.box6 {
      transform-origin: 150% 0%;
      animation: ${shuffle6} 2s forwards;
    }

    /* Row animation */
    &.row {
      animation: ${rowAnimation} 0.5s forwards;
    }

    /* Stack animation */
    &.stack {
      animation: ${stackAnimation} 0.5s forwards;
    }
  `,
};
