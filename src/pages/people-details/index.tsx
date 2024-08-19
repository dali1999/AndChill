import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import {
  usePeopleCreditsQuery,
  usePeopleDetailsQuery,
  usePeopleImagesQuery,
} from '@hooks/react-query/use-query-people';
import { useRegionStore } from '@stores/region';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PeopleInfo from './components/people-info';

const PeopleDetails = () => {
  const { peopleId } = useParams() as { peopleId: string };
  const peopleIdNumber = Number(peopleId);
  const lang = useRegionStore((state) => state.language);

  const { data: detailsData, isFetching: isDetailsLoading } = usePeopleDetailsQuery(peopleIdNumber, lang);
  const { data: imagesData, isFetching: isImagesLoading } = usePeopleImagesQuery(peopleIdNumber);
  const { data: creditsData, isFetching: isCreditsLoading } = usePeopleCreditsQuery(peopleIdNumber, lang);

  const isFetching = isDetailsLoading || isImagesLoading || isCreditsLoading;
  return (
    <S.Container>
      {isFetching ? <MovieListSkeleton /> : <>{detailsData && <PeopleInfo data={detailsData} />}</>}
    </S.Container>
  );
};

export default PeopleDetails;

const S = {
  Container: styled.div`
    padding: 40px 5%;
    background-color: var(--dark09);
  `,
};
