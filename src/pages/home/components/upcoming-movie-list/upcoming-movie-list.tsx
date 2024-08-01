import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import UpcomingMovieListSkeleton from '@components/skeleton/upcoming-movie-list-skeleton';
import { useUpcomingMovieListsQuery } from '@hooks/react-query/use-query-movie-lists';
import UpcomingMovieItem from '@pages/home/components/upcoming-movie-list/upcoming-movie-item';
import { getFlagEmoji } from '@pages/home/utils/get-flag-emoji';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';

const UpcomingMovieList = () => {
  const region = useRegionStore((state) => state.region);
  const language = 'ko';
  const { data: upcomingMovieData, isLoading } = useUpcomingMovieListsQuery(region, language);

  const flagEmoji = getFlagEmoji(region);

  return (
    <S.Container>
      <S.SectionTitle>{flagEmoji} 개봉 예정 영화</S.SectionTitle>
      {isLoading ? (
        <UpcomingMovieListSkeleton />
      ) : upcomingMovieData?.total_results === 0 ? (
        <UpcomingMovieListSkeleton text="개봉 예정인 영화가 없습니다" />
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
  `,

  UpcomingMovieList: styled.ul`
    overflow-x: auto;
    display: flex;
    gap: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  NoDataContainer: styled.div``,
};
