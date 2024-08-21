/* eslint-disable no-unused-vars */
import { TGenreFetchRes } from '@api/genre/genre-request.type';
import styled from 'styled-components';

interface TGenreSelectProps {
  data: TGenreFetchRes;
  selectedGenreId: number[];
  setSelectedGenreId: (genreArr: number[]) => void;
  selectedGenreName: string[];
  setSelectedGenreName: (genreArr: string[]) => void;
}

const GenreSelect = ({
  data,
  selectedGenreId,
  setSelectedGenreId,
  selectedGenreName,
  setSelectedGenreName,
}: TGenreSelectProps) => {
  const handleClickGenre = (genreId: number, genreName: string) => {
    if (selectedGenreId.includes(genreId)) {
      setSelectedGenreId(selectedGenreId.filter((id) => id !== genreId));
    } else {
      setSelectedGenreId([...selectedGenreId, genreId]);
    }

    if (selectedGenreName.includes(genreName)) {
      setSelectedGenreName(selectedGenreName.filter((name) => name !== genreName));
    } else {
      setSelectedGenreName([...selectedGenreName, genreName]);
    }
  };

  return (
    <S.Container>
      <S.Title>장르 선택</S.Title>
      <S.GenreListWrapper>
        {data?.genres.map((genre) => (
          <S.GenreList
            key={genre.id}
            onClick={() => handleClickGenre(genre.id, genre.name)}
            $isSelected={selectedGenreId.includes(genre.id)}
          >
            {genre.name}
          </S.GenreList>
        ))}
      </S.GenreListWrapper>
    </S.Container>
  );
};

export default GenreSelect;
const S = {
  Container: styled.div`
    background-color: var(--indigo02);
    padding: 20px 5%;
  `,

  Title: styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 12px;
  `,

  GenreListWrapper: styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
  `,

  GenreList: styled.li<{ $isSelected: boolean }>`
    background-color: var(--yellow02);
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--indigo07)')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    color: var(--dark02);
    color: ${({ $isSelected }) => ($isSelected ? 'var(--dark02)' : 'var(--gray01)')};
    font-weight: 600;
    font-weight: ${({ $isSelected }) => ($isSelected ? 900 : 500)};
    border-radius: 4px;
    cursor: pointer;
  `,
};
