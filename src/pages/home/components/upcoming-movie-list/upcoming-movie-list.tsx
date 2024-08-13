import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useUpcomingMovieListQuery } from '@hooks/react-query/use-query-movie-lists';
import UpcomingMovieItem from '@pages/home/components/upcoming-movie-list/upcoming-movie-item';
import { getFlagEmoji } from '@pages/home/utils/get-flag-emoji';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

const UpcomingMovieList = () => {
  const region = useRegionStore((state) => state.region);
  const language = 'ko';
  const { data: upcomingMovieData, isLoading } = useUpcomingMovieListQuery(region, language);

  const flagEmoji = getFlagEmoji(region);

  return (
    <S.Container>
      <S.SectionTitle>{flagEmoji} 개봉 예정 영화</S.SectionTitle>
      {isLoading ? (
        <MovieListSkeleton height={180} />
      ) : upcomingMovieData?.total_results === 0 ? (
        <MovieListSkeleton text="개봉 예정인 영화가 없습니다" height={180} />
      ) : (
        <S.UpcomingMovieList>
          {upcomingMovieData?.results.map((movie: TMovieListsItem) => (
            <UpcomingMovieItem data={movie} key={movie.id} />
          ))}
        </S.UpcomingMovieList>
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
    margin-bottom: 20px;
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

  UpcomingMovieList: styled.ul`
    overflow-x: auto;
    display: flex;
    gap: 40px;
    animation: ${fadeIn} 0.5s ease-in;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  NoDataContainer: styled.div``,
};
