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
      {SORT_INFO.map((sort) => (
        <S.GenreList
          key={sort.queryStr}
          onClick={() => handleClickSort(sort)}
          $isSelected={selectedSort === sort.queryStr}
        >
          {sort.title}
        </S.GenreList>
      ))}
    </S.Container>
  );
};

export default SortSelect;
const S = {
  Container: styled.ul`
    background-color: var(--indigo02);
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    padding: 14px 5%;
    width: 100%;
    flex-wrap: wrap;
    justify-content: end;
  `,

  GenreList: styled.li<{ $isSelected: boolean }>`
    background-color: var(--yellow02);
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--indigo07)')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    color: var(--dark02);
    color: ${({ $isSelected }) => ($isSelected ? 'var(--dark02)' : 'var(--gray01)')};
    font-weight: ${({ $isSelected }) => ($isSelected ? 900 : 500)};
    border-radius: 4px;
    cursor: pointer;
  `,
};
