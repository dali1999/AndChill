/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { SORT_INFO, TSortItem } from '../constants/sort-info';

interface TSortSelectProps {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  setSelectedSortName: (sort: string) => void;
}

const SortSelect = ({ selectedSort, setSelectedSort, setSelectedSortName }: TSortSelectProps) => {
  const handleClickSort = (sort: TSortItem) => {
    setSelectedSort(sort.queryStr);
    setSelectedSortName(sort.title);
  };

  return (
    <S.Container>
      <S.GenreListWrapper>
        {SORT_INFO.map((sort) => (
          <S.GenreList
            key={sort.queryStr}
            onClick={() => handleClickSort(sort)}
            $isSelected={selectedSort === sort.queryStr}
          >
            {sort.title}
          </S.GenreList>
        ))}
      </S.GenreListWrapper>
    </S.Container>
  );
};

export default SortSelect;
const S = {
  Container: styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    margin-top: 30px;
    width: 100%;
    justify-content: end;
  `,

  GenreListWrapper: styled.div`
    display: flex;
    gap: 0px;
    background-color: var(--indigo04);
    /* padding: 10px; */
    flex-wrap: wrap;
    border-radius: 50px;
  `,

  GenreList: styled.li<{ $isSelected: boolean }>`
    background-color: ${({ $isSelected }) => $isSelected && 'var(--indigo07)'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    color: var(--dark02);
    color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--gray01)')};
    font-weight: ${({ $isSelected }) => ($isSelected ? 400 : 100)};
    border-radius: 50px;
    cursor: pointer;
    font-size: 15px;
  `,
};
