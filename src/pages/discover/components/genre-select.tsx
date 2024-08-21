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
      <S.Title>장르</S.Title>
      <S.GenreList>
        {data?.genres.map((genre) => (
          <S.GenreListItem
            key={genre.id}
            onClick={() => handleClickGenre(genre.id, genre.name)}
            $isSelected={selectedGenreId.includes(genre.id)}
          >
            {genre.name}
          </S.GenreListItem>
        ))}
      </S.GenreList>
    </S.Container>
  );
};

export default GenreSelect;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  Title: styled.h3`
    padding-top: 11px;
    font-size: 16px;
    width: 40px;
    margin-bottom: 12px;
    color: var(--gray01);
  `,

  GenreList: styled.ul`
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
  `,

  GenreListItem: styled.li<{ $isSelected: boolean }>`
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--indigo04)')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    padding: 6px 12px;

    color: var(--dark02);
    color: ${({ $isSelected }) => ($isSelected ? 'var(--dark02)' : 'var(--gray01)')};
    font-weight: 600;
    font-weight: ${({ $isSelected }) => ($isSelected ? 900 : 500)};
    border-radius: 4px;
    cursor: pointer;
  `,
};
