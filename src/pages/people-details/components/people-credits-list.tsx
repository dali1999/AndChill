import { useState } from 'react';
import { TPeopleCreditsFetchRes, TPeopleCrew } from '@api/people/people-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

interface TPeopleCreditsListProps {
  data: TPeopleCreditsFetchRes;
  type: 'cast' | 'crew';
}

interface MergedCredit extends Omit<TPeopleCrew, 'job'> {
  job: string[];
}

const PeopleCreditsList = ({ data, type }: TPeopleCreditsListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const castData = data.cast;
  const crewData = data.crew;

  const mergedData: MergedCredit[] = crewData.reduce((acc: MergedCredit[], curr: TPeopleCrew) => {
    const existingEntry = acc.find((item) => item.id === curr.id);

    if (existingEntry) {
      existingEntry.job.push(curr.job);
    } else {
      acc.push({ ...curr, job: [curr.job] });
    }
    return acc;
  }, []);

  const length = type === 'cast' ? castData.length : mergedData.length;
  const title = type === 'cast' ? '연기' : '제작';

  return (
    <S.CreditListWrapper>
      <S.Title>
        <h3>{title}&nbsp;</h3>
        <p>({length})</p>
      </S.Title>
      <S.CreditList $curIndex={currentIndex}>
        {type === 'cast' ? (
          <>
            {castData.map((movie) => (
              <S.CreditItem key={`${movie.id}_${movie.character}`}>
                <S.ReleaseDate>{movie.release_date}</S.ReleaseDate>
                <MovieItem data={movie} />
                {movie.character && <S.Character>{movie.character}</S.Character>}
              </S.CreditItem>
            ))}
          </>
        ) : (
          <>
            {mergedData.map((movie) => (
              <S.CreditItem key={`${movie.id}_${movie.job.join('')}`}>
                <S.ReleaseDate>{movie.release_date}</S.ReleaseDate>
                <MovieItem data={movie} />
                {movie.job && <S.Character>{movie.job.join(' • ')}</S.Character>}
              </S.CreditItem>
            ))}
          </>
        )}
      </S.CreditList>

      <CarouselButton
        length={length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        perSlide={2}
        positionTop={72}
        positionLR={-22}
        width={60}
        height={340}
        backgroundColor="var(--dark09)"
      />
    </S.CreditListWrapper>
  );
};

export default PeopleCreditsList;

const S = {
  CreditListWrapper: styled.div`
    padding: 30px 0 50px;
    position: relative;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-in;
    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  Title: styled.div`
    display: flex;
    align-items: end;
    p {
      font-size: 15px;
      color: var(--gray01);
    }
  `,

  CreditList: styled.ul<{ $curIndex: number }>`
    padding: 20px 0;
    display: flex;
    gap: 60px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * 260}px)`};
    transition: 0.3s ease-in-out;
  `,

  CreditItem: styled.li`
    position: relative;
    display: flex;
    flex-direction: column;
    color: var(--gray02);
  `,

  ReleaseDate: styled.p`
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 600;
    color: var(--indigo07);
    height: 29px;
  `,

  Character: styled.div`
    position: absolute;
    bottom: -50px;
    right: 0;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
    background-color: var(--indigo04);
    padding: 6px 12px;
    border-radius: 3px;
    display: inline-block;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: white-space 0.3s ease;
    font-weight: 400;
    &:hover {
      white-space: normal;
    }
  `,
};
