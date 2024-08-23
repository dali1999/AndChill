/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import shuffleIcon from '@assets/icons/cards-shuffle.png';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import { CARD_INFO } from '../constants/card-info';
import {
  glowAnimation,
  godGlowAnimation,
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
  const [spreadAnimation, setSpreadAnimation] = useState(true);
  const [stackAnimation, setStackAnimation] = useState(false);
  const [page, setPage] = useState(Math.floor(Math.random() * 500) + 1);
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const { lang } = useRegionStore((state) => ({ lang: state.language }));

  const {
    data: randomMovieData,
    isFetching: isRandomMovieLoading,
    refetch,
  } = useMovieDiscoverResultsQuery(lang, 'vote_count.desc', '', page, '');
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

  const handleSpread = () => {
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

  const handleShuffleButtonDisable = (time: number) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, time);
  };

  const handleCardColor = (rate: number) => {
    if (rate >= CARD_INFO.legend.rank) {
      return CARD_INFO.legend.color;
    } else if (rate >= CARD_INFO.epic.rank) {
      return CARD_INFO.epic.color;
    } else if (rate >= CARD_INFO.rear.rank) {
      return CARD_INFO.rear.color;
    } else {
      return 'transparent';
    }
  };

  return (
    <>
      <S.ButtonWrapper>
        <S.Btn
          onClick={() => {
            if (spreadAnimation) {
              handleShuffleButtonDisable(flipped.every((value) => value === false) ? 3700 : 4280);
              setFlipped(Array(6).fill(false));
              setTimeout(() => handleStack(), flipped.every((value) => value === false) ? 0 : 500);
              setTimeout(() => handleShuffle(), flipped.every((value) => value === false) ? 600 : 1180);
              setTimeout(() => handleSpread(), flipped.every((value) => value === false) ? 800 : 1300);
            } else {
              handleShuffle();
              setTimeout(() => handleSpread(), 1180);
              handleShuffleButtonDisable(2500);
            }
          }}
          disabled={isDisabled}
          $isDiabled={isDisabled}
        >
          <img src={shuffleIcon} alt="카드 셔플 아이콘" />
        </S.Btn>
      </S.ButtonWrapper>

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
                $glowColor={handleCardColor(movie.vote_average)}
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
      </S.Container>
    </>
  );
};

export default Shuffle;

const S = {
  Container: styled.div`
    height: 800px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    z-index: 1;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 0px;
    z-index: 2;
    position: relative;
    bottom: 45px;
  `,

  Btn: styled.button<{ $isDiabled?: boolean }>`
    position: relative;
    padding: 6px 16px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isDiabled }) => ($isDiabled ? 'var(--indigo04)' : 'var(--indigo04)')};
    opacity: ${({ $isDiabled }) => $isDiabled && 0.4};
    cursor: ${({ $isDiabled }) => ($isDiabled ? 'default' : 'pointer')};
    transition: 0.1s ease-in-out;
    img {
      height: 30px;
    }
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
      animation: ${(props) =>
          props.$glowColor === 'rgba(255, 208, 81, 0.8)'
            ? godGlowAnimation(props.$glowColor)
            : glowAnimation(props.$glowColor)}
        1.8s infinite;
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
      animation: ${(props) =>
          props.$glowColor === 'rgba(255, 208, 81, 0.8)'
            ? godGlowAnimation(props.$glowColor)
            : glowAnimation(props.$glowColor)}
        1.8s infinite;
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
      top: calc(22% - 5 * 0.5%);
      left: calc(50% - 100px - 10px);
      --index: 1;
      --row: 0;
      --col: 0;
    }
    &.card2 {
      z-index: 5;
      top: calc(22% - 4 * 0.5%);
      left: calc(50% - 95px - 10px);
      --index: 2;
      --row: 0;
      --col: 1;
    }
    &.card3 {
      z-index: 4;
      top: calc(22% - 3 * 0.5%);
      left: calc(50% - 90px - 10px);
      --index: 3;
      --row: 0;
      --col: 2;
    }
    &.card4 {
      z-index: 3;
      top: calc(22% - 2 * 0.5%);
      left: calc(50% - 85px - 10px);
      --index: 4;
      --row: 1;
      --col: 0;
    }
    &.card5 {
      z-index: 2;
      top: calc(22% - 1 * 0.5%);
      left: calc(50% - 80px - 10px);
      --index: 5;
      --row: 1;
      --col: 1;
    }
    &.card6 {
      z-index: 1;
      top: calc(22% - 0 * 0.5%);
      left: calc(50% - 75px - 10px);
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
