import { useEffect, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import { CARD_COLOR } from '../constants/card-info';
import {
  glowAnimation,
  shuffle1,
  shuffle2,
  shuffle3,
  shuffle4,
  shuffle5,
  shuffle6,
  spreadAnimation,
  stackAnimation,
} from '../style/card-animation';
import { getRandomSixCards } from '../utils/get-random-cards';

const SHUFFLE_TIME = 2500;

const Shuffle = () => {
  const [animate, setAnimate] = useState(false);
  const [spreadAnimation, setSpreadAnimation] = useState(false);
  const [stackAnimation, setStackAnimation] = useState(false);
  const [page, setPage] = useState(Math.floor(Math.random() * 500) + 1);
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const { lang } = useRegionStore((state) => ({ lang: state.language }));

  const {
    data: randomMovieData,
    isFetching: isRandomMovieLoading,
    refetch,
  } = useMovieDiscoverResultsQuery(lang, 'vote_count.desc', '', page);
  const [movieDeck, setMovieDeck] = useState<TMovieListsItem[] | undefined>([]);

  useEffect(() => {
    refetch();
    setMovieDeck(getRandomSixCards(randomMovieData?.results));
  }, [page, randomMovieData?.results, refetch]);

  const handleShuffle = () => {
    setPage(Math.floor(Math.random() * 500) + 1);
    setSpreadAnimation(false);
    setStackAnimation(false);
    setAnimate(true);
    setTimeout(() => setAnimate(false), SHUFFLE_TIME);
  };

  const handleRow = () => {
    setSpreadAnimation(true);
    setStackAnimation(false);
  };

  const handleStack = () => {
    setSpreadAnimation(false);
    setStackAnimation(true);
  };

  const handleCardClick = (index: number) => {
    setFlipped((prevFlipped) => prevFlipped.map((flip, i) => (i === index ? !flip : flip)));
  };

  const handleButtonClick = (time: number) => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, time);
  };

  const handleCardColor = (rate: number, id: number) => {
    if (id === 680) {
      return CARD_COLOR.god.color;
    } else if (rate >= CARD_COLOR.legend.rank) {
      return CARD_COLOR.legend.color;
    } else if (rate >= CARD_COLOR.epic.rank) {
      return CARD_COLOR.epic.color;
    } else if (rate >= CARD_COLOR.rear.rank) {
      return CARD_COLOR.rear.color;
    }
  };

  return (
    <S.Container>
      {isRandomMovieLoading
        ? [...Array(6)]
            .map((_, i) => i)
            .map((_, i) => (
              <S.Card key={i} className={`card${i + 1}`}>
                <div className="card-container">
                  <div className="back noData">
                    <img src="/andchill-favicon.svg" />
                  </div>
                </div>
              </S.Card>
            ))
        : movieDeck?.map((movie, i) => (
            <S.Card
              key={movie.id}
              className={`card${i + 1} ${animate ? 'animate' : ''} ${spreadAnimation ? 'spread' : ''} ${stackAnimation ? 'stack' : ''}`}
              $isRow={spreadAnimation}
              $flipped={flipped[i]}
              $movieRate={movie.vote_average}
              $glowColor={handleCardColor(movie.vote_average, movie.id)}
              onClick={() => spreadAnimation && handleCardClick(i)}
            >
              <div className="card-container">
                <div className="front">
                  <MovieItem data={movie} />
                </div>
                <div className="back">
                  <img src="/andchill-favicon.svg" />
                </div>
              </div>
            </S.Card>
          ))}

      <S.ButtonWrapper>
        <S.Btn
          onClick={() => {
            if (spreadAnimation) {
              handleButtonClick(flipped.every((value) => value === false) ? 3100 : 3680);
              setFlipped(Array(6).fill(false));
              setTimeout(() => handleStack(), flipped.every((value) => value === false) ? 0 : 500);
              setTimeout(() => handleShuffle(), flipped.every((value) => value === false) ? 600 : 1180);
            } else {
              handleShuffle();
              handleButtonClick(2500);
            }
          }}
          disabled={isDisabled}
          $isDiabled={isDisabled}
        >
          셔플
        </S.Btn>
        <S.Btn onClick={handleRow}>펼치기</S.Btn>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default Shuffle;

const S = {
  Container: styled.div`
    height: 800px;
    width: 780px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
  `,

  Btn: styled.button<{ $isDiabled?: boolean }>`
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isDiabled }) => ($isDiabled ? 'var(--yellow03)' : 'var(--yellow02)')};
    color: var(--dark01);
    cursor: ${({ $isDiabled }) => ($isDiabled ? 'default' : 'pointer')};
    font-weight: 900;
    font-size: 20px;
    transition: 0.1s ease-in-out;
  `,

  NoCardText: styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Card: styled.div<{ $isRow?: boolean; $movieRate?: number; $glowColor?: string; $flipped?: boolean }>`
    position: absolute;
    width: 200px;
    height: 300px;
    border-radius: 5px;
    font-size: 50px;
    transition: transform 2s ease;
    --row: 0;
    --col: 0;
    perspective: 1000px;
    cursor: pointer;

    .card-container {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.5s;
      transform-style: preserve-3d;
      cursor: pointer;
      transform: rotateY(180deg);
      transform: rotateY(${(props) => (props.$flipped ? '0deg' : '180deg')});

      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
    }

    /* Front face */
    .front {
      position: absolute;
      width: 200px;
      height: 100%;
      backface-visibility: hidden;
      animation: ${(props) => props.$glowColor && glowAnimation(props.$glowColor)} 2s infinite;
    }

    /* Back face */
    .back {
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-color: var(--indigo06);
      border: 4px solid var(--indigo04);
      border-radius: 6px;
      transform: rotateY(180deg);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ${(props) => props.$glowColor && glowAnimation(props.$glowColor)} 2s infinite;
      img {
        opacity: 0.8;
        width: 100px;
        height: 76px;

        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
    }

    &.card1 {
      z-index: 6;
      top: calc(25% - 5 * 0.5%);
      left: calc(50% - 100px - 12px);
      --index: 1;
      --row: 0;
      --col: 0;
    }
    &.card2 {
      z-index: 5;
      top: calc(25% - 4 * 0.5%);
      left: calc(50% - 95px - 12px);
      --index: 2;
      --row: 0;
      --col: 1;
    }
    &.card3 {
      z-index: 4;
      top: calc(25% - 3 * 0.5%);
      left: calc(50% - 90px - 12px);
      --index: 3;
      --row: 0;
      --col: 2;
    }
    &.card4 {
      z-index: 3;
      top: calc(25% - 2 * 0.5%);
      left: calc(50% - 85px - 12px);
      --index: 4;
      --row: 1;
      --col: 0;
    }
    &.card5 {
      z-index: 2;
      top: calc(25% - 1 * 0.5%);
      left: calc(50% - 80px - 12px);
      --index: 5;
      --row: 1;
      --col: 1;
    }
    &.card6 {
      z-index: 1;
      top: calc(25% - 0 * 0.5%);
      left: calc(50% - 75px - 12px);
      --index: 6;
      --row: 1;
      --col: 2;
    }

    /* Shuffle animation */
    &.animate.card1 {
      transform-origin: 150% 0%;
      animation: ${shuffle1} 2.5s forwards;
    }
    &.animate.card2 {
      transform-origin: 150% 0%;
      animation: ${shuffle2} 2.5s forwards;
    }
    &.animate.card3 {
      transform-origin: 150% 0%;
      animation: ${shuffle3} 2.5s forwards;
    }
    &.animate.card4 {
      transform-origin: 150% 0%;
      animation: ${shuffle4} 2.5s forwards;
    }
    &.animate.card5 {
      transform-origin: 150% 0%;
      animation: ${shuffle5} 2.5s forwards;
    }
    &.animate.card6 {
      transform-origin: 150% 0%;
      animation: ${shuffle6} 2.5s forwards;
    }

    /* spread animation */
    &.spread {
      animation: ${spreadAnimation} 0.5s forwards;
    }

    /* Stack animation */
    &.stack {
      animation: ${stackAnimation} 0.5s forwards;
    }
  `,
};
