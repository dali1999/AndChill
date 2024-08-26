/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import shuffleIcon from '@assets/icons/cards-shuffle.png';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useCardStore } from '@stores/cards';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
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
  spreadAnimationMobile,
  stackAnimation,
  stackAnimationMobile,
} from '../style/card-animation';
import { getRandomSixCards } from '../utils/get-random-cards';

const SHUFFLE_TIME = 2500;

const Shuffle = () => {
  const { flipped, movieDeck, setFlipped, setMovieDeck } = useCardStore((state) => ({
    flipped: state.flipped,
    movieDeck: state.movieDeck,
    setFlipped: state.setFlipped,
    setMovieDeck: state.setMovieDeck,
  }));

  const { lang } = useRegionStore((state) => ({ lang: state.language }));

  const [animate, setAnimate] = useState(false);
  const [page, setPage] = useState(Math.floor(Math.random() * 500) + 1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isAllNotFlipped, setIsAllNotFlipped] = useState(true);
  const [spread, setSpread] = useState(true);
  const [stack, setStack] = useState(false);

  const {
    data: randomMovieData,
    isFetching: isRandomMovieLoading,
    refetch,
  } = useMovieDiscoverResultsQuery(lang, 'vote_count.desc', '', page, '');

  const updateMovieDeck = (newMovies: TMovieListsItem[]) => {
    if (newMovies?.length) {
      setMovieDeck(getRandomSixCards(newMovies));
    }
  };

  // 초기 접속 시 최초 movieDeck 덥데이트
  useEffect(() => {
    if (randomMovieData?.results && !movieDeck?.length) {
      updateMovieDeck(randomMovieData.results);
    }
  }, [randomMovieData?.results]);

  // Shuffle 버튼 클릭 시 movieDeck 업데이트
  useEffect(() => {
    if (clicked && randomMovieData?.results) {
      refetch();
      updateMovieDeck(randomMovieData.results);
    }
  }, [clicked, randomMovieData?.results]);

  const handleShuffle = () => {
    setPage(Math.floor(Math.random() * 500) + 1); // 랜덤 카드 페이지 선택
    setAnimate(true); // 셔플 애니메이션 진행
    setTimeout(() => setAnimate(false), SHUFFLE_TIME);
    setFlipped(Array(6).fill(false));
  };

  const handleCardClick = (index: number) => {
    // 이미 클릭된 상태면 변경 안함
    if (!flipped[index] && !animate) {
      const newFlipped = flipped.map((flip, i) => (i === index ? !flip : flip));
      setFlipped(newFlipped);
    }
  };

  const handleShuffleSequence = () => {
    setClicked(true);
    setIsAllNotFlipped(flipped.every((flip) => !flip));
    setIsDisabled(true);
    setFlipped(Array(6).fill(false));

    const DELAY = isAllNotFlipped ? 3700 : 4280;
    const STACK_TIMEOUT = isAllNotFlipped ? 0 : 580;
    const SHUFFLE_TIMEOUT = isAllNotFlipped ? 600 : 1180;
    const SPREAD_TIMEOUT = isAllNotFlipped ? 800 : 1380;

    setTimeout(() => setIsDisabled(false), DELAY);
    setTimeout(() => handleStack(), STACK_TIMEOUT);
    setTimeout(() => handleShuffle(), SHUFFLE_TIMEOUT);
    setTimeout(() => handleSpread(), SPREAD_TIMEOUT);
  };

  const handleSpread = () => {
    setSpread(true);
    setStack(false);
  };

  const handleStack = () => {
    setSpread(false);
    setStack(true);
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
        <S.Btn onClick={handleShuffleSequence} disabled={isDisabled} $isDiabled={isDisabled}>
          <img src={shuffleIcon} alt="카드 셔플 아이콘" />
        </S.Btn>
      </S.ButtonWrapper>

      <S.Container>
        {isRandomMovieLoading
          ? [...Array(6)].map((_, i) => (
              <S.Card key={i} className={`card${i + 1}`} $isDisabled={isDisabled}>
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
                className={`card${i + 1} ${animate ? 'animate' : ''} ${spread ? 'spread' : ''} ${stack ? 'stack' : ''}`}
                $isRow={spread}
                $flipped={flipped[i]}
                $movieRate={movie.vote_average}
                $glowColor={handleCardColor(movie.vote_average)}
                $isDisabled={isDisabled}
                onClick={() => spread && handleCardClick(i)}
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
    border: 1px soild red;
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
    bottom: 42px;
    @media ${device.mobile} {
      position: absolute;
      top: 16px;
      right: 4%;
      height: 46px;
    }
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

  Card: styled.div<{
    $isRow?: boolean;
    $movieRate?: number;
    $glowColor?: string;
    $flipped?: boolean;
    $isDisabled?: boolean;
  }>`
    position: absolute;
    width: 200px;
    aspect-ratio: 1/1.5;
    border-radius: 5px;
    font-size: 50px;
    transition: transform 2s ease;
    --row: 0;
    --col: 0;
    perspective: 1000px;

    @media ${device.mobile} {
      width: 140px;
    }

    .card-container {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.5s;
      transform-style: preserve-3d;
      cursor: ${(props) => (props.$isDisabled ? 'default' : 'pointer')};
      transform: rotateY(180deg);
      transform: rotateY(${(props) => (props.$flipped ? '0deg' : '180deg')});
      box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
    }

    .front {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      animation: ${(props) =>
          props.$glowColor === 'rgba(255, 208, 81, 0.8)'
            ? godGlowAnimation(props.$glowColor)
            : glowAnimation(props.$glowColor)}
        1.8s infinite;
    }

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

        @media ${device.mobile} {
          width: 66px;
          height: 50px;
        }
      }
    }

    &.card1 {
      z-index: 6;
      top: calc(22% - 5 * 0.5%);
      left: calc(50% - 100px - 10px);
      @media ${device.mobile} {
        top: calc(22% + 40px);
        left: calc(50% - 72px);
      }
      --index: 1;
      --row: 0;
      --col: 0;
      --col-mobile: 0;
    }
    &.card2 {
      z-index: 5;
      top: calc(22% - 4 * 0.5%);
      left: calc(50% - 95px - 10px);
      @media ${device.mobile} {
        top: calc(22% + 45px);
        left: calc(50% - 67px);
      }
      --index: 2;
      --row: 0;
      --col: 1;
      --col-mobile: 1;
    }
    &.card3 {
      z-index: 4;
      top: calc(22% - 3 * 0.5%);
      left: calc(50% - 90px - 10px);
      @media ${device.mobile} {
        display: none;
      }
      --index: 3;
      --row: 0;
      --col: 2;
    }
    &.card4 {
      z-index: 3;
      top: calc(22% - 2 * 0.5%);
      left: calc(50% - 85px - 10px);
      @media ${device.mobile} {
        top: calc(22% + 50px);
        left: calc(50% - 62px);
      }
      --index: 4;
      --row: 1;
      --col: 0;
      --col-mobile: 0;
    }
    &.card5 {
      z-index: 2;
      top: calc(22% - 1 * 0.5%);
      left: calc(50% - 80px - 10px);
      @media ${device.mobile} {
        top: calc(22% + 55px);
        left: calc(50% - 57px);
      }
      --index: 5;
      --row: 1;
      --col: 1;
      --col-mobile: 1;
    }
    &.card6 {
      z-index: 1;
      top: calc(22% - 0 * 0.5%);
      left: calc(50% - 75px - 10px);
      @media ${device.mobile} {
        display: none;
      }
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
      @media ${device.mobile} {
        animation: none;
      }
    }
    &.animate.card4 {
      transform-origin: 150% 0%;
      animation: ${shuffle4} 2.5s forwards;
      @media ${device.mobile} {
        animation: ${shuffle3} 2.5s forwards;
      }
    }
    &.animate.card5 {
      transform-origin: 150% 0%;
      animation: ${shuffle5} 2.5s forwards;
      @media ${device.mobile} {
        animation: ${shuffle4} 2.5s forwards;
      }
    }
    &.animate.card6 {
      transform-origin: 150% 0%;
      animation: ${shuffle6} 2.5s forwards;
      @media ${device.mobile} {
        animation: none;
      }
    }

    /* spread animation */
    &.spread {
      animation: ${spreadAnimation} 0.5s forwards;
      @media ${device.mobile} {
        animation: ${spreadAnimationMobile} 0.5s forwards;
      }
    }

    /* Stack animation */
    &.stack {
      animation: ${stackAnimation} 0.5s forwards;
      @media ${device.mobile} {
        animation: ${stackAnimationMobile} 0.5s forwards;
      }
    }
  `,
};
