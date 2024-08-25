import { TPeopleCreditsFetchRes } from '@api/people/people-request.type';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PeopleCreditsList from './people-credits-list';

interface TPeopleCreditsProps {
  data: TPeopleCreditsFetchRes;
}

const PeopleCredits = ({ data }: TPeopleCreditsProps) => {
  const { t } = useTranslation();
  const castData = data.cast;
  const crewData = data.crew;

  return (
    <S.Container>
      <S.Title>{t('people_details.filmography')}</S.Title>
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
    @media ${device.mobile} {
      padding: 0 4%;
      margin-top: 20px;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  Title: styled.h1`
    font-size: 26px;
    @media ${device.mobile} {
      font-size: 22px;
    }
  `,
};
