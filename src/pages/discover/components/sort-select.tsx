/* eslint-disable no-unused-vars */
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SORT_INFO } from '../constants/sort-info';

interface TSortSelectProps {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const SortSelect = ({ selectedSort, setSelectedSort }: TSortSelectProps) => {
  const { t } = useTranslation();

  const handleClickSort = (query: string) => {
    setSelectedSort(query);
  };

  return (
    <S.Container>
      <S.SortList>
        {SORT_INFO.map((sort) => (
          <S.SortItem
            key={sort.queryStr}
            onClick={() => handleClickSort(sort.queryStr)}
            $isSelected={selectedSort === sort.queryStr}
          >
            {t(`discover.sorts.${sort.title}`)}
          </S.SortItem>
        ))}
      </S.SortList>
    </S.Container>
  );
};

export default SortSelect;
const S = {
  Container: styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    @media ${device.mobile} {
      margin-top: 10px;
    }
  `,

  SortList: styled.div`
    justify-content: end;
    width: 100%;
    display: flex;
    gap: 0px;
    flex-wrap: wrap;
    @media ${device.mobile} {
      justify-content: center;
    }
  `,

  SortItem: styled.li<{ $isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    color: ${({ $isSelected }) => ($isSelected ? 'var(--yellow02)' : 'var(--gray01)')};
    border-bottom: ${({ $isSelected }) => $isSelected && '1px solid var(--yellow02)'};
    font-weight: ${({ $isSelected }) => ($isSelected ? 400 : 100)};
    cursor: pointer;
    font-size: 15px;
    @media ${device.mobile} {
      font-size: 13px;
    }
  `,
};
