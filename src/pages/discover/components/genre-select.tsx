/* eslint-disable no-unused-vars */
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';

interface TGenreSelectProps {
  lang: string;
  selectedGenreId: number[];
  setSelectedGenreId: (genreArr: number[]) => void;
}

const GenreSelect = ({ lang, selectedGenreId, setSelectedGenreId }: TGenreSelectProps) => {
  const { data: genreListData, isFetching: isGenreListLoading } = useGenreListQuery(lang);

  const handleClickGenre = (genreId: number) => {
    if (selectedGenreId?.includes(genreId)) {
      setSelectedGenreId(selectedGenreId.filter((id) => id !== genreId));
    } else {
      setSelectedGenreId([...selectedGenreId, genreId]);
    }
  };

  return (
    <S.Container>
      <S.Title>장르</S.Title>
      <S.GenreList>
        {genreListData?.genres.map((genre) => (
          <S.GenreListItem
            key={genre.id}
            onClick={() => handleClickGenre(genre.id)}
            $isSelected={selectedGenreId?.includes(genre.id)}
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
    align-items: center;
    gap: 12px;
    @media ${device.mobile} {
      gap: 6px;
    }
  `,

  Title: styled.h3`
    padding-top: 11px;
    font-size: 16px;
    width: 40px;
    margin-bottom: 12px;
    color: var(--gray01);
    @media ${device.mobile} {
      margin-bottom: 8px;
    }
  `,

  GenreList: styled.ul`
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
    @media ${device.mobile} {
      gap: 6px;
    }
  `,

  GenreListItem: styled.li<{ $isSelected: boolean }>`
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--indigo04)')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    color: var(--dark02);
    color: ${({ $isSelected }) => ($isSelected ? 'var(--dark02)' : 'var(--gray01)')};
    font-weight: ${({ $isSelected }) => ($isSelected ? 900 : 500)};
    border-radius: 4px;
    cursor: pointer;

    @media ${device.mobile} {
      padding: 3px 6px;
      font-size: 12px;
      border-radius: 2px;
    }
  `,
};
