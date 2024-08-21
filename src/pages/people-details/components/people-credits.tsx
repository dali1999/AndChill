import { TPeopleCreditsFetchRes } from '@api/people/people-request.type';
import styled from 'styled-components';
import PeopleCreditsList from './people-credits-list';

interface TPeopleCreditsProps {
  data: TPeopleCreditsFetchRes;
}

const PeopleCredits = ({ data }: TPeopleCreditsProps) => {
  const castData = data.cast;
  const crewData = data.crew;

  return (
    <S.Container>
      <S.Title>필모그래피</S.Title>
      {castData.length !== 0 && <PeopleCreditsList data={data} type="cast" />}
      {crewData.length !== 0 && <PeopleCreditsList data={data} type="crew" />}
    </S.Container>
  );
};

export default PeopleCredits;

const S = {
  Container: styled.div`
    padding: 0 5%;
    margin-top: 40px;
  `,

  Title: styled.h1`
    font-size: 26px;
  `,
};
