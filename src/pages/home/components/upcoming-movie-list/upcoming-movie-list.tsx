import { useEffect, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useUpcomingMovieListQuery } from '@hooks/react-query/use-query-movie-lists';
import UpcomingMovieItem from '@pages/home/components/upcoming-movie-list/upcoming-movie-item';
import { getFlagEmoji } from '@pages/home/utils/get-flag-emoji';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

const UpcomingMovieList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { region, lang } = useRegionStore((state) => ({ region: state.region, lang: state.language }));
  const { data: upcomingMovieData, isFetching, refetch } = useUpcomingMovieListQuery(region, lang);
  const flagEmoji = getFlagEmoji(region);
  const length = upcomingMovieData?.results.length;

  useEffect(() => {
    refetch();
  }, [region, refetch]);

  return (
    <S.Container>
      <S.SectionTitle>{flagEmoji} 개봉 예정</S.SectionTitle>
      {isFetching ? (
        <MovieListSkeleton height={180} />
      ) : upcomingMovieData?.total_results === 0 ? (
        <MovieListSkeleton text={`${region}에서 개봉 예정인 영화가 없습니다`} height={180} />
      ) : (
        <S.UpcomingMovieListWrapper>
          <S.UpcomingMovieList $curIndex={currentIndex}>
            {upcomingMovieData?.results.map((movie: TMovieListsItem) => (
              <UpcomingMovieItem data={movie} key={movie.id} />
            ))}
          </S.UpcomingMovieList>
          <CarouselButton
            length={length}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            perSlide={2}
            positionTop={0}
            positionLR={-22}
            width={60}
            height={180}
            backgroundColor="var(--indigo01)"
          />
        </S.UpcomingMovieListWrapper>
      )}
    </S.Container>
  );
};
export default UpcomingMovieList;

const S = {
  Container: styled.section`
    padding: 30px 0;
  `,

  SectionTitle: styled.h2`
    height: 32px;
    position: relative;
    padding-left: 15px;
    &::before {
      content: '';
      background-color: var(--yellow01);
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
    }
  `,

  UpcomingMovieListWrapper: styled.div`
    padding-top: 20px;
    position: relative;
    overflow: hidden;
    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  UpcomingMovieList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    animation: ${fadeIn} 0.5s ease-in;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (360 + 20)}px)`};
    transition: 0.3s ease-in-out;
  `,

  NoDataContainer: styled.div``,
};
