import { useEffect, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useUpcomingMovieListQuery } from '@hooks/react-query/use-query-movie-lists';
import UpcomingMovieItem from '@pages/home/components/upcoming-movie-list/upcoming-movie-item';
import { getFlagEmoji } from '@pages/home/utils/get-flag-emoji';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const UpcomingMovieList = () => {
  console.log('1');
  const { t } = useTranslation();
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
      <S.SectionTitle>{t('home.upcoming', { flagEmoji })}</S.SectionTitle>
      {isFetching ? (
        <MovieListSkeleton height={180} />
      ) : upcomingMovieData?.total_results === 0 ? (
        <MovieListSkeleton text={t('home.upcoming_nodata', { region })} height={180} />
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
            positionTop={20}
            positionLR={-22}
            width={60}
            height={180}
            backgroundColor="var(--dark09)"
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
    @media ${device.mobile} {
      padding: 40px 0 20px;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  SectionTitle: styled.h2`
    height: 32px;
    position: relative;
    padding-left: 15px;
    @media ${device.mobile} {
      height: 26px;
      font-size: 18px;
    }
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
    @media ${device.mobile} {
      padding-top: 14px;
      overflow-x: auto;
    }
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
    @media ${device.mobile} {
      gap: 14px;
    }
  `,

  NoDataContainer: styled.div``,
};
