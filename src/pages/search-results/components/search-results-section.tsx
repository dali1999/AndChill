/* eslint-disable no-unused-vars */
import { ReactNode, useEffect, useState } from 'react';
import {
  TCollectionSearchResultsFetchRes,
  TMovieSearchResultsFetchRes,
  TPeopleSearchResultsFetchRes,
} from '@api/movie-search/movie-search-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import styled from 'styled-components';

interface TSearchResultsSectionProps {
  title: string;
  isLoading: boolean;
  data: TMovieSearchResultsFetchRes | TCollectionSearchResultsFetchRes | TPeopleSearchResultsFetchRes | undefined;
  setPage: (page: number) => void;
  itemWidth: number;
  children: ReactNode;
}

const SearchResultsSection = ({ title, isLoading, data, setPage, itemWidth, children }: TSearchResultsSectionProps) => {
  const length = data?.results.length;
  const [pageArr, setPageArr] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageGroup, setPageGroup] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const pagesPerGroup = 10;

  const handlePageClick = (pageNum: number) => {
    window.scrollTo(0, 0);
    setPage(pageNum);
    setSelectedPage(pageNum);
  };

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (data) {
      setTotalPage(data?.total_pages);
    }
  }, [data]);

  useEffect(() => {
    if (totalPage > 0) {
      const startPage = pageGroup * pagesPerGroup + 1;
      const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage);
      const newPageArr = Array.from({ length: endPage - startPage + 1 }, (_v, i) => startPage + i);
      setPageArr(newPageArr);
    }
  }, [pageGroup, totalPage]);

  const handleClickPrev = () => {
    if (pageGroup > 0) {
      setPageGroup((prev) => prev - 1);
      const newStartPage = (pageGroup - 1) * pagesPerGroup + 1;
      setPage(newStartPage);
      setSelectedPage(newStartPage);
    }
  };

  const handleClickNext = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPage) {
      setPageGroup((prev) => prev + 1);
      const newStartPage = (pageGroup + 1) * pagesPerGroup + 1;
      setPage(newStartPage);
      setSelectedPage(newStartPage);
    }
  };

  return (
    <>
      <S.ResultsSectionTitle>
        <S.SectionTitle>{title} </S.SectionTitle>
        {data && <S.ResultsCount>({data.total_results})</S.ResultsCount>}
      </S.ResultsSectionTitle>

      {isLoading ? (
        <MovieListSkeleton height={220} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={220} />
      ) : (
        <>
          <S.SearchResultList $itemWidth={itemWidth}>{children}</S.SearchResultList>
          <S.PagenationButtonWrapper>
            <button onClick={handleClickPrev}>이전</button>
            <S.PageButtonWrapper>
              {pageArr.map((page) => (
                <S.PageButton key={page} onClick={() => handlePageClick(page)} $isSelected={page === selectedPage}>
                  {page}
                </S.PageButton>
              ))}
            </S.PageButtonWrapper>
            <button onClick={handleClickNext}>다음</button>
          </S.PagenationButtonWrapper>
        </>
      )}
    </>
  );
};

export default SearchResultsSection;

const S = {
  ResultsSectionTitle: styled.div`
    margin-bottom: 26px;
    font-weight: 400;
  `,

  SectionTitle: styled.span`
    font-size: 20px;
  `,

  ResultsCount: styled.span`
    font-size: 16px;
    color: var(--gray01);
  `,

  SearchResultList: styled.ul<{ $itemWidth: number }>`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${({ $itemWidth }) => $itemWidth}px, 1fr));
    gap: 40px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,

  PagenationButtonWrapper: styled.ul`
    margin: 66px 0 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  `,

  PageButtonWrapper: styled.div`
    display: flex;
    gap: 10px;
  `,

  PageButton: styled.li<{ $isSelected: boolean }>`
    font-size: 14px;
    padding: 4px 0;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--indigo07)' : 'var(--indigo03)')};
    color: ${({ $isSelected }) => ($isSelected ? 'var(--lightWhite)' : 'var(--gray01)')};
    cursor: pointer;
    font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 100)};
  `,
};