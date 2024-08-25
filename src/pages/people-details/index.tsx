import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import {
  usePeopleCreditsQuery,
  usePeopleDetailsQuery,
  usePeopleImagesQuery,
} from '@hooks/react-query/use-query-people';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PeopleCredits from './components/people-credits';
import PeopleImages from './components/people-images';
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
      {isFetching ? (
        <MovieListSkeleton />
      ) : (
        <>
          {detailsData && <PeopleInfo data={detailsData} lang={lang} />}
          {creditsData && <PeopleCredits data={creditsData} />}
          {imagesData && <PeopleImages data={imagesData} />}
        </>
      )}
    </S.Container>
  );
};

export default PeopleDetails;

const S = {
  Container: styled.div`
    background-color: var(--dark09);
    padding-bottom: 40px;
    @media ${device.mobile} {
      margin-top: 100px;
      padding-bottom: 16px;
    }
  `,
};
